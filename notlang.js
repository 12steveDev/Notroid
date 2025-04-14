const last = arr => arr[arr.length - 1];
class Notlang {
    constructor(){
        // Data de la app en desarrollo
        this.app_rname = "Not My App";
        this.app_name = "NotMyApp";
        this.app_icon = "https://placehold.co/500x500/FFFFFF/FFFFFF";
        this.app_toolbar = true;
        this.app_toolbar_title = "Not My Toolbar";
        this.app_toolbar_color = "#008080";
        this.app_toolbar_text_color = "#ffffff";
        // Utiles del parser
        this.err = false;
        this.screens = {};
        this.__currScreen = undefined;
        this.stack = [];
        this.ti = [];
        this.lines = [];
        this.i = 0;
        this.MAP = [{
            "APP": this.app.bind(this),
        }];
    }
    __func(name, params, available){
        if (!available.includes(name)){
            //pass
        } else if (name === "CREATE_IMAGE"){
            params = this.__split(params).filter(p => p !== ",") || [];
            this.__lenNeed(params, 5, "CREATE_IMAGE necesita: <width> <height> <bg> <fg> <text>"); // width, height, bg, fg, text
            const width = this.__v(this, params[0], "int");
            const height = this.__v(this, params[1], "int");
            const bg = this.__v(this, params[2], "hex").slice(1);
            const fg = this.__v(this, params[3], "hex").slice(1);
            const text = this.__v(this, params[4], "str");
            return `https://placehold.co/${width}x${height}/${bg}/${fg}?text=${text.replace(/ /g, '+')}`
        } else if (name === "NAVIGATE_TO"){
            params = this.__split(params).filter(p => p !== ",") || [];
            this.__lenNeed(params, 1, "NAVIGATE_TO necesita: <screenId>");
            const screen = this.__v(this, params[0], "str");
            return `navigateTo(this, "${screen}")`;
        } else if (name === "OPEN_APP"){
            params = this.__split(params).filter(p => p !== ",") || [];
            this.__lenNeed(params, 1, "OPEN_APP necesita: <appId>");
            const app = this.__v(this, params[0], "str");
            return `hideApp(this); showApp("${app}-app")`;
        } else if (name === "SHOW_TOAST"){
            params = this.__split(params).filter(p => p !== ",") || [];
            this.__lenNeed(params, 1, "SHOW_TOAST necesita: <msg>");
            const msg = this.__v(this, params[0], "str");
            return `showToast("${msg}")`;
        }
        this.error(`Función desconocida: ${name}`, "NameError");
        throw new TypeError("V_ERROR");
    }
    __split(line){
        return line.match(/"[^"]*"|[:{},]+|=>|[A-Z_]+(\([^\)]*\))?|\([^\)]*\)|#[0-9a-fA-F]+|\d*\.?\d+[a-z%]*|[0-9]+/g) || []
    }
    error(msg, type="Error"){
        console.error(`[${type}] (linea ${this.i}): ${msg}`);
        this.lines = [];
        this.err = true;
    }
    __v(self, val, need){
        val = val.trim();
        let r = undefined;
        if (val.startsWith('"') && val.endsWith('"')){
            r = [val.slice(1, -1), "str"];
        } else if (/^\([^\)]*\)$/.test(val)){
            r = [val.slice(1, -1), "()"];
        } else if (/^\d+$/.test(val)){
            r = [val, "int"];
        } else if (/^[A-Z_]+\([^\)]*\)$/.test(val)){
            const match = val.match(/([A-Z_]+)\(([^\)]*)\)/);
            r = [[match[1], match[2]], "func"];
        } else if (/^\d*\.?\d+(?=px|%|vh|vw)/.test(val)){
            r = [val, "size"];
        } else if (val === "YES" || val === "NO"){
            r = [val === "YES", "bool"];
        } else if (/^#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})$/.test(val)){
            r = [val, "hex"];
        } else if (val === "=>"){
            r = [val, "=>"];
        } else if (val === "{"){
            r = [val, "{"];
        } else if (val === ":"){
            r = [val, ":"];
        } else {
            self.error(`Tipo de dato desconocido: ${val}`, "TypeError");
            throw new TypeError("V_ERROR");
        }
        // Detectar si es el esperado
        if (r[1] !== need){
            self.error(`Se esperó '${need}' pero se obtuvo '${r[1]}' (${val})`, "TypeError");
            throw new TypeError("V_ERROR");
        } else {
            return r[0];
        }
    }
    __css(code){
        const CSSMAP = {
            "COLOR": ["color", "hex"],
            "SIZE": ["font-size", "size"]
        }
        const parts = this.__split(code);
        let end = "";
        let styles = "";
        for (const part of parts){
            if (part === ","){
                end += "\n";
                continue;
            }
            end += part;
        }
        for (const line of end.split("\n")){
            let args = this.__split(line);
            const cmd = args.shift();
            if (!Object.keys(CSSMAP).includes(cmd)){
                this.error(`Estilo NSS desconocido: ${cmd}`, "NSSError");
                throw new TypeError("V_ERROR");
            }
            const style = CSSMAP[cmd][0];
            const type = CSSMAP[cmd][1];
            this.__v(this, args[0], ":");
            const value = this.__v(this, args[1], type);
            styles += `${style}: ${value}; `;
        }
        return styles.trim();
    }
    __lenNeed(args, need, msg=""){
        if (args.length < need) throw new SyntaxError(msg);
    }
    app(args){
        this.__lenNeed(args, 2, "Se esperaron 2 argumentos");
        this.app_rname = this.__v(this, args[0], "str");
        this.app_name = this.app_rname.replace(/ /g, "");
        this.__v(this, args[1], "{");
        this.stack.push("{");
        this.ti.push(this.i);
        this.MAP.push({
            "ICON": this.icon.bind(this),
            "TOOLBAR": this.toolbar.bind(this),
            "TOOLBAR_TITLE": this.toolbar_title.bind(this),
            "TOOLBAR_COLOR": this.toolbar_color.bind(this),
            "SCREEN": this.screen.bind(this)
        });
    }
    icon(args){
        this.__lenNeed(args, 2, "Se esperaron 2 argumentos");
        this.__v(this, args[0], ":");
        let func = this.__v(this, args[1], "func");
        let params = func[1];
        func = func[0];
        this.app_icon = this.__func(func, params, ["CREATE_IMAGE"]);
    }
    toolbar(args){
        this.__lenNeed(args, 2, "Se esperaron 2 argumentos");
        this.__v(this, args[0], ":");
        this.app_toolbar = this.__v(this, args[1], "bool");
    }
    toolbar_title(args){
        this.__lenNeed(args, 2, "Se esperaron 2 argumentos");
        this.__v(this, args[0], ":");
        this.app_toolbar_title = this.__v(this, args[1], "str");
    }
    toolbar_color(args){
        this.__lenNeed(args, 2, "Se esperaron 2 argumentos");
        this.__v(this, args[0], ":");
        this.app_toolbar_color = this.__v(this, args[1], "hex");
    }
    screen(args){
        this.__lenNeed(args, 2, "Se esperaron 2 argumentos");
        const name = this.__v(this, args[0], "str");
        this.__v(this, args[1], "{");
        this.stack.push("{");
        this.ti.push(this.i);
        this.__currScreen = name;
        this.screens[name] = ""; // Evita un prefijo raro "undefined"
        this.MAP.push({
            "TEXT": this.text.bind(this),
            "BUTTON": this.button.bind(this)
        });
    }
    text(args){
        this.__lenNeed(args, 2, "Se esperaron 2 argumentos");
        this.__v(this, args[0], ":");
        const msg = this.__v(this, args[1], "str");
        let html = "<p";
        if (args[2]){
            const styles = this.__v(this, args[2], "()");
            const stylesHtml = this.__css.bind(this)(styles);
            html += ` style="${stylesHtml.replace(/"/g, '&quot;')}"`;
        }
        html += `>${msg}</p>\n`;
        this.screens[this.__currScreen] += html;
    }
    button(args){
        this.__lenNeed(args, 2, "Se esperaron 2 argumentos");
        this.__v(this, args[0], ":");
        const msg = this.__v(this, args[1], "str");
        let html = "<button"; // : "msg" => nt()
        if (args[2]){
            this.__v(this, args[2], "=>");
        }
        if (args[3]){
            let func = this.__v(this, args[3], "func");
            const params = func[1];
            func = func[0];
            const funcHtml = this.__func(func, params, ["NAVIGATE_TO", "OPEN_APP", "SHOW_TOAST"]);
            html += ` onclick="${funcHtml.replace(/"/g, '&quot;')}"`;
        }
        html += `>${msg}</button>\n`;
        this.screens[this.__currScreen] += html;
    }
    run(code){
        this.lines = code.split("\n");
        while (this.i < this.lines.length){
            const line = this.lines[this.i].split("//")[0].trim();
            this.i++;
            if (!line) continue;
            let args = this.__split(line);
            //console.warn(`${this.i}| (l:${args.length-1}) ${args}`);
            const cmd = args.shift();
            if (cmd === "}"){
                if (this.stack.length !== 0){
                    this.stack.pop();
                    this.ti.pop();
                    this.MAP.pop();
                } else {
                    this.error(`Cierre de llave ('}') no matcheado:\n${line}`, "SyntaxError");
                }
            }
            else if (Object.keys(last(this.MAP)).includes(cmd)){
                //try {
                    last(this.MAP)[cmd](args);
                //} catch (e) {
//                    if (e instanceof SyntaxError){
//                        const msg = e.message || "Error de sintaxis";
//                        this.error(`${msg} ->\n${line}`, "SyntaxError");
//                    } else if (e instanceof TypeError){
//                        this.err = true
//                        throw e;
//                    } else {
//                        throw e;
//                    }
//                }
            } else {
                this.error(`Comando desconocido: ${cmd}`, "RuntimeError")
            }
        }
        if (this.err) return;
        if (this.stack.length !== 0){
            this.i = this.ti.pop();
            this.error(`No se encontró cierre de llave ('}'):\n${this.lines[this.i-1]}`, "SyntaxError");
            return;
        }
        let htmlIcon = `<div class="icon" data-app="${this.app_name}">\n<img src="${this.app_icon}">\n<p>${this.app_rname}</p>\n</div>`;
        let htmlApp = `<div class="app hide" id="${this.app_name}-app">\n`;
        if (this.app_toolbar){
            htmlApp += `<div class="toolbar" style="background: ${this.app_toolbar_color}">\n<p>${this.app_toolbar_title}</p>\n</div>\n`
        }
        for (const [screen, html] of Object.entries(this.screens)){
            htmlApp += `<div class="screen" id="${screen}-screen">\n${html}</div>\n`;
        }
        htmlApp += "</div>";
        return [this.app_rname, htmlIcon, htmlApp];
    }
}


nt = new Notlang();
//console.log(nt.__v(nt, "15px", "int"))
//const func = nt.__v(nt, 'CREATE_IMAGE(500, "500", #008080, #ffffff, 5px)', "func")
//console.log(`Func: ${func}`);
//const r = nt.__func(func[0], func[1]);
//console.log(r);
c = `APP "Mi App" {
    ICON: CREATE_IMAGE(500, 500, #FFFFFF, #000000, "Hola Mundo")
    TOOLBAR:YES
    TOOLBAR_TITLE:"Mi Toolbar"
    TOOLBAR_COLOR:#ff0000
    SCREEN "MAIN" {
        TEXT: "Hola Js" (COLOR: #f00, SIZE: 24px)
        TEXT:"Mi Titulo" (SIZE: 250px)
    }
    SCREEN "Detalles" {
        TEXT:"Contenido aburrido..." (COLOR: #ffffff44, SIZE: 8px)
    }
}
`
//const r = nt.run(c)
//console.log(r[0] + "\n" + r[1])
