import { cva } from 'cva'

export const formLabel = cva({
  base: 'block font-semibold mb-2 mt-4',
  variants: {
    size: { sm: 'text-sm', md: 'text-base', lg: 'text-lg' }
  }
})
