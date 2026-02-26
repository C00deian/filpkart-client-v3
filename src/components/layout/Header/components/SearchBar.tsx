import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'
import { ROUTES } from '@/routes/routePaths'

const SearchBar = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [value, setValue] = useState(searchParams.get('search') ?? '')
  const debounced = useDebounce(value, 400)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) navigate(`${ROUTES.PRODUCTS}?search=${encodeURIComponent(value.trim())}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-xl relative hidden md:flex">
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Search for products, brands and more"
        className="w-full pl-4 pr-10 py-2 text-sm text-slate-700 rounded shadow-sm outline-none focus:ring-2 focus:ring-white/30"
      />
      <button type="submit" className="absolute right-0 h-full px-3 text-primary flex items-center">
        <Search className="w-4 h-4" />
      </button>
    </form>
  )
}
export default SearchBar
