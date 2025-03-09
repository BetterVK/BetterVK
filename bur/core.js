console.log("BetterVK загружен и активирован!");

window.BetterVK = {
    sendMessage: (text) => console.log("💬 Сообщение:", text),
    modifyUI: () => document.body.style.background = "#222",
    reloadPlugins: () => loadPlugins(),
    reloadThemes: () => loadThemes(),
};

function addBetterVKMenu() {
    let menu = document.createElement("div");
    menu.id = "bettervk-menu";
    menu.style = "position: fixed; top: 10px; right: 10px; background: #333; color: white; padding: 10px; z-index: 9999; border-radius: 5px;";
    menu.innerHTML = `
    <h3>⚙️ BetterVK</h3>
    <button onclick="window.BetterVK.modifyUI()">🎨 Изменить UI</button>
    <button onclick="window.BetterVK.reloadPlugins()">🔌 Перезагрузить плагины</button>
    <button onclick="window.BetterVK.reloadThemes()">🎨 Перезагрузить темы</button>
`.trim();

function loadPlugins() {
    fetch("https://raw.githubusercontent.com/BetterVK/BetterVK/main/plugins/plugins.json")
        .then(res => res.json())
        .then(plugins => {
            plugins.forEach(plugin => {
                fetch(plugin.url)
                    .then(res => res.text())
                    .then(code => eval(code));
                console.log("Плагин загружен:", plugin.name);
            });
        });
}

function loadThemes() {
    fetch("https://raw.githubusercontent.com/BetterVK/BetterVK/main/themes/themes.json")
        .then(res => res.json())
        .then(themes => {
            themes.forEach(theme => {
                let style = document.createElement("style");
                style.textContent = \`@import url('\${theme.url}');\`;
                document.head.appendChild(style);
                console.log("Тема загружена:", theme.name);
            });
        });
}

window.onload = () => {
    addBetterVKMenu();
    loadPlugins();
    loadThemes();
};
