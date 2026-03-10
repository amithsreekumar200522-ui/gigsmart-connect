import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { serviceCategories } from "@/lib/mockData";
import { Sparkles } from "lucide-react";

const PostGig = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", description: "", category: "", budgetMin: "", budgetMax: "",
    durationType: "fixed", estimatedDuration: "", scheduledDate: "", urgency: "medium", address: "",
  });
  const [aiPrice, setAiPrice] = useState<number | null>(null);

  const update = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  const suggestPrice = () => {
    const min = parseInt(form.budgetMin) || 500;
    const max = parseInt(form.budgetMax) || 2000;
    setAiPrice(Math.round((min + max) * 0.6));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/client-dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container-app py-8 flex-1 max-w-2xl">
        <h1 className="text-2xl font-bold mb-2">Post a New Gig</h1>
        <p className="text-sm text-muted-foreground mb-8">Describe your task and find the right professional</p>

        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Gig Title *</label>
            <input type="text" value={form.title} onChange={(e) => update("title", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. Fix Leaking Kitchen Faucet" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Description *</label>
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={4} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="Describe the work needed in detail..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Category *</label>
              <select value={form.category} onChange={(e) => update("category", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Select category</option>
                {serviceCategories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Urgency</label>
              <select value={form.urgency} onChange={(e) => update("urgency", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                {["low", "medium", "high", "urgent"].map((u) => <option key={u} value={u}>{u.charAt(0).toUpperCase() + u.slice(1)}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Budget Range (₹) *</label>
            <div className="grid grid-cols-2 gap-4">
              <input type="number" value={form.budgetMin} onChange={(e) => update("budgetMin", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Min" />
              <input type="number" value={form.budgetMax} onChange={(e) => update("budgetMax", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Max" />
            </div>
            {form.budgetMin && form.budgetMax && (
              <button type="button" onClick={suggestPrice} className="mt-2 text-sm text-primary font-medium flex items-center gap-1.5 hover:underline">
                <Sparkles className="w-3.5 h-3.5" /> Get AI price suggestion
              </button>
            )}
            {aiPrice && (
              <div className="mt-2 p-3 rounded-lg bg-accent/10 text-accent text-sm font-medium">
                🤖 AI Suggested Price: ₹{aiPrice.toLocaleString()}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Estimated Duration</label>
              <input type="text" value={form.estimatedDuration} onChange={(e) => update("estimatedDuration", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. 2 hours" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Scheduled Date</label>
              <input type="date" value={form.scheduledDate} onChange={(e) => update("scheduledDate", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Location / Address *</label>
            <input type="text" value={form.address} onChange={(e) => update("address", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. Connaught Place, New Delhi" />
          </div>

          <button type="submit" className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
            Post Gig
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PostGig;
