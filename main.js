// main.js
SystemConfig.apply();
StatusBarManager.apply();
NavigationBarManager.apply();
initializeListeners();
ToastManager.show("Tiembla Google...");
AppManager.refresh();

if (!localStorage.getItem("firstEntry")) {
// App 1: Toast Manager Test
AppManager.install({
    package: "com.test.toastmanager",
    name: "Toast Manager Test",
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Toast",
    entry: "MainActivity",
    activities: {
        "MainActivity": {
            onCreate: [["SHOW_TOAST", "Toast Manager cargado"]],
            view: {
                type: "layout", padding: "15px", bg: "#f8f9fa", child: [
                    {type: "button", text: "← Volver", bg: "#6c757d", fg: "white", onclick: ["FINISH_ACTIVITY"]},
                    {type: "title", text: "Toast Manager Test", class: ["justify-center"]},
                    
                    {type: "subtitle", text: "SHOW_TOAST", class: ["code"], padding: "8px"},
                    {type: "input", id: "msgInput", placeholder: "Escribe tu mensaje aquí...", value: "¡Toast de prueba!"},
                    {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                        {type: "button", text: "Toast Simple", bg: "#007bff", fg: "white", onclick: [
                            ["SHOW_TOAST", ["ID_GET_VALUE", "msgInput"]]
                        ]},
                        {type: "button", text: "Toast Largo", bg: "#28a745", fg: "white", onclick: [
                            ["SHOW_TOAST", ["ADD", "🔔 ", ["ID_GET_VALUE", "msgInput"], " - Este es un toast de demostración del sistema Notroid!"]]
                        ]}
                    ]},
                    
                    {type: "subtitle", text: "Operaciones con Variables", class: ["code"], padding: "8px"},
                    {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                        {type: "button", text: "SET_VAR", bg: "#17a2b8", fg: "white", onclick: [
                            ["SET_VAR", "testVar", "Valor guardado!"],
                            ["SHOW_TOAST", "Variable guardada"]
                        ]},
                        {type: "button", text: "GET_VAR", bg: "#6f42c1", fg: "white", onclick: [
                            ["SHOW_TOAST", ["ADD", "Valor: ", ["GET_VAR", "testVar"]]]
                        ]}
                    ]}
                ]
            }
        }
    }
});
// App 2: Activity Manager Test
AppManager.install({
    package: "com.test.activitymanager",
    name: "Activity Manager Test",
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Activity",
    entry: "MainActivity",
    activities: {
        "MainActivity": {
            onCreate: [["SHOW_TOAST", "Activity Manager iniciado"]],
            view: {
                type: "layout", padding: "15px", bg: "#e9ecef", child: [
                    {type: "button", text: "← Volver", bg: "#6c757d", fg: "white", onclick: ["FINISH_ACTIVITY"]},
                    {type: "title", text: "Activity Manager Test", class: ["justify-center"]},
                    
                    {type: "subtitle", text: "Navegación", class: ["code"], padding: "8px"},
                    {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                        {type: "button", text: "🚀 Lanzar SecondActivity", bg: "#17a2b8", fg: "white", onclick: ["START_ACTIVITY", "SecondActivity"]},
                        {type: "button", text: "❌ Finalizar", bg: "#dc3545", fg: "white", onclick: ["FINISH_ACTIVITY"]}
                    ]},
                    
                    {type: "subtitle", text: "Manipulación de Elementos", class: ["code"], padding: "8px"},
                    {type: "text", text: "Texto inicial", id: "text1"},
                    {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                        {type: "button", text: "ID_SET_TEXT", bg: "#007bff", fg: "white", onclick: [
                            ["ID_SET_TEXT", "text1", "¡Texto cambiado! 🎉"]
                        ]},
                        {type: "button", text: "ID_GET_TEXT", bg: "#28a745", fg: "white", onclick: [
                            ["SHOW_TOAST", ["ADD", "Texto: ", ["ID_GET_TEXT", "text1"]]]
                        ]}
                    ]},
                    
                    {type: "subtitle", text: "Inputs", class: ["code"], padding: "8px"},
                    {type: "input", value: "Valor inicial", id: "input1", placeholder: "Escribe algo..."},
                    {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                        {type: "button", text: "ID_SET_VALUE", bg: "#ffc107", fg: "black", onclick: [
                            ["ID_SET_VALUE", "input1", "¡Valor actualizado! ✅"]
                        ]},
                        {type: "button", text: "ID_GET_VALUE", bg: "#fd7e14", fg: "white", onclick: [
                            ["SHOW_TOAST", ["ADD", "Valor: ", ["ID_GET_VALUE", "input1"]]]
                        ]}
                    ]},
                    
                    {type: "subtitle", text: "Checkboxes", class: ["code"], padding: "8px"},
                    {type: "layout", class: ["flex", "flex-row", "items-center"], child: [
                        {type: "checkbox", id: "check1"},
                        {type: "text", text: "Checkbox de prueba"}
                    ]},
                    {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                        {type: "button", text: "ID_SET_CHECKED", bg: "#6f42c1", fg: "white", onclick: [
                            ["ID_SET_CHECKED", "check1", ["NOT", ["ID_IS_CHECKED", "check1"]]]
                        ]},
                        {type: "button", text: "ID_IS_CHECKED", bg: "#e83e8c", fg: "white", onclick: [
                            ["SHOW_TOAST", ["IF", ["ID_IS_CHECKED", "check1"], "✅ Marcado", "❌ No marcado"]]
                        ]}
                    ]}
                ]
            }
        },
        "SecondActivity": {
            view: {
                type: "layout", padding: "20px", bg: "#d1ecf1", class: ["flex", "all-width", "all-height", "flex-column", "justify-center", "items-center"], child: [
                    {type: "text", text: "🎉 ¡SecondActivity!"},
                    {type: "text", text: "Actividad secundaria demostrando navegación."},
                    {type: "button", text: "← Volver", bg: "#17a2b8", fg: "white", padding: "10px", onclick: ["FINISH_ACTIVITY"]}
                ]
            }
        }
    }
});
// App 3: Alert Dialog Test
AppManager.install({
    package: "com.test.alertdialog",
    name: "Alert Dialog Test",
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Alert",
    entry: "MainActivity",
    activities: {
        "MainActivity": {
            onCreate: [["SHOW_TOAST", "Alert Dialog Test cargado"]],
            view: {
                type: "layout", padding: "15px", bg: "#fff3cd", child: [
                    {type: "button", text: "← Volver", bg: "#6c757d", fg: "white", onclick: ["FINISH_ACTIVITY"]},
                    {type: "title", text: "Alert Dialog Test", class: ["justify-center"]},
                    
                    {type: "subtitle", text: "ALERT Básico", class: ["code"], padding: "8px"},
                    {type: "button", text: "Mostrar Alert Simple", bg: "#ffc107", fg: "black", onclick: [
                        ["ALERT", "¡Este es un alert básico!"]
                    ]},
                    
                    {type: "subtitle", text: "PROMPT", class: ["code"], padding: "8px"},
                    {type: "button", text: "Abrir Prompt", bg: "#17a2b8", fg: "white", onclick: [
                        ["SET_VAR", "nombre", ["PROMPT", "¿Cuál es tu nombre?", "Anónimo"]],
                        ["SHOW_TOAST", ["ADD", "Hola ", ["GET_VAR", "nombre"]]]
                    ]},
                    
                    {type: "subtitle", text: "CONFIRM", class: ["code"], padding: "8px"},
                    {type: "button", text: "Pedir Confirmación", bg: "#28a745", fg: "white", onclick: [
                        ["IF", ["CONFIRM", "¿Estás seguro de continuar?"],
                            [["SHOW_TOAST", "✅ Confirmado"]],
                            [["SHOW_TOAST", "❌ Cancelado"]]
                        ]
                    ]},
                    
                    {type: "subtitle", text: "SHOW_ALERT (Dialog Personalizado)", class: ["code"], padding: "8px"},
                    {type: "input", id: "alertTitle", placeholder: "Título", value: "Título importante"},
                    {type: "input", id: "alertMsg", placeholder: "Mensaje", value: "Este es un mensaje personalizado"},
                    {type: "input", id: "alertBtn", placeholder: "Texto del botón", value: "Entendido"},
                    {type: "button", text: "Mostrar Alert Dialog", bg: "#007bff", fg: "white", onclick: [
                        ["SHOW_ALERT", 
                            ["ID_GET_VALUE", "alertTitle"],
                            ["ID_GET_VALUE", "alertMsg"], 
                            ["ID_GET_VALUE", "alertBtn"]
                        ]
                    ]}
                ]
            }
        }
    }
});
// App 4: App Manager Test
AppManager.install({
    package: "com.test.appmanager",
    name: "App Manager Test",
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Apps",
    entry: "MainActivity",
    activities: {
        "MainActivity": {
            onCreate: [
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_MANAGE_EXTERNAL_APPS"], [], [["ABORT"]]],
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_INSTALL_APPS"], [], [["ABORT"]]],
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_DELETE_APPS"], [], [["ABORT"]]]
            ],
            view: {
                type: "layout", padding: "15px", bg: "#e2e3e5", child: [
                    {type: "button", text: "← Volver", bg: "#6c757d", fg: "white", onclick: ["FINISH_ACTIVITY"]},
                    {type: "title", text: "App Manager Test", class: ["justify-center"]},
                    
                    {type: "subtitle", text: "LAUNCH_APP", class: ["code"], padding: "8px"},
                    {type: "input", id: "launchPackage", placeholder: "Paquete (ej: com.test.toastmanager)", value: "com.test.toastmanager"},
                    {type: "button", text: "Lanzar App", bg: "#28a745", fg: "white", onclick: [
                        ["LAUNCH_APP", ["ID_GET_VALUE", "launchPackage"]]
                    ]},
                    
                    {type: "subtitle", text: "UNINSTALL_APP", class: ["code"], padding: "8px"},
                    {type: "input", id: "uninstallPackage", placeholder: "Paquete a desinstalar", value: "com.test.demo"},
                    {type: "button", text: "Desinstalar App", bg: "#dc3545", fg: "white", onclick: [
                        ["SHOW_TOAST", ["IF", ["UNINSTALL_APP", ["ID_GET_VALUE", "uninstallPackage"]], "App desinstalada", "No se desinstaló"]]
                    ]},
                    
                    {type: "subtitle", text: "INSTALL_APP (Mini Studio)", class: ["code"], padding: "8px"},
                    {type: "button", text: "Abrir Mini Notroid Studio", bg: "#007bff", fg: "white", onclick: ["START_ACTIVITY", "MiniStudio"]}
                ]
            }
        },
        "MiniStudio": {
            view: {
                type: "layout", padding: "15px", bg: "#f8f9fa", child: [
                    {type: "button", text: "← Volver", bg: "#6c757d", fg: "white", onclick: ["FINISH_ACTIVITY"]},
                    {type: "title", text: "Mini Notroid Studio", class: ["justify-center"]},
                    {type: "textarea", id: "appJson", class: ["code", "all-width"], padding: "10px", 
                        value: '{\n  "package": "com.test.demo",\n  "name": "Demo App",\n  "icon": "https://placehold.co/150x150/666666/FFFFFF?text=Demo",\n  "entry": "MainActivity",\n  "activities": {\n    "MainActivity": {\n      "view": {\n        "type": "layout",\n        "child": [\n          {"type": "text", "text": "¡App de demo!"},\n          {"type": "button", "text": "Salir", "onclick": ["FINISH_ACTIVITY"]}\n        ]\n      }\n    }\n  }\n}'},
                    {type: "button", text: "📦 Instalar App", bg: "#28a745", fg: "white", class: ["all-width"], onclick: [
                        ["INSTALL_APP", ["JSON_PARSE", ["ID_GET_VALUE", "appJson"]]],
                        ["SHOW_TOAST", "App instalada/existente"]
                    ]}
                ]
            }
        }
    }
});
// App 5: Notification Manager Test
AppManager.install({
    package: "com.test.notificationmanager", 
    name: "Notification Manager Test",
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Noti",
    entry: "MainActivity",
    activities: {
        "MainActivity": {
            onCreate: [
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_POST_NOTIFICATIONS"], [], [["ABORT"]]],
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_MANAGE_NOTIFICATIONS_STATE"], [], [["ABORT"]]]
            ],
            view: {
                type: "layout", padding: "15px", bg: "#d4edda", child: [
                    {type: "button", text: "← Volver", bg: "#6c757d", fg: "white", onclick: ["FINISH_ACTIVITY"]},
                    {type: "title", text: "Notification Manager Test", class: ["justify-center"]},
                    
                    {type: "subtitle", text: "SEND_NOTIFICATION", class: ["code"], padding: "8px"},
                    {type: "input", id: "notiTitle", placeholder: "Título", value: "¡Nueva notificación!"},
                    {type: "input", id: "notiContent", placeholder: "Contenido", value: "Esto es una prueba del sistema"},
                    {type: "button", text: "Enviar Notificación", bg: "#28a745", fg: "white", onclick: [
                        ["SEND_NOTIFICATION", ["ID_GET_VALUE", "notiTitle"], ["ID_GET_VALUE", "notiContent"]],
                        ["SHOW_TOAST", "Notificación enviada"]
                    ]},
                    
                    {type: "subtitle", text: "Estados de Notificación", class: ["code"], padding: "8px"},
                    {type: "text", text: "Estado actual: ", id: "stateText"},
                    {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                        {type: "button", text: "GET_NOTIFICATION_STATE", bg: "#17a2b8", fg: "white", onclick: [
                            ["ID_SET_TEXT", "stateText", ["ADD", "Estado actual: ", ["GET_NOTIFICATION_STATE"]]]
                        ]},
                        {type: "button", text: "Mostrar Estados", bg: "#6f42c1", fg: "white", onclick: [
                            ["SHOW_TOAST", ["ADD", "Estado: ", ["GET_NOTIFICATION_STATE"]]]
                        ]}
                    ]},
                    
                    {type: "subtitle", text: "SET_NOTIFICATION_STATE", class: ["code"], padding: "8px"},
                    {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                        {type: "button", text: "Show", bg: "#28a745", fg: "white", onclick: [["SET_NOTIFICATION_STATE", "show"], ["SHOW_TOAST", "Estado: show"]]},
                        {type: "button", text: "Muted", bg: "#ffc107", fg: "black", onclick: [["SET_NOTIFICATION_STATE", "muted"], ["SHOW_TOAST", "Estado: muted"]]},
                        {type: "button", text: "Hide", bg: "#fd7e14", fg: "white", onclick: [["SET_NOTIFICATION_STATE", "hide"], ["SHOW_TOAST", "Estado: hide"]]},
                        {type: "button", text: "Block", bg: "#dc3545", fg: "white", onclick: [["SET_NOTIFICATION_STATE", "block"], ["SHOW_TOAST", "Estado: block"]]}
                    ]}
                ]
            }
        }
    }
});
// App 6: Permission Manager Test
AppManager.install({
    package: "com.test.permissionmanager",
    name: "Permission Manager Test", 
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Perm",
    entry: "MainActivity",
    activities: {
        "MainActivity": {
            onCreate: [
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_MANAGE_EXTERNAL_APPS"], [], [["ABORT"]]],
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_MANAGE_DIRECT_PERMISSIONS"], [], [["ABORT"]]]
            ],
            view: {
                type: "layout", padding: "15px", bg: "#cce7ff", child: [
                    {type: "button", text: "← Volver", bg: "#6c757d", fg: "white", onclick: ["FINISH_ACTIVITY"]},
                    {type: "title", text: "Permission Manager Test", class: ["justify-center"]},
                    
                    {type: "subtitle", text: "REQUEST_PERMISSION", class: ["code"], padding: "8px"},
                    {type: "input", id: "requestPerm", placeholder: "Permiso a solicitar", value: "PERMISSION_CAMERA"},
                    {type: "button", text: "Solicitar Permiso", bg: "#007bff", fg: "white", onclick: [
                        ["REQUEST_PERMISSION", ["ID_GET_VALUE", "requestPerm"]],
                        ["SHOW_TOAST", "Solicitud completada"]
                    ]},
                    
                    {type: "subtitle", text: "HAS_PERMISSION", class: ["code"], padding: "8px"},
                    {type: "input", id: "checkPerm", placeholder: "Permiso a verificar", value: "PERMISSION_POST_NOTIFICATIONS"},
                    {type: "button", text: "Verificar Permiso", bg: "#17a2b8", fg: "white", onclick: [
                        ["SHOW_TOAST", ["ADD", "Tiene permiso: ", ["HAS_PERMISSION", ["ID_GET_VALUE", "checkPerm"]]]]
                    ]},
                    
                    {type: "subtitle", text: "Gestión Externa", class: ["code"], padding: "8px"},
                    {type: "input", id: "extPackage", placeholder: "Paquete", value: "com.test.app"},
                    {type: "input", id: "extPerm", placeholder: "Permiso", value: "PERMISSION_POST_NOTIFICATIONS"},
                    {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                        {type: "button", text: "PACKAGE_GRANT", bg: "#28a745", fg: "white", onclick: [
                            ["PACKAGE_GRANT_PERMISSION", ["ID_GET_VALUE", "extPackage"], ["ID_GET_VALUE", "extPerm"]],
                            ["SHOW_TOAST", "Permiso otorgado"]
                        ]},
                        {type: "button", text: "PACKAGE_HAS", bg: "#20c997", fg: "white", onclick: [
                            ["SHOW_TOAST", ["ADD", "Tiene permiso: ", ["PACKAGE_HAS_PERMISSION", ["ID_GET_VALUE", "extPackage"], ["ID_GET_VALUE", "extPerm"]]]]
                        ]}
                    ]},
                    
                    {type: "subtitle", text: "Revocación", class: ["code"], padding: "8px"},
                    {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                        {type: "button", text: "REVOKE", bg: "#ffc107", fg: "black", onclick: [
                            ["REVOKE_PERMISSION", ["ID_GET_VALUE", "extPerm"]],
                            ["SHOW_TOAST", "Permiso revocado"]
                        ]},
                        {type: "button", text: "PACKAGE_REVOKE", bg: "#fd7e14", fg: "white", onclick: [
                            ["PACKAGE_REVOKE_PERMISSION", ["ID_GET_VALUE", "extPackage"], ["ID_GET_VALUE", "extPerm"]],
                            ["SHOW_TOAST", "Permiso revocado"]
                        ]}
                    ]}
                ]
            }
        }
    }
});
// App 7: StatusBar Manager Test
AppManager.install({
    package: "com.test.statusbarmanager", 
    name: "StatusBar Manager Test",
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Stat",
    entry: "MainActivity",
    activities: {
        "MainActivity": {
            onCreate: [
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_MANAGE_STATUS_BAR"], [], [["ABORT"]]]
            ],
            view: {
                type: "layout", padding: "15px", bg: "#fff3cd", child: [
                    {type: "button", text: "← Volver", bg: "#6c757d", fg: "white", onclick: ["FINISH_ACTIVITY"]},
                    {type: "title", text: "StatusBar Manager Test", class: ["justify-center"]},
                    
                    {type: "subtitle", text: "Iconos de Estado", class: ["code"], padding: "8px"},
                    {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                        {type: "button", text: "📶 Mostrar WiFi", bg: "#28a745", fg: "white", onclick: [["SHOW_STATUS_ICON", "wifi"], ["SHOW_TOAST", "WiFi mostrado"]]},
                        {type: "button", text: "📶 Ocultar WiFi", bg: "#dc3545", fg: "white", onclick: [["HIDE_STATUS_ICON", "wifi"], ["SHOW_TOAST", "WiFi oculto"]]}
                    ]},
                    {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                        {type: "button", text: "🔋 Mostrar Battery", bg: "#28a745", fg: "white", onclick: [["SHOW_STATUS_ICON", "battery"], ["SHOW_TOAST", "Battery mostrado"]]},
                        {type: "button", text: "🔋 Ocultar Battery", bg: "#dc3545", fg: "white", onclick: [["HIDE_STATUS_ICON", "battery"], ["SHOW_TOAST", "Battery oculto"]]}
                    ]},
                    
                    {type: "subtitle", text: "SET_STATUS_BAR_BACKGROUND", class: ["code"], padding: "8px"},
                    {type: "input", id: "bgColor", placeholder: "Color (ej: #FF0000)", value: "#008080"},
                    {type: "button", text: "Cambiar Color", bg: "#17a2b8", fg: "white", onclick: [
                        ["SET_STATUS_BAR_BACKGROUND", ["ID_GET_VALUE", "bgColor"]],
                        ["SHOW_TOAST", "Color cambiado"]
                    ]},
                    
                    {type: "subtitle", text: "TOGGLE_NOTIFICATIONS_PANEL", class: ["code"], padding: "8px"},
                    {type: "button", text: "Toggle Panel", bg: "#007bff", fg: "white", onclick: [
                        ["TOGGLE_NOTIFICATIONS_PANEL"],
                        ["SHOW_TOAST", "Panel toggled"]
                    ]}
                ]
            }
        }
    }
});
// App 8: System Config Test
AppManager.install({
    package: "com.test.systemconfig",
    name: "System Config Test", 
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Conf",
    entry: "MainActivity",
    activities: {
        "MainActivity": {
            onCreate: [
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_READ_CONFIGURATIONS"], [], [["ABORT"]]],
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_WRITE_CONFIGURATIONS"], [], [["ABORT"]]]
            ],
            view: {
                type: "layout", padding: "15px", bg: "#e2e3e5", child: [
                    {type: "button", text: "← Volver", bg: "#6c757d", fg: "white", onclick: ["FINISH_ACTIVITY"]},
                    {type: "title", text: "System Config Test", class: ["justify-center"]},
                    
                    {type: "subtitle", text: "GET_CONFIGURATION_VALUE", class: ["code"], padding: "8px"},
                    {type: "input", id: "readConfig", placeholder: "Configuración (ej: launcherColumns)", value: "launcherColumns"},
                    {type: "button", text: "Leer Valor", bg: "#17a2b8", fg: "white", onclick: [
                        ["SHOW_TOAST", ["ADD", "Valor: ", ["GET_CONFIGURATION_VALUE", ["ID_GET_VALUE", "readConfig"]]]]
                    ]},
                    
                    {type: "subtitle", text: "SET_CONFIGURATION_VALUE", class: ["code"], padding: "8px"},
                    {type: "input", id: "writeConfig", placeholder: "Configuración", value: "launcherBackground"},
                    {type: "input", id: "writeValue", placeholder: "Nuevo valor", value: "#FF5733"},
                    {type: "button", text: "Cambiar Valor", bg: "#007bff", fg: "white", onclick: [
                        ["SET_CONFIGURATION_VALUE", ["ID_GET_VALUE", "writeConfig"], ["ID_GET_VALUE", "writeValue"]],
                        ["SHOW_TOAST", "Configuración actualizada"]
                    ]},
                    
                    {type: "subtitle", text: "Configuraciones Rápidas", class: ["code"], padding: "8px"},
                    {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                        {type: "button", text: "Fondo Azul", bg: "#007bff", fg: "white", onclick: [["SET_CONFIGURATION_VALUE", "launcherBackground", "#3366FF"], ["SHOW_TOAST", "Fondo azul"]]},
                        {type: "button", text: "Fondo Verde", bg: "#28a745", fg: "white", onclick: [["SET_CONFIGURATION_VALUE", "launcherBackground", "#33FF66"], ["SHOW_TOAST", "Fondo verde"]]}
                    ]},
                    {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                        {type: "button", text: "4 Columnas", bg: "#6f42c1", fg: "white", onclick: [["SET_CONFIGURATION_VALUE", "launcherColumns", 4], ["SHOW_TOAST", "4 columnas"]]},
                        {type: "button", text: "6 Columnas", bg: "#e83e8c", fg: "white", onclick: [["SET_CONFIGURATION_VALUE", "launcherColumns", 6], ["SHOW_TOAST", "6 columnas"]]}
                    ]}
                ]
            }
        }
    }
});
// App 9: Android Bridge Test
AppManager.install({
    package: "com.test.androidbridge",
    name: "Android Bridge Test",
    icon: "https://placehold.co/150x150/66FF66/000000?text=Andr",
    entry: "MainActivity", 
    activities: {
        "MainActivity": {
            onCreate: [
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_GOOGLE_APROVEMENT"], [], [["ABORT"]]]
            ],
            view: {
                type: "layout", padding: "15px", bg: "#d1f7d1", child: [
                    {type: "button", text: "← Volver", bg: "#6c757d", fg: "white", onclick: ["FINISH_ACTIVITY"]},
                    {type: "title", text: "Android Bridge Test", class: ["justify-center"]},
                    
                    {type: "subtitle", text: "VERIFY_ENTORN", class: ["code"], padding: "8px"},
                    {type: "button", text: "¿Es Android?", bg: "#28a745", fg: "white", onclick: [
                        ["SHOW_TOAST", ["ADD", "Es Android: ", ["VERIFY_ENTORN", "android"]]]
                    ]},
                    
                    {type: "subtitle", text: "ANDROID_SHOW_TOAST", class: ["code"], padding: "8px"},
                    {type: "input", id: "androidToast", placeholder: "Mensaje para toast", value: "¡Hola desde Android!"},
                    {type: "button", text: "Mostrar Toast Android", bg: "#ffc107", fg: "black", onclick: [
                        ["ANDROID_SHOW_TOAST", ["ID_GET_VALUE", "androidToast"]],
                        ["SHOW_TOAST", "Toast Android enviado"]
                    ]},
                    
                    {type: "subtitle", text: "ANDROID_VIBRATE", class: ["code"], padding: "8px"},
                    {type: "input", id: "vibrateMs", placeholder: "Milisegundos", value: "500"},
                    {type: "button", text: "Vibrar", bg: "#17a2b8", fg: "white", onclick: [
                        ["ANDROID_VIBRATE", ["NUMBER", ["ID_GET_VALUE", "vibrateMs"]]],
                        ["SHOW_TOAST", "Vibración enviada"]
                    ]},
                    
                    {type: "subtitle", text: "Permisos Android", class: ["code"], padding: "8px"},
                    {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                        {type: "button", text: "ANDROID_HAS_PERMISSION", bg: "#007bff", fg: "white", onclick: [
                            ["SHOW_TOAST", ["ADD", "Tiene permiso: ", ["ANDROID_HAS_PERMISSION", "android.permission.CAMERA"]]]
                        ]},
                        {type: "button", text: "ANDROID_REQUEST", bg: "#6f42c1", fg: "white", onclick: [
                            ["ANDROID_REQUEST_PERMISSION", "android.permission.CAMERA"],
                            ["SHOW_TOAST", "Solicitud enviada"]
                        ]}
                    ]},
                    
                    {type: "subtitle", text: "ANDROID_SEND_NOTIFICATION", class: ["code"], padding: "8px"},
                    {type: "input", id: "androidNotiTitle", placeholder: "Título", value: "Notificación Android"},
                    {type: "input", id: "androidNotiContent", placeholder: "Contenido", value: "Desde Notroid con ❤️"},
                    {type: "button", text: "Enviar Notificación", bg: "#343a40", fg: "white", onclick: [
                        ["ANDROID_SEND_NOTIFICATION", ["ID_GET_VALUE", "androidNotiTitle"], ["ID_GET_VALUE", "androidNotiContent"]],
                        ["SHOW_TOAST", "Notificación Android enviada"]
                    ]}
                ]
            }
        }
    }
});
// App 10: Local Storage Test
AppManager.install({
    package: "com.test.localstorage",
    name: "Local Storage Test",
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Local",
    entry: "MainActivity",
    activities: {
        "MainActivity": {
            onCreate: [
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_LOCAL_STORAGE"], [], ["ABORT"]],
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_CLEAR_ALL_LOCAL_DATA"], [], ["ABORT"]]
            ],
            view: {
                type: "layout", padding: "15px", bg: "#f8d7da", child: [
                    {type: "button", text: "← Volver", bg: "#6c757d", fg: "white", onclick: ["FINISH_ACTIVITY"]},
                    {type: "title", text: "Local Storage Test", class: ["justify-center"]},
                    
                    {type: "subtitle", text: "SET_LOCAL / GET_LOCAL", class: ["code"], padding: "8px"},
                    {type: "input", id: "localKey", placeholder: "Clave", value: "miClave"},
                    {type: "input", id: "localValue", placeholder: "Valor", value: "miValor"},
                    {type: "layout", class: ["flex", "flex-row", "justify-between"], child: [
                        {type: "button", text: "SET_LOCAL", bg: "#dc3545", fg: "white", onclick: [
                            ["SET_LOCAL", ["ID_GET_VALUE", "localKey"], ["ID_GET_VALUE", "localValue"]],
                            ["SHOW_TOAST", "Valor guardado"]
                        ]},
                        {type: "button", text: "GET_LOCAL", bg: "#e83e8c", fg: "white", onclick: [
                            ["SHOW_TOAST", ["ADD", "Valor: ", ["GET_LOCAL", ["ID_GET_VALUE", "localKey"]]]]
                        ]}
                    ]},
                    
                    {type: "subtitle", text: "DEL_LOCAL", class: ["code"], padding: "8px"},
                    {type: "button", text: "Eliminar Clave", bg: "#ffc107", fg: "black", onclick: [
                        ["DEL_LOCAL", ["ID_GET_VALUE", "localKey"]],
                        ["SHOW_TOAST", "Clave eliminada"]
                    ]},
                    
                    {type: "subtitle", text: "CLEAR_ALL_LOCAL_DATA", class: ["code"], padding: "8px"},
                    {type: "button", text: "⚠️ LIMPIAR TODO", bg: "#343a40", fg: "white", onclick: [
                        ["IF", ["CONFIRM", "¿Estás SEGURO de borrar TODA la data?"],
                            [["CLEAR_ALL_LOCAL_DATA"], ["SHOW_TOAST", "Data limpiada"]],
                            [["SHOW_TOAST", "Operación cancelada"]]
                        ]
                    ]}
                ]
            }
        }
    }
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
                {type: "text", text: "Formulario de Registro", class: ["justify-center"], bg: "#008080", fg: "white"},
                
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
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_LOCAL_STORAGE"], [], ["ABORT"]],
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_CLEAR_ALL_LOCAL_DATA"], [], ["ABORT"]]
            ],
            view: {type: "layout", bg: "#FF8888", class: ["all-width", "all-height", "flex", "justify-center", "items-center"], child: [
                {type: "button", bg: "#FF0000", fg: "#FFFFFF", text: "CLEAR LOCAL STORAGE", padding: "30px", onclick: ["IF", ["CLEAR_ALL_LOCAL_DATA"], [["FINISH_ACTIVITY"], ["RELOAD_NOTROID"]], []]}
            ]}
        }
    }
})
AppManager.install({
    package: "com.x12steve.iamroot",
    name: "I am root?",
    hidden: true,
    icon: "https://placehold.co/150x150/44FFAA/000000?text=ROOT",
    entry: "Main",
    activities: {
        "Main": {
            onCreate: [
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_READ_CONFIGURATIONS"], [], ["ABORT"]],
            ],
            view: {type: "layout", bg: "#44FFAA", class: ["all-width", "all-height", "flex", "justify-center", "items-center"], child: [
                {type: "button", text: "Soy ROOT?", padding: "5px", onclick: ["SHOW_TOAST", ["IF", ["GET_CONFIGURATION_VALUE", "root"], "Eres root", "No eres root"]]} // hermano, sintaxis de los DIOSES, viva calvik w
            ]}
        }
    }
})
AppManager.install({
    package: "com.x12steve.arraytest",
    name: "Array Test",
    icon: "https://placehold.co/150x150/999999/000000?text=Array",
    entry: "Main",
    activities: {
        "Main": {
            onCreate: [
                ["SET_VAR", "frutas", ["ARRAY", "manzana", "banana", "uva"]] // si cambias el ["ARRAY"] por un "{}" literalmente sigue funcionando
            ],
            view: {type:"layout",id:"mainLayout",padding:"5px",bg:"#559",fg:"#fff",class:["all-width", "all-height"],child:[
                {type:"title",text:"Array Test"},
                {type:"subtitle",text:"(using CalvikArray)"},
                {type:"text",id:"arrayStateP",text:"Array state: loading..."},
                {type:"button",text:"Reload",bg:"#f0f",onclick:["ID_SET_TEXT", "arrayStateP", ["ADD", "Array state: ", ["JSON_STRINGIFY", ["GET_VAR", "frutas"]]]]},
                {type:"br"},
                {type:"input",placeholder:"Actualicen Notroid",id:"input"},
                {type:"button",text:"PUSH",bg:"#0f0",onclick:["PUSH", ["GET_VAR", "frutas"], ["ID_GET_VALUE", "input"]]},
                {type:"button",text:"POP",bg:"#f00",onclick:["ID_SET_TEXT", "arrayStateP", ["POP", ["GET_VAR", "frutas"]]]},
                {type:"button",text:"SHIFT",bg:"#a00",onclick:["ID_SET_TEXT", "arrayStateP", ["SHIFT", ["GET_VAR", "frutas"]]]},
                {type:"button",text:"JOIN",bg:"#999",onclick:["ID_SET_TEXT", "arrayStateP", ["JOIN", ["GET_VAR", "frutas"], ["ID_GET_VALUE", "input"]]]},
                {type:"button",text:"SET_AT",bg:"#0ff",onclick:["SET_AT", ["GET_VAR", "frutas"], ["PROMPT", "Index:"], ["ID_GET_VALUE", "input"]]},
                {type:"button",text:"GET_AT",bg:"#ff0",onclick:["ID_SET_TEXT", "arrayStateP", ["GET_AT", ["GET_VAR", "frutas"], ["PROMPT", "Index:"]]]},
                {type:"button",text:"FOR_EACH Test",bg:"#000",fg:"#fff",onclick:[
                    ["ID_CLEAR_CHILDS", "testLayout"],
                    ["FOR_EACH", ["GET_VAR", "frutas"], "fruta", // ! Problemas con variables (los textos si salen bien con su item, pero en el ALERT del onclick siempre sale el último elemento (porque al terminar todas las iteraciones el último valor de `frutas` queda siendo el último elemento))
                        ["ID_APPEND_CHILD", "testLayout", {type:"button", text:"Item: ${fruta}", class:["code"], onclick: ["ALERT", "Clickeaste: '${fruta}'"]}] // Hermano, esto ya literalmente puede ser un launcher
                    ]
                ]},
                {type:"layout",id:"testLayout",padding:"5px",bg:"#995",fg:"#fff",class:["all-width", "all-height"]}
            ]}
        }
    }
})

