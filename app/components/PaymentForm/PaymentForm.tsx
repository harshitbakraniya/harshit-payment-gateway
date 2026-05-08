"use client";

import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ExpirationDate from "../CustomFilds/ExpirationDate/ExpirationDate";
import CardNumber from "../CustomFilds/CardNumber/CardNumber";
import { PaymentSchema, PaymentSchemaType } from "@/app/validation/schema";
import Toaster from "../Toaster/Toaster";
import CardPreview from "../CardPreview/CardPreview";
import { useTransactionHistory } from "@/app/context/transaction";

type PaymentResult =
  | {
      status: "success";
      message: string;
      transactionId: string;
      amount: number;
    }
  | { status: "failed"; message: string }
  | { status: "timeout"; message: string }
  | null;

const ABORT_TIMEOUT_MS = 6000; // cancel request after 6 s

const PaymentForm = ({ children }: { children?: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PaymentResult>(null);
  const { addTransaction } = useTransactionHistory();

  const methods = useForm<PaymentSchemaType>({
    resolver: yupResolver(PaymentSchema),
    defaultValues: {
      cardHolderName: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
      amount: 0,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = methods;

  const onSubmit = async (data: PaymentSchemaType) => {
    setResult(null);
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ABORT_TIMEOUT_MS);

    try {
      const payload = {
        ...data,
        cardNumber: data.cardNumber.replace(/\s/g, ""),
        expirationDate: data.expirationDate.replace(/\//g, ""),
      };

      const res = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const json = await res.json();
      setResult(json as PaymentResult);
      addTransaction(json);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        setResult({
          status: "timeout",
          message: "Request timed out. Please try again.",
        });
      } else {
        setResult({
          status: "failed",
          message: "An unexpected error occurred.",
        });
      }
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex w-[80%] flex-row gap-4 items-center justify-center">
        <div className="flex justify-center w-1/2 from-background via-background to-muted p-4">
          <CardPreview />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="flex flex-col w-1/2 gap-4 rounded-lg p-6 border border-gray-300 border-b-2 border-r-2 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            Payment Details
          </h2>

          <div className="flex flex-col gap-1">
            <label htmlFor="cardHolderName" className="text-gray-500">
              Card Holder Name
            </label>
            <input
              type="text"
              id="cardHolderName"
              {...register("cardHolderName")}
              className="border border-b-2 focus:border-b-2 focus:outline-none p-2 rounded"
            />
            {errors.cardHolderName && (
              <p className="text-red-500 text-sm">
                {errors.cardHolderName.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="cardNumber" className="text-gray-500">
              Card Number
            </label>
            <Controller
              name="cardNumber"
              control={control}
              render={({ field }) => <CardNumber field={field} />}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm">
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="expirationDate" className="text-gray-500">
              Expiration Date
            </label>
            <Controller
              name="expirationDate"
              control={control}
              render={({ field }) => <ExpirationDate field={field} />}
            />
            {errors.expirationDate && (
              <p className="text-red-500 text-sm">
                {errors.expirationDate.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="cvv" className="text-gray-500">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              {...register("cvv")}
              maxLength={4}
              className="border border-b-2 focus:outline-none p-2 rounded"
            />
            {errors.cvv && (
              <p className="text-red-500 text-sm">{errors.cvv.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="amount" className="text-gray-500">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              {...register("amount")}
              className="border border-b-2 focus:outline-none p-2 rounded"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || Object.keys(errors).length > 0}
            className="w-full bg-black p-2 rounded-md text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing…
              </>
            ) : (
              "Pay Now"
            )}
          </button>
        </form>
        {/* Result banner */}
        {result && <Toaster result={result} setResult={setResult} />}
      </div>
      {children}
    </FormProvider>
  );
};

export default PaymentForm;
