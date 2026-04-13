'use client';

import { useState } from 'react';
import { Room } from '@/types';
import { api } from '@/lib/api';

interface CreateBedFormProps {
    rooms: Room[];
    onSuccess: () => void;
    onError: (msg: string) => void;
}

export function CreateBedForm({ rooms, onSuccess, onError }: CreateBedFormProps) {
    const [roomId, setRoomId] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!roomId) return;
        try {
            await api.createBed(parseInt(roomId), name);
            setRoomId('');
            setName('');
            onSuccess();
        } catch (err: any) {
            onError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border shadow-sm flex gap-4 items-end bg-gradient-to-br from-white to-gray-50">
            <div className="flex-1">
                <label className="block text-sm font-semibold mb-1 text-gray-700">Target Room</label>
                <select
                    required
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-600 bg-white outline-none"
                >
                    <option value="">Select a room...</option>
                    {rooms.map((r) => (
                        <option key={r.id} value={r.id}>
                            {r.flat_name} - {r.name} (Max {r.capacity})
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex-1">
                <label className="block text-sm font-semibold mb-1 text-gray-700">Bed Identifier</label>
                <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                    placeholder="e.g. Bed A or Window Bed"
                />
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm">
                Add Bed
            </button>
        </form>
    );
}