// permissionManager.js
const PermissionManager = {
    permissions: [
        "PERMISSION_MANAGE_EXTERNAL_APPS",       // Acceder a otras apps
        "PERMISSION_MANAGE_DIRECT_PERMISSIONS",  // Manejar permisos directamente sin confirmación
        "PERMISSION_POST_NOTIFICATIONS",         // Mandar notificaciones
        "PERMISSION_CHANGE_NOTIFICATIONS_STATE", // Modificar el estado de notificaciones
        "PERMISSION_INSTALL_APPS",               // Instalar apps
        "PERMISSION_DELETE_APPS",                // Desinstalar apps
        "PERMISSION_MANAGE_STATUS_BAR",          // Manejar la barra de estado
        "PERMISSION_READ_CONFIGURATIONS",        // Leer configuraciones
        "PERMISSION_WRITE_CONFIGURATIONS",       // Cambiar configuraciones
        "PERMISSION_GOOGLE_APROVEMENT",          // Para poder usar características Android JAJAJJAJ (en entorno Android, obvio)
    ],
    appPermissions: JSON.parse(localStorage.getItem(SystemConfig.getConfigValue("permissionManagerLocalStorage"))) || {}, // {"com.app": ["INTERNET", "CAMERA"]}

    _save(){
        if (SystemConfig.getConfigValue("useLocalStorage")){
            localStorage.setItem(SystemConfig.getConfigValue("permissionManagerLocalStorage"), JSON.stringify(this.appPermissions));
        }
    },

    // ["PACKAGE_GRANT_PERMISSION"] (P_MANAGE_EXTERNAL_APPS)(P_MANAGE_DIRECT_PERMISSIONS)
    grant(appPackage, permission){
        if (!this.appPermissions[appPackage]){
            this.appPermissions[appPackage] = [];
        }
        if (!this.appPermissions[appPackage].includes(permission)){
            this.appPermissions[appPackage].push(permission);
        }
        this._save();
    },
    // ["REVOKE_PERMISSION"]
    // ["PACKAGE_REVOKE_PERMISSION"] (P_MANAGE_EXTERNAL_APPS)(P_MANAGE_DIRECT_PERMISSIONS)
    revoke(appPackage, permission){
        if (this.appPermissions[appPackage]){
            this.appPermissions[appPackage] = this.appPermissions[appPackage].filter(p => p !== permission);
        }
        this._save();
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