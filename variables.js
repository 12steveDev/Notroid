// variables.js
const Variables = {
    vars: new Map(),
    // ["SET_VAR"]
    set(appPackage, varName, varValue){
        return this.vars.set(`${appPackage}.${varName}`, varValue);
    },
    // ["GET_VAR"]
    get(appPackage, varName){
        return this.vars.get(`${appPackage}.${varName}`);
    },
    // ["DEL_VAR"]
    del(appPackage, varName){
        return this.vars.delete(`${appPackage}.${varName}`);
    },
    resolveString(str, appPackage){
        return str.replace(/\$\{(.*?)\}/g, (_, key) => this.get(appPackage, key.trim()) ?? `[undefined (${appPackage}.${key.trim()})]`);
    }
}
