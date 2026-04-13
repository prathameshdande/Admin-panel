import { Room } from '@/types';

export function RoomList({ rooms }: { rooms: Room[] }) {
    return (
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
                <thead className="bg-gray-100 text-gray-700 text-sm border-b">
                    <tr>
                        <th className="p-4">Room Name</th>
                        <th className="p-4">Parent Flat</th>
                        <th className="p-4">Maximum Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr key={room.id} className="border-b last:border-0 hover:bg-gray-50">
                            <td className="p-4 font-semibold text-gray-800">{room.name}</td>
                            <td className="p-4 text-gray-600">{room.flat_name}</td>
                            <td className="p-4">
                                <span className="bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full text-xs font-bold">
                                    {room.capacity} Beds max
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}