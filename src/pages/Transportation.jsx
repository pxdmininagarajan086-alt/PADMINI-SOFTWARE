import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Search, MapPin, SearchCheck, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './Transportation.css';

export default function Transportation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [shipments, setShipments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newShipment, setNewShipment] = useState({
    tracking_id: `TRK-${Math.floor(Math.random() * 1000000)}`,
    destination: '', vehicle: '', driver: '', status: 'Pending'
  });

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const { data, error } = await supabase
        .from('transportation')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) throw error;
      if (data) setShipments(data);
    } catch (error) {
      console.error('Error fetching shipments:', error.message);
    }
  };

  const filteredShipments = shipments.filter(ship => 
    ship.tracking_id?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    ship.driver?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    ship.vehicle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddShipment = async (e) => {
    e.preventDefault();
    const payload = {
      ...newShipment,
      date: new Date().toISOString().split('T')[0]
    };

    try {
      const { data, error } = await supabase
        .from('transportation')
        .insert([payload])
        .select();

      if (error) throw error;
      if (data) setShipments([data[0], ...shipments]);
      
      setIsModalOpen(false);
      setNewShipment({ tracking_id: `TRK-${Math.floor(Math.random() * 1000000)}`, destination: '', vehicle: '', driver: '', status: 'Pending' });
    } catch (error) {
      console.error('Error saving shipment:', error.message);
    }
  };

  const handleDeleteShipment = async (id) => {
    try {
      const { error } = await supabase
        .from('transportation')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setShipments(shipments.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting shipment:', error.message);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Delivered': return 'badge-success';
      case 'In Transit': return 'badge-info';
      case 'Pending': return 'badge-warning';
      default: return 'badge-secondary';
    }
  };

  return (
    <div className="transportation-page animate-fade-in">
      {/* Create Shipment Modal */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center animate-fade-in p-4 sm:p-0">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 m-4 max-h-[90vh] overflow-y-auto relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Add New Shipment</h2>
              <button 
                className="text-slate-400 hover:text-slate-600 p-2"
                onClick={() => setIsModalOpen(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleAddShipment} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tracking ID</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                    required
                    value={newShipment.tracking_id}
                    onChange={e => setNewShipment({...newShipment, tracking_id: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none bg-white"
                    required
                    value={newShipment.status}
                    onChange={e => setNewShipment({...newShipment, status: e.target.value})}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Destination Address</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                  required
                  placeholder="e.g. Warehouse C"
                  value={newShipment.destination}
                  onChange={e => setNewShipment({...newShipment, destination: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle License/No.</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                    required
                    placeholder="e.g. Van B-04"
                    value={newShipment.vehicle}
                    onChange={e => setNewShipment({...newShipment, vehicle: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Driver Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                    required
                    placeholder="e.g. John Smith"
                    value={newShipment.driver}
                    onChange={e => setNewShipment({...newShipment, driver: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm shadow-blue-600/20"
                >
                  Save Shipment
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      <div className="page-header flex justify-between items-center">
        <div>
          <h1>Transportation Log</h1>
          <p>Track deliveries, shipment statuses, and driver assignments.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          New Shipment
        </button>
      </div>

      <div className="glass-panel">
        <div className="table-controls mb-6 flex justify-between items-center">
          <div className="search-box">
            <Search size={18} className="text-secondary" />
            <input 
              type="text" 
              placeholder="Search by tracking ID, vehicle, or driver..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary">
            <SearchCheck size={18} />
            Check Tracking
          </button>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Destination</th>
                <th>Vehicle Number</th>
                <th>Driver Name</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredShipments.map((shipment) => (
                <tr key={shipment.id}>
                  <td className="font-medium text-primary">{shipment.tracking_id}</td>
                  <td>{shipment.destination}</td>
                  <td className="text-secondary">{shipment.vehicle}</td>
                  <td>{shipment.driver}</td>
                  <td className="text-secondary">{shipment.date}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(shipment.status)}`}>
                      {shipment.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="action-buttons">
                      <button className="action-btn view-btn" title="Track Location">
                        <MapPin size={16} />
                      </button>
                      <button 
                        className="action-btn text-slate-400 hover:text-red-500 transition-colors ml-2" 
                        title="Delete"
                        onClick={() => handleDeleteShipment(shipment.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
