"use client";

import { useState } from "react";
import { Download } from "lucide-react";

export default function InvoiceAnalysisResult() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadReport = async () => {
    setIsDownloading(true);

    // Simulate download
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Create a simple report file
    const reportContent = `Invoice Analysis Report
======================

Invoice Number: #INV-94218
Date: 2025-06-01
Total Amount: $1,240.00
Vendor: ABC Supplies
Status: VERIFIED

Generated on: ${new Date().toLocaleString()}`;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "invoice-analysis-report.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    setIsDownloading(false);
  };

  const handleUploadAnother = () => {
    // In a real app, this would navigate to upload page
    window.location.reload();
  };

  return (
    <div className='min-h-[84vh] bg-[#E9E9E9] flex flex-col justify-center items-center'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-center'>
          {/* Left section - Results */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Main heading */}

            <div className='mb-8'>
              <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
                Invoice Analysis Result
              </h1>
              <p className='text-gray-600 text-lg'>
                Here are the results of the AI analysis on your uploaded
                invoice.
              </p>
            </div>

            {/* Status section */}
            <div className='flex items-center space-x-4'>
              <div className='w-12 h-12 rounded-full flex items-center justify-center'>
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
              <div className='flex items-center space-x-3'>
                <span className='text-2xl font-semibold text-gray-900'>
                  Status:
                </span>
                <span className='bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium'>
                  Verified
                </span>
              </div>
            </div>

            {/* Invoice details */}
            <div className='flex items-center gap-6 md:gap-12 text-gray-900'>
              <div className='space-y-4'>
                <div>
                  <span className='font-medium'>Invoice Number: </span>
                  <span className='text-gray-600'>#INV-94218</span>
                </div>
                <div>
                  <span className='font-medium'>Total Amount: </span>
                  <span className='text-gray-600'>$1,240.00</span>
                </div>
              </div>
              <div className='space-y-4'>
                <div>
                  <span className='font-medium'>Date: </span>
                  <span className='text-gray-600'>2025-06-01</span>
                </div>
                <div>
                  <span className='font-medium'>Vendor: </span>
                  <span className='text-gray-600'>ABC Supplies</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className='flex flex-col sm:flex-row gap-4 pt-4'>
              <button
                onClick={handleUploadAnother}
                className='bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200'
              >
                Upload Another Invoice
              </button>
              <button
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
              </button>
            </div>
          </div>

          {/* Right section - Invoice preview */}
          <div className='lg:col-span-1 bg-[#F3F4F6] py-20 lg:py-44 rounded-2xl'>
            <div className='text-center'>
              {/* Document icon */}
              <div className='w-24 h-24 mx-auto mb-4 flex items-center justify-center'>
                {/* Main heading */}
                <svg
                  width='160'
                  height='160'
                  viewBox='0 0 160 160'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M145.549 0.594816C144.999 0.254738 144.364 0.0744194 143.717 0.0740051H39.2786C30.2999 0.0740051 22.9949 7.30748 22.9949 16.1728L22.3812 106.11H3.50714C1.57015 106.11 0 107.68 0 109.617V125.82C0.012275 137.718 9.65411 147.36 21.5524 147.374C21.7937 147.374 22.0361 147.349 22.2732 147.3H109.411C109.93 147.337 110.453 147.362 110.98 147.362C123.064 147.34 132.848 137.542 132.852 125.459V72.8844H156.493C158.43 72.8844 160 71.3142 160 69.3772V17.3155C159.957 8.94357 153.826 1.84827 145.549 0.594816ZM7.01428 125.822V113.126H89.1087V125.46C89.1043 130.955 91.1722 136.249 94.8997 140.286H21.073C20.9071 140.287 20.743 140.3 20.5799 140.324C12.9505 139.805 7.02375 133.469 7.01428 125.822ZM125.838 17.3155V125.459C125.832 129.378 124.274 133.136 121.505 135.91C118.854 138.63 115.253 140.217 111.457 140.338C111.268 140.305 111.076 140.288 110.883 140.287H109.65C102.012 139.535 96.1739 133.137 96.123 125.461V109.617C96.123 107.682 94.5532 106.11 92.6159 106.11H29.3955L30.0092 16.1977C30.0601 11.1257 34.2055 7.05006 39.2786 7.08829H129.322C127.062 10.0186 125.837 13.6152 125.838 17.3155ZM152.985 65.8697H132.852V17.3155C132.943 11.8205 137.423 7.41585 142.918 7.41585C148.413 7.41585 152.893 11.8205 152.985 17.3155V65.8697Z'
                    fill='#6E6E6E'
                  />
                  <path
                    d='M45.0272 38.069H78.2433C80.1806 38.069 81.7504 36.4992 81.7504 34.5618C81.7504 32.6248 80.1806 31.0547 78.2433 31.0547H45.0272C43.0898 31.0547 41.52 32.6248 41.52 34.5618C41.52 36.4992 43.0898 38.069 45.0272 38.069ZM106.989 56.1307H45.0272C43.0898 56.1307 41.52 57.7009 41.52 59.6379C41.52 61.5738 43.0898 63.145 45.0272 63.145H106.989C108.926 63.145 110.496 61.5738 110.496 59.6379C110.496 57.7009 108.926 56.1307 106.989 56.1307ZM106.989 81.2058H45.0272C43.0898 81.2058 41.52 82.777 41.52 84.7129C41.52 86.6499 43.0898 88.22 45.0272 88.22H106.989C108.926 88.22 110.496 86.6499 110.496 84.7129C110.496 82.777 108.926 81.2058 106.989 81.2058Z'
                    fill='#6E6E6E'
                  />
                </svg>
              </div>

              <p className='text-gray-500'>
                Invoice preview unavailable in this demo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
