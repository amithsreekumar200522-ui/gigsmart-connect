import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockWorkers, mockReviews } from "@/lib/mockData";
import { formatCurrency } from "@/lib/formatCurrency";
import { Star, Shield, MapPin, Clock, Zap, MessageSquare, CheckCircle } from "lucide-react";

const WorkerProfilePage = () => {
  const { id } = useParams();
  const worker = mockWorkers.find((w) => w.id === id) || mockWorkers[0];
  const reviews = mockReviews.filter((r) => r.reviewee.id === worker.user.id);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container-app py-8 flex-1 max-w-4xl">
        <div className="glass-card p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative">
              <img src={worker.user.avatar} alt="" className="w-24 h-24 rounded-2xl bg-secondary" />
              {worker.isOnline && <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-accent border-2 border-card" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold">{worker.user.firstName} {worker.user.lastName}</h1>
                {worker.identityVerified && <Shield className="w-5 h-5 text-primary" />}
              </div>
              <p className="text-sm text-muted-foreground mb-3">{worker.user.address.city}, {worker.user.address.state}</p>
              <p className="text-sm text-foreground mb-4">{worker.bio}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-warning text-warning" />{worker.averageRating} ({worker.totalReviews} reviews)</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-accent" />{worker.totalJobsCompleted} jobs</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-muted-foreground" />{worker.serviceRadius} km radius</span>
                <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-primary" />{formatCurrency(worker.hourlyRate.min)}-{formatCurrency(worker.hourlyRate.max)}/hr</span>
              </div>
            </div>
            <button className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 self-start">
              <MessageSquare className="w-4 h-4" /> Contact
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="glass-card p-6">
            <h2 className="font-semibold mb-4">Skills</h2>
            <div className="space-y-3">
              {worker.skills.map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{s.name}</span>
                  <span className="text-xs text-muted-foreground">{s.experienceYears} years</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-6">
            <h2 className="font-semibold mb-4">Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Response Rate", value: `${worker.responseRate}%` },
                { label: "Completion Rate", value: `${worker.completionRate}%` },
                { label: "Total Earnings", value: formatCurrency(worker.totalEarnings) },
                { label: "Total Reviews", value: worker.totalReviews },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-lg font-semibold">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card p-6 mb-6">
          <h2 className="font-semibold mb-4">Availability</h2>
          <div className="grid grid-cols-7 gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
              const avail = worker.availability[day];
              return (
                <div key={day} className={`p-3 rounded-lg text-center text-xs ${avail ? "bg-accent/10 text-accent" : "bg-secondary text-muted-foreground"}`}>
                  <p className="font-medium mb-1">{day}</p>
                  <p>{avail ? `${avail.start}-${avail.end}` : "Off"}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="font-semibold mb-4">Reviews ({reviews.length})</h2>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r.id} className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={r.reviewer.avatar} alt="" className="w-8 h-8 rounded-full bg-secondary" />
                    <div>
                      <p className="text-sm font-medium">{r.reviewer.firstName} {r.reviewer.lastName}</p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < r.rating ? "fill-warning text-warning" : "text-muted-foreground"}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{r.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No reviews yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WorkerProfilePage;
