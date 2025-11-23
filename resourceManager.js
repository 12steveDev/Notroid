// resourceManager.js
const ResourceManager = {
    resources: {}, // { appPackage : { layouts, strings, colors } }
    init(){
        this._reloadFromFS();
    },
    _reloadFromFS(){
        console.groupCollapsed("[ResourceManager][reloadFromFS]");
        this.resources = {};
        // Framework (/system/framework/framework-res.npk)
        const frameworkObj = this._readFrameworkRes();
        if (frameworkObj) this.registerFramework(frameworkObj.res);
        // Apps de usuario y sistema
        const data = FileSystem.readFile("", "/data/system/packages.xml");
        let json;
        try {
            json = JSON.parse(data);
        } catch {
            json = { packages: {} };
        }
        for (const appInfo of Object.values(json.packages)){
            const appF = FileSystem.readFile("", appInfo.apkPath);
            if (!appF){
                console.error(`La app '${appInfo.name}' no existe`);
                continue;
            }
            let appObj;
            try {
                appObj = JSON.parse(appF);
            } catch {
                console.error(`La app '${appInfo.name}' está corrupta`);
                continue;
            }
            this.registerApp(appObj.package, appObj.res);
        }
        console.groupEnd();
    },
    _readFrameworkRes(){
        const frameworkF = FileSystem.readFile("", "/system/framework/framework-res.npk");
        if (!frameworkF){
            console.error(`No se pudo encontrar los recursos del sistema`);
            return false;
        }
        let appObj;
        try {
            appObj = JSON.parse(frameworkF);
        } catch {
            console.error(`Alguien manoseó los recursos del sistema (está corrupto)`);
            return false;
        }
        return appObj;
    },
    registerFramework(table){
        this.resources["notroid"] = table;
    },
    registerApp(appPackage, table){
        this.resources[appPackage] = table;
    },
    // ["RES"]
    // ["NOTROID_RES"]
    getResource(appPackage, resName, itemName){
        if (!Object.keys(this.resources).includes(appPackage)){
            console.error(`No se encontraron recursos al paquete '${appPackage}'`);
            return false;
        }
        switch (resName){
            case "layout":
                return this.resources[appPackage].layouts?.[itemName] ?? false;
            case "color":
                return this.resources[appPackage].colors?.[itemName] ?? false;
            case "string":
                return this.resources[appPackage].strings?.[itemName] ?? false;
            default:
                console.warn(`Recurso desconocido: ${resName}`);
                return false;
        }
    },
}