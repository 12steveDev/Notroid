// activityManager.js
const ActivityManager = {
    currActivity: null, // {appPackage, activityName, element}
    activityStack: [],
    calvikClasses: [
        "code",
        "all-height", "all-width",
        "flex",
        "flex-column", "flex-column-reverse",
        "flex-row", "flex-row-reverse",
        "justify-start", "justify-center", "justify-end", "justify-between", "justify-around",
        "items-start", "items-center", "items-end",
        "hide",
    ],

    _render(appPackage, activityName, elemObj){
        let elem;
        switch(elemObj.type){
            case "layout":
                elem = E("div");
                break;
            case "title":
                elem = E("h2");
                break;
            case "subtitle":
                elem = E("h3");
                break;
            case "text":
                elem = E("p");
                break;
            case "button":
                elem = E("button");
                break;
            case "input":
                elem = E("input");
                elem.type = elemObj.inputType || "text"; // text, number, password, etc.
                break;
            case "checkbox":
                elem = E("input");
                elem.type = "checkbox";
                break;
            case "textarea":
                elem = E("textarea");
                break;
            case "br":
                elem = E("br");
                break;
            default:
                elem = E("b");
                elem.textContent = `[Elemento desconocido: ${elemObj.type}]`;
                return elem;
        }
        // No hay verificación de tipo de elemento para los atributos, el dev sabe lo que hace, no es un bebé como Google piensa (#googleDespierta)
        if (elemObj.text)        elem.textContent      = Variables.resolveString(elemObj.text, appPackage, activityName);
        if (elemObj.value)       elem.value            = Variables.resolveString(elemObj.value, appPackage, activityName);
        if (elemObj.checked)     elem.checked          = Boolean(Variables.resolveString(elemObj.checked));
        if (elemObj.id)          elem.id               = this._resolveId(appPackage, activityName, elemObj.id);
        if (elemObj.placeholder) elem.placeholder      = Variables.resolveString(elemObj.placeholder, appPackage, activityName);
        if (elemObj.onclick)     elem.onclick          = ()=> Calvik.execute(appPackage, activityName, elemObj.onclick);
        if (elemObj.bg)          elem.style.background = elemObj.bg;
        if (elemObj.fg)          elem.style.color      = elemObj.fg;
        if (elemObj.padding)     elem.style.padding    = elemObj.padding;
        if (elemObj.child)       elemObj.child.forEach((chItem)=>elem.appendChild(this._render(appPackage, activityName, chItem)));
        if (elemObj.class)       elemObj.class.forEach((cClass)=>this.calvikClasses.includes(cClass) ? elem.classList.add(`not-${cClass}`) : console.warn(`La CalvikClass '${cClass}' no existe.`));
        return elem;
    },
    _resolveId(appPackage, activityName, id){
        return `notid.${appPackage}.${activityName}.${id}`;
    },
    // ["START_ACTIVITY"]
    startActivity(appPackage, activityName){
        if (!verifyAppActivity(appPackage, activityName)) return false;
        const activityObj = ActivityManager.getActivityObj(appPackage, activityName);

        const actDiv = E("div");
        actDiv.classList.add("activity", "hide");
        actDiv.appendChild(this._render(appPackage, activityName, activityObj.view));
        desktop.appendChild(actDiv);
        void actDiv.offsetWidth;
        actDiv.classList.remove("hide");

        if (this.currActivity) this.activityStack.push(this.currActivity);
        this.currActivity = {appPackage: appPackage, activityName: activityName, element: actDiv};

        if (activityObj.onCreate) Calvik.execute(appPackage, activityName, activityObj.onCreate);

    },
    // ["FINISH_ACTIVITY"]
    finishActivity(appPackage, activityName){
        if (!verifyAppActivity(appPackage, activityName)) return false;
        const activityObj = ActivityManager.getActivityObj(appPackage, activityName);

        if (activityObj.onDestroy) Calvik.execute(appPackage, activityName, activityObj.onDestroy);

        const elem = this.currActivity.element;
        elem.classList.add("hide");
        setTimeout(()=>elem.remove(), 400);
        this.currActivity = this.activityStack.length > 0 ? this.activityStack.pop() : null;
    },
    // ["ID_SET_TEXT"]
    idSetText(appPackage, activityName, id, text){
        const elem = this.getElementById(appPackage, activityName, id);
        if (!elem) return console.warn(`El elemento '${this._resolveId(appPackage, activityName, id)}' no existe`);
        elem.textContent = text;
    },
    // ["ID_GET_TEXT"]
    idGetText(appPackage, activityName, id){
        const elem = this.getElementById(appPackage, activityName, id);
        if (!elem) return console.warn(`El elemento '${this._resolveId(appPackage, activityName, id)}' no existe`);
        return elem.textContent;
    },
    // ["ID_SET_VALUE"]
    idSetValue(appPackage, activityName, id, value){
        const elem = this.getElementById(appPackage, activityName, id);
        if (!elem) return console.warn(`El elemento '${this._resolveId(appPackage, activityName, id)}' no existe`);
        elem.value = value
    },
    // ["ID_GET_VALUE"]
    idGetValue(appPackage, activityName, id){
        const elem = this.getElementById(appPackage, activityName, id);
        if (!elem) return console.warn(`El elemento '${this._resolveId(appPackage, activityName, id)}' no existe`);
        return elem.value;
    },
    // ["ID_SET_CHECKED"]
    idSetChecked(appPackage, activityName, id, checked){
        const elem = this.getElementById(appPackage, activityName, id);
        if (!elem) return console.warn(`El elemento '${this._resolveId(appPackage, activityName, id)}' no existe`);
        elem.checked = checked;
    },
    // ["ID_IS_CHECKED"]
    idIsChecked(appPackage, activityName, id){
        const elem = this.getElementById(appPackage, activityName, id);
        if (!elem) return console.warn(`El elemento '${this._resolveId(appPackage, activityName, id)}' no existe`);
        return elem.checked;
    },
    getElementById(appPackage, activityName, id){
        if (!verifyAppActivity(appPackage, activityName)) return false;

        return $(`[id="${this._resolveId(appPackage, activityName, id)}"]`, this.currActivity.element);
    },
    getActivityObj(appPackage, activityName){
        if (!verifyAppActivity(appPackage, null)) return false;
        const appObj = AppManager.getAppObj(appPackage);

        return appObj.activities[activityName];
    }
}
