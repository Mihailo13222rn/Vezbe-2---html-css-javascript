
function validacija(e) {
    var validno = true;
    var nazivInput = document.getElementById("naziv");

    if (nazivInput.value.length < 3) {
        validno = false;
        nazivInput.classList.add("error");
        nazivInput.classList.remove("success");
        console.log("Greška: Polje za naziv je prekratko.");
    } else {
        nazivInput.classList.add("success");
        nazivInput.classList.remove("error");
        console.log("Uspeh: Polje za naziv je ispravno.");
    }

    if (!validno) {
        e.preventDefault();
    }
    return validno;
}
