/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Upload, FileText, Loader2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUploadFileMutation } from "@/redux/features/fileUploadAPI";
import { useDispatch } from "react-redux";
import { setInvoiceResult } from "@/redux/features/invoiceResultSlice";
import { toast } from "sonner";
import { useGetProfileQuery } from "@/redux/features/profile/profileAPI";
import { setCurrentUser } from "@/redux/features/auth/userSlice";

export default function HomePage() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [uploadFile] = useUploadFileMutation();
  const dispatch = useDispatch();

  const { data: userProfile, refetch } = useGetProfileQuery({});

  useEffect(() => {
    if (userProfile) {
      dispatch(setCurrentUser(userProfile));
    }
  }, [userProfile]);

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

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFile(e.target.files);
    }
  };

  const handleFile = (selectedFiles: FileList) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    const maxFileSize = 10 * 1024 * 1024;

    const validFiles: File[] = [];

    Array.from(selectedFiles).forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        toast.error(`${file.name} is not a valid file type`);
        return;
      }
      if (file.size > maxFileSize) {
        toast.error(`${file.name} exceeds the 10MB limit`);
        return;
      }
      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      setFiles(validFiles);
      verifyInvoice(validFiles); // not inside forEach
    }
  };

  const verifyInvoice = async (filesToUpload: File[]) => {
    setIsUploading(true);

    try {
      const formData = new FormData();

      filesToUpload.forEach((file) => {
        formData.append("invoices", file);
      });

      const res = await uploadFile(formData).unwrap();

      console.log(res);

      if (res.success) {
        dispatch(setInvoiceResult(res));
        sessionStorage.setItem("invoiceAnalysisResult", JSON.stringify(res));
        router.push(`/results`);
      }

      setIsUploading(false);
    } catch (error) {
      console.error("Verification failed:", error);
      toast.error("Something went wrong. Please try again later.");
      setIsUploading(false);
      setFiles([]);
    }
  };

  const resetUpload = () => {
    setFiles([]);
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className='min-h-[81.5vh] bg-[#E9E9E9]'>
      <main className='container mx-auto px-4 py-8 md:py-16'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 md:mb-12 leading-tight font-nunito'>
            Upload an invoice to verify whether it is correct or not.
          </h1>

          <div className='max-w-2xl mx-auto'>
            {files.length === 0 ? (
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
                  multiple
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
                    {/* <div className='text-left'>
                      <p className='font-semibold text-gray-900 truncate max-w-48 md:max-w-none'>
                        {files.name}
                      </p>
                      <p className='text-sm text-gray-500'>
                        {(files.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div> */}

                    <div>Processing ...</div>
                  </div>
                  {!isUploading && (
                    <button
                      onClick={resetUpload}
                      className='text-gray-400 hover:text-gray-600 transition-colors'
                    >
                      <XCircle className='w-6 h-6' />
                    </button>
                  )}
                </div>

                {isUploading && (
                  <div className='text-center py-8'>
                    <Loader2 className='w-12 h-12 text-blue-600 animate-spin mx-auto mb-4' />
                    <p className='text-lg font-semibold text-gray-900 mb-2'>
                      Verifying Invoice...
                    </p>
                    <p className='text-gray-600'>
                      Please wait while we analyze your document
                    </p>

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
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
