export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin" | "owner";
  phone: string;
  is_active: boolean;
  avatar_url: string | null;
  created_at: Date;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "user-1",
    name: "Budi Hartono",
    email: "budi@rentcars.com",
    role: "customer",
    phone: "083456789012",
    is_active: true,
    avatar_url: null,
    created_at: new Date("2025-06-15"),
  },
  {
    id: "user-2",
    name: "Citra Lestari",
    email: "citra@rentcars.com",
    role: "customer",
    phone: "084567890123",
    is_active: true,
    avatar_url: null,
    created_at: new Date("2025-08-20"),
  },
  {
    id: "admin-1",
    name: "Rudi Setiawan",
    email: "rudi@rentcars.com",
    role: "admin",
    phone: "081111222333",
    is_active: true,
    avatar_url: null,
    created_at: new Date("2025-01-10"),
  },
  {
    id: "owner-1",
    name: "Hendra Wijaya",
    email: "hendra@rentcars.com",
    role: "owner",
    phone: "081999888777",
    is_active: true,
    avatar_url: null,
    created_at: new Date("2025-01-01"),
  },
  {
    id: "user-3",
    name: "Doni Kusuma",
    email: "doni@email.com",
    role: "customer",
    phone: "082222333444",
    is_active: false,
    avatar_url: null,
    created_at: new Date("2025-09-05"),
  },
];
