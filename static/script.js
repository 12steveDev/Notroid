// static/script.js
// TODO: FileSystem, AlertDialog, Notifications, SaveStateInLocalStorage, NavigationBar(currApp, register)
// TODO: Para INSTALL_APP: Si la app ya existe, pedir actualizar y manejar eso.
const desktop = document.querySelector(".desktop");
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
let currApp = null;
const permissions = JSON.parse(localStorage.getItem("__notroid_permissions__")) || {
    "notroid.permission.WRITE_STORAGE": ["NotasChafas"],
    "notroid.permission.READ_STORAGE": ["NotasChafas"],
    "notroid.permission.INSTALL_APPS": ["NotroidStudio"],
    "notroid.permission.EXACT_IP_ACCESS🙏🤑🔥": [] // WTF 🙏☠🔥
}
const toastStack = []; // [msg]
// Default por ahora (futuro localStorage)
const icons = JSON.parse(localStorage.getItem("__notroid_icons__")) || {
    "MiApp": {
        manifest: {
            id: "MiApp",
            name: "Mi App",
            icon: "https://placehold.co/150x150/008080/FFFFFF?text=Hola\\nMundo",
            categories: [],
            permissions: []
        },
        main: {
            entry: "MAIN",
            toolbarTitle: "Épico, ¿Verdad?",
            functions: {},
            lifecycle: {
                onCreate: ["SHOW_TOAST", "Iniciando $e"],
                onDestroy: ["SHOW_TOAST", "Cerrando"]
            },
            env: {
                "e": "valor"
            }
        },
        screens: {
            "MAIN": [
                {type: "text", text: "Hola Mundo"},
                {type: "button", text: "Detalles", action: ["NAVIGATE_TO", "Details"]}
            ],
            "Details": [
                {type: "text", text: "Detalles..."},
                {type: "button", text: "...", action: ["SHOW_TOAST", "Has sido un gran explorador, pequeño bro 🗿🔥"]}
            ]
        }
    },
    "Calculadora": {
        manifest: {
            id: "Calculadora",
            name: "Calculadora",
            icon: "https://placehold.co/150x150/000000/FFFFFF?text=Calc",
            categories: [],
            permissions: []
        },
        main: {
            entry: "MAIN",
            functions: {},
            lifecycle: {
                onCreate: [],
                onDestroy: ["SHOW_TOAST", "9 + 11 queda de tarea 🗣🗣🔥🔥"]
            },
            env: {}
        },
        screens: {
            "MAIN": [
                {type: "text", text: "2 + 2 = 4", id: "label"},
                {type: "button", text: "Aburrido...", action: [["SET_TEXT", "label", "9 + 11 = 🛩🗼🔥"], ["SHOW_TOAST", "épico"]]},
                {type: "button", text: "Salir", action: ["CLOSE_APP"]}
            ]
        }
    },
    "CondicionalTest": {
        manifest: {
            id: "CondicionalTest",
            name: "Condicional Test",
            icon: "https://placehold.co/150x150/orange/fff?text=IF",
            categories: [],
            permissions: []
        },
        main: {
            entry: "MAIN",
            functions: {},
            lifecycle: {
                onCreate: [],
                onDestroy: []
            },
            env: {}
        },
        screens: {
            "MAIN": [
                {type: "text", text: "Nada aún...", id: "label"},
                {type: "input", placeholder: "Escribe algo", id: "entrada"},
                {
                    type: "button",
                    text: "Confirmar",
                    action: [
                        "IF", "$entrada",
                        ["SET_TEXT", "label", "Escribiste: $entrada"],
                        ["SET_TEXT", "label", "No escribiste nada"]
                    ]
                }
            ]
        }
    },
    "VSCodeChafa": {
        manifest: {
            id: "VSCodeChafa",
            name: "VSCode Chafa",
            icon: "https://placehold.co/150x150/FF00FF/FFFFFF?text=VSC",
            categories: ["notroid.category.ENTRY_TEXT"],
            permissions: []
        },
        main: {
            entry: "MAIN",
            functions: {},
            lifecycle: {
                onCreate: ["IF", "$__intentData", [["SET_TEXT", "label", "$__intentData"], ["NAVIGATE_TO", "GETTEXT"]]],
                onDestroy: []
            },
            env: {}
        },
        screens: {
            "MAIN": [
                {type: "text", text: "Visual Studio Code sin miedo al éxito 🗣🔥"},
                {type: "input", placeholder: "Pone tu texto aquí..."}
            ],
            "GETTEXT": [
                {type: "text", text: "Usando VSCodeChafa desde un intent implícito? Interesante... 🧐🔥"},
                {type: "text", text: "", id: "label"},
                {type: "input", placeholder: "Pone tu texto aquí...", id: "entry"},
                {type: "button", text: "Enviar respuesta", action: ["RESOLVE_INTENT", "$entry"]}
            ]
        }
    },
    "BlocDeNotasChafa": {
        manifest: {
            id: "BlocDeNotasChafa",
            name: "Bloc De Notas Chafa",
            icon: "https://placehold.co/150x150/FFFF00/000000?text=BDN",
            categories: ["notroid.category.ENTRY_TEXT"],
            permissions: []
        },
        main: {
            entry: "MAIN",
            functions: {},
            lifecycle: {
                onCreate: ["IF", "$__intentData", [["SET_TEXT", "label", "$__intentData"], ["NAVIGATE_TO", "GETTEXT"]]],
                onDestroy: []
            },
            env: {}
        },
        screens: {
            "MAIN": [
                {type: "text", text: "Bloc de notas sin miedo al éxito 🗣🔥"},
                {type: "input", placeholder: "Pone tu texto aquí..."}
            ],
            "GETTEXT": [
                {type: "text", text: "Usando BlocDeNotasChafa desde un intent implícito? Interesante... 🧐🔥"},
                {type: "text", text: "", id: "label"},
                {type: "input", placeholder: "Pone tu texto aquí...", id: "entry"},
                {type: "button", text: "Enviar respuesta", action: ["RESOLVE_INTENT", "$entry"]}
            ]
        }
    },
    "ToastManager": {
        manifest: {
            id: "ToastManager",
            name: "Toast Manager",
            icon: "https://placehold.co/150x150/770000/FFFFFF?text=T",
            categories: [],
            permissions: []
        },
        main: {
            entry: "MAIN",
            functions: {},
            lifecycle: {
                onCreate: [],
                onDestroy: []
            },
            env: {}
        },
        screens: {
            "MAIN": [
                {type: "text", text: "Todavía nada introducido...", id: "label"},
                {type: "button", text: "Mostrar Toast", action: ["SHOW_TOAST", "$label"]},
                {type: "button", text: "Escoger texto", action: ["SEND_INTENT", "notroid.category.ENTRY_TEXT", "Pone texto:", [["SET_TEXT", "label", "$__intentResult"], ["SHOW_TOAST", "Recibió: $__intentResult"]]]}
            ],
        }
    },
    "NotasChafas": {
        manifest: {
            id: "NotasChafas",
            name: "Notas Chafas",
            icon: "https://placehold.co/150x150/2222FF/FFFFFF?text=N",
            categories: [],
            permissions: ["notroid.permission.READ_STORAGE", "notroid.permission.WRITE_STORAGE"]
        },
        main: {
            entry: "HOME",
            functions: {
                saveNote: [["SAVE_ENV", "notaGuardada", "$noteInput"], ["SHOW_TOAST", "Guardado"], ["IF", "$autoLoad", ["CALL", "loadNote"]]],
                loadNote: [["LOAD_ENV", "notaGuardada", "notaGuardada"], ["IF", "$notaGuardada", ["SET_TEXT", "noteLabel", "$notaGuardada"]]]
            },
            lifecycle: {
                onCreate: [["CALL", "loadNote"]],
                onDestroy: []
            },
            env: {
                notaGuardada: ""
            }
        },
        screens: {
            "HOME": [
                {type: "text", text: "Tus notas chafas... persistentes 🧠"},
                {type: "input", id: "noteInput", placeholder: "Escribe tu nota..."},
                {type: "button", text: "Guardar Nota", action: ["CALL", "saveNote"]},
                {type: "text", id: "noteLabel", text: "nada guardado todavía..."},
                {type: "button", text: "Cargar Nota", action: ["CALL", "loadNote"]},
                {type: "button", text: "Configuraciónes", action: ["NAVIGATE_TO", "CONFIG"]},
                {type: "button", text: "Otros métodos de entrada", action: ["NAVIGATE_TO", "OTHER_METHODS"]}
            ],
            "CONFIG": [
                {type: "button", text: "<-", action: ["NAVIGATE_TO", "HOME"]}, {type: "br"},
                {type: "text", text: "Cargar automaticamente: ", inline: true},
                {type: "checkbox", id: "autoLoad", checked: true},
            ],
            "OTHER_METHODS": [
                {type: "button", text: "<-", action: ["NAVIGATE_TO", "HOME"]}, {type: "br"},
                {type: "button", text: "Otras apps de entrada de texto", action: ["SEND_INTENT", "notroid.category.ENTRY_TEXT", "Introduce la nota: ", ["SET_TEXT", "noteInput", "$__intentResult"]]}
            ]
        }
    },
    "NotroidStudio": {
        manifest: {
            id: "NotroidStudio",
            name: "Notroid Studio",
            icon: "https://placehold.co/150x150/00cc99/FFFFFF?text=NS",
            categories: ["notroid.category.CREATE_APP"],
            permissions: ["notroid.permission.INSTALL_APPS"]
        },
        main: {
            entry: "EDITOR",
            toolbarTitle: "Notroid Studio - App Creator",
            functions: {}
        },
        screens: {
            "EDITOR": [
                {type: "input", id: "code", value: '{"manifest": {"id": "miapp"}, "main": {}, "screens": {"MAIN": []}}'},
                {type: "button", text: "Instalar", action: [["SHOW_TOAST", "$code"], ["INSTALL_APP", "$code", ["IF", "$__error", ["SET_TEXT", "output", "Error: $__error. Arregla ese JSON bro."], ["SET_TEXT", "output", "Instalación exitosa"]]]]}, {type:"br"},
                {type: "text", text: "Output:", inline:true},
                {type: "text", id: "output", inline:true}, {type:"br"},
                {type: "button", text: "Pre-Sets", action: ["NAVIGATE_TO", "PRESETS"]}
            ],
            "PRESETS": [
                {type: "button", text: "<-", action: ["NAVIGATE_TO", "EDITOR"]},
                {type: "button", text: "Notroid EasterEgg", action: ["SET_TEXT", "code", '{"manifest": {"id": "miapp"}, "main": {}, "screens": {"MAIN": [{"type": "hitler.update"}]}}']},
                {type: "text", text: "Proximamente, pero es buena idea..."}
            ]
        }
    }
};

