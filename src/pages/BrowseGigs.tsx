import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GigCard from "@/components/GigCard";
import { mockGigs, serviceCategories } from "@/lib/mockData";
import { Search, SlidersHorizontal } from "lucide-react";

const BrowseGigs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [urgency, setUrgency] = useState("");

  const filtered = mockGigs.filter((g) => {
    const matchSearch = !search || `${g.title} ${g.description}`.toLowerCase().includes(search.toLowerCase());
    const matchCat = !category || g.category === category;
    const matchUrg = !urgency || g.urgency === urgency;
    return matchSearch && matchCat && matchUrg;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container-app py-8 flex-1">
        <h1 className="text-2xl font-bold mb-2">Browse Gigs</h1>
        <p className="text-sm text-muted-foreground mb-6">Find gigs that match your skills</p>

        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Search gigs..." />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setCategory("")} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${!category ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>All</button>
          {serviceCategories.slice(0, 8).map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${category === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{c}</button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-4">{filtered.length} gigs found</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((g) => <GigCard key={g.id} gig={g} />)}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrowseGigs;
