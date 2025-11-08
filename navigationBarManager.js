// navigationBarManager.js
const NavigationBarManager = {
    goBack(){
        const currAct = ActivityManager.currActivity;
        if (currAct){
            ActivityManager.finishActivity(currAct.appPackage, currAct.activityName);
            return true;
        }
        // wtf JAJJAJ
        if (randint(1, 100) == 12) ToastManager.show("¿Acaso quieres salir del launcher we?");
        return false;
    },
    goHome(){
        const currAct = ActivityManager.currActivity;
        if (currAct){
            let c = 0;
            while (ActivityManager.currActivity){
                ActivityManager.finishActivity(currAct.appPackage, currAct.activityName);
                c++;
            }
            console.log(`${c} apps cerradas`);
            return true;
        }
        // wtf JAJJAJ
        if (randint(1, 100) == 12) ToastManager.show("¿Acaso quieres salir del launcher we?");
        return false;
    },
    apply(){
        navigationBar.innerHTML = "";
        const backBtn = E("button");
        backBtn.innerHTML = `<i class="material-symbols-outlined">chevron_left</i>`;
        backBtn.id = "backBtn";
        backBtn.onclick = ()=> NavigationBarManager.goBack();
        const homeBtn = E("button");
        homeBtn.innerHTML = `<i class="material-symbols-outlined">circle</i>`;
        homeBtn.id = "homeBtn";
        homeBtn.onclick = ()=> NavigationBarManager.goHome();
        const recentBtn = E("button");
        recentBtn.innerHTML = `<i class="material-symbols-outlined">square</i>`;
        recentBtn.id = "recentBtn";
        recentBtn.onclick = ()=> ToastManager.show("'RecentButton' dice: Implementame!🗣🔥");
        navigationBar.appendChild(backBtn);
        navigationBar.appendChild(homeBtn);
        navigationBar.appendChild(recentBtn);
    }
}
