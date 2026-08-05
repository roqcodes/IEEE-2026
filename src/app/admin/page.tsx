"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { events as initialEvents, Event } from "@/data/events";
import { execomMembers as initialExecom, ExecomMember } from "@/data/execom";

type AdminTab = "events" | "execom" | "announcements" | "superadmin" | "backup";

interface Announcement {
  id: string;
  title: string;
  category: "Urgent Banner" | "General Notice" | "Workshop Alert" | "Recruitment";
  target: "All Members" | "ExCom Only" | "Public Site";
  published: boolean;
  date: string;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "SuperAdmin" | "Branch Admin" | "Treasurer" | "Technical Lead";
  status: "Active" | "Suspended";
  lastLogin: string;
}

interface GrantRequest {
  id: string;
  chapter: string;
  title: string;
  amountRequested: number;
  submittedBy: string;
  date: string;
  status: "Approved" | "Pending Review" | "Rejected";
}

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  target: string;
}

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    title: "TechSprint 2025 Registrations are officially open! Early bird prizes worth ₹20K.",
    category: "Urgent Banner",
    target: "Public Site",
    published: true,
    date: "2025-08-04",
  },
  {
    id: "ann-2",
    title: "Executive Committee Monthly General Body Meeting scheduled for Friday 5 PM.",
    category: "General Notice",
    target: "ExCom Only",
    published: true,
    date: "2025-08-02",
  },
  {
    id: "ann-3",
    title: "Call for Volunteers: IEEE Day 2025 Organizing Core Committee.",
    category: "Recruitment",
    target: "All Members",
    published: true,
    date: "2025-07-28",
  },
  {
    id: "ann-4",
    title: "ESP32 Hardware Kit distribution list for IoT Workshop participants.",
    category: "Workshop Alert",
    target: "Public Site",
    published: false,
    date: "2025-07-25",
  },
];

const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: "adm-1",
    name: "Arjun Menon",
    email: "arjun.chair@cusat.ac.in",
    role: "SuperAdmin",
    status: "Active",
    lastLogin: "Today, 11:20 AM",
  },
  {
    id: "adm-2",
    name: "Sneha Krishnan",
    email: "sneha.vicechair@cusat.ac.in",
    role: "Branch Admin",
    status: "Active",
    lastLogin: "Yesterday, 4:15 PM",
  },
  {
    id: "adm-3",
    name: "Priya Nair",
    email: "priya.treasurer@cusat.ac.in",
    role: "Treasurer",
    status: "Active",
    lastLogin: "2 days ago",
  },
  {
    id: "adm-4",
    name: "Dr. Biju N",
    email: "bijun@cusat.ac.in",
    role: "SuperAdmin",
    status: "Active",
    lastLogin: "5 days ago",
  },
];

const INITIAL_GRANTS: GrantRequest[] = [
  {
    id: "grant-1",
    chapter: "Robotics & Automation (RAS)",
    title: "Autonomous Drone Flight Hardware Lab",
    amountRequested: 45000,
    submittedBy: "Farhan Ali",
    date: "2025-07-20",
    status: "Approved",
  },
  {
    id: "grant-2",
    chapter: "Women in Engineering (WIE)",
    title: "STEM Mentorship Camp for High Schools",
    amountRequested: 25000,
    submittedBy: "Meera Nandakumar",
    date: "2025-08-01",
    status: "Pending Review",
  },
  {
    id: "grant-3",
    chapter: "Computer Society (CS)",
    title: "Cloud GPU Compute for AI Hackathon",
    amountRequested: 50000,
    submittedBy: "Aditya Kumar",
    date: "2025-08-03",
    status: "Pending Review",
  },
];

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: "log-1",
    timestamp: "2026-08-05 11:20",
    user: "Arjun Menon",
    action: "UPDATE_EVENT",
    target: "TechSprint 2025",
  },
  {
    id: "log-2",
    timestamp: "2026-08-05 09:45",
    user: "Sneha Krishnan",
    action: "PUBLISH_ANNOUNCEMENT",
    target: "TechSprint Registrations",
  },
  {
    id: "log-3",
    timestamp: "2026-08-04 16:30",
    user: "Priya Nair",
    action: "APPROVE_GRANT",
    target: "RAS Drone Workshop (₹45,000)",
  },
];

