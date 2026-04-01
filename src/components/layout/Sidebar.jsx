import { NavLink, Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 flex flex-col bg-slate-50 border-r border-slate-100 z-50">
      <div className="flex flex-col h-full p-4 gap-2">
        <div className="flex items-center gap-3 px-2 mb-8 mt-2">
          <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>inventory_2</span>
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-blue-900 tracking-tight leading-none">NAGAS</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">SCAFFOLDING</p>
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-1">
          <NavLink to="/dashboard" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ease-in-out ${isActive ? 'text-blue-900 bg-blue-50 border-r-4 border-blue-900' : 'text-slate-600 hover:text-blue-900 hover:bg-slate-200/50'}`}>
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-headline text-sm font-medium">Dashboard</span>
          </NavLink>
          <NavLink to="/inventory" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ease-in-out ${isActive ? 'text-blue-900 bg-blue-50 border-r-4 border-blue-900' : 'text-slate-600 hover:text-blue-900 hover:bg-slate-200/50'}`}>
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="font-headline text-sm font-medium">Inventory</span>
          </NavLink>
          <NavLink to="/invoices" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ease-in-out ${isActive ? 'text-blue-900 bg-blue-50 border-r-4 border-blue-900' : 'text-slate-600 hover:text-blue-900 hover:bg-slate-200/50'}`}>
            <span className="material-symbols-outlined">receipt_long</span>
            <span className="font-headline text-sm font-medium">Invoices</span>
          </NavLink>
          <NavLink to="/quotations" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ease-in-out ${isActive ? 'text-blue-900 bg-blue-50 border-r-4 border-blue-900' : 'text-slate-600 hover:text-blue-900 hover:bg-slate-200/50'}`}>
            <span className="material-symbols-outlined">request_quote</span>
            <span className="font-headline text-sm font-medium">Quotes</span>
          </NavLink>
          <NavLink to="/expenses" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ease-in-out ${isActive ? 'text-blue-900 bg-blue-50 border-r-4 border-blue-900' : 'text-slate-600 hover:text-blue-900 hover:bg-slate-200/50'}`}>
            <span className="material-symbols-outlined">analytics</span>
            <span className="font-headline text-sm font-medium">Reports</span>
          </NavLink>
          <NavLink to="/transportation" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ease-in-out ${isActive ? 'text-blue-900 bg-blue-50 border-r-4 border-blue-900' : 'text-slate-600 hover:text-blue-900 hover:bg-slate-200/50'}`}>
            <span className="material-symbols-outlined">local_shipping</span>
            <span className="font-headline text-sm font-medium">Transportation</span>
          </NavLink>
        </nav>
        <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-1">
          <Link to="/invoices/new" className="mb-4 w-full py-3 px-4 bg-primary text-white rounded-lg flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span className="text-sm font-bold tracking-tight">Create New</span>
          </Link>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-blue-900 hover:bg-slate-200/50 rounded-lg transition-all duration-200 ease-in-out" href="#">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-headline text-sm font-medium">Sign Out</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
