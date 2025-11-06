// main.js
SystemConfig.apply();
StatusBarManager.apply();
initializeListeners();
ToastManager.show("Tiembla Google..."); // ! Esta linea es clave (Equivalencia: init.rc) ! //
AppManager.refresh();

if (!localStorage.getItem("firstEntry")){
AppManager.install({
    package: "com.test.toastmanager",
    name: "Toast Manager Test",
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Toast",
    entry: "MainActivity",
    activities: {
        "MainActivity": {
            onCreate: [["SHOW_TOAST", "Toast Manager cargado"]],
            view: {type: "layout", padding: "15px", bg: "#f8f9fa", child: [
                {type: "button", text: "← Volver", bg: "#6c757d", fg: "white", onclick: ["FINISH_ACTIVITY"]},
                {type: "title", text: "Toast Manager Test", class: ["justify-center"]},
                
                {type: "subtitle", text: "SHOW_TOAST", class: ["code", "bg-dark", "fg-white"], padding: "8px", style: "border-radius: 5px;"},
                {type: "input", id: "msgInput", placeholder: "Escribe tu mensaje aquí...", value: "¡Toast de prueba!"},
                {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                    {type: "button", text: "Toast Simple", bg: "#007bff", fg: "white", onclick: [
                        ["SHOW_TOAST", ["ID_GET_VALUE", "msgInput"]]
                    ]},
                    {type: "button", text: "Toast Largo", bg: "#28a745", fg: "white", onclick: [
                        ["SHOW_TOAST", ["ADD", "🔔 ", ["ID_GET_VALUE", "msgInput"], " - Este es un toast de demostración del sistema Notroid!"]]
                    ]}
                ]},
                
                {type: "subtitle", text: "Ejemplos Rápidos", class: ["code"]},
                {type: "layout", class: ["flex", "flex-row", "justify-between", "items-center"], child: [
                    {type: "button", text: "✅ Éxito", bg: "#28a745", fg: "white", onclick: [["SHOW_TOAST", "✅ Operación completada con éxito"]]},
                    {type: "button", text: "⚠️ Advertencia", bg: "#ffc107", fg: "black", onclick: [["SHOW_TOAST", "⚠️ Esto es una advertencia"]]},
                    {type: "button", text: "❌ Error", bg: "#dc3545", fg: "white", onclick: [["SHOW_TOAST", "❌ Ha ocurrido un error"]]}
                ]}
            ]}
        }
    }
})
AppManager.install({
    package: "com.test.activitymanager",
    name: "Activity Manager Test",
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Activity",
    entry: "MainActivity",
    activities: {
        "MainActivity": {
            onCreate: [["SHOW_TOAST", "Activity Manager iniciado"]],
            view: {type: "layout", padding: "15px", bg: "#e9ecef", child: [
                {type: "button", text: "← Volver", bg: "#6c757d", fg: "white", onclick: ["FINISH_ACTIVITY"]},
                {type: "title", text: "Activity Manager Test", class: ["justify-center"]},
                
                {type: "subtitle", text: "START_ACTIVITY & FINISH_ACTIVITY", class: ["code", "bg-primary", "fg-white"], padding: "8px"},
                {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                    {type: "button", text: "🚀 Lanzar SecondActivity", bg: "#17a2b8", fg: "white", onclick: ["START_ACTIVITY", "SecondActivity"]},
                    {type: "button", text: "❌ Finalizar", bg: "#dc3545", fg: "white", onclick: ["FINISH_ACTIVITY"]}
                ]},
                
                {type: "subtitle", text: "ID_SET_TEXT & ID_GET_TEXT", class: ["code", "bg-success", "fg-white"], padding: "8px"},
                {type: "text", text: "Texto inicial - Haz clic en cambiar", id: "text1", class: ["bg-white", "padding-10"], style: "border: 1px solid #ccc; border-radius: 5px;"},
                {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                    {type: "button", text: "✏️ Cambiar Texto", bg: "#007bff", fg: "white", onclick: [
                        ["ID_SET_TEXT", "text1", "¡Texto cambiado con éxito! 🎉"]
                    ]},
                    {type: "button", text: "📖 Obtener Texto", bg: "#28a745", fg: "white", onclick: [
                        ["SHOW_TOAST", ["ADD", "El texto es: ", ["ID_GET_TEXT", "text1"]]]
                    ]}
                ]},
                
                {type: "subtitle", text: "ID_SET_VALUE & ID_GET_VALUE", class: ["code", "bg-warning", "fg-dark"], padding: "8px"},
                {type: "input", value: "Valor inicial del input", id: "input1", placeholder: "Escribe algo aquí..."},
                {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                    {type: "button", text: "🔄 Cambiar Valor", bg: "#ffc107", fg: "black", onclick: [
                        ["ID_SET_VALUE", "input1", "¡Valor actualizado! ✅"]
                    ]},
                    {type: "button", text: "📋 Obtener Valor", bg: "#fd7e14", fg: "white", onclick: [
                        ["SHOW_TOAST", ["ADD", "El valor es: ", ["ID_GET_VALUE", "input1"]]]
                    ]}
                ]},
                
                {type: "subtitle", text: "ID_SET_CHECKED & ID_IS_CHECKED", class: ["code", "bg-info", "fg-white"], padding: "8px"},
                {type: "layout", class: ["flex", "flex-row", "items-center"], child: [
                    {type: "checkbox", id: "check1"},
                    {type: "text", text: "¿Está marcado este checkbox?"}
                ]},
                {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                    {type: "button", text: "🔄 Toggle Check", bg: "#6f42c1", fg: "white", onclick: [
                        ["ID_SET_CHECKED", "check1", ["NOT", ["ID_IS_CHECKED", "check1"]]]
                    ]},
                    {type: "button", text: "👀 Ver Estado", bg: "#e83e8c", fg: "white", onclick: [
                        ["SHOW_TOAST", ["IF", ["ID_IS_CHECKED", "check1"], "✅ El cuadro está marcado", "❌ El cuadro no está marcado"]]
                    ]}
                ]}
            ]}
        },
        "SecondActivity": {
            view: {type: "layout", padding: "20px", bg: "#d1ecf1", class: ["flex", "all-width", "all-height", "flex-column", "justify-center", "items-center"], child: [
                {type: "text", text: "🎉 ¡Hola desde SecondActivity!", class: ["bg-white", "padding-15"], style: "border-radius: 10px; font-size: 18px; text-align: center;"},
                {type: "text", text: "Esta es una actividad diferente demostrando la navegación entre actividades."},
                {type: "button", text: "← Volver a Main", bg: "#17a2b8", fg: "white", padding: "10px", onclick: ["FINISH_ACTIVITY"]}
            ]}
        }
    }
})
AppManager.install({
    package: "com.test.alertdialog",
    name: "Alert Dialog Test",
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Test",
    entry: "AlertDialogActivity",
    activities: {
        "AlertDialogActivity": {
            onCreate: [],
            view: {type: "layout", padding: "5px",  child: [
                {type: "button", text: "<- Salir", onclick: ["FINISH_ACTIVITY"]},
                {type: "title", text: "Alert Dialog Test"},
                {type: "subtitle", text: "- SHOW_ALERT", class: ["code"]},
                {type: "input", id: "titleInput", placeholder: "Titulo"},
                {type: "input", id: "contentInput", placeholder: "Contenido"},
                {type: "input", id: "btnInput", placeholder: "Texto del botón"},
                {type: "button", text: "Mostrar Alert Dialog", onclick: [
                    ["SHOW_ALERT", ["ID_GET_VALUE", "titleInput"], ["ID_GET_VALUE", "contentInput"], ["ID_GET_VALUE", "btnInput"]]
                ]},
            ]}
        }
    }
})
AppManager.install({
    package: "com.test.appmanager",
    name: "App Manager Test",
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Test",
    entry: "AppManagerActivity",
    activities: {
        "AppManagerActivity": {
            onCreate: [
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_MANAGE_EXTERNAL_APPS"], [
                    ["IF", ["REQUEST_PERMISSION", "PERMISSION_INSTALL_APPS"], [
                        ["IF", ["REQUEST_PERMISSION", "PERMISSION_DELETE_APPS"], [
                            []
                        ], ["FINISH_ACTIVITY"]]
                    ], ["FINISH_ACTIVITY"]]
                ], ["FINISH_ACTIVITY"]]
            ],
            onDestroy: [],
            view: {type: "layout", padding: "5px", child: [
                {type: "button", text: "<- Salir", onclick: ["FINISH_ACTIVITY"]},
                {type: "title", text: "App Manager Test"},
                {type: "subtitle", text: "- INSTALL_APP", class: ["code"]},
                {type: "button", text: "Entrar al creador de apps", onclick: ["START_ACTIVITY", "MiniNotroidStudio"]},
                {type: "subtitle", text: "- UNINSTALL_APP", class: ["code"]},
                {type: "input", id: "input1", placeholder: "Paquete (ej: com.example...)"},
                {type: "button", text: "Desinstalar app", onclick: ["UNINSTALL_APP", ["ID_GET_VALUE", "input1"]]},
                {type: "subtitle", text: "- LAUNCH_APP", class: ["code"]},
                {type: "input", id: "input2", placeholder: "Paquete (ej: com.example...)"},
                {type: "button", text: "Lanzar app", onclick: ["LAUNCH_APP", ["ID_GET_VALUE", "input2"]]},
            ]}
        },
        "MiniNotroidStudio": { // ¿easteregg?????
            onCreate: [],
            onDestroy: [],
            view: {type: "layout", padding: "5px", child: [
                {type: "button", text: "<- Volver", onclick: ["FINISH_ACTIVITY"]},
                {type: "title", text: "Mini Notroid Studio"},
                {type: "subtitle", text: "- INSTALL_APP", class: ["code"]},
                {type: "textarea", id: "code", class: ["code", "all-width"], padding: "4px", placeholder: "Tu código JSON aquí..."},
                {type: "button", text: "Instalar", padding: "5px", bg: "#0f0", fg: "#000", class: ["code", "all-width"], onclick: [
                    ["SET_VAR", "package", ["JSON_PARSE", ["ID_GET_VALUE", "code"]]],
                    ["INSTALL_APP", ["GET_VAR", "package"]],
                ]}
            ]}
        }
    },
})
AppManager.install({
    package: "com.test.notificationmanager",
    name: "Notification Manager Test",
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Noti",
    entry: "MainActivity",
    activities: {
        "MainActivity": {
            onCreate: [
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_POST_NOTIFICATIONS"], [], [["SHOW_TOAST", "Sin permisos de notificaciones"], ["FINISH_ACTIVITY"]]],
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_MANAGE_NOTIFICATIONS_STATE"], [], [["SHOW_TOAST", "Sin permisos de estado"], ["FINISH_ACTIVITY"]]]
            ],
            view: {type: "layout", padding: "10px", child: [
                {type: "button", text: "<- Salir", onclick: ["FINISH_ACTIVITY"]},
                {type: "title", text: "Notification Manager Test"},
                
                {type: "subtitle", text: "Enviar Notificación", class: ["code"]},
                {type: "input", id: "notiTitle", placeholder: "Título", value: "¡Nueva notificación!"},
                {type: "input", id: "notiContent", placeholder: "Contenido", value: "Esto es una prueba del sistema"},
                {type: "button", text: "Enviar Notificación", onclick: [
                    ["SEND_NOTIFICATION", ["ID_GET_VALUE", "notiTitle"], ["ID_GET_VALUE", "notiContent"]],
                    ["SHOW_TOAST", "Notificación enviada"]
                ]},
                
                {type: "subtitle", text: "Estado Actual", class: ["code"]},
                {type: "text", text: "Estado: ", id: "stateText"},
                {type: "button", text: "Obtener Estado", onclick: [
                    ["ID_SET_TEXT", "stateText", ["ADD", "Estado: ", ["GET_NOTIFICATION_STATE"]]]
                ]},
                
                {type: "subtitle", text: "Cambiar Estado", class: ["code"]},
                {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                    {type: "button", text: "Show", onclick: [["SET_NOTIFICATION_STATE", "show"], ["SHOW_TOAST", "Estado: show"]]},
                    {type: "button", text: "Muted", onclick: [["SET_NOTIFICATION_STATE", "muted"], ["SHOW_TOAST", "Estado: muted"]]},
                    {type: "button", text: "Hide", onclick: [["SET_NOTIFICATION_STATE", "hide"], ["SHOW_TOAST", "Estado: hide"]]},
                    {type: "button", text: "Block", onclick: [["SET_NOTIFICATION_STATE", "block"], ["SHOW_TOAST", "Estado: block"]]}
                ]}
            ]}
        }
    }
})
AppManager.install({
    package: "com.test.permissionmanager",
    name: "Permission Manager Test", 
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Perm",
    entry: "MainActivity",
    activities: {
        "MainActivity": {
            onCreate: [
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_MANAGE_EXTERNAL_APPS"], [], [["SHOW_TOAST", "Sin permisos externos"], ["FINISH_ACTIVITY"]]],
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_MANAGE_DIRECT_PERMISSIONS"], [], [["SHOW_TOAST", "Sin permisos directos"], ["FINISH_ACTIVITY"]]]
            ],
            view: {type: "layout", padding: "10px", child: [
                {type: "button", text: "<- Salir", onclick: ["FINISH_ACTIVITY"]},
                {type: "title", text: "Permission Manager Test"},
                
                {type: "subtitle", text: "Otorgar Permiso a App", class: ["code"]},
                {type: "input", id: "grantPackage", placeholder: "Paquete (ej: com.test.app)", value: "com.test.app"},
                {type: "input", id: "grantPerm", placeholder: "Permiso", value: "PERMISSION_POST_NOTIFICATIONS"},
                {type: "button", text: "Otorgar Permiso", onclick: [
                    ["PACKAGE_GRANT_PERMISSION", ["ID_GET_VALUE", "grantPackage"], ["ID_GET_VALUE", "grantPerm"]],
                    ["SHOW_TOAST", "Permiso otorgado"]
                ]},
                
                {type: "subtitle", text: "Revocar Permiso", class: ["code"]},
                {type: "input", id: "revokePerm", placeholder: "Permiso a revocar", value: "PERMISSION_POST_NOTIFICATIONS"},
                {type: "button", text: "Revocar Permiso", onclick: [
                    ["REVOKE_PERMISSION", ["ID_GET_VALUE", "revokePerm"]],
                    ["SHOW_TOAST", "Permiso revocado"]
                ]},
                
                {type: "subtitle", text: "Verificar Permiso", class: ["code"]},
                {type: "input", id: "checkPerm", placeholder: "Permiso a verificar", value: "PERMISSION_POST_NOTIFICATIONS"},
                {type: "button", text: "Verificar", onclick: [
                    ["SET_VAR", "hasPerm", ["HAS_PERMISSION", ["ID_GET_VALUE", "checkPerm"]]],
                    ["SHOW_TOAST", ["ADD", "Tiene permiso: ", ["GET_VAR", "hasPerm"]]]
                ]},
                
                {type: "subtitle", text: "Solicitar Permiso", class: ["code"]},
                {type: "input", id: "requestPerm", placeholder: "Permiso a solicitar", value: "PERMISSION_CAMERA"},
                {type: "button", text: "Solicitar Permiso", onclick: [
                    ["REQUEST_PERMISSION", ["ID_GET_VALUE", "requestPerm"]],
                    ["SHOW_TOAST", "Solicitud completada"]
                ]}
            ]}
        }
    }
})
AppManager.install({
    package: "com.test.statusbarmanager", 
    name: "StatusBar Manager Test",
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Stat",
    entry: "MainActivity",
    activities: {
        "MainActivity": {
            onCreate: [
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_MANAGE_STATUS_BAR"], [], [["SHOW_TOAST", "Sin permisos de barra de estado"], ["FINISH_ACTIVITY"]]]
            ],
            view: {type: "layout", padding: "10px", child: [
                {type: "button", text: "<- Salir", onclick: ["FINISH_ACTIVITY"]},
                {type: "title", text: "StatusBar Manager Test"},
                
                {type: "subtitle", text: "Mostrar/Ocultar Íconos", class: ["code"]},
                {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                    {type: "button", text: "📶 WiFi", onclick: [["SHOW_STATUS_ICON", "wifi"], ["SHOW_TOAST", "WiFi mostrado"]]},
                    {type: "button", text: "📶 Ocultar", onclick: [["HIDE_STATUS_ICON", "wifi"], ["SHOW_TOAST", "WiFi oculto"]]}
                ]},
                {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                    {type: "button", text: "🔋 Battery", onclick: [["SHOW_STATUS_ICON", "battery"], ["SHOW_TOAST", "Battery mostrado"]]},
                    {type: "button", text: "🔋 Ocultar", onclick: [["HIDE_STATUS_ICON", "battery"], ["SHOW_TOAST", "Battery oculto"]]}
                ]},
                
                {type: "subtitle", text: "Color de Fondo", class: ["code"]},
                {type: "input", id: "bgColor", placeholder: "Color (ej: #FF0000)", value: "#008080"},
                {type: "button", text: "Cambiar Color", onclick: [
                    ["SET_STATUS_BAR_BACKGROUND", ["ID_GET_VALUE", "bgColor"]],
                    ["SHOW_TOAST", "Color cambiado"]
                ]},
                
                {type: "subtitle", text: "Panel Notificaciones", class: ["code"]},
                {type: "button", text: "Toggle Panel", onclick: [
                    ["TOGGLE_NOTIFICATIONS_PANEL"],
                    ["SHOW_TOAST", "Panel toggled"]
                ]}
            ]}
        }
    }
})
AppManager.install({
    package: "com.test.systemconfig",
    name: "System Config Test", 
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Conf",
    entry: "MainActivity",
    activities: {
        "MainActivity": {
            onCreate: [
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_READ_CONFIGURATIONS"], [], [["SHOW_TOAST", "Sin permisos de lectura"], ["FINISH_ACTIVITY"]]],
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_WRITE_CONFIGURATIONS"], [], [["SHOW_TOAST", "Sin permisos de escritura"], ["FINISH_ACTIVITY"]]]
            ],
            view: {type: "layout", padding: "10px", child: [
                {type: "button", text: "<- Salir", onclick: ["FINISH_ACTIVITY"]},
                {type: "title", text: "System Config Test"},
                
                {type: "subtitle", text: "Leer Configuración", class: ["code"]},
                {type: "input", id: "readConfig", placeholder: "Configuración (ej: launcherColumns)", value: "launcherColumns"},
                {type: "button", text: "Leer Valor", onclick: [
                    ["SET_VAR", "value", ["GET_CONFIGURATION_VALUE", ["ID_GET_VALUE", "readConfig"]]],
                    ["SHOW_TOAST", ["ADD", "Valor: ", ["GET_VAR", "value"]]]
                ]},
                
                {type: "subtitle", text: "Cambiar Configuración", class: ["code"]},
                {type: "input", id: "writeConfig", placeholder: "Configuración", value: "launcherBackground"},
                {type: "input", id: "writeValue", placeholder: "Nuevo valor", value: "#FF5733"},
                {type: "button", text: "Cambiar Valor", onclick: [
                    ["SET_CONFIGURATION_VALUE", ["ID_GET_VALUE", "writeConfig"], ["ID_GET_VALUE", "writeValue"]],
                    ["SHOW_TOAST", "Configuración actualizada"]
                ]},
                
                {type: "subtitle", text: "Configuraciones Rápidas", class: ["code"]},
                {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                    {type: "button", text: "Fondo Azul", onclick: [["SET_CONFIGURATION_VALUE", "launcherBackground", "#3366FF"], ["SHOW_TOAST", "Fondo azul"]]},
                    {type: "button", text: "Fondo Verde", onclick: [["SET_CONFIGURATION_VALUE", "launcherBackground", "#33FF66"], ["SHOW_TOAST", "Fondo verde"]]}
                ]},
                {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                    {type: "button", text: "4 Columnas", onclick: [["SET_CONFIGURATION_VALUE", "launcherColumns", 4], ["SHOW_TOAST", "4 columnas"]]},
                    {type: "button", text: "6 Columnas", onclick: [["SET_CONFIGURATION_VALUE", "launcherColumns", 6], ["SHOW_TOAST", "6 columnas"]]}
                ]}
            ]}
        }
    }
})
AppManager.install({
    package: "com.test.androidbridge",
    name: "Android Bridge Test",
    icon: "https://placehold.co/150x150/66FF66/000000?text=Andr",
    entry: "MainActivity", 
    activities: {
        "MainActivity": {
            onCreate: [
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_GOOGLE_APROVEMENT"], [], [["SHOW_TOAST", "Sin permisos Android"], ["FINISH_ACTIVITY"]]]
            ],
            view: {type: "layout", padding: "10px", child: [
                {type: "button", text: "<- Salir", onclick: ["FINISH_ACTIVITY"]},
                {type: "title", text: "Android Bridge Test"},
                
                {type: "subtitle", text: "Verificar Entorno", class: ["code"]},
                {type: "button", text: "¿Es Android?", onclick: [
                    ["SET_VAR", "isAndroid", ["VERIFY_ENTORN", "android"]],
                    ["SHOW_TOAST", ["ADD", "Es Android: ", ["GET_VAR", "isAndroid"]]]
                ]},
                
                {type: "subtitle", text: "Toast Android", class: ["code"]},
                {type: "input", id: "androidToast", placeholder: "Mensaje para toast", value: "¡Hola desde Android!"},
                {type: "button", text: "Mostrar Toast", onclick: [
                    ["ANDROID_SHOW_TOAST", ["ID_GET_VALUE", "androidToast"]],
                    ["SHOW_TOAST", "Toast Android enviado"]
                ]},
                
                {type: "subtitle", text: "Vibración", class: ["code"]},
                {type: "input", id: "vibrateMs", placeholder: "Milisegundos", value: "500"},
                {type: "button", text: "Vibrar", onclick: [
                    ["ANDROID_VIBRATE", ["NUMBER", ["ID_GET_VALUE", "vibrateMs"]]],
                    ["SHOW_TOAST", "Vibración enviada"]
                ]},
                
                {type: "subtitle", text: "Notificación Android", class: ["code"]},
                {type: "input", id: "androidNotiTitle", placeholder: "Título", value: "Notificación Android"},
                {type: "input", id: "androidNotiContent", placeholder: "Contenido", value: "Desde Notroid con ❤️"},
                {type: "button", text: "Enviar Notificación", onclick: [
                    ["ANDROID_SEND_NOTIFICATION", ["ID_GET_VALUE", "androidNotiTitle"], ["ID_GET_VALUE", "androidNotiContent"]],
                    ["SHOW_TOAST", "Notificación Android enviada"]
                ]}
            ]}
        }
    }
})
// (todas estas apps son de la versión anterior de Notroid, sin UI propia, puro código JAJAJA (no se instalan, sale paquete inválido, soy un pro validando paquetes (tiembla google (like y suscribete))))
AppManager.install({
    package: "com.test.notificationmanager",
    name: "Notification Manager Test",
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Test",
    calvik: [
        ["WHILE", "true",
        [
            ["IF", ["REQUEST_PERMISSION", "PERMISSION_POST_NOTIFICATIONS"], [], [["SHOW_TOAST", "Permisos incompletos"], ["BREAK"]]],
            ["IF", ["REQUEST_PERMISSION", "PERMISSION_MANAGE_NOTIFICATIONS_STATE"], [], [["SHOW_TOAST", "Permisos incompletos"], ["BREAK"]]],
            ["SET_VAR", "opt", ["PROMPT", "¿Qué quieres hacer? (exit para salir)\n- notify\n- getState\n- setState"]],
            ["IF", ["EQ", ["GET_VAR", "opt"], "notify"],
            [
                ["SET_VAR", "title", ["PROMPT", "Titulo:"]],
                ["SET_VAR", "content", ["PROMPT", "Contenido:"]],
                ["SEND_NOTIFICATION", ["GET_VAR", "title"], ["GET_VAR", "content"]],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "getState"],
            [
                ["SET_VAR", "res", ["GET_NOTIFICATION_STATE"]],
                ["SHOW_TOAST", "Estado: ${res}"],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "setState"],
            [
                ["SET_VAR", "res", ["PROMPT", "Nuevo estado de notificaciones:\n- show\n- muted\n- hide\n- block"]],
                ["SET_NOTIFICATION_STATE", ["GET_VAR", "res"]],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "exit"],
                ["BREAK"]
            ],
        ]
        ]
    ]
})
AppManager.install({
    package: "com.test.permissionmanager",
    name: "Permission Manager Test",
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Test",
    calvik: [
        ["WHILE", "true",
        [
            ["IF", ["REQUEST_PERMISSION", "PERMISSION_MANAGE_EXTERNAL_APPS"], [], [["SHOW_TOAST", "Permisos incompletos"], ["BREAK"]]],
            ["IF", ["REQUEST_PERMISSION", "PERMISSION_MANAGE_DIRECT_PERMISSIONS"], [], [["SHOW_TOAST", "Permisos incompletos"], ["BREAK"]]],
            ["SET_VAR", "opt", ["PROMPT", "¿Qué quieres hacer? (exit para salir)\n- packageGrant\n- revoke\n- packageRevoke\n- has\n- packageHas\n- request"]],
            ["IF", ["EQ", ["GET_VAR", "opt"], "packageGrant"],
            [
                ["SET_VAR", "package", ["PROMPT", "Paquete:"]],
                ["SET_VAR", "permission", ["PROMPT", "Permiso a dar:"]],
                ["PACKAGE_GRANT_PERMISSION", ["GET_VAR", "package"], ["GET_VAR", "permission"]],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "revoke"],
            [
                ["SET_VAR", "permission", ["PROMPT", "Permiso a quitar:"]],
                ["REVOKE_PERMISSION", ["GET_VAR", "permission"]],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "packageRevoke"],
            [
                ["SET_VAR", "package", ["PROMPT", "Paquete:"]],
                ["SET_VAR", "permission", ["PROMPT", "Permiso a quitar:"]],
                ["PACKAGE_REVOKE_PERMISSION", ["GET_VAR", "package"], ["GET_VAR", "permission"]],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "has"],
            [
                ["SET_VAR", "permission", ["PROMPT", "Permiso a verificar:"]],
                ["SET_VAR", "res", ["HAS_PERMISSION", ["GET_VAR", "permission"]]],
                ["SHOW_TOAST", "Resultado: ${res}"],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "packageHas"],
            [
                ["SET_VAR", "package", ["PROMPT", "Paquete:"]],
                ["SET_VAR", "permission", ["PROMPT", "Permiso a verificar:"]],
                ["SET_VAR", "res", ["PACKAGE_HAS_PERMISSION", ["GET_VAR", "package"], ["GET_VAR", "permission"]]],
                ["SHOW_TOAST", "Resultado: ${res}"],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "request"],
            [
                ["SET_VAR", "permission", ["PROMPT", "Permiso a pedir:"]],
                ["REQUEST_PERMISSION", ["GET_VAR", "permission"]],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "exit"],
                ["BREAK"]
            ],
        ]
        ]
    ]
})
AppManager.install({
    package: "com.test.statusbarmanager",
    name: "StatusBar Manager Test",
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Test",
    calvik: [
        ["WHILE", "true",
        [
            ["IF", ["REQUEST_PERMISSION", "PERMISSION_MANAGE_STATUS_BAR"], [], [["SHOW_TOAST", "Permisos incompletos"], ["BREAK"]]],
            ["SET_VAR", "opt", ["PROMPT", "¿Qué quieres hacer? (exit para salir)\n- show\n- hide\n- setBg\n- toggleNotiPanel"]],
            ["IF", ["EQ", ["GET_VAR", "opt"], "show"],
            [
                ["SET_VAR", "icon", ["PROMPT", "Ícono de estado a mostrar:\n- notifications\n- wifi\n- signal\n- bluetooth\n- lab\n- battery"]],
                ["SHOW_STATUS_ICON", ["GET_VAR", "icon"]],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "hide"],
            [
                ["SET_VAR", "icon", ["PROMPT", "Ícono de estado a ocultar:\n- notifications\n- wifi\n- signal\n- bluetooth\n- lab\n- battery"]],
                ["HIDE_STATUS_ICON", ["GET_VAR", "icon"]],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "setBg"],
            [
                ["SET_VAR", "color", ["PROMPT", "Nuevo color de fondo de la barra de estado:"]],
                ["SET_STATUS_BAR_BACKGROUND", ["GET_VAR", "color"]],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "toggleNotiPanel"],
            [
                ["TOGGLE_NOTIFICATIONS_PANEL"],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "exit"],
                ["BREAK"]
            ],
        ]
        ]
    ]
})
AppManager.install({
    package: "com.test.systemconfig",
    name: "System Config Test",
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Test",
    calvik: [
        ["WHILE", "true",
        [
            ["IF", ["REQUEST_PERMISSION", "PERMISSION_READ_CONFIGURATIONS"], [], [["SHOW_TOAST", "Permisos incompletos"], ["BREAK"]]],
            ["IF", ["REQUEST_PERMISSION", "PERMISSION_WRITE_CONFIGURATIONS"], [], [["SHOW_TOAST", "Permisos incompletos"], ["BREAK"]]],
            ["SET_VAR", "opt", ["PROMPT", "¿Qué quieres hacer? (exit para salir)\n- read\n- write"]],
            ["IF", ["EQ", ["GET_VAR", "opt"], "read"],
            [
                ["SET_VAR", "config", ["PROMPT", "Configuración a leer:"]],
                ["SET_VAR", "res", ["GET_CONFIGURATION_VALUE", ["GET_VAR", "config"]]],
                ["SHOW_TOAST", "Valor de '${config}': ${res}"],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "write"],
            [
                ["SET_VAR", "config", ["PROMPT", "Configuración a escribir:"]],
                ["SET_VAR", "value", ["PROMPT", "Nuevo valor:"]],
                ["SET_CONFIGURATION_VALUE", ["GET_VAR", "config"], ["GET_VAR", "value"]],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "exit"],
                ["BREAK"]
            ],
        ]
        ]
    ]
})
AppManager.install({
    package: "com.test.androidbridge",
    name: "Android Bridge Test",
    icon: "https://placehold.co/150x150/66FF66/000000?text=Test",
    calvik: [
        ["WHILE", "true",
        [
            ["IF", ["REQUEST_PERMISSION", "PERMISSION_GOOGLE_APROVEMENT"], [], [["SHOW_TOAST", "Permisos incompletos"], ["BREAK"]]],
            ["SET_VAR", "opt", ["PROMPT", "¿Qué quieres hacer? (exit para salir)\n- verifyEntorn\n- androidShowToast\n- androidVibrate\n- androidHasPermission\n- androidRequestPermission\n- androidGetLastPermissionResult\n- androidSendNotification"]],
            ["IF", ["EQ", ["GET_VAR", "opt"], "verifyEntorn"],
            [
                ["SET_VAR", "entorn", ["PROMPT", "Entorno a verificar:"]],
                ["SET_VAR", "res", ["VERIFY_ENTORN", ["GET_VAR", "entorn"]]],
                ["SHOW_TOAST", "Resultado: ${res}"],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "androidShowToast"],
            [
                ["SET_VAR", "message", ["PROMPT", "Mensaje a mostrar:"]],
                ["ANDROID_SHOW_TOAST", ["GET_VAR", "message"]],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "androidVibrate"],
            [
                ["SET_VAR", "ms", ["NUMBER", ["PROMPT", "MS a vibrar:"]]],
                ["ANDROID_VIBRATE", ["GET_VAR", "ms"]],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "androidHasPermission"],
            [
                ["SET_VAR", "perm", ["PROMPT", "Permiso a verificar:"]],
                ["SET_VAR", "res", ["ANDROID_HAS_PERMISSION", ["GET_VAR", "perm"]]],
                ["SHOW_TOAST", "Resultado: ${res}"],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "androidRequestPermission"],
            [
                ["SET_VAR", "perm", ["PROMPT", "Permiso a conceder:"]],
                ["SET_VAR", "res", ["ANDROID_REQUEST_PERMISSION", ["GET_VAR", "perm"]]],
                ["SHOW_TOAST", "Resultado: ${res} (verificar el real con androidGetLastPermissionResult)"],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "androidGetLastPermissionResult"],
            [
                ["SET_VAR", "res", ["ANDROID_GET_LAST_PERMISSION_RESULT"]],
                ["SHOW_TOAST", "Ultimo resultado: ${res}"],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "androidSendNotification"],
            [
                ["SET_VAR", "title", ["PROMPT", "Titulo:"]],
                ["SET_VAR", "content", ["PROMPT", "Contenido:"]],
                ["ANDROID_SEND_NOTIFICATION", ["GET_VAR", "title"], ["GET_VAR", "content"]],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "exit"],
                ["BREAK"]
            ],
        ]
        ]
    ]
});


