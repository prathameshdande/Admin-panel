import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Flat, Room, Bed, Tenant, DashboardItem } from '@/types';

export function useData() {
  const [flats, setFlats] = useState<Flat[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [beds, setBeds] = useState<Bed[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [dashboard, setDashboard] = useState<DashboardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [flatsData, roomsData, bedsData, tenantsData, dashData] = await Promise.all([
        api.getFlats(),
        api.getRooms(),
        api.getBeds(),
        api.getTenants(),
        api.getDashboard(),
      ]);
      setFlats(flatsData);
      setRooms(roomsData);
      setBeds(bedsData);
      setTenants(tenantsData);
      setDashboard(dashData);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { flats, rooms, beds, tenants, dashboard, loading, error, refetch: fetchAll };
}