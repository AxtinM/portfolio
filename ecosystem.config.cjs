module.exports = {
  apps: [{
    name: "portfolio",
    script: "npm start -- -p 4000",
    instances: "1",
    autorestart: true,
    watch: false
  }]
}
