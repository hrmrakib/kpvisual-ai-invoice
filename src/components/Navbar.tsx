/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, ArrowUpRight, FileText, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "@/redux/features/auth/userSlice";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const currentUser = useSelector((state: any) => state?.currentUser?.user);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(setCurrentUser(null));
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push("/login");
  };

  return (
    <header className='bg-[#E9E9E9]'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16 md:h-20'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-2'>
            <div className='w-[160] h-[100] rounded-lg flex items-center justify-center'>
              <Image src='/logo.png' alt='Logo' width={160} height={150} />
            </div>
          </Link>

          <div>
            <Link
              href='/upgrade'
              className='bg-[#FFFFFF] text-gray-700 font-semibold border-gray-300 hover:bg-gray-50 flex items-center rounded-4xl px-5 py-2.5'
            >
              Upgrade Your Plan
              <ArrowUpRight className='w-4 h-4 ml-2' />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-4'>
            {currentUser ? (
              <div className='relative' ref={dropdownRef}>
                <div
                  onClick={handleProfileClick}
                  className='w-10 h-10 rounded-full cursor-pointer'
                >
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_API_URL + currentUser?.profile_pic
                    }
                    className='w-10 h-10 rounded-full object-cover border-2 border-blue-500 shadow'
                    alt='Profile'
                    width={50}
                    height={50}
                  />
                </div>

                {isDropdownOpen && (
                  <div className='absolute right-0 mt-2 w-64 lg:w-72 bg-white rounded-xl shadow-lg border border-gray-200 py-5 z-50'>
                    {/* User Info */}
                    <div className='px-4 py-3 border-b border-gray-100'>
                      <Link
                        href='/profile'
                        className='flex items-center space-x-3'
                      >
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_API_URL +
                            currentUser?.profile_pic
                          }
                          alt='Profile'
                          className='w-10 h-10 rounded-full object-cover'
                          width={50}
                          height={50}
                        />
                        <div>
                          <p className='font-semibold text-gray-900'>
                            {currentUser?.full_name}
                          </p>
                          <p className='text-sm text-gray-500'>
                            {currentUser?.email}
                          </p>
                        </div>
                      </Link>
                    </div>

                    {/* Menu Items */}
                    <div className='py-2 space-y-1.5'>
                      <Link
                        href='/invoice-details'
                        // onClick={() => handleMenuItemClick("Invoice Details")}
                        className='w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors'
                      >
                        <FileText className='w-4 h-4' />
                        <span>Invoice Details</span>
                      </Link>

                      {/* Log Out */}
                      <button
                        onClick={() => handleLogout()}
                        className='w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer'
                      >
                        <LogOut className='w-4 h-4' />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href={"/login"}
                  className='text-medium text-base text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-50 px-2.5 py-1 rounded-lg'
                >
                  Log In
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className='md:hidden'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Menu className='h-6 w-6' />
                  <span className='sr-only'>Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
                <div className='flex flex-col space-y-4 mt-8'>
                  <Button
                    variant='outline'
                    className='w-full justify-between text-gray-700 border-gray-300 hover:bg-gray-50'
                    onClick={() => setIsOpen(false)}
                  >
                    Upgrade Your Plan
                    <ArrowUpRight className='w-4 h-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    className='w-full text-gray-700 hover:bg-gray-100'
                    onClick={() => setIsOpen(false)}
                  >
                    Log In
                  </Button>
                  <Button
                    className='w-full bg-blue-600 hover:bg-blue-700 text-white'
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
