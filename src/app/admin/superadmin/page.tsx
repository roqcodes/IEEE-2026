"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuperAdminRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect seamlessly to the embedded SuperAdmin view inside the Admin Portal
    router.replace("/admin?tab=superadmin");
  }, [router]);

  return null;
}
