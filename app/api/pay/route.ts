import { NextResponse } from "next/server";

const FAILURE_REASONS = [
  "Insufficient funds",
  "Card declined by issuer",
  "Invalid card details",
  "Transaction limit exceeded",
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req: Request) {
  const { cardHolderName, cardNumber, expirationDate, cvv, amount } =
    await req.json();

  // Validate presence of required fields
  if (!cardHolderName || !cardNumber || !expirationDate || !cvv || !amount) {
    return NextResponse.json(
      { status: "error", message: "Missing required payment fields" },
      { status: 400 },
    );
  }

  const roll = Math.random(); // 0 – 1

  // ~15% → simulate timeout (respond after 8s — client will abort at 6s)
  if (roll < 0.15) {
    await delay(8000);
    return NextResponse.json(
      {
        status: "timeout",
        message: "Gateway timeout",
        transactionId: `TXN-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
        amount,
        createdAt: new Date(),
      },
      { status: 504 },
    );
  }

  // ~25% → failure
  if (roll < 0.4) {
    const reason =
      FAILURE_REASONS[Math.floor(Math.random() * FAILURE_REASONS.length)];
    return NextResponse.json(
      {
        status: "failed",
        message: reason,
        transactionId: `TXN-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
        amount,
        createdAt: new Date(),
      },
      { status: 402 },
    );
  }

  // ~60% → success
  return NextResponse.json(
    {
      status: "success",
      message: "Payment successful",
      transactionId: `TXN-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      amount,
      createdAt: new Date(),
    },
    { status: 200 },
  );
}