AppManager.install({
    package: "com.x12steve.test",
    name: "Test",
    icon: "https://placehold.co/150x150/FF66FF/000000?text=Test",
    entry: "MainActivity",
    functions: {},
    activities: {
        "MainActivity": {
            onCreate: [["SHOW_TOAST", "Creado"], ["SET_VAR", "name", "valor1"]],
            onDestroy: ["SHOW_TOAST", "Destruido"],
            view: {type: "layout", class: [], bg: "#f00", child: [
                {type: "text", text: "Mensaje 1. ${name}", id: "label"},
                {type: "button", text: "Hacer algo", onclick: [["SET_VAR", "name", "valor2"], ["ID_SET_TEXT", "label", "Mensaje 2. ${name}"]]},
                {type: "button", text: "Salir", onclick: ["FINISH_ACTIVITY"]},
                {type: "button", text: "Nueva instancia", onclick: ["START_ACTIVITY", "MainActivity"]},
                {type: "input", value: "Input parecido al desarrollador...", placeholder: "inútil w 🥀"},
                {type: "br"},
                {type: "checkbox", checked: "true"},
            ]}
        }
    }
})
AppManager.install({ // ! FINAL BOSS DE LOS TESTS ! //
    package: "com.forms.test",
    name: "Formulario Pro",
    icon: "https://placehold.co/150x150/66AAFF/000000?text=Form",
    entry: "MainActivity",
    activities: {
        "MainActivity": {
            onCreate: [["SHOW_TOAST", "App de formularios cargada"]],
            view: {type: "layout", class: ["flex", "flex-column"], bg: "#f5f5f5", child: [
                {type: "text", text: "Formulario de Registro", class: ["justify-center"], bg: "#008080", fg: "white", style: "padding: 10px; font-size: 18px;"},
                
                {type: "text", text: "Nombre:"},
                {type: "input", id: "inputName", placeholder: "Escribe tu nombre"},
                
                {type: "text", text: "Email:"},
                {type: "input", id: "inputEmail", placeholder: "tu@email.com"},
                
                {type: "text", text: "Contraseña:"},
                {type: "input", id: "inputPassword", inputType: "password", placeholder: "••••••••"},
                
                {type: "layout", class: ["flex", "items-center"], child: [
                    {type: "checkbox", id: "checkTerms"},
                    {type: "text", text: "Acepto los términos y condiciones"}
                ]},
                
                {type: "button", text: "Registrarse", onclick: [
                    ["SET_VAR", "name", ["ID_GET_VALUE", "inputName"]],
                    ["SET_VAR", "email", ["ID_GET_VALUE", "inputEmail"]],
                    ["SET_VAR", "accepted", ["ID_IS_CHECKED", "checkTerms"]],
                    
                    ["IF", ["EQ", ["GET_VAR", "name"], ""],
                        [["ALERT", "El nombre está vacío"]],
                        []
                    ],
                    
                    ["IF", ["NOT", ["GET_VAR", "accepted"]],
                        [["ALERT", "Debes aceptar los términos"]],
                        [["ALERT", ["ADD", "¡Registro exitoso! Hola ", ["GET_VAR", "name"]]]]
                    ]
                ]},
                
                {type: "button", text: "Limpiar formulario", onclick: [
                    ["ID_SET_VALUE", "inputName", ""],
                    ["ID_SET_VALUE", "inputEmail", ""],
                    ["ID_SET_VALUE", "inputPassword", ""],
                    ["ID_SET_CHECKED", "checkTerms", false],
                    ["ALERT", "Formulario limpiado"]
                ]}
            ]}
        }
    }
})
AppManager.install({
    package: "com.x12steve.localclear",
    name: "Local Clear",
    icon: "https://placehold.co/150x150/FF4444/FFFFFF?text=CLEAR",
    entry: "Main",
    activities: {
        "Main": {
            onCreate: [
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_LOCAL_STORAGE"], [], ["FINISH_ACTIVITY"]],
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_CLEAR_ALL_LOCAL_DATA"], [], ["FINISH_ACTIVITY"]]
            ],
            view: {type: "layout", bg: "#FF8888", class: ["all-width", "all-height", "flex", "justify-center", "items-center"], child: [
                {type: "button", text: "CLEAR LOCAL STORAGE", padding: "4px", onclick: [["CLEAR_ALL_LOCAL_DATA"], ["FINISH_ACTIVITY"]]}
            ]}
        }
    }
})
localStorage.setItem("firstEntry", "true");
}
