console.log("✅ BetterVK загружен и активирован!");

window.BetterVK = {
    sendMessage: (text) => console.log("💬 Сообщение:", text),
    modifyUI: () => document.body.style.background = "#222",
    reloadPlugins: () => loadPlugins(),
    reloadThemes: () => loadThemes(),
};

function addBetterVKMenu() {
    let menu = document.createElement("div");
    menu.id = "bettervk-menu";
    menu.style = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgb(25, 25, 26); /* Тёмный фон */
        color: white;
        padding: 12px;
        z-index: 9999;
        border-radius: 8px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
        font-family: Arial, sans-serif;
        font-size: 14px;
    `;
    menu.innerHTML = `
        <h3 style="margin: 0 0 8px 0; font-size: 16px;">⚙️ BetterVK</h3>
        <button style="width: 100%; margin: 4px 0; padding: 6px; border: none; background: #444; color: white; cursor: pointer; border-radius: 4px;" onclick="window.BetterVK.modifyUI()">🎨 Изменить UI</button>
        <button style="width: 100%; margin: 4px 0; padding: 6px; border: none; background: #444; color: white; cursor: pointer; border-radius: 4px;" onclick="window.BetterVK.reloadPlugins()">🔌 Перезагрузить плагины</button>
        <button style="width: 100%; margin: 4px 0; padding: 6px; border: none; background: #444; color: white; cursor: pointer; border-radius: 4px;" onclick="window.BetterVK.reloadThemes()">🎨 Перезагрузить темы</button>
    `.trim();
    document.body.appendChild(menu);
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
    addBetterVKMenu();
    loadPlugins();
    loadThemes();
};
