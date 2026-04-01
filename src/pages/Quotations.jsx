import { useState } from 'react';
import { Plus, Search, FileDown, Eye, Filter, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Quotations.css';

const MOCK_QUOTES = [
  { id: 1, number: 'QT-2026-055', customer: 'Stark Industries', date: '2026-03-29', total: 8500.00, status: 'Draft' },
  { id: 2, number: 'QT-2026-054', customer: 'Globex Inc', date: '2026-03-28', total: 1250.00, status: 'Sent' },
  { id: 3, number: 'QT-2026-053', customer: 'Wayne Enterprises', date: '2026-03-20', total: 45000.00, status: 'Accepted' },
];

export default function Quotations() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Accepted': return 'badge-success';
      case 'Draft': return 'badge-warning';
      case 'Sent': return 'badge-info';
      default: return 'badge-info';
    }
  };

  const handleConvertToInvoice = (quoteId) => {
    // Navigates to create invoice pre-filled with quote details (mocked)
    navigate('/invoices/new');
  };

  return (
    <div className="quotations-page animate-fade-in">
      <div className="page-header flex justify-between items-center">
        <div>
          <h1>Quotation Management</h1>
          <p>Create and manage sales quotes, convert accepted quotes to invoices.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/quotations/new')}>
          <Plus size={18} />
          Create Quote
        </button>
      </div>

      <div className="glass-panel">
        <div className="table-controls mb-6 flex justify-between items-center">
          <div className="search-box">
            <Search size={18} className="text-secondary" />
            <input 
              type="text" 
              placeholder="Search by quote number or customer..." 
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
                <th>Quote Number</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Total Value</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_QUOTES.map((quote) => (
                <tr key={quote.id}>
                  <td className="font-medium text-primary">{quote.number}</td>
                  <td>{quote.customer}</td>
                  <td className="text-secondary">{quote.date}</td>
                  <td className="font-medium">₹{quote.total.toFixed(2)}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(quote.status)}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="action-buttons">
                      {quote.status === 'Accepted' && (
                         <button 
                           className="action-btn convert-btn" 
                           title="Convert to Invoice"
                           onClick={() => handleConvertToInvoice(quote.id)}
                         >
                           <FileText size={16} />
                         </button>
                      )}
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
