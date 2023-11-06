const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Joi = require('joi');
const app = express();
const fs = require('fs');

app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'indeks.html'));
});

app.post('/novo-jelo', (req, res) => {
    const schema = Joi.object({
        naziv: Joi.string().trim().min(5).max(25).required(),
        opis: Joi.string().trim().min(1).required(),
        kategorija: Joi.string().trim().min(1).required(),
        cena: Joi.number().greater(0).required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
        res.status(400).json({ error: error.details[0].message });
    } else {
        const jelo = {
            naziv: req.body.naziv,
            opis: req.body.opis.replace(/\r?\n|\r/g, '<br>'),
            kategorija: req.body.kategorija,
            cena: req.body.cena
        };

        fs.appendFile('jela.txt', JSON.stringify(jelo) + '\n', function (err, succ) {
            if (err) {
                console.error('Greška pri upisu u datoteku: ' + err);
                res.status(500).json({ error: 'Došlo je do greške pri upisu.' });
            } else {
                console.log('Podaci su uspešno upisani u datoteku.');
                res.status(200).json({ success: 'Podaci su uspešno poslati. Očekujte odgovor uskoro.' });
            }
        });
    }
});
app.get("/jela", (req, res) => {
    // Pravimo prazan niz za jela
    const jela = [];

    // Čitamo sadržaj fajla jela.txt
    fs.readFile('jela.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Greška pri čitanju fajla:', err);
            res.status(500).json({ error: "Došlo je do greške" });
            return;
        }

        // Razdvajamo sadržaj po redovima
        const redovi = data.split('\n');

        // Iteriramo kroz redove i dodajemo ih u niz jela nakon parsiranja kao JSON objekte
        for (let i = 0; i < redovi.length; i++) {
            let obj = JSON.parse(redovi[i]);
            jela.push(obj);
        }

        // Šaljemo niz jela kao JSON odgovor
        res.json(jela);
    });
});


app.listen(8000, () => {
    console.log('Server radi na http://localhost:8000');
});

