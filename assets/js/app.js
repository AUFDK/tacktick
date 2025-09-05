const applyTheme = (theme) => {
    document.documentElement.style.setProperty('--bg-color', theme.bg_color || '#f4f4f4');
    document.documentElement.style.setProperty('--text-color', theme.text_color || '#000000');
    document.documentElement.style.setProperty('--hint-color', theme.hint_color || '#666');
    document.documentElement.style.setProperty('--button-color', theme.button_color || '#5d7c9d');
    document.documentElement.style.setProperty('--button-text-color', theme.button_text_color || '#ffffff');
    document.documentElement.style.setProperty('--button-hover-color', theme.button_color ? `${theme.button_color}99` : '#0056b3');
    document.documentElement.style.setProperty('--container-bg-color', theme.bg_color ? `${theme.bg_color}99` : '#ffffff');
    document.documentElement.style.setProperty('--info-block-bg-color', theme.bg_color ? `${theme.bg_color}77` : '#eef');
};

const tg = window.Telegram.WebApp;
applyTheme(tg.themeParams);
document.addEventListener("DOMContentLoaded", () => {

    if (!window.Telegram || !Telegram.WebApp) {
        window.location.href = 'loading.html';
        return;
    }

    Telegram.WebApp.expand();
    const user = Telegram.WebApp.initDataUnsafe?.user;

    if (!user) {
        window.location.href = 'loading.html';
        return;
    }
});
function selectTactic(tactic) {
    localStorage.setItem('selectedTactic', tactic);
    window.location.href = 'tactic.html';
}
function calculateDropChance() {
    const chance = Math.floor(Math.random() * 100) + 1;
    document.getElementById('result').innerText = `Шанс выпадения: ${chance}%`;
}