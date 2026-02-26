import { useProducts } from '@/features/products/hooks/useProducts'
import { ProductCardSkeleton } from '@/components/ui/Skeleton'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes/routePaths'
import PriceDisplay from '@/components/shared/PriceDisplay'
import StarRating from '@/components/shared/StarRating'

const DealOfTheDay = () => {
  const { data: products, isLoading } = useProducts({ size: 8 })

  return (
    <section className="bg-white rounded-sm shadow-card">
      <div className="flex items-center justify-between p-4 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-900">Deal of the Day</h2>
        <Link to={ROUTES.PRODUCTS} className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
          View All <span>›</span>
        </Link>
      </div>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : products?.slice(0, 5).map(p => (
              <Link key={p.id} to={`/products/${p.id}`}
                className="group flex flex-col gap-2 p-2 rounded hover:shadow-card-hover transition-shadow">
                <div className="aspect-square bg-slate-50 rounded overflow-hidden">
                  <img
                    src={p.images[0]?.imageUrl ?? 'https://via.placeholder.com/200'}
                    alt={p.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-sm font-medium text-slate-800 line-clamp-2 leading-snug">{p.name}</p>
                {p.rating && <StarRating rating={p.rating} size="sm" />}
                <PriceDisplay price={p.price} size="sm" />
              </Link>
            ))
        }
      </div>
    </section>
  )
}
export default DealOfTheDay
