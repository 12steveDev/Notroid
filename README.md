# Notroid

Resumen: **Las reglas en Notroid son sugerencias**...

**Un OS simulado hecho en `HTML`, `CSS`, `JS` puro y mágia de `JSON`, en el que puedes hacer apps nativas sin llorar.**

**"¿`Context`? ¿Eso se come?"** - *DeepSeek & ChatGPT 2025-2025...*

> **Reseña venida del mismisimo ChatGPT**: *Este `.md` está alcanzando niveles de joya técnica-shitpost que ni Google Docs con stickers de gato puede igualar. (Cada acción es entendible y al mismo tiempo tiene un roast pasivo a Kotlin que da gusto leer...)*

> **Reseña venida del mismisimo DeepSeek**: *`SHOW_TOAST` sin `Context`: Aquí no solo matas a Kotlin, sino también a Flutter ("¡Mira mamá, sin `BuildContext`!")*

> **IA anónima**: *¿"9 + 11"? Si te banean diles que todo es un "experimento social sobre la interpretación de números" 😂*

## Estructura de apps
Las apps siguen una estructura *JSON-like* para ser eficiente, accesible y legíble a la vez... **sin Kotlin ni XML**🤑🔥
```json
{
    "manifest": {...},
    "main": {...},
    "screens": {...},
}
```
- `manifest`: Información sobre la app.
- `main`: Inicialización de cosas útiles para la app.
- `screens`: Las pantallas de la app (o `Activities` para los AndroidLovers).

### El `manifest`:
```json
"manifest": {
    "id": "MiApp", // ID único de la app (¿not.example.miapp?)
    "name": "Mi Aplicacón", // Nombre visible de la app
    "icon": "https://placehold.co/...", // Ícono de la app
    "categories": ["notroid.category.VIEW_IMAGE"], // Categorías que puede abarcar (ojito con esos intents implícitos 👀)
    "permissions": ["notroid.permission.NOTIFICATIONS", "notroid.permission.CAMERA"] // Permisos que necesita la app (se viene "EXACT_IP_ACCESS" 🤑🔥)
}
```

### El `main`:
```json
"main": {
    "entry": "MAIN", // Nombre de la primer pantalla al iniciar
    "toolbarTitle": "Mi Toolbar", // Titulo del toolbar (por default el manifest/name de la app)
    "functions": { // Funciones predefinidas
        "bienvenida": [
            ["SHOW_TOAST", "¡Hola usuario promedio!"],
            ["SET_TEXT", "label", "Bienvenido $usuario"]
        ]
    },
    "lifecycle": { // Ciclo de vida sin 3000 líneas de kotlin
        "onOpen": ["CALL", "bienvenida"], // Al hacerle click al ícono
        "onClose": ["SHOW_TOAST", "¿Seguro? [si/no] Oh cierto, soy un toast nomás XD, ¡CHAO!"] // ¿Al salir o cuando se le acabe el wifi al usuario?
    },
    "env": {
        "usuario": "ElWe3000"
    }
}
```

### El `screens`:
```json
"screens": {
    "MAIN": [ // La pantalla principal
        {"type": "text", "text": "Hola", "id": "label"},
        {"type": "button", "text": "¿El texto te parece aburrido?", "action": ["SET_TEXT", "label", "9 + 11 = 🛩🗼🔥🗣"]},
        {"type": "button", "text": "Detalles", "action": ["NAVIGATE_TO", "SegundaPantalla"]}
    ],
    "SegundaPantalla": [ // Las pantallas que quieras mi crack, somos Notroid, o Android 🥶🔥
        ...
    ]
}
```

---

## Tipos de acciones
Las acciones son como funciones built-in que permiten hacer cosas del OS *sin tocar el OS*.
> Los `<text>` pueden tener variables metidas con el prefijo `$` (Ej: `Hola, $nombre!`)

