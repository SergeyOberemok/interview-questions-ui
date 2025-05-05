import { applicationJsonHeader } from '@/core/constants'

export class HttpRepository {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async get(params = {}) {
    const queryParams = new URLSearchParams({ ...params }).toString()
    const url = `${this.baseUrl}?${queryParams}`

    try {
      const response = await fetch(url)
      const result = await response.json()

      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async post(data) {
    const options = {
      method: 'POST',
      headers: { ...applicationJsonHeader },
      body: JSON.stringify(data),
    }

    try {
      const response = await fetch(this.baseUrl, options)
      const result = await response.json()

      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async put(id, data) {
    const options = {
      method: 'PATCH',
      headers: { ...applicationJsonHeader },
      body: JSON.stringify(data),
    }
    const url = `${this.baseUrl}/${id}`

    try {
      const response = await fetch(url, options)
      const result = await response.json()

      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async delete(id) {
    const options = {
      method: 'DELETE',
      headers: { ...applicationJsonHeader },
    }
    const url = `${this.baseUrl}/${id}`

    try {
      const response = await fetch(url, options)

      return await response.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
