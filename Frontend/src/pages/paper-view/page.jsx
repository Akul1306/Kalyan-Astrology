"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useKundliStore } from "@/lib/store";
import { Printer, Download, Share2, Calendar, MapPin, Clock } from "lucide-react";
import Link from "next/link";
export default function PaperViewPage() {
    const { currentKundli } = useKundliStore();
    const [selectedChart, setSelectedChart] = useState("lagna");
    const [paperSize, setPaperSize] = useState("a4");
    const [orientation, setOrientation] = useState("portrait");
    const printRef = useRef(null);
    const handlePrint = () => {
        window.print();
    };
    const handleDownload = () => {
        // In a real app, this would generate a PDF
        if (process.env.NODE_ENV === "development") {
            console.log("Downloading PDF...");
        }
    };
    if (!currentKundli) {
        return (<div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Kundli Available</h1>
          <p className="text-gray-600 mb-6">Please generate a Kundli first to view the paper format.</p>
          <Button asChild>
            <Link href="/dashboard">Generate Kundli</Link>
          </Button>
        </div>
      </div>);
    }
    return (<div className="min-h-screen bg-gray-50">
      {/* Print Controls - Hidden in print */}
      <div className="bg-white border-b border-gray-200 p-4 no-print">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Paper View</h1>
              <p className="text-gray-600">Print-friendly Kundli format</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Chart:</label>
                <Select value={selectedChart} onValueChange={setSelectedChart}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lagna">Lagna</SelectItem>
                    <SelectItem value="navamsa">Navamsa</SelectItem>
                    <SelectItem value="dashamsa">Dashamsa</SelectItem>
                    <SelectItem value="saptamsa">Saptamsa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Size:</label>
                <Select value={paperSize} onValueChange={setPaperSize}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a4">A4</SelectItem>
                    <SelectItem value="a3">A3</SelectItem>
                    <SelectItem value="letter">Letter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Layout:</label>
                <Select value={orientation} onValueChange={setOrientation}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portrait">Portrait</SelectItem>
                    <SelectItem value="landscape">Landscape</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator orientation="vertical" className="h-6"/>

              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2"/>
                Print
              </Button>

              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2"/>
                PDF
              </Button>

              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2"/>
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Content */}
      <div ref={printRef} className={`${(() => {
            const width = paperSize === "a4" ? "max-w-[210mm]" : paperSize === "a3" ? "max-w-[297mm]" : "max-w-[216mm]";
            const height = paperSize === "a4" ? "min-h-[297mm]" : paperSize === "a3" ? "min-h-[420mm]" : "min-h-[279mm]";
            const land = orientation === "landscape" ? "print-landscape" : "";
            return `bg-white mx-auto shadow-lg print-page ${width} ${height} ${land}`;
        })()}`}>
        {/* Header */}
        <div className="p-8 border-b-2 border-orange-200 print-padding">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">॥</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">जन्म कुंडली</h1>
                <p className="text-lg text-orange-600 font-medium">Birth Chart (Kundli)</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">Generated by Kalyan • Professional Vedic Astrology</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="p-8 print-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Personal Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="text-gray-900">{currentKundli.personalInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Gender:</span>
                  <span className="text-gray-900 capitalize">{currentKundli.personalInfo.gender}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Date of Birth:</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-gray-500"/>
                    <span className="text-gray-900">{currentKundli.personalInfo.dateOfBirth}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Time of Birth:</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-500"/>
                    <span className="text-gray-900">{currentKundli.personalInfo.timeOfBirth}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Place of Birth:</span>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-gray-500"/>
                    <span className="text-gray-900">{currentKundli.personalInfo.placeOfBirth}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Chart Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Ayanamsa:</span>
                  <span className="text-gray-900">Lahiri (Chitrapaksha)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Sunrise:</span>
                  <span className="text-gray-900">06:15 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Sunset:</span>
                  <span className="text-gray-900">06:45 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Day Length:</span>
                  <span className="text-gray-900">12h 30m</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Generated:</span>
                  <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Display */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-6">
              {selectedChart === "lagna" && "Lagna Chart (D1)"}
              {selectedChart === "navamsa" && "Navamsa Chart (D9)"}
              {selectedChart === "dashamsa" && "Dashamsa Chart (D10)"}
              {selectedChart === "saptamsa" && "Saptamsa Chart (D7)"}
            </h2>

            <div className="flex justify-center mb-6">
              <div className="grid grid-cols-4 gap-0 border-2 border-gray-800 w-80 h-80">
                {/* North Indian Chart Style */}
                {Array.from({ length: 16 }, (_, i) => {
            const houseNumber = i + 1;
            const planets = (currentKundli?.charts?.lagna?.houses?.[houseNumber]?.planets || []);
            return (<div key={i} className={`border border-gray-400 flex flex-col items-center justify-center p-1 text-xs ${i === 0 || i === 3 || i === 12 || i === 15 ? "bg-orange-50" : "bg-white"} min-h-20`}>
                      <div className="font-bold text-gray-700 mb-1">{houseNumber}</div>
                      <div className="text-center space-y-1">
                        {planets.map((planet, idx) => (<Badge key={idx} variant="outline" className="text-xs px-1 py-0">
                            {planet.symbol}
                          </Badge>))}
                      </div>
                    </div>);
        })}
              </div>
            </div>

            {/* Chart Legend */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Planets</h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="w-8 text-xs">
                      ☉
                    </Badge>
                    <span>Sun (Surya)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="w-8 text-xs">
                      ☽
                    </Badge>
                    <span>Moon (Chandra)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="w-8 text-xs">
                      ♂
                    </Badge>
                    <span>Mars (Mangal)</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">&nbsp;</h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="w-8 text-xs">
                      ☿
                    </Badge>
                    <span>Mercury (Budh)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="w-8 text-xs">
                      ♃
                    </Badge>
                    <span>Jupiter (Guru)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="w-8 text-xs">
                      ♀
                    </Badge>
                    <span>Venus (Shukra)</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">&nbsp;</h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="w-8 text-xs">
                      ♄
                    </Badge>
                    <span>Saturn (Shani)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="w-8 text-xs">
                      ☊
                    </Badge>
                    <span>Rahu</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="w-8 text-xs">
                      ☋
                    </Badge>
                    <span>Ketu</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Houses</h4>
                <div className="space-y-1 text-xs">
                  <div>1st - Self, Personality</div>
                  <div>2nd - Wealth, Family</div>
                  <div>3rd - Siblings, Courage</div>
                  <div>4th - Home, Mother</div>
                </div>
              </div>
            </div>
          </div>

          {/* Planetary Positions Table */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">Planetary Positions</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-3 py-2 text-left">Planet</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Sign</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Degree</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">House</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Nakshatra</th>
                  </tr>
                </thead>
                <tbody>
                  {(currentKundli.planetaryPositions || []).map((planet, index) => (<tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-300 px-3 py-2 font-medium">{planet.name ?? planet.planet}</td>
                      <td className="border border-gray-300 px-3 py-2">{planet.sign}</td>
                      <td className="border border-gray-300 px-3 py-2">{planet.degree}</td>
                      <td className="border border-gray-300 px-3 py-2">{planet.house}</td>
                      <td className="border border-gray-300 px-3 py-2">{planet.nakshatra ?? '-'}</td>
                    </tr>))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Predictions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">Key Predictions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(() => {
            const preds = (currentKundli.predictions || []);
            const by = (q) => preds.find(p => (p.category || "").toLowerCase().includes(q))?.description || "";
            const career = by("career") || by("finance");
            const health = by("health");
            const relationships = by("relationship") || by("love");
            const education = by("education");
            return (<>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900">Career & Finance</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {career?.slice(0, 200) || "Career predictions will be available after analysis."}
                        ...
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900">Health & Wellness</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {health?.slice(0, 200) || "Health predictions will be available after analysis."}
                        ...
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900">Relationships</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {relationships?.slice(0, 200) || "Relationship predictions will be available after analysis."}
                        ...
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900">Education</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {education?.slice(0, 200) || "Education predictions will be available after analysis."}
                        ...
                      </p>
                    </div>
                  </>);
        })()}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-orange-200 pt-6 text-center text-sm text-gray-600">
            <p className="mb-2">
              This Kundli has been generated using traditional Vedic astrology principles and calculations.
            </p>
            <p className="mb-2">
              For detailed consultation and personalized guidance, please consult with a qualified astrologer.
            </p>
            <p className="font-medium text-orange-600">
              Generated by Kalyan • www.kalyan.com • support@kalyan.com
            </p>
          </div>
        </div>
      </div>
    </div>);
}
