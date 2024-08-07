const config = {
    port: 8000,
    db: {
        url: 'mongodb+srv://mihir:mihir@cluster0.ssu46.mongodb.net/HostelManagement?retryWrites=true&w=majority'
    },
    encryption: {
        saltRounds: 5,
        secret: 'Mihir'
    }
}

module.exports = config