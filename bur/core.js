console.log("✅ BetterVK загружен и активирован!");

window.BetterVK = {
    sendMessage: (text) => console.log("💬 Сообщение:", text),
    modifyUI: () => document.body.style.background = "#222",
    reloadPlugins: () => loadPlugins(),
    reloadThemes: () => loadThemes(),
};

function addBetterVKSettings() {
    const settingsContainer = document.querySelector('[data-testid="settings-sidebar"]');
    if (!settingsContainer) {
        console.warn("⚠️ Не найден контейнер настроек! Ожидание...");
        setTimeout(addBetterVKSettings, 1000);
        return;
    }

    let betterVKButton = document.createElement("div");
    betterVKButton.className = "settings-item";
    betterVKButton.innerHTML = `
        <span class="settings-icon">⚙️</span>
        <span class="settings-text">BetterVK</span>
    `;
    betterVKButton.style = `
        display: flex;
        align-items: center;
        padding: 10px;
        cursor: pointer;
        font-size: 14px;
        color: white;
        background: rgb(25, 25, 26);
        border-radius: 5px;
        margin: 5px 0;
    `;

    betterVKButton.onclick = openBetterVKSettings;
    settingsContainer.appendChild(betterVKButton);
}

function openBetterVKSettings() {
    const mainContainer = document.querySelector('[data-testid="settings-content"]');
    if (!mainContainer) {
        console.error("❌ Не найден контейнер содержимого настроек!");
        return;
    }

    mainContainer.innerHTML = `
        <h2 style="color: white;">⚙️ Настройки BetterVK</h2>
        <button style="margin: 10px; padding: 10px; border: none; background: #444; color: white; cursor: pointer; border-radius: 5px;" onclick="window.BetterVK.modifyUI()">🎨 Изменить UI</button>
        <button style="margin: 10px; padding: 10px; border: none; background: #444; color: white; cursor: pointer; border-radius: 5px;" onclick="window.BetterVK.reloadPlugins()">🔌 Перезагрузить плагины</button>
        <button style="margin: 10px; padding: 10px; border: none; background: #444; color: white; cursor: pointer; border-radius: 5px;" onclick="window.BetterVK.reloadThemes()">🎨 Перезагрузить темы</button>
    `.trim();
}

function loadPlugins() {
    fetch("https://raw.githubusercontent.com/BetterVK/BetterVK/main/plugins/plugins.json")
        .then(res => res.json())
        .then(plugins => {
            plugins.forEach(plugin => {
                fetch(plugin.url)
                    .then(res => res.text())
                    .then(code => {
                        let script = document.createElement("script");
                        script.textContent = code;
                        document.body.appendChild(script);
                        console.log(`✅ Плагин загружен: ${plugin.name}`);
                    })
                    .catch(err => console.error(`❌ Ошибка загрузки плагина ${plugin.name}:`, err));
            });
        })
        .catch(err => console.error("❌ Ошибка загрузки списка плагинов:", err));
}

function loadThemes() {
    fetch("https://raw.githubusercontent.com/BetterVK/BetterVK/main/themes/themes.json")
        .then(res => res.json())
        .then(themes => {
            themes.forEach(theme => {
                let link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = theme.url;
                document.head.appendChild(link);
                console.log(`✅ Тема загружена: ${theme.name}`);
            });
        })
        .catch(err => console.error("❌ Ошибка загрузки списка тем:", err));
}

window.onload = () => {
    addBetterVKSettings();
    loadPlugins();
    loadThemes();
};
