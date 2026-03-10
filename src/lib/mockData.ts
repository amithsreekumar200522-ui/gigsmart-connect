export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "client" | "worker" | "admin";
  avatar: string;
  location: { lat: number; lng: number };
  address: { city: string; state: string; pincode: string };
  createdAt: string;
}

export interface WorkerProfile {
  id: string;
  user: User;
  bio: string;
  skills: { name: string; experienceYears: number }[];
  serviceCategories: string[];
  hourlyRate: { min: number; max: number };
  availability: Record<string, { start: string; end: string } | null>;
  serviceRadius: number;
  averageRating: number;
  totalReviews: number;
  totalJobsCompleted: number;
  totalEarnings: number;
  responseRate: number;
  completionRate: number;
  portfolio: string[];
  identityVerified: boolean;
  isOnline: boolean;
}

export interface Gig {
  id: string;
  client: User;
  title: string;
  description: string;
  category: string;
  requiredSkills: string[];
  location: { lat: number; lng: number; address: string };
  budgetMin: number;
  budgetMax: number;
  suggestedPrice: number;
  durationType: "hourly" | "fixed";
  estimatedDuration: string;
  scheduledDate: string;
  urgency: "low" | "medium" | "high" | "urgent";
  images: string[];
  status: "open" | "assigned" | "in_progress" | "completed" | "cancelled";
  applicants: string[];
  assignedWorker?: string;
  agreedPrice?: number;
  createdAt: string;
}

export interface Booking {
  id: string;
  gig: Gig;
  client: User;
  worker: WorkerProfile;
  agreedPrice: number;
  platformFee: number;
  workerEarnings: number;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  paymentStatus: "pending" | "paid" | "released" | "refunded";
  createdAt: string;
}

export interface Review {
  id: string;
  booking: string;
  reviewer: User;
  reviewee: User;
  rating: number;
  comment: string;
  sentimentScore: number;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: "booking" | "message" | "payment" | "system";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const avatars = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",
];

export const mockUsers: User[] = [
  { id: "u1", firstName: "Rahul", lastName: "Sharma", email: "rahul@email.com", phone: "+91-9876543210", role: "client", avatar: avatars[0], location: { lat: 28.6139, lng: 77.209 }, address: { city: "New Delhi", state: "Delhi", pincode: "110001" }, createdAt: "2024-01-15" },
  { id: "u2", firstName: "Priya", lastName: "Patel", email: "priya@email.com", phone: "+91-9876543211", role: "client", avatar: avatars[1], location: { lat: 19.076, lng: 72.8777 }, address: { city: "Mumbai", state: "Maharashtra", pincode: "400001" }, createdAt: "2024-02-10" },
  { id: "u3", firstName: "Amit", lastName: "Kumar", email: "amit@email.com", phone: "+91-9876543212", role: "worker", avatar: avatars[2], location: { lat: 28.5355, lng: 77.391 }, address: { city: "Noida", state: "UP", pincode: "201301" }, createdAt: "2024-01-20" },
  { id: "u4", firstName: "Sunita", lastName: "Devi", email: "sunita@email.com", phone: "+91-9876543213", role: "worker", avatar: avatars[3], location: { lat: 28.4595, lng: 77.0266 }, address: { city: "Gurugram", state: "Haryana", pincode: "122001" }, createdAt: "2024-03-05" },
  { id: "u5", firstName: "Ravi", lastName: "Singh", email: "ravi@email.com", phone: "+91-9876543214", role: "worker", avatar: avatars[4], location: { lat: 28.7041, lng: 77.1025 }, address: { city: "Delhi", state: "Delhi", pincode: "110007" }, createdAt: "2024-01-10" },
  { id: "u6", firstName: "Meena", lastName: "Gupta", email: "meena@email.com", phone: "+91-9876543215", role: "worker", avatar: avatars[5], location: { lat: 12.9716, lng: 77.5946 }, address: { city: "Bangalore", state: "Karnataka", pincode: "560001" }, createdAt: "2024-02-20" },
  { id: "u7", firstName: "Vikram", lastName: "Tiwari", email: "vikram@email.com", phone: "+91-9876543216", role: "worker", avatar: avatars[6], location: { lat: 19.076, lng: 72.8777 }, address: { city: "Mumbai", state: "Maharashtra", pincode: "400002" }, createdAt: "2024-04-01" },
  { id: "u8", firstName: "Admin", lastName: "User", email: "admin@gigsmart.com", phone: "+91-9876543217", role: "admin", avatar: avatars[7], location: { lat: 28.6139, lng: 77.209 }, address: { city: "New Delhi", state: "Delhi", pincode: "110001" }, createdAt: "2024-01-01" },
];

