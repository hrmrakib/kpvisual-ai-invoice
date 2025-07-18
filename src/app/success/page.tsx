import Link from "next/link";
import { CheckCircle, Download, Home, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentSuccess() {
  return (
    <div className='min-h-screen bg-[#E9E9E9]'>
      {/* Main Content */}
      <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center mb-8'>
          <div className='flex justify-center mb-6'>
            <CheckCircle className='w-20 h-20 text-green-500' />
          </div>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Payment Successful!
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Thank you for upgrading your NexVia plan. Your payment has been
            processed successfully and your account has been upgraded.
          </p>
        </div>

        <Card className='max-w-2xl mx-auto mb-8'>
          <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
              <Receipt className='w-5 h-5' />
              <span>Payment Details</span>
            </CardTitle>
            <CardDescription>
              Your transaction has been completed
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <p className='text-sm text-gray-500'>Transaction ID</p>
                <p className='font-mono text-sm'>#TXN-2024-001234</p>
              </div>
              <div>
                <p className='text-sm text-gray-500'>Amount Paid</p>
                <p className='font-semibold'>$29.99</p>
              </div>
              <div>
                <p className='text-sm text-gray-500'>Plan</p>
                <p className='font-semibold'>Professional Plan</p>
              </div>
              <div>
                <p className='text-sm text-gray-500'>Billing Cycle</p>
                <p className='font-semibold'>Monthly</p>
              </div>
            </div>
            <div className='pt-4 border-t'>
              <p className='text-sm text-gray-500'>Next Billing Date</p>
              <p className='font-semibold'>
                {new Date(
                  Date.now() + 30 * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button asChild className='bg-blue-600 hover:bg-blue-700'>
            <Link href='/' className='flex items-center space-x-2'>
              <Home className='w-4 h-4' />
              <span>Go to Home</span>
            </Link>
          </Button>
          <Button
            variant='outline'
            className='flex items-center space-x-2 bg-transparent'
          >
            <Download className='w-4 h-4' />
            <span>Download Receipt</span>
          </Button>
        </div>
      </main>
    </div>
  );
}
