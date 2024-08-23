const apiKey = 'd752dae184f44ad899f0cae6f3d80752';

document.getElementById('category-select').addEventListener('change', function() {
    const category = this.value;
    fetchNews(category);
});

async function fetchNews(category) {
    const apiUrl = `https://newsapi.org/v2/everything?q=${category}&sortBy=popularity&apiKey=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === "ok") {
            displayNews(data.articles);
        } else {
            console.error("Error al obtener noticias:", data.message);
        }
    } catch (error) {
        console.error("Error al conectar con la API:", error);
    }
}

function displayNews(articles) {
    const newsGrid = document.getElementById('news-grid');
    newsGrid.innerHTML = ''; // Limpiar noticias anteriores

    articles.forEach(article => {
        // Verifica si el artículo tiene un título e imagen
        if (article.title && article.urlToImage) {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';

            newsItem.innerHTML = `
                <h3>${article.title}</h3>
                <img src="${article.urlToImage}" alt="${article.title}" style="width:100%; height:auto;"/>
                <p>${article.description || 'Descripción no disponible.'}</p>
                <a href="${article.url}" target="_blank">Leer más</a>
            `;

            newsGrid.appendChild(newsItem);
        }
    });

}

// Llamada inicial para cargar la categoría por defecto
fetchNews('sports');
