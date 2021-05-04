const mongoose= require ('mongoose');

mongoose

.connect("mongodb+srv://"+process.env.DB_USER_PASS+"@cluster0.9o3fd.mongodb.net/sikieyeDB",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    userCreateIndex: true ,
    userFindAndModify: false

}).then(()=> console.log("DB Connected"))
.catch( (err)=> console.log('Failed to connect to DB', err));
