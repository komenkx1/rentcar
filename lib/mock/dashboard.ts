export interface AdminDashboardStats {
  total_vehicles: number;
  available_vehicles: number;
  rented_vehicles: number;
  service_vehicles: number;
  total_bookings: number;
  pending_bookings: number;
  active_bookings: number;
  completed_bookings: number;
  monthly_revenue: number;
  pending_payments: number;
  total_customers: number;
  revenue_trend: { label: string; value: number }[];
  fleet_utilization: number;
}

export const MOCK_ADMIN_DASHBOARD: AdminDashboardStats = {
  total_vehicles: 12,
  available_vehicles: 8,
  rented_vehicles: 1,
  service_vehicles: 1,
  total_bookings: 42,
  pending_bookings: 3,
  active_bookings: 2,
  completed_bookings: 35,
  monthly_revenue: 48750000,
  pending_payments: 2,
  total_customers: 28,
  revenue_trend: [
    { label: "Jul", value: 32500000 },
    { label: "Agu", value: 38000000 },
    { label: "Sep", value: 42000000 },
    { label: "Okt", value: 45000000 },
    { label: "Nov", value: 51000000 },
    { label: "Des", value: 48750000 },
  ],
  fleet_utilization: 72,
};

export interface OwnerDashboardStats {
  total_revenue: number;
  monthly_revenue: number;
  fleet_size: number;
  fleet_utilization: number;
  avg_daily_rate: number;
  total_bookings: number;
  operational_cost: number;
  profit_margin: number;
  revenue_per_vehicle: { label: string; value: number }[];
  monthly_growth: number;
}

export const MOCK_OWNER_DASHBOARD: OwnerDashboardStats = {
  total_revenue: 285000000,
  monthly_revenue: 48750000,
  fleet_size: 12,
  fleet_utilization: 72,
  avg_daily_rate: 680000,
  total_bookings: 42,
  operational_cost: 15200000,
  profit_margin: 68.8,
  revenue_per_vehicle: [
    { label: "Fortuner", value: 38000000 },
    { label: "Pajero", value: 32500000 },
    { label: "Civic", value: 28500000 },
    { label: "Innova", value: 26000000 },
    { label: "HR-V", value: 22000000 },
    { label: "Stargazer", value: 19500000 },
  ],
  monthly_growth: 12.5,
};

export interface RecentActivity {
  id: number;
  type: "booking" | "payment" | "vehicle" | "user";
  message: string;
  timestamp: Date;
}

export const MOCK_RECENT_ACTIVITY: RecentActivity[] = [
  { id: 1, type: "booking", message: "Andi Prasetyo memesan Toyota Avanza", timestamp: new Date("2025-12-08T14:30:00") },
  { id: 2, type: "payment", message: "Pembayaran DP untuk #C3D4 dikonfirmasi", timestamp: new Date("2025-12-08T10:15:00") },
  { id: 3, type: "vehicle", message: "Honda HR-V masuk jadwal servis berkala", timestamp: new Date("2025-12-07T16:00:00") },
  { id: 4, type: "booking", message: "Citra Lestari menyelesaikan penyewaan Avanza", timestamp: new Date("2025-11-12T18:00:00") },
  { id: 5, type: "user", message: "Doni Kusuma mendaftar sebagai customer baru", timestamp: new Date("2025-11-10T09:20:00") },
  { id: 6, type: "booking", message: "Budi Hartono booking Fortuner untuk liburan", timestamp: new Date("2025-11-20T11:45:00") },
];
