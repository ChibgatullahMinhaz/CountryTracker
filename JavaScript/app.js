console.log('connected')

const allCountries = 'https://restcountries.com/v3.1/all';

const fetData =async (url,callbakFn)=>{
const res = await fetch(url);
const Countries = await res.json();
callbakFn(Countries);

}

const displayCountris = (countries)=>{

    countries.forEach(countrie => {
        console.log(countrie.name.common);
    });
}
fetData(allCountries,displayCountris);
