import { Booking } from "@/lib/mockData";
import { formatCurrency, formatDate } from "@/lib/formatCurrency";
import { CheckCircle, Clock, XCircle, ArrowRight } from "lucide-react";

const statusConfig: Record<string, { icon: typeof Clock; className: string }> = {
  pending: { icon: Clock, className: "text-warning" },
  confirmed: { icon: CheckCircle, className: "text-primary" },
  in_progress: { icon: ArrowRight, className: "text-warning" },
  completed: { icon: CheckCircle, className: "text-accent" },
  cancelled: { icon: XCircle, className: "text-destructive" },
};

const BookingCard = ({ booking }: { booking: Booking }) => {
  const config = statusConfig[booking.status];
  const Icon = config.icon;

  return (
    <div className="glass-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-foreground">{booking.gig.title}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Worker: {booking.worker.user.firstName} {booking.worker.user.lastName}
          </p>
        </div>
        <div className={`flex items-center gap-1.5 text-sm font-medium ${config.className}`}>
          <Icon className="w-4 h-4" />
          {booking.status.replace("_", " ")}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4 pt-3 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground">Agreed Price</p>
          <p className="text-sm font-semibold">{formatCurrency(booking.agreedPrice)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Platform Fee (5%)</p>
          <p className="text-sm font-semibold">{formatCurrency(booking.platformFee)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Date</p>
          <p className="text-sm font-semibold">{formatDate(booking.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
