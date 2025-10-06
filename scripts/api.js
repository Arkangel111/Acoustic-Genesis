// scripts/api.js
const NASA_API_BASE = "https://images-api.nasa.gov";

// Example search endpoint: https://images-api.nasa.gov/search?q=apollo&media_type=image,audio

export async function searchNasaMedia(query) {
  try {
    const response = await fetch(`${NASA_API_BASE}/search?q=${encodeURIComponent(query)}&media_type=image,audio`);
    const data = await response.json();
    return data.collection.items || [];
  } catch (error) {
    console.error("Error fetching NASA data:", error);
    return [];
  }
}
