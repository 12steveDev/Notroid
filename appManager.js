// appManager.js
const AppManager = {
    apps: [], // caché de las apps
    _verify(appObj){
        // Verificar una app
        return (
            appObj.package &&
            appObj.name &&
            appObj.icon &&
            appObj.activities &&
            Object.keys(appObj.activities).length >= 1,
            appObj.entry
        ); // Recorre cada clave obligatoria para una app
    },
    _refreshFromFS(){
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
            let appObj;
            try {
                appObj = JSON.parse(appF);
            } catch {
                console.error(`La app '${appInfo.name}' corrupta o no existe`);
                continue;
            }
            this.apps.push(appObj);
        }
    },
    getAppObj(appPackage){
        return this.apps.find(app => app.package === appPackage);
    },
    // ["INSTALL_APP"] (P_MANAGE_EXTERNAL_APPS)(P_INSTALL_APPS)
    install(appObj){
        const result = this._verify(appObj);
        if (!result){ // Error?
            ToastManager.show("No se pudo instalar porque el paquete no es válido");
            return false;
        }
        if (this.apps.find(app => app.package === appObj.package)){
            if (!confirm(`La aplicación '${appObj.name}' ya está instalada. ¿Deseas actualizarla?`)){
                return false;
            }
            FileSystem.uninstallApp(appObj.package);
            this.apps = this.apps.filter(app => app.package !== appObj.package);
        }
        FileSystem.installApp(appObj);
        this.refresh();
        return true;
    },
    // ["UNINSTALL_APP"] (P_MANAGE_EXTERNAL_APPS)(P_DELETE_APPS)
    uninstall(appPackage){
        if (!verifyAppActivity(appPackage, null)) return false;
        const appName = this.getAppObj(appPackage).name;
        if (!confirm(`¿Deseas eliminar '${appName}'?`)){
            return false;
        }
        const keep = confirm("¿Deseas retener los datos?"); // (aka no borrar su baby "/data/data/")
        FileSystem.uninstallApp(appPackage, keep);
        this.refresh();
        return true;
    },
    // ["LAUNCH_APP"] (P_MANAGE_EXTERNAL_APPS)
    launch(appPackage){
        const appObj = this.getAppObj(appPackage);
        if (!appObj) return ToastManager.show("La app no está instalada");
        const entry = appObj.entry;

        return ActivityManager.getActivityObj(appPackage, entry) ? ActivityManager.startActivity(appPackage, entry) : ToastManager.show("No se puede iniciar esta app");
    },
    refresh(){
        this._refreshFromFS();
        $$(".app", desktop).forEach(appIcon => appIcon.remove());
        for (const app of this.apps){
            // Apps ocultas? El inicio de los viruses 👀👀🥀🥀
            if (app.hidden) continue;
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
                this.launch(app.package);
            };
        }
    }
}