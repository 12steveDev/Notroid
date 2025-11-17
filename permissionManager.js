// permissionManager.js
const PermissionManager = {
    permissions: [ // [permName, permLevel]
        ["PERMISSION_MANAGE_EXTERNAL_APPS",       4], // Acceder a otras apps
        ["PERMISSION_MANAGE_DIRECT_PERMISSIONS",  4], // Manejar permisos directamente sin confirmación
        ["PERMISSION_POST_NOTIFICATIONS",         1], // Mandar notificaciones
        ["PERMISSION_CHANGE_NOTIFICATIONS_STATE", 3], // Modificar el estado de notificaciones
        ["PERMISSION_INSTALL_APPS",               4], // Instalar apps
        ["PERMISSION_DELETE_APPS",                4], // Desinstalar apps
        ["PERMISSION_MANAGE_STATUS_BAR",          3], // Manejar la barra de estado
        ["PERMISSION_READ_CONFIGURATIONS",        1], // Leer configuraciones
        ["PERMISSION_WRITE_CONFIGURATIONS",       4], // Cambiar configuraciones
        ["PERMISSION_GOOGLE_APROVEMENT",          3], // Para poder usar características Android JAJAJJAJ (en entorno Android, obvio)
        ["PERMISSION_REBOOT",                     4], // Recargar la página XDDD
        ["PERMISSION_VIBRATE",                    0], // Vibrar si es entorno Android
        ["PERMISSION_READ_EXTERNAL_STORAGE",      1], // Leer archivos
        ["PERMISSION_WRITE_EXTERNAL_STORAGE",     1], // Escribir archivos
    ],
    appPermissions: {}, // cache de permisos // {"com.app": ["INTERNET", "CAMERA"]}

    isNormalPermission(permName){
        return this.permissions.some(perm => perm[0] === permName && perm[1] === 0);
    },
    isDangerousPermission(permName){
        return this.permissions.some(perm => perm[0] === permName && perm[1] === 1);
    },
    isSignaturePermission(permName){
        return this.permissions.some(perm => perm[0] === permName && perm[1] === 3);
    },
    isPrivilegedPermission(permName){
        return this.permissions.some(perm => perm[0] === permName && perm[1] === 4);
    },

    _refreshFromFS(){
        console.groupCollapsed(`[PermissionManager][refreshFromFS]`);
        this.appPermissions = {};
        const data = FileSystem.readFile("", "/data/system/packages.xml");
        let json;
        try {
            json = JSON.parse(data);
        } catch {
            json = { packages: {} };
        }
        for (const appInfo of Object.values(json.packages)){
            this.appPermissions[appInfo.package] = [];
            for (const perm of appInfo.permissions){
                if (perm.granted) this.appPermissions[appInfo.package].push(perm.name);
            }
        }
        console.groupEnd();
    },

    // ["PACKAGE_GRANT_PERMISSION"] (P_MANAGE_EXTERNAL_APPS)(P_MANAGE_DIRECT_PERMISSIONS)
    grant(appPackage, permission){
        // TODO Migrar esto hacia FS
        // if (!this.appPermissions[appPackage]){
        //     this.appPermissions[appPackage] = [];
        // }
        // if (!this.appPermissions[appPackage].includes(permission)){
        //     this.appPermissions[appPackage].push(permission);
        // }

        const pkgF = "/data/system/packages.xml";
        // Leer packages.xml existente (si existe)
        let data = FileSystem.readFile("", pkgF);
        let json;
        try {
            json = JSON.parse(data);
        } catch {
            json = { packages: {} };
        }
        json.packages[appPackage].permissions.push({name: permission, granted: true})
        FileSystem.writeFile("", pkgF, JSON.stringify(json));
        this._refreshFromFS();
    },
    // ["REVOKE_PERMISSION"]
    // ["PACKAGE_REVOKE_PERMISSION"] (P_MANAGE_EXTERNAL_APPS)(P_MANAGE_DIRECT_PERMISSIONS)
    revoke(appPackage, permission){
        if (this.appPermissions[appPackage]){
            this.appPermissions[appPackage] = this.appPermissions[appPackage].filter(p => p !== permission);
        }
        this._refreshFromFS();
    },
    // ["HAS_PERMISSION"]
    // ["PACKAGE_HAS_PERMISSION"] (P_MANAGE_EXTERNAL_APPS)(P_MANAGE_DIRECT_PERMISSIONS)
    hasPermission(appPackage, permission){
        return this.appPermissions[appPackage]?.includes(permission) || false;
    },
    // ["REQUEST_PERMISSION"]
    requestPermission(appPackage, permission){
        if (this.hasPermission(appPackage, permission)){
            return true;
        }
        if (SystemConfig.getConfigValue("autoGrantPermissions") || confirm(`La app '${AppManager.getAppObj(appPackage).name}' solicita el permiso:\n${permission}.\n¿Desea permitir?`)){
            this.grant(appPackage, permission);
            return true;
        } else {
            return false;
        }
    }
}