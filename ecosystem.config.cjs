module.exports = {
  apps: [{
    name: 'portfolio', // Nom de votre application PM2
    script: 'serve',        // La commande à exécuter
    args: 'dist',         // Arguments pour la commande (le dossier de build)
    instances: '1',       // Nombre d'instances à exécuter (peut être 'max' pour utiliser tous les cœurs)
    autorestart: true,     // Redémarrer l'application en cas de crash
    watch: false,         // Ne pas surveiller les changements de fichiers (utile en production)
    env: {
      NODE_ENV: 'production' // Définir l'environnement sur production
    }
  }]
};
