export interface MockPayment {
  id: number;
  booking_id: number;
  booking_code: string;
  amount: number;
  payment_method: string;
  bank_account: string;
  proof_url: string | null;
  status: "pending" | "confirmed" | "rejected";
  confirmed_at: Date | null;
  confirmed_by: string | null;
  notes: string | null;
  created_at: Date;
}

export const MOCK_PAYMENTS: MockPayment[] = [
  {
    id: 1,
    booking_id: 1,
    booking_code: "RCM-2025-A1B2",
    amount: 1050000,
    payment_method: "bank_transfer",
    bank_account: "BCA 8290 1234 567 890 a.n. PT RentCar Indonesia",
    proof_url: null,
    status: "pending",
    confirmed_at: null,
    confirmed_by: null,
    notes: null,
    created_at: new Date("2025-12-08"),
  },
  {
    id: 2,
    booking_id: 2,
    booking_code: "RCM-2025-C3D4",
    amount: 2000000,
    payment_method: "bank_transfer",
    bank_account: "BCA 8290 1234 567 890 a.n. PT RentCar Indonesia",
    proof_url: null,
    status: "confirmed",
    confirmed_at: new Date("2025-11-29"),
    confirmed_by: "admin-1",
    notes: "DP 50% diterima",
    created_at: new Date("2025-11-28"),
  },
  {
    id: 3,
    booking_id: 3,
    booking_code: "RCM-2025-E5F6",
    amount: 10800000,
    payment_method: "bank_transfer",
    bank_account: "BCA 8290 1234 567 890 a.n. PT RentCar Indonesia",
    proof_url: null,
    status: "confirmed",
    confirmed_at: new Date("2025-11-21"),
    confirmed_by: "admin-1",
    notes: "Lunas",
    created_at: new Date("2025-11-20"),
  },
  {
    id: 4,
    booking_id: 4,
    booking_code: "RCM-2025-G7H8",
    amount: 1500000,
    payment_method: "bank_transfer",
    bank_account: "BCA 8290 1234 567 890 a.n. PT RentCar Indonesia",
    proof_url: null,
    status: "confirmed",
    confirmed_at: new Date("2025-11-06"),
    confirmed_by: "admin-1",
    notes: "Lunas",
    created_at: new Date("2025-11-05"),
  },
  {
    id: 5,
    booking_id: 8,
    booking_code: "RCM-2025-O5P6",
    amount: 2250000,
    payment_method: "bank_transfer",
    bank_account: "BCA 8290 1234 567 890 a.n. PT RentCar Indonesia",
    proof_url: null,
    status: "pending",
    confirmed_at: null,
    confirmed_by: null,
    notes: "DP 50%",
    created_at: new Date("2025-12-05"),
  },
];
