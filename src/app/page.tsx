"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const DataFetcher = () => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the dynamic slug-based proxy route at /api/events
        const response = await axios.get("/api/events/testing");
        console.log("🚀 ~ fetchData ~ response:", response.data);
        setData(response.data);
      } catch (error: any) {
        setError(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>This is a testing page... {data ? data.name : "No data found"}</h1>
    </div>
  );
};

export default DataFetcher;
