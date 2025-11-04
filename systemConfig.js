// systemConfig.js
const SystemConfig = {
    settings: JSON.parse(localStorage.getItem("SystemConfig_settings")) || {
        launcherColumns: 5,
        launcherRows: 6,
        launcherGap: 5,
        statusBarHeight: 20,
        statusBarMinSwipe: 50,
        navBarHeight: 40,
        useLocalStorage: true,
        permissionManagerLocalStorage: "PermissionManager_appPermisions",
        timeShowSeconds: false,
        time12hourMode: true,
        timeReloadIntervalMS: 1000,
        appManagerLocalStorage: "AppManager_apps",
    },

    _save(){
        if (SystemConfig.getConfigValue("useLocalStorage")){
            localStorage.setItem("SystemConfig_settings", JSON.stringify(this.settings));
        }
    },

    // ["GET_CONFIGURATION_VALUE"] (P_READ_CONFIGURATIONS)
    getConfigValue(configName){
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
        return true;
    },
    apply(){
        const cols = this.getConfigValue("launcherColumns");
        const rows = this.getConfigValue("launcherRows");
        const gap = this.getConfigValue("launcherGap");
        const statBarHeight = this.getConfigValue("statusBarHeight");
        const navBarHeight = this.getConfigValue("navBarHeight");
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