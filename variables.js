// variables.js
const Variables = {
    vars: new Map(),
    _resolveVarName(appPackage, activityName, varName){
        return `notvar.${appPackage}.${activityName}.${varName}`;
    },
    // ["SET_VAR"]
    set(appPackage, activityName, varName, varValue){
        return this.vars.set(this._resolveVarName(appPackage, activityName, varName), varValue);
    },
    // ["GET_VAR"]
    get(appPackage, activityName, varName){
        return this.vars.get(this._resolveVarName(appPackage, activityName, varName));
    },
    // ["DEL_VAR"]
    del(appPackage, activityName, varName){
        return this.vars.delete(this._resolveVarName(appPackage, activityName, varName));
    },
    clearByActivity(appPackage, activityName){
        for (const key of this.vars.keys()){
            if (key.startsWith(`notvar.${appPackage}.${activityName}.`)){
                this.vars.delete(key);
            }
        }
    },
    resolveString(str, appPackage, activityName){
        return str.replace(/\$\{(.*?)\}/g, (_, key) =>{
            if (key.startsWith("[") && key.endsWith("]")){
                return Calvik.execute(appPackage, activityName, JSON.parse(key));
            } else {
                return this.get(appPackage, activityName, key.trim()) ?? `[undefined (${this._resolveVarName(appPackage, activityName, key.trim())})]`;
            }
        });
    }
}