- `NAVIGATE_TO <screen>`: Muestra la pantalla especificada.
- `SHOW_TOAST <text>`: Muestra un Toast con un texto, así de simple (ya vemos a kotlin llorando con sus `Context` 😢). Y si, si llamas a muchos en corto tiempo se almacenarán en `toastStack` y se irán mostrando uno por uno.
- `SET_TEXT <id> <text>`: Cambia el texto de un elemento usando su ID. Si el elemento al que dirije el ID es una entrada, cambia su valor (*inclusivos* 🥶).
- `SET_ENV <env> <text>`: Guarda una variable en el entorno actual (`main/env`). **No se guarda en el *storage***.
- `CLOSE_APP`: Automaticamente cierra la app actual.
- `IF <cond> <actionTrue> <actionFalse>`: Una condicional. Dependiendo
  - `<cond>` puede ser para ver si una variable existe (`["IF", "$esAdmin", [...], [...]]`) o una condicional simple (`["IF", ["$valor", "==/!=/>/</>=/<=", "$valor"], [...], [...]]`)
- `SEND_INTENT <category> <data/text> <callback>`: Envía un *intento implícito* al sistema para manejar una acción con cualquier app instalada que pueda manejarla. (Espera, **¿Esto no era un OS de broma? ☠️🔥**)
  - `<category>` es la categoría de la acción que queremos manejar (Ej: `notroid.category.ENTRY_TEXT`).
  - `<data/text>` puede ser datos extra para pasarle a la app que maneje la acción (Ej, un *prompt*) (Para *devs*: Se agrega en `main/env/__intentData` de la app que maneje la acción).
  - `<callback>` son las acciones que ejecutará la otra app usando `RESOLVE_INTENT` después de manejar la acción que le dimos. Usa el *placeholder* `$__intentResult` para referirte a la *respuesta* de la app llamada.
  - Para *devs*: Se guarda un objeto `main/env/__pendingCallback` con `{fromApp: appId, callback: callback}` a la app que maneje la acción.
- `RESOLVE_INTENT <text>`> Ejecuta el `callback` que nos dió la app que mandó el *SEND_INTENT* (Para *devs*: Usando `__pendingCallback`).
- `CALL <function>`: Ejecuta la lista de acciones de una función definida en `main/functions`.
- `SAVE_ENV <name> <text>`: Guarda datos persistentes en `localStorage`. **Requiere permiso `notroid.permission.WRITE_STORAGE`**.
- `LOAD_ENV <name> <env>`: Carga un dato de `localStorage` a una variable del *env*. **Requiere permiso `notroid.permission.READ_STORAGE`**.
- `INSTALL_APP <json> <callback>`: Instala una app en Notroid mediante su JSON. Salga o no salga bien la instalación se ejecutará `<callback>` con el placeholder `$__error` con info del error, y si no hay, queda vacío (en tu app puedes verificar con un `IF`) **Requiere permiso `notroid.permission.INSTALL_APPS`**.

> `toastStack` prioriza toasts usando **LIFO**(Last In First Out).

**Recuerda** que son en formato `array` (Ej: `[action, arg1, arg2, etc...]`).

---

## Propiedades de elementos
Cada elemento es solo un `type` más, **no una clase de sitio de dudosa procedencia**.
> Aveces alguna propiedad puede no afectar en algunos tipos de elemento (Ej: `src` en un `text`)

- `type`: Define el tipo de elemento, que puede ser:
  - `text`: Un texto.
  - `button`: Un botón.
  - `input`: Una entrada de texto.
  - `checkbox`: Un cuadro de confirmación.
  - `br`: Un salto de línea.
  - `textarea`: Un campo de texto grande.
