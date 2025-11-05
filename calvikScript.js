// calvikScript.js
const CalvikScript = {
    i: 0,
    lines: undefined,
    bytecode: [],

    next(){
        const r = this.lines[this.i];
        this.i++;
        return r;
    },

    ex(line){
        line = line.split("#")[0].trim();
        if (!line) return;

        let match;

        match = line.match(/var\s+(.+?)\s*=\s*(.+?)/);
        if (match){
            return ["SET_VAR", match[1], this.ex(match[2])];
        }
        match = line.match(/GetVar\s*\(\s*(.+?)\s*\)/);
        if (match){
            return ["GET_VAR", this.ex(match[1])];
        }

        match = line.match(/ShowToast\s*\(\s*(.+?)\s*\)/);
        if (match){
            return ["SHOW_TOAST", this.ex(match[1])];
        }
        match = line.match(/Alert\s*\(\s*(.+?)\s*\)/);
        if (match){
            return ["ALERT", this.ex(match[1])];
        }
        match = line.match(/Prompt\s*\(\s*(.+?)\s*,\s*(.+?)\s*\)/);
        if (match){
            return ["PROMPT", this.ex(match[1]), this.ex(match[2])];
        }
        match = line.match(/Confirm\((.+?)\)/);
        if (match){
            return ["CONFIRM", this.ex(match[1])];
        }

        match = line.match(/"([^"]*)"/);
        if (match){
            return match[1];
        }
        match = line.match(/(\d+)/);
        if (match){
            return Number(match[1]);
        }
    },

    parseToBytecode(code){
        this.lines = code.split("\n");
        while (this.i < this.lines.length){
            let line = this.next();
            line = line.split("#")[0].trim();
            if (!line) continue;
            this.bytecode.push(this.ex(line));
        }
        return this.bytecode;
    }
}

let code = `
var hi=2
ShowToast(GetVar("hi"))
Alert(3)
Prompt("Aceptar","si")
`;
// console.log(JSON.stringify(CalvikScript.parseToBytecode(code)))
