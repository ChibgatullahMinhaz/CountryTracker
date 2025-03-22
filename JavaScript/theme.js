const DarkMode = () => {
    let isDark = localStorage.getItem('darkMode') === 'enabled';
    const themeButton = document.getElementById('themeChange');
    const inputField = document.getElementById('search-input'); 
    const headingtag = document.getElementsByTagName('h1')

    const applyTheme = () => {
        if (isDark) {
            document.body.style.backgroundColor = '#202c37';
            document.body.style.color = '#fff';
            themeButton.innerHTML = `
                <p class="space-x-2"><i class="fa-regular fa-moon"></i>Light Mode</p>
            `;
            inputField.style.backgroundColor = '#202c37';
            inputField.style.color = '#fff';
            inputField.style.borderColor = '#fff';
            inputField.style.setProperty("color", "#ccc"); 
        } else {
            document.body.style.backgroundColor = '#fff';
            document.body.style.color = '#000';
            themeButton.innerHTML = `
                <p class="space-x-2"><i class="fa-regular fa-moon"></i>Dark Mode</p>
            `;
            inputField.style.backgroundColor = '#fff';
            inputField.style.color = '#000';
            inputField.style.borderColor = '#000';
            inputField.style.setProperty("color", "#777");
        }
    };

    applyTheme();

    themeButton.addEventListener('click', function () {
        isDark = !isDark;
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        applyTheme();
    });
};

DarkMode();


