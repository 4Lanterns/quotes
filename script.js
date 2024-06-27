document.addEventListener("DOMContentLoaded", () => {
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const targetUrl = encodeURIComponent('https://www.brainyquote.com/quote_of_the_day');

    fetch(proxyUrl + targetUrl)
        .then(response => response.json())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.contents, 'text/html');

            console.log('Fetched HTML:', doc.documentElement.innerHTML);

            const imageElement = doc.querySelector('img.p-qotd');
            console.log('Image Element:', imageElement);

            if (imageElement) {
                const srcset = imageElement.getAttribute('srcset');
                console.log('Srcset:', srcset);

                const srcsetParts = srcset.split(',').map(part => part.trim());
                const highResImage = srcsetParts.find(part => part.endsWith('1200w')).split(' ')[0];
                console.log('High Res Image URL:', highResImage);

                if (highResImage) {
                    const fullUrl = 'https://www.brainyquote.com' + highResImage;
                    console.log('Full URL:', fullUrl);
                    const img = document.getElementById('quote-image');
                    img.src = fullUrl;
                    img.style.display = 'block';

                    const text = document.getElementById('quote-text');
                    text.innerHTML = imageElement.alt;
                    adjustTextSize(text, img);
                } else {
                    document.getElementById('quote-text').textContent = "Quote image not found.";
                }
            } else {
                document.getElementById('quote-text').textContent = "Quote image not found.";
            }
        })
        .catch(error => {
            console.error('Error fetching the quote of the day:', error);
            document.getElementById('quote-text').textContent = "Failed to load quote.";
        });
});

const adjustTextSize = (textElement, imgElement) => {
    const containerWidth = imgElement.clientWidth;
    const containerHeight = imgElement.clientHeight;
    textElement.style.fontSize = `${containerWidth / 20}px`;

    while (textElement.scrollWidth > containerWidth || textElement.scrollHeight > containerHeight) {
        const fontSize = parseFloat(window.getComputedStyle(textElement).fontSize);
        textElement.style.fontSize = `${fontSize - 1}px`;
    }
};