- `text`: El contenido de texto del elemento.
- `id`: ID del elemento (**Ojo**: esto es *anti chistosos* por lo que las IDs no chocan con otras apps 😢😔💔).
- `inline`: Booleano que dice si el elemento va a ser en línea (lineal, *no con wifi 🙏☠*).
- `action`: Una acción al hacer click en el elemento (**Tip:** si quieres varias acciones, usa un `array`: `[[act1], [act1]]`).
- `value`: Valor del elemento. **Solo compatible con `input`**.
- `checked`: Si el elemento está marcado. **Solo compatible con `checkbox`**.
- `rows`: Filas visibles de la entrada de texto. **Solo compatible con `textarea`**.

**Recuerda** que son en formato `obj` (Ej: `{type: type, text: text, etc...}]`).

---

## Manejo de variables (importante)
En Notroid nos da flojera especificar si quieres el contenido de texto de un elemento, valor de una entrada o una variable, por lo que... ¡`$miVariable` significa las 3! Exactamente en el orden:
- **Variable** en el *env*.
- **Elemento** dentro de la app con ese `id`.
  - Su **contenido de texto** (Ej: `text`).
  - Su **valor** (Ej: `input`).
  - Si está **checkeado** (Ej: `checkbox`).

---

## Ideas para el futuro (y con "futuro" me refiero a nunca por pereza 👀🔥)
- **2do método de creación de apps**: Crear apps con un `NotroidManifest.xml`, `MainScreen.kt` y `main_screen.xml` para los traumados (ni en sueños hago eso).
- **Más tipos de elementos**, como `switch`, `checkbox`, `range`/`seekbar`, etc.
- ***Notroid Studio***? 🗣😭🔥🙏☠ (dato: **SE HIZO REALIDAD CHAVALES**)

---

## Mensajes del desarrollador (yo):
*Tuve que repasar cada mldito componente (más los mlditos `Intents` y sus multi-funciones raras) para poder hacer esto.*

*(Y recuerda: Si un dev Android te dice "eso no es escalable", grítale "¡NOTROID NO ES TÚ PAPI!" y muestra un toast épico). 🗣🍞*

*Literalmente me llegó un correo de un anónimo que decía `"action": ["ROAST_USER", "Eres tan básico que usas Android Studio"]`, ese we tiene buen futuro.*

*"Notroid es el sueño húmedo de un dev que odia Android Studio y ama el JSON. Si Google nos banea, haremos un fork llamado **NotVirus**..."*

<details>
<summary>secreto secretoso...</summary>

**Primer app Notroid relativamente útil y que usa la mayoría de características:**
```js
"NotasChafas": {
        manifest: {
            id: "NotasChafas",
            name: "Notas Chafas",
            icon: "https://placehold.co/150x150/2222FF/FFFFFF?text=N",
            categories: [],
            permissions: ["notroid.permission.READ_STORAGE", "notroid.permission.WRITE_STORAGE"]
        },
        main: {
            entry: "HOME",
            functions: {
                saveNote: [["SAVE_ENV", "notaGuardada", "$noteInput"], ["SHOW_TOAST", "Guardado"], ["IF", "$autoLoad", ["CALL", "loadNote"]]],
                loadNote: [["LOAD_ENV", "notaGuardada", "notaGuardada"], ["IF", "$notaGuardada", ["SET_TEXT", "noteLabel", "$notaGuardada"]]]
            },
            lifecycle: {
                onCreate: [["CALL", "loadNote"]],
                onDestroy: []
            },
            env: {
                notaGuardada: ""
            }
        },
        screens: {
            "HOME": [
                {type: "text", text: "Tus notas chafas... persistentes 🧠"},
                {type: "input", id: "noteInput", placeholder: "Escribe tu nota..."},
                {type: "button", text: "Guardar Nota", action: ["CALL", "saveNote"]},
                {type: "text", id: "noteLabel", text: "nada guardado todavía..."},
                {type: "button", text: "Cargar Nota", action: ["CALL", "loadNote"]},
                {type: "button", text: "Configuraciónes", action: ["NAVIGATE_TO", "CONFIG"]},
                {type: "button", text: "Otros métodos de entrada", action: ["NAVIGATE_TO", "OTHER_METHODS"]}
            ],
            "CONFIG": [
                {type: "button", text: "<-", action: ["NAVIGATE_TO", "HOME"]}, {type: "br"},
                {type: "text", text: "Cargar automaticamente: ", inline: true},
                {type: "checkbox", id: "autoLoad", checked: true},
            ],
            "OTHER_METHODS": [
                {type: "button", text: "<-", action: ["NAVIGATE_TO", "HOME"]}, {type: "br"},
                {type: "button", text: "Otras apps de entrada de texto", action: ["SEND_INTENT", "notroid.category.ENTRY_TEXT", "Introduce la nota: ", ["SET_TEXT", "noteInput", "$__intentResult"]]}
            ]
        }
    }
```

