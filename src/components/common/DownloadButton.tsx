import React, { useState } from 'react';
import { Download, Check, FileCode, Sparkles } from 'lucide-react';

export const DownloadButton: React.FC = () => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 2500);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 print:hidden">
      <a
        href="/localstore-project.zip?v=2"
        download="localstore-project.zip"
        onClick={handleDownload}
        className="group flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl hover:shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 border-2 border-emerald-400 font-semibold text-xs sm:text-sm"
        title="Download complete project ZIP file"
      >
        {downloading ? (
          <>
            <Check className="w-5 h-5 text-white animate-bounce" />
            <span>Downloading ZIP...</span>
          </>
        ) : (
          <>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Download className="w-3.5 h-3.5 text-white group-hover:translate-y-0.5 transition-transform" />
            </div>
            <div className="flex flex-col text-left">
              <span className="leading-tight font-bold">Download Codebase ZIP</span>
              <span className="text-[10px] text-emerald-100 font-normal leading-tight">2.9 MB • Ready for VS Code</span>
            </div>
          </>
        )}
      </a>
    </div>
  );
};
