"use client";

import { createContext, useContext, useState } from "react";

type Transaction = {
  status: string;
  message: string;
  transactionId?: string;
  amount?: number;
  createdAt: Date;
};

type TransactionContextType = {
  transactionHistory: Transaction[];
  addTransaction: (transaction: Transaction) => void;
};

const TransactionContext = createContext<TransactionContextType | null>(null);

const TransactionProvider = ({ children }: React.PropsWithChildren) => {
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>(
    [],
  );

  const addTransaction = (transaction: Transaction) => {
    setTransactionHistory((prev) => [...prev, transaction]);
  };

  return (
    <TransactionContext.Provider value={{ transactionHistory, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;

export const useTransactionHistory = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactionHistory must be used within a TransactionProvider",
    );
  }
  return context;
};
