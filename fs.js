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
const FileSystem = {
    
}
/*
N:
├── system/
│   ├── apps/              # *.npk (JSON apps)
│   ├── config/            # Configuraciones del sistema
│   └── bin/               # Scripts de inicio (.clvk)
├── data/
│   ├── user/              # Datos del usuario
│   └── apps/              # /data/data/com.example.package/
│       └── com.example.package/
│           ├── files/     # Archivos de la app
│           ├── cache/     # Cache temporal
│           └── databases/ # Bases de datos (por si acaso)
└── storage/
    └── emulated/0/        # Almacenamiento "externo"
        ├── Download/
        ├── Pictures/
        ├── Music/
        └── Notroid/       # Para no contaminar
*/
