// page-flip ships without type declarations; this covers the parts Journal uses.
declare module 'page-flip' {
    interface FlipSettings {
        width: number;
        height: number;
        size?: 'fixed' | 'stretch';
        minWidth?: number;
        maxWidth?: number;
        minHeight?: number;
        maxHeight?: number;
        showCover?: boolean;
        usePortrait?: boolean;
        mobileScrollSupport?: boolean;
        flippingTime?: number;
        maxShadowOpacity?: number;
        drawShadow?: boolean;
        showPageCorners?: boolean;
        useMouseEvents?: boolean;
    }

    export class PageFlip {
        constructor(element: HTMLElement, settings: FlipSettings);
        loadFromHTML(items: HTMLElement[]): void;
        on(event: 'flip', callback: (e: { data: number }) => void): this;
        on(event: 'changeOrientation', callback: (e: { data: 'portrait' | 'landscape' }) => void): this;
        on(event: 'init', callback: (e: { data: { page: number; mode: 'portrait' | 'landscape' } }) => void): this;
        flipNext(): void;
        flipPrev(): void;
        flip(page: number): void;
        getCurrentPageIndex(): number;
        getPageCount(): number;
        destroy(): void;
    }
}
