document.addEventListener("DOMContentLoaded", function() {
    const newsGrid = document.getElementById('news-grid');
    const categorySelect = document.getElementById('category-select');
    const apiKey = 'd752dae184f44ad899f0cae6f3d80752';

    function loadNews(category) {
        const newsAPIUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

        // Limpiar las noticias actuales
        newsGrid.innerHTML = '';

        fetch(newsAPIUrl)
            .then(response => response.json())
            .then(data => {
                const articles = data.articles;
                articles.forEach(article => {
                    const newsItem = document.createElement('div');
                    newsItem.className = 'blog-post';

                    // Verificar si la imagen está disponible, de lo contrario usar una imagen por defecto
                    const imageUrl = article.urlToImage ? article.urlToImage : '../img/prueba.jpg';
                    

                    newsItem.innerHTML = `
                        <h2>${article.title}</h2>
                        <img src="${imageUrl}" alt="Noticia">
                        <p>${article.description ? article.description : 'Descripción no disponible.'}</p>
                        <a href="${article.url}" target="_blank">Leer más</a>
                    `;
                    newsGrid.appendChild(newsItem);
                });
            })
            .catch(error => console.error('Error al cargar las noticias:', error));
    }

    // Cargar las noticias de la categoría inicial (por defecto 'sports')
    loadNews('sports');

    // Escuchar cambios en el selector de categoría
    categorySelect.addEventListener('change', function() {
        const selectedCategory = this.value;
        loadNews(selectedCategory);
    });
});
