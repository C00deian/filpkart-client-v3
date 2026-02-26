import { useSearchParams } from 'react-router-dom'

const SORT_OPTIONS = [
  { value: '',             label: 'Relevance' },
  { value: 'price_asc',   label: 'Price: Low to High' },
  { value: 'price_desc',  label: 'Price: High to Low' },
  { value: 'rating_desc', label: 'Customer Rating' },
  { value: 'newest',      label: 'Newest First' },
]

const ProductSort = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const current = searchParams.get('sort') ?? ''

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-slate-500 font-medium">Sort By</span>
      {SORT_OPTIONS.map(opt => (
        <button key={opt.value}
          onClick={() => setSearchParams(prev => { prev.set('sort', opt.value); return prev })}
          className={`px-3 py-1 text-sm rounded-full border transition-all
            ${current === opt.value
              ? 'border-primary text-primary bg-primary/5 font-semibold'
              : 'border-slate-200 text-slate-600 hover:border-primary hover:text-primary'}`}>
          {opt.label}
        </button>
      ))}
    </div>
  )
}
export default ProductSort
