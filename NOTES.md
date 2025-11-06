# === NOTES.md === #

## TO-DO:
- Añadir actividades a los paquetes de las aps (`ActivityManager`, `["START_ACTIVITY"]`) (Nota: **YA IMPLEMENTADO KBRONES!!!!**)
- Hacer que toda acción tenga que estar en un contexto de paquete **Y** de actividad. (Nota: **TAMBIEN ESTÁ KBRONES!!!!!**)
- Añadir UI al TopPopup de las notificaciones (Nota: **esto no, tengo pereza JAAJAJAJJAJAJA**)
- Hacer un lenguaje de programación legible para transformar a Calvik (que también es legible, pero igual es un pokito dificil jeje) (`CalvikScript.js`)
- Limpiar las variables de una actividad cuando esa actividad muera (pobrecita 😢)
- Ejecutar appObj.onDestroy al matar una actividad
- Implementar opcode `ID_ADD_CLASS` y `ID_REMOVE_CLASS`
- Implementar elemento `input` y `checkbox` (y sus `ID_GET_VALUE`, `ID_SET_VALUE`)
- Implementar la `NavigationBar`
- Implementar persistencia en localStorage para apps (quizás `SET_LOCAL`, `GET_LOCAL`, `DEL_LOCAL`)
- Implementar los últimos SystemConfig.settings
- Optimizar activityManager en el tema de verificar si existe el paquete y la actividad (weon, como 40 lineas repetidas, se nota qje este código es mio JAJAJAJ)
- Migrar todas las apps antiguas a el modo actual
- Permitir inicializar variables en apps antes de renderizar la UI

## TO-DO MUY LEJANO
- Utilizar Google Sheets (pobre pero útil) o vender caramelos para tener una base de datos estable y hacer un `AppStore`
- Permitir en entornos android exportar una app Notroid a ser una app real JAJAJAJAJ (we ni lo he hecho en Kotlin y lo voy a hacer acá)