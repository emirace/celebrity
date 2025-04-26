"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaTrash, FaEye } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import moment from "moment";
import Loading from "../../_components/loading";
import Modal from "../../_components/modal";
import { usePayment } from "@/contexts/payment";
import { useToastNotification } from "@/contexts/toastNotification";
import { IPayment } from "@/types/payment";
import Detail from "./_components/detail";
import { deletePayment } from "@/services/payment";

const AllPayments: React.FC = () => {
  const { fetchAllPayments } = usePayment();
  const { addNotification } = useToastNotification();
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const res = await fetchAllPayments();
      setPayments(res);
    } catch (error) {
      addNotification({ message: error as string, error: true });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadPayments();
  }, []);

  // Filter and paginate payments
  const filteredPayments = payments.filter((payment) =>
    payment.transactionId.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const paginated = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id: string) => {
    try {
      await deletePayment(id);
      loadPayments();
    } catch (error) {
      addNotification({ message: error as string, error: true });
    }
  };

  return (
    <div className=" w-full overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-4xl font-bold text-red-500">
          Payments
        </h2>
      </div>
      <div className="flex justify-between items-center mb-4 gap-4">
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-md text-sm">
          {payments.length} Payments
        </div>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by Transaction ID"
            className="border w-full border-gray-300 rounded-md py-2 pl-8 pr-3 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-2 top-3 text-gray-500" />
        </div>
        <button className="flex items-center border border-gray-300 rounded-md px-4 py-2">
          Sort by <IoIosArrowDown className="ml-2" />
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto min-h-96">
          <table className="border-collapse w-full whitespace-nowrap">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Currency</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            {payments.length <= 0 && (
              <div className="pt-4">No payments available</div>
            )}
            <tbody>
              {paginated.map((payment, index) => (
                <tr key={payment._id} className="border-b">
                  <td className="py-3 px-4">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="py-3 px-4 font-medium">
                    {`${payment.transactionId.slice(0, 15)}...`}
                  </td>
                  <td className="py-3 px-4">
                    {payment.userId.fullName || payment.userId.email}
                  </td>
                  <td className="py-3 px-4 capitalize">{payment.type}</td>
                  <td className="py-3 px-4">${payment.amount.toFixed(2)}</td>
                  <td className="py-3 px-4">{payment.currency}</td>
                  <td className="py-3 px-4">{payment.paymentMethod}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs capitalize ${
                        payment.status === "successful"
                          ? "bg-green-500"
                          : payment.status === "pending"
                          ? "bg-yellow-500"
                          : payment.status === "failed"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {moment(payment.createdAt).format("MMM D, YYYY HH:mm")}
                  </td>
                  <td className="py-3 px-4 ">
                    <div className="flex items-center gap-3">
                      <FaEye
                        className=" cursor-pointer"
                        onClick={() => {
                          setData({
                            ...payment.meta,
                            type: payment.type,
                            receipt: payment.receipt,
                          });
                          setIsOpen(true);
                        }}
                      />
                      <UpdateButton id={payment._id} />
                      <FaTrash
                        onClick={() => handleDelete(payment._id)}
                        className="text-red-500  cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-between items-center mt-4 text-sm">
        <p>
          Showing{" "}
          {Math.min(currentPage * itemsPerPage, filteredPayments.length)} of{" "}
          {filteredPayments.length} entries
        </p>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-primary"
            }`}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1 ? "bg-primary text-white" : "text-primary"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-primary"
            }`}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          >
            Next
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div />
        <Detail data={data} />
      </Modal>
    </div>
  );
};

export default AllPayments;

const UpdateButton = ({ id }: { id: string }) => {
  const { addNotification } = useToastNotification();
  const { updateStatus } = usePayment();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showReason, setShowReason] = useState(false);
  const [reason, setReason] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleConfirm = async (status: string) => {
    try {
      setLoading(false);
      setShowReason(false);
      setShow(false);
      await updateStatus(id, status, reason);
      addNotification({ message: "Payment status updated" });
    } catch (error) {
      addNotification({ message: error as string, error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setShow(!show)}
        disabled={loading}
        className="text-primary hover:underline flex items-center gap-2"
      >
        {loading && <Loading />}
        Edit
      </button>
      {show && (
        <div className="absolute right-0 top-full bg-white z-10 rounded-md flex flex-col p-2 shadow-md">
          {showReason ? (
            <div className="flex items-center gap-2">
              <input
                className="flex-1 border focus:outline-none rounded-full px-2"
                placeholder="Enter reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <button
                onClick={() => handleConfirm("failed")}
                className="border border-primary text-primary rounded-full px-4"
              >
                Send
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => handleConfirm("successful")}
                disabled={loading}
                className="text-green-500 border-b p-1 cursor-pointer"
              >
                Confirmed
              </button>
              <button
                onClick={() => setShowReason(true)}
                className="text-red-500 cursor-pointer p-1"
              >
                Failed
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
