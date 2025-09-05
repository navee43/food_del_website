"use client";
import { useEffect, useState } from "react";
import axios from "axios";

type UserInfo = {
  _id: string;
  name: string;
  phoneNo: string;
  street: string;
  country: string;
  city: string;
  postal: string;
  image?: string;
};

type ProfileResponse = {
  data: {
    userInfo: UserInfo;
  };
};

export function useProfile() {
  const [data, setData] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProfile() {
      try {
        setLoading(true);
        const res = await axios.get<ProfileResponse>("/api/profile");
        if (isMounted) {
          setData(res.data);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Failed to load profile");
          }
        }
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
