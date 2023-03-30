const API_URL = import.meta.env.VITE_API_URL
const KEY = import.meta.env.VITE_KEY
const TIMEOUT_SEC = import.meta.env.VITE_TIMEOUT_SEC

const timeout = s => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getRecipes = async query => {
  try {
    const res = await Promise.race([fetch(`${API_URL}?search=${query}&key=${KEY}`), timeout(TIMEOUT_SEC)]);
    const { data } = await res.json()
    return data
  } catch (error) {
    throw error
  }
}

export const getRecipe = async id => {
  try {
    const res = await Promise.race([fetch(`${API_URL}${id}?key=${KEY}`), timeout(TIMEOUT_SEC)]);
    const { data } = await res.json()
    return data
  } catch (error) {
    throw error
  }
}

export const uploadRecipe = async recipe => {
  try {
    const upload = await fetch(`${API_URL}?key=${KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recipe)
    });
    const res = await Promise.race([upload, timeout(TIMEOUT_SEC)]);
    const { data } = await res.json()
    return data
  } catch (error) {
    throw error
  }
}