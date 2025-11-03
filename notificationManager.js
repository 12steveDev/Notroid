// notificationManager.js
const NotificationManager = {
    notis: [], // { appPackage, title, content }
    notiState: "show", // "show" | "muted" | "hide" | "block"
    notiSound: ["Discord Notification", "discord-notification.mp3"],
    _showTopPopup(appPackage, message){
        const appObj = AppManager.getAppObj(appPackage);

        const popupDiv = E("div");
        popupDiv.classList.add("notificationTopPopup");

        const iconImg = E("img")
        
        desktop.appendChild(popupDiv);
    },
    // ["SEND_NOTIFICATION"] (P_POST_NOTIFICATIONS)
    notify(appPackage, title, content){
        if (!AppManager.getAppObj(appPackage)){
            console.warn(`La app '${appPackage}' no existe`);
            return false;
        }
        this.notis.push({appPackage: appPackage, title: title, content: content});
        this.apply();

        // "hide" | "block" = No PopupSuperior ni Sound
        if (["hide","block"].includes(this.notiState)) return true;

        // "muted" | "show" = Con PopupSuperior
        this._showTopPopup(appPackage, "Tiene nuevos mensajes");
        // "show" = Con Sound
        if (this.notiState === "show"){
            const notiAudio = new Audio(this.notiSound[1]);
            notiAudio.volume = 0.9;
            notiAudio.play();
            return true;
        }
        return true;
    },
    // ["GET_NOTIFICATION_STATE"] (P_MANAGE_NOTIFICATIONS_STATE)
    getState(){
        return this.notiState;
    },
    // ["SET_NOTIFICATION_STATE"] (P_MANAGE_NOTIFICATIONS_STATE)
    setState(state){
        if (!["show","muted","hide","block"].includes(state)){
            console.warn(`El estado de notificaciones '${state}' no es válido`);
            return false;
        }
        this.notiState = state;
        this.apply();
        StatusBarManager.apply();
        return true;
    },
    apply(){
        notiIcons.innerHTML = "";
        if (this.notiState === "block"){
            const hidedI = E("i");
            hidedI.classList.add("material-symbols-outlined");
            hidedI.textContent = "block";
            notiIcons.appendChild(hidedI);
            return true;
        }
        for (const noti of this.notis){
            const notiPrevB = E("b");
            const appObj = AppManager.getAppObj(noti.appPackage);
            notiPrevB.textContent = appObj.icon.split("?text=")[1].replace("+", " ");
            notiIcons.appendChild(notiPrevB);
        }
    }
}
/*
NOTIFICATIONS STATES:
- "show":   Sonido, IconoPreview, PopupSuperior
- "muted":        , IconoPreview, PopupSuperior
- "hide":         , IconoPreview,
- "block":
*/
