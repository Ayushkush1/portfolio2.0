import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center px-4">
        <ShieldAlert className="w-16 h-16 text-[#ff5f26] mb-6 animate-pulse" />
        <h1 className="text-3xl font-light mb-4" style={{ fontFamily: "'Fraunces', serif" }}>404 - Page Not Found</h1>
        <p className="text-white/50 mb-8 max-w-md text-center font-light">
            The page you are looking for doesn't exist or may have been relocated.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-300">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
        </Link>
    </div>
  );
}
