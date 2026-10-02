import React, { useState } from 'react';
import { 
  Grid, 
  Type, 
  Palette, 
  Smartphone, 
  Layout, 
  CheckCircle2, 
  ArrowRight,
  Maximize,
  Compass,
  FileCode2
} from 'lucide-react';
import { WIREFRAME_SPEC_DATA } from '../data/staticCodeData';

export const WireframeSpec: React.FC = () => {
  const [activeZone, setActiveZone] = useState<string>('bento');

  const wireframeZones = [
    {
      id: 'header',
      name: '01. Top Navigation Bar',
      dimensions: 'Height: 72px · Max Width: 1200px · Sticky Top',
      tags: ['<header.site-header>', '<nav.site-nav>', '<ul>', '<li>'],
      rules: '1-Row 3-Zone contract: Zone 1 single text logo, Zone 2 text links with hover underline, Zone 3 primary CTA button. Must have backdrop-filter: blur(10px) with translateZ(0) hardware acceleration.',
      spacing: 'Padding: 16px 24px (1rem 1.5rem) · Gap: 32px (2rem)'
    },
    {
      id: 'hero',
      name: '02. Hero Billboard & Metrics',
      dimensions: 'Min-height: 600px · Ratio: 1.15fr to 0.85fr',
      tags: ['<section.hero-section>', '<h1>', '<div.hero-metrics>', '<svg>'],
      rules: 'Asymmetric 2-column grid desktop splitting content and architectural SVG diagram. Fluid clamp() heading scale (36px to 56px). Proof metrics aligned with tabular numbers.',
      spacing: 'Vertical Section Padding: 64px (4rem) · Gap: 48px (3rem)'
    },
    {
      id: 'bento',
      name: '03. Selected Work Bento Grid',
      dimensions: '12-Column Responsive Track · Asymmetric distribution',
      tags: ['<section.portfolio-section>', '<article.project-card>', '<figure>', '<figcaption>'],
      rules: 'Card 1 (span 8 wide) + Card 2 (span 4 tall) on row 1; Card 3 (span 4 regular) + Card 4 (span 8 wide) on row 2. Transitions to 6-column on tablet and 1-column on mobile.',
      spacing: 'Row/Col Gap: 24px (1.5rem) · Card Internal Padding: 24px (1.5rem)'
    },
    {
      id: 'services',
      name: '04. Core Engineering Disciplines',
      dimensions: '3-Column Auto-fit Grid (1fr 1fr 1fr)',
      tags: ['<section.services-section>', '<article.service-item>', '<h3>', '<ul>'],
      rules: 'Even 3-column distribution highlighting technical capabilities. Each card has a mono numeric kicker (01, 02, 03), semantic h3, concise description, and bulleted engineering specs.',
      spacing: 'Section Padding: 64px (4rem) · Card Gap: 32px (2rem)'
    },
    {
      id: 'process',
      name: '05. 4-Phase Sequential Methodology',
      dimensions: 'Dual-track grid (0.9fr intro / 1.1fr timeline)',
      tags: ['<section.process-section>', '<ol.timeline-list>', '<li.timeline-step>'],
      rules: 'Ordered list <ol> reflecting chronological engineering execution. Fixed 48px mono numeric column with flexible step content description.',
      spacing: 'Step Separator: 1px hairline border · Item Gap: 24px (1.5rem)'
    },
    {
      id: 'testimonial',
      name: '06. Independent Verification & Quote',
      dimensions: 'Max-width 820px centered container',
      tags: ['<section.testimonial-section>', '<blockquote>', '<cite>'],
      rules: 'Editorial pull-quote with 65-75ch measure. Employs clamp(1.25rem, 2vw + 0.5rem, 1.75rem) font scale with semantic <cite> for attribution.',
      spacing: 'Vertical Padding: 64px (4rem)'
    },
    {
      id: 'contact',
      name: '07. Inquiry Portal & Form',
      dimensions: 'Max-width 1200px enclosed card container',
      tags: ['<section.cta-section>', '<form.inquiry-form>', '<label>', '<input>', '<button>'],
      rules: 'Two-column input fields desktop collapsing to single-column on mobile. Strict 44px minimum touch targets and explicit <label for="..."> associations.',
      spacing: 'Form Row Gap: 24px (1.5rem) · Enclosure Padding: 48px (3rem)'
    },
    {
      id: 'footer',
      name: '08. 4-Column Structured Footer',
      dimensions: 'Grid: 1.5fr brand + three 1fr columns',
      tags: ['<footer.site-footer>', '<address>', '<p.intern-attribution>'],
      rules: 'Four distinct columns: Brand summary with intern credit (Raj Mani), Practice navigation links, semantic postal <address>, and technical compliance specs.',
      spacing: 'Top Padding: 64px (4rem) · Bottom Bar Padding: 32px (2rem)'
    }
  ];

  const selectedZoneData = wireframeZones.find((z) => z.id === activeZone) || wireframeZones[2];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Title & Intern Attribution */}
        <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold mb-2">
              <Compass className="w-4 h-4" />
              <span>DESIGN TO CODE SPECIFICATION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Wireframe Architecture & Layout Blueprint
            </h1>
            <p className="text-slate-400 text-sm mt-2 max-w-2xl">
              Original design concept translated into semantic HTML5 structure and responsive CSS tokens by <strong>Raj Mani</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-3 rounded-lg text-xs">
            <div>
              <span className="text-slate-500 block">Baseline Grid</span>
              <strong className="text-cyan-300 font-mono">8px Base Rhythm</strong>
            </div>
            <div className="w-px h-8 bg-slate-800"></div>
            <div>
              <span className="text-slate-500 block">Grid Engine</span>
              <strong className="text-cyan-300 font-mono">12-Column Responsive</strong>
            </div>
            <div className="w-px h-8 bg-slate-800"></div>
            <div>
              <span className="text-slate-500 block">Max Container</span>
              <strong className="text-cyan-300 font-mono">1200px Centered</strong>
            </div>
          </div>
        </div>

        {/* Interactive Wireframe Zone Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Zone Navigation */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold px-2 mb-3">
              Wireframe Zones Analyzed
            </h2>
            <div className="space-y-1">
              {wireframeZones.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setActiveZone(zone.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    activeZone === zone.id
                      ? 'bg-cyan-950/80 border border-cyan-600 text-cyan-200 font-medium'
                      : 'text-slate-300 hover:bg-slate-800 border border-transparent'
                  }`}
                >
                  <span className="truncate">{zone.name}</span>
                  <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${activeZone === zone.id ? 'text-cyan-400' : 'text-slate-600'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Selected Zone Specification Details */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-cyan-400 font-mono text-xs font-semibold">LAYOUT DIRECTIVE</span>
                <h3 className="text-lg font-bold text-white mt-1">{selectedZoneData.name}</h3>
                <p className="text-xs font-mono text-slate-400 mt-1">{selectedZoneData.dimensions}</p>
              </div>
              <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded font-mono">
                Zone Active
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <FileCode2 className="w-3.5 h-3.5 text-cyan-400" />
                  Semantic HTML Elements Employed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedZoneData.tags.map((tag, i) => (
                    <code key={i} className="text-xs font-mono bg-slate-800 text-cyan-300 px-2 py-1 rounded border border-slate-700">
                      {tag}
                    </code>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Layout & Engineering Directive
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80">
                  {selectedZoneData.rules}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Spatial Math & Grid Rules
                </h4>
                <div className="text-xs font-mono text-slate-400 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                  {selectedZoneData.spacing}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Technical Token Specification Tables */}
        <div className="space-y-6 pt-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layout className="w-5 h-5 text-cyan-400" />
            CSS Design Tokens & Quantitative Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Table 1: 8px Geometric Spatial Scale */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <Grid className="w-4 h-4" />
                <h3>8px Geometric Spatial Scale</h3>
              </div>
              <p className="text-xs text-slate-400">
                Derived mathematically from an 8px base rhythm unit (1rem = 16px) to guarantee vertical alignment.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-2">Token</th>
                      <th className="pb-2">Pixels</th>
                      <th className="pb-2">REM</th>
                      <th className="pb-2">Implementation Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr><td className="py-2 text-cyan-400">--space-1</td><td>4px</td><td>0.25rem</td><td>Micro offsets & border radius</td></tr>
                    <tr><td className="py-2 text-cyan-400">--space-2</td><td>8px</td><td>0.5rem</td><td>Baseline grid / minimum touch gutter</td></tr>
                    <tr><td className="py-2 text-cyan-400">--space-3</td><td>12px</td><td>0.75rem</td><td>Form inline padding & badge padding</td></tr>
                    <tr><td className="py-2 text-cyan-400">--space-4</td><td>16px</td><td>1.0rem</td><td>Standard container & card padding</td></tr>
                    <tr><td className="py-2 text-cyan-400">--space-6</td><td>24px</td><td>1.5rem</td><td>Card interior & grid gutter</td></tr>
                    <tr><td className="py-2 text-cyan-400">--space-8</td><td>32px</td><td>2.0rem</td><td>Inter-component margins</td></tr>
                    <tr><td className="py-2 text-cyan-400">--space-12</td><td>48px</td><td>3.0rem</td><td>Section header separation</td></tr>
                    <tr><td className="py-2 text-cyan-400">--space-16</td><td>64px</td><td>4.0rem</td><td>Section vertical padding</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 2: Color Distribution Budget (60-30-10) */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <Palette className="w-4 h-4" />
                <h3>Color Palette & Contrast Budget (60-30-10)</h3>
              </div>
              <p className="text-xs text-slate-400">
                Strict chromatic discipline meeting WCAG 2.1 AAA contrast ratios across all textual surfaces.
              </p>
              <div className="space-y-2.5">
                {WIREFRAME_SPEC_DATA.colorTokens.map((color, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded border border-slate-700 shrink-0" style={{ backgroundColor: color.hex }}></div>
                      <div>
                        <span className="font-mono text-cyan-300 font-medium block">{color.token}</span>
                        <span className="text-[11px] text-slate-400">{color.role}</span>
                      </div>
                    </div>
                    <div className="text-right font-mono text-[11px]">
                      <span className="text-slate-300">{color.hex}</span>
                      <span className="block text-[10px] text-emerald-400">{color.contrast}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Table 3: Fluid Typographic Scale */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 md:col-span-2">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <Type className="w-4 h-4" />
                <h3>Fluid Typographic Scale with Mathematical clamp()</h3>
              </div>
              <p className="text-xs text-slate-400">
                Eliminates abrupt font-size jump glitches across viewport resizing by calculating smooth viewport-width curves.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-2">Token</th>
                      <th className="pb-2">Target Range</th>
                      <th className="pb-2">Mathematical clamp() Formula</th>
                      <th className="pb-2">Weight</th>
                      <th className="pb-2">Semantic Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {WIREFRAME_SPEC_DATA.typographyScale.map((t, idx) => (
                      <tr key={idx}>
                        <td className="py-2.5 text-cyan-400">{t.token}</td>
                        <td className="text-slate-200">{t.size}</td>
                        <td className="text-amber-300 font-mono text-[11px]">{t.clamp}</td>
                        <td>{t.weight}</td>
                        <td className="text-slate-400">{t.usage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 4: Responsive Breakpoint Matrix */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 md:col-span-2">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <Smartphone className="w-4 h-4" />
                <h3>Responsive Breakpoint Engineering Matrix</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {WIREFRAME_SPEC_DATA.breakpoints.map((bp, idx) => (
                  <div key={idx} className="bg-slate-950/70 border border-slate-800 p-4 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{bp.name}</span>
                      <span className="font-mono text-xs text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                        {bp.width}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{bp.behavior}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
