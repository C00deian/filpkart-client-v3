import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Store,
  Bell,
  LifeBuoy,
  AlignEndVertical,
} from "lucide-react";

const MoreInfo = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);



  const userMenuItems = [
    { label: "Become a Seller", icon: Store, to: "" },
    { label: "Notification Settings", icon: Bell, to: "" },
    { label: "24x7 Customer Care", icon: LifeBuoy, to: "" },
    { label: "Advertise on Flipkart", icon: AlignEndVertical, to: "" },
  ];


  return (
    <div
      ref={ref}
      className="relative h-full flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-2 text-slate-800 text-[15px] font-medium hover:text-primary transition-all group py-4">
        <span>More</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180 text-primary" : "text-slate-400"}`}
        />
      </button>

      {open && (
        <>
          <div className="absolute top-10 left-0 w-full h-4 z-[109]" />

          <div className="absolute right-0 top-[52px] w-64 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-[110] animate-in fade-in zoom-in-95 duration-200 origin-top-right">
            <div className="px-5 py-3 border-b border-slate-50">
              <p className="text-[15px] font-bold text-slate-900 leading-tight">
                More
              </p>
            </div>

            <div className="py-1">
              {userMenuItems.map(({ label, icon: Icon, to }) => (
                <Link
                  key={label}
                  to={to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 mx-2 px-3 py-2.5 text-[14px] text-slate-700 hover:bg-[#f0f5ff] hover:text-primary rounded-lg transition-colors group"
                >
                  <Icon className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
                  <span className="font-normal">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MoreInfo;
