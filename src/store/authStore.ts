import { create } from "zustand";
import { User, mockUsers, mockNotifications, Notification } from "@/lib/mockData";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  notifications: Notification[];
  login: (email: string, password: string) => boolean;
  register: (data: Partial<User> & { password: string }) => boolean;
  logout: () => void;
  markNotificationRead: (id: string) => void;
  switchRole: (role: "client" | "worker" | "admin") => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  notifications: mockNotifications,

  login: (email: string, _password: string) => {
    const found = mockUsers.find((u) => u.email === email);
    if (found) {
      set({ user: found, isAuthenticated: true });
      return true;
    }
    // Default: log in as first client
    set({ user: mockUsers[0], isAuthenticated: true });
    return true;
  },

  register: (data) => {
    const newUser: User = {
      id: `u${Date.now()}`,
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      phone: data.phone || "",
      role: data.role || "client",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.firstName}`,
      location: { lat: 28.6139, lng: 77.209 },
      address: { city: "New Delhi", state: "Delhi", pincode: "110001" },
      createdAt: new Date().toISOString(),
    };
    set({ user: newUser, isAuthenticated: true });
    return true;
  },

  logout: () => set({ user: null, isAuthenticated: false }),

  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
    })),

  // For demo purposes
  switchRole: (role) => {
    const found = mockUsers.find((u) => u.role === role);
    if (found) set({ user: found, isAuthenticated: true });
  },
}));
