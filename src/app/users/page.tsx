"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import UserTabs from "@/components/layout/userTabs";
import { useProfile } from "@/components/userProfile";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UsersList() {
    const { data, error } = useProfile();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  // console.log("admin",data?.data.userInfo?.admin)
  const [admin , setIsAdmin] = useState(data?.data.userInfo.admin)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/users"); // replace with your endpoint
        // ✅ data is inside res.data.data
        setUsers(res.data.data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading users...</p>;
  }

  

  return (
    <div className="p-5 bg-gray-100 ">
       <UserTabs admin={admin}/>
     
      <h1 className="text-2xl font-bold mb-6 text-center pt-10">Users</h1>

      {users.length === 0 ? (
        <p className="text-center">No users found.</p>
      ) : (
        <div className="flex items-center justify-center ">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 w-4xl bg-white rounded-2xl shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-gray-600 text-lg">{user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
