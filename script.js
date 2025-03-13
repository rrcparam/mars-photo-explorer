
const API_KEY = 'jhsbXrUFlurauiRn6lxOIVzgu8xGlJ9Cdd19gFTu'; 
const BASE_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';

// Fetch photos from NASA API based on Earth date
async function fetchMarsPhotos(date) {
    try {
        const url = `${BASE_URL}?earth_date=${date}&api_key=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.photos.slice(0, 3); // Return first 3 photos
    } catch (error) {
        console.error('Error fetching photos:', error);
        displayError(`Failed to load photos: ${error.message}`);
        return [];
    }
}

