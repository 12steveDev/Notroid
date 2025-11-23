// navigationBarManager.js
const NavigationBarManager = {
    config: {
        background: "#000000",
        foreground: "#ffffff"
    },
    // ["GET_NAVIGATION_BAR_CONFIG"]
    getConfigValue(configName){
        if (!Object.keys(this.config).includes(configName)){
            console.warn(`La configuración '${configName}' no existe.`);
            return false;
        }
        return this.config[configName];
    },
    // ["SET_NAVIGATION_BAR_CONFIG"] (P_MANAGE_NAVIGATION_BAR)
    setConfigValue(configName, configValue){
        if (!Object.keys(this.config).includes(configName)){
            console.warn(`La configuración '${configName}' no existe.`);
            return false;
        }
        this.config[configName] = configValue;
        this.apply();
        return true;
    },
    goBack(){
        if (currentFocusedInput){
            currentFocusedInput.blur();
            return true;
        }
        const currAct = ActivityManager.activityStack.at(-1); // obtiene el último elemento sin modificar el array original
        if (currAct){
            ActivityManager.finishActivity(currAct.pid);
            return true;
        }
        // wtf JAJJAJ
        if (isAndroidEntorn()){
            if (confirm("¿Quieres salir de la aplicación?")){
                AndroidBridge.finishActivity();
                return true;
            }
            return false;
        }
        if (randint(1, 100) == 12) ToastManager.show("¿Acaso quieres salir del launcher we?");
        return false;
    },
    goHome(){
        const actStack = [...ActivityManager.activityStack]; // copia para que "forEach" no falle al modificar el stack (nuevo error, nunca me había sucedido, ojo 👀)
        if (actStack.length > 0){
            let c = 0;
            actStack.forEach((act)=>{
                ActivityManager.finishActivity(act.pid);
                c++;
            });
            console.log(`${c} apps cerradas`);
            return true;
        } else {
            if (isAndroidEntorn()) AndroidBridge.finishActivity();
        }
        if (randint(1, 100) == 12) ToastManager.show("¿Acaso quieres salir del launcher we?");
        return false;
    },
    apply(){
        navigationBar.innerHTML = "";
        navigationBar.classList.remove("flex-row-reverse");

        navigationBar.style.background = this.getConfigValue("background");

        const backBtn = E("button");
        backBtn.style.color = this.getConfigValue("foreground");
        backBtn.innerHTML = `<i class="material-symbols-outlined">chevron_left</i>`;
        backBtn.id = "backBtn";
        backBtn.onclick = ()=> NavigationBarManager.goBack();

        const homeBtn = E("button");
        homeBtn.style.color = this.getConfigValue("foreground");
        homeBtn.innerHTML = `<i class="material-symbols-outlined">circle</i>`;
        homeBtn.id = "homeBtn";
        homeBtn.onclick = ()=> NavigationBarManager.goHome();

        const recentBtn = E("button");
        recentBtn.style.color = this.getConfigValue("foreground");
        recentBtn.innerHTML = `<i class="material-symbols-outlined">square</i>`;
        recentBtn.id = "recentBtn";
        recentBtn.onclick = ()=> ToastManager.show("'RecentButton' dice: Implementenme!🗣🔥");

        navigationBar.appendChild(backBtn);
        navigationBar.appendChild(homeBtn);
        navigationBar.appendChild(recentBtn);

        // usuarios raritos
        if (SystemConfig.getConfigValue("flipNavigationBar")) navigationBar.classList.add("flex-row-reverse");
    }
}
