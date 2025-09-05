'use client'
import { useEffect, useState } from "react";
import axios from "axios";

export function useProfile() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProfile() {
      try {
        setLoading(true);
        const res = await axios.get("/api/profile");
        // console.log(res)
        if (isMounted) {
          setData(res.data);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) setError(err.message || "Failed to load profile");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  return { loading, data, error };
}
