import { ChevronDown, User } from "lucide-react";

type UserMenuTriggerProps = {
  displayName: string;
  open: boolean;
};

const UserMenuTrigger = ({ displayName, open }: UserMenuTriggerProps) => (
  <button className="flex items-center gap-2 text-slate-800 text-[15px] font-medium hover:text-primary transition-all group py-4">
    <div className="p-0.5 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
      <User className="w-5 h-5" />
    </div>
    <span>{displayName}</span>
    <ChevronDown
      className={`w-3.5 h-3.5 transition-transform duration-300 ${
        open ? "rotate-180 text-primary" : "text-slate-400"
      }`}
    />
  </button>
);

export default UserMenuTrigger;
