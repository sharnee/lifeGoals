const mongoose = require('mongoose');

// ----------------------
// USERS
// ----------------------
const usersSchema = new mongoose.Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  
   // example of optional fields
  name:      { type: String },
  createdAt: { type: Date, default: Date.now }, 
  firstName: { type: String},
  lastName: {type: String}, 
  phone: {type: String}, 
  address: {type: String}

})

const goalSchema = new mongoose.Schema({
  goal: {type: String, required: true},
  notes: {type: String},
  complete: {type: Boolean, default: false, required: true},
  userID:  {type: String, required: true},
  difficulty: {type: String},
  createdAt: {type: Date, default: Date.now}
})


module.exports = {
  User: mongoose.model('User', usersSchema),
  Goal: mongoose.model('Goal', goalSchema)
}
