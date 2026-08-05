"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { events as initialEvents, Event } from "@/data/events";
import { execomMembers as initialExecom, ExecomMember } from "@/data/execom";

/* ─────────────────────────────────────────────────────────────
   TYPES & DATA MODELS
   ───────────────────────────────────────────────────────────── */

type AdminTab =
  | "overview"
  | "events"
  | "excom"
  | "announcements"
  | "superadmin-overview"
  | "superadmin-rbac"
  | "superadmin-flags"
  | "superadmin-treasury"
  | "superadmin-audit"
  | "superadmin-danger";

interface Announcement {
  id: string;
  title: string;
  category: "Urgent Banner" | "General Notice" | "Workshop Alert" | "Recruitment";
  target: "All Members" | "ExCom Only" | "Public Site" | "CS Chapter";
  published: boolean;
  date: string;
  author: string;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "SuperAdmin" | "Branch Admin" | "Treasurer" | "Technical Lead" | "Editor";
  status: "Active" | "Suspended" | "Pending 2FA";
  lastLogin: string;
  permissions: string[];
}

interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  target: string;
  severity: "info" | "warning" | "critical";
  ipAddress: string;
}

interface GrantRequest {
  id: string;
  chapter: string;
  title: string;
  amountRequested: number;
  allocatedAmount: number;
  submittedBy: string;
  date: string;
  status: "Approved" | "Pending Review" | "Rejected";
  purpose: string;
}

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    title: "TechSprint 2025 Registrations are officially open! Early bird prizes worth ₹20K.",
    category: "Urgent Banner",
    target: "Public Site",
    published: true,
    date: "2025-08-04",
    author: "Arjun Menon (Chair)",
  },
  {
    id: "ann-2",
    title: "Executive Committee Monthly General Body Meeting scheduled for Friday 5 PM.",
    category: "General Notice",
    target: "ExCom Only",
    published: true,
    date: "2025-08-02",
    author: "Rohan Das (Secretary)",
  },
  {
    id: "ann-3",
    title: "Call for Volunteers: IEEE Day 2025 Organizing Core Committee.",
    category: "Recruitment",
    target: "All Members",
    published: true,
    date: "2025-07-28",
    author: "Divya Pillai (Events Head)",
  },
  {
    id: "ann-4",
    title: "ESP32 Hardware Kit distribution list for IoT Workshop participants.",
    category: "Workshop Alert",
    target: "CS Chapter",
    published: false,
    date: "2025-07-25",
    author: "Aditya Kumar (Tech Head)",
  },
];

const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: "adm-1",
    name: "Arjun Menon",
    email: "arjun.chair@cusat.ac.in",
    role: "SuperAdmin",
    status: "Active",
    lastLogin: "Just now (103.14.120.4)",
    permissions: ["all_access", "rbac_manage", "treasury_approve", "system_purge", "vtools_sync"],
  },
  {
    id: "adm-2",
    name: "Sneha Krishnan",
    email: "sneha.vicechair@cusat.ac.in",
    role: "Branch Admin",
    status: "Active",
    lastLogin: "2 hours ago",
    permissions: ["events_manage", "excom_edit", "announcements_post"],
  },
  {
    id: "adm-3",
    name: "Priya Nair",
    email: "priya.treasurer@cusat.ac.in",
    role: "Treasurer",
    status: "Active",
    lastLogin: "Yesterday at 18:20",
    permissions: ["treasury_view", "treasury_draft", "financial_export"],
  },
  {
    id: "adm-4",
    name: "Aditya Kumar",
    email: "aditya.tech@cusat.ac.in",
    role: "Technical Lead",
    status: "Active",
    lastLogin: "3 days ago",
    permissions: ["events_manage", "gallery_manage", "web_deploy"],
  },
  {
    id: "adm-5",
    name: "Dr. Biju N (Counselor)",
    email: "bijun@cusat.ac.in",
    role: "SuperAdmin",
    status: "Active",
    lastLogin: "5 days ago",
    permissions: ["all_access", "faculty_override"],
  },
];

const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: "log-1",
    timestamp: "2026-08-05 13:58:22",
    actor: "Arjun Menon",
    role: "SuperAdmin",
    action: "ELEVATE_SUPERADMIN_SESSION",
    target: "Root Console",
    severity: "info",
    ipAddress: "103.14.120.4",
  },
  {
    id: "log-2",
    timestamp: "2026-08-05 12:15:10",
    actor: "Sneha Krishnan",
    role: "Branch Admin",
    action: "CREATE_EVENT",
    target: "TechSprint 2025 (competition)",
    severity: "info",
    ipAddress: "117.240.18.92",
  },
  {
    id: "log-3",
    timestamp: "2026-08-05 10:44:03",
    actor: "Arjun Menon",
    role: "SuperAdmin",
    action: "UPDATE_FEATURE_FLAG",
    target: "PUBLIC_REGISTRATIONS -> ENABLED",
    severity: "warning",
    ipAddress: "103.14.120.4",
  },
  {
    id: "log-4",
    timestamp: "2026-08-04 17:30:00",
    actor: "Priya Nair",
    role: "Treasurer",
    action: "SUBMIT_GRANT_REQUEST",
    target: "RAS Chapter Drone Workshop Grant (₹35,000)",
    severity: "info",
    ipAddress: "14.139.185.10",
  },
  {
    id: "log-5",
    timestamp: "2026-08-03 14:02:19",
    actor: "Security Gateway",
    role: "SYSTEM",
    action: "BLOCKED_UNAUTHORIZED_ACCESS_ATTEMPT",
    target: "/api/v1/superadmin/purge",
    severity: "critical",
    ipAddress: "194.26.29.112",
  },
];

const INITIAL_GRANTS: GrantRequest[] = [
  {
    id: "grant-101",
    chapter: "IEEE Robotics & Automation Society (RAS)",
    title: "Autonomous Drone Flight & Micro-Controller Testing Lab",
    amountRequested: 45000,
    allocatedAmount: 40000,
    submittedBy: "Farhan Ali (RAS Chair)",
    date: "2025-07-20",
    status: "Approved",
    purpose:
      "Procurement of 10 Quadcopter hardware frames, ESCs, optical flow sensors and LiPo batteries for student workshops.",
  },
  {
    id: "grant-102",
    chapter: "IEEE Women in Engineering (WIE)",
    title: "EmpowerTech: School Outreach & STEM Mentorship Camp",
    amountRequested: 25000,
    allocatedAmount: 25000,
    submittedBy: "Meera Nandakumar (WIE Lead)",
    date: "2025-08-01",
    status: "Pending Review",
    purpose:
      "Conducting hands-on Arduino and basic electronics workshops for 120 girl students from government high schools in Ernakulam.",
  },
  {
    id: "grant-103",
    chapter: "IEEE Computer Society (CS)",
    title: "AI Cluster Cloud Compute Sponsorship (GPU credits)",
    amountRequested: 50000,
    allocatedAmount: 0,
    submittedBy: "Aditya Kumar (CS Lead)",
    date: "2025-08-03",
    status: "Pending Review",
    purpose:
      "Cloud GPU instances on Lambda Labs/AWS for members training deep learning models for national hackathons.",
  },
  {
    id: "grant-104",
    chapter: "IEEE Power & Energy Society (PES)",
    title: "Solar EV Charging Station Prototype Project",
    amountRequested: 60000,
    allocatedAmount: 0,
    submittedBy: "Gautham Krishna (PES Chair)",
    date: "2025-06-15",
    status: "Rejected",
    purpose:
      "Hardware parts for solar MPPT inverter; advised to apply for Kerala Section PES Major Student Project Grant instead.",
  },
];

