import { NextResponse } from "next/server";
// Helper function to generate chart data based on form data
function generateChartData(formData) {
    // Generate pseudo-random but consistent chart data based on form inputs
    const seed = formData.name.length + formData.dateOfBirth.length + formData.timeOfBirth.length;
    // Birth Chart (3x3 grid)
    const birthChart = [
        [(seed % 12) + 1, ((seed * 2) % 12) + 1, ((seed * 3) % 12) + 1],
        [((seed * 4) % 12) + 1, 0, ((seed * 5) % 12) + 1],
        [((seed * 6) % 12) + 1, ((seed * 7) % 12) + 1, ((seed * 8) % 12) + 1],
    ];
    // Navamsa Chart
    const navamsa = [
        [((seed * 9) % 12) + 1, ((seed * 10) % 12) + 1, ((seed * 11) % 12) + 1],
        [((seed * 12) % 12) + 1, 0, ((seed * 13) % 12) + 1],
        [((seed * 14) % 12) + 1, ((seed * 15) % 12) + 1, ((seed * 16) % 12) + 1],
    ];
    // Dashamsa Chart
    const dashamsa = [
        [((seed * 17) % 12) + 1, ((seed * 18) % 12) + 1, ((seed * 19) % 12) + 1],
        [((seed * 20) % 12) + 1, 0, ((seed * 21) % 12) + 1],
        [((seed * 22) % 12) + 1, ((seed * 23) % 12) + 1, ((seed * 24) % 12) + 1],
    ];
    return { birthChart, navamsa, dashamsa };
}
// Helper function to generate planetary positions
function generatePlanetaryPositions(formData) {
    const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
    const signs = [
        "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
        "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
    ];
    const seed = formData.name.length + formData.dateOfBirth.length;
    return planets.map((planet, index) => {
        const signIndex = (seed + index * 3) % 12;
        const house = (seed + index * 5) % 12 + 1;
        const degree = `${((seed + index) * 7) % 30}°${((seed + index) * 11) % 60}'`;
        return {
            planet,
            sign: signs[signIndex],
            degree,
            house,
        };
    });
}
// Helper function to generate predictions
function generatePredictions() {
    return [
        {
            category: "Career & Profession",
            description: "Excellent prospects in technology and communication fields. Strong potential for growth and advancement in your chosen field.",
            strength: "high",
        },
        {
            category: "Finance & Wealth",
            description: "Steady financial growth with multiple income sources. Good opportunities for investments and savings.",
            strength: "high",
        },
        {
            category: "Health & Vitality",
            description: "Generally robust health with strong immunity. Maintain regular exercise and a balanced diet.",
            strength: "medium",
        },
        {
            category: "Marriage & Relationships",
            description: "Harmonious relationships with spouse and family. Favorable time for partnerships and commitments.",
            strength: "high",
        },
        {
            category: "Education & Learning",
            description: "Strong inclination towards higher studies and research. Good time to pursue certifications or skill development.",
            strength: "medium",
        },
    ];
}
export async function POST(request) {
    try {
        const formData = await request.json();
        // Validate required fields
        if (!formData.name || !formData.dateOfBirth || !formData.timeOfBirth || !formData.placeOfBirth || !formData.gender) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        // Generate kundli data
        const charts = generateChartData(formData);
        const planetaryPositions = generatePlanetaryPositions(formData);
        const predictions = generatePredictions();
        // Create kundli object
        const kundli = {
            id: `kundli_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
            name: formData.name,
            dateOfBirth: formData.dateOfBirth,
            placeOfBirth: formData.placeOfBirth,
            personalInfo: formData,
            charts,
            planetaryPositions,
            predictions,
            generatedAt: new Date().toISOString(),
        };
        return NextResponse.json(kundli, { status: 200 });
    }
    catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error("Error generating kundli:", error);
        }
        return NextResponse.json({ error: "Failed to generate kundli" }, { status: 500 });
    }
}
