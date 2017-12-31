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
    'category': PRODUCT_CATEGORY_BOOK,
    'price': 17.99
  },
  {
    id: 2,
    'name': 'potato chips',
    'category': PRODUCT_CATEGORY_FOOD,
    'price': 3.99
  },
  {
    id: 3,
    'name': 'pencil',
    'category': PRODUCT_CATEGORY_STATIONARY,
    'price': 2.99
  },
  {
    id: 4,
    'name': 'shirt',
    'category': PRODUCT_CATEGORY_CLOTHING,
    'price': 29.99
  }
]

export { mockProducts }
