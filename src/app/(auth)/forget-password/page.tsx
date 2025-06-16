"use client";

import type React from "react";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useSendOtpMutation } from "@/redux/feature/authAPI";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const router = useRouter();

  const [sendOtp] = useSendOtpMutation();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await sendOtp({ email }).unwrap();

      if (response.status === "success") {
        localStorage.setItem("email", email);
        toast.success("OTP sent successfully!");
        setSubmitSuccess(true);
        router.push("/verify-otp");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "Invalid credentials. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className='w-full min-h-screen bg-[url(/auth-bg.png)] flex flex-col md:flex-row items-center justify-center p-4 md:p-8'>
      <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>

      <div className='container mx-auto flex flex-col md:flex-row items-center z-50'>
        {/* Form Section */}
        <div className='w-full md:w-1/2 max-w-lg mx-auto bg-background px-6 py-16 rounded-xl'>
          <div className='text-center mb-6'>
            <h1 className='text-[32px] font-bold text-primary mb-2'>
              Forget Your Password
            </h1>
            <p className='text-primary text-lg'>
              Enter your email address to reset your password.
            </p>
          </div>

          {submitSuccess ? (
            <div className='bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6'>
              Sign in successful! Redirecting to your dashboard...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='relative mb-4'>
                <label
                  htmlFor='email'
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B0B0B0] text-lg font-medium'
                >
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z'
                      stroke='#B0B0B0'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Enter your email...'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`bg-input text-primary pl-12 w-full p-3  placeholder:text-[#B0B0B0] ${
                    errors.email ? "border-red-500" : "border-slate-300"
                  } rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
              </div>

              {errors.submit && (
                <p className='text-red-500 text-sm'>{errors.submit}</p>
              )}

              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-button text-secondary text-lg font-medium py-3 px-4 rounded-full transition duration-200 ease-in-out'
              >
                {isSubmitting ? "Reset Password ..." : "Reset Password"}
              </button>
            </form>
          )}

          <div className='text-center mt-6'>
            <p className='text-primary text-lg'>
              Back to{" "}
              <Link
                href='/signin'
                className='text-primary text-lg font-medium hover:underline'
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
