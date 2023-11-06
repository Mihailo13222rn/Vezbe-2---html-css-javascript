window.addEventListener("load", function() {
    document.getElementById("forma").addEventListener("submit", function(event) {
        var validno = true;

        // Provera dužine vrednosti polja "naziv"
        if (document.getElementById("naziv").value.length < 3) {
            validno = false;
            document.getElementById("naziv").classList.add("error");
            document.getElementById("naziv").classList.remove("success");
        } else {
            document.getElementById("naziv").classList.add("success");
            document.getElementById("naziv").classList.remove("error");
        }

        // Dohvatanje svih span elemenata u #sastojci
        var spanovi = document.querySelectorAll("#sastojci > span.badge");

        // Kreiranje niza za čuvanje id-eva sastojaka
        var niz = [];

        // Prolazimo kroz sve span-ove i dodajemo id-eve u niz
        for (let i = 0; i < spanovi.length; i++) {
            niz.push(spanovi[i].dataset.id);
        }

        // Pretvaranje niza u JSON string
        var sastojciJSON = JSON.stringify(niz);

        // Postavljanje vrednosti skrivenog input polja na JSON string sastojaka
        document.getElementById("sastojci-input").value = sastojciJSON;

        if (!validno) {
            event.preventDefault();
        }
    });

    var sastojakSelect = document.getElementById("spisak-sastojaka");
    var dodajSastojakButton = document.getElementById("dodaj-sastojak");
    var sastojciList = document.getElementById("sastojci");

    dodajSastojakButton.addEventListener("click", function() {
        var selectedOption = sastojakSelect.options[sastojakSelect.selectedIndex];
        if (selectedOption.value) {
            var sastojakId = selectedOption.value;
            var sastojakNaziv = selectedOption.text;
            dodajSastojak(sastojakId, sastojakNaziv);
        }
    });

    sastojciList.addEventListener("click", function(event) {
        if (event.target.classList.contains("obrisiSastojak")) {
            var sastojakId = event.target.getAttribute("data-sastojak-id");
            ukloniSastojak(sastojakId);
        }
    });

    function dodajSastojak(id, naziv) {
        var sastojakOption = document.querySelector(`#spisak-sastojaka > option[value='${id}']`);
        if (sastojakOption) {
            var span = document.createElement("span");
            span.classList.add("badge");
            span.classList.add("bg-secondary");
            span.dataset.id = id;
            span.innerHTML = naziv;

            var button = document.createElement("button");
            button.type = "button";
            button.classList.add("btn");
            button.classList.add("btn-default");
            button.classList.add("btn-sm");
            button.innerHTML = "X";

            button.addEventListener("click", function() {
                var id = this.parentNode.dataset.id;
                this.parentNode.parentNode.removeChild(this.parentNode);
                document.querySelector(`#spisak-sastojaka > option[value='${id}']`).disabled = false;
            });

            span.appendChild(button);
            document.getElementById("sastojci").appendChild(span);

            sastojakOption.disabled = true;
            sastojakSelect.selectedIndex = 0;
        }
    }

    function ukloniSastojak(id) {
        var sastojakElement = document.querySelector(`#sastojci > span.badge[data-id='${id}']`);
        if (sastojakElement) {
            sastojciList.removeChild(sastojakElement);
            document.querySelector(`#spisak-sastojaka > option[value='${id}']`).disabled = false;
        }
    }
});
