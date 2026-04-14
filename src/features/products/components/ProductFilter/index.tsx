import { useSearchParams } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { useCategories } from '@/features/products/hooks/useCategories'

const PRICE_RANGES = [
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 – ₹1,000', min: 500, max: 1000 },
  { label: '₹1,000 – ₹5,000', min: 1000, max: 5000 },
  { label: '₹5,000 – ₹10,000', min: 5000, max: 10000 },
  { label: 'Above ₹10,000', min: 10000, max: undefined },
]
const RATINGS = [4, 3, 2]

interface FilterSectionProps { title: string; children: React.ReactNode }
const FilterSection = ({ title, children }: FilterSectionProps) => {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-slate-100 py-3">
      <button onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-bold text-slate-800 mb-2">
        {title}
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {open && children}
    </div>
  )
}

const ProductFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: categories } = useCategories()

  const update = (key: string, value: string | undefined) => {
    setSearchParams(prev => {
      if (value) prev.set(key, value)
      else prev.delete(key)
      prev.delete('page')
      return prev
    })
  }

  return (
    <aside className="w-full lg:w-64 lg:flex-shrink-0 bg-white rounded-sm shadow-card p-4 h-fit lg:sticky lg:top-24">
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Filters</h3>

      <FilterSection title="Category">
        <div className="space-y-1.5">
          {categories?.map(cat => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox"
                checked={searchParams.get('category') === cat.slug}
                onChange={e => update('category', e.target.checked ? cat.slug : undefined)}
                className="w-3.5 h-3.5 accent-primary" />
              <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">{cat.name}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price">
        <div className="space-y-1.5">
          {PRICE_RANGES.map(r => (
            <label key={r.label} className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="price"
                checked={searchParams.get('minPrice') === String(r.min)}
                onChange={() => { update('minPrice', String(r.min)); update('maxPrice', r.max ? String(r.max) : undefined) }}
                className="w-3.5 h-3.5 accent-primary" />
              <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">{r.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Customer Ratings">
        <div className="space-y-1.5">
          {RATINGS.map(r => (
            <label key={r} className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="rating"
                checked={searchParams.get('rating') === String(r)}
                onChange={() => update('rating', String(r))}
                className="w-3.5 h-3.5 accent-primary" />
              <span className="text-sm text-slate-600 group-hover:text-primary flex items-center gap-1">
                {r}★ & above
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Clear Filters */}
      {searchParams.toString() && (
        <button onClick={() => setSearchParams({})}
          className="mt-4 w-full text-center text-primary text-sm font-semibold hover:underline">
          Clear All Filters
        </button>
      )}
    </aside>
  )
}
export default ProductFilter
