import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCard from "@/components/BookingCard";
import { mockWorkers, mockBookings, mockGigs } from "@/lib/mockData";
import { useAuthStore } from "@/store/authStore";
import { DollarSign, Star, Briefcase, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/formatCurrency";
import GigCard from "@/components/GigCard";

const WorkerDashboard = () => {
  const { user } = useAuthStore();
  const worker = mockWorkers.find((w) => w.user.id === user?.id) || mockWorkers[0];
  const myBookings = mockBookings.filter((b) => b.worker.id === worker.id);
  const openGigs = mockGigs.filter((g) => g.status === "open");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container-app py-8 flex-1">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {worker.user.firstName}</h1>
            <p className="text-sm text-muted-foreground">Your worker dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${worker.isOnline ? "bg-accent" : "bg-muted-foreground"}`} />
            <span className="text-sm font-medium">{worker.isOnline ? "Online" : "Offline"}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Earnings", value: formatCurrency(worker.totalEarnings), icon: DollarSign, color: "text-accent" },
            { label: "Jobs Completed", value: worker.totalJobsCompleted, icon: Briefcase, color: "text-primary" },
            { label: "Avg Rating", value: worker.averageRating, icon: Star, color: "text-warning" },
            { label: "Completion Rate", value: `${worker.completionRate}%`, icon: TrendingUp, color: "text-accent" },
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
            <h2 className="text-lg font-semibold mb-4">Available Gigs Nearby</h2>
            <div className="space-y-3">
              {openGigs.slice(0, 4).map((g) => <GigCard key={g.id} gig={g} />)}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">My Bookings</h2>
            <div className="space-y-3">
              {myBookings.length > 0 ? myBookings.map((b) => <BookingCard key={b.id} booking={b} />) : (
                <div className="glass-card p-8 text-center">
                  <p className="text-muted-foreground text-sm">No active bookings. Apply to gigs to get started!</p>
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

export default WorkerDashboard;
