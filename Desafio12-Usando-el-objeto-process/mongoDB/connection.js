const config = {
    mongodb: {
        conexionDB: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.dsepao7.mongodb.net/test`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
}

module.exports = config