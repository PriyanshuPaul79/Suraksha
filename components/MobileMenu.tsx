import Link from "next/link";
import { X } from "lucide-react";

interface MobileProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 md:hidden">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="fixed right-0 top-0 h-64 w-full bg-zinc-900 shadow-xl">
                <div className="flex flex-col space-y-6">
                    <div className="flex justify-end">
                        <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white">
                            <X/>
                        </button>
                    </div>
                    <nav className="flex flex-col space-y-4 items-center">
                        <Link href="/submit-report" className="text-sm text-zinc-400 hover:text-white transition-colors" onClick={onClose}>Submit Report</Link>

                        <Link href="/track-report" className="text-sm text-zinc-400 hover:text-white transition-colors" onClick={onClose}>Track Report</Link>

                        <Link href="/how-it-work" className="text-sm text-zinc-400 hover:text-white transition-colors" onClick={onClose}>How it work</Link>

                        <Link href="/resources" className="text-sm text-zinc-400 hover:text-white transition-colors" onClick={onClose}>Resources </Link>

                        <Link href="/contact" className="text-sm text-zinc-400 hover:text-white transition-colors" onClick={onClose}>Contact </Link>

                    </nav>
                </div>
            </div>
        </div>
    );
}