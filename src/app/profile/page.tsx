"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Camera, ArrowLeft, Upload, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/profile/profileAPI";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/redux/features/auth/userSlice";
import { toast } from "sonner";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
  });

  const { data: profile, refetch } = useGetProfileQuery({});

  const [imageUpload, setImageUpload] = useState({
    file: null as File | null,
    preview: null as string | null,
    isUploading: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updateProfile] = useUpdateProfileMutation();
  const dispatch = useDispatch();

  const handleInputChange = (field: string, value: string) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, WebP)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUpload({
        file,
        preview: e.target?.result as string,
        isUploading: false,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageUpload({
      file: null,
      preview: null,
      isUploading: false,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      // Check if an image is uploaded
      if (editForm?.name) {
        formData.append("full_name", editForm?.name);
      }
      if (imageUpload?.file) {
        formData.append("profile_pic", imageUpload?.file);
      }

      const res = await updateProfile(formData).unwrap();
      console.log(res);

      if (res?.success) {
        refetch();
        toast.success(res.message);
        dispatch(setCurrentUser(profile));
      }

      setImageUpload({
        file: null,
        preview: null,
        isUploading: false,
      });

      setIsLoading(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setIsLoading(false);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    // Reset form to original values
    setEditForm({
      name: profile.name,
    });

    // Reset image upload
    setImageUpload({
      file: null,
      preview: null,
      isUploading: false,
    });

    setIsEditing(false);
  };

  

  return (
    <div className='min-h-[82vh] bg-[#E9E9E9] py-8 px-4'>
      <div className='max-w-xl mx-auto'>
        {/* Back button */}
        <div className='mb-6'>
          <Link
            href='/'
            className='inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors'
          >
            <ArrowLeft className='w-5 h-5 mr-2' />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Profile Card */}
        <div className='bg-white rounded-2xl shadow-lg p-8'>
          {/* Profile Header */}
          <div className='text-center mb-8'>
            <div className='relative inline-block mb-4'>
              <div className='w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-gray-200'>
                <Image
                  src={
                    imageUpload.preview
                      ? imageUpload.preview
                      : `${process.env.NEXT_PUBLIC_IMAGE_URL}${profile?.profile_pic}`
                  }
                  alt='Profile'
                  className='w-full h-full object-cover'
                  width={96}
                  height={96}
                />
                {imageUpload.isUploading && (
                  <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                    <div className='w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  </div>
                )}
              </div>

              {isEditing && (
                <div className='absolute bottom-0 right-0 flex space-x-1'>
                  <button
                    onClick={handleImageClick}
                    className='w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg flex items-center justify-center transition-colors'
                    title='Upload new photo'
                  >
                    <Camera className='w-4 h-4 text-white' />
                  </button>

                  {imageUpload.preview && (
                    <button
                      onClick={handleRemoveImage}
                      className='w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full shadow-lg flex items-center justify-center transition-colors'
                      title='Remove photo'
                    >
                      <X className='w-4 h-4 text-white' />
                    </button>
                  )}
                </div>
              )}

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
                className='hidden'
              />
            </div>

            <h1 className='text-xl font-semibold text-gray-900 capitalize'>
              {profile?.full_name}
            </h1>
            <p className='text-gray-500'>{profile?.email}</p>

            {/* Image upload status */}
            {isEditing && imageUpload.file && (
              <div className='mt-2 text-sm'>
                {imageUpload.isUploading ? (
                  <span className='text-blue-600'>Uploading image...</span>
                ) : (
                  <span className='text-green-600'>New image selected</span>
                )}
              </div>
            )}
          </div>

          {/* Image Upload Area (when no image is selected in edit mode) */}
          {isEditing && !profile.profileImage && !imageUpload.preview && (
            <div className='mb-6'>
              <div
                onClick={handleImageClick}
                className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors'
              >
                <Upload className='w-8 h-8 text-gray-400 mx-auto mb-2' />
                <p className='text-sm text-gray-600'>
                  Click to upload profile picture
                </p>
                <p className='text-xs text-gray-500 mt-1'>
                  JPEG, PNG, WebP up to 5MB
                </p>
              </div>
            </div>
          )}

          {/* Profile Form */}
          <div className='space-y-6'>
            {!isEditing ? (
              // View Mode
              <>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Enter Your Name
                  </label>
                  <input
                    type='text'
                    value={profile?.full_name}
                    readOnly
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    value={profile?.email}
                    readOnly
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed'
                  />
                </div>

                <button
                  onClick={handleEditProfile}
                  className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200'
                >
                  Edit Profile
                </button>
              </>
            ) : (
              // Edit Mode
              <>
                <div>
                  <div className='relative'>
                    <input
                      type='text'
                      value={editForm.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className='w-full px-4 py-3 border-2 border-blue-500 rounded-lg focus:outline-none focus:border-blue-600'
                      placeholder={profile?.full_name}
                    />
                    {/* Blue frame indicator */}
                    <div className='absolute -top-2 left-3 bg-blue-500 text-white text-xs px-2 py-0.5 rounded'>
                      Name
                    </div>
                  </div>
                </div>

                <div className='flex space-x-4'>
                  <button
                    onClick={handleCancel}
                    disabled={isLoading || imageUpload.isUploading}
                    className='flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    disabled={isLoading || imageUpload.isUploading}
                    className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                  >
                    {isLoading ? (
                      <>
                        <div className='w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                        Saving...
                      </>
                    ) : (
                      "Save Change"
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
