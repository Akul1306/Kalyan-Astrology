"use client";
import React, { useState, useEffect } from "react";
import { ProfileDashboard } from "@/components/users/profile-dashboard";
import { kundliHistory, profileStats, userProfile } from "@/lib/dashboard-data";
import { useKundliStore } from "@/lib/store";

export default function ProfilePage() {
    const { currentUser, token, isAuthenticated } = useKundliStore();
    const [testHistory, setTestHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestHistory = async () => {
            if (!isAuthenticated || !token) {
                setLoading(false);
                return;
            }
            try {
                const response = await fetch("/api/tests/history", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.status === "success" && data.data?.history) {
                        setTestHistory(data.data.history);
                    }
                }
            } catch (error) {
                console.error("Error fetching test history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestHistory();
    }, [token, isAuthenticated]);

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
            stats={profileStats} 
            history={kundliHistory} 
            testHistory={testHistory}
            loadingHistory={loading}
        />
    );
}
