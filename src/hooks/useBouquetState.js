import { useState, useEffect, useCallback } from 'react';

const DEFAULT_STATE = {
    selectedFlowers: [], // Array of flower IDs
    selectedGreenery: [],
    selectedWrap: 'kraft',
    note: '',
};

export function useBouquetState() {
    const [state, setState] = useState(DEFAULT_STATE);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(false);

    // Load state from URL on mount
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const data = params.get('data');
        if (data) {
            try {
                const decoded = JSON.parse(atob(data));
                setState(prev => ({ ...prev, ...decoded }));
                setIsReadOnly(true);
            } catch (e) {
                console.error("Failed to parse bouquet data", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Update URL when state changes (only if in builder mode, ideally, but here we just sync)
    // Actually, we might want to expose a "generateLink" function instead of auto-syncing to avoid cluttering history
    // But strictly for persistence, auto-syncing might be annoying if user hits back button.
    // Let's rely on generateLink for sharing, but maybe keep local state for editing.

    const updateState = useCallback((updates) => {
        setState(prev => ({ ...prev, ...updates }));
    }, []);

    const addFlower = useCallback((flowerId) => {
        setState(prev => {
            if (prev.selectedFlowers.length >= 12) return prev; // Limit to 12
            return { ...prev, selectedFlowers: [...prev.selectedFlowers, flowerId] };
        });
    }, []);

    const removeFlower = useCallback((index) => {
        setState(prev => ({
            ...prev,
            selectedFlowers: prev.selectedFlowers.filter((_, i) => i !== index)
        }));
    }, []);

    return {
        state,
        updateState,
        addFlower,
        removeFlower,
        isLoaded,
        isReadOnly
    };
}

export function generateShareLink(state) {
    const json = JSON.stringify(state);
    const base64 = btoa(json);
    const url = new URL(window.location.href);
    url.searchParams.set('data', base64);
    return url.toString();
}
