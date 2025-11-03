// statusBarManager.js
const StatusBarManager = {
    notificationsPanelShowed: false,
    statIcons: {
        notifications: [true, `<i class="material-symbols-outlined" id="statNotifications"></i>`],
        wifi: [true, `<i class="material-symbols-outlined" id="statWifi">android_wifi_4_bar</i>`],
        signal: [true, `<i class="material-symbols-outlined" id="statSignal">android_cell_4_bar</i>`],
        bluetooth: [false, `<i class="material-symbols-outlined" id="statLab">bluetooth</i>`],
        lab: [true, `<i class="material-symbols-outlined" id="statLab">science</i>`],
        battery: [true, `<i class="material-symbols-outlined" id="statBattery">battery_horiz_000</i>`]
    },
    // ["SHOW_STATUS_ICON"] (P_MANAGE_STATUS_BAR)
    showStatIcon(iconName){
        if (!Object.keys(this.statIcons).includes(iconName)){
            console.warn(`El ícono de estado '${iconName}' no existe.`);
            return false;
        }
        this.statIcons[iconName][0] = true;
        this.apply();
        return true;
    },
    // ["HIDE_STATUS_ICON"] (P_MANAGE_STATUS_BAR)
    hideStatIcon(iconName){
        if (!Object.keys(this.statIcons).includes(iconName)){
            console.warn(`El ícono de estado '${iconName}' no existe.`);
            return false;
        }
        this.statIcons[iconName][0] = false;
        this.apply();
        return true;
    },
    // ["SET_STATUS_BAR_BACKGROUND"] (P_MANAGE_STATUS_BAR)
    setBackground(color){
        statusBar.style.background = color;
    },
    // ["TOGGLE_NOTIFICATIONS_PANEL"] (P_MANAGE_STATUS_BAR)
    toggleNotificationsPanel(){
        if (this.notificationsPanelShowed){
            statusBar.classList.remove("show");
        } else {
            statusBar.classList.add("show");
        }
        this.notificationsPanelShowed = !this.notificationsPanelShowed;
    },
    _statusBarActionTouchStart(e){
        this.startY = e.touches[0].clientY;
        console.log(this.startY);
    },
    _statusBarActionTouchEnd(e){
        const endY = e.changedTouches[0].clientY;
        console.log(endY);
        if (endY > this.startY + SystemConfig.getConfigValue("statusBarMinSwipe")){
            this.toggleNotificationsPanel();
        }
    },
    apply(){
        statIcons.innerHTML = "";
        for (const iconStat of Object.values(this.statIcons)){
            if (iconStat[0]){
                statIcons.innerHTML += iconStat[1];
            }
        }
        
        const statNoti = $("#statNotifications", statIcons);
        if (statNoti){
            switch (NotificationManager.getState()){
                case "show":
                    statNoti.textContent = "notifications";
                    break;
                case "muted":
                    statNoti.textContent = "mobile_vibrate";
                    break;
                case "hide":
                    statNoti.textContent = "notifications_off";
                    break;
                case "block":
                    statNoti.textContent = "notifications_off";
                    break;
            }
        }
    }
}