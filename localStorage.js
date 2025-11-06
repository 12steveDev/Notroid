// localStorage.js
const LocalStorage = {
    _resolveLocalName(appPackage, activityName, localName){
        return `notlocal.${appPackage}.${activityName}.${localName}`;
    },
    set(appPackage, activityName, localName, value){
        if (!verifyAppActivity(appPackage, activityName)) return false;
        localStorage.setItem(this._resolveLocalName(appPackage, activityName, localName), value);
    },
    get(appPackage, activityName, localName){
        if (!verifyAppActivity(appPackage, activityName)) return false;
        localStorage.getItem(this._resolveLocalName(appPackage, activityName, localName));
    },
    del(appPackage, activityName, localName){
        if (!verifyAppActivity(appPackage, activityName)) return false;
        localStorage.removeItem(this._resolveLocalName(appPackage, activityName, localName));
    },
    clearAll(appPackage, activityName){
        if (!verifyAppActivity(appPackage, activityName)) return false;
        if (confirm(`Estás apunto de borrar toda la data que tienes en Notroid. ¿Estás seguro que quieres continuar? No hay ctrl-z.`)){
            localStorage.clear();
        }
    }
}