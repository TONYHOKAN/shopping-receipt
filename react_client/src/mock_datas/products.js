import {
  PRODUCT_CATEGORY_FOOD,
  PRODUCT_CATEGORY_CLOTHING,
  PRODUCT_CATEGORY_BOOK,
  PRODUCT_CATEGORY_STATIONARY
} from '../configuration'

const mockProducts = [
  {
    id: 1,
    'name': 'book',
    'category': PRODUCT_CATEGORY_BOOK
  },
  {
    id: 2,
    'name': 'potato chips',
    'category': PRODUCT_CATEGORY_FOOD
  },
  {
    id: 3,
    'name': 'pencil',
    'category': PRODUCT_CATEGORY_STATIONARY
  },
  {
    id: 4,
    'name': 'shirt',
    'category': PRODUCT_CATEGORY_CLOTHING
  }
]

export { mockProducts }
