"use client";

import type React from "react";
import { useState, type FormEvent } from "react";

export default function CreatePasswordPage() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call to update password
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, redirect to dashboard or login page after success
    } catch (error) {
      console.error("Error updating password:", error);
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className='w-full min-h-screen bg-[#E9E9E9] flex flex-col md:flex-row items-center justify-center p-4 md:p-8'>
      <div className='container mx-auto flex flex-col md:flex-row items-center justify-center'>
        {/* Form Section */}
        <div className='bg-white rounded-lg shadow-lg p-6 w-full md:w-1/2 max-w-xl'>
          <div className='text-center mb-6'>
            <h1 className='text-[32px] font-bold text-primary mb-2'>
              Reset Password
            </h1>
            <p className='text-[#6E6E6E] text-lg'>
              Create your new password for your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label
                htmlFor='newPassword'
                className='block text-[#262626] text-lg mb-1'
              >
                New Password
              </label>
              <input
                type='password'
                id='newPassword'
                name='newPassword'
                placeholder='Enter your password'
                value={formData.newPassword}
                onChange={handleChange}
                className={`w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.newPassword ? "border-red-500" : ""
                }`}
              />
              {errors.newPassword && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.newPassword}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-[#262626] text-lg mb-1'
              >
                Confirm Password
              </label>
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                placeholder='Enter your password'
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
              {errors.confirmPassword && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {errors.submit && (
              <p className='text-red-500 text-sm'>{errors.submit}</p>
            )}

            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-[#0249E1] hover:bg-[#0249E1] text-white font-medium py-3 px-4 rounded-full transition duration-200 ease-in-out'
            >
              {isSubmitting ? "Processing..." : "Reset Password"}
            </button>
          </form>

          {/* <div className='text-center mt-6'>
            <p className='text-gray-600'>
              Back to{" "}
              <Link
                href='/signin'
                className='text-blue-600 font-medium hover:underline'
              >
                Sign In
              </Link>
            </p>
          </div> */}
        </div>
      </div>
    </main>
  );
}
