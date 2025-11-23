// activityManager.js
const ActivityManager = {
    activityStack: [], // {appPackage, activityName, element, pid}
    calvikClasses: [
        "code",
        "all-height", "all-width",
        "flex",
        "flex-column", "flex-column-reverse",
        "flex-row", "flex-row-reverse",
        "justify-start", "justify-center", "justify-end", "justify-between", "justify-around",
        "items-start", "items-center", "items-end",
        "hide",
        "ellipsis"
    ],

    _render(pid, elemObj){
        // ¿LayoutInflater de bajo presupuesto?😭🥀
        let elem;
        switch(elemObj.type){
            case "layout":
                elem = E("div");
                break;
            case "grid":
                elem = E("div");
                elem.style.display = "grid";
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
            case "small":
                elem = E("small");
                break;
            case "icon":
                elem = E("i");
                elem.classList.add("material-symbols-outlined");
                break;
            case "img":
                elem = E("img");
                break;
            case "button":
                elem = E("button");
                break;
            case "input":
                elem = E("input");
                elem.type = elemObj.inputType || "text"; // text, number, password, etc.
                break;
            case "switch":
                elem = E("input");
                elem.type = "checkbox";
                elem.classList.add("switch");
                break;
            case "textarea":
                elem = E("textarea");
                break;
            case "br":
                elem = E("br");
                break;
            case "webview":
                elem = E("iframe");
                break;
            default:
                elem = E("b");
                elem.textContent = `[Elemento desconocido: ${elemObj.type}]`;
                return elem;
        }
        // No hay verificación de tipo de elemento para los atributos, el dev sabe lo que hace, no es un bebé como Google piensa (#googleDespierta)
        if (elemObj.text)        elem.textContent      = Variables.resolveString(elemObj.text, appPackage, activityName);
        if (elemObj.textAlign)   elem.style.textAlign  = Variables.resolveString(elemObj.textAlign, appPackage, activityName);
        if (elemObj.fontSize)    elem.style.fontSize   = Variables.resolveString(elemObj.fontSize, appPackage, activityName);
        if (elemObj.value)       elem.value            = Variables.resolveString(elemObj.value, appPackage, activityName);
        if (elemObj.checked)     elem.checked          = Boolean(Calvik.execute(appPackage, activityName, elemObj.checked));
        if (elemObj.width)       elem.style.width      = elemObj.width;
        if (elemObj.height)      elem.style.height     = elemObj.height;
        if (elemObj.id)          elem.id               = this._resolveId(appPackage, activityName, elemObj.id);
        if (elemObj.placeholder) elem.placeholder      = Variables.resolveString(elemObj.placeholder, appPackage, activityName);
        if (elemObj.onclick)     elem.onclick          = ()=>{
            try {
                Calvik.execute(pid, elemObj.onclick);
            } catch(e){
                if (e instanceof CalvikAbort){
                    return false;
                }
                throw e;
            }
        }
        if (elemObj.ondblclick)  elem.ondblclick       = ()=>{
            try {
                Calvik.execute(pid, elemObj.ondblclick);
            } catch(e){
                if (e instanceof CalvikAbort){
                    return false;
                }
                throw e;
            }
        }
        if (elemObj.oninput)     elem.oninput          = ()=>{
            try {
                Calvik.execute(pid, elemObj.oninput);
            } catch(e){
                if (e instanceof CalvikAbort){
                    return false;
                }
                throw e;
            }
        }
        if (elemObj.onchange)    elem.onchange         = ()=>{
            try {
                Calvik.execute(pid, elemObj.onchange);
            } catch(e){
                if (e instanceof CalvikAbort){
                    return false;
                }
                throw e;
            }
        }
        if (elemObj.bg)          elem.style.background = elemObj.bg;
        if (elemObj.fg)          elem.style.color      = elemObj.fg;
        if (elemObj.padding)     elem.style.padding    = elemObj.padding;
        if (elemObj.margin)      elem.style.margin     = elemObj.margin;
        if (elemObj.src)         elem.src              = Variables.resolveString(elemObj.src, appPackage, activityName);
        if (elemObj.child)       elemObj.child.forEach((chItem)=>elem.appendChild(this._render(appPackage, activityName, chItem)));
        if (elemObj.class)       elemObj.class.forEach((cClass)=>this.calvikClasses.includes(cClass) ? elem.classList.add(`not-${cClass}`) : console.warn(`La CalvikClass '${cClass}' no existe.`));
        if (elemObj.gridRows)    elem.style.gridTemplateRows    = elemObj.gridRows;
        if (elemObj.gridColumns) elem.style.gridTemplateColumns = elemObj.gridColumns;
        return elem;
    },
    _resolveId(pid, id){
        return `notid.pid-${pid}.${id}`;
    },
    _resolvePid(pid){
        return `act-${pid}`;
    },
    getPCB(pid){
        return getWhere(this.activityStack, act => act.pid === pid);
    },
    // ["START_ACTIVITY"]
    // ["START_INTENT"]
    startActivity(appPackage, activityName, intentData={}){
        if (!verifyAppActivity(appPackage, activityName)) return false;
        const activityObj = ActivityManager.getActivityObj(appPackage, activityName);

        const pid = PID.next(); // hermano, una instancia COMPLETA depende de este numerito😭

        // Contenedor de la actividad
        const actDiv = E("div");
        actDiv.id = this._resolvePid(pid);
        actDiv.classList.add("activity", "hide");
        if (activityObj.background) actDiv.style.background = activityObj.background;
        if (activityObj.foreground) actDiv.style.color = activityObj.foreground;

        // Pasar datos entre actividades
        Variables.set(appPackage, activityName, "__intent_data__", intentData);

        // Añadir la actividad al stack
        this.activityStack.push({
            appPackage: appPackage,
            activityName: activityName,
            element: actDiv,
            pid: pid
        });

        // Ejecutar onCreate (antes del renderizado)
        try {
            if (activityObj.onCreate) Calvik.execute(pid, activityObj.onCreate);
        } catch (e){
            if (e instanceof CalvikAbort){ // Si la app "abortó" (ej: no se otorgaron permisos necesarios)
                this.finishActivity(appPackage, activityName);
                return false;
            }
            throw e;
        }

        // Renderizar y añadir elementos
        // actDiv.appendChild(this._render(appPackage, activityName, activityObj.view)); // deprecado🥺
        desktop.appendChild(actDiv);
        // Recargar elemento para que se muestre la transición (trucazo🔥🔥✅✅)
        void actDiv.offsetWidth;
        actDiv.classList.remove("hide");

        // Matar la última actividad de la pila si excede el límite
        if (this.activityStack.length >= SystemConfig.getConfigValue("maxActivitiesInStack")){
            const firstActPCB = this.activityStack[0];
            this.finishActivityByPid(firstActPCB.pid);
        }

        // Ejecutar onStart (después del renderizado)
        try {
            if (activityObj.onStart) Calvik.execute(pid, activityObj.onStart);
        } catch (e){
            if (e instanceof CalvikAbort){
                this.finishActivity(appPackage, activityName);
                return false;
            }
            throw e;
        }
        return pid;
    },
    // ["FINISH_ACTIVITY"]
    finishActivity(appPackage, activityName){ // PCB
        if (!verifyAppActivity(appPackage, activityName)) return false;
        const activityObj = ActivityManager.getActivityObj(appPackage, activityName);

        if (activityObj.onDestroy) Calvik.execute(appPackage, activityName, activityObj.onDestroy);
        
        Variables.clearByPID(pid);

        // remove element
        const elem = PCB.element;
        elem.classList.add("hide");
        setTimeout(()=>elem.remove(), 400);
    },
    // ["ID_CLICK"]
    idClick(appPackage, activityName, id){
        const elem = this.getElementById(appPackage, activityName, id);
        if (!elem) return console.warn(`El elemento '${this._resolveId(appPackage, activityName, id)}' no existe`);
        elem.click();
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
    // ["ID_ADD_CLASS"]
    idAddClass(appPackage, activityName, id, clazz){
        const elem = this.getElementById(appPackage, activityName, id);
        if (!elem) return console.warn(`El elemento '${this._resolveId(appPackage, activityName, id)}' no existe`);
        this.calvikClasses.includes(clazz) ? elem.classList.add(`not-${clazz}`) : console.warn(`La CalvikClass '${clazz}' no existe.`);
    },
    // ["ID_REMOVE_CLASS"]
    idRemoveClass(appPackage, activityName, id, clazz){
        const elem = this.getElementById(appPackage, activityName, id);
        if (!elem) return console.warn(`El elemento '${this._resolveId(appPackage, activityName, id)}' no existe`);
        this.calvikClasses.includes(clazz) ? elem.classList.remove(`not-${clazz}`) : console.warn(`La CalvikClass '${clazz}' no existe.`);
    },
    // ["ID_APPEND_CHILD"]
    idAppendChild(appPackage, activityName, id, elemObj){
        const elem = this.getElementById(appPackage, activityName, id);
        if (!elem) return console.warn(`El elemento '${this._resolveId(appPackage, activityName, id)}' no existe`);
        elem.appendChild(this._render(appPackage, activityName, elemObj));
    },
    // ["ID_CLEAR_CHILDS"]
    idClearChilds(appPackage, activityName, id){
        const elem = this.getElementById(appPackage, activityName, id);
        if (!elem) return console.warn(`El elemento '${this._resolveId(appPackage, activityName, id)}' no existe`);
        elem.innerHTML = "";
    },
    // ["ID_APPEND_CHILD"]
    idSetSrc(appPackage, activityName, id, src){
        const elem = this.getElementById(appPackage, activityName, id);
        if (!elem) return console.warn(`El elemento '${this._resolveId(appPackage, activityName, id)}' no existe`);
        elem.src = src;
    },
    getElementById(appPackage, activityName, id){
        if (!verifyAppActivity(appPackage, activityName)) return false;
        const actPCB = this.activityStack.find((act)=>act.appPackage === appPackage &&  act.activityName === activityName);

        return $(`[id="${this._resolveId(appPackage, activityName, id)}"]`, actPCB.element);
    },
    getActivityObj(appPackage, activityName){
        if (!verifyAppActivity(appPackage, null)) return false;
        const appObj = AppManager.getAppObj(appPackage);

        return appObj.activities[activityName];
    }
}
