console.log("🔥 BetterVK загружен!");

window.BetterVK = {
    plugins: [],
    themes: [],
    enabled: true,

    sendMessage: (text) => console.log("💬 Сообщение:", text),

    modifyUI: () => document.body.style.background = "#19191A",

    openSettings: () => {
        let settingsWindow = document.getElementById("bettervk-settings");
        if (settingsWindow) {
            settingsWindow.style.display = "block";
            return;
        }

        settingsWindow = document.createElement("div");
        settingsWindow.id = "bettervk-settings";
        settingsWindow.style = `
            position: fixed; 
            top: 50px; 
            left: 50%; 
            transform: translateX(-50%); 
            width: 400px; 
            height: 500px; 
            background: #222; 
            color: white; 
            padding: 20px; 
            z-index: 10000;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
            display: flex;
            flex-direction: column;
        `;

        settingsWindow.innerHTML = `
            <h3>⚙️ BetterVK - Настройки</h3>
            <button onclick="window.BetterVK.installPlugin()">📦 Установить плагин</button>
            <button onclick="window.BetterVK.listPlugins()">📜 Список плагинов</button>
            <button onclick="window.BetterVK.disable()">🚨 Отключить BetterVK</button>
            <button onclick="window.BetterVK.reload()">♻️ Перезапустить</button>
            <button onclick="window.BetterVK.closeSettings()">❌ Закрыть</button>
        `;

        document.body.appendChild(settingsWindow);
    },

    closeSettings: () => {
        let settingsWindow = document.getElementById("bettervk-settings");
        if (settingsWindow) {
            settingsWindow.style.display = "none";
        }
    },

    installPlugin: () => {
        let pluginUrl = prompt("Введите URL плагина:");
        if (!pluginUrl) return;

        fetch(pluginUrl)
            .then(res => res.text())
            .then(code => {
                eval(code);
                window.BetterVK.plugins.push(pluginUrl);
                console.log(`✅ Плагин установлен: ${pluginUrl}`);
                alert("Плагин установлен!");
            })
            .catch(err => console.error("❌ Ошибка загрузки плагина:", err));
    },

    listPlugins: () => {
        console.log("📜 Установленные плагины:", window.BetterVK.plugins);
        alert("Установленные плагины:\n" + window.BetterVK.plugins.join("\n"));
    },

    disable: () => {
        console.warn("🚨 BetterVK отключен!");
        window.BetterVK.enabled = false;
        document.getElementById("bettervk-menu")?.remove();
        document.getElementById("bettervk-settings")?.remove();
    },

    reload: () => {
        console.log("♻️ Перезапуск BetterVK...");
        window.location.reload();
    },

    log: (message) => console.log(`[BetterVK] ${message}`)
};

window.bvk = {
    help: () => {
        console.log("🔹 Команды BetterVK:");
        console.log("📦 bvk.installPlugin() - Установить плагин");
        console.log("📜 bvk.listPlugins() - Список установленных плагинов");
        console.log("🚨 bvk.disable() - Отключить BetterVK");
        console.log("♻️ bvk.reload() - Перезапустить BetterVK");
    },

    installPlugin: window.BetterVK.installPlugin,
    listPlugins: window.BetterVK.listPlugins,
    disable: window.BetterVK.disable,
    reload: window.BetterVK.reload
};

console.log("✅ BetterVK Dev Console готова! Введите `bvk.help()` для списка команд.");

window.onload = () => {
    setTimeout(() => {
        if (window.BetterVK.enabled) window.BetterVK.openSettings();
    }, 2000);
};
