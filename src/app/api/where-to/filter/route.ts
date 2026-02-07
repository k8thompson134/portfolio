import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// Initialize Anthropic client
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY,
});

// Prompt strategies from original server.js
const prompts: Record<string, (query: string, placesList: string) => string> = {
    // ~70 tokens - pattern-based reasoning (best cost/quality balance)
    pattern: (query, placesList) => `${placesList}

"${query}" → JSON indices where query matches PRIMARY purpose.
Rule: Include if query IS what they do. Exclude if query is just something they ALSO offer.
Specific Brands: If query is a brand name (e.g., "World Market", "Dunkin"), ONLY match that specific chain.
Examples:
- "coffee" ✓ coffee shops, ✗ restaurants with coffee
- "grocery" ✓ supermarkets, ✗ convenience stores
- "bank" ✓ financial banks, ✗ places with "bank" in name`,

    // ~25 tokens - ultra minimal
    minimal: (query, placesList) => `${placesList}

"${query}" → JSON indices of matches:`,

    // ~45 tokens - primary purpose principle
    primary: (query, placesList) => `${placesList}

Query: "${query}"
Return JSON array of indices where query is the place's PRIMARY purpose (not secondary). Retail only.`,

    // ~150 tokens - original verbose
    verbose: (query, placesList) => `Filter these Google Places results. User wants: "${query}"

Places:
${placesList}

STRICT RULES - only include RETAIL STORES where you can BUY things:
- "coffee" = coffee shops ONLY (Starbucks, Colectivo, Stone Creek). EXCLUDE restaurants/cafes that just serve coffee.
- "craft store" = RETAIL arts & crafts supply stores ONLY (Michaels, Joann, Hobby Lobby, Blick Art Materials). EXCLUDE: university facilities, community centers, hardware stores, sex shops, variety stores, bead shops.
- "grocery" = grocery stores/supermarkets ONLY.

Return ONLY a JSON array of indices. No explanation, no text, just the array.
Example: [0, 3]`
};

export async function POST(req: NextRequest) {
    try {
        const { userQuery, places } = await req.json();

        if (!places || places.length === 0) {
            return NextResponse.json({ filteredIndices: [] });
        }

        const placesList = places.map((p: any, i: number) =>
            `${i}. ${p.name}${p.types ? ' - Types: ' + p.types.join(', ') : ''}`
        ).join('\n');

        // Default to 'pattern' style as per original server.js
        const promptStyle = process.env.PROMPT_STYLE || 'pattern';
        let prompt = prompts[promptStyle] ? prompts[promptStyle](userQuery, placesList) : prompts.pattern(userQuery, placesList);

        // Remove trailing bracket if present
        if (prompt.trim().endsWith('[')) {
            prompt = prompt.trim().slice(0, -1).trim();
        }

        console.log(`[Claude] Style: ${promptStyle} | Query: ${userQuery}`);

        const response = await anthropic.messages.create({
            model: 'claude-3-5-haiku-20241022',
            max_tokens: 64,
            temperature: 0,
            messages: [
                { role: 'user', content: prompt },
                { role: 'assistant', content: '[' } // Pre-fill to force JSON
            ]
        });

        const responseText = (response.content[0] as any).text.trim();
        // Reconstruct full JSON
        const fullJsonStr = '[' + responseText;
        console.log('[Claude] Response:', fullJsonStr);

        const jsonMatch = fullJsonStr.match(/\[[\d,\s]*\]/);
        if (!jsonMatch) {
            console.log('[Claude] No JSON array found in response');
            return NextResponse.json({ filteredIndices: [] });
        }
        const indices = JSON.parse(jsonMatch[0]);

        console.log('[Claude] Filtered to indices:', indices);
        return NextResponse.json({ filteredIndices: indices });

    } catch (error: any) {
        console.error('[Claude] Error:', error.message);
        // On error, return all indices (fallback)
        // We need to parse the body again or just return empty if we can't access original body easily, 
        // but in Next.js req.json() consumes the stream. Ideally we'd have the original list.
        // simpler to just return error or empty here, or handle gracefully on client.
        return NextResponse.json({ filteredIndices: [], error: error.message }, { status: 500 });
    }
}
