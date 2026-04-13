import { Flat } from '@/types';
import { Trash2, Building2, MapPin } from 'lucide-react';

export function FlatList({ flats, onDelete }: any) {
  if (flats.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
        <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No flats yet. Create your first flat above.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {flats.map((flat: Flat) => (
        <div key={flat.id} className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden">
          <div className="p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                  <Building2 size={18} className="text-indigo-500" />
                  {flat.name}
                </h3>
              </div>
              <button
                onClick={() => onDelete(flat.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-500">
              <MapPin size={14} className="mt-0.5 flex-shrink-0" />
              <span>{flat.address}</span>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400">
              ID: {flat.id}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}