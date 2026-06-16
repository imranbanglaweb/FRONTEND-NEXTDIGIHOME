import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f12] text-[#fafafa] px-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-[#737373] mb-8">This page could not be found.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#00d4aa] text-[#0f0f12] rounded-lg hover:bg-[#00b894] transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
