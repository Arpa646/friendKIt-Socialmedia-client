"use client"; // Ensures this is a client component in Next.js

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { setUser } from "@/GlobalRedux/Features/auth/authSlice";
import { toast } from "sonner";
import { verifyToken } from "@/utils/verify";
import { useLogInMutation } from "@/GlobalRedux/api/api";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setCookie } from "nookies";

type ApiError = {
  status?: number;
  message?: string;
};

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [LogIn] = useLogInMutation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await LogIn(formData).unwrap();

      if (response.token) {
        const user = verifyToken(response.token);
        dispatch(setUser({ user, token: response.token }));
        setCookie(null, "token", response.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        setCookie(null, "user", JSON.stringify(user), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });

        toast.success("Login successful!");
        router.push("/");
      } else {
        setErrorMessage("Wrong email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      const apiError = error as ApiError;
      setErrorMessage(
        apiError.status === 500 || apiError.status === 400
          ? "Wrong email or password."
          : "An unexpected error occurred. Please try again."
      );
    }
  };

  const handleLoginAsUser = () => {
    setFormData({ email: "fariha@com.com", password: "123456" });
  };

  // const handleLoginAsAdmin = () => {
  //   setFormData({ email: "adminrubab@gmail.com", password: "arpa" });
  // };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="border border-[#202227] bg-[#0f0f10e4] pt-6 px-10 pb-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-2xl font-medium text-center text-white mb-3">
          Sign In
        </h1>
        <div className="text-center pb-5">
            <Link href="/register" className="text-gray hover:underline">
            Don't have an account? <span className="text-blue-700">Click here to sign up</span>
            </Link>
          </div>
        <form onSubmit={handleSubmit} className="space-y-6 ">
          <div >
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full  h-10 px-3 rounded bg-gray-800 text-white border border-[#202227] focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full h-10 px-3 rounded bg-gray-800 text-white border border-[#202227] focus:outline-none"
              required
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleLoginAsUser}
              className="w-full border border-gray-500 text-white py-2 rounded"
            >
              Login as User
            </button>
            {/* <button
              type="button"
              onClick={handleLoginAsAdmin}
              className="w-full text-white py-2 px-4 rounded"
            >
              Login as Admin
            </button> */}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded font-semibold"
          >
            Log In
          </button>
          <div className="text-center mt-4">
            <Link href="/forgetpass" className="text-blue-400 hover:underline">
              Recover your password
            </Link>
          </div>
        
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
