// toastManager.js
const ToastManager = {
    show(msg){
        const toastDiv = E("div");
        toastDiv.className = "toast hide";
        desktop.appendChild(toastDiv);
        toastDiv.textContent = msg;
        void toastDiv.offsetWidth;
        toastDiv.classList.remove("hide");
        setTimeout(()=>{
            toastDiv.classList.add("hide");
            setTimeout(()=>{
                toastDiv.remove();
            }, 500);
        }, 2000);
    }
}