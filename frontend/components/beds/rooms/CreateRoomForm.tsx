'use client';

import { useState } from 'react';
import { Flat } from '@/types';
import { api } from '@/lib/api';

interface CreateRoomFormProps {
    flats: Flat[];
    onSuccess: () => void;
    onError: (msg: string) => void;
}

export function CreateRoomForm({ flats, onSuccess, onError }: CreateRoomFormProps) {
    const [flatId, setFlatId] = useState('');
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState(3);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!flatId) return;
        try {
            await api.createRoom(parseInt(flatId), name, capacity);
            setFlatId('');
            setName('');
            setCapacity(3);
            onSuccess();
        } catch (err: any) {
            onError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border shadow-sm flex gap-4 items-end bg-gradient-to-br from-white to-gray-50">
            <div className="flex-1">
                <label className="block text-sm font-semibold mb-1 text-gray-700">Assign to Flat</label>
                <select
                    required
                    value={flatId}
                    onChange={(e) => setFlatId(e.target.value)}
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-600 bg-white outline-none"
                >
                    <option value="">Select a flat...</option>
                    {flats.map((f) => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex-1">
                <label className="block text-sm font-semibold mb-1 text-gray-700">Room Name/Number</label>
                <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                    placeholder="e.g. Room 101"
                />
            </div>
            <div className="w-32">
                <label className="block text-sm font-semibold mb-1 text-gray-700">Bed Capacity</label>
                <input
                    required
                    type="number"
                    min="1"
                    value={capacity}
                    onChange={(e) => setCapacity(parseInt(e.target.value))}
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                />
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm">
                Add Room
            </button>
        </form>
    );
}