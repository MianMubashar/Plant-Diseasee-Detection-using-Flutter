const mongoose=require('mongoose');
//const documentDB_URL=process.env.DB_CLUSTER_CONNECTION;
//const mongodbClusterUrl=process.env.MONGODB_CLUSTER_URL;\
mongoose.connect('mongodb://localhost/fypDB', {
   // sslValidate: true,
    //sslCA:ca,
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify:false,
   
}).then(res=>console.log("connected  to MongoDB")).catch(err=>console.log(err));