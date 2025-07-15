"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { FileText, Loader2 } from "lucide-react";

interface InvoiceAnalysisResult {
  status: "verified" | "fake" | "suspicious";
  confidence: number;
  invoiceNumber: string;
  date: string;
  amount: string;
  vendor: string;
  fileName: string;
  fileSize: number;
}

export default function ResultsPage() {
  const [analysisResult, setAnalysisResult] =
    useState<InvoiceAnalysisResult | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Get analysis result from sessionStorage
    const storedResult = sessionStorage.getItem("invoiceAnalysisResult");
    if (storedResult) {
      setAnalysisResult(JSON.parse(storedResult));
    } else {
      // If no result found, redirect back to home
      window.location.href = "/";
    }
  }, []);

  const generateMockAnalysisResult = (file: File): InvoiceAnalysisResult => {
    // Generate random but realistic analysis results
    const statuses: ("verified" | "fake" | "suspicious")[] = [
      "verified",
      "fake",
      "suspicious",
    ];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    // Adjust confidence based on status
    let confidence: number;
    switch (randomStatus) {
      case "verified":
        confidence = Math.floor(Math.random() * 15) + 85; // 85-100%
        break;
      case "fake":
        confidence = Math.floor(Math.random() * 20) + 15; // 15-35%
        break;
      case "suspicious":
        confidence = Math.floor(Math.random() * 30) + 40; // 40-70%
        break;
    }

    const mockInvoiceNumbers = [
      "INV-94218",
      "INV-00123",
      "INV-45789",
      "INV-12345",
      "INV-67890",
    ];

    const mockVendors = [
      "ABC Supplies",
      "Tech Solutions Inc",
      "Global Services Ltd",
      "Premium Products Co",
      "Digital Systems",
    ];

    const mockAmounts = [
      "$1,240.00",
      "$850.50",
      "$2,150.75",
      "$495.25",
      "$3,200.00",
    ];

    // Generate date within last 6 months
    const today = new Date();

    const sixMonthsAgo = new Date(
      today.getFullYear(),
      today.getMonth() - 6,
      today.getDate()
    );

    const randomDate = new Date(
      sixMonthsAgo.getTime() +
        Math.random() * (today.getTime() - sixMonthsAgo.getTime())
    );

    return {
      status: randomStatus,
      confidence,
      invoiceNumber:
        mockInvoiceNumbers[
          Math.floor(Math.random() * mockInvoiceNumbers.length)
        ],
      date: randomDate.toISOString().split("T")[0],
      amount: mockAmounts[Math.floor(Math.random() * mockAmounts.length)],
      vendor: mockVendors[Math.floor(Math.random() * mockVendors.length)],
      fileName: file.name,
      fileSize: file.size,
    };
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

    setUploadingFile(selectedFile);
    verifyInvoice(selectedFile);
  };

  const verifyInvoice = async (file: File) => {
    setIsUploading(true);

    try {
      // Simulate API call for invoice verification
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Generate mock analysis result
      const newAnalysisResult = generateMockAnalysisResult(file);

      // Update current analysis result
      setAnalysisResult(newAnalysisResult);

      // Store result in sessionStorage
      sessionStorage.setItem(
        "invoiceAnalysisResult",
        JSON.stringify(newAnalysisResult)
      );

      // Reset upload states
      setIsUploading(false);
      setUploadingFile(null);

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Scroll to top to show new results
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Verification failed:", error);
      alert("Verification failed. Please try again.");
      setIsUploading(false);
      setUploadingFile(null);
    }
  };

  // const handleUploadAnotherClick = () => {
  //   fileInputRef.current?.click();
  // };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800 border-green-200";
      case "fake":
        return "bg-red-100 text-red-800 border-red-200";
      case "suspicious":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!analysisResult) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading analysis results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-[84vh] bg-[#E9E9E9] flex flex-col justify-center items-center'>
      <main className='container mx-auto px-4 py-8 md:py-12'>
        {/* Upload Another Invoice Section */}
        {isUploading && (
          <div className='mb-8'>
            <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8'>
              <div className='text-center'>
                <Loader2 className='w-12 h-12 text-blue-600 animate-spin mx-auto mb-4' />
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  Analyzing New Invoice...
                </h3>
                <p className='text-gray-600 mb-4'>
                  Please wait while we analyze your document
                </p>

                {uploadingFile && (
                  <div className='bg-gray-50 rounded-lg p-4 max-w-md mx-auto'>
                    <div className='flex items-center space-x-3'>
                      <FileText className='w-6 h-6 text-blue-600' />
                      <div className='text-left'>
                        <p className='font-medium text-gray-900 text-sm truncate'>
                          {uploadingFile.name}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {(uploadingFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Progress indicator */}
                <div className='mt-4 max-w-xs mx-auto'>
                  <div className='bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-blue-600 h-2 rounded-full animate-pulse'
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                  <p className='text-xs text-gray-500 mt-2'>
                    Analyzing document structure and content...
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className='flex items-center justify-center gap-8 lg:gap-48'>
          {/* Left column - Analysis results */}
          <div className='lg:col-span-1 space-y-8'>
            <div className='mb-8 md:mb-12'>
              <h1 className='max-w-2xl text-3xl md:text-4xl lg:text-[60px] font-bold text-[#101010] mb-4'>
                Invoice Analysis Result
              </h1>
              <p className='text-[#6E6E6E] text-center text-base md:text-lg'>
                Here are the results of the AI analysis on your uploaded
                invoice.
              </p>
            </div>

            {/* Status section */}
            <div className='bg-[#E9E9E9] rounded-2xl flex flex-col items-center justify-center'>
              <div className='flex items-center space-x-4 mb-6'>
                <div className='flex items-center justify-start space-x-3'>
                  <div className='w-10 h-10 rounded-full flex items-center justify-center'>
                    <svg
                      width='60'
                      height='60'
                      viewBox='0 0 60 60'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M60 31.4062C60 33.5039 59.4961 35.4492 58.4883 37.2305C57.4805 39.0117 56.1328 40.4062 54.4336 41.3789C54.4805 41.6953 54.5039 42.1875 54.5039 42.8555C54.5039 46.0312 53.4375 48.7266 51.3281 50.9531C49.207 53.1914 46.6523 54.3047 43.6641 54.3047C42.3281 54.3047 41.0508 54.0586 39.8438 53.5664C38.9062 55.4883 37.5586 57.0352 35.7891 58.2188C34.0312 59.4141 32.0977 60 30 60C27.8555 60 25.9102 59.4258 24.1758 58.2539C22.4297 57.0938 21.0938 55.5352 20.1562 53.5664C18.9492 54.0586 17.6836 54.3047 16.3359 54.3047C13.3477 54.3047 10.7812 53.1914 8.63672 50.9531C6.49219 48.7266 5.42578 46.0195 5.42578 42.8555C5.42578 42.5039 5.47266 42.0117 5.55469 41.3789C3.85547 40.3945 2.50781 39.0117 1.5 37.2305C0.503906 35.4492 0 33.5039 0 31.4062C0 29.1797 0.5625 27.1289 1.67578 25.2773C2.78906 23.4258 4.28906 22.0547 6.16406 21.1641C5.67188 19.8281 5.42578 18.4805 5.42578 17.1445C5.42578 13.9805 6.49219 11.2734 8.63672 9.04688C10.7812 6.82031 13.3477 5.69531 16.3359 5.69531C17.6719 5.69531 18.9492 5.94141 20.1562 6.43359C21.0938 4.51172 22.4414 2.96484 24.2109 1.78125C25.9688 0.597656 27.9023 0 30 0C32.0977 0 34.0312 0.597656 35.7891 1.76953C37.5469 2.95312 38.9062 4.5 39.8438 6.42188C41.0508 5.92969 42.3164 5.68359 43.6641 5.68359C46.6523 5.68359 49.207 6.79688 51.3281 9.03516C53.4492 11.2734 54.5039 13.9688 54.5039 17.1328C54.5039 18.6094 54.2812 19.9453 53.8359 21.1523C55.7109 22.043 57.2109 23.4141 58.3242 25.2656C59.4375 27.1289 60 29.1797 60 31.4062ZM28.7227 40.4414L41.1094 21.8906C41.4258 21.3984 41.5195 20.8594 41.4141 20.2852C41.2969 19.7109 41.0039 19.2539 40.5117 18.9492C40.0195 18.6328 39.4805 18.5273 38.9062 18.6094C38.3203 18.7031 37.8516 18.9844 37.5 19.4766L26.5898 35.8828L21.5625 30.8672C21.1172 30.4219 20.6016 30.2109 20.0273 30.2344C19.4414 30.2578 18.9375 30.4688 18.4922 30.8672C18.0938 31.2656 17.8945 31.7695 17.8945 32.3789C17.8945 32.9766 18.0938 33.4805 18.4922 33.8906L25.3945 40.793L25.7344 41.0625C26.1328 41.332 26.543 41.4609 26.9414 41.4609C27.7266 41.4492 28.3242 41.1211 28.7227 40.4414Z'
                        fill='#0249E1'
                      />
                    </svg>
                  </div>
                  <span className='text-xl md:text-5xl font-bold text-[#101010]'>
                    Status:
                  </span>
                  <div>
                    <span
                      className={`px-4 py-3 rounded-full text-sm font-medium border ${getStatusBadgeColor(
                        analysisResult.status
                      )}`}
                    >
                      {analysisResult.status.charAt(0).toUpperCase() +
                        analysisResult.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className='flex flex-col sm:flex-row gap-4 mt-10'>
                <button
                  // onClick={handleUploadAnotherClick}
                  // disabled={isUploading}
                  className='relative bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200'
                >
                  <input
                    ref={fileInputRef}
                    type='file'
                    accept='.pdf,.jpg,.jpeg,.png'
                    onChange={handleFileInput}
                    className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                    disabled={isUploading}
                  />
                  Upload Another Invoice
                </button>

                {/* <button
                  onClick={handleDownloadReport}
                  disabled={isDownloading}
                  className='bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-6 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                >
                  {isDownloading ? (
                    <>
                      <div className='w-4 h-4 mr-2 border-2 border-gray-400 border-t-transparent rounded-full animate-spin'></div>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className='w-4 h-4 mr-2' />
                      Download Report
                    </>
                  )}
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
