import Kundli from "./kundliModel.js";
import User from "../auth/userModel.js";
import AppError from "../../utils/appError.js";

// @desc    Generate Kundli
// @route   POST /api/kundli/generate
export const generateKundli = async (req, res, next) => {
  try {
    // 1. Support both flat frontend structure and nested backend structure
    const name = req.body.name || req.body.personalInfo?.name;
    const dateOfBirth = req.body.dateOfBirth || req.body.personalInfo?.dateOfBirth;
    const timeOfBirth = req.body.timeOfBirth || req.body.personalInfo?.timeOfBirth;
    const placeOfBirth = req.body.placeOfBirth || req.body.personalInfo?.placeOfBirth;
    const gender = req.body.gender || req.body.personalInfo?.gender;
    const type = req.body.type || "D1";

    if (!name || !dateOfBirth || !timeOfBirth || !placeOfBirth) {
      return next(new AppError("Please provide all required Kundli parameters", 400));
    }

    const title = req.body.title || `${name}'s Kundli`;

    // 2. Format Date of Birth (YYYY-MM-DD)
    let formattedDOB = dateOfBirth;
    if (dateOfBirth instanceof Date) {
      formattedDOB = dateOfBirth.toISOString().split("T")[0];
    } else if (typeof dateOfBirth === "string") {
      const parts = dateOfBirth.split("-");
      if (parts.length === 3) {
        const year = parts[0];
        const month = parts[1].padStart(2, "0");
        const day = parts[2].padStart(2, "0");
        formattedDOB = `${year}-${month}-${day}`;
      }
    }

    // 3. Format Time of Birth (HH:MM:SS.sssZ or similar)
    let formattedTOB = timeOfBirth;
    if (timeOfBirth && timeOfBirth.includes(":") && !timeOfBirth.endsWith("Z")) {
      const parts = timeOfBirth.split(":");
      const hours = parts[0].padStart(2, "0");
      const minutes = parts[1].padStart(2, "0");
      formattedTOB = `${hours}:${minutes}:00.000Z`;
    }

    // 4. Call external astrology bot API to register and get user_id
    const astrologyBotUrl = "https://astrology-bot-production-ee1c.up.railway.app";
    let astrologyUserId = null;

    try {
      const registerPayload = {
        name,
        dob: formattedDOB,
        tob: formattedTOB,
        place: placeOfBirth,
      };

      console.log("Registering astrology bot user via POST /register:", registerPayload);

      const registerRes = await fetch(`${astrologyBotUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerPayload),
      });

      if (registerRes.ok) {
        const registerData = await registerRes.json();
        astrologyUserId = registerData.user_id;
        console.log("Astrology bot registration successful! user_id:", astrologyUserId);
      } else {
        const errText = await registerRes.text();
        console.error("Astrology bot registration failed:", errText);
      }
    } catch (err) {
      console.error("Error communicating with astrology bot registration:", err);
    }

    // 5. Update authenticated user's profile with generated astrologyUserId
    if (req.user && astrologyUserId) {
      await User.findByIdAndUpdate(req.user.id, { astrologyUserId });
      console.log(`Successfully saved astrologyUserId ${astrologyUserId} to user profile ${req.user.id}`);
    }

    // 6. Populate rich chartData to keep front-end dashboard robust and fully compatible
    const personalInfo = {
      name,
      dateOfBirth: new Date(dateOfBirth),
      timeOfBirth,
      placeOfBirth,
      gender: gender ? (gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase()) : "Male",
    };

    const mockChartData = {
      charts: {
        birthChart: [
          [7, 0, 0],
          [0, 1, 8],
          [6, 5, 4],
        ],
        navamsa: [
          [3, 9, 2],
          [4, 1, 12],
          [5, 6, 11],
        ],
        dashamsa: [
          [2, 3, 1],
          [11, 1, 5],
          [10, 9, 6],
        ],
      },
      planetaryPositions: [
        { planet: "Sun", sign: "Pisces", degree: "24°18'", house: 7 },
        { planet: "Moon", sign: "Gemini", degree: "12°45'", house: 10 },
        { planet: "Mars", sign: "Capricorn", degree: "8°32'", house: 5 },
        { planet: "Mercury", sign: "Aquarius", degree: "15°22'", house: 6 },
        { planet: "Jupiter", sign: "Cancer", degree: "28°15'", house: 11 },
        { planet: "Venus", sign: "Aries", degree: "5°48'", house: 8 },
        { planet: "Saturn", sign: "Sagittarius", degree: "22°12'", house: 4 },
        { planet: "Rahu", sign: "Aquarius", degree: "18°35'", house: 6 },
        { planet: "Ketu", sign: "Leo", degree: "18°35'", house: 12 },
      ],
      predictions: [
        {
          category: "Career & Profession",
          description: `Excellent prospects in technology and communication fields for ${name}. Jupiter in 11th house brings gains through networking and partnerships. Promotion or job change likely in next 6 months.`,
          strength: "high",
        },
        {
          category: "Finance & Wealth",
          description: "Steady financial growth with multiple income sources. Venus in 8th house suggests gains through investments. Avoid major expenses in Mercury retrograde periods.",
          strength: "high",
        },
        {
          category: "Health & Vitality",
          description: "Generally robust health with strong immunity. Mars in 5th house gives good physical strength. Pay attention to digestive health and avoid stress-related issues.",
          strength: "medium",
        },
        {
          category: "Marriage & Relationships",
          description: "Harmonious relationships with spouse and family. Moon in 10th house brings emotional stability. Favorable time for marriage proposals and partnerships.",
          strength: "high",
        },
      ]
    };

    // 7. Save newly generated Kundli to database
    const newKundli = await Kundli.create({
      user: req.user ? req.user.id : undefined,
      title,
      personalInfo,
      type,
      chartData: mockChartData,
      astrologyUserId,
      status: "ready",
    });

    res.status(201).json({
      status: "success",
      data: {
        kundli: newKundli,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Chat with Astrology Bot proxy
// @route   POST /api/kundli/chat
export const chatWithAstrologyBot = async (req, res, next) => {
  try {
    const { message, astrologyUserId } = req.body;

    if (!message) {
      return next(new AppError("Please provide a message", 400));
    }

    // Resolve astrologyUserId: 
    // 1. Check if provided in body (useful for guest chat or fast routing)
    // 2. Otherwise, check if user is logged in and check their profile
    let userId = astrologyUserId;
    if (!userId && req.user) {
      const user = await User.findById(req.user.id);
      userId = user?.astrologyUserId;
    }

    if (!userId) {
      return next(new AppError("No astrology bot session found. Please generate a Kundli first.", 400));
    }

    const astrologyBotUrl = "https://astrology-bot-production-ee1c.up.railway.app";
    console.log(`Proxying chat request for user_id ${userId}: "${message}"`);

    const response = await fetch(`${astrologyBotUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        message,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Astrology bot chat error response:", errText);
      return next(new AppError(`Astrology bot returned an error: ${response.statusText}`, response.status));
    }

    const data = await response.json();
    console.log("Astrology bot response received successfully:", data);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all saved Kundlis for logged in user
// @route   GET /api/kundli
export const getSavedKundlis = async (req, res, next) => {
  try {
    const kundlis = await Kundli.find({ user: req.user.id });

    res.status(200).json({
      status: "success",
      results: kundlis.length,
      data: {
        kundlis,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get specific Kundli
// @route   GET /api/kundli/:id
export const getKundliById = async (req, res, next) => {
  try {
    const kundli = await Kundli.findById(req.params.id);

    if (!kundli) {
      return next(new AppError("No Kundli found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        kundli,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete specific Kundli
// @route   DELETE /api/kundli/:id
export const deleteKundli = async (req, res, next) => {
  try {
    const kundli = await Kundli.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // Only allow user to delete their own kundli
    });

    if (!kundli) {
      return next(new AppError("No Kundli found with that ID or unauthorized", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Perform Ashtakoot Guna Milan Matchmaking
// @route   POST /api/kundli/match
export const getMatchmakingDetails = async (req, res, next) => {
  try {
    const { partner1, partner2 } = req.body;

    if (!partner1 || !partner2) {
      return next(new AppError("Please provide details for both partners", 400));
    }

    const pad = (num) => String(num).padStart(2, "0");

    // Helper function to geocode a place using Nominatim
    const geocodePlace = async (placeName) => {
      try {
        console.log(`Geocoding place: ${placeName}`);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(placeName)}&format=json&limit=1`,
          {
            headers: {
              "User-Agent": "astrology-bot",
              "Accept-Language": "en"
            }
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            return {
              lat: data[0].lat,
              lon: data[0].lon,
              displayName: data[0].display_name
            };
          }
        }
      } catch (err) {
        console.error(`Geocoding error for ${placeName}:`, err);
      }
      // Fallback coordinates (New Delhi)
      return {
        lat: "28.6139",
        lon: "77.2090",
        displayName: "New Delhi, Delhi, India"
      };
    };

    // Geocode both partners
    const geo1 = await geocodePlace(partner1.placeOfBirth);
    const geo2 = await geocodePlace(partner2.placeOfBirth);

    // Calculate timezones (India is 5.5, otherwise calculate from longitude)
    const calculateTz = (displayName, lon) => {
      if (displayName.toLowerCase().includes("india")) {
        return 5.5;
      }
      // Standard estimation: longitude / 15 rounded to nearest 0.5 hour increment
      return Math.round((Number(lon) / 15) * 2) / 2;
    };

    const tz1 = calculateTz(geo1.displayName, geo1.lon);
    const tz2 = calculateTz(geo2.displayName, geo2.lon);

    // Format DOBs as DD/MM/YYYY
    const dob1 = `${pad(partner1.day)}/${pad(partner1.month)}/${partner1.year}`;
    const dob2 = `${pad(partner2.day)}/${pad(partner2.month)}/${partner2.year}`;

    // Format TOBs as HH:MM
    const tob1 = `${pad(partner1.hour)}:${pad(partner1.minute)}`;
    const tob2 = `${pad(partner2.hour)}:${pad(partner2.minute)}`;

    // Determine male and female parameters
    let male, female;
    if (partner1.gender === "male") {
      male = { dob: dob1, tob: tob1, lat: geo1.lat, lon: geo1.lon, tz: tz1 };
      female = { dob: dob2, tob: tob2, lat: geo2.lat, lon: geo2.lon, tz: tz2 };
    } else if (partner2.gender === "male") {
      male = { dob: dob2, tob: tob2, lat: geo2.lat, lon: geo2.lon, tz: tz2 };
      female = { dob: dob1, tob: tob1, lat: geo1.lat, lon: geo1.lon, tz: tz1 };
    } else {
      // Default: Partner 1 is male, Partner 2 is female
      male = { dob: dob1, tob: tob1, lat: geo1.lat, lon: geo1.lon, tz: tz1 };
      female = { dob: dob2, tob: tob2, lat: geo2.lat, lon: geo2.lon, tz: tz2 };
    }

    const API_KEY = process.env.ASTROLOGY_API_KEY || "vai_pk_MKaZLt7tXDB1lpT8E3DKfOctHzkcla0d";
    const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "66d01e2f4emshb6a3df863a16b66p1d87d9jsnc431a1c4c991";

    const commonParams = `api_key=${API_KEY}&ayanamsa=lahiri&lang=en&m_dob=${male.dob}&m_tob=${male.tob}&m_lat=${male.lat}&m_lon=${male.lon}&m_tz=${male.tz}&f_dob=${female.dob}&f_tob=${female.tob}&f_lat=${female.lat}&f_lon=${female.lon}&f_tz=${female.tz}`;
    const urlAstroDetails = `https://vedintel-astroapi.p.rapidapi.com/api/v1/matching/north-match-astro-details?${commonParams}`;
    const urlGunaMilan = `https://vedintel-astroapi.p.rapidapi.com/api/v1/matching/north-match?${commonParams}`;

    console.log("Calling VedIntel Matchmaking APIs...");

    const headers = {
      "Content-Type": "application/json",
      "x-rapidapi-host": "vedintel-astroapi.p.rapidapi.com",
      "x-rapidapi-key": RAPIDAPI_KEY,
    };

    const [resAstro, resGuna] = await Promise.all([
      fetch(urlAstroDetails, { method: "GET", headers }).catch(err => {
        console.error("Error fetching Astro Details:", err);
        return null;
      }),
      fetch(urlGunaMilan, { method: "GET", headers }).catch(err => {
        console.error("Error fetching Guna Milan:", err);
        return null;
      })
    ]);

    let astroDetailsData = null;
    let gunaMilanData = null;

    if (resAstro && resAstro.ok) {
      const json = await resAstro.json();
      astroDetailsData = json.response;
    } else if (resAstro) {
      const errText = await resAstro.text();
      console.error("Astro Details error response:", errText);
    }

    if (resGuna && resGuna.ok) {
      const json = await resGuna.json();
      gunaMilanData = json.response;
    } else if (resGuna) {
      const errText = await resGuna.text();
      console.error("Guna Milan error response:", errText);
    }

    if (!gunaMilanData && !astroDetailsData) {
      return next(new AppError("Failed to fetch matchmaking analysis from Vedic API", 500));
    }

    console.log("Successfully fetched and merged matchmaking analysis!");

    res.status(200).json({
      status: "success",
      data: {
        astroDetails: astroDetailsData,
        gunaMilan: gunaMilanData,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update specific Kundli
// @route   PUT /api/kundli/:id
export const updateKundli = async (req, res, next) => {
  try {
    const { name, dob, tob, place, gender, rashi, nakshatra, lagna, title, tags } = req.body;

    const kundli = await Kundli.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!kundli) {
      return next(new AppError("No Kundli found with that ID or unauthorized", 404));
    }

    if (title) kundli.title = title;
    
    // Update personalInfo fields if provided
    if (name) kundli.personalInfo.name = name;
    if (dob) kundli.personalInfo.dateOfBirth = new Date(dob);
    if (tob) kundli.personalInfo.timeOfBirth = tob;
    if (place) kundli.personalInfo.placeOfBirth = place;
    if (gender) kundli.personalInfo.gender = gender;

    // Update tags
    if (tags !== undefined) {
      kundli.tags = Array.isArray(tags) ? tags : tags.split(",").map(t => t.trim());
    }

    // Support updating rashi/nakshatra/lagna within chartData if desired
    if (rashi || nakshatra || lagna) {
      if (!kundli.chartData) kundli.chartData = {};
      if (rashi) {
        if (!kundli.chartData.planetaryPositions) {
          kundli.chartData.planetaryPositions = [];
        }
        const moonIdx = kundli.chartData.planetaryPositions.findIndex(p => p.planet === "Moon");
        if (moonIdx > -1) {
          kundli.chartData.planetaryPositions[moonIdx].sign = rashi;
        } else {
          kundli.chartData.planetaryPositions.push({ planet: "Moon", sign: rashi, degree: "0°0'", house: 1 });
        }
      }
      if (nakshatra) kundli.chartData.nakshatra = nakshatra;
      if (lagna) kundli.chartData.lagna = lagna;
      
      kundli.markModified("chartData");
    }

    await kundli.save();

    res.status(200).json({
      status: "success",
      data: {
        kundli,
      },
    });
  } catch (err) {
    next(err);
  }
};

