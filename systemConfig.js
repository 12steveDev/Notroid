// systemConfig.js
const SystemConfig = {
    settings: JSON.parse(localStorage.getItem("SystemConfig_settings")) || {
        launcherColumns: 5,
        launcherRows: 6,
        launcherGap: 5,
        launcherBackground: "#008080",
        statusBarHeight: 20,
        statusBarMinSwipe: 50,
        navBarHeight: 40,
        useLocalStorage: true,
        permissionManagerLocalStorage: "PermissionManager_appPermisions",
        appManagerLocalStorage: "AppManager_apps",
        timeShowSeconds: true,
        time12hourMode: true,
        timeReloadIntervalMS: 1000,
        showAppNames: true,
        defaultNotificationSound: "discord-notification.mp3",
        notificationTopPopupTimeout: 5000, // Falta implementar // Duración del TopPopup de las notificaciones
        maxActivitiesInStack: 20,
        flipNavigationBar: false,
        autoGrantPermissions: false, // PELIGROSO pero útil para devs (yo JAJAJJAJ)
        clearAppDataOnUninstall: false, // Falta implementar (cómo hago un ".filter()" a localStorage? 😭🥀)
        androidSafeMode: false, // Si se ejecuta ["ANDROID_SHOW_TOAST"] en un entorno no-android, se reemplaza con ["SHOW_TOAST"] (ni google se preocupa tanto por nosotros JAJAJJAJ)
        rickRollBlocker: false, // no es "¿porqué no?", sino "¿porqué????"
        root: false, // hermano.... creo que esto será lo que romperá todo con Android.... ¡ROOT CON SOLO UN SWITCH! 🗣🗣🗣🔥🔥🔥😭😭😭😭🥀🥀🥀🥀 (aunque la verdad ni sé para que alguien querría root aquí si ya todo está expuesto al F12 JAJAJAJJA)
    },

    _save(){
        if (SystemConfig.getConfigValue("useLocalStorage")){
            localStorage.setItem("SystemConfig_settings", JSON.stringify(this.settings));
        }
    },

    // ["GET_CONFIGURATION_VALUE"] (P_READ_CONFIGURATIONS)
    getConfigValue(configName){
        // ¿"System.getProperty()" de bajo presupuesto!!????👀🥀😭🔥
        if (!Object.keys(this.settings).includes(configName)){
            console.warn(`La configuración '${configName}' no existe.`);
            return false;
        }
        return this.settings[configName];
    },
    // ["SET_CONFIGURATION_VALUE"] (P_MANAGE_CONFIGURATIONS)
    setConfigValue(configName, configValue){
        if (!Object.keys(this.settings).includes(configName)){
            console.warn(`La configuración '${configName}' no existe.`);
            return false;
        }
        this.settings[configName] = configValue;
        this.apply();
        NavigationBarManager.apply();
        AppManager.refresh();
        return true;
    },
    apply(){
        const cols = this.getConfigValue("launcherColumns");
        const rows = this.getConfigValue("launcherRows");
        const gap = this.getConfigValue("launcherGap");
        const statBarHeight = this.getConfigValue("statusBarHeight");
        const navBarHeight = this.getConfigValue("navBarHeight");
        // Ajuste de fondo
        desktop.style.background = this.getConfigValue("launcherBackground");
        // Ajuste de celdas
        desktop.style.gridTemplateColumns = `repeat(${cols}, calc((100% - ${(cols - 1) * gap}px) / ${cols}))`;
        desktop.style.gridTemplateRows = `repeat(${rows}, calc((100% - ${(rows - 1) * gap}px) / ${rows}))`;
        desktop.style.gap = `${gap}px`;
        // Ajuste de tamaño y posicion a corde de las bars (status y nav)
        desktop.style.height = `calc(100% - ${statBarHeight + navBarHeight}px)`;
        desktop.style.bottom = navBarHeight + "px";
        // Ajuste de bars
        statusBar.style.height = statBarHeight + "px";
        navigationBar.style.height = navBarHeight + "px";
        this._save();
    }
}