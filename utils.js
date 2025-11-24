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

const r = ()=>{ // XDDD
    localStorage.clear();
    location.reload();
}
function html12canvas(elem){ // bruuuhhh mi fobia son los frameworks y dependencias XDDD
    const win = window.open("", "_blank");
    const rect = elem.getBoundingClientRect();
    const canvas = E("canvas");
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext("2d");
    function drawElem(elem, offsetX, offsetY, parentRect){
        const rect = elem.getBoundingClientRect();
        const style = getComputedStyle(elem);
        // pos relativa al padre
        const relX = offsetX + (rect.left - parentRect.left);
        const relY = offsetY + (rect.top  - parentRect.top);
        // fondo
        ctx.fillStyle = style.backgroundColor;
        ctx.fillRect(relX, relY, rect.width, rect.height);
        // borde
        const borderW = parseFloat(style.borderWidth);
        if (borderW > 0){
            ctx.strokeStyle = style.borderColor;
            ctx.lineWidth = borderW;
            ctx.strokeRect(relX, relY, rect.width, rect.height);
        }
        // imagenes
        if (elem.tagName === "IMG") {
            const padL = parseFloat(style.paddingLeft);
            const padT = parseFloat(style.paddingTop);
            const contentX = relX + padL;
            const contentY = relY + padT;

            const contentW = rect.width - padL - parseFloat(style.paddingRight);
            const contentH = rect.height - padT - parseFloat(style.paddingBottom);

            try {
                ctx.drawImage(elem, contentX, contentY, contentW, contentH);
            } catch (e) {
                // por si la imagen no cargó o CORS
                ctx.fillStyle = "#ff00ff";
                ctx.fillRect(contentX, contentY, contentW, contentH);
                ctx.fillStyle = "#fff";
                ctx.fillText("IMG ERR", contentX + 4, contentY + 4);
            }

            return; // las imágenes no tienen hijos
        }
        // texto
        ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        ctx.fillStyle = style.color;
        ctx.textBaseline = "top"; // ¿qué carajos es esto??
        for (const node of elem.childNodes){
            if (node.nodeType === Node.TEXT_NODE){
                const raw = node.textContent;
                if (!raw.trim()) continue;
                
                const padL = parseFloat(style.paddingLeft);
                const padT = parseFloat(style.paddingTop);
                const maxWidth = rect.width - padL - parseFloat(style.paddingRight);

                const words = raw.split(/\s+/g);
                let line = "";
                let lineY = relY + padT;
                let lineX = relX + padL;
                const lineHeight = parseFloat(style.lineHeight) || (parseFloat(style.fontSize) * 1.2);
                // ellipsis
                if (style.whiteSpace === "nowrap") {
                    let text = raw;
                    const ellipsis = "...";
                    const maxWidth = rect.width - padL - parseFloat(style.paddingRight);
                
                    // si el texto ya cabe, dibujas normal
                    if (ctx.measureText(text).width <= maxWidth) {
                        ctx.fillText(text, relX + padL, relY + padT);
                    } else {
                        // versión con ellipsis
                        while (text.length > 0 && ctx.measureText(text + ellipsis).width > maxWidth) {
                            text = text.slice(0, -1); // corta último char
                        }
                        ctx.fillText(text + ellipsis, relX + padL, relY + padT);
                    }
                
                    // y aquí NO hacemos multilínea porque nowrap
                    continue;
                }
                // wrapping
                for (const w of words){
                    const testLine = line.length ? (line + " " + w) : w;
                    wWidth = ctx.measureText(testLine).width;
                    if (wWidth > maxWidth){
                        ctx.fillText(line, lineX, lineY)
                        line = w;
                        lineY += lineHeight;
                    } else {
                        line = testLine;
                    }
                }
                if (line.length > 0){
                    ctx.fillText(line, lineX, lineY);
                }
            }
        }
        // hijos
        for (const child of elem.children){
            drawElem(child, relX, relY, rect);
        }
    }
    drawElem(elem, 0, 0, rect);
    win.document.body.appendChild(canvas);
    canvas.onclick=()=>win.close();
    return canvas;
}

const PID = {
    currPid: 0,
    free: [], // PIDs que quedaron libres
    next(){
        // si hay PIDs libres, usa el primero
        if (this.free.length > 0){
            return this.free.shift(); // recicladito bebe
        }
        return this.currPid++;
    },
    release(pid){
        // asegurarse de no repetir frees
        if (!this.free.includes(pid)){
            this.free.push(pid);
        }
    }
}

class CalvikBreak {}
class CalvikReturn {
    constructor(value){
        this.value = value;
    }
}
class CalvikAbort {}
const Desktop = {
    addIcon(appObj){
        const appDiv = E("div");
        appDiv.className = "app flex flex-col justify-center items-center";
        
        const iconImg = E("img");
        iconImg.src = appObj.icon;
        
        const titleP = E("p");
        titleP.textContent = appObj.name;
        
        appDiv.appendChild(iconImg);
        if (SystemConfig.getConfigValue("showAppNames")) appDiv.appendChild(titleP);
        desktop.appendChild(appDiv);
        
        // Acción al hacer click
        appDiv.onclick = ()=>{
            ActivityManager.startActivity(appObj.package, appObj.activity);
        };
    }
}

const desktop = $("#desktop");
const statusBar = $("#statusBar");
const statTime = $("#statTime");
const statIcons = $("#statIcons");
const notiIcons = $("#notiIcons");
const navigationBar = $("#navigationBar");

// Manage Boot
function boot(){
    FileSystem.init();
    SystemConfig.apply();
    StatusBarManager.apply();
    NavigationBarManager.apply();
    ToastManager.show("Tiembla Google...");
    AppManager.init();
    PrivApp.installApps();
    initializeListeners();
}
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
            if ((e.target.tagName === "INPUT" && !e.target.classList.contains("switch")) || e.target.tagName === "TEXTAREA"){
                $("#backBtn", navigationBar).classList.add("keyboardMode");
                currentFocusedInput = e.target;
            }
        }, 15);
    })
    document.addEventListener("focusout", (e)=>{
        setTimeout(()=>{
            if ((e.target.tagName === "INPUT" && !e.target.classList.contains("switch")) || e.target.tagName === "TEXTAREA"){
                $("#backBtn", navigationBar).classList.remove("keyboardMode");
                currentFocusedInput = null;
            }
        }, 10);
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
