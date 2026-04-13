import { DashboardItem } from '@/types';
import { Users, BedDouble, TrendingUp } from 'lucide-react';

export function OccupancyCard({ data }: { data: DashboardItem }) {
  const occupancyColor = data.occupancy_rate >= 80 ? 'text-emerald-600' : 
                         data.occupancy_rate >= 50 ? 'text-amber-600' : 'text-rose-600';
  
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Gradient top bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
        data.occupancy_rate >= 80 ? 'from-emerald-500 to-teal-500' :
        data.occupancy_rate >= 50 ? 'from-amber-500 to-orange-500' :
        'from-rose-500 to-pink-500'
      }`} />
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-xl text-gray-800">{data.flat_name}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{data.room_name}</p>
          </div>
          <BedDouble className="w-8 h-8 text-indigo-400 opacity-80" />
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-medium text-gray-500">Occupancy</span>
            <div className="text-right">
              <span className={`text-2xl font-bold ${occupancyColor}`}>
                {data.occupancy_rate}%
              </span>
              <span className="text-xs text-gray-400 ml-1">filled</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div 
              className={`h-3 rounded-full transition-all duration-700 ease-out bg-gradient-to-r ${
                data.occupancy_rate >= 80 ? 'from-emerald-500 to-teal-500' :
                data.occupancy_rate >= 50 ? 'from-amber-500 to-orange-500' :
                'from-rose-500 to-pink-500'
              }`}
              style={{ width: `${data.occupancy_rate}%` }}
            />
          </div>
          
          <div className="flex justify-between text-sm pt-2">
            <div className="flex items-center gap-1 text-gray-600">
              <Users size={14} />
              <span>{data.occupied_beds} occupied</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <BedDouble size={14} />
              <span>{data.total_beds} total beds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}