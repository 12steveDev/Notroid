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
- `SHOW_TOAST <text>`: Muestra un Toast con un texto, así de simple (ya vemos a kotlin llorando con sus `Context` 😢).
- `SET_TEXT <id> <text>`: Cambia el texto de un elemento usando su ID.
- `SET_ENV <env> <text>`: Guarda una variable en el entorno actual (`main/env`). **No se guarda en el *storage***.
- `CLOSE_APP`: Automaticamente cierra la app actual.
- `IF <cond> <actionTrue> <actionFalse>`: Una condicional. Dependiendo
  - `<cond>` puede ser para ver si una variable existe (`["IF", "$esAdmin", [...], [...]]`) o una condicional simple (`["IF", ["$valor", "==/!=/>/</>=/<=", "$valor"], [...], [...]]`)
- `SEND_INTENT <category> <data/text> <callback>`: Envía un *intento implícito* al sistema para manejar una acción con cualquier app instalada que pueda manejarla. (Espera, **¿Esto no era un OS de broma? ☠️🔥**)
  - `<category>` es la categoría de la acción que queremos manejar (Ej: `notroid.category.ENTRY_TEXT`).
  - `<data/text>` puede ser datos extra para pasarle a la app que maneje la acción (Ej, un *prompt*) (Para *devs*: Se agrega en `main/env/__intentData` de la app que maneje la acción).
  - `<callback>` son las acciones que ejecutará la otra app usando `RESOLVE_INTENT` después de manejar la acción que le dimos.
  - Para *devs*: Se guarda un objeto `main/env/__pendingCallback` con `{fromApp: appId, callback: callback}` a la app que maneje la acción.
- `RESOLVE_INTENT <text>` ejecuta el `callback` que nos dió la app que mandó el *SEND_INTENT* (Para *devs*: Usando `__pendingCallback`).
- `CALL <function>`: Ejecuta la lista de acciones de una función definida en `main/functions`.
- `SAVE_ENV <name> <text>`: Guarda datos persistentes en `localStorage`. **Requiere permiso `notroid.permission.WRITE_STORAGE`**.
- `LOAD_ENV <name> <env>`: Carga un dato de `localStorage` a una variable del *env*. **Requiere permiso `notroid.permission.READ_STORAGE`**.

**Recuerda** que son en formato `array` (Ej: `[action, arg1, arg2, etc...]`).

---

## Propiedades de elementos
Cada elemento es solo un `type` más, **no una clase de sitio de dudosa procedencia**.
> Aveces alguna propiedad puede no afectar en algunos tipos de elemento (Ej: `src` en un `text`)

- `type`: Define el tipo de elemento, que puede ser:
  - `text`: Un texto.
  - `button`: Un botón.
  - `input`: Una entrada de texto.
- `text`: El contenido de texto del elemento.
- `id`: ID del elemento (**Ojo**: esto es *anti chistosos* por lo que las IDs no chocan con otras apps 😢😔💔).
- `action`: Una acción al hacer click en el elemento (**Tip:** si quieres varias acciones, usa un `array`: `[[act1], [act1]]`).

**Recuerda** que son en formato `obj` (Ej: `{type: type, text: text, etc...}]`).

---

## Manejo de variables (importante)
En Notroid nos da flojera especificar si quieres el contenido de texto de un elemento, valor de una entrada o una variable, por lo que... ¡`$miVariable` significa las 3! Exactamente en el orden:
- **Variable** en el *env*.
- **Elemento** dentro de la app con ese `id`.
  - Su **contenido de texto** (Ej: `text`).
  - Su **valor** (Ej: `input`).

---

## Ideas para el futuro (y con "futuro" me refiero a nunca por pereza 👀🔥)
- **Acciones implícitas**: Poder visualizar un contenido con varias apps.
- **2do método de creación de apps**: Crear apps con un `NotroidManifest.xml`, `MainScreen.kt` y `main_screen.xml` para los traumados (ni en sueños hago eso).
- **Guardado de datos por app**: Permitir a las apps tener datos que persistan (*sufre localStorage, sufre...*).

---

## Mensajes del desarrollador (yo):
*Tuve que repasar cada mldito componente (más los mlditos `Intents` y sus multi-funciones raras) para poder hacer esto.*
*(Y recuerda: Si un dev Android te dice "eso no es escalable", grítale "¡NOTROID NO ES TÚ PAPI!" y muestra un toast épico). 🗣🍞*
