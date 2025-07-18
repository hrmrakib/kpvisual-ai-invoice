import Link from "next/link";
import { XCircle, ArrowLeft, CreditCard, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentCancel() {
  return (
    <div className='min-h-screen bg-[#E9E9E9]'>
      {/* Main Content */}
      <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center mb-8'>
          <div className='flex justify-center mb-6'>
            <XCircle className='w-20 h-20 text-red-500' />
          </div>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Payment Cancelled
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Your payment was cancelled and no charges were made to your account.
            You can try again or contact our support team if you need
            assistance.
          </p>
        </div>

        <Card className='max-w-2xl mx-auto mb-8'>
          <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
              <CreditCard className='w-5 h-5' />
              <span>What happened?</span>
            </CardTitle>
            <CardDescription>
              Your payment process was interrupted
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
              <h3 className='font-semibold text-yellow-800 mb-2'>
                Common reasons for payment cancellation:
              </h3>
              <ul className='text-sm text-yellow-700 space-y-1'>
                <li>• Payment window was closed before completion</li>
                <li>• Browser back button was pressed during payment</li>
                <li>• Payment method was declined</li>
                <li>• Session timeout occurred</li>
              </ul>
            </div>

            <div className='pt-4'>
              <h3 className='font-semibold text-gray-900 mb-2'>Need help?</h3>
              <p className='text-sm text-gray-600'>
                If you&apos;re experiencing issues with payment, our support
                team is here to help. Contact us and we&apos;ll resolve any
                problems quickly.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button asChild className='bg-blue-600 hover:bg-blue-700'>
            <Link href='/upgrade' className='flex items-center space-x-2'>
              <CreditCard className='w-4 h-4' />
              <span>Try Payment Again</span>
            </Link>
          </Button>
          <Button variant='outline' asChild>
            <Link href='/' className='flex items-center space-x-2'>
              <ArrowLeft className='w-4 h-4' />
              <span>Back to Home</span>
            </Link>
          </Button>
          <Button variant='outline' asChild>
            <Link href='/contact' className='flex items-center space-x-2'>
              <HelpCircle className='w-4 h-4' />
              <span>Contact Support</span>
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
