create a config file in the app directory.
create two files:
    1:auth.config.js-{
        add this configuration=>(
            module.exports = {
                secret: "you secret key"
  };
        )
    }
    2:db.config.js-{
        add this =>(
            module.exports = {
                HOST: "localhost",
                PORT: 27017,
                DB: "bezkoder_db",
                url:'mongodb+srv://<dbusername>:<userpassword>@cluster0.5neo1.mongodb.net/<choose a db name.any name will work.>?retryWrites=true&w=majority'
            };
        )
    }