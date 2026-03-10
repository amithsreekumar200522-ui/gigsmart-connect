import { Link } from "react-router-dom";
import { Gig } from "@/lib/mockData";
import { MapPin, Clock, AlertTriangle, Calendar } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/formatCurrency";

const urgencyStyles: Record<string, string> = {
  low: "bg-secondary text-secondary-foreground",
  medium: "bg-warning/10 text-warning",
  high: "bg-destructive/10 text-destructive",
  urgent: "bg-destructive text-destructive-foreground",
};

const statusStyles: Record<string, string> = {
  open: "bg-accent/10 text-accent",
  assigned: "bg-primary/10 text-primary",
  in_progress: "bg-warning/10 text-warning",
  completed: "bg-accent text-accent-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};

const GigCard = ({ gig }: { gig: Gig }) => (
  <Link to={`/gig/${gig.id}`} className="glass-card hover-lift p-5 block">
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground truncate">{gig.title}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{gig.description}</p>
      </div>
      <span className={`px-2 py-1 rounded-md text-xs font-medium flex-shrink-0 ${statusStyles[gig.status]}`}>
        {gig.status.replace("_", " ")}
      </span>
    </div>
    <div className="flex flex-wrap gap-1.5 mt-3">
      <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">{gig.category}</span>
      <span className={`px-2 py-0.5 rounded-md text-xs font-medium flex items-center gap-1 ${urgencyStyles[gig.urgency]}`}>
        <AlertTriangle className="w-3 h-3" />
        {gig.urgency}
      </span>
    </div>
    <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5" />
        {gig.location.address.split(",")[0]}
      </span>
      <span className="flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5" />
        {gig.estimatedDuration}
      </span>
      <span className="flex items-center gap-1.5">
        <Calendar className="w-3.5 h-3.5" />
        {formatDate(gig.scheduledDate)}
      </span>
      <span className="text-sm font-semibold text-foreground">
        {formatCurrency(gig.budgetMin)} - {formatCurrency(gig.budgetMax)}
      </span>
    </div>
    {gig.suggestedPrice > 0 && (
      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-sm">
        <span className="text-muted-foreground">AI Suggested Price</span>
        <span className="font-semibold text-accent">{formatCurrency(gig.suggestedPrice)}</span>
      </div>
    )}
  </Link>
);

export default GigCard;
