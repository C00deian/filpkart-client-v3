import { Link } from 'react-router-dom'
import { useCategories } from '@/features/products/hooks/useCategories'
import { Skeleton } from '@/components/ui/Skeleton'
import { ROUTES } from '@/routes/routePaths'

const CategoryGrid = () => {
  const { data: categories, isLoading } = useCategories()

  return (
    <section className="bg-white rounded-sm shadow-card p-4">
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Skeleton className="w-16 h-16 rounded-full" />
                <Skeleton className="w-14 h-3" />
              </div>
            ))
          : categories?.map(cat => (
              <Link key={cat.id} to={`${ROUTES.PRODUCTS}?category=${cat.slug}`}
                className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all">
                  {cat.imageUrl
                    ? <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full bg-primary/10 flex items-center justify-center text-2xl">🛍️</div>
                  }
                </div>
                <span className="text-xs text-center text-slate-700 font-medium group-hover:text-primary transition-colors line-clamp-2">
                  {cat.name}
                </span>
              </Link>
            ))
        }
      </div>
    </section>
  )
}
export default CategoryGrid
