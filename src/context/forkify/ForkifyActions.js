const API_URL = import.meta.env.VITE_API_URL
const KEY = import.meta.env.VITE_KEY

export const getRecipes = async query => {
  try {
    const res = await fetch(`${API_URL}?search=${query}&key=${KEY}`)
    const { data } = await res.json()
    return data
  } catch (error) {
    throw error
  }
}

export const getRecipe = async id => {
  try {
    const res = await fetch(`${API_URL}${id}?key=${KEY}`)
    const { data } = await res.json()
    return data
  } catch (error) {
    throw error
  }
}

export const uploadRecipe = async recipe => {
  try {
    const res = await fetch(`${API_URL}?key=${KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recipe)
    });
    const { data } = await res.json()
    return data
  } catch (error) {
    throw error
  }
}