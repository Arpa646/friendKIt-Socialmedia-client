"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSignUpMutation } from "@/GlobalRedux/api/api";

interface FormFields {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
  image: string; // Field for profile picture
}

interface SignUpError {
  data?: {
    message?: string;
  };
  error?: string;
}

const Reg: React.FC = () => {
  const [formData, setFormData] = useState<FormFields>({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
    address: "",
    image: "", // Initialize image field
  });

  const [formErrors, setFormErrors] = useState<FormFields>({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "",
    image: "", // Include image in form errors
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [signUp] = useSignUpMutation();
  const [uploading, setUploading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const IMG_BB_API_KEY = "9717d5d4436d262250f736d12880032f";
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      setUploading(true);
      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${IMG_BB_API_KEY}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        if (data.success) {
          setFormData((prev) => ({ ...prev, image: data.data.url }));
        } else {
          setErrorMessage("Image upload failed. Please try again.");
        }
      } catch {
        // Remove 'err' as it's not being used
        setErrorMessage("Error uploading image.");
      } finally {
        setUploading(false);
      }
    }
  };

  const validateForm = (): boolean => {
    const errors = {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      role: "",
      image: "",
    };

    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    }
    if (!formData.address.trim()) {
      errors.address = "Address is required";
      isValid = false;
    }
    if (!formData.image.trim()) {
      errors.image = "Profile picture is required"; // Updated field
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setErrorMessage(null);
      await signUp({ user: formData }).unwrap();
      alert("User registered successfully!");
    } catch (err) {
      const error = err as SignUpError;
      setErrorMessage(
        error.data?.message ||
          error.error ||
          "Failed to register user. Please try again."
      );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="border border-[#202227] bg-[#0f0f10e4] pt-6 px-10 pb-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-2xl font-medium text-center text-white mb-3">
          Create an Account to Escrow.com
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {(
            [
              "name",
              "email",
              "password",
              "phone",
              "address",
            ] as (keyof FormFields)[]
          ).map((field) => (
            <div key={field}>
              <input
                name={field}
                value={formData[field]}
                onChange={handleChange}
                type={
                  field === "email"
                    ? "email"
                    : field === "password"
                    ? "password"
                    : "text"
                }
                placeholder={`Your ${field}`}
                className="w-full h-10 px-3 rounded bg-gray-800 text-white border border-[#202227] focus:outline-none"
                required
              />
              {formErrors[field] && (
                <p className="text-red-600 text-sm">{formErrors[field]}</p>
              )}
            </div>
          ))}
          <div>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full text-white"
            />
            {uploading && (
              <p className="text-blue-400 text-sm mt-1">Uploading...</p>
            )}
            {formErrors.image && (
              <p className="text-red-600 text-sm">{formErrors.image}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded font-semibold"
          >
            Sign Up
          </button>
          <div className="text-center mt-4">
            <Link href="/login" className="text-blue-400 hover:underline">
              Already have an account? Sign in here
            </Link>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Reg;
