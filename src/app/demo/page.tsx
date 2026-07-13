// localhost:3000/api/demo/blocking
"use client";

import {  useState } from "react";
import * as Sentry from "@sentry/nextjs";

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

export default function DemoPage() {
  const { userId } = useAuth();

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const handleBlocking = async () => {
    setLoading(true);
    const response = await fetch("/api/demo/blocking", {
      method: "POST",
    });
    const data = await response.json();
    console.log(data);
    setLoading(false);
  };

  const handleBackground = async () => {
    setLoading2(true);
    const response = await fetch("/api/demo/background", {
      method: "POST",
    });
    const data = await response.json();
    console.log(data);
    setLoading2(false);
  };

  const handleClientError = () => {
    Sentry.logger.info("User clicked the button, throwing a sample error", { userId });
    throw new Error("Client error");
  }

  const handleApiError = async () => {
    const response = await fetch("/api/demo/error", {
      method: "POST",
    });
    const data = await response.json();
    console.log(data);
  }

  const handleInngestError = async () => {
    const response = await fetch("/api/demo/inngest-error", {
      method: "POST",
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="p-8 space-x-4">
      <Button onClick={handleBlocking} disabled={loading}>
        {loading ? "Generating..." : "Blocking"}
      </Button>
      <Button onClick={handleBackground} disabled={loading2}>
        {loading2 ? "Generating..." : "Background"}
      </Button>
      <Button onClick={handleClientError}>Client Error</Button>
      <Button onClick={handleApiError}>API Error</Button>
      <Button onClick={handleInngestError}>Inngest Error</Button>
    </div>
  );
}
