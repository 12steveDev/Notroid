// utils.js
const $ = (query, parent=document) => parent.querySelector(query);
const $$ = (query, parent=document) => parent.querySelectorAll(query);
const E = (tag) => document.createElement(tag);
const isString = (value) => typeof value === "string" || value instanceof String;
const isNumber = (value) => typeof value === "number" && !isNaN(value);
const isBoolean = (value) => typeof value === "boolean";
const isObject = (value) => Object.prototype.toString.call(value) === "[object Object]";
const isCalvikArray = (value) => value instanceof CalvikArray;
const isAndroidEntorn = () => typeof AndroidBridge !== "undefined";
const randint = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const verifyAppActivity = (appPackage="null", activityName="null") => {
    if (appPackage){
        const appObj = AppManager.getAppObj(appPackage);
        if (!appObj){
            console.warn(`La app '${appPackage}' no existe.`);
            return false;
        }
    }
    if (activityName){
        const activityObj = ActivityManager.getActivityObj(appPackage, activityName);
        if (!activityObj) {
            console.warn(`La actividad '${activityName}' no existe.`);
            return false;
        }
    }
    return true;
}

const RickRoll = {
    launch(){
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
}

class CalvikBreak {}
class CalvikReturn {
    constructor(value){
        this.value = value;
    }
}
class CalvikAbort {}
class CalvikArray {
    constructor(elements = []){
        this.elements = elements;
    }
    // ["PUSH"]
    push(element){
        this.elements.push(element);
        return this;
    }
    // ["POP"]
    pop(){
        return this.elements.pop();
    }
    // ["GET_AT"]
    get(index){
        return this.elements[index];
    }
    // ["SET_AT"]
    set(index, value){
        this.elements[index] = value;
        return this;
    }
    // ["JOIN"]
    join(sep){
        return this.elements.join(sep);
    }
    // ["LENGTH"]
    get length(){
        return this.elements.length;
    }
    toString(){
        return `CalvikArray[${this.elements.join(", ")}]`;
    }
    [Symbol.iterator](){
        return this.elements[Symbol.iterator]();
    }
}

const desktop = $("#desktop");
const statusBar = $("#statusBar");
const statTime = $("#statTime");
const statIcons = $("#statIcons");
const notiIcons = $("#notiIcons");
const navigationBar = $("#navigationBar");

// Manage Listeners
function initializeListeners(){
    statusBar.addEventListener("touchstart", (e)=>StatusBarManager._statusBarActionTouchStart(e));
    statusBar.addEventListener("touchend", (e)=>StatusBarManager._statusBarActionTouchEnd(e));


    setInterval(()=>{
        const showSec = SystemConfig.getConfigValue("timeShowSeconds");
        const hour12mode = SystemConfig.getConfigValue("time12hourMode");

        const now = new Date();
        const hour = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        const ampm = hour >= 12 ? "p.m." : "a.m.";
        const hour12 = hour % 12 || 12; // convierte 0→12, 13→1, etc
        let text = `${hour12mode ? hour12 : hour}:${minutes}`;
        if (showSec) text += `:${seconds}`;
        if (hour12mode) text += ` ${ampm}`;
        statTime.textContent = text;
    }, SystemConfig.getConfigValue("timeReloadIntervalMS"));
}
