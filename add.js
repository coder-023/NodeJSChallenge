const User = require('./getUserData');
User.getUserData(id).then((userdata)=>{  
      console.log(userdata);
});









// module.exports.add = (a,b) =>{
//     return parseInt(a)+parseInt(b)

// };
// const sub = (a,b) =>{
//     return parseInt(a) - parseInt(b)
// }

// module.exports = {add,sub};