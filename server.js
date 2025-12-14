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

// Routes spécifiques pour la version anglaise - AVANT express.static
// Gestion de toutes les variantes de casse et trailing slash
// Note: Le dossier dans Git est 'en' (minuscules), donc on utilise 'en' ici
const enRoutes = ['/EN', '/EN/', '/en', '/en/'];
enRoutes.forEach(route => {
    app.get(route, (req, res) => {
        const filePath = path.join(__dirname, 'public', 'en', 'index.html');
        console.log(`Serving English version from: ${filePath}`);
        res.sendFile(filePath);
    });
});

// Route pour les fichiers statiques dans en/ (assets, CSS, JS)
// Cela permet de servir les fichiers statiques depuis /EN/assets/, /EN/style.css, etc.
// Note: Le dossier réel est 'en' (minuscules) mais on accepte /EN/ dans l'URL
app.use('/EN', express.static(path.join(__dirname, 'public', 'en'), {
    index: false // Ne pas servir index.html automatiquement pour /EN/
}));
app.use('/en', express.static(path.join(__dirname, 'public', 'en'), {
    index: false // Ne pas servir index.html automatiquement pour /en/
}));

// Servir les fichiers statiques APRÈS les routes spécifiques
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});