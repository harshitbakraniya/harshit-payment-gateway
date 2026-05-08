"use client";

import { useTransactionHistory } from "../context/transaction";

const TransactionHistory = () => {
  const { transactionHistory } = useTransactionHistory();

  console.log("transactionHistory", transactionHistory);
  return (
    <div className="h-screen flex flex-col items-center mt-30">
      <h1 className="text-2xl font-bold mb-2">Transaction History</h1>
      {transactionHistory
        ?.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        ?.map((transaction) => (
          <div
            key={transaction?.transactionId}
            className="min-w-xl flex flex-col gap-2 mt-5 border border-gray-300 border-b-2 border-r-2 rounded-md p-6"
          >
            <p>TransactionId : {transaction?.transactionId}</p>
            <p>Amount : {transaction?.amount}</p>
            <p className="">
              Status :
              <span
                className={`${
                  transaction.status.toLowerCase() == "success"
                    ? "bg-green-500"
                    : "bg-red-500"
                } px-2 py-1 rounded ml-2 text-white capitalize`}
              >
                {transaction?.status}
              </span>
            </p>
          </div>
        ))}
    </div>
  );
};

export default TransactionHistory;
