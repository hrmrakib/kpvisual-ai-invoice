import Link from "next/link";

const Footer = () => {
  return (
    <footer className='bg-[#E9E9E9] py-8'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8'>
          <Link
            href='/trust-safety'
            className='text-gray-600 hover:text-gray-900 transition-colors text-sm md:text-base'
          >
            Trust & Safety
          </Link>
          <Link
            href='/terms-and-conditions'
            className='text-gray-600 hover:text-gray-900 transition-colors text-sm md:text-base'
          >
            Terms & Condition
          </Link>
          <Link
            href='/privacy-policy'
            className='text-gray-600 hover:text-gray-900 transition-colors text-sm md:text-base'
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
