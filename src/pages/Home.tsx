import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkerCard from "@/components/WorkerCard";
import GigCard from "@/components/GigCard";
import { mockWorkers, mockGigs, platformStats, serviceCategories } from "@/lib/mockData";
import { useAuthStore } from "@/store/authStore";
import {
  ArrowRight, Shield, Zap, DollarSign, Users, Briefcase, Star, MapPin,
  Wrench, Paintbrush, Plug, Wind, Sparkles, Hammer
} from "lucide-react";

const categoryIcons: Record<string, typeof Wrench> = {
  Plumbing: Wrench, Cleaning: Sparkles, Electrical: Plug,
  Painting: Paintbrush, "AC & Appliances": Wind, Carpentry: Hammer,
};

const Home = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container-app py-20 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <Zap className="w-3.5 h-3.5" />
              Workers keep 95% of every payment
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
              Find Trusted Local
              <span className="text-primary"> Service Pros</span>
              <br />in Minutes
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              GigSmart connects you with verified plumbers, electricians, cleaners, and more. AI-powered matching, fair pricing, and real-time tracking.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              {isAuthenticated ? (
                <>
                  <Link to="/post-gig" className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
                    Post a Gig <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/browse-workers" className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-colors">
                    Browse Workers
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register" className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/browse-gigs" className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-colors">
                    Browse Gigs
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-40 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card">
        <div className="container-app py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Service Workers", value: `${(platformStats.totalWorkers / 1000).toFixed(1)}K+`, icon: Users },
              { label: "Gigs Completed", value: `${(platformStats.totalGigsCompleted / 1000).toFixed(0)}K+`, icon: Briefcase },
              { label: "Average Rating", value: `${platformStats.averageRating}★`, icon: Star },
              { label: "Cities", value: `${platformStats.totalCities}+`, icon: MapPin },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <s.icon className="w-5 h-5 text-primary mb-1" />
                <span className="text-2xl font-bold text-foreground">{s.value}</span>
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding">
        <div className="container-app">
          <h2 className="text-2xl font-bold text-foreground mb-8">Popular Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {serviceCategories.slice(0, 6).map((cat) => {
              const Icon = categoryIcons[cat] || Wrench;
              return (
                <Link key={cat} to={`/browse-workers?category=${cat}`} className="glass-card hover-lift p-4 flex flex-col items-center gap-2 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{cat}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-card">
        <div className="container-app">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Post Your Gig", desc: "Describe what you need, set your budget, and let AI suggest fair pricing.", icon: Briefcase },
              { step: "2", title: "Get Matched", desc: "Our AI matches you with the best local workers based on skills, ratings, and availability.", icon: Zap },
              { step: "3", title: "Get It Done", desc: "Track your worker, chat in real-time, and pay securely. Workers keep 95%.", icon: Shield },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Workers */}
      <section className="section-padding">
        <div className="container-app">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Top Workers</h2>
            <Link to="/browse-workers" className="text-sm font-medium text-primary flex items-center gap-1 hover:underline">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockWorkers.slice(0, 3).map((w) => <WorkerCard key={w.id} worker={w} />)}
          </div>
        </div>
      </section>

      {/* Recent Gigs */}
      <section className="section-padding bg-card">
        <div className="container-app">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Recent Gigs</h2>
            <Link to="/browse-gigs" className="text-sm font-medium text-primary flex items-center gap-1 hover:underline">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockGigs.filter((g) => g.status === "open").slice(0, 3).map((g) => <GigCard key={g.id} gig={g} />)}
          </div>
        </div>
      </section>

      {/* Why GigSmart */}
      <section className="section-padding">
        <div className="container-app">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Why GigSmart?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: DollarSign, title: "Fair Pricing", desc: "Workers keep 95% of every payment. Only 5% platform fee." },
              { icon: Shield, title: "Verified Workers", desc: "All workers go through identity verification and background checks." },
              { icon: Zap, title: "AI-Powered", desc: "Smart matching, price suggestions, and demand forecasting powered by ML." },
              { icon: Star, title: "Quality Assured", desc: "Sentiment-analyzed reviews ensure genuine feedback and quality service." },
              { icon: MapPin, title: "Hyperlocal", desc: "Find workers near you with real-time location tracking during jobs." },
              { icon: Users, title: "Community", desc: "Built for local communities to thrive with fair gig work." },
            ].map((item) => (
              <div key={item.title} className="glass-card p-6">
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-app text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">Join thousands of clients and workers already using GigSmart.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="px-6 py-3 rounded-lg bg-card text-foreground font-semibold hover:bg-card/90 transition-colors">
              Sign Up Free
            </Link>
            <Link to="/about" className="px-6 py-3 rounded-lg border-2 border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
