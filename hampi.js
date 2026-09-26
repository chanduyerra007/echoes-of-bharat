/* =====================================================
   HAMPI WEBSITE JAVASCRIPT
===================================================== */


/* ================================
   MONUMENT INFORMATION
================================ */

function showHampiInfo(title, description) {

    document.getElementById("hampiModalTitle").textContent =
        title;

    document.getElementById("hampiModalText").textContent =
        description;

    document
        .getElementById("hampiModal")
        .classList.add("active");
}


/* ================================
   CLOSE MODAL
================================ */

function closeHampiInfo() {

    document
        .getElementById("hampiModal")
        .classList.remove("active");
}


/* ================================
   CLOSE BY CLICKING OUTSIDE
================================ */

document
    .getElementById("hampiModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeHampiInfo();

        }

    });


/* ================================
   ESC KEY
================================ */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeHampiInfo();

    }

});


/* ================================
   VIRTUAL HAMPI
================================ */

function startHampiExperience() {
    window.location.href = "arcade/index.html#builder";

}
