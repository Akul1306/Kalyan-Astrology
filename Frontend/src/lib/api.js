const cleanCandra = (obj) => {
    if (typeof obj === "string") {
        return obj.replace(/\bCandra\b/g, "Chandra").replace(/\bcandra\b/g, "chandra");
    }
    if (Array.isArray(obj)) {
        return obj.map(cleanCandra);
    }
    if (typeof obj === "object" && obj !== null) {
        const cleaned = {};
        for (const [key, val] of Object.entries(obj)) {
            cleaned[key] = cleanCandra(val);
        }
        return cleaned;
    }
    return obj;
};

class KundliAPI {
    baseUrl = "/api/kundli";
    async generateKundli(formData) {
        const token = localStorage.getItem("kalyan_token");
        const headers = {
            "Content-Type": "application/json",
        };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${this.baseUrl}/generate`, {
            method: "POST",
            headers,
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || "Failed to generate Kundli");
        }
        return cleanCandra(await response.json());
    }
    async getKundli(id) {
        const response = await fetch(`${this.baseUrl}/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch Kundli");
        }
        return cleanCandra(await response.json());
    }
    async getUserKundlis() {
        const response = await fetch(`${this.baseUrl}/user`);
        if (!response.ok) {
            throw new Error("Failed to fetch user Kundlis");
        }
        return cleanCandra(await response.json());
    }
    async chatWithAI(message, astrologyUserId) {
        const token = localStorage.getItem("kalyan_token");
        const headers = {
            "Content-Type": "application/json",
        };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${this.baseUrl}/chat`, {
            method: "POST",
            headers,
            body: JSON.stringify({ message, astrologyUserId }),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to send chat message");
        }
        return cleanCandra(await response.json());
    }
    async calculateMatch(partner1, partner2) {
        const response = await fetch(`${this.baseUrl}/match`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ partner1, partner2 }),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to calculate matchmaking report");
        }
        return cleanCandra(await response.json());
    }
}
export const kundliAPI = new KundliAPI();
