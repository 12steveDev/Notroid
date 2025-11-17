// sharedPreferences.js
const SharedPreferences = {
    _resolvePath(appPackage, activityName, localName){
        return `notlocal.${appPackage}.${activityName}.${localName}`;
    },
    put(appPackage, itemName, value){
        
    },
    get(){

    },
    remove(){

    },
}