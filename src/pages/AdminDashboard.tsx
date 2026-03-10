import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockUsers, mockBookings, mockGigs, mockWorkers } from "@/lib/mockData";
import { formatCurrency } from "@/lib/formatCurrency";
import { Users, Briefcase, DollarSign, TrendingUp, Shield, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const barData = [
  { month: "Jan", bookings: 120, revenue: 45000 },
  { month: "Feb", bookings: 150, revenue: 58000 },
  { month: "Mar", bookings: 180, revenue: 72000 },
  { month: "Apr", bookings: 165, revenue: 64000 },
  { month: "May", bookings: 200, revenue: 85000 },
  { month: "Jun", bookings: 230, revenue: 95000 },
];

const pieData = [
  { name: "Plumbing", value: 30 },
  { name: "Cleaning", value: 25 },
  { name: "Electrical", value: 20 },
  { name: "Painting", value: 15 },
  { name: "AC & Appliances", value: 10 },
];

const COLORS = ["hsl(239,84%,67%)", "hsl(160,84%,39%)", "hsl(38,92%,50%)", "hsl(280,67%,60%)", "hsl(0,84%,60%)"];

const AdminDashboard = () => {
  const totalRevenue = mockBookings.reduce((s, b) => s + b.platformFee, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container-app py-8 flex-1">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mb-8">Platform overview and management</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Users", value: mockUsers.length, icon: Users, color: "text-primary" },
            { label: "Active Gigs", value: mockGigs.filter((g) => g.status === "open").length, icon: Briefcase, color: "text-accent" },
            { label: "Platform Revenue", value: formatCurrency(totalRevenue * 100), icon: DollarSign, color: "text-accent" },
            { label: "Workers Verified", value: mockWorkers.filter((w) => w.identityVerified).length, icon: Shield, color: "text-primary" },
          ].map((s) => (
            <div key={s.label} className="glass-card p-4">
              <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Monthly Bookings & Revenue</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="bookings" fill="hsl(239,84%,67%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Bookings by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Recent Users</h3>
            <div className="space-y-3">
              {mockUsers.slice(0, 5).map((u) => (
                <div key={u.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <img src={u.avatar} alt="" className="w-9 h-9 rounded-full bg-secondary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{u.firstName} {u.lastName}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${u.role === "admin" ? "bg-destructive/10 text-destructive" : u.role === "worker" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Recent Bookings</h3>
            <div className="space-y-3">
              {mockBookings.map((b) => (
                <div key={b.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div>
                    <p className="text-sm font-medium">{b.gig.title}</p>
                    <p className="text-xs text-muted-foreground">{b.client.firstName} → {b.worker.user.firstName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{formatCurrency(b.agreedPrice)}</p>
                    <p className="text-xs text-muted-foreground">{b.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
