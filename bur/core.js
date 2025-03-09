console.log("✅ BetterVK загружен и активирован!");

window.BetterVK = {
    sendMessage: (text) => console.log("💬 Сообщение:", text),
    modifyUI: () => document.body.style.background = "#222",
    reloadPlugins: () => loadPlugins(),
    reloadThemes: () => loadThemes(),
};

function addBetterVKSettings() {
    console.log("🔍 Поиск контейнера настроек VK...");

    const settingsContainer = document.querySelector('[data-testid="settings-sidebar"]') || 
                              document.querySelector('.SidebarSettings') || 
                              document.querySelector('.settings-menu');

    if (!settingsContainer) {
        console.warn("⚠️ Контейнер настроек не найден! Ожидание 1 секунду...");
        setTimeout(addBetterVKSettings, 1000);
        return;
    }

    console.log("✅ Контейнер настроек найден:", settingsContainer);

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

    console.log("✅ Кнопка BetterVK добавлена в настройки!");
}

function openBetterVKSettings() {
    console.log("📂 Открываем настройки BetterVK...");
    
    const mainContainer = document.querySelector('[data-testid="settings-content"]') || 
                          document.querySelector('.SettingsMain') || 
                          document.querySelector('.settings-container');

    if (!mainContainer) {
        console.error("❌ Контейнер содержимого настроек не найден!");
        return;
    }

    console.log("✅ Контейнер настроек найден:", mainContainer);

    mainContainer.innerHTML = `
        <h2 style="color: white;">⚙️ Настройки BetterVK</h2>
        <button style="margin: 10px; padding: 10px; border: none; background: #444; color: white; cursor: pointer; border-radius: 5px;" onclick="window.BetterVK.modifyUI()">🎨 Изменить UI</button>
        <button style="margin: 10px; padding: 10px; border: none; background: #444; color: white; cursor: pointer; border-radius: 5px;" onclick="window.BetterVK.reloadPlugins()">🔌 Перезагрузить плагины</button>
        <button style="margin: 10px; padding: 10px; border: none; background: #444; color: white; cursor: pointer; border-radius: 5px;" onclick="window.BetterVK.reloadThemes()">🎨 Перезагрузить темы</button>
    `.trim();
    
    console.log("✅ Окно настроек BetterVK загружено!");
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
    console.log("🔄 Запуск BetterVK...");
    addBetterVKSettings();
    loadPlugins();
    loadThemes();
};