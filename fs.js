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
        system.addItem(systemFramework);
        system.addItem(new FOLDER("priv-app"));
        system.addItem(new FOLDER("app"));
        system.addItem(systemEtc);
        root.addItem(system);

        // product/ y vendor/ para hacer sentir poderosa la ruta raíz de tantos directorios (las apariencias engañan lit)
        ["product", "vendor"].forEach(f => {
            const p = new FOLDER(f);
            p.addItem(new FOLDER("app"));
            root.addItem(p);
        });

        // data/
        const data = new FOLDER("data");
        const dataData = new FOLDER("data"); // llegó papi 😭🔥
        data.addItem(new FOLDER("app"));
        data.addItem(new FOLDER("system"));
        data.addItem(dataData);
        root.addItem(data);

        // storage/emulated/0/
        const storage = new FOLDER("storage");
        const emulated = new FOLDER("emulated");
        const zero = new FOLDER("12"); // jeje, algo de crédito debo de tener, ¿no? (att: 12steve)
        const sezNotroid = new FOLDER("Notroid");
        ["Download", "Pictures", "Music"].forEach(f => zero.addItem(new FOLDER(f)));
        sezNotroid.addItem(new FOLDER("data"));
        zero.addItem(sezNotroid);
        emulated.addItem(zero);
        storage.addItem(emulated);
        root.addItem(storage);

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
        // this.printTree();
    },
    _resolvePath(appPackage, path){
        if (!path || path === "/") return "/";

        // Rutas absolutas
        if (path.startsWith("/")) return path;

        // Rutas relativas al directorio de la app
        if (path.startsWith("./")){
            return `/data/apps/${appPackage}/files/${path.slice(2)}`;
        }

        // Rutas relativas al directorio actual de la app
        return `/data/apps/${appPackage}/files/${path}`;
    },
    printTree(item=null, indent=0){
        if (item === null) item = this.fs;
        const spaces = "- - ".repeat(indent);
        console.log(spaces + item.name + (item.type === "folder" ? "/" : ""));
        if (item.type === "folder"){
            for (const childName of item.listItems()){
                this.printTree(item.getItem(childName), indent + 1);
            }
        }
    }
}
localStorage.clear();
FileSystem.init();
FileSystem.printTree();
/*
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
│   └── etc/               # Configuraciones del sistema (no apps)
│       └── init.clvk              // Script de inicio del sistema
├── vendor/                # == product (sí, son lo mismo en Android moderno)
│   └── app/               # Apps "Extra" del fabricante (quien carajos se pondría a personalizar Notroid XDD??)
├── data/
│   ├── app/               # Apps instaladas por el usuario (*.npk) (.npk = .json pero suena épico)
│   ├── system/            # Configuraciones del sistema (SystemConfig.settings)
│   └── data/              # Datos privados de cada app
│       └── com.x12steve.test/
│           ├── files/        # Archivos de la app (creados con "./*")
│           ├── databases/    # Bases de datos SQLite (podrías hacer un SQLite.js 😏)
│           ├── shared_prefs/ # Preferencias (LocalStorage actual)
│           └── cache/        # Cache temporal (Variables temporales)
└── storage/
    └── emulated/0/        # Almacenamiento "externo" (público)
        ├── Download/
        ├── Pictures/
        ├── Music/
        └── Android/data/   # Datos accesibles de apps

Flujo de booteo:
/// ("BOOT" singifica la función de booteo)
1. BOOT carga frameworks ("/system/framework/*.js")
2. BOOT verifica que existan las apps del sistema, y si no, las instala ("/system/app/" y "/system/priv-app")
3. BOOT llama a AppManager (o el futuro launcher) para mostrar las apps ("/data/app/*.npk")
4. BOOT ejecuta script de inicio (posiblemente en Calvik) ("/system/etc/init.clvk");

Preguntas:
- ¿Los ".js" en serio verdad les voy a pasar un eval() de JavaScript???
- ¿"Cargar frameworks" se refiere a literalmente importarlos ahí o solamente es tipo "verificar que ese archivo ficticio existe, si no existe, todos los opcodes relacionados no sirven"?
- ¿El FS si está a corde cómo funcionaría en Android? (más o menos obvio)
- El root en android, ¿cómo funciona? ¿tengo root y todas las apps pueden tener el poder? o ¿tengo root y yo decido que app puede usar el poder?
*/


