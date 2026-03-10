import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockGigs, mockWorkers } from "@/lib/mockData";
import { formatCurrency, formatDate } from "@/lib/formatCurrency";
import { MapPin, Clock, Calendar, AlertTriangle, Users, Sparkles, ArrowRight } from "lucide-react";

const urgencyStyles: Record<string, string> = {
  low: "bg-secondary text-secondary-foreground",
  medium: "bg-warning/10 text-warning",
  high: "bg-destructive/10 text-destructive",
  urgent: "bg-destructive text-destructive-foreground",
};

const GigDetail = () => {
  const { id } = useParams();
  const gig = mockGigs.find((g) => g.id === id) || mockGigs[0];
  const recommendedWorkers = mockWorkers.filter((w) =>
    w.serviceCategories.some((c) => c === gig.category)
  ).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container-app py-8 flex-1 max-w-4xl">
        <div className="glass-card p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{gig.title}</h1>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">{gig.category}</span>
                <span className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 ${urgencyStyles[gig.urgency]}`}>
                  <AlertTriangle className="w-3 h-3" /> {gig.urgency}
                </span>
              </div>
            </div>
            <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${gig.status === "open" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`}>
              {gig.status.replace("_", " ")}
            </span>
          </div>

          <p className="text-sm text-foreground mb-6">{gig.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-3 rounded-lg bg-secondary/50">
              <MapPin className="w-4 h-4 text-muted-foreground mb-1" />
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="text-sm font-medium">{gig.location.address}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <Clock className="w-4 h-4 text-muted-foreground mb-1" />
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="text-sm font-medium">{gig.estimatedDuration}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <Calendar className="w-4 h-4 text-muted-foreground mb-1" />
              <p className="text-xs text-muted-foreground">Scheduled</p>
              <p className="text-sm font-medium">{formatDate(gig.scheduledDate)}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <Users className="w-4 h-4 text-muted-foreground mb-1" />
              <p className="text-xs text-muted-foreground">Applicants</p>
              <p className="text-sm font-medium">{gig.applicants.length}</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/10">
            <div>
              <p className="text-sm text-muted-foreground">Budget</p>
              <p className="text-lg font-bold">{formatCurrency(gig.budgetMin)} - {formatCurrency(gig.budgetMax)}</p>
            </div>
            {gig.suggestedPrice > 0 && (
              <div className="text-right">
                <p className="text-sm text-muted-foreground flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> AI Price</p>
                <p className="text-lg font-bold text-accent">{formatCurrency(gig.suggestedPrice)}</p>
              </div>
            )}
          </div>

          {gig.status === "open" && (
            <button className="w-full mt-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
              Apply to This Gig
            </button>
          )}
        </div>

        {recommendedWorkers.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Recommended Workers</h2>
            <div className="space-y-3">
              {recommendedWorkers.map((w) => (
                <Link key={w.id} to={`/worker/${w.id}`} className="glass-card hover-lift p-4 flex items-center gap-4">
                  <img src={w.user.avatar} alt="" className="w-12 h-12 rounded-full bg-secondary" />
                  <div className="flex-1">
                    <p className="font-medium">{w.user.firstName} {w.user.lastName}</p>
                    <p className="text-xs text-muted-foreground">⭐ {w.averageRating} · {w.totalJobsCompleted} jobs</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">{formatCurrency(w.hourlyRate.min)}/hr</p>
                    <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <p className="text-xs text-muted-foreground">Posted by {gig.client.firstName} {gig.client.lastName} · {formatDate(gig.createdAt)}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GigDetail;
