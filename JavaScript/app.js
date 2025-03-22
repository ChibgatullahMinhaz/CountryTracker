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

const displayCountris = (countries) => {
    const container = document.getElementById('countriesContainer');
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
        div.addEventListener('click', (e)=>{
            localStorage.setItem('selectedCountry', JSON.stringify(countrie))
            window.location.href = '../views/details.html';
        })
    });
}
fetData(allCountries, displayCountris);