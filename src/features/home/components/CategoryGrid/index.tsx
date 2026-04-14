import { Link } from "react-router-dom";
import { useCategories } from "@/features/products/hooks/useCategories";
import { Skeleton } from "@/components/ui/Skeleton";
import { ROUTES } from "@/routes/routePaths";

const CategoryGrid = () => {
  const { data: categories, isLoading } = useCategories();

  return (
    <section className="bg-white rounded-sm shadow-sm py-4 sm:py-6">
      <div className="grid-auto-fill-compact gap-3 md:gap-5 px-3 sm:px-4">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <Skeleton className="w-full max-w-[104px] aspect-square rounded-2xl" />
              <Skeleton className="w-14 h-3" />
            </div>
          ))
          : categories?.map((cat) => (
            <Link
              key={cat.id}
              to={`${ROUTES.PRODUCTS}?category=${cat.slug}`}
              className="flex flex-col items-center gap-2.5 group cursor-pointer transition-transform active:scale-95 min-w-0"
            >
              <div className="relative w-full max-w-[120px] aspect-square flex items-center justify-center p-2 rounded-2xl bg-slate-50 group-hover:-translate-y-1 transition-transform duration-300">
                <div className="w-full h-full flex items-center justify-center">
                  {cat.imageUrl ? (
                    <img
                      src={cat.imageUrl}
                      alt={cat.name}
                      className="w-full h-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                      width={112}
                      height={112}
                    />
                  ) : (
                    <div className="text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                      🛍️
                    </div>
                  )}
                </div>
              </div>

              <span className="text-fluid-sm text-center text-[#212121] font-bold group-hover:text-primary transition-colors line-clamp-1">
                {cat.name}
              </span>
            </Link>
          ))}
      </div>
    </section>
  );
};
export default CategoryGrid;
