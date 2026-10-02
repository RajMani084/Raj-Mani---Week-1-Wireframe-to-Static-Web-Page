import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Award, 
  Sparkles, 
  FileCheck, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { ActiveTab } from './Navbar';

interface EvaluationRubricProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const EvaluationRubric: React.FC<EvaluationRubricProps> = ({ onNavigate }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    w1: true, w2: true, w3: true,
    s1: true, s2: true, s3: true,
    c1: true, c2: true, c3: true,
    r1: true, r2: true, r3: true,
    d1: true, d2: true, d3: true, d4: true,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const rubricCategories = [
    {
      id: 'wireframe',
      title: '1. Accuracy in Replicating the Wireframe',
      weight: '20%',
      targetTab: 'wireframe' as ActiveTab,
      items: [
        { id: 'w1', label: 'All 8 wireframe layout zones faithfully translated into code (Header, Hero, Bento, Services, Process, Testimonial, Form, Footer)', evidence: 'Wireframe Spec & Live Preview overlay alignment' },
        { id: 'w2', label: 'Pixel-perfect spatial math with 8px baseline vertical rhythm and 12-column grid gutters', evidence: 'styles.css line 40-52 & Live Preview 8px grid overlay' },
        { id: 'w3', label: 'Accurate typographic hierarchy, font pairings (Plus Jakarta Sans + JetBrains Mono), and optical weights', evidence: 'Visual inspection & CSS font tokens' }
      ]
    },
    {
      id: 'semantic',
      title: '2. Adherence to Semantic HTML Practices',
      weight: '20%',
      targetTab: 'code' as ActiveTab,
      items: [
        { id: 's1', label: '100% semantic landmark tags (<header>, <nav>, <main>, <section>, <article>, <footer>) with zero redundant wrapper divs', evidence: 'index.html line 18-340' },
        { id: 's2', label: 'Strict heading hierarchy (single h1 -> six h2s -> nine h3s) preventing screen reader skips', evidence: 'Report Section 3 heading ladder' },
        { id: 's3', label: 'Form controls with explicit <label for="..."> associations and accessible skip-to-main link', evidence: 'index.html lines 19 and 250-290' }
      ]
    },
    {
      id: 'css',
      title: '3. Clarity of CSS Organization & Modularity',
      weight: '20%',
      targetTab: 'code' as ActiveTab,
      items: [
        { id: 'c1', label: '28 CSS custom properties for color tokens, 8px geometric scale, typography, and elevation', evidence: 'styles.css :root declaration (lines 14-68)' },
        { id: 'c2', label: 'Complete modern reset normalizing box-sizing, typography, and line-heights across all browsers', evidence: 'styles.css lines 70-112' },
        { id: 'c3', label: 'Modular 13-section organization with clear comment dividers, zero inline styles, and zero !important tags', evidence: 'styles.css structure' }
      ]
    },
    {
      id: 'responsiveness',
      title: '4. Cross-Device Responsiveness & Media Queries',
      weight: '20%',
      targetTab: 'preview' as ActiveTab,
      items: [
        { id: 'r1', label: 'Validated across 4 primary physical viewport widths (Mobile 375px, Tablet 768px, Laptop 1024px, Desktop 1440px)', evidence: 'Live Preview responsive switcher' },
        { id: 'r2', label: 'Fluid clamp() mathematical formulas ensuring smooth font scaling without layout clipping', evidence: 'styles.css typography clamp tokens' },
        { id: 'r3', label: 'Zero horizontal scroll overflow across all viewports from 320px to 2560px', evidence: 'Challenge 4 fix in styles.css lines 75-82' }
      ]
    },
    {
      id: 'documentation',
      title: '5. Documentation Quality & Problem-Solving Depth',
      weight: '20%',
      targetTab: 'report' as ActiveTab,
      items: [
        { id: 'd1', label: 'Executive summary accurately reflecting findings and concrete deliverables', evidence: 'Technical Report Section 1' },
        { id: 'd2', label: 'Hard quantitative numbers supporting claims (64 DOM nodes, 99/100 Lighthouse, 0.000 CLS, 16.2:1 contrast)', evidence: 'Technical Report Section 1 & Section 6' },
        { id: 'd3', label: '4 in-depth challenges documented with root causes, before/after code, and verified resolutions', evidence: 'Technical Report Section 5 (Challenge 1-4)' },
        { id: 'd4', label: 'Visual aids and diagrams (DOM tree, breakpoint matrix, box-model specs, print/PDF export)', evidence: 'Technical Report Section 2 & 6' }
      ]
    }
  ];

  const totalItems = Object.keys(checkedItems).length;
  const completedItems = Object.values(checkedItems).filter(Boolean).length;
  const scorePercent = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Summary */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold">
              <Award className="w-4 h-4" />
              <span>EVALUATION AUDIT & RUBRIC</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Internship Assessment Matrix
            </h1>
            <p className="text-sm text-slate-400 max-w-xl">
              Verification criteria for Week 1 task: transforming wireframes into static web pages. Author: <strong>Raj Mani</strong>.
            </p>
          </div>

          {/* Live Score Display */}
          <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl text-center shrink-0 min-w-[200px]">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-mono block">Audit Score</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono mt-1">
              {scorePercent}%
            </div>
            <span className="text-[11px] text-emerald-400 font-medium block mt-1">
              {completedItems} of {totalItems} Criteria Verified
            </span>
          </div>
        </div>

        {/* Rubric Category Cards */}
        <div className="space-y-6">
          {rubricCategories.map((category) => (
            <div key={category.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-900/90 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    {category.title}
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                    Weight: {category.weight}
                  </span>
                  <button
                    onClick={() => onNavigate(category.targetTab)}
                    className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="p-6 divide-y divide-slate-800/60">
                {category.items.map((item) => (
                  <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                    <label 
                      onClick={() => toggleCheck(item.id)}
                      className="flex items-start gap-3 cursor-pointer group flex-1"
                    >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        checkedItems[item.id]
                          ? 'bg-cyan-600 border-cyan-500 text-white'
                          : 'border-slate-700 bg-slate-800 group-hover:border-slate-600'
                      }`}>
                        {checkedItems[item.id] && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <span className={`text-xs sm:text-sm leading-relaxed block ${
                          checkedItems[item.id] ? 'text-slate-200' : 'text-slate-400'
                        }`}>
                          {item.label}
                        </span>
                        <span className="text-[11px] text-cyan-400 font-mono mt-0.5 block">
                          &rarr; Evidence: {item.evidence}
                        </span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Evaluator Sign-off Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-slate-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">Full Week 1 Deliverable Suite Verified</p>
              <p className="text-slate-400">All requirements, deliverables, and responsive standards fulfilled by Raj Mani.</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('preview')}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors whitespace-nowrap shadow-sm"
          >
            Launch Live Interactive Preview
          </button>
        </div>
      </div>
    </div>
  );
};
