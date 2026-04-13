'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

interface CreateTenantFormProps {
    onSuccess: () => void;
    onError: (msg: string) => void;
}

export function CreateTenantForm({ onSuccess, onError }: CreateTenantFormProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.createTenant(name, phone);
            setName('');
            setPhone('');
            onSuccess();
        } catch (err: any) {
            onError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border shadow-sm flex gap-4 items-end bg-gradient-to-br from-white to-gray-50">
            <div className="flex-1">
                <label className="block text-sm font-semibold mb-1 text-gray-700">Full Name</label>
                <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                    placeholder="Enter Your Full Name"
                />
            </div>
            <div className="flex-1">
                <label className="block text-sm font-semibold mb-1 text-gray-700">Phone Number</label>
                <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                    placeholder="Enter Your Phone Number"
                />
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm">
                Register Tenant
            </button>
        </form>
    );
}