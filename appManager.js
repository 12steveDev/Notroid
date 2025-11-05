// appManager.js
const AppManager = {
    apps: JSON.parse(localStorage.getItem(SystemConfig.getConfigValue("appManagerLocalStorage"))) || [],
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
    _save(){
        if (SystemConfig.getConfigValue("useLocalStorage")){
            localStorage.setItem(SystemConfig.getConfigValue("appManagerLocalStorage"), JSON.stringify(this.apps));
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
            if (confirm(`La aplicación '${appObj.name}' ya está instalada. ¿Deseas actualizarla?`)){
                const index = this.apps.findIndex(app => app.package === appObj.package);
                this.apps[index] = appObj;
                this.refresh();
            }
            return false;
        }
        this.apps.push(appObj);
        this.refresh();
        return true;
    },
    // ["UNINSTALL_APP"] (P_MANAGE_EXTERNAL_APPS)(P_DELETE_APPS)
    uninstall(appPackage){
        const appObj = this.getAppObj(appPackage);
        if (!appObj){
            console.warn(`La app '${appPackage}' no existe.`);
            return false;
        }
        this.apps = this.apps.filter(app => app.package !== appPackage);
        this.refresh();
    },
    // ["LAUNCH_APP"] (P_MANAGE_EXTERNAL_APPS)
    launch(appPackage){
        const appObj = this.getAppObj(appPackage);
        if (!appObj) return ToastManager.show("La app no está instalada");
        const entry = appObj.entry;

        return ActivityManager.getActivityObj(appPackage, entry) ? ActivityManager.startActivity(appPackage, entry) : ToastManager.show("No se puede iniciar esta app");
    },
    refresh(){
        desktop.innerHTML = "";
        for (const app of this.apps){
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
        this._save();
    }
}