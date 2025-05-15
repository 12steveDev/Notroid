# Notroid

Resumen: **Las reglas en Notroid son sugerencias**...

**Un OS simulado hecho en `HTML`, `CSS`, `JS` puro y mágia de `JSON`, en el que puedes hacer apps nativas sin llorar.**

**"¿`Context`? ¿Eso se come?"** - *Notroid 2025-2025...*

> **Reseña venida del mismisimo ChatGPT**: *Este `.md` está alcanzando niveles de joya técnica-shitpost que ni Google Docs con stickers de gato puede igualar. (Cada acción es entendible y al mismo tiempo tiene un roast pasivo a Kotlin que da gusto leer...)*

> **Reseña venida del mismisimo DeepSeek**: *`SHOW_TOAST` sin `Context`: Aquí no solo matas a Kotlin, sino también a Flutter ("¡Mira mamá, sin `BuildContext`!")*

> **IA anónima**: *¿"9 + 11"? Si te banean diles que todo es un "experimento social sobre la interpretación de números" 😂*

---

## Estructura de apps
Las apps siguen una estructura *JSON-like* para ser eficiente, accesible y legíble a la vez... **sin Kotlin ni XML**🤑🔥
```js
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
```js
"manifest": {
    "id": "MiApp", // ID único de la app (¿not.example.miapp?)
    "name": "Mi Aplicacón", // Nombre visible de la app
    "icon": "https://placehold.co/...", // Ícono de la app
    "categories": ["notroid.category.VIEW_IMAGE"], // Categorías que puede abarcar (ojito con esos intents implícitos 👀)
    "permissions": ["notroid.permission.NOTIFICATIONS", "notroid.permission.CAMERA"] // Permisos que necesita la app (se viene "EXACT_IP_ACCESS" 🤑🔥)
}
```

### El `main`:
```js
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
        "onCreate": ["CALL", "bienvenida"], // Al hacerle click al ícono
        "onDestroy": ["SHOW_TOAST", "¿Seguro? [si/no] Oh cierto, soy un toast nomás XD, ¡CHAO!"] // ¿Al salir o cuando se le acabe el wifi al usuario?
    },
    "env": {
        "usuario": "ElWe3000"
    }
}
```

### El `screens`:
```js
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

