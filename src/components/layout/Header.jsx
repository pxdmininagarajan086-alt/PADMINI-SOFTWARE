export default function Header() {
  return (
    <header className="w-full sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-8">
        <span className="text-lg font-bold text-blue-900 tracking-tighter uppercase">NAGAS CIVIL ENGINEERING CONTRACTORS</span>
        <div className="relative hidden lg:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full w-80 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-body outline-none" placeholder="Search accounts, ledgers, or files..." type="text" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors active:scale-95 duration-200">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors active:scale-95 duration-200">
          <span className="material-symbols-outlined">help</span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors active:scale-95 duration-200">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-900 leading-none font-body">Alexander Thorne</p>
            <p className="text-[10px] text-slate-500 font-medium font-body mt-1">Admin Account</p>
          </div>
          <img alt="User Profile Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-slate-100 group-hover:border-primary/20 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJpJU5gTPP81qWS1dl31gfs0NlsTiBmNZfOHTCLd0Ko2OTBtyKbPR3IjgL7r6LVJJ_9R5gjjuZjN4bPv_v1qDmCs5Nn2rb6hTZm7eqt6sToxg8hyUpT17IDhbALSWBGLBQ0IPZFMX_cqO1SGIy-wFvRCBEJysPBZ9ng2hfeRLJZpq_dkizdfkpbz0LXc8JdS-P4nB_jFX73Q0rEtXp3yKy3FoY9Znl823IWEfwX3Kv9928rPZuIIHKryWt-wYi_TokmMwZk5Ja9Y2I" />
        </div>
      </div>
    </header>
  );
}
