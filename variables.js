// variables.js
const Variables = {
    vars: new Map(),
    _resolveVarName(pid, varName){
        return `notvar.pid-${pid}.${varName}`;
    },
    // ["SET_VAR"]
    set(pid, varName, varValue){
        return this.vars.set(this._resolveVarName(pid, varName), varValue);
    },
    // ["GET_VAR"]
    get(pid, varName){
        return this.vars.get(this._resolveVarName(pid, varName));
    },
    // ["DEL_VAR"]
    del(pid, varName){
        return this.vars.delete(this._resolveVarName(pid, varName));
    },
<<<<<<< HEAD
    exists(pid, varName){
        return this.vars.has(this._resolveVarName(pid, varName));
    },
    clearByPID(pid){
=======
    exists(appPackage, activityName, varName){
        return this.vars.has(this._resolveVarName(appPackage, activityName, varName));
    },
    clearByActivity(appPackage, activityName){
>>>>>>> d5d913d016ecff2f081a0e56ec61eebbadab4d19
        for (const key of this.vars.keys()){
            if (key.startsWith(`notvar.pid-${pid}.`)){
                this.vars.delete(key);
            }
        }
    },
    resolveString(str, pid){
        return str.replace(/\$\{(.*?)\}/g, (_, key) =>{
            if (key.startsWith("[") && key.endsWith("]")){
                return Calvik.execute(pid, JSON.parse(key));
            } else {
                return this.get(appPackage, activityName, key.trim()) ?? `[undefined (${this._resolveVarName(pid, key.trim())})]`;
            }
        });
    },
<<<<<<< HEAD
    resolveDeep(obj, pid){
        if (typeof obj === "string") return this.resolveString(obj, pid);
        if (Array.isArray(obj)) return obj.map(x => this.resolveDeep(x, pid));
        if (typeof obj === "object" && obj !== null){
            const out = {};
            for (const k in obj){
                out[k] = this.resolveDeep(obj[k], pid);
=======
    resolveDeep(obj, appPackage, activityName){
        if (typeof obj === "string") return this.resolveString(obj, appPackage, activityName);
        if (Array.isArray(obj)) return obj.map(x => this.resolveDeep(x, appPackage, activityName));
        if (typeof obj === "object" && obj !== null){
            const out = {};
            for (const k in obj){
                out[k] = this.resolveDeep(obj[k], appPackage, activityName);
>>>>>>> d5d913d016ecff2f081a0e56ec61eebbadab4d19
            }
            return out;
        }
        return obj;
    }
}
