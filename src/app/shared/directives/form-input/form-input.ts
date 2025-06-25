import { cva } from 'cva'

export const formInput = cva({
  base: 'shadow border border-gray-300 rounded-lg text-gray-700 w-full gb-gray-50 py-2 px-4',
  variants: {
    size: { sm: 'text-sm', md: 'text-base', lg: 'text-lg' }
  }
})
