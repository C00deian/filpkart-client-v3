import { useSearchParams } from 'react-router-dom'
import { useProducts } from '@/features/products/hooks/useProducts'
import ProductFilter from '@/features/products/components/ProductFilter'
import ProductSort from '@/features/products/components/ProductSort'
import ProductCard from '@/components/shared/ProductCard'
import { ProductCardSkeleton } from '@/components/ui/Skeleton'
import { Package } from 'lucide-react'
import HomeLayout from '@/app/layouts/HomeLayout'

const ProductListPage = () => {
  const [searchParams] = useSearchParams()
  const { data: products, isLoading } = useProducts()
  const query = searchParams.get('search')
  const category = searchParams.get('category')

  return (
    <HomeLayout>
      <div className="max-w-[1200px] mx-auto px-4 py-4">
        <div className="flex gap-4">
          <ProductFilter />

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="bg-white rounded-sm shadow-card p-3 mb-3 flex items-center justify-between flex-wrap gap-2">
              <h1 className="text-sm font-medium text-slate-700">
                {query
                  ? <><strong>Results for "</strong>{query}<strong>"</strong></>
                  : category ? <span className="capitalize">{category.replace(/-/g, ' ')}</span>
                  : 'All Products'
                }
                {!isLoading && <span className="text-slate-400 ml-2">({products?.length ?? 0})</span>}
              </h1>
              <ProductSort />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {isLoading
                ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
                : products?.length
                  ? products.map(p => <ProductCard key={p.id} product={p} />)
                  : (
                    <div className="col-span-full flex flex-col items-center py-16 text-slate-400 gap-3">
                      <Package className="w-12 h-12" />
                      <p className="text-lg font-medium">No products found</p>
                      <p className="text-sm">Try adjusting your filters</p>
                    </div>
                  )
              }
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}
export default ProductListPage
