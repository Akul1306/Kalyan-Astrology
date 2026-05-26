"use client";
import React, { useState, useEffect } from "react";
import { ProfileDashboard } from "@/components/users/profile-dashboard";
import { kundliHistory as fallbackHistory, profileStats as fallbackStats, userProfile } from "@/lib/dashboard-data";
import { useKundliStore } from "@/lib/store";
import { updateProfileAPI } from "@/lib/auth";

export default function ProfilePage() {
    const store = useKundliStore();
    const { currentUser, token, isAuthenticated } = store;
    
    const [testHistory, setTestHistory] = useState([]);
    const [savedKundlis, setSavedKundlis] = useState([]);
    const [ordersCount, setOrdersCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!isAuthenticated || !token) {
                setLoading(false);
                return;
            }
            try {
                // Fetch concurrently for speed
                const [resTests, resKundlis, resOrders] = await Promise.all([
                    fetch("/api/tests/history", { headers: { "Authorization": `Bearer ${token}` } }),
                    fetch("/api/kundli", { headers: { "Authorization": `Bearer ${token}` } }),
                    fetch("/api/orders", { headers: { "Authorization": `Bearer ${token}` } })
                ]);

                if (resTests.ok) {
                    const data = await resTests.json();
                    if (data.status === "success" && data.data?.history) {
                        setTestHistory(data.data.history);
                    }
                }

                if (resKundlis.ok) {
                    const data = await resKundlis.json();
                    if (data.status === "success" && data.data?.kundlis) {
                        setSavedKundlis(data.data.kundlis);
                    }
                }

                if (resOrders.ok) {
                    const data = await resOrders.json();
                    if (data.status === "success" && data.data?.orders) {
                        setOrdersCount(data.data.orders.length);
                    }
                }

            } catch (error) {
                console.error("Error fetching profile dashboard details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [token, isAuthenticated]);

    // Handle profile update
    const handleSaveProfile = async (updatedFields) => {
        try {
            const res = await updateProfileAPI({
                name: updatedFields.name,
                placeOfBirth: updatedFields.location,
                bio: updatedFields.bio
            });
            if (res.status === "success" && res.data?.user) {
                store.updateUser(res.data.user);
                return true;
            }
        } catch (err) {
            console.error("Failed to update profile from dashboard:", err);
        }
        return false;
    };

    // Calculate real live stats
    const stats = [
        {
            label: "Saved Charts",
            value: String(savedKundlis.length),
            helper: "Stored in Kalyan Cloud",
            trend: "+14%",
        },
        {
            label: "Tests Completed",
            value: String(testHistory.length),
            helper: testHistory.length > 0 ? `Latest score: ${Math.round((testHistory[0].score / (testHistory[0].totalQuestions || 10)) * 100)}%` : "No attempts yet",
            trend: "+2%",
        },
        {
            label: "Purchases",
            value: String(ordersCount),
            helper: "Blessed spiritual items",
            trend: "+6%",
        },
    ];

    // Map saved kundlis for Recent Charts history list
    const mappedHistory = savedKundlis.map((k) => ({
        id: k._id,
        title: k.title,
        chartType: `${k.type || "D1"} • Lagna`,
        generatedAt: new Date(k.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        }),
        feeling: `Birthplace: ${k.personalInfo?.placeOfBirth || "Unknown"}`,
        status: k.status || "ready",
    }));

    // Merge real database user details with additional visual/dashboard fields
    const user = {
        ...userProfile,
        name: currentUser?.name || userProfile.name,
        email: currentUser?.email || userProfile.email,
        phone: currentUser?.phone || userProfile.phone || "",
        bio: currentUser?.bio || userProfile.bio || "",
        location: currentUser?.placeOfBirth || userProfile.location || "",
        avatar: currentUser?.avatar || userProfile.avatar,
    };

    return (
        <ProfileDashboard 
            user={user} 
            stats={stats} 
            history={mappedHistory.length > 0 ? mappedHistory : fallbackHistory} 
            testHistory={testHistory}
            loadingHistory={loading}
            onSaveProfile={handleSaveProfile}
        />
    );
}

