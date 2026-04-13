'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { PlusCircle, Home, MapPin } from 'lucide-react';

export function CreateFlatForm({ onSuccess, onError }: any) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.createFlat(name, address);
      setName('');
      setAddress('');
      onSuccess();
    } catch (err: any) {
      onError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
        <h2 className="text-white font-semibold flex items-center gap-2">
          <PlusCircle size={20} />
          Add New Flat
        </h2>
        <p className="text-indigo-100 text-sm mt-1">Register a new residential building</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Flat Name</label>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              placeholder="e.g., Sunrise Apartments"
            />
          </div>
        </div>
        
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              placeholder="123 Main Street, City"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70"
        >
          {isLoading ? 'Creating...' : 'Create Flat'}
        </button>
      </form>
    </div>
  );
}