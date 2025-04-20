// static/script.js
let navigationStack = [];
let actualApp = null;
let isNotificationsOpen = false;
let openApps = [];
let currY = 0;
const formatTime = secs => `${Math.floor(secs / 60)}:${Math.floor(secs % 60).toString().padStart(2, "0")}`;
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// ===== SISTEMA ===== //
function initSystem(){
    // Interactuar con iconos
    document.querySelector(".desktop").addEventListener("click", function(e){
        const icon = e.target.closest(".icon");
        if (!icon) return;
        const target = icon.getAttribute("data-app");
        if (target !== null){
            showApp(`${target}-app`);
        } else {
            console.log("No tiene app");
        };
    });
    // Expandir notificaciones
    document.querySelector(".noti-box").addEventListener("click", (e)=>{
        const tar = e.target.closest(".header");
        const noti = tar.closest(".noti");
        if (noti && tar){
            noti.classList.toggle("open");
        }
    });
    // Borrar notificaciones
    document.querySelectorAll(".noti-box .noti").forEach(noti =>{
        let currX = 0;
        noti.addEventListener("touchstart", (e)=>{
            currX = e.touches[0].clientX;
        });
        noti.addEventListener("touchmove", (e)=>{
            if (currX + 100 < e.touches[0].clientX){
                const tar = e.target.closest(".noti");
                tar.classList.add("hide");
                setTimeout(()=>{
                    tar.remove();
                }, 350);
            };
        });
    });
    // Expandir barra de notificaciones
    document.querySelector(".status-bar").addEventListener("touchstart", (e)=>{
        currY = e.touches[0].clientY;
    });
    document.querySelector(".status-bar").addEventListener("touchmove", (e)=>{
        const bar = document.querySelector(".notifications-bar");
        const newY = e.touches[0].clientY;
        if (currY < newY && !isNotificationsOpen){
            bar.classList.remove("hide");
            isNotificationsOpen = true;
        } else if (currY > newY && isNotificationsOpen){
            bar.classList.add("hide");
            isNotificationsOpen = false;
        }
    });
    // Interactuar con audios
    document.querySelectorAll(".audio-box").forEach(box =>{
        const playBtn = box.querySelector("#playBtn");
        const audio = box.querySelector("#audio");
        const current = box.querySelector("#current");
        const duration = box.querySelector("#duration");
        const seekbar = box.querySelector("#seekbar");
        audio.addEventListener("loadedmetadata", ()=>{
            duration.innerText = formatTime(audio.duration)
        });
        playBtn.addEventListener("click", ()=>{
            if (audio.paused){
                audio.play();
                playBtn.innerText = "||";
            } else {
                audio.pause();
                playBtn.innerText = "▶";
            }
        });
        seekbar.addEventListener("input", ()=>{
            const val = (seekbar.value / 100) * audio.duration;
            current.innerText = formatTime(val);
            audio.currentTime = val;
        });
        audio.addEventListener("timeupdate", ()=>{
            seekbar.value = (audio.currentTime / audio.duration) * 100 || 0;
            current.innerText = formatTime(audio.currentTime);
        });
    });
}
function installApp(name, icon, app, quest=true){
    let accepted = true
    if (quest){
        accepted = confirm(`¿Estás seguro que quieres instalar '${name}'?`);
    }
    if (!accepted) return;
    showToast(`Instalando '${name}' (logs en consola)...`);
    console.warn(`--- INSTALLING ---\n- NAME:\n${name}\n-ICON:\n${icon}\n-APP:\n${app}\n--- LOG END ---`)
    document.querySelector(".desktop").insertAdjacentHTML("beforeend", icon)
    document.body.querySelector("div.helper").insertAdjacentHTML("beforeend", app);
}
// ===== "MANEJAMIENTO" DE APPS ===== //
function showApp(id){
    navigationStack = [];
    const app = document.getElementById(id);
    if (app === null){
        alert(`Error: App no existe: ${id}`);
        return;
    }
    const mainScreen = app.querySelector("#MAIN-screen");
    if (mainScreen === null){
        console.error("No tiene pantalla principal (SCREEN MAIN)");
        return;
    }
    setTimeout(()=>{
        navigateTo(app, "MAIN");
        app.style.display = "block";
        void app.offsetWidth;
        app.classList.remove("hide");
        actualApp = app;
    }, 200);
}
//showApp("Settings-app")
function hideApp(cntxt){
    const app = cntxt.closest(".app");
    setTimeout(()=>{
        app.classList.add("hide");
        setTimeout(()=>{
            app.style.display = "none";
            app.querySelectorAll(".screen").forEach(screen => screen.style.display="none")
        }, 200);
    }, 200);
}
function navigateTo(cntxt, id, save=true){
    const app = cntxt.closest(".app");
    const currScreen = Array.from(app.querySelectorAll(".screen")).find(screen=>{
        return window.getComputedStyle(screen).display === "block";
    });
    if (currScreen && save){
        navigationStack.push({
            app: app,
            screen: currScreen.id.split("-screen")[0]
        })
    }
    app.querySelectorAll(".screen").forEach(screen=>{
        screen.style.display = "none";
    });
    const screen = app.querySelector(`#${id}-screen`);
    if (screen === null){
        console.error(`La pantalla '${id}' no existe`);
        return;
    }
    screen.style.display = "block";
}
// ===== ALERTAS Y ELEMENTOS ===== //
function sendNotification(title, content, appName="Sistema", options={}) {
    // Opciones defaults con espacio para el humor
    const defaults = {
        time: "Ahora", // o puede ser "1 hora", "5 min", etc.
        isOpen: false, // si la noti aparece expandida
        actions: ["👍", "👎"], // botones personalizables
        urgent: false, // ¿Notificación de "ABUELA EN LLAMADA"?
    };
    const config = { ...defaults, ...options };

    // Estructura dinámica pero con normas flexibles
    const notiHTML = `
    <div class="noti ${config.isOpen ? 'open' : ''}" ${config.urgent ? 'style="border-left: 5px solid #ff0000aa;"' : ''}>
        <div class="header">
            <b>${title}</b>
            <small> • ${appName}</small>
            <small> • ${config.time}</small>
        </div>
        <div class="content">
            <p>${content}</p>
        </div>
        <div class="actions">
            ${config.actions.map(action => 
                `<button onclick="this.closest('.noti').remove()">${action}</button>`
            ).join('')}
        </div>
    </div>`;

    // ¡Inyectar la notificación como un meme en el grupo familiar!
    document.querySelector(".noti-box").insertAdjacentHTML("afterbegin", notiHTML);
}
function showToast(msg, time=2000){
    let toast = document.getElementById("globalToast");
    if (toast === null){
        toast = document.createElement("div");
        toast.id = "globalToast";
        toast.classList.add("toast", "hide");
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<p>${msg}</p>`;
    toast.style.display = "flex";
    void toast.offsetWidth;
    toast.classList.remove("hide");
    setTimeout(()=>{
        toast.classList.add("hide");
        setTimeout(()=>{
            toast.style.display = "none";
        }, 500)
    }, time)
}
function showAlert(msg){
    let alrt = document.getElementById("globalAlert");
    if (alrt === null){
        alrt = document.createElement("div");
        alrt.id = "globalAlert";
        alrt.classList.add("alertPopup", "hide");
        document.body.appendChild(alrt);
    }
    alrt.innerHTML = `
    <div class="content">
        <p>${msg}</p>
    </div>
    <div class="footer">
        <button onclick="hideAlert(this)">Aceptar</button>
    </div>`;
    alrt.style.display = "block";
    void alrt.offsetWidth;
    alrt.classList.remove("hide");
}
function hideAlert(cntxt){
    const alrt = cntxt.closest(".alertPopup");
    alrt.classList.add("hide");
    setTimeout(()=>{
        alrt.style.display = "none";
    }, 300);
}
// ===== NAVEGACION ===== //
function showOpenApps(){
    // TODO: Terminar esto
}
function goHome(){
    if (isNotificationsOpen){
        setTimeout(()=>{
            document.querySelector(".notifications-bar").classList.add("hide");
            isNotificationsOpen = false;
        }, 200);
    }
    if (actualApp === null){
        console.log("No hay apps abiertas");
        return;
    }
    hideApp(actualApp);
    actualApp = null;
    return;
}
function goBack(){
    if (isNotificationsOpen){
        setTimeout(()=>{
            document.querySelector(".notifications-bar").classList.add("hide");
            isNotificationsOpen = false;
        }, 200);
        return;
    }
    if (navigationStack.length === 0){
        if (actualApp === null){
            console.log("No hay apps abiertas");
            return;
        }
        hideApp(actualApp);
        actualApp = null;
        return;
    }
    const prevStat = navigationStack.pop();
    const app = prevStat.app;
    const screen = prevStat.screen;
    navigateTo(app, screen, save=false);
}
