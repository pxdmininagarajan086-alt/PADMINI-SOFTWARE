import { useState } from 'react';
import { Plus, Search, FileDown, Eye, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Invoices.css';

const MOCK_INVOICES = [
  { id: 1, number: 'INV-2026-001', customer: 'Acme Corp', date: '2026-03-25', total: 1250.00, status: 'Paid' },
  { id: 2, number: 'INV-2026-002', customer: 'Globex Inc', date: '2026-03-28', total: 450.00, status: 'Pending' },
  { id: 3, number: 'INV-2026-003', customer: 'Initech', date: '2026-03-15', total: 3200.00, status: 'Overdue' },
];

export default function Invoices() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Paid': return 'badge-success';
      case 'Pending': return 'badge-warning';
      case 'Overdue': return 'badge-danger';
      default: return 'badge-info';
    }
  };

  return (
    <div className="invoices-page animate-fade-in">
      <div className="page-header flex justify-between items-center">
        <div>
          <h1>Invoice Management</h1>
          <p>Create, track, and manage customer invoices.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/invoices/new')}>
          <Plus size={18} />
          Create Invoice
        </button>
      </div>

      <div className="glass-panel">
        <div className="table-controls mb-6 flex justify-between items-center">
          <div className="search-box">
            <Search size={18} className="text-secondary" />
            <input 
              type="text" 
              placeholder="Search by invoice number or customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <button className="btn btn-secondary">
              <Filter size={18} />
              Filter
            </button>
            <button className="btn btn-secondary">
              <FileDown size={18} />
              Export
            </button>
          </div>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice Number</th>
                <th>Customer Name</th>
                <th>Date Issued</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_INVOICES.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="font-medium text-primary">{invoice.number}</td>
                  <td>{invoice.customer}</td>
                  <td className="text-secondary">{invoice.date}</td>
                  <td className="font-medium">₹{invoice.total.toFixed(2)}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="text-right">
                     <div className="action-buttons">
                      <button className="action-btn view-btn" title="View details">
                        <Eye size={16} />
                      </button>
                      <button className="action-btn download-btn" title="Download PDF">
                        <FileDown size={16} />
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
