
// Search validation============================================
const input = document.querySelector('#search');
const button = document.querySelector('#btn');
const error = document.querySelector('#error');

// Check input value============================================
input.addEventListener('input', (e) => {

    if (e.target.value.length >= 40) {
        error.innerText = 'Too much alphanumeric and space characters!';
        button.setAttribute('disabled', '');
    } else {
        error.innerText = '';
    }
});

// Button to search============================================
button.addEventListener('click', (event) => {
    // Prevent window reload from button============================================
    event.preventDefault();

    if (input.value !== '') {
        
        fetch(`https://gnews.io/api/v4/search?q=${input.value}&token=deb93cf655c5a33cd3a75baf580155dd&lang=en&max=9`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const container = document.querySelector('.container');
    
            // Clear all created DOM============================================
            while (container.firstChild) {
                container.removeChild(container.lastChild);
            }

            for (let i = 0; i < 9; i++) {
                // Created cards for articles============================================
                const createCard = document.createElement('div');
                createCard.classList.add('p-10');
                container.append(createCard);

                const createMainA = document.createElement('a');
                createCard.append(createMainA);

                const createMain = document.createElement('div');
                createMain.classList.add('max-w-sm', 'rounded', 'overflow-hidden', 'shadow-lg');
                createMainA.append(createMain);

                const createImg = document.createElement('img');
                createImg.classList.add('w-full');
                createImg.setAttribute('src', data.articles[i].image);
                createImg.setAttribute('alt', data.articles[i].description);
                createMain.append(createImg);

                const createText = document.createElement('div');
                createText.classList.add('px-6', 'py-4');
                createMain.append(createText);

                const createTitle = document.createElement('div');
                createTitle.classList.add('font-bold', 'text-xl', 'mb-2');
                createText.append(createTitle);

                const createTextNodeTitle = document.createTextNode(data.articles[i].title);
                createTitle.append(createTextNodeTitle);

                const createPar = document.createElement('p');
                createPar.classList.add('text-gray-700', 'text-base');
                createPar.style.textOverflow = 'ellipsis';
                createText.append(createPar);

                const createTextNodePar = document.createTextNode(data.articles[i].description);
                createPar.append(createTextNodePar);

                const createSpanDiv = document.createElement('div');
                createSpanDiv.classList.add('px-6', 'pt-4', 'pb-2');
                createMain.append(createSpanDiv);

                const createSpan = document.createElement('span');
                createSpan.classList.add('inline-block', 'bg-gray-200', 'rounded-full', 'px-3', 'py-1', 'text-sm', 'font-semibold', 'text-gray-700', 'mr-2', 'mb-2');
                createSpanDiv.append(createSpan);

                const d = data.articles[i].publishedAt
                const createTextNodeSpan = document.createTextNode(new Date(d).toISOString().slice(0, 16).replace('T',' '));
                createSpan.append(createTextNodeSpan);
        
                // Add links for articles============================================
                createMain.addEventListener('click', () => {
                    createMainA.setAttribute('href', data.articles[i].url);
                    createMainA.setAttribute('target', '_blank');
                    // Write licked article title to localStorage/into browser============================================
                    localStorage.setItem(data.articles[i].title, data.articles[i].title);
                });
            }
        })
        .catch(mistake => console.log(mistake));
    }

    // Write input value to localStorage/into browser============================================
    if (input.value !== '') {
        localStorage.setItem(input.value, input.value);
    }
});

