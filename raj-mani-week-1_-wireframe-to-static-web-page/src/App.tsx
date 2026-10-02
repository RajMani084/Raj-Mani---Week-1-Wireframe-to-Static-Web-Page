/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { LivePreview } from './components/LivePreview';
import { WireframeSpec } from './components/WireframeSpec';
import { CodeExplorer } from './components/CodeExplorer';
import { TechnicalReport } from './components/TechnicalReport';
import { EvaluationRubric } from './components/EvaluationRubric';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('preview');

  // Quick keyboard shortcuts for evaluators (1: Preview, 2: Wireframe, 3: Code, 4: Report, 5: Rubric)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === '1') setActiveTab('preview');
      if (e.key === '2') setActiveTab('wireframe');
      if (e.key === '3') setActiveTab('code');
      if (e.key === '4') setActiveTab('report');
      if (e.key === '5') setActiveTab('rubric');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Bar with Top Bar Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPrintReport={() => window.print()}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'preview' && <LivePreview />}
        {activeTab === 'wireframe' && <WireframeSpec />}
        {activeTab === 'code' && <CodeExplorer />}
        {activeTab === 'report' && (
          <TechnicalReport onPrint={() => window.print()} />
        )}
        {activeTab === 'rubric' && (
          <EvaluationRubric onNavigate={(tab) => setActiveTab(tab)} />
        )}
      </main>
    </div>
  );
}
