"use client";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { PaymentSchemaType } from "@/app/validation/schema";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

const CardPreview = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { watch } = useFormContext<PaymentSchemaType>();
  const cardNumber = watch("cardNumber");
  const cardHolderName = watch("cardHolderName");
  const expirationDate = watch("expirationDate");
  const cvv = watch("cvv");

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <div className="flex w-full items-center justify-center from-background via-background to-muted p-4">
      <div className="w-full max-w-md">
        {/* Card Container with 3D Flip Effect */}
        <div
          className="relative w-full aspect-[1.586] cursor-pointer perspective"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleFlip}
        >
          {/* Front of Card */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-out ${
              isFlipped ? "opacity-0 scale-95" : "opacity-100 scale-100"
            } ${isFlipped ? "pointer-events-none" : ""}`}
            style={{
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Front Card */}
            <div className="absolute inset-0 rounded-2xl bg-[#272829] shadow-2xl overflow-hidden group">
              {/* Decorative Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl -ml-40 -mb-40"></div>
              </div>

              {/* Card Content */}
              <div className="relative h-full flex flex-col justify-between p-6 md:p-8 text-white">
                {/* Top Section */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-semibold opacity-70 tracking-widest">
                      DEBIT CARD
                    </span>
                    <span className="text-lg md:text-lg font-bold mt-0">
                      Gateway
                    </span>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <div className="w-6 h-6 md:w-8 md:h-8">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M9 13h6" />
                        <path d="M9 17h6" />
                        <path d="M9 9h6" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Middle Section - Chip */}
                <div className="flex items-center gap-4">
                  {/* <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-lg shadow-lg" /> */}
                  <div className="flex-1 h-1 bg-white/20 rounded-full"></div>
                </div>

                {/* Card Number */}
                <div className="space-y-4">
                  <div className="text-2xl md:text-3xl font-mono font-bold tracking-wider">
                    {cardNumber}
                  </div>

                  {/* Cardholder & Expiry */}
                  <div className="flex items-end justify-between">
                    <div className="flex-1">
                      <span className="text-xs opacity-60 uppercase tracking-widest block mb-1">
                        CARDHOLDER
                      </span>
                      <span className="text-sm md:text-base font-semibold uppercase tracking-wide">
                        {cardHolderName}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs opacity-60 uppercase tracking-widest block mb-1">
                        EXPIRES
                      </span>
                      <span className="text-sm md:text-base font-mono font-semibold">
                        {expirationDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover indicator */}
              {isHovered && (
                <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white/70 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Click to flip</span>
                  <FaChevronRight size={16} />
                </div>
              )}
            </div>
          </div>

          {/* Back of Card */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-out ${
              isFlipped ? "opacity-100 scale-100" : "opacity-0 scale-95"
            } ${!isFlipped ? "pointer-events-none" : ""}`}
            style={{
              transform: isFlipped ? "rotateY(0deg)" : "rotateY(180deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Back Card */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl overflow-hidden group">
              {/* Decorative Background */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -mr-48 -mt-48"></div>
              </div>

              {/* Card Content */}
              <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
                {/* Magnetic Strip */}
                <div className="h-12 bg-black/40 rounded-sm"></div>

                {/* CVV Section */}
                <div className="flex flex-col items-end space-y-3">
                  <div className="w-full h-10 bg-gray-400 rounded-sm flex items-center justify-end pr-4">
                    <span className="text-gray-900 font-mono font-bold text-sm tracking-widest">
                      {cvv}
                    </span>
                  </div>
                  <div className="text-right text-white/60 text-xs">
                    <p className="uppercase tracking-widest mb-1">CVV</p>
                    <p className="text-xs opacity-50">3 digit security code</p>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="text-white/50 text-xs space-y-2">
                  <p>This card is not valid unless signed</p>
                  <p className="text-white font-semibold">Gateway</p>
                </div>
              </div>

              {/* Hover indicator */}
              {isHovered && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/50 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Click to flip</span>
                  <FaChevronLeft size={16} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
