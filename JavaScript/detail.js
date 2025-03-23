document.getElementById('backBtn').addEventListener('click', (e) => {
    window.location.href = '../index.html'
});
const container = document.getElementById('detailsContainer');

const getData = JSON.parse(localStorage.getItem('selectedCountry'));
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
                            <p> <span class="font-bold capitalize text-xl mb-2">Native Name:</span> ${getData.name.nativeName.eng?.common || getData.name.common}</p>
                            <p> <span class="font-bold capitalize text-xl mb-2">population:</span>  ${getData.population} </p>
                            <p><span class="font-bold capitalize text-xl mb-2">Region:</span> ${getData.region} </p>
                            <p><span class="font-bold capitalize text-xl mb-2">Sub Region:</span> ${getData.subregion} </p>
                            <p><span class="font-bold capitalize text-xl mb-2">capital:</span> ${getData.capital}</p>

                        </div>
                        <div>
                            <p> <span class="font-bold capitalize text-xl mb-2">Top Level Domain: </span>   ${getData.tld} </p>
                            <p > <span class="font-bold capitalize text-xl mb-2">currencies: </span>   ${[
        'SHP', 'BDT', 'XCD', 'BMD', 'XOF', 'BZD', 'BYN', 'BWP', 'BTN', 'BAM',
        'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CUP', 'CZK', 'DJF',
        'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'FOK',
        'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL',
        'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD',
        'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD',
        'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LVL', 'LYD', 'MAD',
        'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MUR', 'MVR', 'MWK', 'MXN',
        'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB',
        'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB',
        'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLE', 'SLL',
        'SOS', 'SRD', 'SSP', 'STN', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND',
        'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS',
        'VES', 'VND', 'VUV', 'WST', 'YER', 'ZAR', 'ZMW'
    ].map(code => getData.currencies?.[code]?.name).filter(name => name).join(', ')}</p>


                           <p> <span class="font-bold capitalize text-xl mb-2">languages: </span>  ${getData.languages.eng
    || getData.languages.spa
    || getData.languages.fra
    || getData.languages.deu
    || getData.languages.ita
    || getData.languages.por
    || getData.languages.zho
    || getData.languages.ara
    || getData.languages.rus
    || getData.languages.hin
    || getData.languages.ben
    || getData.languages.jpn
    || getData.languages.kor
    || getData.languages.nld
    || getData.languages.tur
    || getData.languages.swe
    || getData.languages.pol
    || getData.languages.vie
    || getData.languages.ell
    || getData.languages.tha
    || getData.languages.fin
    || getData.languages.nor
    || getData.languages.dan
    || getData.languages.ces
    || getData.languages.hun
    || getData.languages.ron
    || getData.languages.heb
    || getData.languages.swa
    || getData.languages.tam
    || getData.languages.ud
    }
</p>



                        </div>
                    </div>
                    <!-- border countries -->
                    <div class="w-full flex flex-col md:flex-row justify-start items-center md:items-start gap-4 mt-4">
                        <p class="font-semibold capitalize justify-start text-xl mb-2">border Countries: </p>
                        <div class="flex justify-start md:justify-evenly flex-wrap items-center gap-3">
                          ${Array.isArray(getData.borders) && getData.borders.length > 0 ? 
            getData.borders.map(border => `
                <button class="btn">${border}</button>
            `).join('') 
            : 
            `<p>No border countries available</p>`
        }
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
