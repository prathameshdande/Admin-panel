'use client';

import { Bed } from '@/types';
import { api } from '@/lib/api';

interface BedListProps {
    beds: Bed[];
    onStatusUpdate: () => void;
    onError: (msg: string) => void;
}

export function BedList({ beds, onStatusUpdate, onError }: BedListProps) {
    const toggleMaintenance = async (bed: Bed) => {
        if (bed.status === 'Occupied') return;
        const newStatus = bed.status === 'Available' ? 'Under Maintenance' : 'Available';
        try {
            await api.updateBedStatus(bed.id, newStatus);
            onStatusUpdate();
        } catch (err: any) {
            onError(err.message);
        }
    };

    return (
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
                <thead className="bg-gray-100 text-gray-700 text-sm border-b">
                    <tr>
                        <th className="p-4">Bed Name</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Current Status</th>
                        <th className="p-4 text-right">Maintenance</th>
                    </tr>
                </thead>
                <tbody>
                    {beds.map((bed) => (
                        <tr key={bed.id} className="border-b last:border-0 hover:bg-gray-50">
                            <td className="p-4 font-semibold text-gray-800">{bed.name}</td>
                            <td className="p-4 text-gray-600">{bed.flat_name} → {bed.room_name}</td>
                            <td className="p-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${bed.status === 'Available'
                                        ? 'bg-green-50 text-green-700 border-green-200'
                                        : bed.status === 'Occupied'
                                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                                            : 'bg-orange-50 text-orange-700 border-orange-200'
                                    }`}>
                                    {bed.status}
                                </span>
                            </td>
                            <td className="p-4 text-right">
                                {bed.status !== 'Occupied' ? (
                                    <button
                                        onClick={() => toggleMaintenance(bed)}
                                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition"
                                    >
                                        Toggle Maintenance
                                    </button>
                                ) : (
                                    <span className="text-sm text-gray-400 italic">In use</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}