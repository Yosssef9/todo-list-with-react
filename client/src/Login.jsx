import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useAuth } from "./context/useAuth";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const { login } = useAuth();

  const handleGoogleResponse = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const googleUser = jwtDecode(token);

      // Send token to backend to login/register
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) throw new Error("Failed to connect to backend");

      const data = await res.json();

      // Backend returns user object (newly registered or existing)
      login(data.user);
    } catch (error) {
      console.error("Google login/register failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <GoogleOAuthProvider clientId="868239980461-n4uv5llmrr87pacb172mjpptu23v32ai.apps.googleusercontent.com">
      <div className="flex flex-col h-screen items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold">Login or Register</h1>
        <GoogleLogin
          onSuccess={handleGoogleResponse}
          onError={() => alert("Login Failed")}
        />
      </div>
    </GoogleOAuthProvider>
  );
}
