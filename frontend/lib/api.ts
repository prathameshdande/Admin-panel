import { Flat, Room, Bed, Tenant, DashboardItem } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function request<T>(
  endpoint: string,
  method: string = 'GET',
  body?: any,
  force?: boolean
): Promise<T> {
  let url = `${API_BASE}${endpoint}`;
  if (force) url += '?force=true';

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) {
    // Special handling for flat deletion confirmation
    if (data.requiresConfirmation) {
      throw new Error(`CONFIRM:${data.error}`);
    }
    throw new Error(data.error || 'Request failed');
  }
  return data;
}

export const api = {
  // Flats
  getFlats: () => request<Flat[]>('/flats'),
  createFlat: (name: string, address: string) =>
    request<Flat>('/flats', 'POST', { name, address }),
  deleteFlat: (id: number, force?: boolean) =>
    request<void>(`/flats/${id}`, 'DELETE', undefined, force),

  // Rooms
  getRooms: () => request<Room[]>('/rooms'),
  createRoom: (flat_id: number, name: string, capacity: number) =>
    request<Room>('/rooms', 'POST', { flat_id, name, capacity }),

  // Beds
  getBeds: () => request<Bed[]>('/beds'),
  createBed: (room_id: number, name: string) =>
    request<Bed>('/beds', 'POST', { room_id, name }),
  updateBedStatus: (id: number, status: Bed['status']) =>
    request<Bed>(`/beds/${id}/status`, 'PATCH', { status }),

  // Tenants
  getTenants: () => request<Tenant[]>('/tenants'),
  createTenant: (name: string, phone: string) =>
    request<Tenant>('/tenants', 'POST', { name, phone }),
  deleteTenant: (id: number) => request<void>(`/tenants/${id}`, 'DELETE'),

  // Assignments
  assignTenant: (tenant_id: number, bed_id: number) =>
    request<void>('/assignments', 'POST', { tenant_id, bed_id }),

  // Dashboard
  getDashboard: () => request<DashboardItem[]>('/dashboard'),
};