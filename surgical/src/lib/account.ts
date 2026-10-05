import accountJson from "@/data/account.json";
import type {
  AccountData,
  AccountOrder,
  OrderStatus,
  SavedAddress,
} from "./types";

const account = accountJson as AccountData;

export async function getProfile() {
  return account.profile;
}

export async function getAddresses() {
  return account.addresses;
}

export async function getOrders() {
  return account.orders;
}

export async function getOrder(id: string): Promise<AccountOrder | undefined> {
  return account.orders.find((order) => order.id === id);
}

export async function getNotifications() {
  return account.notifications;
}

export function orderTotal(order: AccountOrder): number {
  return order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatOrderDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function addressById(
  addresses: SavedAddress[],
  id: string
): SavedAddress | undefined {
  return addresses.find((address) => address.id === id);
}

export const orderStatusClass: Record<OrderStatus, string> = {
  Processing: "bg-amber-50 text-amber-800",
  Shipped: "bg-[#E9FAF6] text-[#087F8C]",
  Delivered: "bg-emerald-50 text-emerald-800",
};
