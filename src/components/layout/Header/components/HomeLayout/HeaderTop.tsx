import { ROUTES } from "@/routes/routePaths";
import { Link } from "react-router-dom";
import logo from "@/assets/icons/logo.png";
import logoName from "@/assets/icons/logoname.png";
import { MapPin } from "lucide-react";

const HeaderTop = () => {
  return (
    <div className="bg-white pt-4 md:pt-6 pb-2">
      <div className="max-w-[1248px] mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link
          to={ROUTES.HOME}
          className="group transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="flex items-center">
            <div className="bg-[#ffe51f] flex items-center px-6 md:px-14 py-2.5 rounded-xl gap-2.5 shadow-sm group-hover:shadow-md transition-shadow">
              <img
                src={logo}
                alt="Flipkart Logo"
                className="w-5 md:w-6 object-contain"
              />
              <img
                src={logoName}
                alt="Flipkart"
                className="w-10 md:w-12 object-contain"
              />
            </div>
          </div>
        </Link>
        <button className="flex items-center gap-1.5 text-[13px] md:text-sm text-slate-600 hover:text-primary transition-colors group">
          <MapPin className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
          <span className="font-medium whitespace-nowrap">Select Location</span>
        </button>
      </div>
    </div>
  );
};

export default HeaderTop;
