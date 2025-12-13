// app/_components/RefreshTrigger.js
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RefreshTrigger() {
  const router = useRouter();

  useEffect(() => {
    router.refresh(); // This triggers server components to re-fetch
  }, [router]);

  return null;
}