export const mockWorkers: WorkerProfile[] = [
  {
    id: "w1", user: mockUsers[2], bio: "Experienced plumber with 8+ years in residential and commercial plumbing. Specializing in leak repairs, pipe installations, and bathroom renovations.",
    skills: [{ name: "Plumbing", experienceYears: 8 }, { name: "Pipe Fitting", experienceYears: 6 }, { name: "Bathroom Renovation", experienceYears: 4 }],
    serviceCategories: ["Plumbing", "Home Repair"], hourlyRate: { min: 300, max: 800 },
    availability: { Mon: { start: "08:00", end: "18:00" }, Tue: { start: "08:00", end: "18:00" }, Wed: { start: "08:00", end: "18:00" }, Thu: { start: "08:00", end: "18:00" }, Fri: { start: "08:00", end: "18:00" }, Sat: { start: "09:00", end: "14:00" }, Sun: null },
    serviceRadius: 15, averageRating: 4.8, totalReviews: 156, totalJobsCompleted: 234, totalEarnings: 485000, responseRate: 95, completionRate: 98,
    portfolio: [], identityVerified: true, isOnline: true,
  },
  {
    id: "w2", user: mockUsers[3], bio: "Professional house cleaner and organizer. I make homes sparkle! Deep cleaning, regular maintenance, and post-construction cleanup.",
    skills: [{ name: "House Cleaning", experienceYears: 5 }, { name: "Deep Cleaning", experienceYears: 5 }, { name: "Organization", experienceYears: 3 }],
    serviceCategories: ["Cleaning", "Home Care"], hourlyRate: { min: 200, max: 500 },
    availability: { Mon: { start: "07:00", end: "17:00" }, Tue: { start: "07:00", end: "17:00" }, Wed: { start: "07:00", end: "17:00" }, Thu: { start: "07:00", end: "17:00" }, Fri: { start: "07:00", end: "17:00" }, Sat: { start: "08:00", end: "13:00" }, Sun: null },
    serviceRadius: 10, averageRating: 4.9, totalReviews: 203, totalJobsCompleted: 312, totalEarnings: 625000, responseRate: 98, completionRate: 99,
    portfolio: [], identityVerified: true, isOnline: true,
  },
  {
    id: "w3", user: mockUsers[4], bio: "Licensed electrician handling all types of electrical work — from wiring to smart home installations. Safety-certified and insured.",
    skills: [{ name: "Electrical Wiring", experienceYears: 10 }, { name: "Smart Home", experienceYears: 3 }, { name: "Panel Installation", experienceYears: 7 }],
    serviceCategories: ["Electrical", "Smart Home"], hourlyRate: { min: 400, max: 1000 },
    availability: { Mon: { start: "09:00", end: "19:00" }, Tue: { start: "09:00", end: "19:00" }, Wed: { start: "09:00", end: "19:00" }, Thu: { start: "09:00", end: "19:00" }, Fri: { start: "09:00", end: "19:00" }, Sat: null, Sun: null },
    serviceRadius: 20, averageRating: 4.7, totalReviews: 89, totalJobsCompleted: 145, totalEarnings: 720000, responseRate: 92, completionRate: 96,
    portfolio: [], identityVerified: true, isOnline: false,
  },
  {
    id: "w4", user: mockUsers[5], bio: "Expert painter with an eye for detail. Interior, exterior, texture painting, and wall art. Transform your space with color!",
    skills: [{ name: "Interior Painting", experienceYears: 7 }, { name: "Texture Painting", experienceYears: 4 }, { name: "Wall Art", experienceYears: 3 }],
    serviceCategories: ["Painting", "Home Decor"], hourlyRate: { min: 350, max: 900 },
    availability: { Mon: { start: "08:00", end: "18:00" }, Tue: { start: "08:00", end: "18:00" }, Wed: { start: "08:00", end: "18:00" }, Thu: { start: "08:00", end: "18:00" }, Fri: { start: "08:00", end: "18:00" }, Sat: { start: "09:00", end: "15:00" }, Sun: null },
    serviceRadius: 12, averageRating: 4.6, totalReviews: 67, totalJobsCompleted: 98, totalEarnings: 390000, responseRate: 88, completionRate: 94,
    portfolio: [], identityVerified: true, isOnline: true,
  },
  {
    id: "w5", user: mockUsers[6], bio: "AC repair and installation specialist. All brands serviced. Annual maintenance contracts available. Quick turnaround guaranteed.",
    skills: [{ name: "AC Repair", experienceYears: 6 }, { name: "AC Installation", experienceYears: 6 }, { name: "Refrigeration", experienceYears: 4 }],
    serviceCategories: ["AC & Appliances", "Home Repair"], hourlyRate: { min: 350, max: 800 },
    availability: { Mon: { start: "08:00", end: "20:00" }, Tue: { start: "08:00", end: "20:00" }, Wed: { start: "08:00", end: "20:00" }, Thu: { start: "08:00", end: "20:00" }, Fri: { start: "08:00", end: "20:00" }, Sat: { start: "09:00", end: "18:00" }, Sun: { start: "10:00", end: "14:00" } },
    serviceRadius: 25, averageRating: 4.5, totalReviews: 134, totalJobsCompleted: 189, totalEarnings: 560000, responseRate: 90, completionRate: 95,
    portfolio: [], identityVerified: false, isOnline: true,
  },
];

