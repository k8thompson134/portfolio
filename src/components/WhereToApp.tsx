'use client';

import { useEffect, useRef, useState } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import styles from './WhereToApp.module.scss';

// Fallback key from original project if env not set
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

interface PlaceOption {
    name: string;
    vicinity: string;
    geometry: google.maps.places.PlaceGeometry;
    place_id: string;
}

interface WaypointData {
    id: number;
    value: string;
    options: PlaceOption[];
}

interface RouteResult {
    response: google.maps.DirectionsResult;
    places: PlaceOption[];
    duration: number; // in seconds
}

export default function WhereToApp() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [googleInfo, setGoogleInfo] = useState<{ maps: any } | null>(null);
    const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

    // Form State
    const [startQuery, setStartQuery] = useState('');
    const [endQuery, setEndQuery] = useState('');
    const [sameStartEnd, setSameStartEnd] = useState(false);
    const [waypoints, setWaypoints] = useState<{ id: number, value: string }[]>([
        { id: 1, value: '' },
        { id: 2, value: '' }
    ]);

    // App State
    const [isSearching, setIsSearching] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [result, setResult] = useState<RouteResult | null>(null);

    // Services
    const directionsService = useRef<google.maps.DirectionsService | null>(null);
    const directionsRenderer = useRef<google.maps.DirectionsRenderer | null>(null);
    const placesService = useRef<google.maps.places.PlacesService | null>(null);

    // Starting place object (for geometry)
    const startPlaceRef = useRef<google.maps.places.PlaceResult | null>(null);

    // Load Google Maps API using new functional API
    useEffect(() => {
        const loadMaps = async () => {
            try {
                // Set options for the loader
                setOptions({
                    key: API_KEY,
                    v: "weekly",
                });

                // Import required libraries
                const mapsLib = await importLibrary("maps") as google.maps.MapsLibrary;
                const placesLib = await importLibrary("places") as google.maps.PlacesLibrary;

                setGoogleInfo({ maps: { ...mapsLib, places: placesLib } });

                if (mapRef.current) {
                    const map = new mapsLib.Map(mapRef.current, {
                        center: { lat: 39.50, lng: -98.35 },
                        zoom: 4,
                        mapTypeControl: false,
                        streetViewControl: false
                    });
                    setMapInstance(map);

                    directionsService.current = new google.maps.DirectionsService();
                    directionsRenderer.current = new google.maps.DirectionsRenderer();
                    directionsRenderer.current.setMap(map);
                    placesService.current = new google.maps.places.PlacesService(map);
                }
            } catch (e) {
                console.error("Error loading Google Maps", e);
            }
        };

        loadMaps();
    }, []);

    // Handle Autocomplete Attachment
    // We use a callback ref pattern or just standard refs for the inputs
    const startInputRef = useRef<HTMLInputElement>(null);
    const endInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!googleInfo || !mapInstance) return;

        if (startInputRef.current) {
            const ac = new googleInfo.maps.places.Autocomplete(startInputRef.current);
            ac.addListener('place_changed', () => {
                const place = ac.getPlace();
                startPlaceRef.current = place;
                setStartQuery(place.formatted_address || place.name);

                // Center map
                if (place.geometry && place.geometry.location) {
                    mapInstance.setCenter(place.geometry.location);
                    mapInstance.setZoom(12);
                }
            });
        }

        if (endInputRef.current) {
            const ac = new googleInfo.maps.places.Autocomplete(endInputRef.current);
            ac.addListener('place_changed', () => {
                const place = ac.getPlace();
                setEndQuery(place.formatted_address || place.name);
            });
        }
    }, [googleInfo, mapInstance]);

    const addWaypoint = () => {
        setWaypoints([...waypoints, { id: Date.now(), value: '' }]);
    };

    const updateWaypoint = (id: number, val: string) => {
        setWaypoints(waypoints.map(w => w.id === id ? { ...w, value: val } : w));
    };

    const removeWaypoint = (id: number) => {
        setWaypoints(waypoints.filter(w => w.id !== id));
    };

    // --- CORE LOGIC ---

    const handleSearch = async () => {
        if (!mapInstance || !placesService.current) return;

        // Validation
        if (!startQuery) {
            alert("Please enter a starting location");
            return;
        }
        const finalEnd = sameStartEnd ? startQuery : endQuery;
        if (!finalEnd && !sameStartEnd) {
            alert("Please enter an ending location");
            return;
        }

        const activeWaypoints = waypoints.filter(w => w.value.trim().length > 0);
        if (activeWaypoints.length === 0) {
            alert("Please enter at least one stop");
            return;
        }

        setIsSearching(true);
        setStatusMessage("Searching for places...");

        try {
            const waypointOptions: WaypointData[] = [];

            // 1. Search for places for each waypoint query
            for (const wp of activeWaypoints) {
                setStatusMessage(`Searching for "${wp.value}"...`);
                const options = await searchForPlace(wp.value);
                waypointOptions.push({
                    id: wp.id,
                    value: wp.value,
                    options: options
                });
            }

            // 2. Route Optimization
            setStatusMessage("Calculating best route...");
            await findBestRoute(startQuery, finalEnd, waypointOptions);

        } catch (error: any) {
            console.error(error);
            alert("An error occurred: " + error.message);
        } finally {
            setIsSearching(false);
            setStatusMessage("");
        }
    };

    const searchForPlace = (query: string): Promise<PlaceOption[]> => {
        return new Promise((resolve) => {
            // Prefer nearby search if we have a start location

            // Prefer nearby search if we have a start location
            const useNearby = startPlaceRef.current && startPlaceRef.current.geometry;

            const callback = async (results: google.maps.places.PlaceResult[] | null, status: google.maps.places.PlacesServiceStatus) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
                    // LLM Filtering
                    const candidates = results.slice(0, 15);
                    try {
                        // We need to map options to a serializable format for the API
                        const serializablePlaces = candidates.map(p => ({
                            name: p.name,
                            types: p.types,
                            vicinity: p.vicinity
                        }));

                        const apiRes = await fetch('/api/where-to/filter', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ userQuery: query, places: serializablePlaces })
                        });

                        const data = await apiRes.json();
                        const indices: number[] = data.filteredIndices || [];

                        // If filter returns empty, fallback to top 5 original
                        const finalIndices = indices.length > 0 ? indices : [0, 1, 2, 3, 4];

                        const filtered = finalIndices
                            .map(i => candidates[i])
                            .filter(p => p !== undefined)
                            .map(p => ({
                                name: p.name!,
                                vicinity: p.vicinity!,
                                geometry: p.geometry!,
                                place_id: p.place_id!
                            })); // Safe casting as we checked status OK

                        resolve(filtered.slice(0, 5));
                    } catch (e) {
                        console.error("LLM Filter failed", e);
                        // Fallback
                        const fallback = candidates.slice(0, 5).map(p => ({
                            name: p.name!,
                            vicinity: p.vicinity!,
                            geometry: p.geometry!,
                            place_id: p.place_id!
                        }));
                        resolve(fallback);
                    }
                } else {
                    resolve([]);
                }
            };

            if (useNearby && startPlaceRef.current?.geometry?.location) {
                placesService.current!.nearbySearch({
                    location: startPlaceRef.current.geometry.location,
                    radius: 50000, // 50km
                    keyword: query
                }, callback);
            } else {
                placesService.current!.textSearch({ query }, callback);
            }
        });
    };

    const findBestRoute = async (start: string, end: string, waypointData: WaypointData[]) => {
        // Check if any waypoint has no options
        for (const wp of waypointData) {
            if (wp.options.length === 0) {
                throw new Error(`Could not find any places for: ${wp.value}`);
            }
        }

        const optionArrays = waypointData.map(wp => wp.options);
        let combinations = generateCombinations(optionArrays);

        console.log(`Testing ${combinations.length} initial combinations`);
        // Limit combinations
        if (combinations.length > 10) {
            combinations = combinations.slice(0, 10);
        }

        let bestDuration = Infinity;
        let bestRouteObj: RouteResult | null = null;
        let checked = 0;

        // We need to promisify the routing calls to await them or handle parallel
        // Google Maps API has rate limits, so we should be careful. 
        // Sequential is safer.

        for (const combo of combinations) {
            const waypts = combo.map(place => ({
                location: place.geometry.location,
                stopover: true
            }));

            try {
                const result = await new Promise<google.maps.DirectionsResult>((resolve, reject) => {
                    directionsService.current!.route({
                        origin: start,
                        destination: end,
                        waypoints: waypts,
                        optimizeWaypoints: true,
                        travelMode: 'DRIVING' as google.maps.TravelMode
                    }, (res, status) => {
                        if (status === 'OK' && res) resolve(res);
                        else reject(status);
                    });
                });

                // Calculate duration
                let duration = 0;
                result.routes[0].legs.forEach(leg => duration += leg.duration?.value || 0);

                if (duration < bestDuration) {
                    bestDuration = duration;
                    bestRouteObj = {
                        response: result,
                        places: combo,
                        duration: duration
                    };
                }
            } catch (e) {
                console.warn("Route failed", e);
            }
            checked++;
        }

        if (bestRouteObj) {
            setResult(bestRouteObj);
            if (directionsRenderer.current) {
                directionsRenderer.current.setMap(mapInstance);
                directionsRenderer.current.setDirections(bestRouteObj.response);
            }
        } else {
            throw new Error("Could not calculate any valid route.");
        }
    };

    // Helper: Recursive combination generator
    function generateCombinations<T>(arrays: T[][]): T[][] {
        if (arrays.length === 0) return [[]];
        const result: T[][] = [];
        const first = arrays[0];
        const rest = generateCombinations(arrays.slice(1));
        for (const item of first) {
            for (const r of rest) {
                result.push([item, ...r]);
            }
        }
        return result;
    }

    const handleReset = () => {
        setResult(null);
        if (directionsRenderer.current) {
            directionsRenderer.current.setMap(null);
        }
    };

    const getGoogleMapsLink = () => {
        if (!result) return '#';
        const origin = encodeURIComponent(startQuery);
        const destination = encodeURIComponent(sameStartEnd ? startQuery : endQuery);
        const waypointsParam = result.places.map(p => encodeURIComponent(`${p.name} ${p.vicinity}`)).join('|');
        return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypointsParam}`;
    };

    return (
        <div className={styles.container}>
            {/* Sidebar / Panel */}
            <div className={styles.panel}>
                {!result ? (
                    <>
                        <h2 className={styles.title}>Where To?</h2>
                        <p className={styles.subtitle}>Plan your errand run.</p>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Starting Location:</label>
                            <input
                                ref={startInputRef}
                                className={styles.input}
                                value={startQuery}
                                onChange={(e) => setStartQuery(e.target.value)}
                                placeholder="Enter a location"
                            />
                            <div className={styles.checkboxGroup}>
                                <input
                                    type="checkbox"
                                    id="sameStartEnd"
                                    checked={sameStartEnd}
                                    onChange={(e) => setSameStartEnd(e.target.checked)}
                                />
                                <label htmlFor="sameStartEnd">Same start and end location</label>
                            </div>
                        </div>

                        {!sameStartEnd && (
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Ending Location:</label>
                                <input
                                    ref={endInputRef}
                                    className={styles.input}
                                    value={endQuery}
                                    onChange={(e) => setEndQuery(e.target.value)}
                                    placeholder="Enter a location"
                                />
                            </div>
                        )}

                        <hr className={styles.divider} />

                        {waypoints.map((wp, index) => (
                            <div key={wp.id} className={styles.formGroup}>
                                <label className={styles.label}>Location {index + 1}</label>
                                <div className={styles.stopRow}>
                                    <input
                                        className={styles.input}
                                        value={wp.value}
                                        onChange={(e) => updateWaypoint(wp.id, e.target.value)}
                                        placeholder="e.g. coffee, bank, groceries"
                                    />
                                    {waypoints.length > 1 && (
                                        <button
                                            onClick={() => removeWaypoint(wp.id)}
                                            className={styles.removeBtn}
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}

                        <button className={`${styles.button} ${styles.secondary}`} onClick={addWaypoint}>
                            Add Location
                        </button>

                        <button className={styles.button} onClick={handleSearch} disabled={isSearching}>
                            {isSearching ? 'Searching...' : 'Search'}
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className={styles.title}>Route Ready!</h2>
                        <div className={styles.routeStats}>
                            🕐 {Math.round(result.duration / 60)} min total
                        </div>

                        <ul className={styles.stopsList}>
                            {result.places.map((p, i) => (
                                <li key={i} className={styles.stopItem}>
                                    <strong>{i + 1}. {p.name}</strong>
                                    <small>{p.vicinity}</small>
                                </li>
                            ))}
                        </ul>

                        <a href={getGoogleMapsLink()} target="_blank" rel="noopener noreferrer" className={styles.button}>
                            Open in Google Maps
                        </a>

                        <button className={`${styles.button} ${styles.secondary}`} onClick={handleReset}>
                            Start New Search
                        </button>
                    </>
                )}
            </div>

            {/* Map */}
            <div ref={mapRef} className={styles.mapContainer}></div>

            {isSearching && (
                <div className={styles.loadingOverlay}>
                    <span>{statusMessage}</span>
                </div>
            )}
        </div>
    );
}
