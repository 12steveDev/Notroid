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

    _render(appPackage, activityName, elemObj){
        // ¿LayoutInflater de bajo presupuesto?😭🥀
        /* OJO
        El layout NO debe contener código pendiente por ejecutar, excepto los opcodes en sí.
        Toda interpolación ${...} debe resolverse ANTES de crear el DOM.
        O sea, el layout que entra a tu renderer debería ser ya 100%:
        - texto normal
        - números normales
        - URLs normales
        - opcodes puros sin strings mágicos
        Nada de dejar ${ ... } vivos.
        Porque si los dejas vivos → pasan cosas feas como capturar la última variable del loop, como antes pasaba xdd.
        */
        elemObj = Variables.resolveDeep(elemObj, appPackage, activityName);
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
        if (elemObj.text)        elem.textContent      = elemObj.text;
        if (elemObj.textAlign)   elem.style.textAlign  = elemObj.textAlign;
        if (elemObj.fontSize)    elem.style.fontSize   = elemObj.fontSize;
        if (elemObj.value)       elem.value            = elemObj.value;
        if (elemObj.checked)     elem.checked          = Boolean(Calvik.execute(appPackage, activityName, elemObj.checked));
        if (elemObj.width)       elem.style.width      = elemObj.width;
        if (elemObj.height)      elem.style.height     = elemObj.height;
        if (elemObj.id)          elem.id               = this._resolveId(appPackage, activityName, elemObj.id);
        if (elemObj.placeholder) elem.placeholder      = elemObj.placeholder;
        if (elemObj.onclick)     elem.onclick          = ()=>{
            try {
                Calvik.execute(appPackage, activityName, elemObj.onclick);
            } catch(e){
                if (e instanceof CalvikAbort){
                    return false;
                }
                throw e;
            }
        }
        if (elemObj.ondblclick)  elem.ondblclick       = ()=>{
            try {
                Calvik.execute(appPackage, activityName, elemObj.ondblclick);
            } catch(e){
                if (e instanceof CalvikAbort){
                    return false;
                }
                throw e;
            }
        }
        if (elemObj.oninput)     elem.oninput          = ()=>{
            try {
                Calvik.execute(appPackage, activityName, elemObj.oninput);
            } catch(e){
                if (e instanceof CalvikAbort){
                    return false;
                }
                throw e;
            }
        }
        if (elemObj.onchange)    elem.onchange         = ()=>{
            try {
                Calvik.execute(appPackage, activityName, elemObj.onchange);
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
        if (elemObj.src)         elem.src              = elemObj.src;
        if (elemObj.child)       elemObj.child.forEach((chItem)=>elem.appendChild(this._render(appPackage, activityName, chItem)));
        if (elemObj.class)       elemObj.class.forEach((cClass)=>this.calvikClasses.includes(cClass) ? elem.classList.add(`not-${cClass}`) : console.warn(`La CalvikClass '${cClass}' no existe.`));
        if (elemObj.gridRows)    elem.style.gridTemplateRows    = elemObj.gridRows;
        if (elemObj.gridColumns) elem.style.gridTemplateColumns = elemObj.gridColumns;
        return elem;
    },
    _resolveId(appPackage, activityName, id){
        return `notid.${appPackage}.${activityName}.${id}`;
    },
    _resolvePid(pid){
        return `act-${pid}`;
    },
    // ["START_ACTIVITY"]
    // ["START_INTENT"]
    startActivity(appPackage, activityName, intentData={}){
        console.log(`[ActivityManager][startActivity] ${appPackage} | ${activityName}`);
        if (!verifyAppActivity(appPackage, activityName)) return false;
        const activityObj = ActivityManager.getActivityObj(appPackage, activityName);

        const pid = PID.next();

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
            if (activityObj.onCreate) Calvik.execute(appPackage, activityName, activityObj.onCreate);
        } catch (e){
            if (e instanceof CalvikAbort){ // Si la app "abortó" (ej: no se otorgaron permisos necesarios)
                actDiv.remove();
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
            const firstActPCB = getAt(this.activityStack, 0);
            this.finishActivity(firstActPCB.appPackage, firstActPCB.activityName);
        }

        // Ejecutar onStart (después del renderizado)
        try {
            if (activityObj.onStart) Calvik.execute(appPackage, activityName, activityObj.onStart);
        } catch (e){
            if (e instanceof CalvikAbort){
                this.finishActivity(appPackage, activityName);
                return false;
            }
            throw e;
        }

    },
    // ["FINISH_ACTIVITY"]
    finishActivity(appPackage, activityName){
        if (!verifyAppActivity(appPackage, activityName)) return false;
        const activityObj = ActivityManager.getActivityObj(appPackage, activityName);
        const PCB = popWhere(this.activityStack, (act)=>act.appPackage === appPackage &&  act.activityName === activityName);

        if (activityObj.onDestroy) Calvik.execute(appPackage, activityName, activityObj.onDestroy);
        Variables.clearByActivity(appPackage, activityName);
        const elem = $(`#${this._resolvePid(PCB.pid)}`, desktop); // O si quieres: const elem = PCB.element;
        elem.classList.add("hide");
        setTimeout(()=>elem.remove(), 400);
    },
    // ["RES"]
    getResource(appPackage, resName, itemName){
        if (!verifyAppActivity(appPackage, null)) return false;
        const appObj = AppManager.getAppObj(appPackage);
        switch (resName){
            case "layout":
                return appObj.res.layouts?.[itemName] ?? false;
            case "color":
                return appObj.res.colors?.[itemName] ?? false;
            case "string":
                return appObj.res.strings?.[itemName] ?? false;
            default:
                console.warn(`Recurso desconocido: ${resName}`);
                return false;
        }
    },
    // ["SET_CONTENT_VIEW"]
    setContentView(appPackage, activityName, elem){
        if (!verifyAppActivity(appPackage, activityName)) return false;
        const actPCB = getWhere(this.activityStack, act=>act.appPackage === appPackage && act.activityName === activityName);
        actPCB.element.innerHTML = "";
        if (!(elem instanceof Node)) elem = ActivityManager._render(appPackage, activityName, elem);
        actPCB.element.appendChild(elem);
    },
    // ["ELEM_ADD_CLASS"]
    elemAddClass(appPackage, activityName, elem, clazz){
        this.calvikClasses.includes(clazz) ? elem.classList.add(`not-${clazz}`) : console.warn(`La CalvikClass '${clazz}' no existe.`);
    },
    // ["ELEM_REMOVE_CLASS"]
    elemRemoveClass(appPackage, activityName, elem, clazz){
        this.calvikClasses.includes(clazz) ? elem.classList.remove(`not-${clazz}`) : console.warn(`La CalvikClass '${clazz}' no existe.`);
    },
    // ["GET_ELEM_BY_ID"]
    getElementById(appPackage, activityName, id){
        if (!verifyAppActivity(appPackage, activityName)) return false;
        const actPCB = this.activityStack.find((act)=>act.appPackage === appPackage &&  act.activityName === activityName);

        return $(`[id="${this._resolveId(appPackage, activityName, id)}"]`, actPCB.element) || false;
    },
    getActivityObj(appPackage, activityName){
        if (!verifyAppActivity(appPackage, null)) return false;
        const appObj = AppManager.getAppObj(appPackage);

        return appObj.activities[activityName];
    }
}
