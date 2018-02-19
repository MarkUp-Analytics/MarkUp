var configValues = require('./config.json');

module.exports = {
    getDBConnectionString : function(){
        return "mongodb://" + configValues.uname + ":" + configValues.pwd +
        "@peercentile-shard-00-00-woxsn.mongodb.net:27017,peercentile-shard-00-01-woxsn.mongodb.net:27017,peercentile-shard-00-02-woxsn.mongodb.net:27017/peercentile?ssl=true&replicaSet=Peercentile-shard-0&authSource=admin";
    }
}


