import { create } from "zustand";
import { sampleKundliData, additionalSampleKundlis } from "./dummy-data";

// Safe localStorage parsing
const getStoredAuth = () => {
    try {
        const token = localStorage.getItem("kalyan_token");
        const user = localStorage.getItem("kalyan_user");
        if (token && user) {
            return {
                token,
                currentUser: JSON.parse(user),
                isAuthenticated: true
            };
        }
    } catch (e) {
        console.error("Failed to parse auth from localStorage", e);
    }
    return {
        token: null,
        currentUser: null,
        isAuthenticated: false
    };
};

const initialAuth = getStoredAuth();

export const useKundliStore = create((set, get) => ({
    currentKundli: sampleKundliData,
    userKundlis: [sampleKundliData, ...additionalSampleKundlis],
    kundliHistory: [sampleKundliData, ...additionalSampleKundlis],
    currentUser: initialAuth.currentUser,
    token: initialAuth.token,
    isAuthenticated: initialAuth.isAuthenticated,
    isLoading: false,
    error: null,
    setCurrentKundli: (kundli) => {
        if (!kundli) {
            set({ currentKundli: null });
            return;
        }
        const rawKundliObj = kundli.data?.kundli || kundli.kundli || kundli;
        const normalized = {
            ...rawKundliObj,
            name: rawKundliObj.personalInfo?.name || rawKundliObj.name,
            dateOfBirth: rawKundliObj.personalInfo?.dateOfBirth 
                ? new Date(rawKundliObj.personalInfo.dateOfBirth).toISOString().split('T')[0] 
                : rawKundliObj.dateOfBirth,
            placeOfBirth: rawKundliObj.personalInfo?.placeOfBirth || rawKundliObj.placeOfBirth,
            charts: rawKundliObj.chartData?.charts || rawKundliObj.charts || {},
            planetaryPositions: rawKundliObj.chartData?.planetaryPositions || rawKundliObj.planetaryPositions || [],
            predictions: rawKundliObj.chartData?.predictions || rawKundliObj.predictions || [],
        };
        set({ currentKundli: normalized });
    },
    setUserKundlis: (kundlis) => set({ userKundlis: kundlis }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),
    updateUser: (userData) => set((state) => {
        const updated = state.currentUser ? { ...state.currentUser, ...userData } : null;
        if (updated) {
            localStorage.setItem("kalyan_user", JSON.stringify(updated));
        }
        return { currentUser: updated };
    }),
    setUser: (user, token) => {
        if (user && token) {
            localStorage.setItem("kalyan_token", token);
            localStorage.setItem("kalyan_user", JSON.stringify(user));
            set({ currentUser: user, token, isAuthenticated: true });
        } else {
            localStorage.removeItem("kalyan_token");
            localStorage.removeItem("kalyan_user");
            set({ currentUser: null, token: null, isAuthenticated: false });
        }
    },
    logout: () => {
        localStorage.removeItem("kalyan_token");
        localStorage.removeItem("kalyan_user");
        set({ currentUser: null, token: null, isAuthenticated: false });
    }
}));
