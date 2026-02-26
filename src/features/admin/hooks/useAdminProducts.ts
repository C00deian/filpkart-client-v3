import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { productService } from '@/services/productService'
import { deleteProduct, toggleStockStatus } from '../services/adminService'
import { toast } from 'react-toastify'
import { useDebounce } from '@/hooks/useDebounce'

export const ADMIN_PRODUCTS_KEY = ['admin-products']

export const useAdminProducts = () => {
  const qc = useQueryClient()
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const debouncedSearch = useDebounce(search, 400)

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ADMIN_PRODUCTS_KEY,
    queryFn: () => productService.getProducts(),
    staleTime: 1000 * 60,
  })

  const products = allProducts.filter(p => {
    const matchSearch = !debouncedSearch ||
      p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(debouncedSearch.toLowerCase())
    const matchCat = categoryFilter === 'all' || p.category.slug === categoryFilter
    return matchSearch && matchCat
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ADMIN_PRODUCTS_KEY }); toast.success('Product deleted') },
    onError: () => toast.error('Failed to delete product'),
  })

  const toggleStock = useMutation({
    mutationFn: (id: number) => toggleStockStatus(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ADMIN_PRODUCTS_KEY }); toast.success('Stock status updated') },
    onError: () => toast.error('Failed to update stock'),
  })

  return {
    products,
    allProducts,
    isLoading,
    search, setSearch,
    categoryFilter, setCategoryFilter,
    deleteProduct:  (id: number) => deleteMutation.mutate(id),
    toggleStock:    (id: number) => toggleStock.mutate(id),
    isDeleting:  deleteMutation.isPending,
    isToggling:  toggleStock.isPending,
  }
}
