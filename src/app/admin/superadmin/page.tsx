"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuperAdminRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect seamlessly to the embedded SuperAdmin view inside the Admin Portal
    router.replace("/admin?view=superadmin");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#061A2D] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-[#F2A900] text-[#0A2540] flex items-center justify-center text-3xl font-bold mb-6 transform rotate-45 animate-pulse">
        <span className="transform -rotate-45">⚡</span>
      </div>
      <h1 className="text-2xl font-serif font-bold text-[#F2A900]">
        Initializing IEEE SuperAdmin Console
      </h1>
      <p className="text-gray-400 text-xs mt-2 font-mono">
        Securing session and loading root administrative privileges...
      </p>
    </div>
  );
}
