// priv-app.js
if (!AppManager.getAppObj("com.notroid.settings")){
    AppManager.install({
        package: "com.notroid.settings",
        name: "Ajustes",
        permissions:["PERMISSION_READ_CONFIGURATIONS", "PERMISSION_WRITE_CONFIGURATIONS"],
        icon: "https://placehold.co/150x150/666666/FFFFFF?text=Config",
        versionCode: 1,
<<<<<<< HEAD
        res: {
            layouts: {
                "main_layout": {type:"layout",padding:"5px",class:["all-width","all-height"],child:[
=======
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
>>>>>>> d5d913d016ecff2f081a0e56ec61eebbadab4d19
                    {type:"title",text:"Configuraciones"},{type:"br"},

                    {type:"button",text:"🎨 Apariencia",class:["all-width", "flex", "justify-start"],padding:"5px",bg:"#000",fg:"#fff",fontSize:"15px",onclick:["START_ACTIVITY", "Appearance"]},

                    {type:"button",text:"⏰ Reloj y tiempo",class:["all-width", "flex", "justify-start"],padding:"5px",bg:"#000",fg:"#fff",fontSize:"15px",onclick:["START_ACTIVITY", "ClockAndTime"]},

                    {type:"button",text:"🔔 Notificaciones",class:["all-width", "flex", "justify-start"],padding:"5px",bg:"#000",fg:"#fff",fontSize:"15px",onclick:["START_ACTIVITY", "Notifications"]},

                    {type:"button",text:"🔐 Permisos y Seguridad",class:["all-width", "flex", "justify-start"],padding:"5px",bg:"#000",fg:"#fff",fontSize:"15px",onclick:["START_ACTIVITY", "PermissionsAndSecurity"]},
                ]},
                "appearance_layout": {type:"layout",padding:"5px",class:["all-width","all-height"],child:[
                    {type:"title",text:"🎨 Apariencia"},{type:"br"},
                    {type:"subtitle",text:"Launcher"},{type:"br"},
                    {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                        {type:"text",text:"Columnas en el escritorio"},
                        {type:"input",inputType:"number",id:"inpLauncherCols",bg:"none",fg:"#999",value:'${["GET_CONFIGURATION_VALUE", "launcherColumns"]}'}
                    ]},
                    {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                        {type:"text",text:"Filas en el escritorio"},
                        {type:"input",inputType:"number",id:"inpLauncherRows",bg:"none",fg:"#999",value:'${["GET_CONFIGURATION_VALUE", "launcherRows"]}'}
                    ]},
                    {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                        {type:"text",text:"Espacio entre apps"},
                        {type:"input",inputType:"number",id:"inpLauncherGap",bg:"none",fg:"#999",value:'${["GET_CONFIGURATION_VALUE", "launcherGap"]}'}
                    ]},
                    {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                        {type:"text",text:"Color de fondo de escritorio"},
                        {type:"input",inputType:"color",id:"inpLauncherBackground",bg:"none",fg:"#999",value:'${["GET_CONFIGURATION_VALUE", "launcherBackground"]}'}
                    ]},
                    {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                        {type:"text",text:"Mostrar nombres de apps"},
                        {type:"switch",id:"chkShowAppNames",checked:["GET_CONFIGURATION_VALUE", "showAppNames"]}
                    ]},
                    {type:"br"},{type:"subtitle",text:"Barras del sistema"},{type:"br"},
                    {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                        {type:"text",text:"Altura de barra de estado"},
                        {type:"input",inputType:"number",id:"inpStatusBarHeight",bg:"none",fg:"#999",value:'${["GET_CONFIGURATION_VALUE", "statusBarHeight"]}'}
                    ]},
                    {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                        {type:"text",text:"Altura de barra de navegación"},
                        {type:"input",inputType:"number",id:"inpNavBarHeight",bg:"none",fg:"#999",value:'${["GET_CONFIGURATION_VALUE", "navBarHeight"]}'}
                    ]},
                    {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                        {type:"text",text:"Invertir barra de navegación"},
                        {type:"switch",id:"chkFlipNavigationBar",checked:["GET_CONFIGURATION_VALUE", "flipNavigationBar"]}
                    ]},
                    {type:"br"},{type:"subtitle",text:"StatusBar"},{type:"br"},
                    {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                        {type:"text",text:"Color de fondo"},
                        {type:"input",inputType:"color",id:"inpStatusBarBg",bg:"none",fg:"#999",value:'${["GET_STATUS_BAR_CONFIG", "background"]}'}
                    ]},
                    {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                        {type:"text",text:"Color de texto/íconos"},
                        {type:"input",inputType:"color",id:"inpStatusBarFg",bg:"none",fg:"#999",value:'${["GET_STATUS_BAR_CONFIG", "foreground"]}'}
                    ]},
                    {type:"br"},{type:"subtitle",text:"NavigationBar"},{type:"br"},
                    {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                        {type:"text",text:"Color de fondo"},
                        {type:"input",inputType:"color",id:"inpNavigationBarBg",bg:"none",fg:"#999",value:'${["GET_NAVIGATION_BAR_CONFIG", "background"]}'}
                    ]},
                    {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                        {type:"text",text:"Color de botones"},
                        {type:"input",inputType:"color",id:"inpNavigationBarFg",bg:"none",fg:"#999",value:'${["GET_NAVIGATION_BAR_CONFIG", "foreground"]}'}
                    ]},
                ]},
                "clock_and_time_layout": {type:"layout",padding:"5px",class:["all-width","all-height"],child:[
                    {type:"title",text:"⏰ Reloj y Tiempo"},{type:"br"},
                    {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                        {type:"text",text:"Mostrar segundos"},
                        {type:"switch",id:"chkTimeShowSeconds",checked:["GET_CONFIGURATION_VALUE", "timeShowSeconds"]}
                    ]},
                    {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                        {type:"text",text:"Formato 12 horas"},
                        {type:"switch",id:"chkTime12hourMode",checked:["GET_CONFIGURATION_VALUE", "time12hourMode"]}
                    ]},
                    {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                        {type:"text",text:"Intervalo de actualización (reiniciar para ver efecto)"},
                        {type:"input",inputType:"number",id:"inpTimeReloadIntervalMS",bg:"none",fg:"#999",value:'${["GET_CONFIGURATION_VALUE", "timeReloadIntervalMS"]}'}
                    ]},
                ]},
                "notifications_layout": {type:"layout",padding:"5px",class:["all-width","all-height"],child:[
                    {type:"title",text:"🔔 Notificaciones"},{type:"br"},
                    {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                        {type:"text",text:"Sonido de notificaciones por defecto"},
                        {type:"input",inputType:"text",id:"inpDefaultNotificationSound",bg:"none",fg:"#999",value:'${["GET_CONFIGURATION_VALUE", "defaultNotificationSound"]}'}
                    ]},
                    {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                        {type:"text",text:"Duración del popup superior"},
                        {type:"input",inputType:"number",id:"inpNotificationTopPopupTimeout",bg:"none",fg:"#999",value:'${["GET_CONFIGURATION_VALUE", "notificationTopPopupTimeout"]}'}
                    ]},
                    {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                        {type:"text",text:"Sensibilidad mínima para deslizar la barra de notificaciones"},
                        {type:"input",inputType:"number",id:"inpStatusBarMinSwipe",bg:"none",fg:"#999",value:'${["GET_CONFIGURATION_VALUE", "statusBarMinSwipe"]}'}
                    ]},
                ]},
                "permissions_and_security_layout": {type:"layout",padding:"5px",class:["all-width","all-height"],child:[
                    {type:"title",text:"🔐 Permisos y Seguridad"},{type:"br"},
                    {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                        {type:"text",text:"Otorgar permisos automáticamente (peligroso, útil para devs)"},
                        {type:"switch",id:"chkAutoGrantPermissions",checked:["GET_CONFIGURATION_VALUE", "autoGrantPermissions"]}
                    ]},
                    {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                        {type:"text",text:"Limpiar datos al desinstalar"},
                        {type:"switch",id:"chkClearAppDataOnUninstall",checked:["GET_CONFIGURATION_VALUE", "clearAppDataOnUninstall"]}
                    ]},
                    {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                        {type:"text",text:"Modo root",fg:"#f66"}, // Android, aprende, solo un switch y ya!!
                        {type:"switch",id:"chkRoot",checked:["GET_CONFIGURATION_VALUE", "root"]}
                    ]},
                    {type:"layout",bg:"#000",padding:"5px",class:["flex","flex-column"],child:[
                        {type:"text",text:"Bloquear RickRoll"},
                        {type:"switch",id:"chkRickRollBlocker",checked:["GET_CONFIGURATION_VALUE", "rickRollBlocker"]}
                    ]},
                ]}
            }
        },
        activities: {
            "Main": {
                actions: ["ACTION_MAIN"],
                categories: ["CATEGORY_LAUNCHER"],
                background: "#111",
                foreground: "#fff",
                onCreate: [
                    ["IF", ["REQUEST_PERMISSION", "PERMISSION_READ_CONFIGURATIONS"], [], ["ABORT"]],
                    ["IF", ["REQUEST_PERMISSION", "PERMISSION_WRITE_CONFIGURATIONS"], [], ["ABORT"]],
                    ["IF", ["REQUEST_PERMISSION", "PERMISSION_MANAGE_STATUS_BAR"], [], ["ABORT"]],
                    ["IF", ["REQUEST_PERMISSION", "PERMISSION_MANAGE_NAVIGATION_BAR"], [], ["ABORT"]],
                    ["SET_CONTENT_VIEW", ["RES", "layout", "main_layout"]]
                ]
            },
            "Appearance": {
                background: "#111",
                foreground: "#fff",
                onCreate: [
                    ["SET_CONTENT_VIEW", ["RES", "layout", "appearance_layout"]],
                    // Launcher Columns
                    ["SET_VAR", "inpLauncherCols", ["GET_ELEM_BY_ID", "inpLauncherCols"]],
                    ["ADD_EVENT_LISTENER", ["GET_VAR", "inpLauncherCols"], "input", [
                        ["SET_CONFIGURATION_VALUE", "launcherColumns",
                            ["NUMBER",
                                ["ELEM_GET_VALUE", ["GET_VAR", "inpLauncherCols"]]
                            ]
                        ]
                    ]],
                    // Launcher Rows
                    ["SET_VAR", "inpLauncherRows", ["GET_ELEM_BY_ID", "inpLauncherRows"]],
                    ["ADD_EVENT_LISTENER", ["GET_VAR", "inpLauncherRows"], "input", [
                        ["SET_CONFIGURATION_VALUE", "launcherRows",
                            ["NUMBER",
                                ["ELEM_GET_VALUE", ["GET_VAR", "inpLauncherRows"]]
                            ]
                        ]
                    ]],
                    // Launcher Gap
                    ["SET_VAR", "inpLauncherGap", ["GET_ELEM_BY_ID", "inpLauncherGap"]],
                    ["ADD_EVENT_LISTENER", ["GET_VAR", "inpLauncherGap"], "input", [
                        ["SET_CONFIGURATION_VALUE", "launcherGap",
                            ["NUMBER",
                                ["ELEM_GET_VALUE", ["GET_VAR", "inpLauncherGap"]]
                            ]
                        ]
                    ]],
                    // Launcher Background Color
                    ["SET_VAR", "inpLauncherBackground", ["GET_ELEM_BY_ID", "inpLauncherBackground"]],
                    ["ADD_EVENT_LISTENER", ["GET_VAR", "inpLauncherBackground"], "change", [
                        ["SET_CONFIGURATION_VALUE", "launcherBackground",
                            ["ELEM_GET_VALUE", ["GET_VAR", "inpLauncherBackground"]]
                        ]
                    ]],
                    // Show App Names Switch
                    ["SET_VAR", "chkShowAppNames", ["GET_ELEM_BY_ID", "chkShowAppNames"]],
                    ["ADD_EVENT_LISTENER", ["GET_VAR", "chkShowAppNames"], "change", [
                        ["SET_CONFIGURATION_VALUE", "showAppNames",
                            ["BOOLEAN",
                                ["ELEM_IS_CHECKED", ["GET_VAR", "chkShowAppNames"]]
                            ]
                        ]
                    ]],
                    // StatusBar Height
                    ["SET_VAR", "inpStatusBarHeight", ["GET_ELEM_BY_ID", "inpStatusBarHeight"]],
                    ["ADD_EVENT_LISTENER", ["GET_VAR", "inpStatusBarHeight"], "input", [
                        ["SET_CONFIGURATION_VALUE", "statusBarHeight",
                            ["NUMBER",
                                ["ELEM_GET_VALUE", ["GET_VAR", "inpStatusBarHeight"]]
                            ]
                        ]
                    ]],
                    // NavigationBar Height
                    ["SET_VAR", "inpNavBarHeight", ["GET_ELEM_BY_ID", "inpNavBarHeight"]],
                    ["ADD_EVENT_LISTENER", ["GET_VAR", "inpNavBarHeight"], "input", [
                        ["SET_CONFIGURATION_VALUE", "navBarHeight",
                            ["NUMBER",
                                ["ELEM_GET_VALUE", ["GET_VAR", "inpNavBarHeight"]]
                            ]
                        ]
                    ]],
                    // Flip NavigationBar
                    ["SET_VAR", "chkFlipNavigationBar", ["GET_ELEM_BY_ID", "chkFlipNavigationBar"]],
                    ["ADD_EVENT_LISTENER", ["GET_VAR", "chkFlipNavigationBar"], "change", [
                        ["SET_CONFIGURATION_VALUE", "flipNavigationBar",
                            ["BOOLEAN",
                                ["ELEM_IS_CHECKED", ["GET_VAR", "chkFlipNavigationBar"]]
                            ]
                        ]
                    ]],
                    // StatusBar Background
                    ["SET_VAR", "inpStatusBarBg", ["GET_ELEM_BY_ID", "inpStatusBarBg"]],
                    ["ADD_EVENT_LISTENER", ["GET_VAR", "inpStatusBarBg"], "change", [
                        ["SET_STATUS_BAR_CONFIG", "background",
                            ["ELEM_GET_VALUE", ["GET_VAR", "inpStatusBarBg"]]
                        ]
                    ]],
                    // StatusBar Foreground
                    ["SET_VAR", "inpStatusBarFg", ["GET_ELEM_BY_ID", "inpStatusBarFg"]],
                    ["ADD_EVENT_LISTENER", ["GET_VAR", "inpStatusBarFg"], "change", [
                        ["SET_STATUS_BAR_CONFIG", "foreground",
                            ["ELEM_GET_VALUE", ["GET_VAR", "inpStatusBarFg"]]
                        ]
                    ]],
                    // NavigationBar Background
                    ["SET_VAR", "inpNavigationBarBg", ["GET_ELEM_BY_ID", "inpNavigationBarBg"]],
                    ["ADD_EVENT_LISTENER", ["GET_VAR", "inpNavigationBarBg"], "change", [
                        ["SET_NAVIGATION_BAR_CONFIG", "background",
                            ["ELEM_GET_VALUE", ["GET_VAR", "inpNavigationBarBg"]]
                        ]
                    ]],
                    // NavigationBar Foreground
                    ["SET_VAR", "inpNavigationBarFg", ["GET_ELEM_BY_ID", "inpNavigationBarFg"]],
                    ["ADD_EVENT_LISTENER", ["GET_VAR", "inpNavigationBarFg"], "change", [
                        ["SET_NAVIGATION_BAR_CONFIG", "foreground",
                            ["ELEM_GET_VALUE", ["GET_VAR", "inpNavigationBarFg"]]
                        ]
                    ]]
                ]
            },
            "ClockAndTime": {
                background: "#111",
                foreground: "#fff",
                onCreate: [
                    ["SET_CONTENT_VIEW", ["RES", "layout", "clock_and_time_layout"]],
                    // Show Seconds
                    ["SET_VAR", "chkTimeShowSeconds", ["GET_ELEM_BY_ID", "chkTimeShowSeconds"]],
                    ["ADD_EVENT_LISTENER", ["GET_VAR", "chkTimeShowSeconds"], "change", [
                        ["SET_CONFIGURATION_VALUE", "timeShowSeconds",
                            ["BOOLEAN",
                                ["ELEM_IS_CHECKED", ["GET_VAR", "chkTimeShowSeconds"]]
                            ]
                        ]
                    ]],
                    // 12-hour Mode
                    ["SET_VAR", "chkTime12hourMode", ["GET_ELEM_BY_ID", "chkTime12hourMode"]],
                    ["ADD_EVENT_LISTENER", ["GET_VAR", "chkTime12hourMode"], "change", [
                        ["SET_CONFIGURATION_VALUE", "time12hourMode",
                            ["BOOLEAN",
                                ["ELEM_IS_CHECKED", ["GET_VAR", "chkTime12hourMode"]]
                            ]
                        ]
                    ]],
                    // Reload Interval
                    ["SET_VAR", "inpTimeReloadIntervalMS", ["GET_ELEM_BY_ID", "inpTimeReloadIntervalMS"]],
                    ["ADD_EVENT_LISTENER", ["GET_VAR", "inpTimeReloadIntervalMS"], "input", [
                        ["SET_CONFIGURATION_VALUE", "timeReloadIntervalMS",
                            ["NUMBER",
                                ["ELEM_GET_VALUE", ["GET_VAR", "inpTimeReloadIntervalMS"]]
                            ]
                        ]
                    ]]
                ]
            },
            "Notifications": {
                background: "#111",
                foreground: "#fff",
                onCreate: [
                    ["SET_CONTENT_VIEW", ["RES", "layout", "notifications_layout"]],
                    ["SET_VAR", "inpDefaultNotificationSound", ["GET_ELEM_BY_ID", "inpDefaultNotificationSound"]],
                    ["ADD_EVENT_LISTENER", ["GET_VAR", "inpDefaultNotificationSound"], "input", [
                        ["SET_CONFIGURATION_VALUE", "defaultNotificationSound",
                            ["ELEM_GET_VALUE", ["GET_VAR", "inpDefaultNotificationSound"]]
                        ]
                    ]],
                    ["SET_VAR", "inpNotificationTopPopupTimeout", ["GET_ELEM_BY_ID", "inpNotificationTopPopupTimeout"]],
                    ["ADD_EVENT_LISTENER", ["GET_VAR", "inpNotificationTopPopupTimeout"], "input", [
                        ["SET_CONFIGURATION_VALUE", "notificationTopPopupTimeout",
                            ["NUMBER",
                                ["ELEM_GET_VALUE", ["GET_VAR", "inpNotificationTopPopupTimeout"]]
                            ]
                        ]
                    ]],
                    ["SET_VAR", "inpStatusBarMinSwipe", ["GET_ELEM_BY_ID", "inpStatusBarMinSwipe"]],
                    ["ADD_EVENT_LISTENER", ["GET_VAR", "inpStatusBarMinSwipe"], "input", [
                        ["SET_CONFIGURATION_VALUE", "statusBarMinSwipe",
                            ["NUMBER",
                                ["ELEM_GET_VALUE", ["GET_VAR", "inpStatusBarMinSwipe"]]
                            ]
                        ]
                    ]]
                ]
            },
            "PermissionsAndSecurity": {
                background: "#111",
                foreground: "#fff",
                onCreate: [
                    ["SET_CONTENT_VIEW", ["RES", "layout", "permissions_and_security_layout"]],
                    ["SET_VAR", "chkAutoGrantPermissions", ["GET_ELEM_BY_ID", "chkAutoGrantPermissions"]],
                    ["ADD_EVENT_LISTENER", ["GET_VAR", "chkAutoGrantPermissions"], "change", [
                        ["SET_CONFIGURATION_VALUE", "autoGrantPermissions",
                            ["BOOLEAN",
                                ["ELEM_IS_CHECKED", ["GET_VAR", "chkAutoGrantPermissions"]]
                            ]
                        ]
                    ]],
                    ["SET_VAR", "chkClearAppDataOnUninstall", ["GET_ELEM_BY_ID", "chkClearAppDataOnUninstall"]],
                    ["ADD_EVENT_LISTENER", ["GET_VAR", "chkClearAppDataOnUninstall"], "change", [
                        ["SET_CONFIGURATION_VALUE", "clearAppDataOnUninstall",
                            ["BOOLEAN",
                                ["ELEM_IS_CHECKED", ["GET_VAR", "chkClearAppDataOnUninstall"]]
                            ]
                        ]
                    ]],
                    ["SET_VAR", "chkRoot", ["GET_ELEM_BY_ID", "chkRoot"]],
                    ["ADD_EVENT_LISTENER", ["GET_VAR", "chkRoot"], "change", [
                        ["SET_CONFIGURATION_VALUE", "root",
                            ["BOOLEAN",
                                ["ELEM_IS_CHECKED", ["GET_VAR", "chkRoot"]]
                            ]
                        ]
                    ]],
                    ["SET_VAR", "chkRickRollBlocker", ["GET_ELEM_BY_ID", "chkRickRollBlocker"]],
                    ["ADD_EVENT_LISTENER", ["GET_VAR", "chkRickRollBlocker"], "change", [
                        ["SET_CONFIGURATION_VALUE", "rickRollBlocker",
                            ["BOOLEAN",
                                ["ELEM_IS_CHECKED", ["GET_VAR", "chkRickRollBlocker"]]
                            ]
                        ]
                    ]]
                ]
            }
        },
        
        services: {},
        providers: {},
        receivers: {},
        flags:["PRIV_APP"]
    });
}

