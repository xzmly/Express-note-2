var Sequelize = require('sequelize');
var path = require('path');

var sequelize = new Sequelize(undefined,undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',

  // SQLite only
  storage: path.join(__dirname, '../database/database.sqlite') 
});

//var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

// sequelize
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(function (err) {
//     console.log('Unable to connect to the database:', err);
//   });


// hello 11122999 45433333
const Note = sequelize.define('note', {
  text: {
    type: Sequelize.STRING
  },
  uid: {
  	type: Sequelize.STRING
  }
});
//Note.drop()
//Note.sync({force: true})

// Note.sync().then(function(){
//   Note.create({text:'hello wrold'})
// }).then(function(){
//   Note.findAll({raw:true}).then(notes => {
//     console.log(notes)
//   })
// });


// Note.findAll({raw: true,where: {id:2}}).then(function(notes){
//   console.log(notes)
// })

module.exports.Note = Note;
