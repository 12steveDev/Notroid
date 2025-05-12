// static/script.js
// TODO: FIleSystem, AlertDialog, Notifications, SaveStateInLocalStorage, NavigationBar(currApp, register)
const desktop = document.querySelector(".desktop");
let currApp = null;
const permissions = JSON.parse(localStorage.getItem("__notroid_permissions__")) || {
    "notroid.permission.WRITE_STORAGE": ["NotasChafas"],
    "notroid.permission.READ_STORAGE": ["NotasChafas"],
    "notroid.permission.EXACT_IP_ACCESS🙏🤑🔥": [] // WTF 🙏☠🔥
}
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
            categories: ["enterText"],
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
            categories: ["enterText"],
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
                {type: "button", text: "Escoger texto", action: ["SEND_INTENT", "enterText", "Pone texto:", [["SET_TEXT", "label", "$__intentResult"], ["SHOW_TOAST", "Recibió: $__intentResult"]]]}
            ],
        }
    },
    "NotasChafas": {
        manifest: {
            id: "NotasChafas",
            name: "Notas Chafas",
            icon: "https://placehold.co/150x150/2222FF/FFFFFF?text=N",
            categories: ["notes"],
            permissions: ["notroid.permission.STORAGE"]
        },
        main: {
            entry: "HOME",
            functions: {
                saveNote: ["SAVE_ENV", "notaGuardada", "$noteInput"],
                loadNote: [["LOAD_ENV", "notaGuardada", "notaGuardada"], ["SET_TEXT", "noteLabel", "$notaGuardada"]]
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
                {type: "text", id: "noteLabel", text: ""},
                {type: "button", text: "Cargar Nota", action: ["CALL", "loadNote"]}
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
    return permissions[permission].includes(appId);
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
            resolveId(appId, args[0]).textContent = resolveValue(appId, args[1]);
            break;
        case "SET_ENV":
            icons[appId].main.env[args[0]] = resolveValue(appId, args[1]);
            break;
        case "CLOSE_APP":
            closeApp(appId);
            break;
        case "IF":
            const cond = args.shift();
            executeNotroid(appId, elem, __cond(appId, cond) ? args[0] : args[1]);
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
                                return item.replace(/\$__intentResult/g, intentResult)
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
            if (!hasPermission(appId, "notroid.permission.WRITE_STORAGE")){
                alert("Popup epiko que pida si quieres o no otorgarle permisos de escritura🔥🤑🤑🔥🔥🔥🗣🗣🔥🔥🤑🔥");
                // TODO: Hacer un popup de confirmación si queremos otorgarle permisos
                return;
            }
            localStorage.setItem(`env-${appId}-${args[0]}`, resolveValue(appId, args[1]));
            break;
        case "LOAD_ENV":
            if (!hasPermission(appId, "notroid.permission.READ_STORAGE")){
                alert("Popup epiko que pida si quieres o no otorgarle permisos de lectura🔥🤑🤑🔥🔥🔥🗣🗣🔥🔥🤑🔥");
                // TODO: Hacer un popup de confirmación si queremos otorgarle permisos
                return;
            }
            icons[appId].main.env[args[1]] = localStorage.getItem(`env-${appId}-${args[0]}`) || "";
            break;
        default:
            console.warn("[ExecuteNotroid] Acción desconocida:", action);
            break;
    }
}
function loadIcons(){
    for (const appObj of Object.values(icons)){
        const icon = document.createElement("div");
        icon.className = "icon";
        const img = document.createElement("img");
        img.src = appObj.manifest.icon;
        img.alt = appObj.manifest.id;
        const label = document.createElement("p");
        label.textContent = appObj.manifest.name;
        icon.appendChild(img);
        icon.appendChild(label)
        icon.onclick = ()=>{
            launchApp(appObj.manifest.id, reset=true)
        }
        desktop.appendChild(icon)

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
                    default:
                        console.warn("Elemento desconocido:", element);
                        elem = document.createElement("div");
                        elem.textContent = `[Elemento no soportado: ${element.type}]`;
                        break;
                }
                if (element.id){
                    elem.id = `specid-${appObj.manifest.id}-${element.id}`;
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
        executeNotroid(appId, app, appObj.main.lifecycle.onCreate);
    }, 200)
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
        executeNotroid(appId, app, appObj.main.lifecycle.onDestroy);
        setTimeout(()=>{
            app.style.display = "none";
        }, 400);
    }, 200)
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
    let toast = document.getElementById("NotroidGlobalToast");
    if (!toast){
        toast = document.createElement("div");
        toast.className = "toast hide";
        toast.id = "NotroidGlobalToast";
        toast.appendChild(document.createElement("p"));
        desktop.appendChild(toast);
    }
    toast.querySelector("p").textContent = msg;
    toast.style.display = "flex";
    void toast.offsetWidth;
    toast.classList.remove("hide");
    setTimeout(()=>{
        toast.classList.add("hide");
        setTimeout(()=>{
            toast.style.display = "none";
        }, 500)
    }, time);
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
        if (!element) {
            console.warn(`resolveValue: ID '${id}' no encontrado`);  
            return "";
        }
        if (typeof element === "string") return element; // Por si es una variable en la env
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
