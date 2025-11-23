// utils.js
// #añadanEstoAlJavascriptVanilla
const $ = (query, parent=document) => parent.querySelector(query);
const $$ = (query, parent=document) => parent.querySelectorAll(query);
const E = (tag) => document.createElement(tag);
const isString = (value) => typeof value === "string" || value instanceof String;
const isNumber = (value) => typeof value === "number" && !isNaN(value);
const isBoolean = (value) => typeof value === "boolean";
const isCalvikArray = (value) => value instanceof CalvikArray;
const isObject = (value) => Object.prototype.toString.call(value) === "[object Object]";
const isAndroidEntorn = () => typeof AndroidBridge !== "undefined";
const randomString = (len=5,lower=true,upper=true,number=false,extras="")=>{
    let charset = "";
    if (lower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (upper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (number) charset += "0123456789";
    charset += extras;

    // Si no hay ni un solo caracter, pues... ¿qué generas? 💀
    if (!charset.length) return "";

    let result = "";
    for (let i = 0; i < len; i++){
        result += charset[Math.floor(Math.random()*charset.length)];
    }
    return result;
}
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
const popAt = (arr, index) => arr.splice(index, 1)[0];
const popWhere = (arr, cond) =>{
    const index = arr.findIndex(cond);
    if (index !== -1){
        return popAt(arr, index);
    }
    return undefined;
}
const getAt = (arr, index) => arr[index];
const getWhere = (arr, cond) =>{
    const index = arr.findIndex(cond);
    if (index !== -1){
        return getAt(arr, index);
    }
    return undefined;
}
let currentFocusedInput;
class CalvikArray extends Array {
    constructor(...items) {
        super(...items);
    }
    // Override de métodos que devuelven nuevos arrays
    map(callback) {
        return new CalvikArray(...super.map(callback));
    }
    filter(callback) {
        return new CalvikArray(...super.filter(callback));
    }
    slice(start, end) {
        return new CalvikArray(...super.slice(start, end));
    }
    concat(...arrays) {
        return new CalvikArray(...super.concat(...arrays));
    }
    toString(){
        return `[CalvikArray: ${this.join(", ")}]`;
    }
    // Método útil para Calvik
    static fromArray(array) {
        return new CalvikArray(...array);
    }
}
const RickRoll = {
    launch(){
        if (SystemConfig.getConfigValue("rickRollBlocker")) alert("¿Creistes que iba a ser tan fácil? 🗣🔥");
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
}

const PID = {
    currPid: 0,
    next(){
        return this.currPid++;
    }
}

class CalvikBreak {}
class CalvikReturn {
    constructor(value){
        this.value = value;
    }
}
class CalvikAbort {}

const desktop = $("#desktop");
const statusBar = $("#statusBar");
const statTime = $("#statTime");
const statIcons = $("#statIcons");
const notiIcons = $("#notiIcons");
const navigationBar = $("#navigationBar");

// Manage Listeners
function initializeListeners(){
    document.addEventListener("keydown", (e)=>{
        if (e.key === "Escape" && ActivityManager.activityStack.length > 0){
            e.preventDefault();
            NavigationBarManager.goBack();
        }
    })
    statusBar.addEventListener("touchstart", (e)=>StatusBarManager._statusBarActionTouchStart(e));
    statusBar.addEventListener("mousedown", (e)=>StatusBarManager._statusBarActionTouchStart(e));
    statusBar.addEventListener("touchend", (e)=>StatusBarManager._statusBarActionTouchEnd(e));
    statusBar.addEventListener("mouseup", (e)=>StatusBarManager._statusBarActionTouchEnd(e));

    document.addEventListener("focusin", (e)=>{
        setTimeout(()=>{
            if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA"){
                $("#backBtn", navigationBar).classList.add("keyboardMode");
                currentFocusedInput = e.target;
            }
        }, 2);
    })
    document.addEventListener("focusout", (e)=>{
        setTimeout(()=>{
            if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA"){
                $("#backBtn", navigationBar).classList.remove("keyboardMode");
                currentFocusedInput = null;
            }
        }, 1);
    })

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
