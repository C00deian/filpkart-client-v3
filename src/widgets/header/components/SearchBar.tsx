import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { ROUTES } from "@/routes/routePaths";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim())
      navigate(`${ROUTES.PRODUCTS}?search=${encodeURIComponent(value.trim())}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 max-w-[720px] relative hidden md:flex items-center h-10"
    >
      <div className="absolute left-4 z-10 text-[#495057]">
        <Search className="w-5 h-5" />
      </div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search for Products, Brands and More"
        className="w-full h-full pl-12 pr-4 text-[15px] bg-[#f0f5ff]/50 text-[#212121] rounded-lg border border-primary/20 focus:border-primary focus:bg-white focus:shadow-[0_0_8px_rgba(40,116,240,0.1)] outline-none transition-all placeholder:text-[#878787]"
      />
    </form>
  );
};
export default SearchBar;
