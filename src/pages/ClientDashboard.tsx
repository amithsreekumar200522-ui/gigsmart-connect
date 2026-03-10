import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GigCard from "@/components/GigCard";
import BookingCard from "@/components/BookingCard";
import { mockGigs, mockBookings, mockUsers } from "@/lib/mockData";
import { useAuthStore } from "@/store/authStore";
import { Plus, Briefcase, Clock, CheckCircle, DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/formatCurrency";

const ClientDashboard = () => {
  const { user } = useAuthStore();
  const myGigs = mockGigs.filter((g) => g.client.id === (user?.id || "u1"));
  const myBookings = mockBookings.filter((b) => b.client.id === (user?.id || "u1"));
  const totalSpent = myBookings.filter((b) => b.status === "completed").reduce((s, b) => s + b.agreedPrice, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container-app py-8 flex-1">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.firstName || "Rahul"}</h1>
            <p className="text-sm text-muted-foreground">Manage your gigs and bookings</p>
          </div>
          <Link to="/post-gig" className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
            <Plus className="w-4 h-4" /> Post Gig
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Gigs", value: myGigs.filter((g) => g.status === "open").length, icon: Briefcase, color: "text-primary" },
            { label: "In Progress", value: myBookings.filter((b) => b.status === "confirmed").length, icon: Clock, color: "text-warning" },
            { label: "Completed", value: myBookings.filter((b) => b.status === "completed").length, icon: CheckCircle, color: "text-accent" },
            { label: "Total Spent", value: formatCurrency(totalSpent), icon: DollarSign, color: "text-foreground" },
          ].map((s) => (
            <div key={s.label} className="glass-card p-4">
              <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">My Gigs</h2>
            <div className="space-y-3">
              {myGigs.length > 0 ? myGigs.map((g) => <GigCard key={g.id} gig={g} />) : (
                <div className="glass-card p-8 text-center">
                  <p className="text-muted-foreground text-sm">No gigs yet. Post your first gig!</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
            <div className="space-y-3">
              {myBookings.length > 0 ? myBookings.map((b) => <BookingCard key={b.id} booking={b} />) : (
                <div className="glass-card p-8 text-center">
                  <p className="text-muted-foreground text-sm">No bookings yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClientDashboard;
