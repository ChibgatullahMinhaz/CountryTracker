const showLoader = () => {
    const findloader = document.getElementById("loader");
    findloader.classList.remove("hidden");
};

const hideLoader = () => {
    const findloader = document.getElementById("loader");
    findloader.classList.add("hidden");
};

const allCountries = "https://restcountries.com/v3.1/all";

const fetData = async (url, callbakFn) => {
    try {
        showLoader();
        const res = await fetch(url);
        const Countries = await res.json();
        callbakFn(Countries);
    } catch (error) {
        console.log("Error name is:", error.name);
        console.log("Error message is:", error.message);
        console.error("Error is:", error);
    } finally {
        hideLoader();
    }
};

const container = document.getElementById("countriesContainer");
const displayCountris = (countries) => {
    container.innerHTML = "";
    if (!Array.isArray(countries) || countries.length === 0) {
        const div = document.createElement("div");
        div.classList.add("h-screen", 'flex', 'justify-center', 'items-center');
        div.innerHTML = `
            <p class="text-xl text-center font-semibold capitalize text-gray-600">No countries found!</p>
        `;
        container.appendChild(div);
        return;
    }
    countries.forEach((countrie) => {
        const div = document.createElement("div");
        div.classList.add(
            "bg-white",
            "shadow-lg",
            "h-auto",
            "rounded-lg",
            "cursor-pointer"
        );
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

        div.addEventListener("click", (e) => {
            localStorage.setItem("selectedCountry", JSON.stringify(countrie));
            window.location.href = "../views/details.html";
        });
    });
};

const searchByCurrency = async (query) => {
    if (query === "") {
        fetData(allCountries, displayCountris);
        return;
    }

    try {
        showLoader()
        const currencyUrl = `https://restcountries.com/v3.1/currency/${query}`;
        const res = await fetch(currencyUrl);
        const data = await res.json();
        if (!data.status) {
            data.filter(d =>
                d.currencies &&
                Object.values(d.currencies).some(currency =>
                    currency.name.toLowerCase().includes(query)
                )
            );
            displayCountris(data);
            return true
        }
        if (data.length > 0) {
            displayCountris(data);
            return true
        }
        return false
    } catch (error) {
        console.log('error is:', error.message);
        console.log('error is:', error.name);
    } finally {
        hideLoader()
    }
};
const searchByCapital = async (query) => {
    if (query === "") {
        fetData(allCountries, displayCountris);
        return;
    }
    try {
        showLoader()
        const capitalUrl = `https://restcountries.com/v3.1/capital/${query}`;
        const res = await fetch(capitalUrl);
        const data = await res.json();
        if (data.length > 0) {
            displayCountris(data);
            return true
        }
        return false
    } catch (error) {
        console.log('error is:', error.message);
        console.log('error is:', error.name);
    } finally {
        hideLoader()
    }
};
const searchByDemonym = async (query) => {
    if (query === "") {
        fetData(allCountries, displayCountris);
        return;
    }
    try {
        showLoader();
        const Url = `https://restcountries.com/v3.1/demonym/${query}`;
        const res = await fetch(Url);
        const data = await res.json();
        if (data.length > 0) {
            displayCountris(data);
            return true
        }
        return false
    } catch (error) {
        console.log('error is:', error.message);
        console.log('error is:', error.name);
    } finally {
        hideLoader();
    }
};
const searchByTransition = async (query) => {
    if (query === "") {
        fetData(allCountries, displayCountris);
        return;
    }
    try {
        showLoader()
        const transsitionUrl = `https://restcountries.com/v3.1/translation/${query}`;
        const res = await fetch(transsitionUrl);
        const data = await res.json();
        if (data.length > 0) {
            displayCountris(data);
            return true
        }
        return false
    } catch (error) {
        console.log('error is:', error.message);
        console.log('error is:', error.name);
    } finally {
        hideLoader()
    }
};

const searchByCode = async (code) => {
    if (code === "") {
        fetData(allCountries, displayCountris);
        return;
    }
    try {
        showLoader()
        const Url = `https://restcountries.com/v3.1/alpha/${code}`;
        const res = await fetch(Url);
        const data = await res.json();
        if (data.length > 0) {
            displayCountris(data);
            return true
        }
        return false
    } catch (error) {
        console.log('error is:', error.message);
        console.log('error is:', error.name);
    } finally {
        hideLoader()
    }
};

const searchByCodeOrLng = async (language) => {
    if (language === "") {
        fetData(allCountries, displayCountris);
        return;
    }
    try {
        showLoader()
        const Url = `https://restcountries.com/v3.1/lang/${language}`;
        const res = await fetch(Url);
        const data = await res.json();
        if (data.length > 0) {
            displayCountris(data);
            return true
        }
        return false
    } catch (error) {
        console.log('error is:', error.message);
        console.log('error is:', error.name);
    } finally {
        hideLoader()
    }
};


const search = (countries) => {
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("keyup", async (e) => {
        const query = e.target.value.trim().toLowerCase();
        const searchedCountries = countries.filter((country) => {
            if (query === "") return true;

            const suffixes = Array.isArray(country.idd.suffixes) ? country.idd.suffixes : [];
            const combined = [...[country.idd.root], ...suffixes].join('')

            if (query === combined) {
                return true
            }

            if (
                country.name.common.toLowerCase() === query ||
                country.cca2.toLowerCase() === query ||
                country.ccn3 === query ||
                country.cca3.toLowerCase() === query ||
                (country.cioc && country.cioc.toLowerCase() === query) ||
                (country.tld && country.tld.some((tld) => tld.includes(query))) ||
                country.region === query.toUpperCase() ||
                (country.subregion && country.subregion.toLowerCase().includes(query))
            ) {
                return true;
            }
            return false
        });
        displayCountris(searchedCountries);
        if (searchedCountries.length <= 0) {
            const foundByCurrency = await searchByCurrency(query);
            if (foundByCurrency) return;
            const foundByCapital = await searchByCapital(query);
            if (foundByCapital) return;
            const foundBytransition = await searchByTransition(query);
            if (foundBytransition) return;
            const foundByDemonym = await searchByDemonym(query);
            if (foundByDemonym) return;
            const foundByCode = await searchByCode(query);
            if (foundByCode) return;
            const foundByCodeorLangueage = await searchByCodeOrLng(query);
            if (foundByCodeorLangueage) return;
        }
    });
};

// filter by region
const filterByRegion = (regions) => {
    const regionSelect = document.querySelector("select");
    
    regionSelect.addEventListener("change", (event) => {
        const selectedValue = event.target.value;
        const filteredRegion = regions.filter(reg => reg.region === selectedValue);
       displayCountris(filteredRegion)
    });
}
fetData(allCountries, displayCountris);
fetData(allCountries, search);
fetData(allCountries, filterByRegion)