AppManager.install({
    // La app definitiva, no cualquiera empieza por "com.notroid."
    package: "com.notroid.settings",
    name: "Ajustes",
    icon: "https://placehold.co/150x150/666666/FFFFFF?text=Config",
    entry: "Main",
    activities: {
        "Main": {
            onCreate: [
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_READ_CONFIGURATIONS"], [], ["ABORT"]],
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_WRITE_CONFIGURATIONS"], [], ["ABORT"]],
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_MANAGE_STATUS_BAR"], [], ["ABORT"]],
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_MANAGE_NAVIGATION_BAR"], [], ["ABORT"]],
            ],
            onDestroy: [],
            background: "#111",
            foreground: "#fff",
            view: {type:"layout",padding:"5px",class:["all-width","all-height"],child:[
                {type:"title",text:"Configuraciones"},{type:"br"},

                {type:"button",text:"🎨 Apariencia",class:["all-width", "flex", "justify-start"],padding:"5px",bg:"#000",fg:"#fff",fontSize:"15px",onclick:["START_ACTIVITY", "Appearance"]},

                {type:"button",text:"⏰ Reloj y tiempo",class:["all-width", "flex", "justify-start"],padding:"5px",bg:"#000",fg:"#fff",fontSize:"15px",onclick:["START_ACTIVITY", "ClockAndTime"]},

                {type:"button",text:"🔔 Notificaciones",class:["all-width", "flex", "justify-start"],padding:"5px",bg:"#000",fg:"#fff",fontSize:"15px",onclick:["START_ACTIVITY", "Notifications"]},

                {type:"button",text:"🔐 Permisos y Seguridad",class:["all-width", "flex", "justify-start"],padding:"5px",bg:"#000",fg:"#fff",fontSize:"15px",onclick:["START_ACTIVITY", "PermissionsAndSecurity"]},
            ]}
        },
        "Appearance": {
            background: "#111",
            foreground: "#fff",
            view: {type:"layout",padding:"5px",class:["all-width","all-height"],child:[
                {type:"title",text:"🎨 Apariencia"},{type:"br"},
                {type:"subtitle",text:"Launcher"},{type:"br"},
                {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                    {type:"text",text:"Columnas en el escritorio"},
                    {type:"input",inputType:"number",id:"inpLauncherCols",bg:"none",fg:"#999",value:'${["GET_CONFIGURATION_VALUE", "launcherColumns"]}',oninput:[
                        ["SET_CONFIGURATION_VALUE", "launcherColumns", ["ID_GET_VALUE", "inpLauncherCols"]]
                    ]}
                ]},
                {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                    {type:"text",text:"Filas en el escritorio"},
                    {type:"input",inputType:"number",id:"inpLauncherRows",bg:"none",fg:"#999",value:'${["GET_CONFIGURATION_VALUE", "launcherRows"]}',oninput:[
                        ["SET_CONFIGURATION_VALUE", "launcherRows", ["ID_GET_VALUE", "inpLauncherRows"]]
                    ]}
                ]},
                {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                    {type:"text",text:"Espacio entre apps"},
                    {type:"input",inputType:"number",id:"inpLauncherGap",bg:"none",fg:"#999",value:'${["GET_CONFIGURATION_VALUE", "launcherGap"]}',oninput:[
                        ["SET_CONFIGURATION_VALUE", "launcherGap", ["ID_GET_VALUE", "inpLauncherGap"]]
                    ]}
                ]},
                {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                    {type:"text",text:"Color de fondo de escritorio"},
                    {type:"input",inputType:"color",id:"inpLauncherBackground",bg:"none",fg:"#999",value:'${["GET_CONFIGURATION_VALUE", "launcherBackground"]}',onchange:[
                        ["SET_CONFIGURATION_VALUE", "launcherBackground", ["ID_GET_VALUE", "inpLauncherBackground"]]
                    ]}
                ]},
                {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                    {type:"text",text:"Mostrar nombres de apps"},
                    {type:"switch",id:"chkShowAppNames",checked:["GET_CONFIGURATION_VALUE", "showAppNames"],onchange:[
                        ["SET_CONFIGURATION_VALUE", "showAppNames", ["BOOLEAN", ["ID_IS_CHECKED", "chkShowAppNames"]]]
                    ]}
                ]},
                {type:"br"},{type:"subtitle",text:"Barras del sistema"},{type:"br"},
                {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                    {type:"text",text:"Altura de barra de estado"},
                    {type:"input",inputType:"number",id:"inpStatusBarHeight",bg:"none",fg:"#999",value:'${["GET_CONFIGURATION_VALUE", "statusBarHeight"]}',oninput:[
                        ["SET_CONFIGURATION_VALUE", "statusBarHeight", ["NUMBER", ["ID_GET_VALUE", "inpStatusBarHeight"]]]
                    ]}
                ]},
                {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                    {type:"text",text:"Altura de barra de navegación"},
                    {type:"input",inputType:"number",id:"inpNavBarHeight",bg:"none",fg:"#999",value:'${["GET_CONFIGURATION_VALUE", "navBarHeight"]}',oninput:[
                        ["SET_CONFIGURATION_VALUE", "navBarHeight", ["NUMBER", ["ID_GET_VALUE", "inpNavBarHeight"]]]
                    ]}
                ]},
                {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                    {type:"text",text:"Invertir barra de navegación"},
                    {type:"switch",id:"chkFlipNavigationBar",checked:["GET_CONFIGURATION_VALUE", "flipNavigationBar"],onchange:[
                        ["SET_CONFIGURATION_VALUE", "flipNavigationBar", ["BOOLEAN", ["ID_IS_CHECKED", "chkFlipNavigationBar"]]]
                    ]}
                ]},
                {type:"br"},{type:"subtitle",text:"StatusBar"},{type:"br"},
                {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                    {type:"text",text:"Color de fondo"},
                    {type:"input",inputType:"color",id:"inpStatusBarBg",bg:"none",fg:"#999",value:'${["GET_STATUS_BAR_CONFIG", "background"]}',onchange:[
                        ["SET_STATUS_BAR_CONFIG", "background", ["ID_GET_VALUE", "inpStatusBarBg"]]
                    ]}
                ]},
                {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                    {type:"text",text:"Color de texto/íconos"},
                    {type:"input",inputType:"color",id:"inpStatusBarFg",bg:"none",fg:"#999",value:'${["GET_STATUS_BAR_CONFIG", "foreground"]}',onchange:[
                        ["SET_STATUS_BAR_CONFIG", "foreground", ["ID_GET_VALUE", "inpStatusBarFg"]]
                    ]}
                ]},
                {type:"br"},{type:"subtitle",text:"NavigationBar"},{type:"br"},
                {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                    {type:"text",text:"Color de fondo"},
                    {type:"input",inputType:"color",id:"inpNavigationBarBg",bg:"none",fg:"#999",value:'${["GET_NAVIGATION_BAR_CONFIG", "background"]}',onchange:[
                        ["SET_NAVIGATION_BAR_CONFIG", "background", ["ID_GET_VALUE", "inpNavigationBarBg"]]
                    ]}
                ]},
                {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                    {type:"text",text:"Color de botones"},
                    {type:"input",inputType:"color",id:"inpNavigationBarFg",bg:"none",fg:"#999",value:'${["GET_NAVIGATION_BAR_CONFIG", "foreground"]}',onchange:[
                        ["SET_NAVIGATION_BAR_CONFIG", "foreground", ["ID_GET_VALUE", "inpNavigationBarFg"]]
                    ]}
                ]},
            ]}
        },
        "ClockAndTime": {
            background: "#111",
            foreground: "#fff",
            view: {type:"layout",padding:"5px",class:["all-width","all-height"],child:[
                {type:"title",text:"⏰ Reloj y Tiempo"},{type:"br"},
                {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                    {type:"text",text:"Mostrar segundos"},
                    {type:"switch",id:"chkTimeShowSeconds",checked:["GET_CONFIGURATION_VALUE", "timeShowSeconds"],onchange:[
                        ["SET_CONFIGURATION_VALUE", "timeShowSeconds", ["BOOLEAN", ["ID_IS_CHECKED", "chkTimeShowSeconds"]]]
                    ]}
                ]},
                {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                    {type:"text",text:"Formato 12 horas"},
                    {type:"switch",id:"chkTime12hourMode",checked:["GET_CONFIGURATION_VALUE", "time12hourMode"],onchange:[
                        ["SET_CONFIGURATION_VALUE", "time12hourMode", ["BOOLEAN", ["ID_IS_CHECKED", "chkTime12hourMode"]]]
                    ]}
                ]},
                {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                    {type:"text",text:"Intervalo de actualización (reiniciar para ver efecto)"},
                    {type:"input",inputType:"number",id:"inpTimeReloadIntervalMS",bg:"none",fg:"#999",value:'${["GET_CONFIGURATION_VALUE", "timeReloadIntervalMS"]}',oninput:[
                        ["SET_CONFIGURATION_VALUE", "timeReloadIntervalMS", ["NUMBER", ["ID_GET_VALUE", "inpTimeReloadIntervalMS"]]]
                    ]}
                ]},
            ]}
        },
        "Notifications": {
            background: "#111",
            foreground: "#fff",
            view: {type:"layout",padding:"5px",class:["all-width","all-height"],child:[
                {type:"title",text:"🔔 Notificaciones"},{type:"br"},
                {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                    {type:"text",text:"Sonido de notificaciones por defecto"},
                    {type:"input",inputType:"text",id:"inpDefaultNotificationSound",bg:"none",fg:"#999",value:'${["GET_CONFIGURATION_VALUE", "defaultNotificationSound"]}',oninput:[
                        ["SET_CONFIGURATION_VALUE", "defaultNotificationSound", ["ID_GET_VALUE", "inpDefaultNotificationSound"]]
                    ]}
                ]},
                {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                    {type:"text",text:"Duración del popup superior"},
                    {type:"input",inputType:"number",id:"inpNotificationTopPopupTimeout",bg:"none",fg:"#999",value:'${["GET_CONFIGURATION_VALUE", "notificationTopPopupTimeout"]}',oninput:[
                        ["SET_CONFIGURATION_VALUE", "notificationTopPopupTimeout", ["NUMBER", ["ID_GET_VALUE", "inpNotificationTopPopupTimeout"]]]
                    ]}
                ]},
                {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                    {type:"text",text:"Sensibilidad mínima para deslizar la barra de notificaciones"},
                    {type:"input",inputType:"number",id:"inpStatusBarMinSwipe",bg:"none",fg:"#999",value:'${["GET_CONFIGURATION_VALUE", "statusBarMinSwipe"]}',oninput:[
                        ["SET_CONFIGURATION_VALUE", "statusBarMinSwipe", ["NUMBER", ["ID_GET_VALUE", "inpStatusBarMinSwipe"]]]
                    ]}
                ]},
            ]}
        },
        "PermissionsAndSecurity": {
            background: "#111",
            foreground: "#fff",
            view: {type:"layout",padding:"5px",class:["all-width","all-height"],child:[
                {type:"title",text:"🔐 Permisos y Seguridad"},{type:"br"},
                {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                    {type:"text",text:"Otorgar permisos automáticamente (peligroso, útil para devs)"},
                    {type:"switch",id:"chkAutoGrantPermissions",checked:["GET_CONFIGURATION_VALUE", "autoGrantPermissions"],onchange:[
                        ["SET_CONFIGURATION_VALUE", "autoGrantPermissions", ["BOOLEAN", ["ID_IS_CHECKED", "chkAutoGrantPermissions"]]]
                    ]}
                ]},
                {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                    {type:"text",text:"Limpiar datos al desinstalar"},
                    {type:"switch",id:"chkClearAppDataOnUninstall",checked:["GET_CONFIGURATION_VALUE", "clearAppDataOnUninstall"],onchange:[
                        ["SET_CONFIGURATION_VALUE", "clearAppDataOnUninstall", ["BOOLEAN", ["ID_IS_CHECKED", "chkClearAppDataOnUninstall"]]]
                    ]}
                ]},
                {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                    {type:"text",text:"Modo root",fg:"#f66"}, // Android, aprende, solo un switch y ya!!
                    {type:"switch",id:"chkRoot",checked:["GET_CONFIGURATION_VALUE", "root"],onchange:[
                        ["SET_CONFIGURATION_VALUE", "root", ["BOOLEAN", ["ID_IS_CHECKED", "chkRoot"]]]
                    ]}
                ]},
                {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                    {type:"text",text:"Bloquear RickRoll"},
                    {type:"switch",id:"chkRickRollBlocker",checked:["GET_CONFIGURATION_VALUE", "rickRollBlocker"],onchange:[
                        ["SET_CONFIGURATION_VALUE", "rickRollBlocker", ["BOOLEAN", ["ID_IS_CHECKED", "chkRickRollBlocker"]]]
                    ]}
                ]},
            ]}
        },
    }
})

localStorage.setItem("firstEntry", "true");
}
