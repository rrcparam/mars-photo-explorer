
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

function displayPhotos(photos, description) {
    const gallery = document.getElementById('photo-container');
    const title = document.getElementById('gallery-title');
    
    gallery.innerHTML = '';
    title.textContent = description;

    if (photos.length === 0) {
        gallery.innerHTML = '<p>No photos available for this date.</p>';
        return;
    }
    photos.forEach(photo => {
        const { img_src, earth_date, camera } = photo;
        const photoElement = document.createElement('div');
        photoElement.classList.add('photo');
        photoElement.innerHTML = `
            <img src="${img_src}" alt="Mars Rover photo taken on ${earth_date} by ${camera.name}">
            <p>Taken on ${earth_date} by ${camera.name}</p>
        `;
        gallery.appendChild(photoElement);
    });
}

function displayError(message) {
    const gallery = document.getElementById('photo-container');
    gallery.innerHTML = `<p class="error">${message}</p>`;
}

async function loadInitialPhotos() {
    const significantDate = '2018-06-07';
    const photos = await fetchMarsPhotos(significantDate);
    displayPhotos(photos, 'Significant Date: Organic Molecules Discovery (June 7, 2018)');
}

document.getElementById('load-photos').addEventListener('click', async () => {
    const dateInput = document.getElementById('date-input').value;
    if (!dateInput) {
        displayError('Please select a date.');
        return;
    }

    const photos = await fetchMarsPhotos(dateInput);
    displayPhotos(photos, `Photos from ${dateInput}`);
});

window.addEventListener('load', loadInitialPhotos);
