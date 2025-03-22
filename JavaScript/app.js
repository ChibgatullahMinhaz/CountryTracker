const showLoader = () => {
    const findloader = document.getElementById('loader')
    findloader.classList.remove('hidden');
};

const hideLoader = () => {
    const findloader = document.getElementById('loader')
    findloader.classList.add('hidden');
};


const allCountries = 'https://restcountries.com/v3.1/all';

const fetData = async (url, callbakFn) => {
    try {
        showLoader()
        const res = await fetch(url);
        const Countries = await res.json();
        callbakFn(Countries);
    } catch (error) {
        console.log('Error name is:', error.name);
        console.log('Error message is:', error.message);
        console.error('Error is:', error);
    } finally {
        hideLoader()
    }

}

const container = document.getElementById('countriesContainer');
const displayCountris = (countries) => {

    container.innerHTML = '';
    if (!Array.isArray(countries) || countries.length === 0) {
        const div = document.createElement('div');
        div.classList.add('min-h-screen');
        div.innerHTML = `
            <p class="text-xl font-semibold capitalize text-gray-600">No countries found!</p>
        `;
        container.appendChild(div);
        return;
    }
    countries.forEach(countrie => {
        const div = document.createElement('div');
        div.classList.add('bg-white', 'shadow-lg', "h-auto", 'rounded-lg', 'cursor-pointer');
        div.id = `${countrie.name.common}`
        div.innerHTML = `
         <img class="h-[200px] object-cover rounded-lg w-full" src="${countrie.flags.png}" alt="">
                <div class="p-4">
                    <h1 class="text-2xl font-extrabold text-black capitalize mb-6">${countrie.name.common}</h1>
                    <p class="text-xl font-semibold capitalize text-gray-600">population: ${countrie.population}</p>
                    <p class="text-xl font-semibold capitalize text-gray-600">region: ${countrie.region}</p>
                    <p class="text-xl font-semibold capitalize text-gray-600">capital: ${countrie.capital}</p>
                </div>
        `;
        container.appendChild(div);

        div.addEventListener('click', (e) => {
            localStorage.setItem('selectedCountry', JSON.stringify(countrie))
            window.location.href = '../views/details.html';
        })
    });
}
const searchByName = async () => {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim().toLowerCase();
    if (query === '') {
        return true;
    }

    const nameUrl = `https://restcountries.com/v3.1/name/${query}`;
    const res = await fetch(nameUrl);
    const data = await res.json();
    container.innerHTML = '';
    if (!Array.isArray(data) || data.length === 0) {
        const div = document.createElement('div');
        div.classList.add('min-h-screen');
        div.innerHTML = `
            <p class="text-xl font-semibold capitalize text-gray-600">No countries found!</p>
        `;
        container.appendChild(div);
        return;
    }
    data.forEach(countrie => {
        if (countrie.name.common.toLowerCase().includes(query)) {
            const div = document.createElement('div');
            div.classList.add('bg-white', 'shadow-lg', "h-auto", 'rounded-lg', 'cursor-pointer');
            div.id = `${countrie.name.common}`;
            div.innerHTML = `
                <img class="h-[200px] object-cover rounded-lg w-full" src="${countrie.flags.png}" alt="">
                <div class="p-4">
                    <h1 class="text-2xl font-extrabold text-black capitalize mb-6">${countrie.name.common}</h1>
                    <p class="text-xl font-semibold capitalize text-gray-600">population: ${countrie.population}</p>
                    <p class="text-xl font-semibold capitalize text-gray-600">region: ${countrie.region}</p>
                    <p class="text-xl font-semibold capitalize text-gray-600">capital: ${countrie.capital}</p>
                </div>
            `;
            container.appendChild(div);

            div.addEventListener('click', (e) => {
                localStorage.setItem('selectedCountry', JSON.stringify(countrie))
                window.location.href = '../views/details.html';
            });
        }
    });
};

const searchByCurrency = async () => {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim().toLowerCase();
    if (query === '') {
        fetData(allCountries, displayCountris);
        return;
    }

    const currencyUrl = `https://restcountries.com/v3.1/currency/${query}`;
    const res = await fetch(currencyUrl);
    const data = await res.json();
    displayCountris(data);
};

const searchHandler = async (e) => {
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length >= 4) {
        await searchByName();
    } else {
        await searchByCurrency();
    }
};

fetData(allCountries, displayCountris)
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', searchHandler);



