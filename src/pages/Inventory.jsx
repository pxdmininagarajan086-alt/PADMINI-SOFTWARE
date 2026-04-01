import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Search, Edit2, Trash2, AlertTriangle, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './Inventory.css';

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', sku: '', category: '', price: '', quantity: ''
  });

  const closeModal = () => {
    setIsAddModalOpen(false);
    setEditingId(null);
    setNewProduct({ name: '', sku: '', category: '', price: '', quantity: '' });
  };

  const handleEditClick = (product) => {
    setNewProduct({
      name: product.name,
      sku: product.sku || '',
      category: product.category || '',
      price: product.price,
      quantity: product.quantity
    });
    setEditingId(product.id);
    setIsAddModalOpen(true);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) throw error;
      if (data) setInventory(data);
    } catch (error) {
      console.error('Error fetching inventory:', error.message);
    }
  };

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    
    const product = {
      name: newProduct.name,
      sku: newProduct.sku,
      category: newProduct.category,
      price: parseFloat(newProduct.price) || 0,
      quantity: parseInt(newProduct.quantity, 10) || 0,
      status: (parseInt(newProduct.quantity, 10) || 0) < 20 ? 'Low Stock' : 'In Stock'
    };

    try {
      if (editingId) {
        const { error } = await supabase
          .from('inventory')
          .update(product)
          .eq('id', editingId);
          
        if (error) throw error;
        setInventory(inventory.map(item => 
          item.id === editingId ? { ...item, ...product } : item
        ));
      } else {
        const { data, error } = await supabase
          .from('inventory')
          .insert([product])
          .select();

        if (error) throw error;
        if (data) setInventory([data[0], ...inventory]);
      }
      
      closeModal();
    } catch (error) {
      console.error('Error saving product:', error.message);
      alert('Error saving product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const { error } = await supabase
        .from('inventory')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setInventory(inventory.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };
  
  return (
    <div className="inventory-page animate-fade-in">
      {/* Add Product Modal */}
      {isAddModalOpen && createPortal(
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center animate-fade-in p-4 sm:p-0">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 m-4 max-h-[90vh] overflow-y-auto relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button 
                className="text-slate-400 hover:text-slate-600 p-2"
                onClick={closeModal}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                  required
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">SKU</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                    required
                    value={newProduct.sku}
                    onChange={e => setNewProduct({...newProduct, sku: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                    required
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                    required
                    value={newProduct.price}
                    onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                  <input 
                    type="number" 
                    min="0"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                    required
                    value={newProduct.quantity}
                    onChange={e => setNewProduct({...newProduct, quantity: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm shadow-blue-600/20 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      <div className="page-header flex justify-between items-center">
        <div>
          <h1>Inventory Management</h1>
          <p>Manage your products, track quantities and monitor stock levels.</p>
        </div>
        <button className="btn btn-primary" onClick={() => {
          closeModal();
          setIsAddModalOpen(true);
        }}>
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <div className="glass-panel">
        <div className="table-controls mb-6 flex justify-between items-center">
          <div className="search-box">
            <Search size={18} className="text-secondary" />
            <input 
              type="text" 
              placeholder="Search products by name, SKU or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary">
            <Filter size={18} />
            Filter
          </button>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((product) => (
                <tr key={product.id}>
                  <td className="font-medium text-primary">{product.name}</td>
                  <td className="text-secondary">{product.sku}</td>
                  <td>{product.category}</td>
                  <td>₹{product.price.toFixed(2)}</td>
                  <td>
                    <span className={product.quantity < 20 ? 'text-danger font-bold' : ''}>
                      {product.quantity}
                    </span>
                  </td>
                  <td>
                    {product.status === 'Low Stock' ? (
                      <span className="badge badge-danger flex items-center gap-1 w-fit">
                        <AlertTriangle size={12} /> Low Stock
                      </span>
                    ) : (
                      <span className="badge badge-success flex items-center gap-1 w-fit">
                        In Stock
                      </span>
                    )}
                  </td>
                  <td className="text-right">
                    <div className="action-buttons">
                      <button 
                        className="action-btn edit-btn" 
                        title="Edit"
                        onClick={() => handleEditClick(product)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="action-btn delete-btn" 
                        title="Delete"
                        onClick={() => handleDeleteProduct(product.id)}
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
