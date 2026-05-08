import { IoCloseSharp } from "react-icons/io5";

const Toaster = ({
  result,
  setResult,
}: {
  result: {
    status: "success" | "failed" | "timeout";
    message: string;
  };
  setResult: (result: null) => void;
}) => {
  return (
    <div
      className={`w-full fixed top-10 right-10 max-w-md rounded-lg p-4 text-sm font-medium ${
        result.status === "success"
          ? "bg-green-50 border border-green-300 text-green-800"
          : result.status === "failed"
            ? "bg-red-50 border border-red-300 text-red-800"
            : "bg-yellow-50 border border-yellow-300 text-yellow-800"
      }`}
    >
      <button
        onClick={() => {
          setResult(null);
        }}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer"
      >
        <IoCloseSharp size={20} />
      </button>
      {result.status === "success" && (
        <>
          <p className="font-semibold">✅ Payment Successful</p>
          <p>{result.message}</p>
        </>
      )}
      {result.status === "failed" && (
        <>
          <p className="font-semibold">❌ Payment Failed</p>
          <p>{result.message}</p>
        </>
      )}
      {result.status === "timeout" && (
        <>
          <p className="font-semibold">⏱ Request Timed Out</p>
          <p>{result.message}</p>
        </>
      )}
    </div>
  );
};

export default Toaster;
