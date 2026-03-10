import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

const Footer = () => (
  <footer className="bg-card border-t border-border mt-auto">
    <div className="container-app py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">GigSmart</span>
          </div>
          <p className="text-sm text-muted-foreground">Connecting you with trusted local service professionals. Workers keep 95% of every payment.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">For Clients</h4>
          <div className="space-y-2">
            <Link to="/browse-workers" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Find Workers</Link>
            <Link to="/post-gig" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Post a Gig</Link>
            <Link to="/browse-gigs" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Browse Gigs</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">For Workers</h4>
          <div className="space-y-2">
            <Link to="/register" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Join as Worker</Link>
            <Link to="/browse-gigs" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Find Gigs</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Company</h4>
          <div className="space-y-2">
            <Link to="/about" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
        © 2026 GigSmart. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
