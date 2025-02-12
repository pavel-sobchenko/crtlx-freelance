import { cva } from 'cva'

export type Intent = 'primary' | 'secondary'
export type Size = 'sm' | 'md' | 'lg'
export type Shape = 'rectangle' | 'rounded' | 'pill'

export const button = cva({
  base: 'font-bold py-2 px-4',
  variants: {
    intent: {
      primary: 'bg-blue-500 hover:bg-blue-700 text-white',
      secondary:
        'bg-transparent text-grey-900 border border-gray-200 hover:bg-gray-100 hover:text-blue-700'
    },
    size: { sm: 'h-8 text-sm py-1', md: 'h-10 text-base', lg: 'h-12 text-lg' },
    shape: {
      rectangle: 'rounded-none',
      rounded: 'rounded',
      pill: 'rounded-full'
    }
  }
})
