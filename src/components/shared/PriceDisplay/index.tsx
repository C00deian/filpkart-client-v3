import { formatPrice, formatDiscount } from '@/utils/formatPrice'

interface PriceDisplayProps {
  price: number
  originalPrice?: number
  size?: 'sm' | 'md' | 'lg'
}

const sizeCls = { sm: 'text-sm', md: 'text-base', lg: 'text-2xl' }

const PriceDisplay = ({ price, originalPrice, size = 'md' }: PriceDisplayProps) => {
  const discount = originalPrice ? formatDiscount(originalPrice, price) : 0
  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span className={`font-bold text-slate-900 ${sizeCls[size]}`}>{formatPrice(price)}</span>
      {originalPrice && originalPrice > price && (
        <>
          <span className="text-slate-400 line-through text-sm">{formatPrice(originalPrice)}</span>
          <span className="text-green-600 font-semibold text-sm">{discount}% off</span>
        </>
      )}
    </div>
  )
}
export default PriceDisplay