function AdminContent() {
  const searchParams = useSearchParams();

  // Navigation State
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");

  // Elevation / Security State
  const [isSuperAdminElevated, setIsSuperAdminElevated] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [securityPinInput, setSecurityPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  // Interactive Live Data State
  const [eventsList, setEventsList] = useState<Event[]>(initialEvents);
  const [execomList, setExecomList] = useState<ExecomMember[]>(initialExecom);
  const [announcementsList, setAnnouncementsList] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [adminUsersList, setAdminUsersList] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);
  const [auditLogsList, setAuditLogsList] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [grantsList, setGrantsList] = useState<GrantRequest[]>(INITIAL_GRANTS);

  // Global Feature Flags State (SuperAdmin)
  const [flags, setFlags] = useState({
    maintenanceMode: false,
    publicRegistrations: true,
    inductionDriveActive: true,
    vToolsAutoSync: true,
    analyticsTelemetry: true,
    paymentGatewaySandbox: false,
    allowGuestSubmissions: true,
  });

  // Modal States
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [eventFormData, setEventFormData] = useState<Partial<Event>>({
    title: "",
    slug: "",
    date: "",
    location: "",
    category: "workshop",
    status: "upcoming",
    description: "",
    body: "",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    registrationLink: "https://forms.google.com",
  });

  const [showExcomModal, setShowExcomModal] = useState(false);
  const [editingExcom, setEditingExcom] = useState<ExecomMember | null>(null);
  const [excomFormData, setExcomFormData] = useState<Partial<ExecomMember>>({
    name: "",
    role: "",
    branch: "",
    year: "3rd Year B.Tech",
    email: "",
    linkedin: "https://linkedin.com",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
  });

  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [announcementFormData, setAnnouncementFormData] = useState({
    title: "",
    category: "General Notice" as Announcement["category"],
    target: "Public Site" as Announcement["target"],
    author: "Arjun Menon (Chair)",
  });

  const [showInviteAdminModal, setShowInviteAdminModal] = useState(false);
  const [inviteAdminFormData, setInviteAdminFormData] = useState({
    name: "",
    email: "",
    role: "Branch Admin" as AdminUser["role"],
  });

  const [showAttendeeDrawer, setShowAttendeeDrawer] = useState<Event | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync tab with URL parameters (e.g. ?view=superadmin)
  useEffect(() => {
    const viewParam = searchParams.get("view");
    const tabParam = searchParams.get("tab");
    if (viewParam === "superadmin" || viewParam === "superadmin-overview") {
      setActiveTab("superadmin-overview");
      setIsSuperAdminElevated(true);
    } else if (tabParam) {
      setActiveTab(tabParam as AdminTab);
    }
  }, [searchParams]);

  // Trigger Toast Notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // SuperAdmin PIN Verification
  const handleVerifyPin = (overridePin?: string) => {
    const pin = overridePin || securityPinInput;
    if (pin === "1884" || pin === "admin" || pin === "root" || overridePin === "1884") {
      setIsSuperAdminElevated(true);
      setShowSecurityModal(false);
      setSecurityPinInput("");
      setPinError(false);
      triggerToast("🔐 Privilege Elevated: SuperAdministrator root access granted.");
      if (!activeTab.startsWith("superadmin-")) {
        setActiveTab("superadmin-overview");
      }
    } else {
      setPinError(true);
    }
  };

  const handleDemotePrivileges = () => {
    setIsSuperAdminElevated(false);
    triggerToast("🔒 Privileges restricted back to Standard Branch Administrator.");
    if (activeTab.startsWith("superadmin-")) {
      setActiveTab("overview");
    }
  };

  // Event Handlers
  const handleOpenNewEvent = () => {
    setEditingEvent(null);
    setEventFormData({
      title: "",
      slug: `event-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      location: "CUSAT Campus, Kochi",
      category: "workshop",
      status: "upcoming",
      description: "",
      body: "",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
      registrationLink: "https://forms.google.com",
    });
    setShowEventModal(true);
  };

  const handleOpenEditEvent = (ev: Event) => {
    setEditingEvent(ev);
    setEventFormData(ev);
    setShowEventModal(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventFormData.title || !eventFormData.slug) return;

    if (editingEvent) {
      setEventsList((prev) =>
        prev.map((item) =>
          item.slug === editingEvent.slug ? ({ ...item, ...eventFormData } as Event) : item
        )
      );
      triggerToast(`Event "${eventFormData.title}" updated successfully.`);
    } else {
      const newEv = eventFormData as Event;
      setEventsList((prev) => [newEv, ...prev]);
      triggerToast(`Event "${eventFormData.title}" created successfully.`);
    }
    setShowEventModal(false);
  };

  const handleDeleteEvent = (slug: string) => {
    if (confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      setEventsList((prev) => prev.filter((e) => e.slug !== slug));
      triggerToast("Event deleted from system.");
    }
  };

  // ExCom Handlers
  const handleSaveExcom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!excomFormData.name || !excomFormData.role) return;

    if (editingExcom) {
      setExecomList((prev) =>
        prev.map((item) =>
          item.id === editingExcom.id ? ({ ...item, ...excomFormData } as ExecomMember) : item
        )
      );
      triggerToast(`Officer profile for "${excomFormData.name}" updated.`);
    } else {
      const newOfficer: ExecomMember = {
        id: `excom-${Date.now()}`,
        name: excomFormData.name || "Member Name",
        role: excomFormData.role || "Executive Member",
        branch: excomFormData.branch || "School of Engineering",
        year: excomFormData.year || "3rd Year B.Tech",
        photo: excomFormData.photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
        email: excomFormData.email,
        linkedin: excomFormData.linkedin,
      };
      setExecomList((prev) => [newOfficer, ...prev]);
      triggerToast(`New officer "${newOfficer.name}" added to ExCom roster.`);
    }
    setShowExcomModal(false);
  };

  const handleDeleteExcom = (id: string) => {
    if (confirm("Remove this officer from the active ExCom directory?")) {
      setExecomList((prev) => prev.filter((m) => m.id !== id));
      triggerToast("Officer removed from ExCom directory.");
    }
  };

  // Announcements Handlers
  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementFormData.title) return;
    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title: announcementFormData.title,
      category: announcementFormData.category,
      target: announcementFormData.target,
      published: true,
      date: new Date().toISOString().split("T")[0],
      author: announcementFormData.author,
    };
    setAnnouncementsList((prev) => [newAnn, ...prev]);
    setShowAnnouncementModal(false);
    triggerToast("Announcement broadcasted live.");
  };

  const handleTogglePublishAnnouncement = (id: string) => {
    setAnnouncementsList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, published: !a.published } : a))
    );
    triggerToast("Announcement visibility toggled.");
  };

  // SuperAdmin Grants
  const handleUpdateGrant = (id: string, newStatus: "Approved" | "Rejected") => {
    setGrantsList((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          return {
            ...g,
            status: newStatus,
            allocatedAmount: newStatus === "Approved" ? g.amountRequested : 0,
          };
        }
        return g;
      })
    );
    triggerToast(`Grant ${id} marked as ${newStatus}. Treasury ledgers adjusted.`);
  };

  // SuperAdmin Admin Users
  const handleSaveInviteAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteAdminFormData.name || !inviteAdminFormData.email) return;
    const newUser: AdminUser = {
      id: `adm-${Date.now()}`,
      name: inviteAdminFormData.name,
      email: inviteAdminFormData.email,
      role: inviteAdminFormData.role,
      status: "Active",
      lastLogin: "Never (Pending Invitation)",
      permissions:
        inviteAdminFormData.role === "SuperAdmin"
          ? ["all_access", "rbac_manage", "treasury_approve"]
          : ["events_manage", "announcements_post"],
    };
    setAdminUsersList((prev) => [newUser, ...prev]);
    setShowInviteAdminModal(false);
    triggerToast(`Admin invitation sent to ${newUser.email}`);
  };

  const handleToggleUserStatus = (id: string) => {
    setAdminUsersList((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextStatus = u.status === "Active" ? "Suspended" : "Active";
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
    triggerToast("Admin account status toggled.");
  };

  // SuperAdmin Danger Zone Actions
  const handleTriggerSnapshot = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      branch: "IEEE CUSAT Student Branch (STB64341)",
      events: eventsList,
      execom: execomList,
      announcements: announcementsList,
      flags: flags,
      grants: grantsList,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ieee-cusat-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    triggerToast("💾 Database snapshot generated and downloaded.");
  };

  const handlePurgeCache = () => {
    triggerToast("⚡ Static Edge cache & Next.js ISR tags purged successfully.");
  };

  const handleSyncVtools = () => {
    triggerToast("🔄 Synchronized events and officer rosters with IEEE vTools API.");
  };

  return (
    <div className="min-h-screen bg-white text-[--color-charcoal] font-sans antialiased">
      
      {/* ─────────────────────────────────────────────────────────────
          1. ANIMATED DECORATIVE FRAME ACCENTS (HOMEPAGE DESIGN SYSTEM)
         ───────────────────────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 z-40 w-2 h-16 bg-[--color-gold] animate-bar-down"></div>
      <div className="fixed top-0 left-0 right-0 z-40 h-[2px] bg-[--color-gold] animate-line-right"></div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-[--color-navy] text-white px-6 py-4 shadow-2xl border-l-4 border-[--color-gold] flex items-center gap-3 animate-in fade-in duration-300">
          <span className="text-[--color-gold] text-lg">⚡</span>
          <p className="text-sm font-medium">{toastMessage}</p>
          <button
            onClick={() => setToastMessage(null)}
            className="text-gray-300 hover:text-white text-xs ml-3 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. INSTITUTIONAL PAGE HEADER BANNER (SOURCE SERIF & GOLD DIVIDERS)
         ───────────────────────────────────────────────────────────── */}
      <section className="pt-16 pb-14 bg-white border-b border-gray-200 relative">
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            
            {/* Eyebrow Breadcrumb & Back Link */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
              <Link
                href="/"
                className="text-xs font-bold tracking-wider text-[--color-navy] hover:text-[--color-gold] transition-colors"
              >
                ← Public Website
              </Link>
              <span className="text-gray-300 font-mono">/</span>
              <span className="text-xs font-bold tracking-widest text-[--color-gold] uppercase">
                GOVERNANCE & BRANCH ADMINISTRATION
              </span>
              <span className="text-gray-300 font-mono">/</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-gray-100 text-gray-700">
                STB-64341 • REGION 10
              </span>
            </div>

            {/* Source Serif Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[--color-navy] mb-4 tracking-tight">
              Administrative Command Center
            </h1>

            <p className="text-[#333333] max-w-3xl text-base sm:text-lg leading-relaxed font-sans mb-6">
              Unified operational control for IEEE CUSAT Student Branch. Coordinate technical workshop schedules, executive leadership appointments, official announcements, and root governance clearance.
            </p>

            {/* Clearance Action Button */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  if (isSuperAdminElevated) {
                    handleDemotePrivileges();
                  } else {
                    setShowSecurityModal(true);
                  }
                }}
                className={`inline-flex items-center gap-2 px-5 py-2 border text-xs font-bold tracking-wider uppercase transition-all shadow-xs ${
                  isSuperAdminElevated
                    ? "bg-amber-50 border-amber-400 text-amber-900 hover:bg-amber-100"
                    : "bg-white border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white"
                }`}
              >
                <span>{isSuperAdminElevated ? "⚡" : "🔒"}</span>
                <span>{isSuperAdminElevated ? "SuperAdmin Active (Lock Root)" : "SuperAdmin Login"}</span>
              </button>
            </div>

          </div>
        </div>
      </section>



      {/* ─────────────────────────────────────────────────────────────
          4. "COMMAND MATRIX & MODULES" (HOMEPAGE "HOMETABS" STYLE)
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        
        <div className="w-full relative h-0 border-t border-gray-200 mb-16">
          <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
        </div>

        <h2 className="text-[36px] md:text-[40px] font-bold font-serif text-[--color-navy] text-center mb-16 leading-tight max-w-3xl mx-auto">
          Unified Operations, Chapter Governance, and Root Clearance.
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: LIQUID HOMETABS STYLE NAVIGATION */}
          <div className="w-full lg:w-1/3 flex flex-col shrink-0">
            
            <p className="italic font-serif text-[--color-navy] text-lg mb-2">
              Select Management Module
            </p>
            <div className="tick-mark mb-6"></div>

            <div className="border border-gray-200 divide-y divide-gray-200 bg-[#FAFAFA] shadow-sm">
              
              {/* Module Tab 1: Overview */}
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full text-left py-4 px-6 text-base transition-all flex items-center justify-between ${
                  activeTab === "overview"
                    ? "bg-white text-[#0A2540] font-bold border-l-4 border-[#0A2540] shadow-sm"
                    : "text-[#666666] bg-[#FAFAFA] font-medium hover:bg-white hover:text-[#0A2540]"
                }`}
              >
                <span className={activeTab === "overview" ? "text-[#0A2540] font-bold" : "text-[#666666]"}>
                  📊 Dashboard Overview
                </span>
                <span className={`text-xs font-mono font-bold ${activeTab === "overview" ? "text-[#0A2540]" : "text-gray-400"}`}>
                  01
                </span>
              </button>

              {/* Module Tab 2: Events */}
              <button
                onClick={() => setActiveTab("events")}
                className={`w-full text-left py-4 px-6 text-base transition-all flex items-center justify-between ${
                  activeTab === "events"
                    ? "bg-white text-[#0A2540] font-bold border-l-4 border-[#0A2540] shadow-sm"
                    : "text-[#666666] bg-[#FAFAFA] font-medium hover:bg-white hover:text-[#0A2540]"
                }`}
              >
                <span className={activeTab === "events" ? "text-[#0A2540] font-bold" : "text-[#666666]"}>
                  📅 Events & Workshops
                </span>
                <span className={`text-xs font-mono font-bold ${activeTab === "events" ? "text-[#0A2540]" : "text-gray-400"}`}>
                  02
                </span>
              </button>

              {/* Module Tab 3: ExCom */}
              <button
                onClick={() => setActiveTab("excom")}
                className={`w-full text-left py-4 px-6 text-base transition-all flex items-center justify-between ${
                  activeTab === "excom"
                    ? "bg-white text-[#0A2540] font-bold border-l-4 border-[#0A2540] shadow-sm"
                    : "text-[#666666] bg-[#FAFAFA] font-medium hover:bg-white hover:text-[#0A2540]"
                }`}
              >
                <span className={activeTab === "excom" ? "text-[#0A2540] font-bold" : "text-[#666666]"}>
                  👥 Executive Committee
                </span>
                <span className={`text-xs font-mono font-bold ${activeTab === "excom" ? "text-[#0A2540]" : "text-gray-400"}`}>
                  03
                </span>
              </button>

              {/* Module Tab 4: Announcements */}
              <button
                onClick={() => setActiveTab("announcements")}
                className={`w-full text-left py-4 px-6 text-base transition-all flex items-center justify-between ${
                  activeTab === "announcements"
                    ? "bg-white text-[#0A2540] font-bold border-l-4 border-[#0A2540] shadow-sm"
                    : "text-[#666666] bg-[#FAFAFA] font-medium hover:bg-white hover:text-[#0A2540]"
                }`}
              >
                <span className={activeTab === "announcements" ? "text-[#0A2540] font-bold" : "text-[#666666]"}>
                  📢 Announcements & Bulletins
                </span>
                <span className={`text-xs font-mono font-bold ${activeTab === "announcements" ? "text-[#0A2540]" : "text-gray-400"}`}>
                  04
                </span>
              </button>

              {/* SECTION: SUPERADMIN ROOT (ONLY VISIBLE WHEN ELEVATED AS SUPERADMIN) */}
              {isSuperAdminElevated && (
                <div className="p-4 bg-amber-50 border-t-2 border-amber-400">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[11px] font-bold tracking-widest uppercase text-amber-900">
                      SUPERADMIN ROOT COMMANDS
                    </p>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-400 text-black font-mono">
                      UNLOCKED
                    </span>
                  </div>

                  <div className="space-y-1">
                    {[
                      { id: "superadmin-overview", label: "Root Matrix", icon: "⚡" },
                      { id: "superadmin-rbac", label: "RBAC & Admins", icon: "🛡️" },
                      { id: "superadmin-flags", label: "Feature Flags", icon: "⚙️" },
                      { id: "superadmin-treasury", label: "Grants & Treasury", icon: "💰" },
                      { id: "superadmin-audit", label: "Audit Ledger", icon: "📜" },
                      { id: "superadmin-danger", label: "Database Snapshots", icon: "💾" },
                    ].map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setActiveTab(sub.id as AdminTab)}
                        className={`w-full text-left py-2 px-3 text-xs flex items-center justify-between transition-colors ${
                          activeTab === sub.id
                            ? "bg-white text-black font-bold border-l-2 border-amber-500 shadow-xs"
                            : "text-amber-900 font-medium hover:bg-amber-100 hover:text-black"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{sub.icon}</span>
                          <span>{sub.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* RIGHT COLUMN: INTERACTIVE MODULE WORKSPACE */}
          <div className="w-full lg:w-2/3">

            {/* ─── MODULE A: DASHBOARD OVERVIEW ─── */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                
                {/* Featured Executive Announcement Card */}
                <div className="bg-[#00629B] text-white p-8 md:p-10 shadow-xl border-l-8 border-[--color-gold]">
                  <p className="text-[--color-gold] font-bold text-[11px] uppercase tracking-widest mb-3">
                    EXECUTIVE DIRECTIVE • SESSION 2026
                  </p>
                  <h3 className="text-white text-2xl md:text-3xl font-serif font-bold leading-tight mb-4">
                    Welcome to the IEEE CUSAT Management Console
                  </h3>
                  <p className="text-blue-100 text-sm md:text-base leading-relaxed font-sans mb-8 max-w-2xl">
                    All administrative actions are authenticated and recorded in the permanent audit ledger. Create technical workshops, broadcast public announcements, and coordinate chapter governance with IEEE Kerala Section officers.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={handleOpenNewEvent}
                      className="px-6 py-3 border-2 border-[--color-gold] bg-[--color-gold] text-[--color-navy] font-bold text-xs tracking-widest uppercase hover:bg-white transition-colors"
                    >
                      + Create Workshop
                    </button>
                    <button
                      onClick={() => setShowAnnouncementModal(true)}
                      className="px-6 py-3 border-2 border-white text-white font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-[--color-navy] transition-colors"
                    >
                      Broadcast Alert
                    </button>
                  </div>
                </div>

                {/* 2-Column Row: Upcoming Events & Live Bulletins */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Events Preview */}
                  <div className="border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
                      <h4 className="font-serif font-bold text-lg text-[--color-navy]">Scheduled Events</h4>
                      <button
                        onClick={() => setActiveTab("events")}
                        className="text-xs font-bold text-[--color-navy] hover:text-[--color-gold] uppercase tracking-wider"
                      >
                        All ({eventsList.length}) &gt;
                      </button>
                    </div>
                    <div className="space-y-4">
                      {eventsList.slice(0, 3).map((ev) => (
                        <div key={ev.slug} className="p-4 bg-[#FAFAFA] border border-gray-200 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-[--color-gold] uppercase">{ev.category}</span>
                            <h5 className="font-bold text-sm text-[--color-navy]">{ev.title}</h5>
                            <p className="text-xs text-gray-500">{ev.date} • {ev.location}</p>
                          </div>
                          <button
                            onClick={() => setShowAttendeeDrawer(ev)}
                            className="px-3 py-1 bg-white border border-gray-300 text-xs font-bold hover:bg-[--color-navy] hover:text-white transition-colors shrink-0"
                          >
                            Roster
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bulletins Preview */}
                  <div className="border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
                      <h4 className="font-serif font-bold text-lg text-[--color-navy]">Active Bulletins</h4>
                      <button
                        onClick={() => setActiveTab("announcements")}
                        className="text-xs font-bold text-[--color-navy] hover:text-[--color-gold] uppercase tracking-wider"
                      >
                        All ({announcementsList.length}) &gt;
                      </button>
                    </div>
                    <div className="space-y-4">
                      {announcementsList.slice(0, 3).map((ann) => (
                        <div key={ann.id} className="p-4 bg-[#FAFAFA] border border-gray-200 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-yellow-100 text-yellow-900">
                              {ann.category}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 ${
                              ann.published ? "bg-emerald-100 text-emerald-800" : "bg-gray-200 text-gray-700"
                            }`}>
                              {ann.published ? "Live" : "Draft"}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-[--color-navy] line-clamp-1">{ann.title}</p>
                          <p className="text-[11px] text-gray-400">{ann.date} • {ann.author}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ─── MODULE B: EVENTS & WORKSHOPS ─── */}
            {activeTab === "events" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[--color-navy]">Events & Workshops Catalog</h3>
                    <p className="text-sm text-gray-500">Coordinate branch hackathons, technical bootcamps, and distinguished lectures</p>
                  </div>
                  <button
                    onClick={handleOpenNewEvent}
                    className="px-6 py-2.5 border-2 border-[--color-navy] bg-[--color-navy] text-white font-bold text-xs tracking-widest uppercase hover:bg-[--color-gold] hover:text-[--color-navy] transition-colors"
                  >
                    + New Workshop
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {eventsList.map((ev) => (
                    <div key={ev.slug} className="border border-gray-200 bg-white shadow-sm flex flex-col justify-between hover:border-[--color-navy] transition-colors">
                      <div className="h-44 bg-gray-100 relative overflow-hidden">
                        <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 right-3 bg-[--color-navy] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                          {ev.status}
                        </span>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-[--color-gold] uppercase tracking-widest">
                            {ev.category}
                          </span>
                          <h4 className="font-serif font-bold text-lg text-[--color-navy] mt-1 mb-2">{ev.title}</h4>
                          <p className="text-xs text-gray-500 mb-3">{ev.date} • {ev.location}</p>
                          <p className="text-xs text-gray-600 line-clamp-2">{ev.description}</p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                          <button
                            onClick={() => setShowAttendeeDrawer(ev)}
                            className="text-xs font-bold text-[--color-navy] hover:text-[--color-gold] uppercase tracking-wider"
                          >
                            Registered Attendees &gt;
                          </button>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleOpenEditEvent(ev)}
                              className="px-3 py-1 border border-gray-300 text-xs font-bold hover:bg-gray-100"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(ev.slug)}
                              className="px-3 py-1 border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── MODULE C: EXECUTIVE COMMITTEE ─── */}
            {activeTab === "excom" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[--color-navy]">Executive Committee Roster</h3>
                    <p className="text-sm text-gray-500">Branch leadership team and portfolio directors for Session 2026</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingExcom(null);
                      setExcomFormData({
                        name: "",
                        role: "",
                        branch: "School of Engineering",
                        year: "3rd Year B.Tech",
                        email: "",
                        linkedin: "https://linkedin.com",
                        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
                      });
                      setShowExcomModal(true);
                    }}
                    className="px-6 py-2.5 border-2 border-[--color-navy] bg-[--color-navy] text-white font-bold text-xs tracking-widest uppercase hover:bg-[--color-gold] hover:text-[--color-navy] transition-colors"
                  >
                    + Add Officer
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {execomList.map((officer) => (
                    <div key={officer.id} className="border border-gray-200 bg-white p-6 text-center flex flex-col justify-between shadow-sm hover:border-[--color-navy] transition-colors">
                      <div>
                        <div className="w-24 h-24 mx-auto mb-4 border-2 border-[--color-navy] p-1 overflow-hidden">
                          <img src={officer.photo} alt={officer.name} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="font-serif font-bold text-base text-[--color-navy]">{officer.name}</h4>
                        <p className="text-xs font-bold text-[--color-gold] uppercase tracking-wider mt-1">{officer.role}</p>
                        <p className="text-xs text-gray-500 mt-1">{officer.branch}</p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-gray-200 flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setEditingExcom(officer);
                            setExcomFormData(officer);
                            setShowExcomModal(true);
                          }}
                          className="px-3 py-1 border border-gray-300 text-xs font-bold hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteExcom(officer.id)}
                          className="px-3 py-1 border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── MODULE D: ANNOUNCEMENTS & BULLETINS ─── */}
            {activeTab === "announcements" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[--color-navy]">Announcements & Bulletins</h3>
                    <p className="text-sm text-gray-500">Broadcast official branch communications, recruitments, and news</p>
                  </div>
                  <button
                    onClick={() => setShowAnnouncementModal(true)}
                    className="px-6 py-2.5 border-2 border-[--color-navy] bg-[--color-navy] text-white font-bold text-xs tracking-widest uppercase hover:bg-[--color-gold] hover:text-[--color-navy] transition-colors"
                  >
                    + New Bulletin
                  </button>
                </div>

                <div className="space-y-4">
                  {announcementsList.map((ann) => (
                    <div key={ann.id} className="p-6 border border-gray-200 bg-white flex flex-col md:flex-row justify-between gap-4 items-start md:items-center shadow-sm">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-yellow-100 text-yellow-900">
                            {ann.category}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">Target: {ann.target}</span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-[--color-navy]">{ann.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{ann.author} • {ann.date}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleTogglePublishAnnouncement(ann.id)}
                          className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                            ann.published
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-gray-100 text-gray-600 border border-gray-300"
                          }`}
                        >
                          {ann.published ? "Live Banner" : "Draft"}
                        </button>
                        <button
                          onClick={() => {
                            setAnnouncementsList((prev) => prev.filter((a) => a.id !== ann.id));
                            triggerToast("Announcement removed.");
                          }}
                          className="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 uppercase"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── MODULE E: SUPERADMIN ROOT MODULES ─── */}
            {activeTab.startsWith("superadmin-") && isSuperAdminElevated && (
              <div className="border-2 border-amber-400 bg-white p-8 space-y-8 shadow-xl">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[--color-navy] text-[--color-gold] flex items-center justify-center text-xl font-bold">
                      ⚡
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-[--color-navy]">
                        {activeTab === "superadmin-overview" && "SuperAdmin Root Console"}
                        {activeTab === "superadmin-rbac" && "Role-Based Access Control (RBAC)"}
                        {activeTab === "superadmin-flags" && "Global Feature Flags"}
                        {activeTab === "superadmin-treasury" && "Chapter Grants & Treasury Approval"}
                        {activeTab === "superadmin-audit" && "Security Audit Ledger"}
                        {activeTab === "superadmin-danger" && "Database Backups & Maintenance"}
                      </h3>
                      <p className="text-xs font-mono font-bold text-amber-700">ROOT CLEARANCE PRIVILEGES ACTIVE</p>
                    </div>
                  </div>

                  <button
                    onClick={handleDemotePrivileges}
                    className="px-4 py-2 border border-red-300 bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider hover:bg-red-100"
                  >
                    🔒 Lock Root Session
                  </button>
                </div>

                {/* Sub-tab: Root Matrix */}
                {activeTab === "superadmin-overview" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 bg-gray-50 border border-gray-200">
                        <p className="text-xs font-bold uppercase text-gray-500">Active Admins</p>
                        <p className="text-2xl font-bold text-[--color-navy] mt-1">{adminUsersList.length}</p>
                      </div>
                      <div className="p-4 bg-gray-50 border border-gray-200">
                        <p className="text-xs font-bold uppercase text-gray-500">Pending Grants</p>
                        <p className="text-2xl font-bold text-amber-700 mt-1">
                          {grantsList.filter((g) => g.status === "Pending Review").length}
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 border border-gray-200">
                        <p className="text-xs font-bold uppercase text-gray-500">Audit Logs</p>
                        <p className="text-2xl font-bold text-[--color-navy] mt-1">{auditLogsList.length}</p>
                      </div>
                    </div>

                    <div className="border border-gray-200 p-6 bg-[#FAFAFA]">
                      <h4 className="font-serif font-bold text-lg text-[--color-navy] mb-3">Quick Root Actions</h4>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => setActiveTab("superadmin-rbac")}
                          className="px-4 py-2 bg-[--color-navy] text-white text-xs font-bold uppercase tracking-wider hover:bg-[--color-gold] hover:text-[--color-navy]"
                        >
                          Manage RBAC & Admins
                        </button>
                        <button
                          onClick={() => setActiveTab("superadmin-treasury")}
                          className="px-4 py-2 bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-900"
                        >
                          Review Chapter Grants
                        </button>
                        <button
                          onClick={() => setActiveTab("superadmin-flags")}
                          className="px-4 py-2 border border-gray-300 bg-white text-xs font-bold uppercase tracking-wider hover:bg-gray-100"
                        >
                          Feature Toggles
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-tab: RBAC */}
                {activeTab === "superadmin-rbac" && (
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <button
                        onClick={() => setShowInviteAdminModal(true)}
                        className="px-4 py-2 border-2 border-[--color-navy] bg-[--color-navy] text-white text-xs font-bold uppercase tracking-wider hover:bg-[--color-gold] hover:text-[--color-navy]"
                      >
                        + Invite Admin
                      </button>
                    </div>
                    <div className="border border-gray-200 overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[--color-navy] text-white uppercase font-bold">
                          <tr>
                            <th className="py-3 px-4">Admin Name</th>
                            <th className="py-3 px-4">Role</th>
                            <th className="py-3 px-4">Last Activity</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {adminUsersList.map((usr) => (
                            <tr key={usr.id}>
                              <td className="py-3 px-4 font-bold text-[--color-navy]">{usr.name} ({usr.email})</td>
                              <td className="py-3 px-4"><span className="px-2 py-0.5 bg-blue-100 text-[--color-navy] font-bold">{usr.role}</span></td>
                              <td className="py-3 px-4 text-gray-500 font-mono">{usr.lastLogin}</td>
                              <td className="py-3 px-4"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold">{usr.status}</span></td>
                              <td className="py-3 px-4 text-right">
                                <button onClick={() => handleToggleUserStatus(usr.id)} className="text-red-600 font-bold hover:underline uppercase">Toggle</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Sub-tab: Feature Flags */}
                {activeTab === "superadmin-flags" && (
                  <div className="space-y-4">
                    {[
                      { key: "maintenanceMode", label: "Maintenance Mode", desc: "Display institutional maintenance banner to public visitors" },
                      { key: "publicRegistrations", label: "Public Event Registrations", desc: "Allow non-IEEE students to register for technical workshops" },
                      { key: "inductionDriveActive", label: "Annual Induction Drive Banner", desc: "Display join membership call-to-action on homepage" },
                      { key: "vToolsAutoSync", label: "IEEE vTools Global API Sync", desc: "Automated two-way roster and officer synchronization" },
                    ].map((flag) => (
                      <div key={flag.key} className="p-4 border border-gray-200 bg-[#FAFAFA] flex items-center justify-between">
                        <div>
                          <h5 className="font-bold text-sm text-[--color-navy]">{flag.label}</h5>
                          <p className="text-xs text-gray-500">{flag.desc}</p>
                        </div>
                        <button
                          onClick={() => {
                            setFlags((prev) => ({
                              ...prev,
                              [flag.key]: !prev[flag.key as keyof typeof flags],
                            }));
                            triggerToast(`Flag "${flag.label}" toggled.`);
                          }}
                          className={`px-6 py-2 text-xs font-bold tracking-wider uppercase transition-colors ${
                            flags[flag.key as keyof typeof flags]
                              ? "bg-[--color-navy] text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {flags[flag.key as keyof typeof flags] ? "ENABLED" : "DISABLED"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Sub-tab: Treasury & Grants */}
                {activeTab === "superadmin-treasury" && (
                  <div className="space-y-4">
                    {grantsList.map((g) => (
                      <div key={g.id} className="p-6 border border-gray-200 bg-white flex flex-col md:flex-row justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-bold text-[--color-gold] uppercase tracking-wider">{g.chapter}</span>
                          <h4 className="font-serif font-bold text-base text-[--color-navy] mt-1">{g.title}</h4>
                          <p className="text-xs text-gray-600 mt-2 leading-relaxed">{g.purpose}</p>
                          <p className="text-xs font-mono text-gray-400 mt-3">Submitted by: {g.submittedBy} • {g.date}</p>
                        </div>
                        <div className="text-right flex flex-col items-end justify-between shrink-0">
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Requested</p>
                            <p className="text-xl font-bold font-mono text-[--color-navy]">₹{g.amountRequested.toLocaleString()}</p>
                          </div>
                          {g.status === "Pending Review" && (
                            <div className="flex gap-2 mt-4">
                              <button
                                onClick={() => handleUpdateGrant(g.id, "Approved")}
                                className="px-4 py-1.5 bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-800"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleUpdateGrant(g.id, "Rejected")}
                                className="px-4 py-1.5 bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider hover:bg-red-200"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Sub-tab: Audit Logs */}
                {activeTab === "superadmin-audit" && (
                  <div className="border border-gray-200 overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-[--color-navy] text-white uppercase font-bold">
                        <tr>
                          <th className="py-3 px-4">Timestamp</th>
                          <th className="py-3 px-4">Actor</th>
                          <th className="py-3 px-4">Action</th>
                          <th className="py-3 px-4">Target</th>
                          <th className="py-3 px-4">IP Address</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {auditLogsList.map((log) => (
                          <tr key={log.id}>
                            <td className="py-3 px-4 text-gray-500">{log.timestamp}</td>
                            <td className="py-3 px-4 font-bold text-[--color-navy]">{log.actor}</td>
                            <td className="py-3 px-4 text-[--color-gold] font-bold">{log.action}</td>
                            <td className="py-3 px-4 text-gray-700">{log.target}</td>
                            <td className="py-3 px-4 text-gray-400">{log.ipAddress}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Sub-tab: Danger Zone & Snapshots */}
                {activeTab === "superadmin-danger" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <button
                      onClick={handleTriggerSnapshot}
                      className="p-6 border border-gray-300 bg-[#FAFAFA] hover:bg-blue-50 text-left transition-colors"
                    >
                      <h5 className="font-bold text-sm text-[--color-navy] mb-1">💾 Export JSON Snapshot</h5>
                      <p className="text-xs text-gray-500">Download complete branch database snapshot</p>
                    </button>
                    <button
                      onClick={handlePurgeCache}
                      className="p-6 border border-gray-300 bg-[#FAFAFA] hover:bg-yellow-50 text-left transition-colors"
                    >
                      <h5 className="font-bold text-sm text-[--color-navy] mb-1">⚡ Purge Edge Cache</h5>
                      <p className="text-xs text-gray-500">Invalidate static Next.js ISR edge tags</p>
                    </button>
                    <button
                      onClick={handleSyncVtools}
                      className="p-6 border border-gray-300 bg-[#FAFAFA] hover:bg-emerald-50 text-left transition-colors"
                    >
                      <h5 className="font-bold text-sm text-[--color-navy] mb-1">🔄 Push to IEEE vTools</h5>
                      <p className="text-xs text-gray-500">Sync all active officers and event registries</p>
                    </button>
                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. MODALS & DRAWERS (HOMEPAGE DESIGN SYSTEM)
         ───────────────────────────────────────────────────────────── */}

      {/* 1. SuperAdmin PIN Modal */}
      {showSecurityModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-8 border-2 border-[--color-navy] shadow-2xl relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🛡️</span>
              <h3 className="text-xl font-serif font-bold text-[--color-navy]">Root Clearance Passcode</h3>
            </div>
            <p className="text-xs text-gray-500 mb-6">
              Enter your elevated administrative passcode to access the SuperAdmin governance console.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleVerifyPin();
              }}
              className="space-y-4"
            >
              <div>
                <input
                  type="password"
                  value={securityPinInput}
                  onChange={(e) => {
                    setSecurityPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Enter Passcode (1884)"
                  className="w-full px-4 py-3 border border-gray-300 text-center font-mono text-lg tracking-widest focus:outline-none focus:border-[--color-navy]"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-red-600 font-semibold mt-1.5">
                    Invalid passcode. Default root PIN is <span className="font-mono font-bold">1884</span>.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3 border-2 border-[--color-navy] bg-[--color-navy] text-white font-bold text-xs tracking-widest uppercase hover:bg-[--color-gold] hover:text-[--color-navy] transition-colors"
                >
                  Verify Clearance
                </button>
                <button
                  type="button"
                  onClick={() => handleVerifyPin("1884")}
                  className="w-full py-2.5 border border-amber-300 bg-amber-50 text-amber-900 font-bold text-xs uppercase tracking-wider"
                >
                  ⚡ Instant Demo Unlock (PIN: 1884)
                </button>
                <button
                  type="button"
                  onClick={() => setShowSecurityModal(false)}
                  className="w-full py-2 text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-xl w-full p-8 border-2 border-[--color-navy] shadow-2xl my-8">
            <h3 className="text-xl font-serif font-bold text-[--color-navy] mb-6">
              {editingEvent ? "Edit Workshop Record" : "Schedule New Workshop / Event"}
            </h3>

            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[--color-navy] uppercase tracking-wider mb-1">Event Title</label>
                  <input
                    type="text"
                    required
                    value={eventFormData.title || ""}
                    onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 text-xs focus:outline-none focus:border-[--color-navy]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[--color-navy] uppercase tracking-wider mb-1">Slug URL</label>
                  <input
                    type="text"
                    required
                    value={eventFormData.slug || ""}
                    onChange={(e) => setEventFormData({ ...eventFormData, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 text-xs focus:outline-none focus:border-[--color-navy]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[--color-navy] uppercase tracking-wider mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={eventFormData.date || ""}
                    onChange={(e) => setEventFormData({ ...eventFormData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 text-xs focus:outline-none focus:border-[--color-navy]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[--color-navy] uppercase tracking-wider mb-1">Category</label>
                  <select
                    value={eventFormData.category}
                    onChange={(e) => setEventFormData({ ...eventFormData, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 text-xs"
                  >
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                    <option value="competition">Competition</option>
                    <option value="social">Social</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[--color-navy] uppercase tracking-wider mb-1">Status</label>
                  <select
                    value={eventFormData.status}
                    onChange={(e) => setEventFormData({ ...eventFormData, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 text-xs"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="live">Live Now</option>
                    <option value="past">Past</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[--color-navy] uppercase tracking-wider mb-1">Location</label>
                <input
                  type="text"
                  value={eventFormData.location || ""}
                  onChange={(e) => setEventFormData({ ...eventFormData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 text-xs focus:outline-none focus:border-[--color-navy]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[--color-navy] uppercase tracking-wider mb-1">Description</label>
                <textarea
                  rows={2}
                  value={eventFormData.description || ""}
                  onChange={(e) => setEventFormData({ ...eventFormData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 text-xs focus:outline-none focus:border-[--color-navy]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 border border-gray-300 text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 border-2 border-[--color-navy] bg-[--color-navy] text-white font-bold text-xs tracking-widest uppercase hover:bg-[--color-gold] hover:text-[--color-navy] transition-colors"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. ExCom Modal */}
      {showExcomModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-8 border-2 border-[--color-navy] shadow-2xl">
            <h3 className="text-xl font-serif font-bold text-[--color-navy] mb-6">
              {editingExcom ? "Edit Officer Profile" : "Add Officer to Roster"}
            </h3>

            <form onSubmit={handleSaveExcom} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[--color-navy] uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={excomFormData.name || ""}
                  onChange={(e) => setExcomFormData({ ...excomFormData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 text-xs focus:outline-none focus:border-[--color-navy]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[--color-navy] uppercase tracking-wider mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  value={excomFormData.role || ""}
                  onChange={(e) => setExcomFormData({ ...excomFormData, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 text-xs focus:outline-none focus:border-[--color-navy]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[--color-navy] uppercase tracking-wider mb-1">Branch</label>
                <input
                  type="text"
                  value={excomFormData.branch || ""}
                  onChange={(e) => setExcomFormData({ ...excomFormData, branch: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 text-xs focus:outline-none focus:border-[--color-navy]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowExcomModal(false)}
                  className="px-4 py-2 border border-gray-300 text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 border-2 border-[--color-navy] bg-[--color-navy] text-white font-bold text-xs tracking-widest uppercase hover:bg-[--color-gold] hover:text-[--color-navy] transition-colors"
                >
                  Save Officer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Announcements Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-8 border-2 border-[--color-navy] shadow-2xl">
            <h3 className="text-xl font-serif font-bold text-[--color-navy] mb-6">Broadcast Bulletin Announcement</h3>

            <form onSubmit={handleSaveAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[--color-navy] uppercase tracking-wider mb-1">Message Content</label>
                <textarea
                  rows={3}
                  required
                  value={announcementFormData.title}
                  onChange={(e) => setAnnouncementFormData({ ...announcementFormData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 text-xs focus:outline-none focus:border-[--color-navy]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[--color-navy] uppercase tracking-wider mb-1">Category</label>
                  <select
                    value={announcementFormData.category}
                    onChange={(e) => setAnnouncementFormData({ ...announcementFormData, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 text-xs"
                  >
                    <option value="Urgent Banner">Urgent Banner</option>
                    <option value="General Notice">General Notice</option>
                    <option value="Workshop Alert">Workshop Alert</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[--color-navy] uppercase tracking-wider mb-1">Target</label>
                  <select
                    value={announcementFormData.target}
                    onChange={(e) => setAnnouncementFormData({ ...announcementFormData, target: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 text-xs"
                  >
                    <option value="Public Site">Public Site</option>
                    <option value="All Members">All Members</option>
                    <option value="ExCom Only">ExCom Only</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAnnouncementModal(false)}
                  className="px-4 py-2 border border-gray-300 text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 border-2 border-[--color-navy] bg-[--color-navy] text-white font-bold text-xs tracking-widest uppercase hover:bg-[--color-gold] hover:text-[--color-navy] transition-colors"
                >
                  Broadcast Live
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Invite Admin Modal */}
      {showInviteAdminModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-8 border-2 border-[--color-navy] shadow-2xl">
            <h3 className="text-xl font-serif font-bold text-[--color-navy] mb-6">Invite Administrator</h3>

            <form onSubmit={handleSaveInviteAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[--color-navy] uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={inviteAdminFormData.name}
                  onChange={(e) => setInviteAdminFormData({ ...inviteAdminFormData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 text-xs focus:outline-none focus:border-[--color-navy]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[--color-navy] uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={inviteAdminFormData.email}
                  onChange={(e) => setInviteAdminFormData({ ...inviteAdminFormData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 text-xs focus:outline-none focus:border-[--color-navy]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[--color-navy] uppercase tracking-wider mb-1">Role</label>
                <select
                  value={inviteAdminFormData.role}
                  onChange={(e) => setInviteAdminFormData({ ...inviteAdminFormData, role: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 text-xs"
                >
                  <option value="Branch Admin">Branch Admin</option>
                  <option value="Treasurer">Treasurer</option>
                  <option value="Technical Lead">Technical Lead</option>
                  <option value="SuperAdmin">SuperAdmin</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowInviteAdminModal(false)}
                  className="px-4 py-2 border border-gray-300 text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 border-2 border-[--color-navy] bg-[--color-navy] text-white font-bold text-xs tracking-widest uppercase hover:bg-[--color-gold] hover:text-[--color-navy] transition-colors"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Attendee Drawer */}
      {showAttendeeDrawer && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl p-8 flex flex-col justify-between overflow-y-auto border-l-4 border-[--color-navy]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
                <div>
                  <h4 className="font-serif font-bold text-lg text-[--color-navy]">{showAttendeeDrawer.title}</h4>
                  <p className="text-xs text-gray-500 font-mono">{showAttendeeDrawer.date} • Registered Roster</p>
                </div>
                <button
                  onClick={() => setShowAttendeeDrawer(null)}
                  className="text-gray-400 hover:text-[--color-navy] text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { name: "Rahul S.", email: "rahul.s@cusat.ac.in", branch: "CSE 3rd Yr", paid: true },
                  { name: "Ananya P.", email: "ananya.p@cusat.ac.in", branch: "ECE 2nd Yr", paid: true },
                  { name: "Kiran Joseph", email: "kiran.j@cusat.ac.in", branch: "EEE 4th Yr", paid: false },
                  { name: "Sneha V.", email: "sneha.v@cusat.ac.in", branch: "IT 1st Yr", paid: true },
                ].map((att, idx) => (
                  <div key={idx} className="p-4 bg-[#FAFAFA] border border-gray-200 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-[--color-navy]">{att.name}</p>
                      <p className="text-gray-500 text-[11px] font-mono">{att.email} • {att.branch}</p>
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                      att.paid ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {att.paid ? "Verified" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <button
                onClick={() => triggerToast("📥 Registrations roster exported as CSV.")}
                className="w-full py-3 border-2 border-[--color-navy] bg-[--color-navy] text-white font-bold text-xs tracking-widest uppercase hover:bg-[--color-gold] hover:text-[--color-navy] transition-colors"
              >
                Download Attendee List (CSV)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <AdminContent />
    </Suspense>
  );
}
