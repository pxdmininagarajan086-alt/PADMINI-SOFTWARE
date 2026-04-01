import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Invoices from './pages/Invoices';
import CreateInvoice from './pages/CreateInvoice';
import Quotations from './pages/Quotations';
import CreateQuote from './pages/CreateQuote';
import Expenses from './pages/Expenses';
import Transportation from './pages/Transportation';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="animate-fade-in mt-4">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/invoices/new" element={<CreateInvoice />} />
              <Route path="/quotations" element={<Quotations />} />
              <Route path="/quotations/new" element={<CreateQuote />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/transportation" element={<Transportation />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
