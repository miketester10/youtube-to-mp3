'use-strict';

const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');

/*** Inizializzo Express ***/
const app = express();
const PORT = 8080;

/*** Route per scaricare il file audio da un video youtube *****/
app.get('/download', function(req, res) { // esempio di richiesta http://127.0.0.1:8080/download?url=https://www.youtube.com/watch?v=fXF59UWr-tA&format=wave
    const link = req.query.url;
    const format = req.query.format || 'mp3'; // se il formato non è specificato nell'url, impostalo su mp3
    console.log(`** Link: ${link} - Format: ${format} **`);

    const video = ytdl(link, { filter: 'audioonly' });

    video.pipe(fs.createWriteStream(`audio.${format}`));

    video.on('end', function () {
        res.json({ success: true });
    });

    video.on('error', function (error) {
        console.error('Errore:', error);
        res.status(500).json({ error: 'Errore interno al server' });
    });
});

app.listen(PORT, function(){
    console.log("Server in ascolto sulla porta 8080");
});

