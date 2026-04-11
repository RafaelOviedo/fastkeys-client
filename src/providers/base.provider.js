import { BASE_API_URL, API_TOKEN } from './constants.js';

export class BaseProvider {
  static instance;

  constructor() {
    this.fetchInstance = async (endpoint, options = {}) => {
      const response = await fetch(`${BASE_API_URL}/${endpoint}`, {
        headers: {
          "Authorization": `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        ...options
      })

      return response.json();
    }
  }
}

