import { BaseProvider } from './base.provider.js'
import { HttpMethods } from './constants.js';

export class KeyboardsProvider extends BaseProvider {
  static instance;

  constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new KeyboardsProvider();
    }
    return this.instance;
  }

  async getKeyboards() {
    return await this.fetchInstance('keyboards');
  }

  async getKeyboardById(id) {
    return await this.fetchInstance(`keyboards/${id}`);
  }

  async createKeyboard(body) {
    return await this.fetchInstance('keyboards', { method: HttpMethods.POST, body: JSON.stringify(body) })
  }

  async deleteKeyboard(id) {
    return await this.fetchInstance(`keyboards/${id}`, { method: HttpMethods.DELETE })
  }

  async updateKeyboard(id, body) {
    return await this.fetchInstance(`keyboards/${id}`, { method: HttpMethods.PATCH, body: JSON.stringify(body) })
  }
}