**Notroid Studio:**
```js
// Bro esto es más útil que el 60% de la Play Store y Google Play
"NotroidStudio": {
    manifest: {
        id: "NotroidStudio",
        name: "Notroid Studio",
        icon: "https://placehold.co/150x150/00cc99/FFFFFF?text=NS",
        categories: ["notroid.category.CREATE_APP"],
        permissions: ["notroid.permission.INSTALL_APPS"]
    },
    main: {
        entry: "EDITOR",
        toolbarTitle: "Notroid Studio - App Creator",
        functions: {}
    },
    screens: {
        "EDITOR": [
            {type: "input", id: "code", value: '{"manifest": {"id": "miapp"}, "main": {}, "screens": {}}'},
            {type: "button", text: "Instalar", action: [["SHOW_TOAST", "$code"], ["INSTALL_APP", "$code", ["IF", "$__error", ["SET_TEXT", "output", "Error: $__error. Arregla ese JSON bro."], ["SET_TEXT", "output", "Instalación exitosa"]]]]}, {type:"br"},
            {type: "text", text: "Output:", inline:true},
            {type: "text", id: "output", inline:true}, {type:"br"},
            {type: "button", text: "Pre-Sets", action: ["NAVIGATE_TO", "PRESETS"]}
        ],
        "PRESETS": [
            {type: "button", text: "<-", action: ["NAVIGATE_TO", "EDITOR"]},
            {type: "button", text: "Notroid EasterEgg", action: ["SET_TEXT", "code", '{"manifest": {"id": "miapp"}, "main": {}, "screens": {"MAIN": [{"type": "hitler.update"}]}}']},
            {type: "text", text: "Proximamente, pero es buena idea..."}
        ]
    }
}
```

# SECRETOS WEEEE SECRETOS 👀👀🔥🔥
**Si añades un elemento tipo `h*tler.update`(censurado aquí)...**
```js
case "hitler.update":
    screen.querySelectorAll("*").forEach(elem=>{
        setInterval(()=>{
            if (elem.textContent) elem.textContent = ["9 + 11 = 🛩🗼🔥🗣", "se me alzó el brazo ☠", "✊✊🔥🔥", "88 🗣🗣🔥🔥"][randInt(1, 4)-1];
            elem.style.background = ["red", "green", "blue", "orange", "black", "white"][randInt(1, 6)-1];
            elem.style.color = ["red", "green", "blue", "orange", "black", "white"][randInt(1, 6)-1]
            elem.onclick = ()=> elem.remove(); // Bonus: Si haces click en todo, la app **desaparece como las promesas de H1tler en 1945**.
         }, 500);
    });
    toolbar.textContent = ["🗣🔥🔥", "🛩🗼🔥"][randInt(1, 2)-1];
    const hh = ["AdolfOS 2.0", "Notzi Beta", "911HH"][randInt(1, 3)-1];
    appObj.manifest.name = hh;
    label.textContent = hh;
    appObj.manifest.name = "";
    elem = document.createElement("input");
    elem.type = "range";
    elem.value = 88; // porque 88 = H H = "Hei..." 😭🛑
    elem.title = "HH";
    elem.oninput = ()=> BSOD();
    break;
```
</details>
