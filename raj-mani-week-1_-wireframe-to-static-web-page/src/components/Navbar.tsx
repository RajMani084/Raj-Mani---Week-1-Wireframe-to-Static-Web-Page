import React from 'react';
import { 
  Monitor, 
  Layers, 
  Code2, 
  FileText, 
  CheckSquare, 
  Download, 
  Printer, 
  FileDown,
  Sparkles
} from 'lucide-react';
import { STATIC_HTML_CODE, STATIC_CSS_CODE, REPORT_MARKDOWN } from '../data/staticCodeData';

export type ActiveTab = 'preview' | 'wireframe' | 'code' | 'report' | 'rubric';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onPrintReport?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onPrintReport }) => {
  const [downloadOpen, setDownloadOpen] = React.useState(false);

  const downloadFile = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadOpen(false);
  };

  const handleDownloadAll = () => {
    downloadFile('index.html', STATIC_HTML_CODE, 'text/html');
    setTimeout(() => {
      downloadFile('styles.css', STATIC_CSS_CODE, 'text/css');
    }, 200);
    setTimeout(() => {
      downloadFile('REPORT.md', REPORT_MARKDOWN, 'text/markdown');
    }, 400);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center font-bold text-white shadow-sm shadow-cyan-500/20">
            RM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white text-sm sm:text-base">
                Raj Mani
              </span>
              <span className="text-slate-500 text-xs hidden sm:inline">·</span>
              <span className="text-xs text-cyan-400 font-medium hidden sm:inline">
                Week 1 Submission
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block">
              Wireframe to Static Web Page Architecture
            </p>
          </div>
        </div>

        {/* Zone 2: Primary Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700/60 overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              activeTab === 'preview'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Live Web Page</span>
          </button>

          <button
            onClick={() => setActiveTab('wireframe')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              activeTab === 'wireframe'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Wireframe Spec</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              activeTab === 'code'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Deliverables (HTML/CSS)</span>
          </button>

          <button
            onClick={() => setActiveTab('report')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              activeTab === 'report'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Technical Report</span>
          </button>

          <button
            onClick={() => setActiveTab('rubric')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              activeTab === 'rubric'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Audit Rubric</span>
          </button>
        </nav>

        {/* Zone 3: Direct Action / Deliverables Downloads */}
        <div className="flex items-center gap-2 shrink-0 relative">
          {activeTab === 'report' && onPrintReport && (
            <button
              onClick={onPrintReport}
              title="Print or Save PDF"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Print / PDF</span>
            </button>
          )}

          <div className="relative">
            <button
              onClick={() => setDownloadOpen(!downloadOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-md transition-colors whitespace-nowrap shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Deliverables</span>
            </button>

            {downloadOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-1 z-50 text-xs"
                onMouseLeave={() => setDownloadOpen(false)}
              >
                <div className="px-3 py-2 border-b border-slate-700/70 font-semibold text-slate-300">
                  Export Deliverables
                </div>
                <button
                  onClick={() => downloadFile('index.html', STATIC_HTML_CODE, 'text/html')}
                  className="w-full text-left px-3 py-2 hover:bg-slate-700 flex items-center justify-between text-slate-200"
                >
                  <span className="flex items-center gap-2">
                    <FileDown className="w-3.5 h-3.5 text-orange-400" />
                    index.html (Semantic HTML)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">14KB</span>
                </button>

                <button
                  onClick={() => downloadFile('styles.css', STATIC_CSS_CODE, 'text/css')}
                  className="w-full text-left px-3 py-2 hover:bg-slate-700 flex items-center justify-between text-slate-200"
                >
                  <span className="flex items-center gap-2">
                    <FileDown className="w-3.5 h-3.5 text-blue-400" />
                    styles.css (Modular CSS)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">16KB</span>
                </button>

                <button
                  onClick={() => downloadFile('REPORT.md', REPORT_MARKDOWN, 'text/markdown')}
                  className="w-full text-left px-3 py-2 hover:bg-slate-700 flex items-center justify-between text-slate-200"
                >
                  <span className="flex items-center gap-2">
                    <FileDown className="w-3.5 h-3.5 text-emerald-400" />
                    REPORT.md (Technical Report)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">12KB</span>
                </button>

                <div className="border-t border-slate-700/70 my-1"></div>

                <button
                  onClick={handleDownloadAll}
                  className="w-full text-left px-3 py-2 hover:bg-cyan-900/40 text-cyan-300 font-medium flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Download All Deliverables
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
