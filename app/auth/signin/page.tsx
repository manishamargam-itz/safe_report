"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl border border-sky-100 p-8 sm:p-10">
          <h1 className="text-center text-4xl font-extrabold bg-gradient-to-r from-sky-700 via-sky-400 to-emerald-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">
            Sign In
          </h1>
          <h2 className="text-center text-base text-sky-700/80 mb-6">
            Welcome back! Please sign in to continue
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl p-3 font-medium">
                {error}
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-sky-900 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 border border-sky-200 rounded-xl bg-sky-50 placeholder-sky-400 text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400/30 transition"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-sky-900 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 border border-sky-200 rounded-xl bg-sky-50 placeholder-sky-400 text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400/30 transition"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-lg text-base font-bold text-white bg-gradient-to-r from-sky-700 via-sky-400 to-emerald-400 hover:from-sky-800 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Sign in"
              )}
            </button>
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-sky-700/80">Don't have an account?</span>{" "}
            <Link
              href="/auth/signin/signup"
              className="text-sky-700 hover:text-emerald-600 font-semibold transition"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}