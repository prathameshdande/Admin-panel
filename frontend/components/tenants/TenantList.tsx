'use client';

import { Tenant, Bed } from '@/types';
import { api } from '@/lib/api';
import { Trash2 } from 'lucide-react';

interface TenantListProps {
    tenants: Tenant[];
    availableBeds: Bed[];
    onAssignment: () => void;
    onDelete: (id: number) => Promise<void>;
    onError: (msg: string) => void;
}

export function TenantList({ tenants, availableBeds, onAssignment, onDelete, onError }: TenantListProps) {
    const handleAssign = async (tenantId: number, bedId: string) => {
        if (!bedId) return;
        try {
            await api.assignTenant(tenantId, parseInt(bedId));
            onAssignment();
        } catch (err: any) {
            onError(err.message);
        }
    };

    return (
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
                <thead className="bg-gray-100 text-gray-700 text-sm border-b">
                    <tr>
                        <th className="p-4">Tenant Info</th>
                        <th className="p-4">Current Assignment</th>
                        <th className="p-4">Move / Assign Bed</th>
                        <th className="p-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tenants.map((tenant) => (
                        <tr key={tenant.id} className="border-b last:border-0 hover:bg-gray-50">
                            <td className="p-4">
                                <div className="font-semibold text-gray-800">{tenant.name}</div>
                                <div className="text-xs text-gray-500 mt-0.5">{tenant.phone || 'No phone provided'}</div>
                            </td>
                            <td className="p-4">
                                {tenant.bed_name ? (
                                    <span className="font-medium text-indigo-700 bg-indigo-50 px-3 py-1 rounded border border-indigo-100 inline-block">
                                        {tenant.flat_name} → {tenant.room_name} → {tenant.bed_name}
                                    </span>
                                ) : (
                                    <span className="text-gray-400 italic bg-gray-100 px-3 py-1 rounded border border-gray-200 inline-block">Unassigned</span>
                                )}
                            </td>
                            <td className="p-4">
                                <select
                                    className="p-2 border rounded-lg bg-white text-sm w-full focus:ring-2 focus:ring-indigo-600 outline-none"
                                    onChange={(e) => handleAssign(tenant.id, e.target.value)}
                                    value=""
                                >
                                    <option value="" disabled>Select bed to assign...</option>
                                    {availableBeds.map((bed) => (
                                        <option key={bed.id} value={bed.id}>
                                            {bed.flat_name} - {bed.room_name} ({bed.name})
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td className="p-4 text-right">
                                <button
                                    onClick={() => {
                                        if (window.confirm('Delete this tenant completely?')) {
                                            onDelete(tenant.id);
                                        }
                                    }}
                                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}