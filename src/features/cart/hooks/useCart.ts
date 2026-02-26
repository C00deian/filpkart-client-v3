import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { cartService } from '@/services/cartService'
import { useAuth } from '@/features/auth/hooks/useAuth'
import type { AddToCartRequest } from '@/types/order.types'
import { toast } from 'react-toastify'

export const CART_KEY = ['cart']

export const useCart = () => {
  const { user } = useAuth()
  const qc = useQueryClient()

  const { data: cart, isLoading } = useQuery({
    queryKey: CART_KEY,
    queryFn: cartService.getCart,
    enabled: !!user,
    staleTime: 1000 * 60 * 2,
  })

  const addItem = useMutation({
    mutationFn: (req: AddToCartRequest) => cartService.addItem(req),
    onSuccess: () => { qc.invalidateQueries({ queryKey: CART_KEY }); toast.success('Added to cart!') },
    onError: () => toast.error('Failed to add item'),
  })

  const removeItem = useMutation({
    mutationFn: (productId: number) => cartService.removeItem(productId),
    onSuccess: () => qc.invalidateQueries({ queryKey: CART_KEY }),
  })

  const increaseItem = useMutation({
    mutationFn: (productId: number) => cartService.increaseItem(productId),
    onSuccess: () => qc.invalidateQueries({ queryKey: CART_KEY }),
  })

  const decreaseItem = useMutation({
    mutationFn: (productId: number) => cartService.decreaseItem(productId),
    onSuccess: () => qc.invalidateQueries({ queryKey: CART_KEY }),
  })

  const clearCart = useMutation({
    mutationFn: cartService.clearCart,
    onSuccess: () => qc.invalidateQueries({ queryKey: CART_KEY }),
  })

  return {
    cart,
    isLoading,
    itemCount: cart?.items?.reduce((sum, i) => sum + i.quantity, 0) ?? 0,
    addItem:    (req: AddToCartRequest) => addItem.mutate(req),
    removeItem: (id: number) => removeItem.mutate(id),
    increaseItem: (id: number) => increaseItem.mutate(id),
    decreaseItem: (id: number) => decreaseItem.mutate(id),
    clearCart:  () => clearCart.mutate(),
    isAddingItem: addItem.isPending,
  }
}
