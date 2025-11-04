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
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Test",
    calvik: [
        ["SET_VAR", "res", ["PROMPT", "Mensaje a mostrar:"]],
        ["SHOW_TOAST", ["GET_VAR", "res"]]
    ]
})
AppManager.install({
    package: "com.test.alertdialog",
    name: "Alert Dialog Test",
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Test",
    calvik: [
        ["SET_VAR", "title", ["PROMPT", "Titulo:"]],
        ["SET_VAR", "content", ["PROMPT", "Contenido"]],
        ["SET_VAR", "btnText", ["PROMPT", "Texto del botón de aceptar:", "Aceptar"]],
        ["SHOW_ALERT", ["GET_VAR", "title"], ["GET_VAR", "content"], ["GET_VAR", "btnText"], ["SHOW_TOAST", "Aceptado"]]
    ]
})
AppManager.install({
    package: "com.test.appmanager",
    name: "App Manager Test",
    icon: "https://placehold.co/150x150/999999/FFFFFF?text=Test",
    calvik: [
        ["WHILE", "true",
        [
            ["IF", ["REQUEST_PERMISSION", "PERMISSION_MANAGE_EXTERNAL_APPS"], [], [["SHOW_TOAST", "Permisos incompletos"], ["BREAK"]]],
            ["IF", ["REQUEST_PERMISSION", "PERMISSION_INSTALL_APPS"], [], [["SHOW_TOAST", "Permisos incompletos"], ["BREAK"]]],
            ["IF", ["REQUEST_PERMISSION", "PERMISSION_DELETE_APPS"], [], [["SHOW_TOAST", "Permisos incompletos"], ["BREAK"]]],
            ["SET_VAR", "opt", ["PROMPT", "¿Qué quieres hacer? (exit para salir)\n- launch\n- install\n- uninstall"]],
            ["IF", ["EQ", ["GET_VAR", "opt"], "launch"],
            [
                ["SET_VAR", "res", ["PROMPT", "App a lanzar:"]],
                ["LAUNCH_APP", ["GET_VAR", "res"]],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "install"],
            [
                ["SET_VAR", "res", ["PROMPT", "App a instalar:"]],
                ["INSTALL_APP", ["JSON_PARSE", ["GET_VAR", "res"]]],
                ["BREAK"]
            ]
            ],
            ["IF", ["EQ", ["GET_VAR", "opt"], "uninstall"],
            [
                ["SET_VAR", "res", ["PROMPT", "App a desinstalar:"]],
                ["UNINSTALL_APP", ["GET_VAR", "res"]],
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
localStorage.setItem("firstEntry", "true");
}
AppManager.install({
    package: "com.x12steve.test",
    name: "Test",
    icon: "https://placehold.co/150x150/FF66FF/000000?text=Test",
    functions: {},
    activities: {
        "MainActivity": {
            onCreate: ["LOG", "Creado"],
            onDestroy: ["LOG", "Destruido"],
            view: {type: "linear_layout", orientation: "horizontal", childs: [
                {type: "text", text: "Bienvenido a Notroid Kbron", id: "label"},
                {type: "button", text: "Hacer cualquier mamada", onclick: ["ID_SET_TEXT", "label", "Nuevo texto, ya puedes irte"]},
                {type: "button", text: "Salir", onclick: ["FINISH_ACTIVITY"]}
            ]}
        }
    },
    calvik: [
        ["START_ACTIVITY", "MainActivity"]
    ]
})
localStorage.clear()
