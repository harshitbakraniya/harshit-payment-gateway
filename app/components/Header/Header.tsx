import Link from "next/link";

const Header = () => {
  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-10 backdrop-blur-md border py-2 mt-2 rounded-md w-[60%] px-2">
      <div className="flex gap-4 items-center justify-between w-full">
        <Link className="text-xl font-bold ml-3 h1" href="/" prefetch={false}>
          PaymentGate
        </Link>
        <Link
          href="/transaction-history"
          className="text-sm font-medium cursor-pointer border-b-2 border py-2 px-3 rounded-sm"
        >
          Transaction history
        </Link>
      </div>
    </div>
  );
};

export default Header;
