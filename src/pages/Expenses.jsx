import { useState } from 'react';
import { Plus, Search, Filter, PieChart, TrendingDown } from 'lucide-react';
import './Expenses.css';

const MOCK_EXPENSES = [
  { id: 1, date: '2026-03-29', description: 'AWS Hosting', category: 'Software', amount: 350.00 },
  { id: 2, date: '2026-03-28', description: 'Client Dinner', category: 'Travel', amount: 125.50 },
  { id: 3, date: '2026-03-25', description: 'Office Supplies', category: 'Office', amount: 45.00 },
  { id: 4, date: '2026-03-15', description: 'New Monitors', category: 'Hardware', amount: 890.00 },
];

export default function Expenses() {
  const [searchTerm, setSearchTerm] = useState('');

  const getCategoryBadgeColor = (category) => {
    switch(category) {
      case 'Software': return 'rgba(139, 92, 246, 0.2)'; /* Violet */
      case 'Travel': return 'rgba(56, 189, 248, 0.2)'; /* Sky */
      case 'Office': return 'rgba(251, 146, 60, 0.2)'; /* Orange */
      case 'Hardware': return 'rgba(236, 72, 153, 0.2)'; /* Pink */
      default: return 'var(--bg-tertiary)';
    }
  };
  
  const getCategoryTextColor = (category) => {
    switch(category) {
      case 'Software': return '#c4b5fd'; 
      case 'Travel': return '#bae6fd'; 
      case 'Office': return '#fed7aa'; 
      case 'Hardware': return '#fbcfe8'; 
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="expenses-page animate-fade-in">
      <div className="page-header flex justify-between items-center">
        <div>
          <h1>Expense Manager</h1>
          <p>Track your daily and monthly business expenses.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          Add Expense
        </button>
      </div>

      <div className="grid-2-col mb-6">
        <div className="glass-panel flex items-center justify-between">
          <div>
            <h3 className="text-secondary font-medium text-sm mb-1">Total Expenses (This Month)</h3>
            <p className="font-bold text-2xl text-primary">₹1,410.50</p>
          </div>
          <div className="expense-icon-bg">
            <TrendingDown size={28} className="text-danger" />
          </div>
        </div>
        <div className="glass-panel flex items-center justify-between">
          <div>
            <h3 className="text-secondary font-medium text-sm mb-1">Top Category</h3>
            <p className="font-bold text-2xl text-primary flex items-center gap-2">
              Hardware
            </p>
          </div>
          <div className="expense-icon-bg">
            <PieChart size={28} className="text-brand" />
          </div>
        </div>
      </div>

      <div className="glass-panel">
        <div className="table-controls mb-6 flex justify-between items-center">
          <div className="search-box">
            <Search size={18} className="text-secondary" />
            <input 
              type="text" 
              placeholder="Search expenses by description or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary">
            <Filter size={18} />
            Filter By Date
          </button>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_EXPENSES.map((expense) => (
                <tr key={expense.id}>
                  <td className="text-secondary">{expense.date}</td>
                  <td className="font-medium text-primary">{expense.description}</td>
                  <td>
                    <span 
                      className="category-badge" 
                      style={{ 
                        backgroundColor: getCategoryBadgeColor(expense.category),
                        color: getCategoryTextColor(expense.category)
                      }}
                    >
                      {expense.category}
                    </span>
                  </td>
                  <td className="text-right font-medium">₹{expense.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
