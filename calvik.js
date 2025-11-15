// calvik.js
const Calvik = {
    execute(appPackage, activityName, instructions){
        console.log(`[EXEC][${appPackage}][${activityName}] ${instructions}`);

        // GoogleMode: Verificar que el "contexto" sea válido jeje
        if (!verifyAppActivity(appPackage, activityName)) return false;

        if (!instructions) return instructions;
        // ¿LA INSTRUCCIÓN ES UNA CADENA, OBJETO LITERAL O NUMERO? => DEVUELVE VALOR DIRECTO (seguramente fue llamado de otra instrucción)
        if (isString(instructions) || isObject(instructions) || isNumber(instructions) || isBoolean(instructions) || isCalvikArray()){
            console.log(`[DIRECT_VALUE]`)
            return isString(instructions) ? Variables.resolveString(instructions, appPackage, activityName) : instructions;
        }
        // Para instrucciones vacias []
        if (instructions.length === 0) return;
        const [op, ...args] = instructions;
        // ¿EL OPERADOR ES ARRAY? => SECUENCIA DE INSTRUCCIONES
        if (Array.isArray(op)){
            for (const inst of instructions){
                this.execute(appPackage, activityName, inst);
            }
            return;
        }
        // TODA OPERACIÓN O VALOR SIEMPRE SERÁ TRATADO COMO EXPRESIÓN
        const ex = (ins) => this.execute(appPackage, activityName, ins); // Anidar expresiones ✨✅
        // SIEMPRE PASAR EL PACKAGE AL EJECUTAR PORFAVOR
        const opPerm = this.opcodePermissions[op]
        if (opPerm){
            if (!opPerm.every(perm => PermissionManager.hasPermission(appPackage, perm))){
                console.warn(`[PERMISSION DENIED][${appPackage}][${activityName}][${op}]: ${opPerm.join(", ")}`);
                return false;
            }
        }
        switch (op){ // ! ¿CUANTOS OPCODES SON!???? proximamente división de opcodes al estilo Google (`import notroid.widget.SHOW_TOAST` JAJAJJAJA)
            // === Code Utils === //
            case "UPPER":
                return ex(args[0]).toUpperCase();
            case "LOWER":
                return ex(args[0]).toLowerCase();
            case "TRIM":
                return ex(args[0]).trim();
            case "STRING":
                return String(ex(args[0]));
            case "NUMBER":
                return Number(ex(args[0]));
            case "BOOLEAN":
                return Boolean(ex(args[0]));
            case "ARRAY":
                return new CalvikArray(...args.map(arg=> ex(arg)));
            case "JSON_PARSE": // Seguramente solo para instalar apps y añadir elementos mediante cadenas
                const r = JSON.parse(ex(args[0]));
                return Array.isArray(r) ? CalvikArray.fromArray(r) : r;
            case "JSON_STRINGIFY":
                return JSON.stringify(ex(args[0]));
            case "OBJECT_KEYS":
                return Object.keys(ex(args[0]));
            case "OBJECT_VALUES":
                return Object.values(ex(args[0]));
            case "LENGTH":
                return ex(args[0]).length;
            case "RELOAD_NOTROID":
                return location.reload();
            
            case "JOIN":
                return ex(args[0]).join(ex(args[1]));
            case "PUSH":
                return ex(args[0]).push(ex(args[1]));
            case "POP":
                return ex(args[0]).pop();
            case "SHIFT":
                return ex(args[0]).shift();
            case "SET_AT":
                return ex(args[0])[ex(args[1])] = ex(args[2]);
            case "GET_AT":
                return ex(args[0])[ex(args[1])];
            
            case "EQ":
                return ex(args[0]) === ex(args[1]);
            case "NEQ":
                return ex(args[0]) !== ex(args[1]);
            case "GT":
                return ex(args[0]) > ex(args[1]);
            case "LT":
                return ex(args[0]) < ex(args[1]);
            case "GTE":
                return ex(args[0]) >= ex(args[1]);
            case "LTE":
                return ex(args[0]) <= ex(args[1]);
            
            case "NOT":
                return !ex(args[0]);
            case "AND":
                return ex(args[0]) && ex(args[1]);
            case "OR":
                return ex(args[0]) || ex(args[1]);
            // === Variables === //
            case "SET_VAR":
                return Variables.set(appPackage, activityName, args[0], ex(args[1]));
            case "GET_VAR":
                return Variables.get(appPackage, activityName, args[0]);
            case "DEL_VAR":
                return Variables.del(appPackage, activityName, args[0]);
            // === Funciones === //
            case "CALL":
                return Functions.run(appPackage, args[0]);
            // === Math === //
            case "ADD":
                return ex(args[0]) + ex(args[1]);
            case "SUB":
                return ex(args[0]) - ex(args[1]);
            case "MUL":
                return ex(args[0]) * ex(args[1]);
            case "DIV":
                const a = ex(args[0]);
                const b = ex(args[1]);
                if (b === 0) return RickRoll.launch();
                return a / b;
            case "RANDOM":
                return randint(ex(args[0]), ex(args[1]));
            // === Basic === //
            case "LOG":
                return console.log(...args.map(arg => ex(arg)));
            case "ALERT":
                return alert(ex(args[0]));
            case "PROMPT":
                return prompt(ex(args[0]), ex(args[1]));
            case "CONFIRM":
                return confirm(ex(args[0]));
            case "RICK_ROLL":
                return RickRoll.launch();
            // === Control de flujo === //
            case "IF":
                const [conditionIf, trueCase, falseCase] = args;
                conditionResult = ex(conditionIf);
                return ex(conditionResult ? trueCase : falseCase);
            case "WHILE":
                const [conditionWhile, bodyWhile] = args;
                while (ex(conditionWhile)) {
                    try {
                        ex(bodyWhile);
                    } catch (e){
                        if (e instanceof CalvikBreak) break;
                        throw e;
                    }
                }
                return true;
            case "FOR":
                const [init, conditionFor, update, bodyFor] = args;
                for (ex(init); ex(conditionFor); ex(update)){
                    try {
                        ex(bodyFor);
                    } catch (e){
                        if (e instanceof CalvikBreak) break;
                        throw e;
                    }
                }
                return true;
            case "FOR_EACH":
                const [iterable, varName, bodyForEach] = args;
                for (const value of ex(iterable)){
                    Variables.set(appPackage, activityName, varName, value);
                    try {
                        ex(bodyForEach);
                    } catch (e){
                        if (e instanceof CalvikBreak) break;
                        throw e;
                    }
                }

                return true;
            case "BREAK":
                throw new CalvikBreak();
            case "RETURN":
                throw new CalvikReturn(ex(args[0]));
            case "ABORT":
                throw new CalvikAbort();
            // === System APIs (lo mejor) === //
            // ToastManager
            case "SHOW_TOAST":
                return ToastManager.show(ex(args[0]));
            // ActivityManager
            case "START_ACTIVITY":
                return ActivityManager.startActivity(appPackage, args[0], ex(args[1]));
            case "FINISH_ACTIVITY":
                return ActivityManager.finishActivity(appPackage, activityName);
            case "GET_INTENT_DATA":
                return Variables.get(appPackage, activityName, "__intent_data__") || {};
            case "ID_CLICK":
                return ActivityManager.idClick(appPackage, activityName, args[0]);
            case "ID_SET_TEXT":
                return ActivityManager.idSetText(appPackage, activityName, args[0], ex(args[1]));
            case "ID_GET_TEXT":
                return ActivityManager.idGetText(appPackage, activityName, args[0]);
            case "ID_SET_VALUE":
                return ActivityManager.idSetValue(appPackage, activityName, args[0], ex(args[1]));
            case "ID_GET_VALUE":
                return ActivityManager.idGetValue(appPackage, activityName, args[0]);
            case "ID_SET_CHECKED":
                return ActivityManager.idSetChecked(appPackage, activityName, args[0], ex(args[1]));
            case "ID_IS_CHECKED":
                return ActivityManager.idIsChecked(appPackage, activityName, args[0]);
            case "ID_ADD_CLASS":
                return ActivityManager.idAddClass(appPackage, activityName, args[0], ex(args[1]));
            case "ID_REMOVE_CLASS":
                return ActivityManager.idRemoveClass(appPackage, activityName, args[0], ex(args[1]));
            case "ID_APPEND_CHILD":
                return ActivityManager.idAppendChild(appPackage, activityName, args[0], ex(args[1]));
            case "ID_CLEAR_CHILDS":
                return ActivityManager.idClearChilds(appPackage, activityName, args[0]);
            case "ID_SET_SRC":
                return ActivityManager.idSetSrc(appPackage, activityName, args[0], ex(args[1]));
            // AlertDialog
            case "SHOW_ALERT":
                // ! No sirve w, solamente sirve para ocupar la pantalla porq la ejecución sigue, mejor usen ["ALERT"] 🥀
                return AlertDialog.alert(appPackage, ex(args[0]), ex(args[1]), ex(args[2]), args[3]);
            // AppManager (app malintencionada + INSTALL + LAUNCH sin consentimiento = primer virus de Notroid)
            case "INSTALL_APP":
                return AppManager.install(ex(args[0]));
            case "UNINSTALL_APP":
                return AppManager.uninstall(ex(args[0]));
            case "LAUNCH_APP":
                return AppManager.launch(ex(args[0]));
            // FileSystem
            case "FS_LIST_DIR":
                return FileSystem.listDir(appPackage, ex(args[0]));
            case "FS_IS_FILE":
                return FileSystem.isFile(appPackage, ex(args[0]));
            case "FS_IS_DIR":
                return FileSystem.isDir(appPackage, ex(args[0]));
            // LocalStorage:
            case "SET_LOCAL":
                return LocalStorage.set(appPackage, activityName, args[0], ex(args[1]));
            case "GET_LOCAL":
                return LocalStorage.get(appPackage, activityName, args[0]);
            case "DEL_LOCAL":
                return LocalStorage.del(appPackage, activityName, args[0]);
            case "CLEAR_ALL_LOCAL_DATA":
                return LocalStorage.clearAll(appPackage, activityName);
            // NavigationBarManager
            case "GET_NAVIGATION_BAR_CONFIG":
                return NavigationBarManager.getConfigValue(ex(args[0]));
            case "SET_NAVIGATION_BAR_CONFIG":
                return NavigationBarManager.setConfigValue(ex(args[0]), ex(args[1]));
            // NotificationManager
            case "SEND_NOTIFICATION":
                return NotificationManager.notify(appPackage, ex(args[0]), ex(args[1]));
            case "GET_NOTIFICATION_STATE":
                return NotificationManager.getState();
            case "SET_NOTIFICATION_STATE":
                return NotificationManager.setState(ex(args[0]));
            // PermissionManager
            case "PACKAGE_GRANT_PERMISSION":
                return PermissionManager.grant(ex(args[0]), ex(args[1]));
            case "REVOKE_PERMISSION":
                return PermissionManager.revoke(appPackage, ex(args[0]));
            case "PACKAGE_REVOKE_PERMISSION":
                return PermissionManager.revoke(ex(args[0]), ex(args[1]));
            case "HAS_PERMISSION":
                return PermissionManager.hasPermission(appPackage, ex(args[0]));
            case "PACKAGE_HAS_PERMISSION":
                return PermissionManager.hasPermission(ex(args[0]), ex(args[1]));
            case "REQUEST_PERMISSION":
                return PermissionManager.requestPermission(appPackage, ex(args[0]));
            // StatusBarManager
            case "SHOW_STATUS_ICON":
                return StatusBarManager.showStatIcon(ex(args[0]));
            case "HIDE_STATUS_ICON":
                return StatusBarManager.hideStatIcon(ex(args[0]));
            case "TOGGLE_NOTIFICATIONS_PANEL":
                return StatusBarManager.toggleNotificationsPanel();
            case "GET_STATUS_BAR_CONFIG":
                return StatusBarManager.getConfigValue(ex(args[0]));
            case "SET_STATUS_BAR_CONFIG":
                return StatusBarManager.setConfigValue(ex(args[0]), ex(args[1]));
            // SystemConfig
            case "SET_CONFIGURATION_VALUE":
                return SystemConfig.setConfigValue(ex(args[0]), ex(args[1]));
            case "GET_CONFIGURATION_VALUE":
                return SystemConfig.getConfigValue(ex(args[0]));
            // AndroidBridge (hermano, que hago con mi vida?🥀)
            case "VERIFY_ENTORN":
                const target = ex(args[0]);
                if (target === "android") return isAndroidEntorn();
                return false;
            case "ANDROID_SHOW_TOAST":
                if (SystemConfig.getConfigValue("androidSafeMode") && !isAndroidEntorn()) ToastManager.show(ex(args[0]));
                return AndroidBridge.showToast(ex(args[0]));
            case "ANDROID_VIBRATE":
                if (SystemConfig.getConfigValue("androidSafeMode") && !isAndroidEntorn()) ToastManager.show(`📳 Vibrando a ${ex(args[0])} ms`);
                return AndroidBridge.vibrate(ex(args[0]));
            case "ANDROID_HAS_PERMISSION":
                return AndroidBridge.hasPermission(ex(args[0]));
            case "ANDROID_REQUEST_PERMISSION":
                return AndroidBridge.requestPermission(ex(args[0]));
            case "ANDROID_GET_LAST_PERMISSION_RESULT":
                return AndroidBridge.getLastPermissionResult();
            case "ANDROID_SEND_NOTIFICATION":
                return AndroidBridge.sendNotification(ex(args[0]), ex(args[1]));
            case "ANDROID_FINISH_ACTIVITY":
                return AndroidBridge.finishActivity();
            // === Default === //
            default:
                throw new Error(`CALVIK ERROR: Unknown opcode: ${op}`);
        }
    },
    opcodePermissions: {
        // ToastManager
        "SHOW_TOAST": [],
        // ActivityManager
        "START_ACTIVITY": [],
        "FINISH_ACTIVITY": [],
        "ID_SET_TEXT": [],
        "ID_GET_TEXT": [],
        "ID_SET_VALUE": [],
        "ID_GET_VALUE": [],
        "ID_SET_CHECKED": [],
        "ID_IS_CHECKED": [],
        "ID_ADD_CLASS": [],
        "ID_REMOVE_CLASS": [],
        // AlertDialog
        "SHOW_ALERT": [],
        // AppManager
        "INSTALL_APP": ["PERMISSION_MANAGE_EXTERNAL_APPS", "PERMISSION_INSTALL_APPS"],
        "UNINSTALL_APP": ["PERMISSION_MANAGE_EXTERNAL_APPS", "PERMISSION_DELETE_APPS"],
        "LAUNCH_APP": ["PERMISSION_MANAGE_EXTERNAL_APPS"],
        // FileSystem
        "FS_LIST_DIR": ["PERMISSION_READ_EXTERNAL_STORAGE"],
        // LocalStorage
        "SET_LOCAL": ["PERMISSION_LOCAL_STORAGE"],
        "GET_LOCAL": ["PERMISSION_LOCAL_STORAGE"],
        "DEL_LOCAL": ["PERMISSION_LOCAL_STORAGE"],
        "CLEAR_ALL_LOCAL_DATA": ["PERMISSION_LOCAL_STORAGE", "PERMISSION_CLEAR_ALL_LOCAL_DATA"],
        // NavigationBarManager
        "GET_STATUS_BAR_CONFIG": [],
        "SET_STATUS_BAR_CONFIG": ["PERMISSION_MANAGE_NAVIGATION_BAR"],
        // NotificationManager
        "SEND_NOTIFICATION": ["PERMISSION_POST_NOTIFICATIONS"],
        "GET_NOTIFICATION_STATE": ["PERMISSION_MANAGE_NOTIFICATIONS_STATE"],
        "SET_NOTIFICATION_STATE": ["PERMISSION_MANAGE_NOTIFICATIONS_STATE"],
        // PermissionManager
        "PACKAGE_GRANT_PERMISSION": ["PERMISSION_MANAGE_EXTERNAL_APPS", "PERMISSION_MANAGE_DIRECT_PERMISSIONS"],
        "REVOKE_PERMISSION": [],
        "PACKAGE_REVOKE_PERMISSION": ["PERMISSION_MANAGE_EXTERNAL_APPS", "PERMISSION_MANAGE_DIRECT_PERMISSIONS"],
        "HAS_PERMISSION": [],
        "PACKAGE_HAS_PERMISSION": ["PERMISSION_MANAGE_EXTERNAL_APPS", "PERMISSION_MANAGE_DIRECT_PERMISSIONS"],
        "REQUEST_PERMISSION": [],
        // StatusBarManager
        "SHOW_STATUS_ICON": ["PERMISSION_MANAGE_STATUS_BAR"],
        "HIDE_STATUS_ICON": ["PERMISSION_MANAGE_STATUS_BAR"],
        "TOGGLE_NOTIFICATIONS_PANEL": ["PERMISSION_MANAGE_STATUS_BAR"],
        "GET_STATUS_BAR_CONFIG": [],
        "SET_STATUS_BAR_CONFIG": ["PERMISSION_MANAGE_STATUS_BAR"],
        // SystemConfig
        "GET_CONFIGURATION_VALUE": ["PERMISSION_READ_CONFIGURATIONS"],
        "SET_CONFIGURATION_VALUE": ["PERMISSION_WRITE_CONFIGURATIONS"],
        // AndroidBridge
        "VERIFY_ENTORN": [],
        "ANDROID_SHOW_TOAST": ["PERMISSION_GOOGLE_APROVEMENT"],
        "ANDROID_VIBRATE": ["PERMISSION_GOOGLE_APROVEMENT"], // [android.permission.VIBRATE]
        "ANDROID_HAS_PERMISSION": ["PERMISSION_GOOGLE_APROVEMENT"],
        "ANDROID_REQUEST_PERMISSION": ["PERMISSION_GOOGLE_APROVEMENT"],
        "ANDROID_GET_LAST_PERMISSION_RESULT": ["PERMISSION_GOOGLE_APROVEMENT"],
        "ANDROID_SEND_NOTIFICATION": ["PERMISSION_GOOGLE_APROVEMENT"],
        "ANDROID_FINISH_ACTIVITY": ["PERMISSION_GOOGLE_APROVEMENT"],
    },
}