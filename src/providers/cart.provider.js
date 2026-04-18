import { BaseProvider } from './base.provider.js'
import { HttpMethods } from './constants.js';

export class CartProvider extends BaseProvider {
  static instance;

  constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new CartProvider();
    }
    return this.instance;
  }

  async getCartProducts() {
    return await this.fetchInstance('cart');
  }

  async addProductToCart(product) {
    return await this.fetchInstance('cart', {
      method: 'POST',
      body: JSON.stringify({ fields: product })
    })
  }

  async deleteProductFromCart(id) {
    return await this.fetchInstance(`cart/${id}`, { method: HttpMethods.DELETE })
  }

  async updateCartKeyboard(id, body) {
    return await this.fetchInstance(`cart/${id}`, { method: HttpMethods.PATCH, body: JSON.stringify(body) })
  }
}
