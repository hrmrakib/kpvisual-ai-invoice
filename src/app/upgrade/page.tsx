"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { useUpgradePlanMutation } from "@/redux/features/upgradePlan/upgradePlan";
import { toast } from "sonner";

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  uploads: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true);
  const [upgradePlan] = useUpgradePlanMutation();

  const plans: PricingPlan[] = [
    {
      name: "Basic Plan",
      monthlyPrice: 2.0,
      yearlyPrice: 1.4,
      uploads: "100",
      description:
        "Let top creative talent come to you by posting your job listing on #1 Design Jobs Board.",
      features: [
        "Basic AI error detection",
        "Priority processing queue",
        "Bulk upload (up to 100 files at once)",
      ],
    },
    {
      name: "Pro Plan",
      monthlyPrice: 8.99,
      yearlyPrice: 6.29,
      uploads: "500",
      description:
        "Easily search and recruit available designers for hire based on your ideal qualifications.",
      features: [
        "Full AI-powered invoice validation",
        "Bulk upload (up to 500 files at once)",
        "PDF report download",
        "+100 extra invoices",
      ],
      isPopular: true,
    },
    {
      name: "Enterprise Plan",
      monthlyPrice: 13.99,
      yearlyPrice: 9.79,
      uploads: "Unlimited",
      description:
        "Easily search and recruit available designers for hire based on your ideal qualifications.",
      features: [
        "All Pro features",
        "Fraud risk score & vendor validation",
        "Unlimited invoice",
        "Dedicated account manager",
      ],
    },
  ];

  const handlePayment = async () => {
    const res = await upgradePlan({
      plan_id: 2,
      is_yearly: true,
    }).unwrap();

    console.log(res);

    // if not login redirect to login
    if(!res?.success) {
      window.location.href = "/login";
    }

    if (res?.success) {
      window.location.href = res?.checkout_url;
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <div className='min-h-screen bg-[#E9E9E9] py-8 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Back button */}
        <div className='mb-8'>
          <Link
            href='/'
            className='inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors'
          >
            <ArrowLeft className='w-5 h-5 mr-2' />
            <span className='text-sm md:text-base'>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8'>
            Choose Your Plan
          </h1>

          {/* Billing Toggle */}
          <div className='flex items-center justify-center space-x-4 mb-4'>
            <span
              className={`text-lg font-medium ${
                !isYearly ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Monthly
            </span>

            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isYearly ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>

            <span
              className={`text-lg font-medium ${
                isYearly ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Yearly
            </span>
          </div>

          {/* Save Badge */}
          <div className='relative inline-block'>
            <span className='text-blue-600 font-medium'>Save Up To 30%</span>
            <svg
              className='absolute -top-2 -right-8 w-6 h-6 text-blue-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M7 11l5-5m0 0l5 5m-5-5v12'
              />
            </svg>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg p-6 md:p-8 ${
                plan.isPopular ? "ring-2 ring-blue-600 scale-105" : ""
              } transition-transform hover:scale-105`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                  <span className='bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium'>
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className='text-center mb-6'>
                <h3 className='text-xl md:text-2xl font-bold text-gray-900 mb-4'>
                  {plan.name}
                </h3>

                <div className='mb-2'>
                  <span className='text-4xl md:text-5xl font-bold text-gray-900'>
                    $
                    {isYearly
                      ? plan.yearlyPrice.toFixed(2)
                      : plan.monthlyPrice.toFixed(2)}
                  </span>
                </div>

                <p className='text-gray-600 font-medium mb-6'>
                  Monthly Invoice Uploads {plan.uploads}
                </p>

                {/* CTA Button */}
                <button
                  onClick={() => handlePayment()}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 cursor-pointer ${
                    plan.isPopular
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Subscribe Now
                </button>
              </div>

              {/* Description */}
              <p className='text-gray-600 text-sm md:text-base mb-6 leading-relaxed'>
                {plan.description}
              </p>

              {/* Features */}
              <div className='space-y-3'>
                {plan.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className='flex items-start space-x-3'
                  >
                    <div className='flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5'>
                      <Check className='w-3 h-3 text-green-600' />
                    </div>
                    <span className='text-gray-700 text-sm md:text-base'>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
