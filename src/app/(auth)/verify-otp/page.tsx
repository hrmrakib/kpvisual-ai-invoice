"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useVerifyOtpMutation } from "@/redux/feature/authAPI";
import { useRouter } from "next/navigation";

export default function VerifyOTP() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const [verifyOtp] = useVerifyOtpMutation();

  // Handle input change and auto-focus to next input
  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // If pasting multiple digits, distribute them
      const digits = value.split("").slice(0, otp.length);
      const newOtp = [...otp];

      digits.forEach((digit, i) => {
        if (index + i < otp.length) {
          newOtp[index + i] = digit;
        }
      });

      setOtp(newOtp);

      // Focus on the appropriate input after pasting
      const nextIndex = Math.min(index + digits.length, otp.length - 1);
      inputRefs.current[nextIndex]?.focus();
    } else {
      // Normal single digit input
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus to next input if current input is filled
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace key
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus on previous input when backspace is pressed on an empty input
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const otpValue = otp.join("");

    // Validate OTP
    if (otpValue.length !== 6 || !/^\d+$/.test(otpValue)) {
      toast.error("Please enter a valid OTP");

      setIsSubmitting(false);
      return;
    }

    try {
      const res = await verifyOtp({
        email,
        otp: otpValue,
      }).unwrap();

      if (res.status === "success") {
        localStorage.setItem("access_token", res.access_token);
        toast.success(res.message);
        router.push("/");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.warning("The OTP you entered is incorrect or has expired");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    setResendDisabled(true);
    setCountdown(30); // 30 seconds cooldown

    try {
      // Simulate API call to resend OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("OTP Resent");

      // Clear current OTP fields
      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      toast.error("Please try again later");
    }
  };

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);

  useEffect(() => {
    // Focus on the first input when the component mounts
    inputRefs.current[0]?.focus();

    // Get email from local storage
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <div className='w-full min-h-screen bg-[url(/auth-bg.png)] flex flex-col items-center justify-center p-4 md:p-8'>
      <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>
      <div className='container mx-auto space-y-8 flex flex-col md:flex-row items-center z-50'>
        <div className='w-full md:w-1/2 max-w-lg mx-auto bg-background px-6 py-16 rounded-xl'>
          <div className='text-center flex items-center justify-center space-x-2.5'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10 19L3 12M3 12L10 5M3 12L21 12'
                stroke='#4F3E19'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>

            <h1 className='text-[32px] font-semibold text-primary'>
              Verify with OTP
            </h1>
          </div>
          <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
            <div className='flex justify-center gap-2 md:gap-4'>
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type='text'
                  inputMode='numeric'
                  pattern='[0-9]*'
                  maxLength={6}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className='h-14 w-14 md:h-16 md:w-16 text-center text-xl font-semibold'
                  autoFocus={index === 0}
                  disabled={isSubmitting}
                />
              ))}
            </div>

            <button
              type='submit'
              className='w-full !bg-button text-secondary text-lg font-medium py-2 rounded-full transition-colors cursor-pointer'
              disabled={isSubmitting || otp.some((digit) => !digit)}
            >
              {isSubmitting ? "Verifying..." : "Submit"}
            </button>

            {/* <div className='flex justify-end'>
              <p className='text-lg text-primary'>
                Didn&apos;t receive the OTP?{" "}
                <button
                  type='button'
                  onClick={handleResend}
                  disabled={resendDisabled}
                  className='text-[#F99F04] hover:text-[#ffaf25] font-medium disabled:text-gray-400 disabled:cursor-not-allowed'
                >
                  {resendDisabled ? `Resend (${countdown}s)` : "Resend"}
                </button>
              </p>
            </div> */}

            <p className="text-lg text-center text-primary">Please enter the OTP we have sent you in your email.</p>

            <div className='text-center'>
              <Link
                href='/signin'
                className='text-primary hover:text-primary text-base font-medium'
              >
                Back to Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
