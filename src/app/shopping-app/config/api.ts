import { environment } from 'src/environments/environment';

export const baseUrl = environment.production ? 'https://api.shopping.com': 'http://localhost:3000'
export const productsUrl = baseUrl + '/products'
export const cartUrl = baseUrl + '/cart'
export const wishlistUrl = baseUrl + '/wishlist'
export const usersUrl = baseUrl + '/users'
export const transacUrl = baseUrl + '/transac'
export const historyUrl = baseUrl + '/history'
export const productsUrl2 = baseUrl + '/product1'

