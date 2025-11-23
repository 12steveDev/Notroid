// appManager.js
const AppManager = { // (aka PackageManager)
    apps: [], // caché de las apps
    _verify(appObj){
        // Verificar una app
        return (
                       typeof appObj.package       === "string" &&
                       typeof appObj.icon          === "string" &&
                       typeof appObj.name          === "string" &&
            Number.isInteger( appObj.versionCode   )            &&
                              appObj.activities                 &&
                 Object.keys( appObj.activities    ).length >= 1
        ); // Recorre cada clave obligatoria para una app
    },
    _refreshFromFS(){
        console.groupCollapsed("[AppManager][refresh]");
        this.apps = [];
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
            this.apps.push(appObj);
        }
        console.groupEnd();
        PermissionManager._refreshFromFS();
    },
    getAppObj(appPackage){
        return this.apps.find(app => app.package === appPackage);
    },
    isSystemApp(appObj){
        return Boolean(appObj.flags?.includes("SYSTEM_APP"));
    },
    isPrivApp(appObj){
        return Boolean(appObj.flags?.includes("PRIV_APP"));
    },
    // ["INSTALL_APP"] (P_MANAGE_EXTERNAL_APPS)(P_INSTALL_APPS)
    install(appObj){
        const result = this._verify(appObj);
        if (!result){ // Error?
            ToastManager.show("No se pudo instalar porque el paquete no es válido");
            console.error("No se pudo instalar porque el paquete no es válido");
            return false;
        }
        if (this.apps.find(app => app.package === appObj.package)){
            if (!confirm(`La aplicación '${appObj.name}' ya está instalada. ¿Deseas actualizarla?`)){
                return false;
            }
            FileSystem._uninstallApp(appObj.package);
            // this.apps = this.apps.filter(app => app.package !== appObj.package); // ya no we
        }
        const r = FileSystem._installApp(appObj);
        this.refresh();
        return r;
    },
    // ["UNINSTALL_APP"] (P_MANAGE_EXTERNAL_APPS)(P_DELETE_APPS)
    uninstall(appPackage){
        if (!verifyAppActivity(appPackage, null)) return false;
        const appName = this.getAppObj(appPackage).name;
        if (!confirm(`¿Deseas eliminar '${appName}'?`)){
            return false;
        }
        const keep = confirm("¿Deseas retener los datos?"); // (aka no borrar su baby "/data/data/")
        const r = FileSystem._uninstallApp(appPackage, keep);
        this.refresh();
        return r;
    },
    // ["LAUNCH_APP"] (P_MANAGE_EXTERNAL_APPS)
    launch(appPackage){
        const appObj = this.getAppObj(appPackage);
        if (!appObj) return ToastManager.show("La app no está instalada");
        const entry = appObj.entry;

        return ActivityManager.getActivityObj(appPackage, entry) ? ActivityManager.startActivity(appPackage, entry) : ToastManager.show("No se puede iniciar esta app");
    },
    // ["QUERY_INTENT"]
    queryIntent(appPackage, action, categories){
        const results = new CalvikArray();
        for (const app of AppManager.apps){
            for (const [activityName, activityObj] of Object.entries(app.activities)){
                if (this._matchesIntent(activityObj, action, categories)){
                    results.push({
                        package: app.package,
                        activity: activityName,
                        name: app.name,
                        icon: app.icon
                    });
                }
            }
        }
        return results;
    },
    _matchesIntent(activityObj, action, categories){
        // Verificar acción
        if (action && activityObj.actions && !activityObj.actions.includes(action)){
            return false;
        }
        // Verificar categorías
        if (categories && categories.length){
            if (!activityObj.categories) return false;
            return categories.every(cat => activityObj.categories.includes(cat));
        }
        return true;
    },
    refresh(){
        this._refreshFromFS();
        $$(".app", desktop).forEach(appIcon => appIcon.remove());
        for (const app of this.queryIntent("sepaLaBola.com", "ACTION_MAIN", ["CATEGORY_LAUNCHER"])){
            // Creamos el ícono desde 0
            const appDiv = E("div");
            appDiv.className = "app flex flex-col justify-center items-center";
            
            const iconImg = E("img");
            iconImg.src = app.icon;
            
            const titleP = E("p");
            titleP.textContent = app.name;
            
            appDiv.appendChild(iconImg);
            if (SystemConfig.getConfigValue("showAppNames")) appDiv.appendChild(titleP);
            desktop.appendChild(appDiv);
            
            // Acción al hacer click
            appDiv.onclick = ()=>{
                ActivityManager.startActivity(app.package, app.activity);
            };
        }
    }
}