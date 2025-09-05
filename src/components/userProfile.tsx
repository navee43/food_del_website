'use client'
import { useEffect, useState } from "react";
import axios from "axios";

type UserProfile = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export function useProfile() {
  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProfile() {
      try {
        setLoading(true);
        const res = await axios.get<UserProfile>("/api/profile");
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
