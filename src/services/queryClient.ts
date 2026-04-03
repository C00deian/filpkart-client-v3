import { QueryClient } from '@tanstack/react-query'
import { QUERY_GC_TIME, QUERY_TIMES } from '@/config/constants'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_TIMES.DEFAULT,
      gcTime: QUERY_GC_TIME,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})