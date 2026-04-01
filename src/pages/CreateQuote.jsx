import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Save, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import './CreateInvoice.css'; // Reusing the identical layout styles

export default function CreateQuote() {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [items, setItems] = useState([{ id: 1, desc: '', qty: 1, price: 0, inventory_id: '' }]);
  const [loading, setLoading] = useState(false);
  
  const [customer, setCustomer] = useState({ name: '', email: '', address: '' });
  
  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .order('name');
      
      if (error) throw error;
      if (data) setInventory(data);
    } catch (error) {
      console.error('Error fetching inventory:', error.message);
    }
  };

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), desc: '', qty: 1, price: 0, inventory_id: '' }]);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleProductSelect = (id, inventoryId) => {
    const selectedProduct = inventory.find(p => p.id === parseInt(inventoryId));
    if (selectedProduct) {
      setItems(items.map(item => 
        item.id === id ? { 
          ...item, 
          desc: selectedProduct.name, 
          price: selectedProduct.price,
          inventory_id: selectedProduct.id 
        } : item
      ));
    } else {
      setItems(items.map(item => 
        item.id === id ? { ...item, desc: '', price: 0, inventory_id: '' } : item
      ));
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  };

  const taxRate = 0.10; // 10%
  const subtotal = calculateSubtotal();
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const quoteNumber = `QT-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

  const handleSaveDraft = async () => {
    if (loading) return;
    setLoading(true);
    try {
      console.log('Saving draft:', { customer, items, total });
      // Simulate/Implement DB save here
      await new Promise(resolve => setTimeout(resolve, 800)); // Mimic network delay
      alert(`Draft ${quoteNumber} saved successfully!`);
      navigate('/quotations');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendQuote = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const quoteData = {
        number: quoteNumber,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        customer,
        items: items.map(item => ({
          ...item,
          amount: item.qty * item.price
        })),
        subtotal,
        tax,
        total
      };
      
      // In a real app, we'd save to database here
      await new Promise(resolve => setTimeout(resolve, 800)); // Mimic network delay
      
      navigate('/quotations/preview', { state: { quoteData } });
    } catch (err) {
      console.error(err);
      alert('Error generating quote. Please check your data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-invoice-page animate-fade-in">
      <div className="page-header flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button className="icon-btn" onClick={() => navigate('/quotations')}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1>Create New Quote</h1>
            <p className="text-secondary">{quoteNumber}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-secondary" onClick={handleSaveDraft} disabled={loading}>
            {loading ? 'Saving...' : <><Save size={18} /> Save Draft</>}
          </button>
          <button className="btn btn-primary" onClick={handleSendQuote} disabled={loading}>
            {loading ? 'Generating...' : <><Send size={18} /> Send Quote</>}
          </button>
        </div>
      </div>

      <div className="invoice-container grid-2-col-asym">
        <div className="main-form space-y-6">
          <div className="glass-panel">
            <h3 className="mb-4">Customer Details</h3>
            <div className="grid-2-col gap-4">
              <div className="input-group">
                <label className="input-label">Customer Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="E.g. Wayne Enterprises" 
                  value={customer.name}
                  onChange={(e) => setCustomer({...customer, name: e.target.value})}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input 
                  type="email" 
                  className="input-field" 
                  placeholder="billing@wayne.com" 
                  value={customer.email}
                  onChange={(e) => setCustomer({...customer, email: e.target.value})}
                />
              </div>
              <div className="input-group col-span-2">
                <label className="input-label">Billing Address</label>
                <textarea 
                  className="input-field min-h-[80px]" 
                  placeholder="Full address..." 
                  value={customer.address}
                  onChange={(e) => setCustomer({...customer, address: e.target.value})}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="glass-panel">
            <h3 className="mb-4">Quote Items</h3>
            <div className="items-list space-y-4">
              <div className="items-header grid grid-cols-12 gap-4 text-sm font-medium text-secondary px-2">
                <div className="col-span-6">Description / Product</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Amount</div>
              </div>
              
              {items.map((item) => (
                <div key={item.id} className="item-row grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6">
                    <select 
                      className="input-field" 
                      value={item.inventory_id || ''}
                      onChange={(e) => handleProductSelect(item.id, e.target.value)}
                    >
                      <option value="">Select a product...</option>
                      {inventory.map(prod => (
                        <option key={prod.id} value={prod.id}>
                          {prod.name} {prod.sku ? `(${prod.sku})` : ''} - ₹{prod.price}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <input 
                      type="number" 
                      className="input-field text-center" 
                      min="1"
                      value={item.qty}
                      onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="col-span-2">
                    <input 
                      type="number" 
                      className="input-field text-right" 
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="col-span-2 flex justify-end items-center gap-2">
                    <span className="font-medium w-full text-right">₹{(item.qty * item.price).toFixed(2)}</span>
                    <button 
                      className="action-btn text-danger ml-2" 
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={items.length === 1}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="btn btn-secondary mt-4" onClick={handleAddItem}>
              <Plus size={16} /> Add Item
            </button>
          </div>
        </div>

        <div className="summary-sidebar h-fit">
          <div className="glass-panel sticky top-4">
            <h3 className="mb-4">Summary</h3>
            <div className="flex justify-between py-2 text-secondary">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 text-secondary">
              <span>Tax (10%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-4 mt-2 border-t border-color font-bold text-lg text-primary">
              <span>Estimated Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
