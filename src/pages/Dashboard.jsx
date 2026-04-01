import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-fade-in">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 mt-6">
        {/* Total Invoice Amount */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Invoice Amount</p>
            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">receipt_long</span>
          </div>
          <h3 className="text-3xl font-extrabold text-on-surface tracking-tight">₹128,450.00</h3>
        </div>

        {/* Outstanding Amount */}
        <div className="bg-red-50 border border-red-100 p-6 rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-bold text-red-600 uppercase tracking-widest">Outstanding Amount</p>
            <span className="material-symbols-outlined text-red-600 bg-white p-2 rounded-lg shadow-sm">pending_actions</span>
          </div>
          <h3 className="text-3xl font-extrabold text-red-700 tracking-tight">₹42,150.00</h3>
        </div>

        {/* Paid Amount */}
        <div className="bg-green-50 border border-green-100 p-6 rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-bold text-green-700 uppercase tracking-widest">Paid Amount</p>
            <span className="material-symbols-outlined text-green-700 bg-white p-2 rounded-lg shadow-sm">check_circle</span>
          </div>
          <h3 className="text-3xl font-extrabold text-green-800 tracking-tight">₹86,300.00</h3>
        </div>
      </div>

      {/* Main Content Area: Activity & Quick Actions */}
      <div className="grid grid-cols-12 gap-8">
        {/* Recent Activity Feed */}
        <div className="col-span-12 lg:col-span-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-extrabold text-on-surface tracking-tight">Recent Activity</h3>
            <button className="text-sm font-bold text-primary hover:bg-primary/5 px-4 py-2 rounded-lg transition-colors">View Timeline</button>
          </div>
          <div className="space-y-4">
            <div className="group flex items-center p-5 bg-surface-container-lowest hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100 hover:shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">receipt</span>
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <h4 className="text-sm font-bold text-on-surface">Invoice <span className="text-primary">#INV-9402</span> created</h4>
                  <span className="text-xs text-on-surface-variant font-medium">2 mins ago</span>
                </div>
                <p className="text-xs text-on-surface-variant mt-1 font-body">Acme Global Ltd. • ₹12,450.00 • Draft</p>
              </div>
              <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                  <span className="material-symbols-outlined text-lg">more_horiz</span>
                </button>
              </div>
            </div>

            <div className="group flex items-center p-5 bg-surface-container-lowest hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100 hover:shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0">
                <span className="material-symbols-outlined">request_quote</span>
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <h4 className="text-sm font-bold text-on-surface">Quote <span className="text-primary">#QT-2201</span> approved</h4>
                  <span className="text-xs text-on-surface-variant font-medium">45 mins ago</span>
                </div>
                <p className="text-xs text-on-surface-variant mt-1 font-body">Starlight Enterprises • Fully Signed</p>
              </div>
              <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                  <span className="material-symbols-outlined text-lg">more_horiz</span>
                </button>
              </div>
            </div>

            <div className="group flex items-center p-5 bg-surface-container-lowest hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100 hover:shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-slate-600 shrink-0">
                <span className="material-symbols-outlined">inventory_2</span>
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <h4 className="text-sm font-bold text-on-surface">Stock Adjustment</h4>
                  <span className="text-xs text-on-surface-variant font-medium">3 hours ago</span>
                </div>
                <p className="text-xs text-on-surface-variant mt-1 font-body">Warehouse B • 1,200 units of 'Blue Titanium' restocked</p>
              </div>
              <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                  <span className="material-symbols-outlined text-lg">more_horiz</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Side Stats */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-100">
            <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/invoices/new" className="flex flex-col items-center justify-center p-4 bg-surface-container rounded-lg hover:bg-primary-fixed transition-colors gap-2 text-primary group cursor-pointer">
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">post_add</span>
                <span className="text-[11px] font-bold">New Invoice</span>
              </Link>
              <button className="flex flex-col items-center justify-center p-4 bg-surface-container rounded-lg hover:bg-primary-fixed transition-colors gap-2 text-primary group">
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">person_add</span>
                <span className="text-[11px] font-bold">Add Client</span>
              </button>
              <Link to="/inventory" className="flex flex-col items-center justify-center p-4 bg-surface-container rounded-lg hover:bg-primary-fixed transition-colors gap-2 text-primary group cursor-pointer">
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">add_box</span>
                <span className="text-[11px] font-bold">Log Items</span>
              </Link>
              <Link to="/expenses" className="flex flex-col items-center justify-center p-4 bg-surface-container rounded-lg hover:bg-primary-fixed transition-colors gap-2 text-primary group cursor-pointer">
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">description</span>
                <span className="text-[11px] font-bold">Reports</span>
              </Link>
            </div>
          </div>

          <div className="bg-surface-container-high p-6 rounded-xl relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Pending Quotes</p>
              <h4 className="text-3xl font-extrabold text-on-surface tracking-tight mb-4">24 <span className="text-lg font-medium text-on-surface-variant">Waiting</span></h4>
              <div className="p-4 bg-white/50 backdrop-blur rounded-lg border border-white/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-primary uppercase">Priority Approval</span>
                  <span className="text-[10px] font-bold text-tertiary">2 days left</span>
                </div>
                <p className="text-xs font-semibold text-on-surface">Refurbishment Project #232</p>
                <p className="text-[10px] text-on-surface-variant mt-1 font-body">Potential Value: ₹12,500.00</p>
              </div>
            </div>
            <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl text-white/20 select-none">request_quote</span>
          </div>
        </div>
      </div>
    </div>
  );
}
