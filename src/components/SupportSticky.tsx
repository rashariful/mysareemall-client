"use client";

import { MessageCircle } from "lucide-react";

const SupportSticky = () => {
  return (
    <div className="fixed right-4 bottom-24 z-50 flex flex-col gap-3">
      {/* WhatsApp */}
      <a
        href="https://wa.me/8801926923688"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300"
      >
             <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline font-semibold">WhatsApp</span>
      </a>

      {/* Messenger */}
      <a
        href="https://m.me/558226377664149"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline font-semibold">Messenger</span>
      </a>
    </div>
  );
};

export default SupportSticky;
