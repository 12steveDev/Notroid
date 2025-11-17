// priv-app.js
if (!AppManager.getAppObj("com.notroid.settings")){
    AppManager.install({
        package: "com.notroid.settings",
        name: "Ajustes",
        permissions:["PERMISSION_READ_CONFIGURATIONS", "PERMISSION_WRITE_CONFIGURATIONS"],
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
        },
        flags:["PRIV_APP"]
    });
}
if (!AppManager.getAppObj("com.notroid.gogle")){
    AppManager.install({
        package: "com.notroid.gogle",
        name: "Gogle",
        icon: "https://placehold.co/150x150/EEEEEE/2266DD?text=G",
        entry: "Searcher",
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
