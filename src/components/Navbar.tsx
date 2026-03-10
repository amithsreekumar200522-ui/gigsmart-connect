import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Bell, Menu, X, Briefcase, LogOut, User, LayoutDashboard } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { user, isAuthenticated, logout, notifications } = useAuthStore();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const dashboardPath = user?.role === "admin" ? "/admin" : user?.role === "worker" ? "/worker-dashboard" : "/client-dashboard";

  return (
    <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-lg border-b border-border">
      <div className="container-app">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">GigSmart</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/browse-gigs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Browse Gigs</Link>
            <Link to="/browse-workers" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Find Workers</Link>
            <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to={dashboardPath} className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <div className="flex items-center gap-2 pl-2 border-l border-border">
                  <img src={user?.avatar} alt="" className="w-8 h-8 rounded-full bg-secondary" />
                  <span className="text-sm font-medium">{user?.firstName}</span>
                  <button onClick={handleLogout} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Log In</Link>
                <Link to="/register" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Sign Up</Link>
              </>
            )}
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-border space-y-3">
            <Link to="/browse-gigs" className="block text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Browse Gigs</Link>
            <Link to="/browse-workers" className="block text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Find Workers</Link>
            <Link to="/about" className="block text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>About</Link>
            {isAuthenticated ? (
              <>
                <Link to={dashboardPath} className="block text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="block text-sm font-medium text-destructive">Log Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Log In</Link>
                <Link to="/register" className="block text-sm font-medium text-primary" onClick={() => setMobileOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
