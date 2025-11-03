// functions.js
const Functions = {
    get(appPackage, funName){
        const appObj = AppManager.getAppObj(appPackage);
        if (!appObj){
            console.warn(`La app '${appPackage}' no existe.`);
            return false;
        }
        const fun = appObj.functions[funName];
        if (!fun){
            console.warn(`La función '${funName}' (${appPackage}) no existe.`);
            return false
        }
        return fun;
    },
    // ["CALL"]
    run(appPackage, funName){
        const appObj = AppManager.getAppObj(appPackage);
        if (!appObj){
            console.warn(`La app '${appPackage}' no existe.`);
            return false;
        }
        const fun = this.get(appPackage, funName);
        if (!fun) return false;
        try {
            Calvik.execute(appPackage, fun);
        } catch (e){
            if (e instanceof CalvikReturn) return e.value;
            throw e;
        }
    }
}