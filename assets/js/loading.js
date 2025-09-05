function loadLottieAnimation(path) {
    if (lottieAnimation) {
        lottieAnimation.destroy();
    }

    const container = document.getElementById('lottie-container');
    container.classList.remove('hidden');

    lottieAnimation = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: path
    });
}
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
let lottieAnimation;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('checkSubscriptionBtn').addEventListener('click', function () {
        const user = Telegram.WebApp.initDataUnsafe?.user;
        if (user) {
            loadLottieAnimation('assets/js/loading.json');
            document.getElementById('message').textContent = "Проверяем подписку...";
            document.getElementById('channelPrompt').classList.add('hidden');
            document.getElementById('checkSubscriptionBtn').classList.add('hidden');
            checkSubscription(user.id);
        }
    });
    const lottieContainer = document.getElementById('lottie-container');
    const messageElement = document.getElementById('message');
    loadLottieAnimation('assets/js/loading.json');

    if (!window.Telegram || !Telegram.WebApp) {
        loadLottieAnimation('assets/js/error.json');
        messageElement.textContent = "Откройте через Telegram.";
        return;
    }

    Telegram.WebApp.expand();
    const user = Telegram.WebApp.initDataUnsafe?.user;

    if (!user) {
        loadLottieAnimation('assets/js/error.json');
        messageElement.textContent = "Ошибка: недостаточно данных.";
        return;
    }

    checkSubscription(user.id);
});

function checkSubscription(user_id) {
    loadLottieAnimation('assets/js/loading.json');
    document.getElementById('message').textContent = "Проверяем подписку...";
    document.getElementById('channelPrompt').classList.add('hidden');
    document.getElementById('checkSubscriptionBtn').classList.add('hidden');
    fetch("http://213.176.73.102:5000/check_subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user_id, chat_id: user_id })
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (data.error) {
                loadLottieAnimation('assets/js/error.json');
                document.getElementById('message').textContent = `Ошибка: ${data.error}`;
                return;
            }

            if (!data.needs_subscription) {
                document.getElementById('message').textContent = "Доступ разрешён!";
                setTimeout(() => { window.location.href = "start.html"; }, 1000);
            } else {
                loadLottieAnimation('assets/js/loading.json');
                document.getElementById('message').textContent = "Для продолжения подпишитесь:";
                document.getElementById('channelPrompt').classList.remove('hidden');
                document.getElementById('checkSubscriptionBtn').classList.remove('hidden');

                const channelsList = document.getElementById('channelsList');
                channelsList.innerHTML = data.missing_channels.map(ch => `
    <div class="channels telegram-container">
        ${ch.avatar
                        ? `<img src="${ch.avatar}" class="avatar">`
                        : `<div class="avatar-placeholder">${ch.name ? ch.name[0].toUpperCase() : '?'}</div>`
                    }
        <div class="channel_name">${ch.name}</div>
        <button class="channel_link_buttons" 
                onclick="window.open('${ch.link}', '_blank')">
            Перейти
        </button>
    </div>
`).join('');
            }
        })
        .catch(error => {
            loadLottieAnimation('assets/js/error.json');
            document.getElementById('message').textContent = "Ошибка соединения: " + error.message;
        });
}