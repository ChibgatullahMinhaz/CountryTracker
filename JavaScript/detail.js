document.getElementById('backBtn').addEventListener('click', (e)=>{
    window.location.href = '../index.html'
});

const getData = JSON.parse(localStorage.getItem('selectedCountry'));
console.log(getData);


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
