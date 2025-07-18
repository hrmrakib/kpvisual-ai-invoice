"use client";

import type React from "react";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Camera, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useSignupMutation } from "@/redux/features/auth/authAPI";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [signup] = useSignupMutation();
  const router = useRouter();
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file); // <-- actual file
      setProfilePreview(URL.createObjectURL(file)); // <-- preview
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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

  const handleImageClick = () => {
    // Trigger file input click when avatar is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const inFormData = new FormData();
      inFormData.append("full_name", formData.name);
      inFormData.append("email", formData.email);
      inFormData.append("password", formData.password);

      if (profileImage) {
        inFormData.append("profileImage", profileImage);
      }

      const response = await signup(inFormData).unwrap();

      if (response?.success) {
        toast.success(response?.message);

        router.push("/verify-otp");
      }

      console.log(response);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "Invalid credentials. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <main className='w-full min-h-screen bg-[#E9E9E9] flex flex-col md:flex-row items-center justify-center p-4 md:p-8'>
      {/* <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div> */}
      {/* Overlay for better text visibility */}

      <div className='container mx-auto flex flex-col md:flex-row items-center z-50'>
        {/* Logo Section */}

        {/* Form Section */}
        <div className='w-full md:w-1/2 max-w-xl mx-auto bg-background px-6 py-16 rounded-xl'>
          <div className='text-center mb-6'>
            <h1 className='text-[32px] font-bold text-primary mb-2'>Sign Up</h1>
          </div>

          {submitSuccess ? (
            <div className='bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6'>
              Sign in successful! Redirecting to your dashboard...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='relative mb-6 flex flex-col items-center'>
                <input
                  type='file'
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept='image/*'
                  className='hidden'
                  aria-label='Upload profile picture'
                />

                <div
                  onClick={handleImageClick}
                  className='w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center relative cursor-pointer overflow-hidden group'
                >
                  {profileImage ? (
                    <Image
                      src={profilePreview || "/placeholder.svg"}
                      alt='Profile Preview'
                      fill
                      className='object-cover'
                    />
                  ) : (
                    <svg
                      className='w-12 h-12 text-gray-500 group-hover:opacity-80 transition-opacity'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
                    </svg>
                  )}

                  {/* Camera icon overlay on hover */}
                  <div className='absolute inset-0 bg-gray-500 bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                    <Camera className='w-8 h-8 text-white' />
                  </div>
                </div>
              </div>

              <div className='mb-4'>
                <label htmlFor='name' className='text-[#262626] text-lg'>
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  placeholder='Enter your name'
                  value={formData.name}
                  onChange={handleChange}
                  className={`bg-transparent text-primary w-full p-3 border placeholder:text-[##9B9B9B] mt-1.5 ${
                    errors.name ? "border-red-500" : "border-slate-300"
                  } rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
              </div>

              <div className='mb-4'>
                <label htmlFor='email' className='text-[#262626] text-lg'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Enter your email...'
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-transparent text-primary w-full p-3 border placeholder:text-[##9B9B9B] mt-1.5 ${
                    errors.email ? "border-red-500" : "border-slate-300"
                  } rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
              </div>

              <div className='relative mb-4'>
                <label htmlFor='password' className='text-[#262626] text-lg'>
                  Password
                </label>

                <div className='relative'>
                  <input
                    type={showPassword ? "text" : "password"}
                    id='password'
                    name='password'
                    placeholder='Enter your password...'
                    value={formData.password}
                    onChange={handleChange}
                    className={`bg-transparent text-primary w-full p-3 border placeholder:text-[##9B9B9B] mt-1.5 ${
                      errors.password ? "border-red-500" : "border-slate-300"
                    } rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                  <button
                    type='button'
                    onClick={togglePasswordVisibility}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500'
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    id='remember'
                    name='remember'
                    checked={formData.remember}
                    onChange={handleChange}
                    className='w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500'
                  />
                  <label
                    htmlFor='remember'
                    className='ml-2 text-lg text-primary'
                  >
                    Remember
                  </label>
                </div>
                <Link
                  href='/forget-password'
                  className='text-lg text-primary hover:underline'
                >
                  Forget Password?
                </Link>
              </div>

              {errors.submit && (
                <p className='text-red-500 text-sm'>{errors.submit}</p>
              )}

              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-[#0249E1] text-secondary text-lg font-medium py-3 px-4 rounded-full transition duration-200 ease-in-out'
              >
                {isSubmitting ? "Signing Up..." : "Sign Up Now"}
              </button>
            </form>
          )}

          <div className='text-center mt-6'>
            <p className='text-[#8A8A8A] text-lg'>
              Already have an account?{"    "}
              <Link
                href='/login'
                className='text-[#0249E1] text-lg font-medium hover:underline'
              >
                Log In
              </Link>
            </p>

            <p className='text-[#8A8A8A] text-lg mt-4'>
              By continuing you agree with our Terms of Service and confirm that
              you have read our Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
