"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Globe, KeyRound, ShieldCheck, Lock, Database, AlertTriangle, Loader2 } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { QuickActionsPanel } from "@/components/dashboard/quick-actions-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useKundliStore } from "@/lib/store";
import { updateProfileAPI } from "@/lib/auth";
/* ------------------------------- OPTIONS ------------------------------ */
const preferenceOptions = [
    { label: "Career focus (10th house)", value: "Career" },
    { label: "Healing & wellness (6th/8th)", value: "Wellness" },
    { label: "Relationships & marriage (7th)", value: "Relationships" },
    { label: "Inner growth & spirituality (12th)", value: "Spirituality" },
];
const motionConfig = { duration: 0.35, ease: [0.16, 1, 0.3, 1] };
/* --------------------------------------------------------------------- */
export default function SettingsClient() {
    const store = useKundliStore();
    const currentUser = store.currentUser;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [placeOfBirth, setPlaceOfBirth] = useState("");
    const [timeOfBirth, setTimeOfBirth] = useState("");
    const [language, setLanguage] = useState("english");
    const [timezone, setTimezone] = useState("asia/kolkata");
    const [preference, setPreference] = useState(preferenceOptions[0].value);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [notifications, setNotifications] = useState({
        rituals: true,
        tests: true,
        store: false,
        loginAlerts: true,
    });
    const [security, setSecurity] = useState({
        twoFA: false,
        newDeviceAlerts: true,
    });
    // Populate state when user loads
    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name || "");
            setEmail(currentUser.email || "");
            setPhone(currentUser.phone || "");
            setPlaceOfBirth(currentUser.placeOfBirth || "");
            setTimeOfBirth(currentUser.timeOfBirth || "");
        }
    }, [currentUser]);
    const handleSaveProfile = async () => {
        if (!name) {
            setMessage({ type: "error", text: "Name cannot be empty." });
            return;
        }
        if (timeOfBirth && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(timeOfBirth)) {
            setMessage({ type: "error", text: "Please use 24h HH:MM format for birth time." });
            return;
        }
        setLoading(true);
        setMessage(null);
        try {
            const res = await updateProfileAPI({
                name,
                phone,
                placeOfBirth,
                timeOfBirth,
            });
            store.updateUser(res.data.user);
            setMessage({ type: "success", text: "Profile settings saved successfully!" });
        } catch (err) {
            setMessage({ type: "error", text: err.message || "Failed to update profile." });
        } finally {
            setLoading(false);
        }
    };
    /* ------------------------ CLEANER CARD CLASS ------------------------ */
    const cardClass = "rounded-3xl border border-yellow-100 bg-gradient-to-b from-yellow-50 to-white p-6 shadow-sm backdrop-blur-xl dark:from-neutral-900 dark:to-neutral-950 dark:border-neutral-800";
    const rightPanel = (<QuickActionsPanel actions={[
            {
                icon: ShieldCheck,
                label: "Reset layout",
                description: "Restore clean defaults.",
                actionLabel: "Reset",
            },
            {
                icon: Globe,
                label: "Privacy report",
                description: "Download your privacy summary.",
                actionLabel: "Export",
            },
        ]}/>);
    return (<DashboardShell title="Settings" description="Manage your account & astrologic preferences with a clean experience." rightPanel={rightPanel}>
      {/* ------------------------------ ACCOUNT ------------------------------ */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className={cardClass}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-yellow-700/70 dark:text-amber-400">
              Account
            </p>
            <h3 className="font-mono text-xl text-gray-900 dark:text-white mt-1">
              Profile Details
            </h3>
          </div>
          <Globe className="h-5 w-5 text-yellow-500/80 dark:text-amber-400"/>
        </div>
        {message && (<div className={cn("mt-4 p-4 rounded-2xl text-xs border font-poppins flex items-start gap-2", message.type === "success"
                ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-950/20 dark:border-green-900/30 dark:text-green-300"
                : "bg-red-50 border-red-200 text-red-800 dark:bg-red-950/20 dark:border-red-900/30 dark:text-red-300")}>
                <span>{message.type === "success" ? "✅" : "⚠️"}</span>
                <span>{message.text}</span>
            </div>)}
        {/* Inputs */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <InputGroup label="Full name">
            <Input value={name} onChange={(e) => setName(e.target.value)} className="rounded-2xl border-yellow-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"/>
          </InputGroup>
          <InputGroup label="Email">
            <Input type="email" value={email} disabled className="rounded-2xl border-yellow-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-800 text-gray-400 cursor-not-allowed"/>
          </InputGroup>
          <InputGroup label="Phone number">
            <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-2xl border-yellow-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white" placeholder="Add phone number"/>
          </InputGroup>
          <InputGroup label="Place of Birth">
            <Input type="text" value={placeOfBirth} onChange={(e) => setPlaceOfBirth(e.target.value)} className="rounded-2xl border-yellow-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white" placeholder="e.g. New Delhi, India"/>
          </InputGroup>
          <InputGroup label="Time of Birth (24h HH:MM)">
            <Input type="text" value={timeOfBirth} onChange={(e) => setTimeOfBirth(e.target.value)} className="rounded-2xl border-yellow-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white" placeholder="e.g. 14:30"/>
          </InputGroup>
          <InputGroup label="Language">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="rounded-2xl border-yellow-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">
                <SelectValue placeholder="English"/>
              </SelectTrigger>
              <SelectContent className="dark:bg-neutral-900 dark:border-neutral-800 dark:text-white">
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">हिंदी</SelectItem>
                <SelectItem value="sanskrit">संस्कृत</SelectItem>
              </SelectContent>
            </Select>
          </InputGroup>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveProfile} disabled={loading} className="rounded-full bg-yellow-500 hover:bg-yellow-600 dark:bg-amber-500 dark:hover:bg-amber-600 text-gray-900 font-semibold px-6 text-xs flex items-center gap-2 cursor-pointer">
            {loading && <Loader2 className="h-3 w-3 animate-spin"/>}
            <span>Save Profile</span>
          </Button>
        </div>
      </motion.section>
      {/* --------------------------- NOTIFICATIONS --------------------------- */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className={cn(cardClass, "space-y-5")}>
        <SectionHeading icon={Bell} title="Notifications" subtitle="Reminders & alerts"/>
        {[
            {
                key: "rituals",
                title: "Daily rituals",
                desc: "Transit-based reminders & remedies.",
            },
            {
                key: "tests",
                title: "Test reminders",
                desc: "Continue your learning journey.",
            },
            {
                key: "store",
                title: "Store updates",
                desc: "Perfumes, posters, gems & offers.",
            },
            {
                key: "loginAlerts",
                title: "Login alerts",
                desc: "Security notifications for new logins.",
            },
        ].map((item) => (<SettingRow key={item.key} title={item.title} desc={item.desc} checked={notifications[item.key]} onChange={(checked) => setNotifications((prev) => ({ ...prev, [item.key]: checked }))}/>))}
      </motion.section>

      {/* ------------------------------ SECURITY ------------------------------ */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className={cn(cardClass, "space-y-5")}>
        <SectionHeading icon={Lock} title="Security" subtitle="Protection & sessions"/>

        <SettingRow title="Two-factor authentication" desc="Extra security layer for login." checked={security.twoFA} onChange={(v) => setSecurity((prev) => ({ ...prev, twoFA: v }))}/>

        <SettingRow title="New device alerts" desc="Email alert when logged in from a new device." checked={security.newDeviceAlerts} onChange={(v) => setSecurity((prev) => ({ ...prev, newDeviceAlerts: v }))}/>

        <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-4 flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-yellow-600 mt-0.5"/>
          <div>
            <p className="text-xs font-semibold text-gray-900">
              Active sessions
            </p>
            <p className="text-xs text-gray-600">
              Session management coming soon.
            </p>
          </div>
        </div>
      </motion.section>

      {/* --------------------------- DATA MANAGEMENT --------------------------- */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className={cn(cardClass, "space-y-6")}>
        <SectionHeading icon={KeyRound} title="Data & API" subtitle="Your account archive"/>

        <div className="grid gap-4 md:grid-cols-2">
          <CardMini icon={Database} title="Export account data" desc="Download Kundlis, logs & settings.">
            <Button variant="outline" className="rounded-full border-yellow-200 text-xs text-gray-800">
              Export data
            </Button>
          </CardMini>

          <CardMini icon={AlertTriangle} title="Delete account" desc="This action is permanent." danger>
            <Button variant="outline" className="rounded-full border-red-300 text-xs text-red-600 hover:bg-red-100">
              Request deletion
            </Button>
          </CardMini>
        </div>
      </motion.section>
    </DashboardShell>);
}
/* ======================================================================= */
/*                           REUSABLE COMPONENTS                            */
/* ======================================================================= */
function InputGroup({ label, children }) {
    return (<div>
      <label className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>);
}
function SectionHeading({ icon: Icon, title, subtitle }) {
    return (<div className="flex items-center gap-3">
      <Icon className="h-5 w-5 text-yellow-600/80"/>
      <div>
        <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
          {title}
        </p>
        <h3 className="font-mono text-xl text-gray-900">{subtitle}</h3>
      </div>
    </div>);
}
function SettingRow({ title, desc, checked, onChange }) {
    return (<div className="flex items-center justify-between rounded-2xl border border-yellow-100 bg-white p-4">
      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-600">{desc}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange}/>
    </div>);
}
function CardMini({ icon: Icon, title, desc, children, danger = false }) {
    return (<div className={cn("rounded-2xl border p-4 flex items-start gap-3", danger
            ? "border-red-200 bg-red-50"
            : "border-yellow-100 bg-white")}>
      <Icon className={cn("h-5 w-5", danger ? "text-red-500" : "text-yellow-600")}/>
      <div>
        <p className="text-xs font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-600">{desc}</p>
        <div className="mt-3">{children}</div>
      </div>
    </div>);
}
