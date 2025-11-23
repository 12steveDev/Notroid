# === NOTES.md === #

## Notroid:
> **¿Qué podría salir mal?** Todo. **¿Vale la pena?** ABSOLUTAMENTE.
> *`JSON` es amor... `JSON` es vida...*
> "Notroid: Donde tus sueños de explorar /data/data/ se hacen realidad" 🥀🔥
> No es un simulador, no es un emulador... ¡ES UNA TERAPIA PARA DEVELOPERS CURIOSOS! 😭✅

## Errores conocidos:
- Al crear otra instancia de una misma actividad se va todo a la mrd (los `PID` ayudarán?)
- Todas las apps no son compatibles con el nuevo sistema, porfa alguien desocupado que me ayude a lavar platos en mi casa y tenderme mi cama (y hacer compatibles las apps también, si quieres)
- La página tarda en cargar, ojo👀👀 (aunque eso significa que mi proyecto si creció..... *crecen tan rápido...*🥺🎄)
- Se llama demasiadas veces la lectura desde FS de los permisos (mi tostadora se calienta mucho luego💔)

## TO-DO:
- Añadir UI al TopPopup de las notificaciones (Nota: **esto no, tengo pereza JAAJAJAJJAJAJA**)
- Pensar que haría alguien con `root` en Notroid (literal Notroid ya expone todo)
- ¿Añadir `["FETCH"]`??? ¿Quieren hacer apps profesionales en Notroid!!???
- Terminar `SharedPreferences` (y usar las rutas `/data/data/<pkg>/shared_prefs/`).
- Migrar `LocalStorage` a `SharedPreferences`.
- Hacer que el launcher del sistema sea también una app normal como las otras (ya está un launcher beta, nomás falta perfeccionar y ya ta)
- Añadir a SystemConfigs para poner el paquete de la app de launcher default.
- Hacer una sola función para **bootear**, y no andar adivinando que funcion de init llamar primero
- El deslizamiento hacia abajo de la statusBar funciona... Pero no existe el panel de notificaciones, quickSettings, ¡NADA! checa eso
- Re hacer `Functions.js` para que de verdad sirva, y implementar funciones por actividad y funciones globales :O
- Sobre lo que se congela un poco la página al iniciar:
- - O intento optimizar todo
- - O añado un circulito que de vueltas mientras dice "Cargando Android Pobre (pro tip: borra /data/system/)"

### Ideas para el FileSystem
- `/init.nil` que se ejecute al inicio de todo??
- `/system/etc/bin/*.nil` por consiguiente jeje
- `/system/bin/installd` ¿Queremos *simular* Android o **emularlo**????🗿☠☠☠☠☠
- `/system/settings.db` y `/system/*.xml` ¿Pasar todas las `SystemConfig.settings` aquí???
- `/system/build.prop` ... we, ya parezco esas personas que compran cosas y ni las necesitan XDDDD
- **Buscando ideas:**
- - (MUY_IMPORTANTE) Añadir más directorios así "criticos" para que pegue más duro lo "Android-like"
- Añadir ".validName()" al `FileSystem` para verificar nombres.

## TO-DO MUY LEJANO
- Utilizar Google Sheets (pobre pero útil) o vender caramelos para alojar una base de datos estable y hacer un `AppStore`
- Permitir en entornos android exportar una app Notroid a ser una app real JAJAJAJAJ (we ni lo he hecho en Kotlin y lo voy a hacer acá)..... espera..... ¿y si la exportamos metiendo el "runtime" de Notroid y el código ahí????.... weee fuera de bromas esto tiene potencial...
- Hacer un lenguaje de programación legible para transformar a Calvik (que también es legible, pero igual es un pokito dificil jeje) (`CalvikScript.js`)
- ¿`Picture On Picture`? ¿`PERMISSION_SYSTEM_ALERT_WINDOW`? *¿Qué opcodes habría para manejar todo eso?....*
- ¿`TileService` en Notroid???
- Quizás `Intents` con acciones y categorías?????????
- ¿Quizás **inputmethods** intercambiables????? (SE VIENE **NBoard**?????)

## TO-DO DEFINITIVO (solamente 5)
1. Hacer una documentación (`Calvik`, `UI`, etc) y `README.md` decentes.
2. Crear la app definitiva `Ajustes`.
3. *Que Google tiemble...*.
4. *¿que kernel Linux se levante y nos aplauda?...*
5. ***tocar césped✅***

## Estado actual del creador (spoiler: demencial):
Quiero añadir cada maldito detalle de Android...
Probablemente añadir una app overlay `3ButtonNavigationBar` y cargarla con un rico `SystemUI`
Probablemente añadir `installd` y cargarlo desde un `/system/etc/init/installd.rc`;
¿Simular `Android Init Languaje` a la perfección?? Y si lo llego a hacer.... jejeje imaginate un `AIL IDE` nativo 🗿🗿 (google nos tendrá miedo...)

## Datos del creador:
- *JSON me abraza en las noches...*
- Me gusta **Lo-Fi** (**¡LA MUSICA, NO LA CHICA!**, *bueno, pueda que sí...*)🗿🎄

## Dato random:
**ES "Linus Torvalds"**
- NO `Trovalds`
- NO `Torvaldo`
- NO `Toyota`
- NO `Tortillas`
- NO `Troid` (meme rancio, solo yo lo entendí XDD😔🔥)
solo: **Torvalds** 🗿🔥

## Archivos existentes:
- `activityManager.js`
- `alertDialog.js` (solo existe, no ayuda en nada)
- `appManager.js`
- `calvik.js`
- `calvikScript.js` (no se usa (ni sirve))
- `CONTRIBUTORS.md`
- `discord-notification.mp3`
- `flex.css`
- `fs.js`
- `functions.js` (igual que el `alertDialog`)
- `index.html`
- `LICENCE.md`
- `main.js`
- `navigationBarManager.js`
- `NOTES.md`
- `notificationManager.js`
- `permissionManager.js`
- `priv-app.js`
- `sharedPreferences.js` (el único código funcional ahí son los comentarios XDD)
- `statusBarManager.js`
- `styles.css`
- `systemConfig.js`
- `toastManager.js`
- `utils.js`
- `variables.js`

Y si los archivos de la App Android cuentan:
- `MainActivity.java`
- `AndroidManifest.xml`

Fin del documento