document.addEventListener('DOMContentLoaded', function() {
    const unsplashAccessKey = '2YHCIylev3KFxeBcNLpnhXfBr3AFW1MddiZXlSVBlzw';
    const quoteAPI = 'https://api.quotable.io/random';

    // Function to fetch daily inspirational quote
    async function fetchQuote() {
        try {
            const response = await fetch(quoteAPI);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const quoteText = `"${data.content}" - ${data.author}`;
            return quoteText;
        } catch (error) {
            console.error('Error fetching the quote:', error);
            return 'An inspirational quote will appear here daily.';
        }
    }

    // Function to fetch a random image from Unsplash
    async function fetchImage() {
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random?query=inspiration&client_id=${unsplashAccessKey}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.urls.regular;
        } catch (error) {
            console.error('Error fetching the image:', error);
            return 'https://via.placeholder.com/600x400';
        }
    }

    // Function to update the quote and image on the page
    async function updateQuoteAndImage() {
        const quoteText = await fetchQuote();
        const imageUrl = await fetchImage();

        document.getElementById('quoteText').innerText = quoteText;
        document.getElementById('quoteImage').src = imageUrl;
    }

    // Initialize the quote and image
    updateQuoteAndImage();
});
