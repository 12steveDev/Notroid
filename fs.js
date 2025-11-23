// fs.js
class FOLDER {
    constructor(name, items={}){
        this.name = name;
        this.items = items; // {name: item}
        this.type = "folder";
    }
    listItems(){
        return Object.keys(this.items);
    }
    getItem(name){
        return this.items[name];
    }
    addItem(item){
        this.items[item.name] = item;
        return item;
    }
    removeItem(name){
        delete this.items[name];
    }
    toJSON(){
        return {
            name: this.name,
            type: "folder",
            items: this.items
        }
    }
}
class FILE {
    constructor(name, content=""){
        this.name = name;
        this.content = content;
        this.type = "file"
    }
    readFile(){
        return this.content;
    }
    writeFile(content){
        this.content = content;
    }
    appendFile(content){
        this.content += content;
    }
    toJSON(){
        return {
            name: this.name,
            type: "file",
            content: this.content
        }
    }
}
const FileSystem = { // TODO: Borrar y hacer todo denuevo
    fs: null,
    _baseStorageKey: "notroid_fs_v1",
    init(){
        const saved = localStorage.getItem(this._baseStorageKey);
        if (saved){
            this.fs = this._deserialize(JSON.parse(saved));
        } else {
            this.fs = this._createDefaultFS();
            this._save();
        }
        return this.fs;
    },
    _createDefaultFS(){
        const root = new FOLDER("N:");

        // system/
        const system = new FOLDER("system");
        const systemFramework = new FOLDER("framework");
        [
            "activity-manager.js",
            "alert-dialog-js",
            "app-manager.js",
            "calvik.js",
            "fs.js",
            "navigation-bar-manager.js",
            "notification-manager.js",
            "permission-manager.js",
            "status-bar-manager.js",
            "system-config.js",
            "toast-manager.js",
            "variables.js"
        ].forEach(f => systemFramework.addItem(new FILE(f, "binary content...")));
        const systemEtc = new FOLDER("etc");
        systemEtc.addItem(new FILE("init.clvk", '["SHOW_TOAST", "Tiembla google..."]'));
        const systemBin = new FOLDER("bin");
        ["sh","dogcat","pm"].forEach(f => systemBin.addItem(new FILE(f, "NotroidSystem.doSomething()")));
        const systemLib = new FOLDER("lib");
        ["libgraphics.sys","libaudio.sys","libcrypto.sys"].forEach(f => systemLib.addItem(new FILE(f, "NotroidHardware.doSomething()")));
        const systemMedia = new FOLDER("media");
        ["bootanimation.sip","shutdownanimation.sip"].forEach(f => systemMedia.addItem(new FILE(f)));
        systemMedia.addItem(new FOLDER("audio"));
        system.addItem(systemFramework);
        system.addItem(new FOLDER("priv-app"));
        system.addItem(new FOLDER("app"));
        system.addItem(systemEtc);
        system.addItem(systemBin);
        system.addItem(systemLib);
        system.addItem(systemMedia);
        root.addItem(system);

        // product/ y vendor/ para hacer sentir poderosa la ruta raíz de tantos directorios (las apariencias engañan lit)
        ["product", "vendor"].forEach(f => {
            const p = new FOLDER(f);
            p.addItem(new FOLDER("app"));
            p.addItem(new FOLDER("firmware"));
            p.addItem(new FOLDER("lib"));
            p.addItem(new FOLDER("overlays"));
            root.addItem(p);
        });

        // data/
        const data = new FOLDER("data");
        const dataData = new FOLDER("data"); // llegó papi 😭🔥
        const dataSystem = new FOLDER("system");
        ["locksettings.ndb","packages.xml","settings_system.conf","accounts.db"].forEach(f => dataSystem.addItem(new FILE(f)));
        dataSystem.addItem(new FOLDER("wallpaper"));
        data.addItem(new FOLDER("app"));
        data.addItem(dataSystem);
        data.addItem(dataData);
        root.addItem(data);

        // proc/
        const proc = new FOLDER("proc");
        proc.addItem(new FILE("cpuinfo", "Nombre: Raizen\nApellido: we, es una página, ¿qué tipo de cpu crees que tiene Notroid???"));
        proc.addItem(new FILE("raminfo", "Nombre: DDR12\nApellido: we, es una página, ¿qué tipo de ram crees que tiene Notroid???"));
        proc.addItem(new FOLDER("we", {"we": new FILE("we", "we")})); // we
        root.addItem(proc)

        // sys
        const sys = new FOLDER("sys");
        ["devices","fs","class","block","bus","dev"].forEach(f => sys.addItem(new FOLDER(f)));
        root.addItem(sys);

        // storage/emulated/0/
        const storage = new FOLDER("storage");
        const emulated = new FOLDER("emulated");
        const zero = new FOLDER("12"); // jeje, algo de crédito debo de tener, ¿no? (att: 12steve)
        const sezNotroid = new FOLDER("Notroid");
        ["Download", "Pictures", "Music","DCIM"].forEach(f => zero.addItem(new FOLDER(f)));
        sezNotroid.addItem(new FOLDER("data"));
        zero.addItem(sezNotroid);
        emulated.addItem(zero);
        storage.addItem(emulated);
        root.addItem(storage);

        root.addItem(new FILE("README.txt", "deje la sapada bro, aquí no es su workspace\n - att: 12steve"));

        return root;
    },
    _deserialize(obj){
        if (obj.type === "folder"){
            const folder = new FOLDER(obj.name);
            for (const [name, itemObj] of Object.entries(obj.items)){
                folder.addItem(this._deserialize(itemObj));
            }
            return folder;
        } else if (obj.type === "file"){
            return new FILE(obj.name, obj.content);
        }
    },
    _serialize(item){
        return item.toJSON();
    },
    _save(){
        localStorage.setItem(this._baseStorageKey, JSON.stringify(this._serialize(this.fs)));
    },
    _resolvePath(appPackage, path){
        // Si usas este ya no uses _getParentAndName
        if (!path || path === "/") return "/";
        // Rutas absolutas
        if (path.startsWith("/")) return path;
        // Rutas relativas al directorio de la app
        if (path.startsWith("./")) return `/data/data/${appPackage}/files/${path.slice(2)}`;
        // Rutas relativas al directorio actual de la app
        return `/data/data/${appPackage}/files/${path}`;
    },
    _getParentAndName(appPackage, path){
        // Si usas este ya no uses _resolvePath
        path = this._resolvePath(appPackage, path);
        const parts = path.split("/").filter(p=>p);
        const newDir = parts.pop();
        const parentPath = parts.join("/");
        return [this._goTo("", "/"+parentPath), newDir];
    },
    _goTo(appPackage, path){
        // Navega a una ruta
        // Solamente se encarga de devolver lo que haya
        // Si no existe un elemento da error
        // Si intenta navegar dentro de un archivo da error
        // console.log(`[FS][goTo] ${appPackage} | ${path}`);
        path = this._resolvePath(appPackage, path);
        const parts = path.split("/").filter(p=>p);
        let curr = this.fs;
        for (const [i, part] of parts.entries()){ // para obtener el índice actual
            // actual es un archivo y falta una iteración?? 
            if (curr.type !== "folder"){
                console.warn(`'${curr.name}' no es una carpeta`);
                return false;
            }
            curr = curr.getItem(part);
            // actual no existe??
            if (!curr){
                console.warn((i === parts.length - 1 ? "La carpeta o archivo" : "La carpeta") + ` '${part}' no existe`);
                return false;
            }
        }
        return curr;
    },
    _updatePackagesXML(appObj, apkPath, uid1, uid2){
        const pkgF = "/data/system/packages.xml";
        // Leer packages.xml existente (si existe)
        let data = this.readFile("", pkgF);
        let json;
        try {
            json = JSON.parse(data);
        } catch {
            json = { packages: {} };
        }
        // Actualizar info de la app
        const permissions = [];
        if (appObj.permissions){
            for (const perm of appObj.permissions){
                permissions.push({name: perm, granted: PermissionManager.isNormalPermission(perm)});
            }
        }
        const flags = [];
        if (appObj.flags){
            if (AppManager.isSystemApp(appObj)) flags.push("system-app");
            if (AppManager.isPrivApp(appObj)) flags.push("priv-app");
        }
        json.packages[appObj.package] = { // Hermano, ¿Google no quiere que veamos esto?
            name: appObj.name,
            package: appObj.package,
            apkPath: apkPath, // ya debería venir con el nombre del archivo .npk
            uid1: uid1,
            uid2: uid2,
            permissions: permissions,
            flags: flags,
        };
        this.writeFile("", pkgF, JSON.stringify(json));
    },
    printTree(item = null, indent = 0, print = true, tree = null){
        if (tree === null) tree = []; // usar siempre el mismo array
    
        if (item === null) item = this.fs;
    
        const spaces = "    ".repeat(indent);
        tree.push(
            spaces +
            (item.type === "folder" ? "📂 " : "📄 ") +
            item.name +
            (item.type === "folder" ? "/" : "")
        );
    
        if (item.type === "folder"){
            for (const childName of item.listItems()){
                this.printTree(
                    item.getItem(childName),
                    indent + 1,
                    false,
                    tree // seguir usando el mismo array
                );
            }
        }
    
        if (print) console.log(tree.join("\n"));
    },
    isFile(appPackage, path){
        const f = this._goTo(appPackage, path);
        if (!f) return false;
        return f.type === "file";
    },
    isDir(appPackage, path){
        const f = this._goTo(appPackage, path);
        if (!f) return false;
        return f.type === "folder";
    },
    listDir(appPackage, path){
        console.log(`[FS][listDir] ${appPackage} | ${path}`);
        const f = this._goTo(appPackage, path);
        if (!f) return false; // Ya _goTo() imprime el warning
        if (f.type !== "folder"){
            console.warn(`'${f.name}' no es una carpeta`);
            return false;
        }
        return CalvikArray.fromArray(f.listItems());
    },
    createDir(appPackage, path){
        console.log(`[FS][createDir] ${appPackage} | ${path}`);
        const [p, f] = this._getParentAndName(appPackage, path);
        if (!p) return false;
        if (p.type !== "folder"){
            console.warn(`'${p.name}' no es una carpeta`);
            return false;
        }

        if (p.getItem(f)){
            console.warn(`La carpeta (o archivo) '${f}' ya existe.`);
            return false;
        }
        p.addItem(new FOLDER(f));
        this._save();
        return true;
    },
    createDirs(appPackage, path){
        console.log(`[FS][createDirs] ${appPackage} | ${path}`);
        path = this._resolvePath(appPackage, path);
        const parts = path.split("/").filter(p=>p);
        let curr = this.fs;
        for (const part of parts){
            if (curr.type !== "folder"){
                console.warn(`'${curr.name}' no es una carpeta`);
                return false;
            }
            if (!curr.getItem(part)){
                curr.addItem(new FOLDER(part));
            }
            curr = curr.getItem(part);
        }
        this._save();
        return true;
    },
    createFile(appPackage, path){
        console.log(`[FS][createFile] ${appPackage} | ${path}`);
        const [p, f] = this._getParentAndName(appPackage, path);
        if (!p) return false;
        if (p.type !== "folder"){
            console.warn(`'${p.name}' no es una carpeta`);
            return false;
        }

        if (p.getItem(f)){
            console.warn(`El archivo (o carpeta) '${f}' ya existe.`);
            return false;
        }
        p.addItem(new FILE(f));
        this._save();
        return true;
    },
    readFile(appPackage, path){
        console.log(`[FS][readFile] ${appPackage} | ${path}`);
        const f = this._goTo(appPackage, path);
        if (!f) return false;
        if (f.type !== "file"){
            console.warn(`'${f.name}' no es un archivo`);
            return false;
        }
        return f.readFile();
    },
    writeFile(appPackage, path, content){
        console.log(`[FS][writeFile] ${appPackage} | ${path} | ${content.slice(0, 50)}${content.length > 50 ? "..." : ""}`);
        const f = this._goTo(appPackage, path);
        if (!f) return false;
        if (f.type !== "file"){
            console.warn(`'${f.name}' no es un archivo`);
            return false;
        }
        f.writeFile(content);
        this._save();
        return true;
    },
    appendFile(appPackage, path, content){
        console.log(`[FS][appendFile] ${appPackage} | ${path} | ${content.slice(0, 50)}${content.length > 50 ? "..." : ""}`);
        const f = this._goTo(appPackage, path);
        if (!f) return false;
        if (f.type !== "file"){
            console.warn(`'${f.name}' no es un archivo`);
            return false;
        }
        f.appendFile(content);
        this._save();
        return true;
    },
    remove(appPackage, path){
        console.log(`[FS][remove] ${appPackage} | ${path}`);
        const [p, f] = this._getParentAndName(appPackage, path);
        if (!p) return false;
        if (p.type !== "folder"){
            console.warn(`'${p.name}' no es una carpeta`);
            return false;
        }

        if (!p.getItem(f)){
            console.warn(`La carpeta o archivo '${f}' no existe (ya está borrado XDD)`);
            return false;
        }
        p.removeItem(f);
        this._save();
        return true;
    },
    _installApp(appObj){
        // /data/app/*...
        let apkPath, apkName, uid1, uid2;
        if (appObj.flags){
            if (AppManager.isSystemApp(appObj)){
                apkPath = `/system/app/${appObj.name}`;
                apkName = `/${appObj.name}.npk`;
            }
            if (AppManager.isPrivApp(appObj)){
                apkPath = `/system/priv-app/${appObj.name}`;
                apkName = `/${appObj.name}.npk`;
            }
        }
        uid1 = randomString(22, true, true, true, "_-");
        uid2 = randomString(22, true, true, true, "_-");
        if (!apkPath) apkPath = `/data/app/~~${uid1}==/${appObj.package}-${uid2}==`;
        if (!apkName) apkName = `/base.apk`;
        this.createDirs("", apkPath);
        this.createFile("", `${apkPath}/${apkName}`);
        this.writeFile("", `${apkPath}/${apkName}`, JSON.stringify(appObj));

        // /data/system/packages.xml
        this._updatePackagesXML(appObj, `${apkPath}${apkName}`, uid1, uid2);

        // /data/data/*...
        ["files","databases","shared_prefs","cache"].forEach(f => this.createDirs(appObj.package, `/data/data/${appObj.package}/${f}`));
        return true;
    },
    _uninstallApp(appPackage, keep=false){
        const pkgF = "/data/system/packages.xml";
        let data = this.readFile("", pkgF);
        let json;
        try {
            json = JSON.parse(data);
        } catch {
            json = { packages: {} };
        }
        if (json.packages[appPackage].flags?.includes("system-app")){
            console.error(`Las apps del sistema no se pueden borrar`);
            return false;
        }
        if (json.packages[appPackage].flags?.includes("priv-app")){
            console.error(`Las apps privilegiadas del sistema no se pueden borrar`); // con mucha mas razón w
            return false;
        }
        // Ya está borrada?
        if (!json.packages[appPackage]) return true; // ya está desinstalada we
        // Borrar apk
        FileSystem.remove("", `/data/app/~~${json.packages[appPackage].uid1}==/`);
        // Borrar/retener datos
        if (!keep){
            FileSystem.remove("", `/data/data/${appPackage}/`);
        }
        // Actualizar packages.xml
        delete json.packages[appPackage];
        this.writeFile("", pkgF, JSON.stringify(json));
        return true;
    }
}
// tests
localStorage.clear();
FileSystem.init();
/* (No tiene que funcionar, solo existir para verse técnico XDDD)
N:
├── system/                # Apps que NO se pueden desinstalar
│   ├── framework/         # Librerías del sistema (No son librerías Java, son módulos)
│   │   ├── calvik.js              // Motor de ejecución
│   │   ├── activity-manager.js    // Gestor de actividades  
│   │   ├── app-manager.js         // Gestor de apps
│   │   ├── permission-manager.js  // Gestor de permisos
│   │   ├── notification-core.js   // Núcleo de notificaciones
│   │   └── system-ui-core.js      // Núcleo de SystemUI
│   ├── priv-app/          # *.npk (apps privilegiadas: Launcher, SystemUI, Settings)
│   ├── app/               # *.npk (apps básicas: Calculator, Contacts, etc)
│   ├── etc/               # Configuraciones del sistema (no apps)
│   │   └── init.clvk              // Script de inicio del sistema
│   ├── bin/               # Comandos del sistema (shell en Notroid wt)
│   │   ├── sh                     // Alguna shell para Notroid, aunque sea pura ilusión XDD
│   │   ├── dogcat                 // logcat de bajo presupuesto🥀
│   │   └── pm                     // PackageManager CLI???
│   ├── lib/               # "Módulos nativos"
│   │   ├── libgraphics.sys        // Módulo nativo del render
│   │   ├── libaudio.sys           // Motor de sonido
│   │   └── libcrypto.sys          // Ponte a buscar dónde Notroid usa cripto XDD
│   └── media/             # Sonidos de notificación, bootanimation, alarmas
│       ├── bootanimation.sip      // Animación de inicio
│       ├── shutdownanimation.sip  // Animación al apagar/reiniciar el cel
│       └── audio/                 // Notis, alarmas, etc..
├── vendor/                # == product (sí, son lo mismo en Android moderno creo)
│   ├── app/               # Apps "Extra" del fabricante (quien carajos se pondría a personalizar Notroid XDD??)
│   ├── firmware/          # Firmwares imaginarios
│   ├── lib/               # Drivers del fabricante (aunque sea yo mismo XDD)
│   └── overlays/          # Temas y personalizaciones
├── data/
│   ├── app/               # Apps instaladas por el usuario (*.npk) (.npk = .json pero suena épico)
│   ├── system/            # Configuraciones del sistema (SystemConfig.settings)
│   │   ├── locksettings.ndb       // PIN, CONTRASEÑA
│   │   ├── packages.xml           // Paquetes instalados
│   │   ├── settings_system.conf   // SystemConfig.settings
│   │   ├── accounts.db            // no..
│   │   └── wallpaper/             // Fondos de pantalla
│   └── data/              # Datos privados de cada app
│       └── com.x12steve.test/
│           ├── files/        # Archivos de la app (creados con "./*")
│           ├── databases/    # Bases de datos SQLite (ni se ilusionen we JAJJAJA)
│           ├── shared_prefs/ # Preferencias (LocalStorage actual)
│           └── cache/        # Cache temporal (Variables????)
├── proc/                  # Info del sistema
│   ├── cpuinfo                    // Info de la CPU
│   └── raminfo                    // Info de la RAM
├── sys/                  # Controladores del kernel
│   ├── devices/                   // Dispositivos
│   └── fs/                        // Sistema de archivos
├── storage/
│   └── emulated/12/       # Almacenamiento "externo" (público)
│       ├── Download/
│       ├── Pictures/
│       ├── Music/
│       └── Notroid/       # Datos accesibles de apps
│           └── data/      # Datos accesibles de apps
└── README.txt             # Algún mensaje "importante" que quiera dejar el proveedor

Flujo de booteo: (actualizar)
/// ("BOOT" singifica la función de booteo)
1. BOOT carga frameworks ("/system/framework/*.js")
2. BOOT verifica que existan las apps del sistema, y si no, las instala ("/system/app/" y "/system/priv-app")
3. BOOT llama a AppManager (o el futuro launcher) para mostrar las apps ("/data/app/*.npk")
4. BOOT ejecuta script de inicio (posiblemente en Calvik) ("/system/etc/init.clvk");

Preguntas:
- ¿El FS si está a corde cómo funcionaría en Android? (más o menos obvio)

(nota: we, siento que esto en vez de ser ideas para FS Notroid más bien es la doc del FS de android que google nunca quiso hacer XDDD)
*/