function AdminDashboard() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<AdminTab>("events");
  const [toast, setToast] = useState<string | null>(null);

  // SuperAdmin Login State - ONLY revealed after successful login
  const [isSuperAdminLoggedIn, setIsSuperAdminLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Sync tab with URL parameters
  useEffect(() => {
    const tabParam = searchParams.get("tab") || searchParams.get("view");
    if (tabParam === "superadmin") {
      if (!isSuperAdminLoggedIn) {
        setShowLoginModal(true);
      } else {
        setActiveTab("superadmin");
      }
    } else if (tabParam && ["events", "execom", "announcements", "backup"].includes(tabParam)) {
      setActiveTab(tabParam as AdminTab);
    }
  }, [searchParams, isSuperAdminLoggedIn]);

  // Data State
  const [eventsList, setEventsList] = useState<Event[]>(initialEvents);
  const [execomList, setExecomList] = useState<ExecomMember[]>(initialExecom);
  const [announcementsList, setAnnouncementsList] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);
  const [grants, setGrants] = useState<GrantRequest[]>(INITIAL_GRANTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // SuperAdmin Feature Flags
  const [siteFlags, setSiteFlags] = useState({
    publicRegistrations: true,
    maintenanceMode: false,
    inductionDriveBanner: true,
  });

  // Search & Filter State
  const [eventSearch, setEventSearch] = useState("");
  const [eventCategoryFilter, setEventCategoryFilter] = useState("all");
  const [execomSearch, setExecomSearch] = useState("");

  // Modals
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [eventForm, setEventForm] = useState<Partial<Event>>({
    title: "",
    slug: "",
    date: "",
    location: "CUSAT Campus, Kochi",
    category: "workshop",
    status: "upcoming",
    description: "",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    registrationLink: "",
  });

  const [execomModalOpen, setExecomModalOpen] = useState(false);
  const [editingExecom, setEditingExecom] = useState<ExecomMember | null>(null);
  const [execomForm, setExecomForm] = useState<Partial<ExecomMember>>({
    name: "",
    role: "",
    branch: "School of Engineering",
    year: "3rd Year B.Tech",
    email: "",
    linkedin: "",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
  });

  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    category: "General Notice" as Announcement["category"],
    target: "Public Site" as Announcement["target"],
  });

  const [addAdminModalOpen, setAddAdminModalOpen] = useState(false);
  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    role: "Branch Admin" as AdminUser["role"],
  });

  const [attendeeModalEvent, setAttendeeModalEvent] = useState<Event | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // SuperAdmin Login Handler
  const handleSuperAdminLogin = (overridePin?: string) => {
    const pin = overridePin || pinInput;
    if (pin === "1884" || pin === "admin" || pin === "root") {
      setIsSuperAdminLoggedIn(true);
      setShowLoginModal(false);
      setPinInput("");
      setLoginError(false);
      setActiveTab("superadmin");
      showToast("⚡ Logged in as SuperAdmin. Specifications unlocked.");
    } else {
      setLoginError(true);
    }
  };

  const handleSuperAdminLogout = () => {
    setIsSuperAdminLoggedIn(false);
    setActiveTab("events");
    showToast("🔒 Logged out of SuperAdmin.");
  };

  // Event Handlers
  const handleOpenAddEvent = () => {
    setEditingEvent(null);
    setEventForm({
      title: "",
      slug: `event-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      location: "CUSAT Campus, Kochi",
      category: "workshop",
      status: "upcoming",
      description: "",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
      registrationLink: "",
    });
    setEventModalOpen(true);
  };

  const handleOpenEditEvent = (ev: Event) => {
    setEditingEvent(ev);
    setEventForm(ev);
    setEventModalOpen(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.slug) return;

    if (editingEvent) {
      setEventsList((prev) =>
        prev.map((item) =>
          item.slug === editingEvent.slug ? ({ ...item, ...eventForm } as Event) : item
        )
      );
      showToast(`Event "${eventForm.title}" updated.`);
    } else {
      setEventsList((prev) => [eventForm as Event, ...prev]);
      showToast(`Event "${eventForm.title}" created.`);
    }
    setEventModalOpen(false);
  };

  const handleDeleteEvent = (slug: string) => {
    if (confirm("Delete this event?")) {
      setEventsList((prev) => prev.filter((e) => e.slug !== slug));
      showToast("Event deleted.");
    }
  };

  // Execom Handlers
  const handleOpenAddExecom = () => {
    setEditingExecom(null);
    setExecomForm({
      name: "",
      role: "",
      branch: "School of Engineering",
      year: "3rd Year B.Tech",
      email: "",
      linkedin: "",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    });
    setExecomModalOpen(true);
  };

  const handleOpenEditExecom = (m: ExecomMember) => {
    setEditingExecom(m);
    setExecomForm(m);
    setExecomModalOpen(true);
  };

  const handleSaveExecom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!execomForm.name || !execomForm.role) return;

    if (editingExecom) {
      setExecomList((prev) =>
        prev.map((item) =>
          item.id === editingExecom.id ? ({ ...item, ...execomForm } as ExecomMember) : item
        )
      );
      showToast(`Officer "${execomForm.name}" updated.`);
    } else {
      const newMember: ExecomMember = {
        id: `member-${Date.now()}`,
        name: execomForm.name || "",
        role: execomForm.role || "",
        branch: execomForm.branch || "School of Engineering",
        year: execomForm.year || "3rd Year B.Tech",
        photo:
          execomForm.photo ||
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
        email: execomForm.email,
        linkedin: execomForm.linkedin,
      };
      setExecomList((prev) => [newMember, ...prev]);
      showToast(`Officer "${newMember.name}" added.`);
    }
    setExecomModalOpen(false);
  };

  const handleDeleteExecom = (id: string) => {
    if (confirm("Remove this member from ExCom?")) {
      setExecomList((prev) => prev.filter((m) => m.id !== id));
      showToast("Member removed.");
    }
  };

  // Announcement Handlers
  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementForm.title) return;
    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title: announcementForm.title,
      category: announcementForm.category,
      target: announcementForm.target,
      published: true,
      date: new Date().toISOString().split("T")[0],
    };
    setAnnouncementsList((prev) => [newAnn, ...prev]);
    setAnnouncementModalOpen(false);
    setAnnouncementForm({ title: "", category: "General Notice", target: "Public Site" });
    showToast("Announcement published.");
  };

  const handleTogglePublish = (id: string) => {
    setAnnouncementsList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, published: !a.published } : a))
    );
    showToast("Status updated.");
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncementsList((prev) => prev.filter((a) => a.id !== id));
    showToast("Announcement removed.");
  };

  // SuperAdmin Handlers
  const handleSaveAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminForm.name || !adminForm.email) return;
    const newAdm: AdminUser = {
      id: `adm-${Date.now()}`,
      name: adminForm.name,
      email: adminForm.email,
      role: adminForm.role,
      status: "Active",
      lastLogin: "Pending login",
    };
    setAdminUsers((prev) => [...prev, newAdm]);
    setAddAdminModalOpen(false);
    setAdminForm({ name: "", email: "", role: "Branch Admin" });
    showToast(`Admin account created for ${newAdm.email}.`);
  };

  const handleToggleAdminStatus = (id: string) => {
    setAdminUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const next = u.status === "Active" ? "Suspended" : "Active";
          return { ...u, status: next };
        }
        return u;
      })
    );
    showToast("Admin account status updated.");
  };

  const handleDeleteAdmin = (id: string) => {
    if (confirm("Delete this admin account?")) {
      setAdminUsers((prev) => prev.filter((u) => u.id !== id));
      showToast("Admin account deleted.");
    }
  };

  const handleUpdateGrantStatus = (id: string, newStatus: "Approved" | "Rejected") => {
    setGrants((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status: newStatus } : g))
    );
    showToast(`Grant marked as ${newStatus}.`);
  };

  // Filtered lists
  const filteredEvents = useMemo(() => {
    return eventsList.filter((ev) => {
      const matchSearch =
        ev.title.toLowerCase().includes(eventSearch.toLowerCase()) ||
        ev.location.toLowerCase().includes(eventSearch.toLowerCase());
      const matchCategory =
        eventCategoryFilter === "all" || ev.category === eventCategoryFilter;
      return matchSearch && matchCategory;
    });
  }, [eventsList, eventSearch, eventCategoryFilter]);

  const filteredExecom = useMemo(() => {
    return execomList.filter((m) => {
      return (
        m.name.toLowerCase().includes(execomSearch.toLowerCase()) ||
        m.role.toLowerCase().includes(execomSearch.toLowerCase()) ||
        m.branch.toLowerCase().includes(execomSearch.toLowerCase())
      );
    });
  }, [execomList, execomSearch]);

  const handleExportJSON = () => {
    const data = {
      exportDate: new Date().toISOString(),
      events: eventsList,
      execom: execomList,
      announcements: announcementsList,
      adminUsers: isSuperAdminLoggedIn ? adminUsers : undefined,
      grants: isSuperAdminLoggedIn ? grants : undefined,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ieee-cusat-data-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    showToast("Data exported successfully.");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A2540] text-white px-5 py-3 shadow-lg border-l-4 border-[#F2A900] text-sm flex items-center gap-3 animate-in fade-in duration-200">
          <span>{toast}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0A2540] text-white flex items-center justify-center font-bold text-xs">
              IEEE
            </div>
            <div>
              <h1 className="text-base font-bold text-[#0A2540] leading-none">
                IEEE CUSAT Admin
              </h1>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {isSuperAdminLoggedIn ? "SuperAdmin Console (Authenticated)" : "Management Dashboard"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isSuperAdminLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300">
                  ⚡ SuperAdmin Active
                </span>
                <button
                  onClick={handleSuperAdminLogout}
                  className="text-xs font-semibold px-2.5 py-1.5 border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition"
                  title="Logout from SuperAdmin"
                >
                  🔒 Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-xs font-semibold px-3 py-1.5 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 transition flex items-center gap-1.5"
                title="SuperAdmin Login"
              >
                <span>🔑</span>
                <span>SuperAdmin Login</span>
              </button>
            )}

            <Link
              href="/"
              className="text-xs font-semibold px-3 py-1.5 border border-gray-300 hover:bg-gray-100 text-gray-700 transition"
            >
              ← Public Site
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs - SuperAdmin tab is ONLY rendered if isSuperAdminLoggedIn is true */}
        <div className="flex border-b border-gray-200 bg-white shadow-xs mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab("events")}
            className={`px-6 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === "events"
                ? "border-[#0A2540] text-[#0A2540] bg-gray-50"
                : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <span>Events & Workshops</span>
            <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-700 font-mono">
              {eventsList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("execom")}
            className={`px-6 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === "execom"
                ? "border-[#0A2540] text-[#0A2540] bg-gray-50"
                : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <span>ExCom Officers</span>
            <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-700 font-mono">
              {execomList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("announcements")}
            className={`px-6 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === "announcements"
                ? "border-[#0A2540] text-[#0A2540] bg-gray-50"
                : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <span>Announcements</span>
            <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-700 font-mono">
              {announcementsList.length}
            </span>
          </button>

          {/* SuperAdmin Tab ONLY visible after login */}
          {isSuperAdminLoggedIn && (
            <button
              onClick={() => setActiveTab("superadmin")}
              className={`px-6 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 flex items-center gap-2 animate-in fade-in duration-300 ${
                activeTab === "superadmin"
                  ? "border-amber-500 text-amber-900 bg-amber-50"
                  : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <span>⚡ SuperAdmin</span>
              <span className="text-xs px-2 py-0.5 bg-amber-200 text-amber-900 font-mono font-bold">
                Root
              </span>
            </button>
          )}

          <button
            onClick={() => setActiveTab("backup")}
            className={`px-6 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === "backup"
                ? "border-[#0A2540] text-[#0A2540] bg-gray-50"
                : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <span>Backup & Export</span>
          </button>
        </div>

        {/* ── TAB 1: EVENTS ── */}
        {activeTab === "events" && (
          <div className="space-y-4">
            {/* Toolbar */}
            <div className="bg-white p-4 border border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex flex-1 items-center gap-3">
                <input
                  type="text"
                  placeholder="Search events by title or location..."
                  value={eventSearch}
                  onChange={(e) => setEventSearch(e.target.value)}
                  className="w-full sm:max-w-xs px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#0A2540]"
                />
                <select
                  value={eventCategoryFilter}
                  onChange={(e) => setEventCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 text-sm bg-white focus:outline-none focus:border-[#0A2540]"
                >
                  <option value="all">All Categories</option>
                  <option value="workshop">Workshop</option>
                  <option value="seminar">Seminar</option>
                  <option value="competition">Competition</option>
                  <option value="social">Social</option>
                </select>
              </div>

              <button
                onClick={handleOpenAddEvent}
                className="px-4 py-2 bg-[#0A2540] hover:bg-[#F2A900] hover:text-[#0A2540] text-white font-semibold text-xs tracking-wider uppercase transition shrink-0"
              >
                + Add Event
              </button>
            </div>

            {/* Events Table */}
            <div className="bg-white border border-gray-200 overflow-x-auto shadow-xs">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-700 text-xs uppercase font-bold border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4">Event Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredEvents.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-400 text-sm">
                        No events found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredEvents.map((ev) => (
                      <tr key={ev.slug} className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-[#0A2540]">
                          {ev.title}
                          <span className="block text-xs text-gray-400 font-mono font-normal">
                            /{ev.slug}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 uppercase font-semibold">
                            {ev.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 whitespace-nowrap text-xs">
                          {ev.date}
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-xs">{ev.location}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-xs px-2 py-0.5 font-semibold uppercase ${
                              ev.status === "upcoming"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : ev.status === "live"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-gray-100 text-gray-600 border border-gray-200"
                            }`}
                          >
                            {ev.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                          <button
                            onClick={() => setAttendeeModalEvent(ev)}
                            className="px-2.5 py-1 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
                          >
                            Attendees
                          </button>
                          <button
                            onClick={() => handleOpenEditEvent(ev)}
                            className="px-2.5 py-1 text-xs font-semibold bg-white hover:bg-gray-100 text-[#0A2540] border border-gray-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(ev.slug)}
                            className="px-2.5 py-1 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB 2: EXECOM ── */}
        {activeTab === "execom" && (
          <div className="space-y-4">
            {/* Toolbar */}
            <div className="bg-white p-4 border border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
              <input
                type="text"
                placeholder="Search member by name, role, or branch..."
                value={execomSearch}
                onChange={(e) => setExecomSearch(e.target.value)}
                className="w-full sm:max-w-xs px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#0A2540]"
              />

              <button
                onClick={handleOpenAddExecom}
                className="px-4 py-2 bg-[#0A2540] hover:bg-[#F2A900] hover:text-[#0A2540] text-white font-semibold text-xs tracking-wider uppercase transition shrink-0"
              >
                + Add Officer
              </button>
            </div>

            {/* Execom Table */}
            <div className="bg-white border border-gray-200 overflow-x-auto shadow-xs">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-700 text-xs uppercase font-bold border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4">Officer</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Department / Branch</th>
                    <th className="py-3 px-4">Year</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredExecom.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-400 text-sm">
                        No members found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredExecom.map((m) => (
                      <tr key={m.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={m.photo}
                              alt={m.name}
                              className="w-9 h-9 object-cover border border-gray-200 shrink-0"
                            />
                            <div>
                              <p className="font-semibold text-[#0A2540]">{m.name}</p>
                              {m.email && (
                                <p className="text-xs text-gray-400 font-mono">{m.email}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-semibold text-gray-800 text-xs uppercase tracking-wide">
                          {m.role}
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-xs">{m.branch}</td>
                        <td className="py-3 px-4 text-gray-600 text-xs">{m.year}</td>
                        <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                          <button
                            onClick={() => handleOpenEditExecom(m)}
                            className="px-2.5 py-1 text-xs font-semibold bg-white hover:bg-gray-100 text-[#0A2540] border border-gray-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteExecom(m.id)}
                            className="px-2.5 py-1 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB 3: ANNOUNCEMENTS ── */}
        {activeTab === "announcements" && (
          <div className="space-y-4">
            {/* Toolbar */}
            <div className="bg-white p-4 border border-gray-200 flex items-center justify-between shadow-xs">
              <p className="text-sm text-gray-600">
                Manage live alerts, recruitment notices, and general announcements.
              </p>
              <button
                onClick={() => setAnnouncementModalOpen(true)}
                className="px-4 py-2 bg-[#0A2540] hover:bg-[#F2A900] hover:text-[#0A2540] text-white font-semibold text-xs tracking-wider uppercase transition shrink-0"
              >
                + New Announcement
              </button>
            </div>

            {/* Announcements List */}
            <div className="bg-white border border-gray-200 divide-y divide-gray-200 shadow-xs">
              {announcementsList.map((ann) => (
                <div
                  key={ann.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50"
                >
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-yellow-100 text-yellow-900 border border-yellow-200">
                        {ann.category}
                      </span>
                      <span className="text-xs text-gray-400">Target: {ann.target}</span>
                      <span className="text-xs text-gray-400">• {ann.date}</span>
                    </div>
                    <p className="font-semibold text-sm text-[#0A2540]">{ann.title}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleTogglePublish(ann.id)}
                      className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider border transition ${
                        ann.published
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                      }`}
                    >
                      {ann.published ? "● Live" : "○ Draft"}
                    </button>
                    <button
                      onClick={() => handleDeleteAnnouncement(ann.id)}
                      className="px-2.5 py-1 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 4: SUPERADMIN (ONLY VISIBLE WHEN LOGGED IN) ── */}
        {activeTab === "superadmin" && isSuperAdminLoggedIn && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header banner */}
            <div className="bg-white border-l-4 border-amber-500 border border-gray-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-[#0A2540] flex items-center gap-2">
                  <span>⚡</span> SuperAdministrator Specifications
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Root administrative access: User RBAC, Chapter Grant Approvals, Site-wide feature flags, and Security Audit Logs.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setAddAdminModalOpen(true)}
                  className="px-4 py-2 bg-[#0A2540] hover:bg-[#F2A900] hover:text-[#0A2540] text-white font-semibold text-xs uppercase tracking-wider transition"
                >
                  + Add Administrator
                </button>
                <button
                  onClick={handleSuperAdminLogout}
                  className="px-3 py-2 border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 font-semibold text-xs uppercase tracking-wider transition"
                >
                  🔒 Logout
                </button>
              </div>
            </div>

            {/* Section 1: Admin Users (RBAC) */}
            <div className="bg-white border border-gray-200 shadow-xs">
              <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                <h4 className="font-bold text-sm text-[#0A2540]">Administrative Users & Roles</h4>
                <span className="text-xs font-mono text-gray-500">{adminUsers.length} total users</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-700 uppercase font-bold border-b border-gray-200">
                    <tr>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Last Activity</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {adminUsers.map((usr) => (
                      <tr key={usr.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-[#0A2540]">{usr.name}</td>
                        <td className="py-3 px-4 text-gray-600 font-mono">{usr.email}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 font-semibold text-[10px] uppercase ${
                              usr.role === "SuperAdmin"
                                ? "bg-amber-100 text-amber-900 border border-amber-200"
                                : "bg-blue-50 text-blue-800 border border-blue-200"
                            }`}
                          >
                            {usr.role}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 font-semibold text-[10px] uppercase ${
                              usr.status === "Active"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                            }`}
                          >
                            {usr.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-400">{usr.lastLogin}</td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => handleToggleAdminStatus(usr.id)}
                            className="px-2 py-1 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
                          >
                            Toggle Status
                          </button>
                          <button
                            onClick={() => handleDeleteAdmin(usr.id)}
                            className="px-2 py-1 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 2: Chapter Grant Approvals & Feature Flags */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chapter Grants */}
              <div className="bg-white border border-gray-200 shadow-xs flex flex-col">
                <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#0A2540]">Chapter Grant Requests</h4>
                  <span className="text-xs text-amber-700 font-bold">
                    {grants.filter((g) => g.status === "Pending Review").length} Pending
                  </span>
                </div>
                <div className="divide-y divide-gray-200 p-4 space-y-3 flex-1 overflow-y-auto max-h-96">
                  {grants.map((g) => (
                    <div key={g.id} className="p-3 bg-gray-50 border border-gray-200 flex flex-col gap-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-[#0A2540] uppercase">
                            {g.chapter}
                          </span>
                          <p className="text-xs font-bold text-gray-900 mt-0.5">{g.title}</p>
                          <p className="text-[11px] text-gray-500">
                            By {g.submittedBy} • {g.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold font-mono text-[#0A2540]">
                            ₹{g.amountRequested.toLocaleString()}
                          </p>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 uppercase ${
                              g.status === "Approved"
                                ? "bg-emerald-100 text-emerald-800"
                                : g.status === "Pending Review"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {g.status}
                          </span>
                        </div>
                      </div>

                      {g.status === "Pending Review" && (
                        <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
                          <button
                            onClick={() => handleUpdateGrantStatus(g.id, "Approved")}
                            className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleUpdateGrantStatus(g.id, "Rejected")}
                            className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-semibold"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Site Controls & Feature Flags */}
              <div className="bg-white border border-gray-200 shadow-xs flex flex-col">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h4 className="font-bold text-sm text-[#0A2540]">Website Feature Flags</h4>
                </div>
                <div className="p-5 space-y-4 divide-y divide-gray-100 flex-1">
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-xs font-bold text-gray-800">Public Workshop Registrations</p>
                      <p className="text-[11px] text-gray-500">Allow public non-members to register for events</p>
                    </div>
                    <button
                      onClick={() => {
                        setSiteFlags((f) => ({ ...f, publicRegistrations: !f.publicRegistrations }));
                        showToast("Flag updated.");
                      }}
                      className={`px-3 py-1 text-xs font-bold uppercase transition ${
                        siteFlags.publicRegistrations
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {siteFlags.publicRegistrations ? "Enabled" : "Disabled"}
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <p className="text-xs font-bold text-gray-800">Maintenance Mode</p>
                      <p className="text-[11px] text-gray-500">Show maintenance notice on the homepage</p>
                    </div>
                    <button
                      onClick={() => {
                        setSiteFlags((f) => ({ ...f, maintenanceMode: !f.maintenanceMode }));
                        showToast("Flag updated.");
                      }}
                      className={`px-3 py-1 text-xs font-bold uppercase transition ${
                        siteFlags.maintenanceMode
                          ? "bg-red-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {siteFlags.maintenanceMode ? "Active" : "Inactive"}
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <p className="text-xs font-bold text-gray-800">Annual Membership Drive Banner</p>
                      <p className="text-[11px] text-gray-500">Highlight student branch recruitment campaign</p>
                    </div>
                    <button
                      onClick={() => {
                        setSiteFlags((f) => ({ ...f, inductionDriveBanner: !f.inductionDriveBanner }));
                        showToast("Flag updated.");
                      }}
                      className={`px-3 py-1 text-xs font-bold uppercase transition ${
                        siteFlags.inductionDriveBanner
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {siteFlags.inductionDriveBanner ? "Enabled" : "Disabled"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Audit Ledger */}
            <div className="bg-white border border-gray-200 shadow-xs">
              <div className="px-5 py-4 border-b border-gray-200">
                <h4 className="font-bold text-sm text-[#0A2540]">Recent Administrative Activity</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-gray-50 text-gray-700 uppercase font-bold border-b border-gray-200">
                    <tr>
                      <th className="py-2.5 px-4">Timestamp</th>
                      <th className="py-2.5 px-4">User</th>
                      <th className="py-2.5 px-4">Action</th>
                      <th className="py-2.5 px-4">Target</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="py-2.5 px-4 text-gray-500">{log.timestamp}</td>
                        <td className="py-2.5 px-4 font-semibold text-[#0A2540]">{log.user}</td>
                        <td className="py-2.5 px-4 text-amber-800 font-bold">{log.action}</td>
                        <td className="py-2.5 px-4 text-gray-600">{log.target}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 5: BACKUP & EXPORT ── */}
        {activeTab === "backup" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#0A2540]">Export Website Data</h3>
              <p className="text-sm text-gray-600">
                Download a JSON snapshot of all current events, executive committee members, announcements, and administrative settings.
              </p>
              <button
                onClick={handleExportJSON}
                className="px-5 py-2.5 bg-[#0A2540] hover:bg-[#F2A900] hover:text-[#0A2540] text-white font-semibold text-xs uppercase tracking-wider transition"
              >
                Download JSON Backup
              </button>
            </div>

            <div className="bg-white border border-gray-200 p-6 shadow-xs space-y-3">
              <h3 className="text-base font-bold text-[#0A2540]">Overview Summary</h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-gray-50 border border-gray-200">
                  <p className="text-2xl font-bold text-[#0A2540]">{eventsList.length}</p>
                  <p className="text-xs text-gray-500 uppercase mt-1">Events</p>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200">
                  <p className="text-2xl font-bold text-[#0A2540]">{execomList.length}</p>
                  <p className="text-xs text-gray-500 uppercase mt-1">Officers</p>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200">
                  <p className="text-2xl font-bold text-[#0A2540]">
                    {announcementsList.filter((a) => a.published).length}
                  </p>
                  <p className="text-xs text-gray-500 uppercase mt-1">Live Alerts</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── SUPERADMIN LOGIN MODAL ── */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full p-6 border-2 border-[#0A2540] shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto mb-2 text-xl font-bold">
                ⚡
              </div>
              <h3 className="text-base font-bold text-[#0A2540]">
                SuperAdmin Login
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Enter your administrative PIN to access root specifications.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSuperAdminLogin();
              }}
              className="space-y-4"
            >
              <div>
                <input
                  type="password"
                  autoFocus
                  placeholder="Enter PIN (e.g. 1884)"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setLoginError(false);
                  }}
                  className="w-full px-4 py-2.5 text-center font-mono text-lg tracking-widest border border-gray-300 focus:outline-none focus:border-[#0A2540]"
                />
                {loginError && (
                  <p className="text-xs text-red-600 font-semibold mt-1.5 text-center">
                    Invalid PIN. Please try again.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0A2540] hover:bg-[#F2A900] hover:text-[#0A2540] text-white font-semibold text-xs tracking-wider uppercase transition"
                >
                  Login to SuperAdmin
                </button>
                <button
                  type="button"
                  onClick={() => handleSuperAdminLogin("1884")}
                  className="w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold transition"
                >
                  Quick Unlock (PIN: 1884)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLoginModal(false);
                    setPinInput("");
                    setLoginError(false);
                  }}
                  className="w-full py-1.5 text-xs text-gray-500 hover:text-gray-900 font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── EVENT MODAL (ADD / EDIT) ── */}
      {eventModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-lg w-full p-6 border border-gray-300 shadow-xl my-8">
            <h3 className="text-lg font-bold text-[#0A2540] mb-4">
              {editingEvent ? "Edit Event" : "Create New Event"}
            </h3>

            <form onSubmit={handleSaveEvent} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={eventForm.title || ""}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  placeholder="e.g. IoT Bootcamp 2026"
                  className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#0A2540]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Slug URL *</label>
                  <input
                    type="text"
                    required
                    value={eventForm.slug || ""}
                    onChange={(e) => setEventForm({ ...eventForm, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#0A2540]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={eventForm.date || ""}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#0A2540]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={eventForm.category}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, category: e.target.value as any })
                    }
                    className="w-full px-3 py-2 border border-gray-300 text-sm bg-white"
                  >
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                    <option value="competition">Competition</option>
                    <option value="social">Social</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Status</label>
                  <select
                    value={eventForm.status}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, status: e.target.value as any })
                    }
                    className="w-full px-3 py-2 border border-gray-300 text-sm bg-white"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="live">Live</option>
                    <option value="past">Past</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={eventForm.location || ""}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  placeholder="CUSAT Campus, Kochi"
                  className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#0A2540]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={eventForm.description || ""}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#0A2540]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={eventForm.image || ""}
                  onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#0A2540]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setEventModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0A2540] hover:bg-[#F2A900] hover:text-[#0A2540] text-white font-semibold transition"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── EXECOM MODAL (ADD / EDIT) ── */}
      {execomModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 border border-gray-300 shadow-xl">
            <h3 className="text-lg font-bold text-[#0A2540] mb-4">
              {editingExecom ? "Edit Officer" : "Add ExCom Member"}
            </h3>

            <form onSubmit={handleSaveExecom} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={execomForm.name || ""}
                  onChange={(e) => setExecomForm({ ...execomForm, name: e.target.value })}
                  placeholder="e.g. Arjun Menon"
                  className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#0A2540]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Role Title *</label>
                <input
                  type="text"
                  required
                  value={execomForm.role || ""}
                  onChange={(e) => setExecomForm({ ...execomForm, role: e.target.value })}
                  placeholder="e.g. Chairperson, Secretary"
                  className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#0A2540]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Branch / Dept</label>
                  <input
                    type="text"
                    value={execomForm.branch || ""}
                    onChange={(e) => setExecomForm({ ...execomForm, branch: e.target.value })}
                    placeholder="Computer Science"
                    className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#0A2540]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Academic Year</label>
                  <input
                    type="text"
                    value={execomForm.year || ""}
                    onChange={(e) => setExecomForm({ ...execomForm, year: e.target.value })}
                    placeholder="3rd Year B.Tech"
                    className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#0A2540]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={execomForm.email || ""}
                  onChange={(e) => setExecomForm({ ...execomForm, email: e.target.value })}
                  placeholder="name@cusat.ac.in"
                  className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#0A2540]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Photo URL</label>
                <input
                  type="text"
                  value={execomForm.photo || ""}
                  onChange={(e) => setExecomForm({ ...execomForm, photo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#0A2540]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setExecomModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0A2540] hover:bg-[#F2A900] hover:text-[#0A2540] text-white font-semibold transition"
                >
                  Save Officer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── ANNOUNCEMENT MODAL ── */}
      {announcementModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 border border-gray-300 shadow-xl">
            <h3 className="text-lg font-bold text-[#0A2540] mb-4">New Announcement</h3>

            <form onSubmit={handleSaveAnnouncement} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Content / Title *</label>
                <textarea
                  rows={3}
                  required
                  value={announcementForm.title}
                  onChange={(e) =>
                    setAnnouncementForm({ ...announcementForm, title: e.target.value })
                  }
                  placeholder="Enter notice text..."
                  className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#0A2540]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={announcementForm.category}
                    onChange={(e) =>
                      setAnnouncementForm({
                        ...announcementForm,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 text-sm bg-white"
                  >
                    <option value="Urgent Banner">Urgent Banner</option>
                    <option value="General Notice">General Notice</option>
                    <option value="Workshop Alert">Workshop Alert</option>
                    <option value="Recruitment">Recruitment</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Target Audience</label>
                  <select
                    value={announcementForm.target}
                    onChange={(e) =>
                      setAnnouncementForm({
                        ...announcementForm,
                        target: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 text-sm bg-white"
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
                  onClick={() => setAnnouncementModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0A2540] hover:bg-[#F2A900] hover:text-[#0A2540] text-white font-semibold transition"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── ADD ADMIN MODAL (SUPERADMIN) ── */}
      {addAdminModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 border border-gray-300 shadow-xl">
            <h3 className="text-lg font-bold text-[#0A2540] mb-4">Add Administrator</h3>

            <form onSubmit={handleSaveAdmin} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Admin Full Name *</label>
                <input
                  type="text"
                  required
                  value={adminForm.name}
                  onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#0A2540]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={adminForm.email}
                  onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                  placeholder="rahul@cusat.ac.in"
                  className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#0A2540]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Role Assignment</label>
                <select
                  value={adminForm.role}
                  onChange={(e) =>
                    setAdminForm({ ...adminForm, role: e.target.value as AdminUser["role"] })
                  }
                  className="w-full px-3 py-2 border border-gray-300 text-sm bg-white"
                >
                  <option value="Branch Admin">Branch Admin</option>
                  <option value="Treasurer">Treasurer</option>
                  <option value="Technical Lead">Technical Lead</option>
                  <option value="SuperAdmin">SuperAdmin (Full Root)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setAddAdminModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0A2540] hover:bg-[#F2A900] hover:text-[#0A2540] text-white font-semibold transition"
                >
                  Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── ATTENDEE DRAWER ── */}
      {attendeeModalEvent && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
                <div>
                  <h4 className="font-bold text-base text-[#0A2540]">
                    {attendeeModalEvent.title}
                  </h4>
                  <p className="text-xs text-gray-500">Attendee Roster</p>
                </div>
                <button
                  onClick={() => setAttendeeModalEvent(null)}
                  className="text-gray-400 hover:text-gray-900 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                {[
                  { name: "Rahul S.", email: "rahul.s@cusat.ac.in", branch: "CSE 3rd Yr", status: "Confirmed" },
                  { name: "Ananya P.", email: "ananya.p@cusat.ac.in", branch: "ECE 2nd Yr", status: "Confirmed" },
                  { name: "Kiran Joseph", email: "kiran.j@cusat.ac.in", branch: "EEE 4th Yr", status: "Pending" },
                  { name: "Sneha V.", email: "sneha.v@cusat.ac.in", branch: "IT 1st Yr", status: "Confirmed" },
                ].map((att, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gray-50 border border-gray-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{att.name}</p>
                      <p className="text-gray-500 text-[11px] font-mono">{att.email} • {att.branch}</p>
                    </div>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-semibold uppercase ${
                        att.status === "Confirmed"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {att.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => showToast("Attendee CSV exported.")}
                className="w-full py-2.5 bg-[#0A2540] hover:bg-[#F2A900] hover:text-[#0A2540] text-white font-semibold text-xs tracking-wider uppercase transition"
              >
                Export CSV
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
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <AdminDashboard />
    </Suspense>
  );
}
