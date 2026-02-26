import { Link } from "react-router-dom";

const HeaderTop = () => {
  return (
    <div className="bg-white border-b">
      <div className="max-w-[1248px] mx-auto px-4 md:px-6 h-12 flex items-center justify-between">
        <Link to="/" className="italic font-bold text-lg text-primary">
          Flipkart
        </Link>
        <div className="text-sm text-gray-600">📍 Select Location</div>
      </div>
    </div>
  );
};

export default HeaderTop;
