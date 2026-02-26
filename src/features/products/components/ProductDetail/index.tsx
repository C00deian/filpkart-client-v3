import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ShoppingCart, Zap, Heart, ChevronRight } from 'lucide-react'
import { useProductDetail } from '@/features/products/hooks/useProductDetail'
import { useCart } from '@/features/cart/hooks/useCart'
import { ProductCardSkeleton } from '@/components/ui/Skeleton'
import StarRating from '@/components/shared/StarRating'
import PriceDisplay from '@/components/shared/PriceDisplay'
import ImageGallery from './components/ImageGallery'
import ReviewList from './components/ReviewList'
import { ROUTES } from '@/routes/routePaths'

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: product, isLoading, isError } = useProductDetail(Number(id))
  const { addItem, isAddingItem } = useCart()
  const [wishlisted, setWishlisted] = useState(false)

  if (isLoading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProductCardSkeleton />
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 bg-slate-200 rounded animate-pulse" style={{ width: `${80 - i * 10}%` }} />
        ))}
      </div>
    </div>
  )

  if (isError || !product) return (
    <div className="text-center py-16">
      <p className="text-slate-500 text-lg">Product not found.</p>
      <button onClick={() => navigate(ROUTES.PRODUCTS)} className="mt-4 text-primary hover:underline">
        Browse Products
      </button>
    </div>
  )

  const handleAddToCart = () => addItem({ productId: product.id, quantity: 1 })
  const handleBuyNow = () => { addItem({ productId: product.id, quantity: 1 }); navigate(ROUTES.CART) }

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-400">
        <a href={ROUTES.HOME} className="hover:text-primary">Home</a>
        <ChevronRight className="w-3 h-3" />
        <a href={ROUTES.PRODUCTS} className="hover:text-primary">{product.category.name}</a>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-600 line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left: Images (2/5) */}
        <div className="md:col-span-2">
          <div className="sticky top-20">
            <ImageGallery images={product.images} />

            <div className="flex gap-3 mt-4">
              <button onClick={handleAddToCart} disabled={!product.inStock || isAddingItem}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#ff9f00] hover:bg-[#f0900b] text-white font-bold rounded shadow-sm disabled:opacity-50 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                ADD TO CART
              </button>
              <button onClick={handleBuyNow} disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#fb641b] hover:bg-[#e85d10] text-white font-bold rounded shadow-sm disabled:opacity-50 transition-colors">
                <Zap className="w-5 h-5" />
                BUY NOW
              </button>
            </div>
          </div>
        </div>

        {/* Right: Info (3/5) */}
        <div className="md:col-span-3 bg-white rounded-sm shadow-card p-6 space-y-4">
          <div>
            <p className="text-sm text-slate-400 font-medium mb-1">{product.brand}</p>
            <h1 className="text-xl font-medium text-slate-900 leading-snug">{product.name}</h1>
          </div>

          {product.rating !== undefined && (
            <StarRating rating={product.rating} count={product.reviews.length} />
          )}

          <div className="border-t border-b border-slate-100 py-4">
            <PriceDisplay price={product.price} size="lg" />
          </div>

          {/* Category & Stock */}
          <div className="space-y-2 text-sm">
            <div className="flex gap-3">
              <span className="text-slate-400 w-24">Category</span>
              <span className="text-slate-700 font-medium">{product.category.name}</span>
            </div>
            <div className="flex gap-3">
              <span className="text-slate-400 w-24">Availability</span>
              {product.inStock
                ? <span className="text-green-600 font-semibold">✓ In Stock</span>
                : <span className="text-red-500 font-semibold">Out of Stock</span>
              }
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-bold text-slate-800 mb-2">Description</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Delivery Info */}
          <div className="bg-slate-50 rounded p-3 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span>🚚</span>
              <span className="text-slate-600">Free delivery on orders above ₹499</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>↩️</span>
              <span className="text-slate-600">10 days return policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      {product.reviews.length > 0 && (
        <div className="bg-white rounded-sm shadow-card p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Ratings & Reviews
            <span className="text-slate-400 text-sm font-normal ml-2">({product.reviews.length})</span>
          </h2>
          <ReviewList reviews={product.reviews} />
        </div>
      )}
    </div>
  )
}
export default ProductDetail
