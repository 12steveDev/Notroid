# === NOTES.md === #

## TO-DO:
- Añadir actividades a los paquetes de las aps (`ActivityManager`, `["START_ACTIVITY"]`) (Nota: **YA IMPLEMENTADO KBRONES!!!!**)
- Hacer que toda acción tenga que estar en un contexto de paquete **Y** de actividad. (Nota: **TAMBIEN ESTÁ KBRONES!!!!!**)
- Añadir UI al TopPopup de las notificaciones (Nota: **esto no, tengo pereza JAAJAJAJJAJAJA**)
- Limpiar las variables de una actividad cuando esa actividad muera (pobrecita 😢)
- Implementar la `NavigationBar`
- Permitir inicializar variables en apps antes de renderizar la UI
- Pensar, ¿`LocalStorage` también debe ser `notlocal.package.activity.varname` para estar encapsulado o `notlocal.package.varname` para que toda la app pueda acceder?
- Implementar los últimos SystemConfig.settings
- **URGENTE IDEA PRO:** **añadir atributo `pid` a los items en `ActivityManager.activityStack`, y a los divs base de las actividades ponerles de `id` ese `pid`.**

## TO-DO MUY LEJANO
- Utilizar Google Sheets (pobre pero útil) o vender caramelos para tener una base de datos estable y hacer un `AppStore`
- Permitir en entornos android exportar una app Notroid a ser una app real JAJAJAJAJ (we ni lo he hecho en Kotlin y lo voy a hacer acá)
- Hacer un lenguaje de programación legible para transformar a Calvik (que también es legible, pero igual es un pokito dificil jeje) (`CalvikScript.js`)
- ¿`Picture On Picture`? ¿`PERMISSION_SYSTEM_ALERT_WINDOW`? *¿Qué opcodes habría para manejar todo eso?....*
- Quizás si se crean los `opcodes` y `UIs` necesarios, hacer que el **launcher** sea también una app, y que se pueda cambiar (incluso, hasta podríamos hacer un **inputmethod** jeje... (me estoy matando solito wtf))

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
