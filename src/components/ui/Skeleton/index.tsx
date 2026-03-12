interface SkeletonProps {
  className?: string
  count?: number
}

export const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-slate-200 rounded ${className}`} />
)

export const SkeletonLine = ({ className = '' }: SkeletonProps) => (
  <div className={`h-4 animate-pulse bg-slate-200 rounded ${className}`} />
)

export const ProductCardSkeleton = () => (
  <div className="bg-white rounded shadow-card p-3 space-y-3">
    <Skeleton className="h-48 w-full" />
    <SkeletonLine className="w-3/4" />
    <SkeletonLine className="w-1/2" />
    <SkeletonLine className="w-1/4" />
  </div>
)

export default Skeleton
