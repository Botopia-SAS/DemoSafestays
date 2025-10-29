"use client";

interface LockedNavItemProps {
  label: string;
}

export function LockedNavItem({ label }: LockedNavItemProps) {
  return (
    <div className="relative group">
      <button
        onClick={(e) => e.preventDefault()}
        className="nav-link text-white/90 hover:text-white transition-all uppercase text-sm tracking-wider font-light cursor-pointer"
      >
        {label}
      </button>
      <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
        <div className="bg-black/90 backdrop-blur-md text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-white/10">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Demo Version - Feature Locked</span>
          </div>
        </div>
      </div>
    </div>
  );
}
