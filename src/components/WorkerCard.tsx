import { Link } from "react-router-dom";
import { WorkerProfile } from "@/lib/mockData";
import { Star, MapPin, Shield, Zap } from "lucide-react";
import { formatCurrency } from "@/lib/formatCurrency";

const WorkerCard = ({ worker }: { worker: WorkerProfile }) => (
  <Link to={`/worker/${worker.id}`} className="glass-card hover-lift p-5 block">
    <div className="flex items-start gap-4">
      <div className="relative">
        <img src={worker.user.avatar} alt={worker.user.firstName} className="w-14 h-14 rounded-full bg-secondary" />
        {worker.isOnline && (
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-accent border-2 border-card" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground truncate">
            {worker.user.firstName} {worker.user.lastName}
          </h3>
          {worker.identityVerified && <Shield className="w-4 h-4 text-primary flex-shrink-0" />}
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">{worker.user.address.city}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="flex items-center gap-1 text-sm font-medium">
            <Star className="w-3.5 h-3.5 fill-warning text-warning" />
            {worker.averageRating}
          </span>
          <span className="text-xs text-muted-foreground">({worker.totalReviews} reviews)</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{worker.totalJobsCompleted} jobs</span>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap gap-1.5 mt-3">
      {worker.serviceCategories.map((cat) => (
        <span key={cat} className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">{cat}</span>
      ))}
    </div>
    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
      <div className="flex items-center gap-1 text-sm">
        <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-muted-foreground">{worker.serviceRadius} km radius</span>
      </div>
      <div className="flex items-center gap-1 text-sm font-semibold text-primary">
        <Zap className="w-3.5 h-3.5" />
        {formatCurrency(worker.hourlyRate.min)} - {formatCurrency(worker.hourlyRate.max)}/hr
      </div>
    </div>
  </Link>
);

export default WorkerCard;
