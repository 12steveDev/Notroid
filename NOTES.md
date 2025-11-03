# === Notes.py (para resaltado pobre) === #

## === **Clases:** === ##
- **`AppManager`:**
- - *[attr]* `.apps`
- - `.launch(appName)`
- - `.install(appObj)`
- - `.uninstall(appName)`
- - `.list()`
- - `.refresh()`

- **`NotificationManager`:**
- - *[attr]* `.notifications`
- - `.notify(title, message)`
- - `.refresh()`

- **`SystemUI`:**
- - `.toast(message)`

- **`TileManager`:**
- - *[attr]* `.tiles`
- - `.register(tileObj)`
- - `.remove(tileName)`

- **`SystemConfig`:**
- - `.launcherColumns`
- - `.launcherRows`
- - `.apply()`