function findAppsByCategory(category){
    const finded = [];
    for (const appObj of Object.values(icons)){
        if (appObj.manifest.categories.includes(category)){
            finded.push(appObj.manifest.id);
        };
    };
    return finded;
}
function hasPermission(appId, permission){
    return permissions[permission].includes(appId) && icons[appId].manifest.permissions.includes(permission);
}
function __cond(appId, cond){
    if (typeof cond === "string"){
        return Boolean(resolveValue(appId, cond));
    } else if (Array.isArray(cond)){
        const op = cond[1];
        const a = resolveValue(appId, cond[0]);
        const b = resolveValue(appId, cond[2]);
        switch (op){
            case "==":
                return a === b;
            case "!=":
                return a !== b;
            case ">":
                return a > b;
            case "<":
                return a < b;
            case ">=":
                return a >= b;
            case "<=":
                return a <= b;
            default:
                console.warn("[__cond] Condición inesperada:", op);
                return null;
        }
    } else {
        console.error("[__cond] No se pudo leer la condición (no es string ni array)");
    }
}

function executeNotroid(appId, elem, actionArr){
    console.log(`[i] [ExecuteNotroid] ${appId}\nelem: ${elem}\nactionArr: ${actionArr[0]} - ${actionArr.slice(1)}`) // Bro esta línea convierte la consola en logs del gobierno 🙏☠
    if (!actionArr || actionArr.length === 0) return;
    const [action, ...args] = actionArr
    if (Array.isArray(action)){
        for (const act of [action, ...args]){
            executeNotroid(appId, elem, act);
        }
        return;
    }
    switch (action){
        case "NAVIGATE_TO":
            navigateTo(elem, resolveValue(appId, args[0]));
            break;
        case "SHOW_TOAST": // TODO: Añadir parametro "context" para que no lloren los de Android 🙏😭
            showToast(resolveValue(appId, args[0]));
            break;
        case "SET_TEXT":
            let target = resolveId(appId, args[0])
            target.type == "text" ? target.value = resolveValue(appId, args[1]) : target.textContent = resolveValue(appId, args[1]);
            break;
        case "SET_ENV":
            icons[appId].main.env[args[0]] = resolveValue(appId, args[1]);
            break;
        case "CLOSE_APP":
            closeApp(appId);
            break;
        case "IF":
            const cond = args.shift();
            executeNotroid(appId, elem, __cond(appId, cond) ? args[0] || [] : args[1] || []);
            break;
        case "SEND_INTENT":
            const [category, data, callback] = args;
            const apps = findAppsByCategory(category);
            let targetId;
            if (!apps) {
                showToast("No se pudo resolver la acción");
                console.error("[SEND_INTENT] No se pudo resolver:", category);
                return;
            }
            if (apps.length === 1){
                targetId = apps[0];
            } else if (apps.length > 1) {
                targetId = apps[Number(prompt(`Abrir con...\n${apps}`))];
                // TODO: Manejar un "Abrir con..." visual
            }
            icons[targetId].main.env.__pendingCallback = {
                fromApp: appId,
                callback: callback
            }
            launchApp(targetId, true, data);
            break;
        case "RESOLVE_INTENT":
            const responseData = resolveValue(appId, args[0]);
            const tcallback = icons[appId].main.env.__pendingCallback;
            if (tcallback){
                function parseIntentResults(actions, intentResult){
                    if (Array.isArray(actions)){
                        return actions.map(item => {
                            if (Array.isArray(item)){
                                return parseIntentResults(item, intentResult);
                            } else if (typeof item === "string"){
                                return item.replace(/\$__intentResult/g, intentResult);
                            } else {
                                return item;
                            }
                        });
                    }
                    return actions;
                }
                tcallback.callback = parseIntentResults(tcallback.callback, responseData);
                executeNotroid(tcallback.fromApp, null, tcallback.callback);
            }
            delete icons[appId].main.env.__pendingCallback;
            closeApp(appId);
            break;
        case "CALL":
            const actions = icons[appId].main.functions[args[0]];
            if (!actions){
                console.warn(`[ExecuteNotroid] [CALL] La función no existe: ${args[0]}`);
                return;
            }
            executeNotroid(appId, elem, actions)
            break;
        case "SAVE_ENV":
            if (!icons[appId].manifest.permissions.includes("notroid.permission.WRITE_STORAGE")){
                console.warn("[ExecuteNotroid] Acción desconocida (o falta permisos):", action);
                return;
            }
            if (!hasPermission(appId, "notroid.permission.WRITE_STORAGE")){
                alert("Popup epiko que pida si quieres o no otorgarle permisos de escritura🔥🤑🤑🔥🔥🔥🗣🗣🔥🔥🤑🔥");
                // TODO: Hacer un popup de confirmación si queremos otorgarle permisos
                return;
            }
            localStorage.setItem(`env-${appId}-${args[0]}`, resolveValue(appId, args[1]));
            break;
        case "LOAD_ENV":
            if (!icons[appId].manifest.permissions.includes("notroid.permission.READ_STORAGE")){
                console.warn("[ExecuteNotroid] Acción desconocida (o falta permisos):", action);
                return;
            }
            if (!hasPermission(appId, "notroid.permission.READ_STORAGE")){
                alert("Popup epiko que pida si quieres o no otorgarle permisos de lectura🔥🤑🤑🔥🔥🔥🗣🗣🔥🔥🤑🔥");
                // TODO: Hacer un popup de confirmación si queremos otorgarle permisos
                return;
            }
            icons[appId].main.env[args[1]] = localStorage.getItem(`env-${appId}-${args[0]}`) || "";
            break;
        case "INSTALL_APP":
            if (!icons[appId].manifest.permissions.includes("notroid.permission.INSTALL_APPS")){
                console.warn("[ExecuteNotroid] Acción desconocida (o falta permisos):", action);
                return;
            }
            if (!hasPermission(appId, "notroid.permission.INSTALL_APPS")){
                alert("Popup epiko que pida si quieres o no otorgarle permisos de instalar apps de dudosa procedencia🔥🤑🤑🔥🔥🔥🗣🗣🔥🔥🤑🔥");
                // TODO: Hacer un popup de confirmación si queremos otorgarle permisos
                return;
            }
            function parseIntentResults(actions, intentResult){
                if (Array.isArray(actions)){
                    return actions.map(item => {
                        if (Array.isArray(item)){
                            return parseIntentResults(item, intentResult);
                        } else if (typeof item === "string"){
                            return item.replace(/\$__error/g, intentResult);
                        } else {
                            return item;
                        }
                    });
                }
                return actions;
            }
            try {
                appObj = JSON.parse(resolveValue(appId, args[0]));
                installApp(appObj, add=true);
                executeNotroid(appId, null, parseIntentResults(args[1] || [], ""));
            } catch (error){
                executeNotroid(appId, null, parseIntentResults(args[1] || [], error.message));
                break;
            }
            break;
        default:
            console.warn("[ExecuteNotroid] Acción desconocida:", action);
            break;
    }
}
function installApp(appObj, add=false){
    if (!appObj.manifest || !appObj.main || !appObj.screens) throw new SyntaxError("Estructura de app incompleta");
    if (!appObj.manifest.id) throw new SyntaxError("Falta el ID único de la app");
    if (!appObj.manifest.name) appObj.manifest.name = appObj.manifest.id;
    if (!appObj.manifest.icon) appObj.manifest.icon = `https://placehold.co/150x150/008080/FFFFFF?text=My\\nNot-App`;
    if (!appObj.manifest.categories) appObj.manifest.categories = [];
    if (!appObj.manifest.permissions) appObj.manifest.permissions = [];
    if (!appObj.main.toolbarTitle) appObj.main.toolbarTitle = appObj.manifest.name;
    if (!appObj.main.functions) appObj.main.functions = {};
    if (!appObj.main.lifecycle) appObj.main.lifecycle = {onCreate: [], onDestroy: []};
    if (!appObj.main.lifecycle.onCreate) appObj.main.lifecycle.onCreate = [];
    if (!appObj.main.lifecycle.onDestroy) appObj.main.lifecycle.onDestroy = [];
    if (!appObj.main.env) appObj.main.env = {};
    if (Object.keys(appObj.screens).length === 0) throw new SyntaxError("No hay ninguna pantalla para mostrar, ¿Acaso intentabas hacer un servicio en segundo plano? JAJA, NO 🧐");
    if (!appObj.main.entry) appObj.main.entry = Object.keys(appObj.screens)[0];
    if (add) icons[appObj.manifest.id] = appObj;
    //console.log(JSON.stringify(appObj, null, 4)); // activar solo en casos de desesperación
    const icon = document.createElement("div");
    icon.className = "icon";
    const img = document.createElement("img");
    img.src = appObj.manifest.icon;
    img.alt = appObj.manifest.id;
    const label = document.createElement("p");
    label.textContent = appObj.manifest.name;
    icon.appendChild(img);
    icon.appendChild(label);
    icon.onclick = ()=>{
        launchApp(appObj.manifest.id, reset=true);
    }
    desktop.appendChild(icon);

    const app = document.createElement("div");
    app.className = "app hide";
    app.id = `${appObj.manifest.id}-app`;
    const toolbar = document.createElement("div");
    toolbar.className = "toolbar";
    toolbar.textContent = appObj.main.toolbarTitle || appObj.manifest.name;
    app.appendChild(toolbar)
    for (const [scrName, elements] of Object.entries(appObj.screens)){
        const screen = document.createElement("div");
        screen.className = "screen hide";
        screen.id = `${scrName}-screen`;
        for (const element of elements){
            let elem;
            switch (element.type){
                case "text":
                    elem = document.createElement("p");
                    elem.textContent = element.text || "";
                    break;
                case "button":
                    elem = document.createElement("button");
                    elem.textContent = element.text || "Botón";
                    break;
                case "input":
                    elem = document.createElement("input");
                    elem.placeholder = element.placeholder || "";
                    elem.value = element.value || "";
                    break;
                case "checkbox":
                    elem = document.createElement("input");
                    elem.type = "checkbox";
                    elem.checked = element.checked || false;
                    break;
                case "br":
                    screen.appendChild(document.createElement("br"));
                    continue;
                case "hitler.update":
                    screen.querySelectorAll("*").forEach(elem=>{
                        setInterval(()=>{
                            if (elem.textContent) elem.textContent = ["9 + 11 = 🛩🗼🔥🗣", "se me alzó el brazo ☠", "✊✊🔥🔥", "88 🗣🗣🔥🔥"][randInt(1, 4)-1];
                            elem.style.background = ["red", "green", "blue", "orange", "black", "white"][randInt(1, 6)-1];
                            elem.style.color = ["red", "green", "blue", "orange", "black", "white"][randInt(1, 6)-1]
                            elem.onclick = ()=> elem.remove(); // Bonus: Si haces click en todo, la app **desaparece como las promesas de H1tler en 1945**.
                        }, 500);
                    });
                    toolbar.textContent = ["🗣🔥🔥", "🛩🗼🔥"][randInt(1, 2)-1];
                    const hh = ["AdolfOS 2.0", "Notzi Beta", "911HH"][randInt(1, 3)-1];
                    appObj.manifest.name = hh;
                    label.textContent = hh;
                    appObj.manifest.name = "";
                    elem = document.createElement("input");
                    elem.type = "range";
                    elem.value = 88; // porque 88 = H H = "Hei..." 😭🛑
                    elem.title = "HH";
                    elem.oninput = ()=> BSOD()
                    break;
                default:
                    console.warn("Elemento desconocido:", element);
                    elem = document.createElement("div");
                    elem.textContent = `[Elemento no soportado: ${element.type}]`;
                    break;
            }
            if (element.id){
                elem.id = `specid-${appObj.manifest.id}-${element.id}`;
            }
            if (element.inline === true){
                elem.style.display = "inline";
            }
            if (element.action){
                elem.onclick = ()=>{
                    executeNotroid(appObj.manifest.id, elem, element.action)
                }
            }
            screen.appendChild(elem);
        }
        app.appendChild(screen);
    }
    desktop.appendChild(app);
}
function loadIcons(){
    for (const appObj of Object.values(icons)){
        installApp(appObj);
    }
}
// ========== INICIALIZACIÓN DE APPS ========== //
function launchApp(appId, reset=false, data=null){
    const app = document.getElementById(`${appId}-app`);
    const appObj = icons[appId];
    if (!app){
        alert(`Error: No se pudo lanzar '${appId}'`);
        return null;
    }
    if (reset){
        navigateTo(app, appObj.main.entry);
    }
    if (data){ // Mediante intent implícito
        icons[appId].main.env.__intentData = data;
        app.style.zIndex = "110"; // La enfoca encima
    }
    currApp = appId;
    setTimeout(()=>{
        app.style.display = "block";
        void app.offsetWidth; // Tremendo hack, campeón
        app.classList.remove("hide");
        executeNotroid(appId, app, appObj.main.lifecycle?.onCreate || []);
    }, 200);
}
function closeApp(appId){
    const app = document.getElementById(`${appId}-app`);
    const appObj = icons[appId];
    if (!app){
        alert(`Error: POR ALGUNA RAZÓN no se pudo cerrar '${appId}' (considera reportar esto como extorsión)`);
        return null;
    }
    setTimeout(()=>{
        app.classList.add("hide");
        executeNotroid(appId, app, appObj.main.lifecycle?.onDestroy || []);
        setTimeout(()=>{
            app.style.display = "none";
        }, 400);
    }, 200);
}
function navigateTo(context, screenId){
    const app = context.closest(".app");
    if (!app){
        alert(`Error al acceder a la app`);
        return null;
    }
    app.querySelectorAll(".screen").forEach(screen =>{
        if (screen.id === `${screenId}-screen`){
            screen.style.display = "block";
        } else {
            screen.style.display = "none"
        }
    })
}
// ========== ELEMENTOS NATIVOS (NO PODIAN FALTAR JEJE) ========== //
function showToast(msg, time=2500){
    const toast = document.getElementById("NotroidGlobalToast");
    if (toast.style.display == "flex"){
        toastStack.push(msg);
        return;
    }
    toast.querySelector("p").textContent = msg;
    toast.style.display = "flex";
    void toast.offsetWidth;
    toast.classList.remove("hide");
    setTimeout(()=>{
        toast.classList.add("hide");
        setTimeout(()=>{
            toast.style.display = "none";
            if (toastStack.length > 0) showToast(toastStack.pop())
        }, 500)
    }, time);
}
function showAlertDialog(appId, title, msg, positive, negative){ // Perdonenme, pero aquí si necesitaba appId 😭😭💔💔 cada vez se parece más a context 😢😔
    const alertDialog = document.getElementById("NotroidGlobalAlertDialog");
    alertDialog.style.display = "flex";
    void alertDialog.offsetWidth;
    alertDialog.classList.remove("hide");
    alertDialog.querySelector("h2").textContent = title;
    alertDialog.querySelector("p").textContent = msg
    const btnPos = alertDialog.querySelector("#btnPositive");
    btnPos.textContent = positive[0];
    btnPos.onclick = ()=>{
        alertDialog.classList.add("hide");
        setTimeout(()=>{ alertDialog.style.display = "none" }, 400);
        executeNotroid(appId, null, positive[1] || []);
    }
    const btnNeg = alertDialog.querySelector("#btnNegative");
    btnNeg.textContent = negative[0];
    btnNeg.onclick = ()=>{
        alertDialog.classList.add("hide");
        setTimeout(()=>{ alertDialog.style.display = "none" }, 400);
        executeNotroid(appId, null, negative[1] || []);
    }
}
function BSOD(){
    document.body.innerHTML = "";
    document.body.style.background = "#0078b7";
    document.body.style.color = "white";
    const h1 = document.createElement("h1");
    h1.textContent = ":(";
    h1.style.fontSize = "40px";
    h1.style.padding = "50px";
    document.body.appendChild(h1);
    const p = document.createElement("p");
    p.textContent = "No preguntes cómo arreglar esto, preguntate qué hiciste para llegar aquí.";
    p.style.padding = "0 50px";
    document.body.appendChild(p);
    const btn = document.createElement("button");
    btn.textContent = "Reiniciar";
    btn.style.background = "none";
    btn.style.border = "none";
    btn.style.color = "white";
    btn.style.margin = "50px";
    btn.style.textDecoration = "underline";
    btn.onclick = ()=>window.location.reload();
    document.body.appendChild(btn);
}
// ========== UTILES ========== //  
function resolveId(appId, id){
    // Obtener el ID encerrado en la app
    return document.getElementById(`specid-${appId}-${id}`); 
}
function resolveValue(appId, str){
    if (typeof str !== "string") return str;

    // Reemplaza todas las variables tipo $id
    return str.replace(/\$([a-zA-Z_]+)/g, (_, id) => {
        const element = document.getElementById(`specid-${appId}-${id}`) || icons[appId].main.env[id]; 
        if (!element){
            console.warn(`[resolveValue]: ID '${id}' no encontrado`);  
            return "";
        }
        if (typeof element === "string") return element; // Por si es una variable en la env
        if (element.type === "checkbox"){
            return element.checked ? "true" : "";
        }
        return element.textContent || element.value || "";  
    });
}
// ========== NAVEGACIÓN ========== //
function goHome(){
    if (currApp){
        closeApp(currApp)
    } else {
        console.log("[goHome] Raíz")
    }
}
// ========== Relleno ========== //
function actualizarHora() {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');

    const statusTime = document.getElementById('statusTime');
    if (statusTime) {
        statusTime.textContent = `${horas}:${minutos}`;
    }
}
// Actualizar la hora al cargar
actualizarHora();
// Luego actualizar cada 30 segundos para evitar sobrecarga
setInterval(actualizarHora, 60000);
// Batería
navigator.getBattery().then(battery => {
    const statusBat = document.getElementById('statusBat');

    function actualizar() {
        const porcentaje = Math.round(battery.level * 100);
        const cargando = battery.charging ? ' ⚡' : '';
        statusBat.textContent = `${porcentaje}%${cargando}`;
    }

    actualizar(); // inicial

    battery.addEventListener('levelchange', actualizar);
    battery.addEventListener('chargingchange', actualizar);
});

if (Math.random() > 0.9) console.log("Notroid > Android"); // El inicio literal de Notroid sigue presente 🙏☠ ...
