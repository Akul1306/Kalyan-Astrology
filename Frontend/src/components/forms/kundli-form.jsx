"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useKundliStore } from "@/lib/store";
import { kundliAPI } from "@/lib/api";

// ---------------- Schema ----------------
const kundliSchema = z.object({
    name: z.string().min(1, "Full Name is required"),
    day: z.string().min(1, "Day is required"),
    month: z.string().min(1, "Month is required"),
    year: z.string().min(1, "Year is required"),
    timeOfBirth: z.string().min(1, "Time of Birth is required"),
    placeOfBirth: z.string().min(1, "Place of Birth is required"),
    gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
});

// ---------------- Component ----------------
export function KundliForm({ title = "Generate Your Kundli", isFirstTime = false }) {
    const router = useRouter();
    const { setCurrentKundli, setLoading, setError, isLoading, error } = useKundliStore();
    const { register, handleSubmit, formState: { errors }, setValue, watch, } = useForm({
        resolver: zodResolver(kundliSchema),
        defaultValues: {
            gender: "male",
        },
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);
        const fullDOB = `${data.year}-${data.month}-${data.day}`;
        try {
            const res = await kundliAPI.generateKundli({
                name: data.name,
                dateOfBirth: fullDOB,
                timeOfBirth: data.timeOfBirth,
                placeOfBirth: data.placeOfBirth,
                gender: data.gender,
            });
            
            // Extract nested object
            const kundliObj = res.data?.kundli || res.kundli || res;
            setCurrentKundli(kundliObj);
            
            // Store astrologyUserId for chat bot persistence
            const astrologyUserId = kundliObj.astrologyUserId;
            if (astrologyUserId) {
                localStorage.setItem("astrology_user_id", astrologyUserId);
            }
            
            setError(null);
            // Redirect to the chatbot page upon clicking Generate Kundli
            router.push("/ai/chat");
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to generate Kundli";
            setError(errorMessage);
            if (process.env.NODE_ENV === "development") {
                console.error("Error generating kundli:", error);
            }
        }
        finally {
            setLoading(false);
        }
    };

    const debounceTimeout = useRef(null);
    const [suggestions, setSuggestions] = useState([]);

    const handlePlaceChange = async (value) => {
        setValue("placeOfBirth", value);
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        if (value.trim().length > 2) {
            debounceTimeout.current = setTimeout(async () => {
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&featuretype=settlement&limit=6&addressdetails=1`,
                        {
                            headers: {
                                "Accept-Language": "en",
                            },
                        }
                    );
                    if (response.ok) {
                        const data = await response.json();
                        const citySuggestions = data.map((item) => {
                            const address = item.address;
                            if (!address) return item.display_name;
                            const city = address.city || address.town || address.village || address.suburb || address.municipality || item.name;
                            const state = address.state || address.region || address.county;
                            const country = address.country;
                            
                            const parts = [];
                            if (city) parts.push(city);
                            if (state) parts.push(state);
                            if (country) parts.push(country);
                            
                            return parts.length > 0 ? parts.join(", ") : item.display_name;
                        });
                        const uniqueSuggestions = [...new Set(citySuggestions)].filter(Boolean);
                        setSuggestions(uniqueSuggestions);
                    }
                } catch (err) {
                    console.error("Error fetching place suggestions:", err);
                }
            }, 300);
        } else {
            setSuggestions([]);
        }
    };

    return (<Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        {isFirstTime && <p className="text-sm text-muted-foreground">Welcome! Let's create your first Kundli</p>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4"/> Full Name
            </Label>
            <Input id="name" placeholder="Enter your full name" {...register("name")}/>
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Date of Birth (Dropdowns) */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="w-4 h-4"/> Date of Birth
            </Label>
            <div className="flex gap-2">
              <select {...register("day")} className="border rounded p-2 w-1/3">
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => (<option key={i + 1} value={i + 1}>{i + 1}</option>))}
              </select>
              <select {...register("month")} className="border rounded p-2 w-1/3">
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => (<option key={i + 1} value={i + 1}>{i + 1}</option>))}
              </select>
              <select {...register("year")} className="border rounded p-2 w-1/3">
                <option value="">Year</option>
                {Array.from({ length: 120 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return <option key={year} value={year}>{year}</option>;
        })}
              </select>
            </div>
            {(errors.day || errors.month || errors.year) && (<p className="text-red-500 text-sm">Please select a valid date</p>)}
          </div>

          {/* Time of Birth */}
          <div className="space-y-2">
            <Label htmlFor="tob" className="flex items-center gap-2">
              <Clock className="w-4 h-4"/> Time of Birth
            </Label>
            <Input id="tob" type="time" {...register("timeOfBirth")}/>
            {errors.timeOfBirth && <p className="text-red-500 text-sm">{errors.timeOfBirth.message}</p>}
          </div>

          {/* Place of Birth (with suggestions) */}
          <div className="space-y-2 relative">
            <Label htmlFor="pob" className="flex items-center gap-2">
              <MapPin className="w-4 h-4"/> Place of Birth
            </Label>
            <Input id="pob" placeholder="Place of Birth" {...register("placeOfBirth")} onChange={(e) => {
                register("placeOfBirth").onChange(e);
                handlePlaceChange(e.target.value);
            }}/>
            {errors.placeOfBirth && <p className="text-red-500 text-sm">{errors.placeOfBirth.message}</p>}

            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (<div className="absolute bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg shadow-lg mt-1 w-full z-50 max-h-60 overflow-y-auto">
                {suggestions.map((s, i) => (<div key={i} className="px-4 py-2.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 text-sm text-gray-700 dark:text-neutral-200 transition-colors" onClick={() => {
                    setValue("placeOfBirth", s);
                    setSuggestions([]);
                }}>
                    {s}
                  </div>))}
              </div>)}
          </div>

          {/* Gender (Radio Buttons) */}
          <div className="space-y-2">
            <Label>Gender</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" value="male" {...register("gender")}/> Male
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="female" {...register("gender")}/> Female
              </label>
            </div>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>

          {error && (<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              <p className="text-sm">{error}</p>
            </div>)}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Kundli"}
          </Button>
        </form>
      </CardContent>
    </Card>);
}
