"use client";

import type React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { AppDispatch, RootState } from "@/store/store";
import { login } from "@/store/authSlice";

// Import UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Particles } from "@/components/ui/particles";
import { BorderBeam } from "@/components/ui/border-beam";

export default function LoginPage() {
  // State management for form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Redux dispatch and Next.js router hooks
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Get authentication state from Redux store
  const { error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(login({ username, password }));
  };

  // Redirect to home page if user is authenticated
  if (isAuthenticated) {
    router.push("/");
  }

  return (
    // Main container with background styling
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 overflow-hidden">
      {/* Background effects */}
      <Particles className="absolute inset-0 animate-fade-in" quantity={100} />
      <BorderBeam className="absolute inset-0" />

      {/* Login form card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Login
        </h2>

        {/* Display error message if authentication fails */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          {/* Username input field */}
          <div className="mb-4">
            <Label htmlFor="username" className="text-white">
              Username
            </Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1"
              required
            />
          </div>

          {/* Password input field */}
          <div className="mb-6">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
              required
            />
          </div>

          {/* Submit button */}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
