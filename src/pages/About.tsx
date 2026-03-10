import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Zap, DollarSign, Users, Heart, Target } from "lucide-react";

const About = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Navbar />
    <div className="flex-1">
      <section className="section-padding text-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container-app max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">About GigSmart</h1>
          <p className="text-lg text-muted-foreground">We're building the fairest gig platform — where local service workers keep 95% of every payment and clients get quality work at fair prices.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-app">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4">GigSmart was born from a simple observation: existing platforms take 20-30% from workers, making it hard for them to earn a living wage. We believe technology should empower workers, not exploit them.</p>
              <p className="text-muted-foreground">With just a 5% platform fee, AI-powered matching, and transparent pricing, we're creating a gig economy that works for everyone.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: DollarSign, title: "95% to Workers", desc: "Industry-leading worker earnings" },
                { icon: Zap, title: "AI-Powered", desc: "Smart matching & fair pricing" },
                { icon: Shield, title: "Verified", desc: "Background-checked workers" },
                { icon: Heart, title: "Community", desc: "Built for local communities" },
              ].map((item) => (
                <div key={item.title} className="glass-card p-4 text-center">
                  <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container-app max-w-4xl">
          <h2 className="text-2xl font-bold mb-8 text-center">How We're Different</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Hyperlocal Focus", desc: "We match you with skilled workers in your neighborhood, reducing travel time and costs." },
              { icon: Zap, title: "AI Price Fairness", desc: "Our ML models suggest fair prices based on job complexity, location, and market rates." },
              { icon: Users, title: "Worker-First", desc: "Workers set their own rates, choose their gigs, and keep 95% of every payment." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    <Footer />
  </div>
);

export default About;
