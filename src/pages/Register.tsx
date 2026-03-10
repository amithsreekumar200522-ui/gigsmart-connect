import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Navbar from "@/components/Navbar";
import { Briefcase } from "lucide-react";

const Register = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "", role: "client" as "client" | "worker" });
  const [error, setError] = useState("");
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const update = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.password) { setError("Please fill in required fields"); return; }
    register({ ...form });
    navigate(form.role === "worker" ? "/worker-dashboard" : "/client-dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-sm text-muted-foreground mt-1">Join GigSmart today</p>
          </div>
          <div className="glass-card p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}
              <div>
                <label className="block text-sm font-medium mb-2">I want to</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["client", "worker"] as const).map((r) => (
                    <button key={r} type="button" onClick={() => update("role", r)}
                      className={`py-2.5 rounded-lg text-sm font-medium border transition-colors ${form.role === r ? "border-primary bg-primary/10 text-primary" : "border-input bg-background text-muted-foreground"}`}>
                      {r === "client" ? "Hire Workers" : "Find Work"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5">First Name *</label>
                  <input type="text" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Last Name</label>
                  <input type="text" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Email *</label>
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Phone</label>
                <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="+91-9876543210" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Password *</label>
                <input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Min 8 characters" />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">Create Account</button>
            </form>
          </div>
          <p className="text-sm text-center mt-4 text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