if (!AppManager.getAppObj("com.notroid.gogle")){ // ! AQUÍ ! // TODO: Actualizar todas las apps
    AppManager.install({
        package: "com.notroid.gogle",
        name: "Gogle",
        icon: "https://placehold.co/150x150/EEEEEE/2266DD?text=G",
<<<<<<< HEAD
=======
        versionCode: 1,
        entry: "Searcher",
>>>>>>> d5d913d016ecff2f081a0e56ec61eebbadab4d19
        activities: {
            "Searcher":{
                background: "#eee",
                view: {type:"layout",class:["all-width","all-height","flex","justify-center","items-center","flex-column"],child:[
                    {type:"layout",margin:"0 0 10px 0",class:["all-width","flex","justify-center","items-center"],child:[
                        {type:"title",text:"G",fg:"#00f"},
                        {type:"title",text:"o",fg:"#f00"},
                        {type:"title",text:"g",fg:"#fa0"},
                        {type:"title",text:"l",fg:"#00f"},
                        {type:"title",text:"e",fg:"#0d0"},
                    ]},
                    {type:"layout",child:[
                        {type:"input",id:"inpSearch",value:"https://",placeholder:"https://..."},
                        {type:"button",text:"Buscar",onclick:[
                        ["SET_VAR", "search", ["TRIM", ["ID_GET_VALUE", "inpSearch"]]],
                        ["SET_VAR", "intentData", {}],
                        ["IF", ["NOT", ["GET_VAR", "search"]],
                            ["SHOW_TOAST", "Escribe algo weonaso"],
                            [["SET_AT", ["GET_VAR", "intentData"], "url", ["GET_VAR", "search"]],
                            ["LOG", "Buscando ${search}..."],
                            ["START_ACTIVITY", "Browser", ["GET_VAR", "intentData"]]]
                        ]
                        ]
                        }
                    ]}
                ]}
            },
            "Browser":{
                background: "#eee",
                onCreate: [
                    ["SET_VAR", "intentData", ["GET_INTENT_DATA"]],
                    ["IF", ["NOT", ["GET_VAR", "intentData"]], ["ABORT"]],
                    ["SET_VAR", "finalUrl", ["GET_AT", ["GET_VAR", "intentData"], "url"]]
                ],
                view: {type:"layout",class:["all-width","all-height"],child:[
                    {type:"layout",class:["all-width","flex","flex-row","justify-center"],child:[
                        {type:"layout",margin:"0 0 10px 0",class:["all-width","flex","justify-center","items-center"],child:[
                            {type:"title",text:"G",fg:"#00f"},
                            {type:"title",text:"o",fg:"#f00"},
                            {type:"title",text:"g",fg:"#fa0"},
                            {type:"title",text:"l",fg:"#00f"},
                            {type:"title",text:"e",fg:"#0d0"},
                        ]},
                        {type:"button",text:"Recargar",onclick:["ID_SET_SRC", "wv", ["GET_VAR", "finalUrl"]]}
                    ]},
                    {type:"webview",class:["all-width"],height:"90%",id:"wv"}
                ]}
            }
        },
        flags:["SYSTEM_APP"]
    });
}
