import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_TIMES } from '@/config/constants'
import { cartService } from '@/features/cart/services/cartService'
import { useAuthValue } from '@/features/auth/hooks/useAuthValue'
import type { AddToCartRequest } from '@/features/cart/types/cart.types'
import { toast } from 'react-toastify'

export const CART_KEY = ['cart']

export const useCart = () => {
  const { user } = useAuthValue()
  const qc = useQueryClient()

  const { data: cart, isLoading } = useQuery({
    queryKey: CART_KEY,
    queryFn: cartService.getCart,
    enabled: !!user,
    staleTime: QUERY_TIMES.SHORT,
  })

  const addItem = useMutation({
    mutationFn: cartService.addItem,
    onSuccess: () => { qc.invalidateQueries({ queryKey: CART_KEY }); toast.success('Added to cart!') },
    onError: () => toast.error('Failed to add item'),
  })

  const removeItem = useMutation({
    mutationFn: cartService.removeItem,
    onSuccess: () => qc.invalidateQueries({ queryKey: CART_KEY }),
  })

  const increaseItem = useMutation({
    mutationFn: cartService.increaseItem,
    onSuccess: () => qc.invalidateQueries({ queryKey: CART_KEY }),
  })

  const decreaseItem = useMutation({
    mutationFn: cartService.decreaseItem,
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
