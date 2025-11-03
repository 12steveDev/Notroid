// utils.js
const $ = (query, parent=document) => parent.querySelector(query);
const $$ = (query, parent=document) => parent.querySelectorAll(query);
const E = (tag) => document.createElement(tag);
const isString = (value) => typeof value === "string" || value instanceof String;
const isNumber = (value) => typeof value === "number" && !isNaN(value);
const isObject = (value) => Object.prototype.toString.call(value) === "[object Object]";
const isCalvikArray = (value) => value instanceof CalvikArray;
const isAndroidEntorn = () => typeof AndroidBridge !== "undefined";
const randint = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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
const statIcons = $("#statIcons");
const notiIcons = $("#notiIcons");
const navigationBar = $("#navigationBar");

// Manage Listeners
function initializeListeners(){
    statusBar.addEventListener("touchstart", (e)=>StatusBarManager._statusBarActionTouchStart(e));
    statusBar.addEventListener("touchend", (e)=>StatusBarManager._statusBarActionTouchEnd(e));
}
