# === NOTES.md === #

## TO-DO:
- Añadir actividades a los paquetes de las aps (`ActivityManager`, `["START_ACTIVITY"]`) (Nota: **YA IMPLEMENTADO KBRONES!!!!**)
- Hacer que toda acción tenga que estar en un contexto de paquete **Y** de actividad. (Nota: **TAMBIEN ESTÁ KBRONES!!!!!**)
- Añadir UI al TopPopup de las notificaciones (Nota: **esto no, tengo pereza JAAJAJAJJAJAJA**)
- Permitir inicializar variables en apps antes de renderizar la UI
- Pensar, ¿`LocalStorage` también debe ser `notlocal.package.activity.varname` para estar encapsulado o `notlocal.package.varname` para que toda la app pueda acceder?
- Pensar que haría alguien con `root` en Notroid (literal Notroid ya expone todo)
- Añadir quizás un `["ID_CLICK"]` para hacer clicks a propósito.
- Pensar 2 veces si mantener localStorage o mejor añadir un `FileSystem` (con `["CREATE_FILE"]`, `["READ_FILE"]`, `["WRITE_FILE"]`, `["APPEND_FILE"]` y `["DELETE_FILE"]`) y localStorage solo serviría para guardar el estado de FileSystem (por lo que, la data de todas las apps, del sistema, todo, estaría en FileSystem, localstorage solamente guarda el fs).
- ¿Añadir `["FETCH"]`??? ¿Quieren hacer apps profesionales en Notroid!!???
- Añadir tipo de elemento `webview` (un `<iframe>`), atributo `src`, y opcodes `["ID_SET_SRC"]` y `["ID_SET_SRCDOC"]` (se viene IDE HTML en Notroid wee 👀👀🔥🔥).
- ! Por favor, **encontrar solución al problema de que no podemos diferenciar entre instrucciones Calvik y un Array**, por lo tanto, no podemos usar Arrays

## TO-DO MUY LEJANO
- Utilizar Google Sheets (pobre pero útil) o vender caramelos para tener una base de datos estable y hacer un `AppStore`
- Permitir en entornos android exportar una app Notroid a ser una app real JAJAJAJAJ (we ni lo he hecho en Kotlin y lo voy a hacer acá)
- Hacer un lenguaje de programación legible para transformar a Calvik (que también es legible, pero igual es un pokito dificil jeje) (`CalvikScript.js`)
- ¿`Picture On Picture`? ¿`PERMISSION_SYSTEM_ALERT_WINDOW`? *¿Qué opcodes habría para manejar todo eso?....*
- ¿`TileService` en Notroid???
- Quizás si se crean los `opcodes` y `UIs` necesarios, hacer que el **launcher** sea también una app, y que se pueda cambiar (incluso, hasta podríamos hacer un **inputmethod** jeje... (me estoy matando solito wtf)). Si esto llega a suceder, también a las apps añadirles el atributo `isLauncher: true/false` para los launchers jeje, y una `SystemConfig.settings` "`defaultLauncher: "com.example.package"`"

## TO-DO DEFINITIVO (solamente 3)
1. Hacer una documentación (`Calvik`, `UI`, etc) y `README.md` decentes.
2. Crear la app definitiva `Ajustes`.
3. *Que Google tiemble...*.

## Hecho:
- Implementar elemento `input` y `checkbox` (y sus `ID_GET_VALUE`, `ID_SET_VALUE`)
- Ejecutar appObj.onDestroy al matar una actividad
- Implementar persistencia en localStorage para apps (quizás `SET_LOCAL`, `GET_LOCAL`, `DEL_LOCAL`)
- Implementar opcode `ID_ADD_CLASS` y `ID_REMOVE_CLASS`
- Optimizar activityManager en el tema de verificar si existe el paquete y la actividad (weon, como 40 lineas repetidas, se nota qje este código es mio JAJAJAJ)
- Migrar todas las apps antiguas a el modo actual
- **URGENTE IDEA PRO:** **añadir atributo `pid` a los items en `ActivityManager.activityStack`, y a los divs base de las actividades ponerles de `id` ese `pid`.**
- Implementar la `NavigationBar`
- Limpiar las variables de una actividad cuando esa actividad muera (pobrecita 😢)
- Implementar los últimos SystemConfig.settings
