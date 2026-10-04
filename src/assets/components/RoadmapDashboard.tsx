import { ArrowLeft, CheckCircle2, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';

interface RoadmapProps {
  data: {
    dream: string;
    sliders: Record<string, number>;
  };
  onReset: () => void;
}

export default function RoadmapDashboard({ data, onReset }: RoadmapProps) {
  return (
    <div className="max-w-3xl w-full mx-auto bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-slate-700 shadow-2xl space-y-6 animate-fade-in">
      <div className="flex justify-between items-center border-b border-slate-700/60 pb-4">
        <div>
          <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Audit Verified
          </span>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mt-1">
            Your Reality-Checked Roadmap
          </h1>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700/50 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Reset Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-3 bg-slate-900 p-4 rounded-xl border border-slate-700/40">
          <h3 className="text-sm font-bold text-teal-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" /> 1. Refined Vision Statement
          </h3>
          <p className="text-slate-300 text-xs mt-1.5 italic leading-relaxed">
            "Originally driven by absolute validation confidence ({data.sliders.confidence}%), this customized deployment map locks down short-term tactical milestones to stabilize operations before market expansion."
          </p>
        </div>

        <div className="md:col-span-2 bg-slate-900 p-4 rounded-xl border border-slate-700/40">
          <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" /> 2. Safeguards Checklist
          </h3>
          <div className="space-y-2 mt-2 text-xs text-slate-300">
            <p>✅ <strong>Execution Grounding:</strong> Mapped out immediate step milestones instead of future celebration loops.</p>
            <p>✅ <strong>Operational Contingency:</strong> Addressed critical ecosystem vulnerability to withstand sudden supply chain gaps.</p>
            <p>✅ <strong>Scope Expansion:</strong> Opened channels from high-focus tunnels directly into reality landscape testing.</p>
          </div>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-700/40">
          <h3 className="text-sm font-bold text-teal-400 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-400" /> 3. Next Steps
          </h3>
          <div className="space-y-3 mt-2 text-[11px] text-slate-300">
            <p><strong>1. Build Asset Minimums:</strong> Construct immediate, bare-bones system blocks.</p>
            <p><strong>2. Lock Logistical Rates:</strong> Verify operating costs instead of project guessing.</p>
            <p><strong>3. Target Local Test Node:</strong> Gather direct execution metrics.</p>
          </div>
        </div>
      </div>

      <div className="bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-xl flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        <p className="text-[11px] text-slate-400">
          Your strategic metrics have officially adjusted from blind optimism into a structured execution workflow. Defend this well during your presentation!
        </p>
      </div>
    </div>
  );
}