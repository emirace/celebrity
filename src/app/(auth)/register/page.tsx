"use client";

import { useToastNotification } from "@/contexts/toastNotification";
import { registerUser } from "@/services/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { addNotification } = useToastNotification();
  const router = useRouter();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({
        username,
        email: email.trim(),
        password,
      });
      router.push("/login");
    } catch (error) {
      addNotification({
        message: (error as string) || "An error occurred",
        error: true,
      });
    }
  };
  return (
    <div className="flex relative flex-col lg:flex-row bg-white-color dark:bg-black-color h-screen">
      <div className="relative flex-1 overflow-x-hidden">
        <Image
          src="/images/signup.png"
          className="h-full w-full object-cover"
          alt="Login illustration"
          fill
          sizes="100vw"
        />
      </div>
      <div className="flex-[3] lg:flex-1 p-4 lg:p-8">
        <div className="flex h-full w-full justify-center items-center flex-col">
          <div className="w-full max-w-lg flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Sign Up</h2>
            <form className="flex flex-col gap-4" onSubmit={submitHandler}>
              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="text-base">
                  Username
                </label>
                <div className="w-full relative">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={`w-full px-4 h-12 py-2 border-black  bg-white-color text-black-color
                   bg-opacity-20 rounded-lg focus:outline-none border`}
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-base">
                  Email
                </label>
                <div className="w-full relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`w-full px-4 h-12 py-2 border-black  bg-white-color text-black-color
                   bg-opacity-20 rounded-lg focus:outline-none border`}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-base">
                  Password
                </label>
                <div className="w-full relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    className={`w-full px-4 h-12 py-2 border-black bg-white-color text-black-color
                    bg-opacity-20 rounded-lg focus:outline-none border`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordVisible ? (
                    <FaEyeSlash
                      className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-lg"
                      onClick={() => setPasswordVisible(false)}
                    />
                  ) : (
                    <FaEye
                      className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-lg"
                      onClick={() => setPasswordVisible(true)}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="confirmPassword" className="text-base">
                  Comfirm Password
                </label>
                <div className="w-full relative">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`w-full px-4 h-12 py-2 border-black bg-white-color text-black-color
                    bg-opacity-20 rounded-lg focus:outline-none border`}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {confirmPasswordVisible ? (
                    <FaEyeSlash
                      className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-lg"
                      onClick={() => setConfirmPasswordVisible(false)}
                    />
                  ) : (
                    <FaEye
                      className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-lg"
                      onClick={() => setConfirmPasswordVisible(true)}
                    />
                  )}
                </div>
              </div>
              <div className="text-sm  flex items-center gap-2 -mt-2 mb-2">
                By registering, you agree to the{" "}
                <Link
                  href="/auth/terms-and-conditions"
                  className="hover:underline active:underline"
                >
                  terms and conditions
                </Link>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-black font-medium hover:bg-gray-800 border rounded-lg px-4 py-2 text-white transition duration-200 ease-in-out cursor-pointer"
              >
                Sign Up
              </button>
            </form>

            <div className="flex items-center justify-center gap-4">
              <p className="text-center text-sm space-x-0.5">
                <span>Already a Fan? </span>
                <Link
                  className="active:underline hover:underline"
                  href="/login"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
