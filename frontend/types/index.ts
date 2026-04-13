export interface Flat {
  id: number;
  name: string;
  address: string;
  created_at: string;
}

export interface Room {
  id: number;
  flat_id: number;
  name: string;
  capacity: number;
  flat_name?: string;
}

export interface Bed {
  id: number;
  room_id: number;
  name: string;
  status: 'Available' | 'Occupied' | 'Under Maintenance';
  room_name?: string;
  flat_name?: string;
}

export interface Tenant {
  id: number;
  name: string;
  phone: string;
  bed_name?: string;
  room_name?: string;
  flat_name?: string;
  bed_id?: number;
}

export interface DashboardItem {
  flat_name: string;
  room_name: string;
  capacity: number;
  total_beds: number;
  occupied_beds: number;
  occupancy_rate: number;
}