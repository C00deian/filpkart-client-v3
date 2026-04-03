import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import type { Product } from '@/features/products/types/product.types'
import StarRating from '../StarRating'
import PriceDisplay from '../PriceDisplay'
import { useCart } from '@/features/cart/hooks/useCart'

interface ProductCardProps {
  product: Product
  originalPrice?: number
}

const ProductCard = ({ product, originalPrice }: ProductCardProps) => {
  const { addItem, isAddingItem } = useCart()
  const [wishlisted, setWishlisted] = useState(false)
  const image = product.images?.[0]?.imageUrl

  return (
    <div className="bg-white rounded-sm shadow-card hover:shadow-card-hover transition-all duration-200 group relative overflow-hidden">
      {/* Wishlist */}
      <button onClick={e => { e.preventDefault(); setWishlisted(!wishlisted) }}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white shadow-sm hover:scale-110 transition-transform">
        <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
      </button>

      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-square bg-slate-50 overflow-hidden flex items-center justify-center p-4">
          <img
            src={image ?? 'https://via.placeholder.com/200'}
            alt={product.name}
            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-3">
          <p className="text-sm text-slate-800 font-medium line-clamp-2 leading-snug mb-1.5">{product.name}</p>
          {product.rating && <StarRating rating={product.rating} size="sm" />}
          <div className="mt-1.5">
            <PriceDisplay price={product.price} originalPrice={originalPrice} size="sm" />
          </div>
          {!product.inStock && (
            <span className="text-xs text-red-500 font-medium mt-1 block">Out of Stock</span>
          )}
        </div>
      </Link>

      {product.inStock && (
        <div className="px-3 pb-3">
          <button
            onClick={() => addItem({ productId: product.id, quantity: 1 })}
            disabled={isAddingItem}
            className="w-full py-2 bg-[#ff9f00] hover:bg-[#f0900b] text-white text-xs font-bold rounded transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5">
            <ShoppingCart className="w-3.5 h-3.5" />
            ADD TO CART
          </button>
        </div>
      )}
    </div>
  )
}
export default ProductCard