export const mockGigs: Gig[] = [
  { id: "g1", client: mockUsers[0], title: "Fix Leaking Kitchen Faucet", description: "Kitchen faucet has been leaking for 2 days. Need someone to fix it ASAP. The faucet is a single-handle mixer tap. May need washer replacement.", category: "Plumbing", requiredSkills: ["Plumbing", "Pipe Fitting"], location: { lat: 28.6139, lng: 77.209, address: "Connaught Place, New Delhi" }, budgetMin: 300, budgetMax: 800, suggestedPrice: 500, durationType: "fixed", estimatedDuration: "2 hours", scheduledDate: "2026-03-12", urgency: "high", images: [], status: "open", applicants: ["w1"], createdAt: "2026-03-09" },
  { id: "g2", client: mockUsers[1], title: "Deep Clean 3BHK Apartment", description: "Need thorough deep cleaning of entire 3BHK apartment including kitchen, bathrooms, balconies, and all rooms. Post-renovation cleaning required.", category: "Cleaning", requiredSkills: ["Deep Cleaning", "House Cleaning"], location: { lat: 19.076, lng: 72.8777, address: "Andheri West, Mumbai" }, budgetMin: 2000, budgetMax: 4000, suggestedPrice: 2800, durationType: "fixed", estimatedDuration: "6 hours", scheduledDate: "2026-03-15", urgency: "medium", images: [], status: "open", applicants: ["w2"], createdAt: "2026-03-08" },
  { id: "g3", client: mockUsers[0], title: "Install Ceiling Fans in 3 Rooms", description: "Need 3 ceiling fans installed in bedrooms. Fans already purchased. Need proper wiring and secure mounting. Old fans to be removed.", category: "Electrical", requiredSkills: ["Electrical Wiring"], location: { lat: 28.6139, lng: 77.209, address: "Lajpat Nagar, New Delhi" }, budgetMin: 800, budgetMax: 1500, suggestedPrice: 1100, durationType: "fixed", estimatedDuration: "3 hours", scheduledDate: "2026-03-14", urgency: "low", images: [], status: "assigned", applicants: ["w3"], assignedWorker: "w3", agreedPrice: 1200, createdAt: "2026-03-07" },
  { id: "g4", client: mockUsers[1], title: "Paint Living Room and Hallway", description: "Repaint living room and hallway. Approximate area 600 sq ft. Walls need minor patching before painting. Prefer Asian Paints Royale.", category: "Painting", requiredSkills: ["Interior Painting"], location: { lat: 19.076, lng: 72.8777, address: "Bandra, Mumbai" }, budgetMin: 5000, budgetMax: 10000, suggestedPrice: 7500, durationType: "fixed", estimatedDuration: "2 days", scheduledDate: "2026-03-20", urgency: "low", images: [], status: "open", applicants: [], createdAt: "2026-03-10" },
  { id: "g5", client: mockUsers[0], title: "AC Service and Gas Refill", description: "Split AC not cooling properly. Needs servicing and possibly gas refill. Brand: Daikin 1.5 ton. Installed 3 years ago.", category: "AC & Appliances", requiredSkills: ["AC Repair"], location: { lat: 28.5355, lng: 77.391, address: "Sector 18, Noida" }, budgetMin: 500, budgetMax: 1500, suggestedPrice: 900, durationType: "fixed", estimatedDuration: "2 hours", scheduledDate: "2026-03-11", urgency: "urgent", images: [], status: "open", applicants: ["w5"], createdAt: "2026-03-10" },
  { id: "g6", client: mockUsers[1], title: "Fix Bathroom Tiles and Grouting", description: "Several tiles in the bathroom are loose and grout is deteriorating. Need re-tiling and fresh grouting for the entire bathroom floor.", category: "Home Repair", requiredSkills: ["Plumbing", "Pipe Fitting"], location: { lat: 19.076, lng: 72.8777, address: "Powai, Mumbai" }, budgetMin: 2000, budgetMax: 5000, suggestedPrice: 3500, durationType: "fixed", estimatedDuration: "1 day", scheduledDate: "2026-03-18", urgency: "medium", images: [], status: "open", applicants: [], createdAt: "2026-03-09" },
];

