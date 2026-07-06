// localhost:3000/api/demo/blocking
"use client";

import {  useState } from "react";

import { Button } from "@/components/ui/button";

export default function DemoPage() {
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

  return (
    <div className="p-8 space-x-4">
      <Button onClick={handleBlocking} disabled={loading}>
        {loading ? "Generating..." : "Blocking"}
      </Button>
      <Button onClick={handleBackground} disabled={loading2}>
        {loading2 ? "Generating..." : "Background"}
      </Button>
    </div>
  );
}
