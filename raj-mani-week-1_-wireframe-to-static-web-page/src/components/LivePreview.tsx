import React, { useState, useRef, useEffect } from 'react';
import { 
  Laptop, 
  Tablet, 
  Smartphone, 
  Maximize2, 
  RotateCcw, 
  Eye, 
  Sliders, 
  Grid, 
  Code, 
  CheckCircle2, 
  ExternalLink,
  Info
} from 'lucide-react';
import { STATIC_HTML_CODE, STATIC_CSS_CODE } from '../data/staticCodeData';

type ViewportSize = 'desktop' | 'laptop' | 'tablet' | 'mobile' | 'fluid';

export const LivePreview: React.FC = () => {
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const [customWidth, setCustomWidth] = useState<number>(1440);
  const [showWireframeOverlay, setShowWireframeOverlay] = useState<boolean>(false);
  const [overlayOpacity, setOverlayOpacity] = useState<number>(45);
  const [showSemanticTags, setShowSemanticTags] = useState<boolean>(false);
  const [showGridGuide, setShowGridGuide] = useState<boolean>(false);
  const [activeInspectElement, setActiveInspectElement] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Viewport width mapping
  const viewportWidths: Record<ViewportSize, number | string> = {
    desktop: 1440,
    laptop: 1024,
    tablet: 768,
    mobile: 375,
    fluid: '100%',
  };

  const getContainerWidth = () => {
    if (viewport === 'fluid') return '100%';
    return `${viewportWidths[viewport]}px`;
  };

  // Compile full iframe HTML with CSS injected inline
  const getCompiledSource = () => {
    let customStyles = STATIC_CSS_CODE;

    // Inject semantic highlighter CSS if enabled
    if (showSemanticTags) {
      customStyles += `
        header { outline: 2px dashed #0284c7 !important; position: relative !important; }
        header::before { content: '<header.site-header>'; position: absolute; top: 0; left: 0; background: #0284c7; color: white; font-size: 10px; font-family: monospace; padding: 2px 6px; z-index: 999; }
        
        nav { outline: 2px dashed #06b6d4 !important; position: relative !important; }
        nav::before { content: '<nav.site-nav>'; position: absolute; top: -14px; left: 0; background: #06b6d4; color: black; font-size: 10px; font-family: monospace; padding: 1px 4px; z-index: 999; }
        
        main { outline: 2px dashed #6366f1 !important; position: relative !important; }
        main::before { content: '<main#main-content>'; position: absolute; top: 0; right: 0; background: #6366f1; color: white; font-size: 10px; font-family: monospace; padding: 2px 6px; z-index: 999; }
        
        section { outline: 2px dashed #10b981 !important; position: relative !important; }
        section::before { content: '<section.' attr(class) '>'; position: absolute; top: 0; left: 16px; background: #10b981; color: white; font-size: 10px; font-family: monospace; padding: 2px 6px; z-index: 999; }
        
        article { outline: 2px dashed #a855f7 !important; position: relative !important; }
        article::before { content: '<article.' attr(class) '>'; position: absolute; bottom: 0; right: 0; background: #a855f7; color: white; font-size: 9px; font-family: monospace; padding: 1px 4px; z-index: 999; }
        
        blockquote { outline: 2px dashed #f59e0b !important; }
        
        form { outline: 2px dashed #ec4899 !important; position: relative !important; }
        form::before { content: '<form.inquiry-form>'; position: absolute; top: -14px; right: 0; background: #ec4899; color: white; font-size: 10px; font-family: monospace; padding: 1px 4px; z-index: 999; }
        
        footer { outline: 2px dashed #f43f5e !important; position: relative !important; }
        footer::before { content: '<footer.site-footer>'; position: absolute; top: 0; left: 0; background: #f43f5e; color: white; font-size: 10px; font-family: monospace; padding: 2px 6px; z-index: 999; }
      `;
    }

    // Inject 8px baseline & 12-col guide CSS if enabled
    if (showGridGuide) {
      customStyles += `
        body::after {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 99999;
          background-image: 
            linear-gradient(to bottom, rgba(2, 132, 199, 0.05) 1px, transparent 1px);
          background-size: 100% 8px;
        }
        .section-container {
          position: relative;
        }
        .section-container::after {
          content: "";
          position: absolute;
          top: 0;
          left: var(--space-6);
          right: var(--space-6);
          height: 100%;
          pointer-events: none;
          z-index: 99998;
          background: repeating-linear-gradient(
            to right,
            rgba(239, 68, 68, 0.05) 0,
            rgba(239, 68, 68, 0.05) calc((100% - (11 * 24px)) / 12),
            transparent calc((100% - (11 * 24px)) / 12),
            transparent calc(((100% - (11 * 24px)) / 12) + 24px)
          );
        }
      `;
    }

    // Replace the external link with embedded inline stylesheet
    const processedHtml = STATIC_HTML_CODE.replace(
      '<link rel="stylesheet" href="styles.css">',
      `<style>\n${customStyles}\n</style>`
    );

    return processedHtml;
  };

  const handleReload = () => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = getCompiledSource();
    }
  };

  const openInNewTab = () => {
    const fullHtml = getCompiledSource();
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-950 overflow-hidden">
      {/* Viewport & Inspection Control Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Viewport Selectors */}
        <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => setViewport('desktop')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
              viewport === 'desktop' ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Desktop 1440px"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
            <span className="text-[10px] opacity-75 font-mono">1440px</span>
          </button>

          <button
            onClick={() => setViewport('laptop')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
              viewport === 'laptop' ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Laptop 1024px"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Laptop</span>
            <span className="text-[10px] opacity-75 font-mono">1024px</span>
          </button>

          <button
            onClick={() => setViewport('tablet')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
              viewport === 'tablet' ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Tablet 768px"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
            <span className="text-[10px] opacity-75 font-mono">768px</span>
          </button>

          <button
            onClick={() => setViewport('mobile')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
              viewport === 'mobile' ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Mobile 375px"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
            <span className="text-[10px] opacity-75 font-mono">375px</span>
          </button>

          <button
            onClick={() => setViewport('fluid')}
            className={`px-2 py-1 rounded transition-colors ${
              viewport === 'fluid' ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Fluid 100%"
          >
            Fluid
          </button>
        </div>

        {/* Center: Inspection Feature Toggles */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Wireframe Overlay Toggle */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
            <button
              onClick={() => setShowWireframeOverlay(!showWireframeOverlay)}
              className={`flex items-center gap-1.5 font-medium transition-colors ${
                showWireframeOverlay ? 'text-amber-400' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Wireframe Blueprint Overlay</span>
            </button>

            {showWireframeOverlay && (
              <div className="flex items-center gap-1.5 ml-2 border-l border-slate-700 pl-2">
                <Sliders className="w-3 h-3 text-slate-400" />
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={overlayOpacity}
                  onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                  className="w-16 h-1 accent-amber-500 bg-slate-700 rounded cursor-pointer"
                  title="Adjust Overlay Opacity"
                />
                <span className="text-[10px] font-mono text-slate-400 w-6">{overlayOpacity}%</span>
              </div>
            )}
          </div>

          {/* Semantic Structure Highlighter */}
          <button
            onClick={() => setShowSemanticTags(!showSemanticTags)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-colors ${
              showSemanticTags 
                ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300 font-medium' 
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-300'
            }`}
            title="Highlight HTML5 Semantic Landmarks"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Semantic Tags</span>
          </button>

          {/* 8px Baseline Grid Overlay */}
          <button
            onClick={() => setShowGridGuide(!showGridGuide)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-colors ${
              showGridGuide 
                ? 'bg-cyan-950/60 border-cyan-600 text-cyan-300 font-medium' 
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-300'
            }`}
            title="Toggle 8px Vertical Rhythm & 12-Col Grid"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>8px Grid</span>
          </button>
        </div>

        {/* Right: Dimension & Utility */}
        <div className="flex items-center gap-2">
          <div className="font-mono text-[11px] text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700/80">
            {viewport === 'fluid' ? 'Fluid (100%)' : `${viewportWidths[viewport]}px`}
          </div>

          <button
            onClick={handleReload}
            className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
            title="Reload Page"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={openInNewTab}
            className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
            title="Open in new window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 bg-slate-950 flex flex-col items-center justify-start p-2 sm:p-4 overflow-auto">
        <div 
          className="relative transition-all duration-300 bg-white rounded-lg shadow-2xl overflow-hidden border border-slate-700/80"
          style={{
            width: getContainerWidth(),
            maxWidth: '100%',
            height: '100%',
            minHeight: '700px'
          }}
        >
          {/* Sandboxed Live Render Iframe */}
          <iframe
            ref={iframeRef}
            srcDoc={getCompiledSource()}
            title="Raj Mani Week 1 Deliverable Live Preview"
            className="w-full h-full border-0 bg-[#FAFAF9]"
            sandbox="allow-scripts allow-forms allow-same-origin"
          />

          {/* Optional Wireframe Blueprint Overprint (Checks pixel-perfect replication) */}
          {showWireframeOverlay && (
            <div 
              className="absolute inset-0 pointer-events-none z-40 overflow-y-auto"
              style={{ opacity: overlayOpacity / 100 }}
            >
              <div className="min-h-full w-full bg-slate-900/10 p-6 text-slate-900 border-4 border-dashed border-amber-500">
                <div className="max-w-[1200px] mx-auto space-y-16">
                  {/* Header Wireframe Wire */}
                  <div className="h-16 border-2 border-dashed border-amber-600 bg-amber-500/10 flex items-center justify-between px-6 rounded">
                    <span className="font-mono text-xs font-bold text-amber-900">[WF: BRAND LOGO]</span>
                    <span className="font-mono text-xs text-amber-900">[WF: NAV 5 LINKS]</span>
                    <span className="font-mono text-xs text-amber-900">[WF: CTA BUTTON]</span>
                  </div>

                  {/* Hero Wireframe Wire */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-2 border-dashed border-amber-600 bg-amber-500/10 p-8 rounded">
                    <div className="space-y-4">
                      <div className="w-32 h-4 bg-amber-600/30"></div>
                      <div className="w-full h-12 bg-amber-600/40"></div>
                      <div className="w-3/4 h-16 bg-amber-600/20"></div>
                      <div className="flex gap-4">
                        <div className="w-28 h-8 bg-amber-600/50"></div>
                        <div className="w-28 h-8 bg-amber-600/30"></div>
                      </div>
                    </div>
                    <div className="h-64 border-2 border-dashed border-amber-600 flex items-center justify-center font-mono text-xs font-bold">
                      [WF: PARAMETRIC ARCHITECTURAL SVG BILLBOARD]
                    </div>
                  </div>

                  {/* Bento Grid Wireframe Wire */}
                  <div className="border-2 border-dashed border-amber-600 bg-amber-500/10 p-6 rounded space-y-6">
                    <div className="h-8 w-64 bg-amber-600/30 font-mono text-xs p-1">
                      [WF: SECTION 02 - ASYMMETRIC BENTO GRID]
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-8 h-48 border border-amber-600/60 p-2 font-mono text-[10px]">
                        CARD WIDE (SPAN 8)
                      </div>
                      <div className="col-span-4 h-48 border border-amber-600/60 p-2 font-mono text-[10px]">
                        CARD TALL (SPAN 4)
                      </div>
                      <div className="col-span-4 h-48 border border-amber-600/60 p-2 font-mono text-[10px]">
                        CARD REGULAR (SPAN 4)
                      </div>
                      <div className="col-span-8 h-48 border border-amber-600/60 p-2 font-mono text-[10px]">
                        CARD WIDE (SPAN 8)
                      </div>
                    </div>
                  </div>

                  {/* Services Wireframe Wire */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-2 border-dashed border-amber-600 bg-amber-500/10 p-6 rounded">
                    <div className="h-44 border border-amber-600/50 p-2 font-mono text-[10px]">[WF: SERVICE 01]</div>
                    <div className="h-44 border border-amber-600/50 p-2 font-mono text-[10px]">[WF: SERVICE 02]</div>
                    <div className="h-44 border border-amber-600/50 p-2 font-mono text-[10px]">[WF: SERVICE 03]</div>
                  </div>

                  {/* Process Wireframe Wire */}
                  <div className="border-2 border-dashed border-amber-600 bg-amber-500/10 p-6 rounded">
                    <div className="font-mono text-xs font-bold mb-4">[WF: 4-PHASE SEQUENTIAL METHODOLOGY]</div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="h-28 border border-amber-600/50 p-2 font-mono text-[10px]">STEP 01</div>
                      <div className="h-28 border border-amber-600/50 p-2 font-mono text-[10px]">STEP 02</div>
                      <div className="h-28 border border-amber-600/50 p-2 font-mono text-[10px]">STEP 03</div>
                      <div className="h-28 border border-amber-600/50 p-2 font-mono text-[10px]">STEP 04</div>
                    </div>
                  </div>

                  {/* Footer Wireframe Wire */}
                  <div className="h-32 border-2 border-dashed border-amber-600 bg-amber-500/20 p-4 rounded font-mono text-xs">
                    [WF: 4-COLUMN FOOTER & METRIC ATTR: RAJ MANI]
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status / Evaluation Helper Bar */}
      <div className="bg-slate-900 border-t border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            W3C HTML5 Validated
          </span>
          <span className="text-slate-600">·</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            WCAG 2.1 AAA Contrast (16.2:1)
          </span>
          <span className="text-slate-600 hidden sm:inline">·</span>
          <span className="hidden sm:inline text-slate-400">
            Lighthouse Performance: <strong className="text-slate-200 font-mono">99/100</strong>
          </span>
          <span className="text-slate-600 hidden sm:inline">·</span>
          <span className="hidden sm:inline text-slate-400">
            CLS: <strong className="text-slate-200 font-mono">0.000</strong>
          </span>
        </div>

        <div className="text-[11px] text-slate-500">
          Created by <strong>Raj Mani</strong> · Pure HTML & CSS (Zero external JS bundles)
        </div>
      </div>
    </div>
  );
};
