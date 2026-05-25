"use client";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, User, Clock } from "lucide-react";

/* ------------------ Schema ------------------ */
const partnerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    day: z.string().min(1, "Day is required"),
    month: z.string().min(1, "Month is required"),
    year: z.string().min(1, "Year is required"),
    hour: z.string().min(1, "Hour is required"),
    minute: z.string().min(1, "Minute is required"),
    placeOfBirth: z.string().min(1, "Place is required"),
    gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
});

/* ------------------ UI ------------------ */
export default function MatchMaking({ title, defaultGender, onSubmit, onChange, }) {
    const { register, handleSubmit, formState: { errors }, setValue, watch, } = useForm({
        resolver: zodResolver(partnerSchema),
        defaultValues: { gender: defaultGender },
    });

    const debounceTimeout = useRef(null);
    const [suggestions, setSuggestions] = useState([]);
    const onChangeRef = useRef(onChange);

    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    useEffect(() => {
        if (!onChange)
            return;
        const subscription = watch((value) => {
            if (onChangeRef.current) {
                onChangeRef.current(value);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

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

    return (<Card className="
        w-full max-w-sm rounded-2xl bg-white/50 shadow-xl border border-white/20 
       backdrop-blur-xl 
        transition-all
      ">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-xl font-semibold tracking-tight text-gray-900">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* Name */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-gray-700">
            <User className="w-4 h-4 text-gray-600"/> Name
          </Label>
          <Input placeholder="Enter name" {...register("name")} className="glass-input"/>
          {errors.name && <p className="error-text">{errors.name.message}</p>}
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label className="text-gray-700">Gender</Label>
          <div className="flex gap-4">
            {["male", "female"].map((g) => (<label key={g} className="flex items-center gap-2 text-gray-700">
                <input type="radio" value={g} {...register("gender")}/>
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>))}
          </div>
          {errors.gender && <p className="error-text">{errors.gender.message}</p>}
        </div>

        {/* Birth Date */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-4 h-4 text-gray-600"/> Birth Date
          </Label>

          <div className="grid grid-cols-3 gap-2">
            <select {...register("day")} className="glass-select">
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => (<option key={i + 1}>{i + 1}</option>))}
            </select>

            <select {...register("month")} className="glass-select">
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, i) => (<option key={i + 1}>{i + 1}</option>))}
            </select>

            <select {...register("year")} className="glass-select">
              <option value="">Year</option>
              {Array.from({ length: 120 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (<option key={year} value={year}>
                    {year}
                  </option>);
        })}
            </select>
          </div>

          {(errors.day || errors.month || errors.year) && (<p className="error-text">Please select a valid date</p>)}
        </div>

        {/* Birth Time (NEW) */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-gray-700">
            <Clock className="w-4 h-4 text-gray-600"/> Birth Time
          </Label>

          <div className="grid grid-cols-2 gap-2">
            <select {...register("hour")} className="glass-select">
              <option value="">Hour</option>
              {Array.from({ length: 24 }, (_, i) => (<option key={i}>{i.toString().padStart(2, "0")}</option>))}
            </select>

            <select {...register("minute")} className="glass-select">
              <option value="">Minute</option>
              {Array.from({ length: 60 }, (_, i) => (<option key={i}>{i.toString().padStart(2, "0")}</option>))}
            </select>
          </div>

          {(errors.hour || errors.minute) && (<p className="error-text">Please select valid birth time</p>)}
        </div>

        {/* Place of Birth */}
        <div className="space-y-2 relative">
          <Label className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-4 h-4 text-gray-600"/> Place of Birth
          </Label>

          <Input placeholder="City, State, Country" {...register("placeOfBirth")} onChange={(e) => {
                register("placeOfBirth").onChange(e);
                handlePlaceChange(e.target.value);
            }} className="glass-input"/>

          {errors.placeOfBirth && (<p className="error-text">{errors.placeOfBirth.message}</p>)}

          {suggestions.length > 0 && (<div className="absolute w-full bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-xl z-50 mt-1 max-h-60 overflow-y-auto backdrop-blur-md">
              {suggestions.map((s, i) => (<div key={i} className="px-4 py-2.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 text-sm text-gray-700 dark:text-neutral-200 transition-colors" onClick={() => {
                    setValue("placeOfBirth", s);
                    setSuggestions([]);
                }}>
                  {s}
                </div>))}
            </div>)}
        </div>

        {/* Submit */}
        <Button type="submit" className="
            w-full py-3 rounded-xl 
            bg-yellow-500 hover:bg-yellow-600 
            text-white font-medium tracking-wide 
            shadow-lg shadow-yellow-200/40
          " onClick={handleSubmit(onSubmit)}>
          Import Kundli
        </Button>
      </CardContent>
    </Card>);
}
