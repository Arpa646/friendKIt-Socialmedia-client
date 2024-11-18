"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
import NewsFeed from "./components/page/home/NewsFeed";
import { useUser } from "@/services"; // Adjust the path to your user service

const Welcome = () => {
  const { token } = useUser(); // Assume `token` is retrieved from your user service
  const [loading, setLoading] = useState(true); // Local state to manage the loading phase
  const router = useRouter(); // Initialize the router

  // Effect to handle loading state and redirection
  useEffect(() => {
    const simulateTokenLoad = setTimeout(() => {
      setLoading(false); // Stop loading once the simulation is complete

      // Redirect to login route if token is not available
      if (!token) {
        router.push("/login"); // Redirect to the login page
      }
    }, 1000); // Adjust delay time as needed (1 second is just an example)

    return () => clearTimeout(simulateTokenLoad); // Cleanup timeout if component unmounts
  }, [token, router]);

  // Show spinner while loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
    </div>
    );
  }

  // Render the NewsFeed if token exists
  return (
    <div className="">
      <NewsFeed />
    </div>
  );
};

export default Welcome;
