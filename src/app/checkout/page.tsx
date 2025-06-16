"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";

interface CheckoutForm {
  name: string;
  email: string;
  country: string;
  cardNumber: string;
  expiryDate: string;
  postalCode: string;
  cvcCode: string;
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState<CheckoutForm>({
    name: "applepeo abrharim",
    email: "adhugahdg@gmail.com",
    country: "Bangladesh",
    cardNumber: "0999 9444 4239 9904",
    expiryDate: "08, 2001",
    postalCode: "0907234",
    cvcCode: "994434",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({});

  const countries = [
    "Bangladesh",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "India",
    "Brazil",
  ];

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    // Add spaces every 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    // Add comma after MM
    if (digits.length >= 2) {
      return digits.slice(0, 2) + ", " + digits.slice(2, 6);
    }
    return digits;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutForm> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    if (!formData.cardNumber.replace(/\s/g, "")) {
      newErrors.cardNumber = "Card number is required";
    } else if (formData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!formData.expiryDate.replace(/\D/g, "")) {
      newErrors.expiryDate = "Expiry date is required";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }

    if (!formData.cvcCode.trim()) {
      newErrors.cvcCode = "CVC code is required";
    } else if (formData.cvcCode.length < 3) {
      newErrors.cvcCode = "CVC must be at least 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmSubscription = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // In a real app, this would process the payment
      alert("Subscription confirmed successfully!");

      // Redirect to success page or dashboard
      // router.push('/dashboard')
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSubscription = () => {
    if (confirm("Are you sure you want to cancel your subscription?")) {
      // Navigate back to pricing or home
      window.history.back();
    }
  };

  return (
    <div className='min-h-screen bg-[#E9E9E9] py-8 px-4'>
      <div className='max-w-3xl mx-auto'>
        {/* Back button */}
        <div className='mb-6'>
          <Link
            href='/pricing'
            className='inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors'
          >
            <ArrowLeft className='w-5 h-5 mr-2' />
            <span className='text-sm md:text-base'>Back to Pricing</span>
          </Link>
        </div>

        {/* Checkout Form */}
        <div className='bg-white rounded-2xl shadow-lg p-6 md:p-8'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>
              Complete Your Purchase
            </h1>
            <h2 className='text-lg md:text-xl font-semibold text-gray-900 mb-2'>
              Please enter your details
            </h2>
            <p className='text-sm text-gray-600'>
              We collect this information to help combat fraud, and to keep your
              payment secure.
            </p>
          </div>

          {/* Form */}
          <form className='space-y-6'>
            {/* Name */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Enter Your Name
              </label>
              <input
                type='text'
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder='Enter your full name'
              />
              {errors.name && (
                <p className='mt-1 text-sm text-red-600'>{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Email Address
              </label>
              <input
                type='email'
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder='Enter your email address'
              />
              {errors.email && (
                <p className='mt-1 text-sm text-red-600'>{errors.email}</p>
              )}
            </div>

            {/* Country */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Country
              </label>
              <select
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                  errors.country ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value=''>Select your country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className='mt-1 text-sm text-red-600'>{errors.country}</p>
              )}
            </div>

            {/* Card Number and Expiry */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Card Number
                </label>
                <div className='relative'>
                  <input
                    type='text'
                    value={formData.cardNumber}
                    onChange={(e) =>
                      handleInputChange(
                        "cardNumber",
                        formatCardNumber(e.target.value)
                      )
                    }
                    maxLength={19}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.cardNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder='1234 5678 9012 3456'
                  />
                  <CreditCard className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                </div>
                {errors.cardNumber && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  MM/YY
                </label>
                <input
                  type='text'
                  value={formData.expiryDate}
                  onChange={(e) =>
                    handleInputChange(
                      "expiryDate",
                      formatExpiryDate(e.target.value)
                    )
                  }
                  maxLength={7}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.expiryDate ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder='MM, YYYY'
                />
                {errors.expiryDate && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.expiryDate}
                  </p>
                )}
              </div>
            </div>

            {/* Postal Code and CVC */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Postal Code
                </label>
                <input
                  type='text'
                  value={formData.postalCode}
                  onChange={(e) =>
                    handleInputChange("postalCode", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.postalCode ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder='12345'
                />
                {errors.postalCode && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.postalCode}
                  </p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  CVC Code
                </label>
                <input
                  type='text'
                  value={formData.cvcCode}
                  onChange={(e) =>
                    handleInputChange(
                      "cvcCode",
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  maxLength={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.cvcCode ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder='123'
                />
                {errors.cvcCode && (
                  <p className='mt-1 text-sm text-red-600'>{errors.cvcCode}</p>
                )}
              </div>
            </div>

            {/* Security Notice */}
            <div className='flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg'>
              <Lock className='w-4 h-4' />
              <span>Your payment information is encrypted and secure</span>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 pt-4'>
              <button
                type='button'
                onClick={handleCancelSubscription}
                className='flex-1 px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200'
              >
                Cancel Subscription
              </button>

              <button
                type='button'
                onClick={handleConfirmSubscription}
                disabled={isLoading}
                className='flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
              >
                {isLoading ? (
                  <>
                    <div className='w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    Processing...
                  </>
                ) : (
                  "Confirm Subscription"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Trust Indicators */}
        <div className='mt-6 text-center text-sm text-gray-500'>
          <p>Secured by 256-bit SSL encryption</p>
        </div>
      </div>
    </div>
  );
}
