"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Search, Filter } from "lucide-react";
import { useGetInvoiceQuery } from "@/redux/features/invoice/invoiceAPI";

interface InvoiceAnalysisResult {
  invoice_id: string;
  status: string;
  message: string;
  invoice_image: string;
  ela_image: string;
  checked_at: string;
  created_at: string;
  user: string;
}

export default function InvoiceDetailsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  // const [selectedInvoice, setSelectedInvoice] =
  //   useState<InvoiceAnalysisResult | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState(true);

  const { data: invoices, isLoading } = useGetInvoiceQuery({});

  console.log(invoices?.results);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "authentic":
        return "bg-green-600 text-white";
      case "altered":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  // const handleViewImage = (invoice: InvoiceAnalysisResult) => {
  //   setSelectedInvoice(invoice);
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedInvoice(null);
  // };

  const filteredInvoices = invoices?.results?.filter(
    (invoice: InvoiceAnalysisResult) => {
      const matchesSearch =
        invoice.invoice_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.user.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || invoice.status === statusFilter;

      return matchesSearch && matchesStatus;
    }
  );

  if (isLoading) {
    <div>loading.......</div>;
  }

  return (
    <div className='min-h-screen bg-[#E9E9E9] py-4 md:py-8 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Image preview */}
        {/* {isModalOpen && selectedInvoice && (
          <div className='fixed inset-0 z-50 bg-[#0000003d] bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white rounded-xl shadow-lg p-6 relative w-[90%] max-w-2xl'>
              <button
                onClick={closeModal}
                className='absolute top-3 right-3 text-gray-500 hover:text-gray-800'
              >
                ✕
              </button>
              <h2 className='text-lg font-semibold mb-4 text-gray-800'>
                Invoice Image Preview
              </h2>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${selectedInvoice.invoice_image}`}
                alt='Invoice Preview'
                width={1200}
                height={1200}
                className='rounded-lg  max-h-[700px] w-full object-contain'
              />
            </div>
          </div>
        )} */}

        {/* Back button */}
        <div className='mb-6'>
          <Link
            href='/'
            className='inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors'
          >
            <ArrowLeft className='w-5 h-5 mr-2' />
            <span className='text-sm md:text-base'>Back to Home</span>
          </Link>
        </div>

        {/* Main Card */}
        <div className='bg-white rounded-2xl shadow-lg p-4 md:p-8'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6'>
              Invoice Details
            </h1>

            {/* Section Header */}
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>
              <div className='flex items-center space-x-3'>
                <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                  <FileText className='w-6 h-6 text-blue-600' />
                </div>
                <div>
                  <h2 className='text-lg md:text-xl font-semibold text-gray-900'>
                    Upload Invoices
                  </h2>
                  <p className='text-sm text-gray-500'>
                    Review status and amounts
                  </p>
                </div>
              </div>
            </div>

            {/* Search and Filter - Mobile Responsive */}
            {/*<div className='flex flex-col sm:flex-row gap-4 mb-6'>
              <div className='relative flex-1'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                <input
                  type='text'
                  placeholder='Search invoices...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                />
              </div>

              <div className='relative'>
                <Filter className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className='pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white min-w-[140px]'
                >
                  <option value='all'>All Status</option>
                  <option value='authentic'>Verified</option>
                  <option value='altered'>Altered</option>
                </select>
              </div>
             </div>  */}
          </div>

          {/* Desktop Table */}
          <div className='hidden md:block overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-gray-200'>
                  <th className='text-left py-4 px-2 font-medium text-gray-700'>
                    Invoice ID
                  </th>
                  {/* <th className='text-left py-4 px-2 font-medium text-gray-700'>
                    Customer
                  </th> */}
                  <th className='text-left py-4 px-2 font-medium text-gray-700'>
                    Date
                  </th>
                  <th className='text-left py-4 px-2 font-medium text-gray-700'>
                    Time
                  </th>
                  <th className='text-left py-4 px-2 font-medium text-gray-700'>
                    Status
                  </th>

                  {/* <th className='text-left py-4 px-2 font-medium text-gray-700'>
                    Action
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td
                      colSpan={5}
                      className='py-8 px-2 text-3xl text-center text-gray-600'
                    >
                      Loading...
                    </td>
                  </tr>
                )}

                {invoices?.results?.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className='py-8 px-2 text-3xl text-center text-gray-600'
                    >
                      No Invoices Found
                    </td>
                  </tr>
                )}

                {invoices?.results?.map(
                  (invoice: InvoiceAnalysisResult, index: number) => (
                    <tr
                      key={index}
                      className='border-b border-gray-100 hover:bg-gray-50 transition-colors'
                    >
                      <td className='py-4 px-2 text-gray-600 font-medium'>
                        {invoice?.invoice_id}
                      </td>
                      {/* <td className='py-4 px-2 text-gray-900'>
                        {invoice?.user}
                      </td> */}
                      <td className='py-4 px-2 text-gray-600'>
                        {invoice?.created_at.split("T")[0]}
                      </td>
                      <td className='py-4 px-2 text-gray-600'>
                        {invoice?.created_at.split("T")[1].split(".")[0]}
                      </td>
                      <td className='py-4 px-2'>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                            invoice.status
                          )}`}
                        >
                          {invoice.status.charAt(0).toUpperCase() +
                            invoice.status.slice(1)}
                        </span>
                      </td>
                      {/* <td className='py-4 px-2 text-blue-600 font-semibold'>
                        <button
                          onClick={() => handleViewImage(invoice)}
                          className='cursor-pointer'
                        >
                          View
                        </button>
                      </td> */}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className='md:hidden space-y-4'>
            {filteredInvoices?.map(
              (invoice: InvoiceAnalysisResult, index: number) => (
                <div
                  key={index}
                  className='bg-gray-50 rounded-lg p-4 border border-gray-200'
                >
                  <div className='flex justify-between items-start mb-3'>
                    <div>
                      <p className='font-semibold text-gray-900'>
                        {invoice.invoice_id}
                      </p>
                      <p className='text-sm text-gray-600'>{invoice.user}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        invoice.status
                      )}`}
                    >
                      {invoice.status.charAt(0).toUpperCase() +
                        invoice.status.slice(1)}
                    </span>
                  </div>

                  <div className='flex justify-between items-center'>
                    <div>
                      <p className='text-sm text-gray-500'>
                        Date: {invoice.created_at.split("T")[0]}
                      </p>
                    </div>
                    {/* <button
                    onClick={() => handleViewImage(invoice)}
                    className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                  >
                    <Eye className='w-5 h-5' />
                  </button> */}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Empty State */}
          {/* {filteredInvoices.length === 0 && (
            <div className='text-center py-12'>
              <FileText className='w-12 h-12 text-gray-400 mx-auto mb-4' />
              <h3 className='text-lg font-medium text-gray-900 mb-2'>
                No invoices found
              </h3>
              <p className='text-gray-500'>
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )} */}

          {/* Pagination */}
          {/* {filteredInvoices.length > 0 && (
            <div className='flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-200 gap-4'>
              <p className='text-sm text-gray-600'>
                Showing {filteredInvoices.length} of {invoices.length} invoices
              </p>

              <div className='flex space-x-2'>
                <button className='px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm'>
                  Previous
                </button>
                <button className='px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm'>
                  1
                </button>
                <button className='px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm'>
                  2
                </button>
                <button className='px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm'>
                  Next
                </button>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