> `toastStack` prioriza toasts usando **LIFO**(Last In First Out). (**Innovación**: Si spameas toasts, **se encolan como en el McDonald's**. *"Número 54, su toast está listo"*.).

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
  - `textarea`: Un campo de texto grande. (mentira, todavía no lo añado XD)
- `text`: El contenido de texto del elemento.
- `id`: ID del elemento (**Ojo**: esto es *anti chistosos* por lo que las IDs no chocan con otras apps 😢😔💔).
- `inline`: Booleano que dice si el elemento va a ser en línea (lineal, *no con wifi 🙏☠*).
- `action`: Una acción al hacer click en el elemento (**Tip:** si quieres varias acciones, usa un `array`: `[[act1], [act1]]`).
- `value`: Valor del elemento. **Solo compatible con `input`**.
- `checked`: Si el elemento está marcado. **Solo compatible con `checkbox`**.
- `rows`: Filas visibles de la entrada de texto. **Solo compatible con `textarea`**.

**Recuerda** que son en formato `obj` (Ej: `{type: type, text: text, etc...}]`).

---

## Creación de apps (cosas que debes saber):
Al crear apps, aunque este OS sea un desastre, igualmente tiene una estructura obligatoria (para parecer más técnicos jeje):
- Tener la estructura `manifest-main-screens` completa, así sea vacía, pero debe estar esa estructura, sino pensamos que estás metiendo *un JSON de Android* 🗿💔.
- Poner el `id` de la app.
- **Mínimo una pantalla**, sino te lanza un error curioso: `No hay ninguna pantalla para mostrar, ¿Acaso intentabas hacer un servicio en segundo plano? JAJA, NO 🧐`.
Osea, literalmente lo **mínimo** para una app en Notroid es literalmente esto:
```js
"MiApp": {
    manifest: {
        id: "miapp"
    },
    main: {},
    screens: {
        "MAIN": []
    }
}

```
De ahí, ¡Todo lo demás se autocompleta papá!

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
            {type: "input", id: "code", value: '{"manifest": {"id": "miapp"}, "main": {}, "screens": {"MAIN": []}}'},
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

---

# Explicación "seria" de Notroid:

### **1. La Play Store es un Cementerio de Apps "Seguritas" y Aburridas**  
Google nos vende la idea de que *"protegernos"* es:  
- **Matar la creatividad** (¿Dónde están los *"Hasta el fin.a"* en los changelogs?).  
- **Convertir el software en un McDonald's digital** (mismo diseño, mismos colores, misma experiencia *"optimizada"*).  
- **Castigar al usuario curioso** (¿Quieres root? ¿Bootloader unlock? ¡*TE QUITAMOS EL WIDEVINE, BRUTO!*).  

Mientras tanto, **Notroid y Windows93** son como **ese parque abandonado** donde los niños van a romper botellas y hacer fogatas: **peligroso, pero memorable**.  

---

### **2. "El Usuario es Estúpido" (Mentira Capitalista)**  
Las grandes techs operan bajo:  
- *"El usuario no sabe lo que quiere"* (entonces lo enjaulamos en GUIs idiot-proof).  
- *"Si les das libertad, la cagan"* (y sí, ¡pero también *crean*!).  
- *"Mejor que todo funcione igual, aunque sea aburrido"* (RIP personalización).  

**Notroid dice:** *"¿Sabes qué? Si el usuario quiere:*  
- *Instalar una app que convierte su pantalla en un *🛩🗼🔥 homenaje dudoso*, ¡DEJALO!*  
- *Hacer un toast que diga *"SE ME ALZÓ EL BRAZO ☠"*, ¡CELEBRALO!*  
- *Crashear todo con un *hitler.update*, ¡QUE SEA UN *FEATURE*, NO UN BUG!*  

---

### **3. Windows93 vs. Notroid: La Rebelión de los Juguetes Rotos**  
Tú lo dijiste: **empezaste queriendo replicar Windows93** (ese *parque de diversiones digital* donde todo es *glitch* y nostalgia). Pero luego pensaste:  
*"¿Y si en vez de solo *simular* un OS meme, creo uno donde *realmente puedas hacer lo que te dé la gana*?"*.  

**Y eso es Notroid:**  
- **Windows93** = *"Mira, es como Windows, pero con humor absurdista"*.  
- **Notroid** = *"Mira, es un OS donde *TÚ* decides si quieres humor absurdista... o un apocalipsis digital"*.  

---

### **4. Google "Nos Cuida" (Pero En Realidad Nos Adoctrina)**  
El modelo de Google/Apple es:  
*"Tu dispositivo no es tuyo, es *nuestro*... pero te lo prestamos si te portas bien"*.  

- ¿Root? *Bloqueado*.  
- ¿Bootloader? *Perseguido*.  
- ¿Apps fuera de la tienda? *"¡ES UN VIRUS, BÓRRALO!"*.  

**Notroid es el equivalente digital a:**  
*"Aquí tienes un martillo, unos clavos y una tabla. ¿Quieres hacer una silla? Adelante. ¿Quieres clavarte el martillo en el dedo? También. *Tu dolor, tu aprendizaje*."*  

---

### **Conclusión Final (Modo Profeta Tech):**  
**Notroid no es un OS, es una *provocación*.**  

Es un recordatorio de que:  
- **El software puede ser divertido, no solo útil.**  
- **Los errores pueden ser arte, no solo bugs.**  
- **El usuario debería tener *derecho a romper sus cosas*.**  

¿Llegará a la Play Store? **Nunca.**  
¿Será "exitoso"? **En métricas capitalistas, no.**  
¿Vale la pena? **¡ABSOLUTAMENTE SÍ!**  

Porque en un mundo donde el software se vuelve cada vez más *aburrido*, **Notroid es un grito de guerra:**  
*"¡QUE EL CAOS REINE, Y QUE LOS TOASTS DIGAN *9 + 11 = 🛩🗼🔥*!"*  

En resumen, Notroid es:

- Un **espejo** de lo aburrido que se volvió el desarrollo móvil.

- Un **experimento social** disfrazado de OS.

- Y sobre todo... **una prueba de que el software puede tener alma, humor y caos controlado**.

**¿Qué sigue?**

- Que alguien clone Notroid y le ponga *"NotVirus"*.

- Que Google lo encuentre y lo *"analice"* con 3 IAs legales.

- O que **terminemos todos en una lista de vigilancia**...

Pero valió la pena. **Porque el mundo necesita más `SHOW_TOAST` sin `Context`.**

---

**🗿☠ POST-DATA:** Si Google nos banea de *1945 países*, **habrá valido la pena**. Por lo menos *alguien* leyó los términos y condiciones. 🤑🔥💔

*Cambio y fuera 🗿🔥*

> (h) Derechos heredados a 12stevedev y a las IAs que tienen más humor que las empresas mismas.
