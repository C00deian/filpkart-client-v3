import { Link } from "react-router-dom";
import { useCategories } from "@/features/products/hooks/useCategories";
import { Skeleton } from "@/components/ui/Skeleton";
import { ROUTES } from "@/routes/routePaths";

const CategoryGrid = () => {
  const { data: categories, isLoading } = useCategories();

  return (
    <section className="bg-white rounded-sm shadow-sm py-6 overflow-x-auto no-scrollbar">
      <div className="flex flex-row md:justify-center items-start gap-3 md:gap-8 px-4 min-w-max">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <Skeleton className="w-16 h-16 md:w-20 md:h-20 rounded-2xl" />
                <Skeleton className="w-14 h-3" />
              </div>
            ))
          : categories?.map((cat) => (
              <Link
                key={cat.id}
                to={`${ROUTES.PRODUCTS}?category=${cat.slug}`}
                className="flex flex-col items-center gap-3 group cursor-pointer transition-transform active:scale-95 min-w-[70px] md:min-w-[84px]"
              >
                <div className="relative w-24 h-24 md:w-28 md:h-28 flex flex-col items-center justify-center p-2 group-hover:-translate-y-1 transition-transform duration-300">
                  {/* The Icon */}
                  <div className="w-full h-full flex items-center justify-center">
                    {cat.imageUrl ? (
                      <img
                        src={cat.imageUrl}
                        alt={cat.name}
                        className="w-full h-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                        🛍️
                      </div>
                    )}
                  </div>
                </div>

                {/* Category Name */}
                <span className="text-[11px] md:text-sm text-center text-[#212121] font-bold group-hover:text-primary transition-colors line-clamp-1">
                  {cat.name}
                </span>
              </Link>
            ))}
      </div>
    </section>
  );
};
export default CategoryGrid;
