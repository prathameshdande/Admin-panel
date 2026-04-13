'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Toast } from '@/components/ui/Toast';
import { OccupancyCard } from '@/components/dashboard/OccupancyCard';
import { CreateFlatForm } from '@/components/flats/CreateFlatForm';
import { FlatList } from '@/components/flats/FlatList';
import { CreateRoomForm } from '@/components/beds/rooms/CreateRoomForm';
import { RoomList } from '@/components/beds/rooms/RoomList';
import { CreateBedForm } from '@/components/beds/CreateBedForm';
import { BedList } from '@/components/beds/BedList';
import { CreateTenantForm } from '@/components/tenants/CreateTenantForm';
import { TenantList } from '@/components/tenants/TenantList';
import { useData } from '@/hooks/useData';
import { api } from '@/lib/api';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success',
  });

  const { flats, rooms, beds, tenants, dashboard, refetch } = useData();

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
  };

  const handleDeleteFlat = async (id: number) => {
    try {
      await api.deleteFlat(id);
      showToast('Flat deleted successfully');
      refetch();
    } catch (err: any) {
      if (err.message.startsWith('CONFIRM:')) {
        const confirmMsg = err.message.replace('CONFIRM:', '');
        if (window.confirm(confirmMsg + ' Delete anyway?')) {
          try {
            await api.deleteFlat(id, true);
            showToast('Flat deleted forcefully');
            refetch();
          } catch (e: any) {
            showToast(e.message, 'error');
          }
        }
      } else {
        showToast(err.message, 'error');
      }
    }
  };

  const handleDeleteTenant = async (id: number) => {
    try {
      await api.deleteTenant(id);
      showToast('Tenant removed');
      refetch();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const availableBeds = beds.filter((b) => b.status === 'Available');

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 overflow-auto p-8 relative">
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ show: false, message: '', type: 'success' })}
          />
        )}

        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold capitalize text-slate-800">
            {activeTab.replace('-', ' ')}
          </h1>
          <p className="text-gray-500 mt-1">Manage and monitor your properties.</p>
        </header>
        

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dashboard.map((item, idx) => (
              <OccupancyCard key={idx} data={item} />
            ))}
            {dashboard.length === 0 && (
              <div className="col-span-full p-8 text-center text-gray-500 bg-white border border-dashed rounded-xl">
                No occupancy data to display. Create flats, rooms, and beds first.
              </div>
            )}
          </div>
        )}

        {/* Flats Tab */}
        {activeTab === 'flats' && (
          <div className="space-y-8 max-w-5xl">
            <CreateFlatForm onSuccess={() => { refetch(); showToast('Flat created successfully'); }} onError={(msg: string) => showToast(msg, 'error')} />
            <FlatList flats={flats} onDelete={handleDeleteFlat} />
          </div>
        )}

        {/* Rooms Tab */}
        {activeTab === 'rooms' && (
          <div className="space-y-8 max-w-5xl">
            <CreateRoomForm flats={flats} onSuccess={() => { refetch(); showToast('Room created successfully'); }} onError={(msg: string) => showToast(msg, 'error')} />
            <RoomList rooms={rooms} />
          </div>
        )}

        {/* Beds Tab */}
        {activeTab === 'beds' && (
          <div className="space-y-8 max-w-5xl">
            <CreateBedForm rooms={rooms} onSuccess={() => { refetch(); showToast('Bed created successfully'); }} onError={(msg: string) => showToast(msg, 'error')} />
            <BedList beds={beds} onStatusUpdate={() => { refetch(); showToast('Bed status updated'); }} onError={(msg: string) => showToast(msg, 'error')} />
          </div>
        )}

        {/* Tenants Tab */}
        {activeTab === 'tenants' && (
          <div className="space-y-8 max-w-6xl">
            <CreateTenantForm onSuccess={() => { refetch(); showToast('Tenant added successfully'); }} onError={(msg: string) => showToast(msg, 'error')} />
            <TenantList
              tenants={tenants}
              availableBeds={availableBeds}
              onAssignment={() => { refetch(); showToast('Tenant assigned to new bed'); }}
              onDelete={handleDeleteTenant}
              onError={(msg: string) => showToast(msg, 'error')}
            />
          </div>
        )}
      </main>
    </div>
  );
}