// alertDialog.js
const AlertDialog = {
    _closeDialog(backdrop){
        backdrop.classList.add("hide");
        setTimeout(()=>{
            backdrop.remove();
        }, 200);
    },
    // ["SHOW_ALERT"]
    alert(appPackage, title, message, acceptBtnText, acceptAction){
        const backdropDiv = E("div");
        backdropDiv.classList.add("backdrop", "flex", "justify-center", "items-center", "hide");

        const alertDiv = E("div");
        alertDiv.classList.add("alertDialog");

        const titleStrong = E("strong");
        titleStrong.textContent = title;

        const messageP = E("p");
        messageP.textContent = message;

        const actionsDiv = E("div");
        actionsDiv.classList.add("actions", "flex", "justify-end");

        const acceptBtn = E("button");
        acceptBtn.textContent = acceptBtnText || "Aceptar";
        acceptBtn.onclick = ()=>{
            if (acceptAction) Calvik.execute(appPackage, acceptAction || []);
            this._closeDialog(backdropDiv);
        }

        actionsDiv.appendChild(acceptBtn);
        alertDiv.appendChild(titleStrong);
        alertDiv.appendChild(messageP);
        alertDiv.appendChild(actionsDiv);
        backdropDiv.appendChild(alertDiv);
        desktop.appendChild(backdropDiv);

        void backdropDiv.offsetWidth;
        backdropDiv.classList.remove("hide");
    }
}
