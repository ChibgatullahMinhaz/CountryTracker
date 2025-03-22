document.getElementById('backBtn').addEventListener('click', (e) => {
    window.location.href = '../index.html'
});
const container = document.getElementById('detailsContainer');

const getData = JSON.parse(localStorage.getItem('selectedCountry'));
console.log(getData.borders);
const div = document.createElement('div');
div.classList.add('flex', 'md:flex-row', 'flex-col', 'md:justify-between', 'items-center');

div.innerHTML = `
 <div class="w-full rounded-lg">
                    <img class="w-full md:max-w-md " src="${getData.flags.png}" alt="">
                </div>
                <div class="w-full lg:mt-0 mt-4">
                    <div class="grid grid-cols-1 md:grid-cols-2">
                        <div>
                            <h1 class="font-extrabold capitalize text-3xl mb-3">${getData.name.common}</h1>
                            <p class="font-semibold capitalize text-xl mb-2">Native Name: ${getData.name.nativeName.eng?.common || getData.name.common }</p>
                            <p> <span class="font-bold capitalize text-xl mb-2">population:</span>  ${getData.population} </p>
                            <p><span class="font-bold capitalize text-xl mb-2">Region:</span> ${getData.region} </p>
                            <p><span class="font-bold capitalize text-xl mb-2">Sub Region:</span> ${getData.subregion} </p>
                            <p><span class="font-bold capitalize text-xl mb-2">capital:</span> ${getData.capital}</p>

                        </div>
                        <div>
                            <p class="font-semibold capitalize text-xl mb-2">Top Level Domain:  ${getData.tld} </p>
                            <p class="font-semibold capitalize text-xl mb-2">currencies: ${getData.currencies?.SHP?.name || getData.currencies?.BDT?.name || getData.currencies?.XCD?.name || getData.currencies?.BMD?.name }</p>
                            <p class="font-semibold capitalize text-xl mb-2">Languages: ${getData.languages.eng ||getData.languages.ben}</p>

                        </div>
                    </div>
                    <!-- border countries -->
                    <div class="w-full flex flex-col md:flex-row justify-start items-center md:items-start gap-4 mt-4">
                        <p class="font-semibold capitalize justify-start text-xl mb-2">border Countries: </p>
                        <div class="flex justify-start md:justify-evenly items-center gap-3">
                           
                        </div>
                    </div>
                    
                </div>
`;

container.appendChild(div)
// theme toogling 
const detailsThemeChanger = () => {
    let isDark = localStorage.getItem('darkMode') === 'enabled';
    const themeButton = document.getElementById('themeChange');
    const applyTheme = () => {
        if (isDark) {
            document.body.style.backgroundColor = '#202c37';
            document.body.style.color = '#fff';
            themeButton.innerHTML = `
                <p class="space-x-2"><i class="fa-regular fa-moon"></i>Light Mode</p>
            `;

        } else {
            document.body.style.backgroundColor = '#fff';
            document.body.style.color = '#000';
            themeButton.innerHTML = `
                <p class="space-x-2"><i class="fa-regular fa-moon"></i>Dark Mode</p>
            `;

        }
    };

    applyTheme();

    themeButton.addEventListener('click', function () {
        isDark = !isDark;
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        applyTheme();
    });
};

detailsThemeChanger();