export const mockBookings: Booking[] = [
  { id: "b1", gig: mockGigs[2], client: mockUsers[0], worker: mockWorkers[2], agreedPrice: 1200, platformFee: 60, workerEarnings: 1140, status: "confirmed", paymentStatus: "paid", createdAt: "2026-03-08" },
  { id: "b2", gig: { ...mockGigs[0], status: "completed" as const }, client: mockUsers[0], worker: mockWorkers[0], agreedPrice: 500, platformFee: 25, workerEarnings: 475, status: "completed", paymentStatus: "released", createdAt: "2026-03-01" },
  { id: "b3", gig: { ...mockGigs[1], status: "completed" as const }, client: mockUsers[1], worker: mockWorkers[1], agreedPrice: 3000, platformFee: 150, workerEarnings: 2850, status: "completed", paymentStatus: "released", createdAt: "2026-02-25" },
];

export const mockReviews: Review[] = [
  { id: "r1", booking: "b2", reviewer: mockUsers[0], reviewee: mockUsers[2], rating: 5, comment: "Amit was fantastic! Fixed the leak in under an hour. Very professional and clean work. Highly recommended!", sentimentScore: 0.95, createdAt: "2026-03-02" },
  { id: "r2", booking: "b3", reviewer: mockUsers[1], reviewee: mockUsers[3], rating: 5, comment: "Sunita did an amazing job cleaning our apartment. It looks brand new! She was thorough and very detail-oriented.", sentimentScore: 0.92, createdAt: "2026-02-26" },
  { id: "r3", booking: "b2", reviewer: mockUsers[2], reviewee: mockUsers[0], rating: 4, comment: "Good client. Clear instructions and timely payment. Would work with again.", sentimentScore: 0.8, createdAt: "2026-03-02" },
];

export const mockNotifications: Notification[] = [
  { id: "n1", type: "booking", title: "New Application", message: "Amit Kumar applied for your gig 'Fix Leaking Kitchen Faucet'", isRead: false, createdAt: "2026-03-10T10:30:00" },
  { id: "n2", type: "payment", title: "Payment Received", message: "₹1,200 payment confirmed for 'Install Ceiling Fans'", isRead: false, createdAt: "2026-03-09T14:20:00" },
  { id: "n3", type: "message", title: "New Message", message: "You have a new message from Sunita Devi", isRead: true, createdAt: "2026-03-08T09:15:00" },
  { id: "n4", type: "system", title: "Profile Verified", message: "Your worker profile has been verified successfully!", isRead: true, createdAt: "2026-03-07T16:45:00" },
];

export const serviceCategories = [
  "Plumbing", "Cleaning", "Electrical", "Painting", "AC & Appliances",
  "Carpentry", "Home Repair", "Gardening", "Pest Control", "Smart Home",
  "Home Decor", "Moving & Packing", "Security Systems", "Interior Design"
];

export const platformStats = {
  totalWorkers: 12500,
  totalClients: 45000,
  totalGigsCompleted: 180000,
  totalCities: 28,
  averageRating: 4.7,
  workerEarningsShare: 95,
};
