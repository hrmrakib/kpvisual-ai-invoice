"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function HomePage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    status: "authentic" | "fake" | null;
    confidence: number;
  }>({ status: null, confidence: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Please upload a PDF or image file (JPEG, PNG)");
      return;
    }

    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    setFile(selectedFile);
    verifyInvoice(selectedFile);
  };

  const verifyInvoice = async (file: File) => {
    setIsUploading(true);
    setVerificationResult({ status: null, confidence: 0 });

    console.log(file);
    // Simulate API call for invoice verification
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock verification result
      const isAuthentic = Math.random() > 0.3;
      const confidence = Math.floor(Math.random() * 30) + 70;

      setVerificationResult({
        status: isAuthentic ? "authentic" : "fake",
        confidence,
      });
    } catch (error) {
      console.error("Verification failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setVerificationResult({ status: null, confidence: 0 });
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className='min-h-[81.5vh] bg-[#E9E9E9]'>
      <main className='container mx-auto px-4 py-8 md:py-16'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 md:mb-12 leading-tight'>
            Upload an invoice to verify whether it is authentic or fake.
          </h1>

          <div className='max-w-2xl mx-auto'>
            {!file ? (
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 md:p-12 transition-all duration-200 ${
                  dragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='.pdf,.jpg,.jpeg,.png'
                  onChange={handleFileInput}
                  className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                />

                <div className='flex flex-col items-center space-y-4'>
                  <div className='w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-full flex items-center justify-center'>
                    <Upload className='w-8 h-8 md:w-10 md:h-10 text-blue-600' />
                  </div>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 md:px-10 md:py-4 rounded-full text-base md:text-lg transition-colors duration-200'
                  >
                    Upload Invoice
                  </button>

                  <p className='text-gray-600 text-sm md:text-base'>
                    <span className='text-blue-600 hover:text-blue-700 cursor-pointer font-medium'>
                      Upload A File
                    </span>{" "}
                    Or Drag And Drop Optional
                  </p>

                  <p className='text-xs md:text-sm text-gray-500'>
                    Supports PDF, JPEG, PNG files up to 10MB
                  </p>
                </div>
              </div>
            ) : (
              <div className='bg-white rounded-2xl shadow-lg p-6 md:p-8'>
                <div className='flex items-center justify-between mb-6'>
                  <div className='flex items-center space-x-3'>
                    <FileText className='w-8 h-8 text-blue-600' />
                    <div className='text-left'>
                      <p className='font-semibold text-gray-900 truncate max-w-48 md:max-w-none'>
                        {file.name}
                      </p>
                      <p className='text-sm text-gray-500'>
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={resetUpload}
                    className='text-gray-400 hover:text-gray-600 transition-colors'
                  >
                    <XCircle className='w-6 h-6' />
                  </button>
                </div>

                {isUploading ? (
                  <div className='text-center py-8'>
                    <Loader2 className='w-12 h-12 text-blue-600 animate-spin mx-auto mb-4' />
                    <p className='text-lg font-semibold text-gray-900 mb-2'>
                      Verifying Invoice...
                    </p>
                    <p className='text-gray-600'>
                      Please wait while we analyze your document
                    </p>
                  </div>
                ) : verificationResult.status ? (
                  <div className='text-center py-8'>
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                        verificationResult.status === "authentic"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {verificationResult.status === "authentic" ? (
                        <CheckCircle className='w-8 h-8 text-green-600' />
                      ) : (
                        <XCircle className='w-8 h-8 text-red-600' />
                      )}
                    </div>

                    <h3
                      className={`text-2xl font-bold mb-2 ${
                        verificationResult.status === "authentic"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {verificationResult.status === "authentic"
                        ? "Authentic"
                        : "Potentially Fake"}
                    </h3>

                    <p className='text-gray-600 mb-4'>
                      Confidence: {verificationResult.confidence}%
                    </p>

                    <div className={`w-full bg-gray-200 rounded-full h-2 mb-6`}>
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          verificationResult.status === "authentic"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${verificationResult.confidence}%` }}
                      ></div>
                    </div>

                    <button
                      onClick={resetUpload}
                      className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200'
                    >
                      Verify Another Invoice
                    </button>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
