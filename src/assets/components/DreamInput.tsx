import React, { useState } from 'react';
import { Sparkles, Brain, Compass, Target } from 'lucide-react';

interface DreamInputProps {
  onNext: (data: { dream: string; sliders: Record<string, number> }) => void;
}

export default function DreamInput({ onNext }: DreamInputProps) {
  const [dream, setDream] = useState('');
  const [confidence, setConfidence] = useState(80);
  const [timeline, setTimeline] = useState(80);
  const [scope, setScope] = useState(30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dream.trim()) return;
    onNext({
      dream,
      sliders: { confidence, timeline, scope }
    });
  };

  return (
    <div className="max-w-2xl w-full mx-auto bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 border border-slate-700 shadow-2xl space-y-6">
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center p-3 bg-teal-500/10 rounded-xl text-teal-400 mb-2 border border-teal-500/20">
          <Brain className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
          The Round Table
        </h1>
        <p className="text-slate-400 mt-2 text-sm">
          Share your plan with the Council to stress-test your vision and discover hidden blind spots.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            What is your big project idea or decision?
          </label>
          <textarea
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            placeholder="e.g., I want to build a premium organic dog food brand online because pet owners love spending money on their dogs..."
            className="w-full h-24 bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all resize-none text-sm"
            required
          />
        </div>

        <div className="space-y-4 bg-slate-900/50 p-5 rounded-xl border border-slate-700/50">
          <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase mb-1">
            Self-Reflection Sliders
          </h3>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="flex items-center text-slate-300 gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-400"/> Confidence Level</span>
              <span className="text-teal-400 font-medium">{confidence}%</span>
            </div>
            <input
              type="range" min="1" max="100" value={confidence}
              onChange={(e) => setConfidence(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="flex items-center text-slate-300 gap-1.5"><Compass className="w-3.5 h-3.5 text-sky-400"/> Timeline Focus</span>
              <span className="text-teal-400 font-medium">{timeline}%</span>
            </div>
            <input
              type="range" min="1" max="100" value={timeline}
              onChange={(e) => setTimeline(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="flex items-center text-slate-300 gap-1.5"><Target className="w-3.5 h-3.5 text-rose-400"/> Scope Width</span>
              <span className="text-teal-400 font-medium">{scope}%</span>
            </div>
            <input
              type="range" min="1" max="100" value={scope}
              onChange={(e) => setScope(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!dream.trim()}
          className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-slate-900 font-bold rounded-xl shadow-lg transition-all duration-200 transform active:scale-[0.98] disabled:opacity-50"
        >
          Enter the Council Room
        </button>
      </form>
    </div>
  );
}