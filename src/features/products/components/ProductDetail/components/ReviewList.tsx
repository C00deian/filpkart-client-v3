import StarRating from '@/components/shared/StarRating'
import type { Review } from '@/features/products/types/product.types'
import { ThumbsUp } from 'lucide-react'

interface Props { reviews: Review[] }

const ReviewList = ({ reviews }: Props) => {
  if (!reviews.length) return (
    <div className="text-center py-8 text-slate-400">
      <span className="text-4xl block mb-2">⭐</span>
      No reviews yet. Be the first to review!
    </div>
  )

  return (
    <div className="space-y-4">
      {reviews.map(r => (
        <div key={r.id} className="border-b border-slate-100 pb-4 last:border-0">
          <div className="flex items-center gap-3 mb-2">
            <StarRating rating={r.rating} size="sm" />
            {r.title && <span className="font-semibold text-slate-800 text-sm">{r.title}</span>}
            {r.isVerifiedPurchase && (
              <span className="text-green-600 text-xs font-medium flex items-center gap-1">✓ Verified</span>
            )}
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{r.comment}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
            <span>{r.userName ?? 'Anonymous'}</span>
            <span>{new Date(r.createdDate).toLocaleDateString('en-IN')}</span>
            {r.helpfulCount !== undefined && r.helpfulCount > 0 && (
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" /> {r.helpfulCount}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
export default ReviewList
