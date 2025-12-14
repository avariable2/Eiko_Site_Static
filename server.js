const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8080;

// Route spécifique pour apple-app-site-association
app.get('/apple-app-site-association', (req, res) => {
    const filePath = path.join(__dirname, 'apple-app-site-association');
    
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Fichier AASA non trouvé:', err);
            return res.status(404).send('Not Found');
        }
        console.log('Fichier AASA trouvé');
        res.setHeader('Content-Type', 'application/json');
        res.sendFile(filePath);
    });
});

// Route pour .well-known/assetlinks.json
app.get('/.well-known/assetlinks.json', (req, res) => {
    const filePath = path.join(__dirname, '.well-known', 'assetlinks.json');

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Fichier assetlinks non trouvé:', err);
            return res.status(404).send('Not Found');
        }
        console.log('Fichier assetlinks trouvé');
        res.setHeader('Content-Type', 'application/json');
        res.sendFile(filePath);
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});