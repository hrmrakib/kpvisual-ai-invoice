"use client";

import { useForgotPasswordMutation } from "@/redux/features/auth/authAPI";
import { useRouter } from "next/navigation";
import type React from "react";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  const router = useRouter();

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
      const response = await forgotPassword({ email }).unwrap();

      if (response.status === "success") {
        localStorage.setItem("email", email);
        toast.success("OTP sent successfully!");
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
    <main className='w-full min-h-screen bg-[#E9E9E9] flex flex-col md:flex-row items-center justify-center p-4 md:p-8'>
      {/* <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div> */}

      <div className='container mx-auto flex flex-col md:flex-row items-center z-50'>
        {/* Form Section */}
        <div className='w-full md:w-1/2 max-w-lg mx-auto bg-background px-6 py-16 rounded-xl'>
          <div className='text-center mb-6'>
            <h1 className='text-[32px] font-bold text-primary mb-2'>
              Forget Your Password
            </h1>
            <p className='text-[#635e5e] text-lg'>
              Enter your email and we&apos;ll send a secure one-time passcode
              (OTP) to reset your password.
            </p>
          </div>

          {submitSuccess ? (
            <div className='bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6'>
              Sign in successful! Redirecting to your dashboard...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='relative mb-4'>
                <label htmlFor='password' className='text-[#262626] text-lg'>
                  Password
                </label>

                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Enter your email...'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`bg-transparent text-primary w-full p-3 border placeholder:text-[#B0B0B0] mt-2 ${
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
                className='w-full bg-[#0249E1] text-secondary text-lg font-medium py-3 px-4 rounded-full transition duration-200 ease-in-out'
              >
                {isSubmitting ? "Reset Password ..." : "Send OTP"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
