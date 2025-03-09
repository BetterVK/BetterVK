console.log("🔥 BetterVK загружен!");

window.BetterVK = {
    plugins: [],
    themes: [],

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

    addMenuButton: () => {
        if (!window.location.pathname.includes("im")) return; // Добавляем меню только в VK Me

        let menu = document.getElementById("bettervk-menu");
        if (menu) return;

        menu = document.createElement("div");
        menu.id = "bettervk-menu";
        menu.style = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #19191A;
            color: white;
            padding: 10px;
            z-index: 9999;
            border-radius: 5px;
        `;

        menu.innerHTML = `
            <h3>⚙️ BetterVK</h3>
            <button onclick="window.BetterVK.modifyUI()">🎨 Изменить UI</button>
            <button onclick="window.BetterVK.openSettings()">🔧 Настройки</button>
        `;

        document.body.appendChild(menu);
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
        alert("Установленные плагины:\n" + window.BetterVK.plugins.join("\n"));
    }
};

window.onload = () => {
    setTimeout(window.BetterVK.addMenuButton, 2000);
};
