import React, { useState, useEffect, useRef } from 'react';
import { User, ShieldAlert, Sparkles, Send, Brain, Hammer, AlertTriangle, ArrowRight } from 'lucide-react';

interface CouncilChamberProps {
  data: {
    dream: string;
    sliders: Record<string, number>;
  };
  onNext: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'architect' | 'detective' | 'monkey';
  name: string;
  text: string;
  avatar: React.ReactNode;
  bgClass: string;
}

export default function CouncilChamber({ data, onNext }: CouncilChamberProps) {
  const [round, setRound] = useState(1);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'architect',
      name: 'The Grounding Architect',
      avatar: <Hammer className="w-4 h-4 text-sky-400" />,
      bgClass: 'bg-sky-500/10 border-sky-500/20 text-sky-200',
      text: `Welcome to the Chamber! I reviewed your project proposal: "${data.dream}". Looking at your timeline focus profile (${data.sliders.timeline}%), you are heavily anticipating future success. Let's make sure we ground our feet first. What is the absolute first practical step you plan to execute tomorrow morning to make this a reality?`
    }
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const triggerCouncilResponse = (userMsg: string, currentRound: number) => {
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      if (currentRound === 1) {
        // Round 1 Council response: The Detective steps up
        setMessages(prev => [
          ...prev,
          {
            id: `detective-${Date.now()}`,
            sender: 'detective',
            name: 'The Blind-Spot Detective',
            avatar: <Brain className="w-4 h-4 text-purple-400" />,
            bgClass: 'bg-purple-500/10 border-purple-500/20 text-purple-200',
            text: `Fascinating execution details. However, your confidence is marked high at ${data.sliders.confidence}%. I detect some potential tunnel vision here regarding customer acquisition and operating expenses. Have you thoroughly validated if people will actually pay premium prices for this, or are we hoping they will?`
          }
        ]);
        setRound(2);
      } else if (currentRound === 2) {
        // Round 2 Council response: The Chaos Monkey throws a curveball
        setMessages(prev => [
          ...prev,
          {
            id: `monkey-${Date.now()}`,
            sender: 'monkey',
            name: 'Constructive Chaos Monkey',
            avatar: <AlertTriangle className="w-4 h-4 text-amber-400" />,
            bgClass: 'bg-amber-500/10 border-amber-500/20 text-amber-200',
            text: `Boom! Great adjustment strategies! But let's break the matrix for a second. Imagine your core resource chain or main supplier goes completely dark for two straight weeks due to a strike or unexpected regulation. What is your fallback mechanism so your dream doesn't crash on day one?`
          }
        ]);
        setRound(3);
      } else if (currentRound === 3) {
        // Round 3 Council response: Wrap up and clear path
        setMessages(prev => [
          ...prev,
          {
            id: `wrap-${Date.now()}`,
            sender: 'architect',
            name: 'The Grounding Architect',
            avatar: <Hammer className="w-4 h-4 text-sky-400" />,
            bgClass: 'bg-sky-500/10 border-sky-500/20 text-sky-200',
            text: "Excellent reflection. You've faced the scrutiny of the council, addressed your overconfidence blind spots, and balanced your future ideals with tactical survival logic. Your roadmap file is compiled and ready for deployment."
          }
        ]);
      }
    }, 1500);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping || round > 3) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      name: 'You (Project Innovator)',
      avatar: <User className="w-4 h-4 text-teal-400" />,
      bgClass: 'bg-teal-500/10 border-teal-500/20 text-teal-200',
      text: inputText
    };

    setMessages(prev => [...prev, userMessage]);
    const currentText = inputText;
    setInputText('');

    triggerCouncilResponse(currentText, round);
  };

  const isConsultationComplete = messages.some(m => m.id.startsWith('wrap-'));

  return (
    <div className="max-w-3xl w-full mx-auto bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col h-[600px] animate-fade-in">
      
      {/* Header & Status Indicator */}
      <div className="bg-slate-900/80 border-b border-slate-700/60 p-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
          <div>
            <h2 className="text-sm font-bold text-slate-200">The Council Consultation Chamber</h2>
            <p className="text-xs text-slate-400">Stress-testing: {data.dream.substring(0, 40)}...</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full border border-slate-700 text-xs">
          <span className="text-slate-400 font-medium">Progress:</span>
          <span className="text-teal-400 font-bold">{isConsultationComplete ? 'Complete' : `Round ${round} of 3`}</span>
        </div>
      </div>

      {/* Message Feed Canvas */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 min-h-0 bg-slate-950/40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 p-4 rounded-xl border ${msg.bgClass} max-w-[85%] transition-all ${
              msg.sender === 'user' ? 'ml-auto border-teal-500/30' : 'mr-auto'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 shadow-inner">
              {msg.avatar}
            </div>
            <div className="space-y-1">
              <span className="block text-xs font-bold uppercase tracking-wider opacity-60">
                {msg.name}
              </span>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}

        {/* Loading Bubble */}
        {isTyping && (
          <div className="flex gap-4 p-4 rounded-xl border bg-slate-900/40 border-slate-800 mr-auto max-w-[40%] animate-pulse">
            <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-slate-500" />
            </div>
            <div className="flex items-center gap-1.5 py-2">
              <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input or Route Completion Action Block */}
      <div className="p-4 bg-slate-900/60 border-t border-slate-700/60 shrink-0">
        {isConsultationComplete ? (
          <button
            onClick={onNext}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01]"
          >
            Reveal Reality-Checked Roadmap <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isTyping}
              placeholder={isTyping ? "The Council is deliberating..." : "Type your answer to defend your plan..."}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 disabled:opacity-50"
              required
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="bg-teal-500 hover:bg-teal-600 text-slate-900 px-5 rounded-xl flex items-center justify-center transition-all disabled:opacity-40 disabled:pointer-events-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

    </div>
  );
}