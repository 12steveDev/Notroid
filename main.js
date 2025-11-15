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
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_GOOGLE_APROVEMENT"], [], ["ABORT"]]
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
                    ]},

                    {type: "subtitle", text: "ANDROID_FINISH_ACTIVITY", class: ["code"], padding: "8px"},
                    {type: "button", text: "Salir de la app", bg: "#cd3a40", fg: "white", onclick: [
                        ["IF", ["CONFIRM", "¡Saldrás de la app Android de verdad!"], ["ANDROID_FINISH_ACTIVITY"], []]
                    ]},
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
    package: "com.notroid.fileexplorer",
    name: "File Explorer",
    icon: "https://placehold.co/150x150/6666FF/FFFFFF?text=Files",
    entry: "Main",
    activities: {
        "Main": {
            onCreate: [
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_READ_EXTERNAL_STORAGE"], [], ["ABORT"]],
                ["IF", ["REQUEST_PERMISSION", "PERMISSION_WRITE_EXTERNAL_STORAGE"], [], ["ABORT"]]
            ],
            onStart: [
                ["ID_CLICK", "listBtn"] // automaticamente muestra la ruta actual
            ],
            view: {
                type: "layout", padding: "10px", child: [
                    {type: "title", text: "📂 File Explorer"},
                    {type: "input", width:"100%", id: "pathInp", value: "/storage/emulated/12/", placeholder: "Ruta..."},{type:"br"},
                    {type: "textarea", width:"100%", height:"100px", id: "contentInp", placeholder: "Contenido... (opcional)"},{type:"br"},
                    {type: "button", id:"listBtn", text: "Listar", bg:"#ccc", onclick: [
                        ["SET_VAR", "lastPath", ["ID_GET_VALUE", "pathInp"]],
                        ["SET_VAR", "files", ["FS_LIST_DIR", ["GET_VAR", "lastPath"]]],
                        ["ID_CLEAR_CHILDS", "fileList"],
                        ["FOR_EACH", ["GET_VAR", "files"], "file",[
                            ["IF", ["FS_IS_DIR", '${["ID_GET_VALUE", "pathInp"]}/${file}'],
                                ["ID_APPEND_CHILD", "fileList", {type: "text", text: "📁 ${file}", class: ["code"]}],
                                ["ID_APPEND_CHILD", "fileList", {type: "text", text: "📄 ${file}", class: ["code"]}]
                            ]
                        ]]
                    ]},
                    {type: "button", text: "Crear Directorio", bg:"#ef0", onclick: [
                        ["ID_SET_TEXT", "statusTxt", ["IF", ["FS_CREATE_DIR", ["ID_GET_VALUE", "pathInp"]], 'Directorio "${["ID_GET_VALUE", "pathInp"]}" creado', "Error al crear el directorio"]],
                        ["ID_SET_VALUE", "pathInp", "${lastPath}"],
                        ["ID_CLICK", "listBtn"],
                    ]},
                    {type: "button", text: "Crear Directorios", bg:"#eb0", onclick: [
                        ["ID_SET_TEXT", "statusTxt", ["IF", ["FS_CREATE_DIRS", ["ID_GET_VALUE", "pathInp"]], 'Directorios "${["ID_GET_VALUE", "pathInp"]}" creados', "Error al crear los directorios"]],
                        ["ID_SET_VALUE", "pathInp", "${lastPath}"],
                        ["ID_CLICK", "listBtn"],
                    ]},
                    {type: "button", text: "Crear Archivo", bg:"#fff", onclick: [
                        ["ID_SET_TEXT", "statusTxt", ["IF", ["FS_CREATE_FILE", ["ID_GET_VALUE", "pathInp"]], 'Archivo "${["ID_GET_VALUE", "pathInp"]}" creado', "Error al crear el archivo"]],
                        ["ID_SET_VALUE", "pathInp", "${lastPath}"],
                        ["ID_CLICK", "listBtn"],
                    ]},
                    {type: "button", text: "Leer Archivo", bg:"#0a0", fg:"#fff", onclick: [
                        ["SET_VAR", "fContent", ["FS_READ_FILE", ["ID_GET_VALUE", "pathInp"]]],
                        ["ID_SET_TEXT", "statusTxt", ["IF", ["GET_VAR", "fContent"], '${fContent}', "Error al leer el archivo"]],
                    ]},
                    {type: "button", text: "Escribir Archivo", bg:"#0aa", fg:"#fff", onclick: [
                        ["ID_SET_TEXT", "statusTxt", ["IF", ["FS_WRITE_FILE", ["ID_GET_VALUE", "pathInp"], ["ID_GET_VALUE", "contentInp"]], 'Archivo "${["ID_GET_VALUE", "pathInp"]}" escrito', "Error al escribir el archivo"]],
                    ]},
                    {type: "button", text: "Expandir Archivo", bg:"#00a", fg:"#fff", onclick: [
                        ["ID_SET_TEXT", "statusTxt", ["IF", ["FS_APPEND_FILE", ["ID_GET_VALUE", "pathInp"], ["ID_GET_VALUE", "contentInp"]], 'Archivo "${["ID_GET_VALUE", "pathInp"]}" expandido', "Error al expandir el archivo"]],
                    ]},
                    {type: "button", text: "Eliminar elemento", bg:"#a00", fg:"#fff", onclick: [
                        ["ID_SET_TEXT", "statusTxt", ["IF", ["FS_REMOVE", ["ID_GET_VALUE", "pathInp"]], 'Archivo "${["ID_GET_VALUE", "pathInp"]}" eliminado', "Error al eliminar archivo"]],
                        ["ID_SET_VALUE", "pathInp", "${lastPath}"],
                        ["ID_CLICK", "listBtn"],
                    ]},
                    {type: "text", text:"Cargando...", fontSize:"12px", padding: "5px", id: "statusTxt", bg: "#000", fg: "#fff", class:["code"]},
                    {type: "layout", id: "fileList"}
                ]
            }
        }
    }
});

localStorage.setItem("firstEntry", "true");
}
