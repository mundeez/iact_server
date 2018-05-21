module.exports = {
  apps : [{
    name   : "ROCS",
    script : "./app.js",
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
       "NODE_ENV": "production"
    }
  }]
}
