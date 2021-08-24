const mongoose= require('mongoose');
 const userSchema = mongoose.Schema({
   userEmail:{type:String},
   userPassword:{type:String},
   userName:{type:String}
 })
 module.exports = mongoose.model('user',userSchema);