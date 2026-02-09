import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Trash2, PlusCircle } from 'lucide-react';

const TimeSlotPage = () => {
    const [slots, setSlots] = useState([]);
    const [formData, setFormData] = useState({ day: '', start_time: '', end_time: '' });

    // ডাটা লোড করা
    const fetchSlots = async () => {
        const res = await axios.get('https://stonebridge-api.onrender.com/api/time-slots/all');
        setSlots(res.data.data);
    };

    useEffect(() => { fetchSlots(); }, []);

    // সময় ফরম্যাট করা (13:00 -> 01:00 PM)
    const formatTime = (time) => {
        return new Date(`1970-01-01T${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    // ডিলিট ফাংশন
    const confirmDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#87550D',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`https://stonebridge-api.onrender.com/api/time-slots/delete/${id}`);
                Swal.fire('Deleted!', 'Slot has been removed.', 'success');
                fetchSlots();
            }
        });
    };

    // সাবমিট ফাংশন
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://stonebridge-api.onrender.com/api/time-slots/add', formData);
            Swal.fire('Success', 'Time slot added!', 'success');
            setFormData({ day: '', start_time: '', end_time: '' });
            fetchSlots();
        } catch (err) {
            Swal.fire('Error', err.response.data.message, 'error');
        }
    };

    return (
        <main className="p-6 bg-slate-100 min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* টেবিল সেকশন */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold text-slate-700 mb-6">Available Slots</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 border-b">
                                    <th className="p-4 text-sm font-bold text-slate-500">DAY</th>
                                    <th className="p-4 text-sm font-bold text-slate-500">START TIME</th>
                                    <th className="p-4 text-sm font-bold text-slate-500">END TIME</th>
                                    <th className="p-4 text-sm font-bold text-slate-500">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {slots.map((slot) => (
                                    <tr key={slot._id} className="border-b hover:bg-slate-50 transition-colors">
                                        <td className="p-4 font-medium">{slot.day}</td>
                                        <td className="p-4">{formatTime(slot.start_time)}</td>
                                        <td className="p-4">{formatTime(slot.end_time)}</td>
                                        <td className="p-4">
                                            <button 
                                                onClick={() => confirmDelete(slot._id)}
                                                className="h-9 w-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-all shadow-sm"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ফর্ম সেকশন */}
                <div className="bg-white p-6 rounded-xl shadow-md h-fit">
                    <h2 className="text-xl font-bold text-slate-700 mb-6">Add New Day & Time Slot</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-2">Select Day</label>
                            <select 
                                value={formData.day}
                                onChange={(e) => setFormData({...formData, day: e.target.value})}
                                className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none" required
                            >
                                <option value="">--- Select ---</option>
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-600 mb-2">Start Time</label>
                                <input type="time" value={formData.start_time} onChange={(e) => setFormData({...formData, start_time: e.target.value})} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-600 mb-2">End Time</label>
                                <input type="time" value={formData.end_time} onChange={(e) => setFormData({...formData, end_time: e.target.value})} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary" required />
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 flex items-center justify-center gap-2 transition-all">
                            <PlusCircle size={20} /> Add Day & Time Slot
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default TimeSlotPage;