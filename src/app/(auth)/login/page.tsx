"use client";

import Loading from "@/app/_components/loading";
import { useToastNotification } from "@/contexts/toastNotification";
import { useUser } from "@/contexts/user";
import { loginUser } from "@/services/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { addNotification } = useToastNotification();
  const { getUser } = useUser();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!email.trim() || !password) {
        addNotification({
          message: "Please fill in all fields",
          error: true,
        });
        return;
      }
      setLoading(true);

      await loginUser({
        email: email.trim(),
        password,
      });
      await getUser();
      router.push("/dashboard");
    } catch (error: any) {
      addNotification({ message: error || "An error occurred", error: true });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex relative flex-col lg:flex-row bg-white-color dark:bg-black-color h-screen">
      <div className="flex-1 overflow-x-hidden">
        <img
          src="/images/login.png"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="flex-[3] lg:flex-1 p-4 lg:p-8">
        <div className="flex h-full w-full justify-center items-center flex-col">
          <div className="w-full max-w-lg flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Sign In</h2>
            <form className="flex flex-col gap-4" onSubmit={submitHandler}>
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
              <div className="self-end text-sm hover:underline active:underline -mt-2 mb-2">
                Forget password
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-black font-medium hover:bg-gray-800 border rounded-lg px-4 py-2 text-white transition duration-200 ease-in-out cursor-pointer"
              >
                {loading && <Loading color="white" size={20} />}
                Login
              </button>
            </form>

            <div className="flex items-center justify-center gap-4">
              <p className="text-center text-sm space-x-0.5">
                <span>New Fan? </span>
                <Link
                  className="active:underline hover:underline"
                  href="/register"
                >
                  Create an account
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
