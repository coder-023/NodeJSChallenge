const express = require('express');
const app = express();
const fetch =require('node-fetch');
const userUrl = "https://jsonplaceholder.typicode.com/users/";
const Todos = require('./getTodoData');

/*The below function will collect all the userinfo based on the id */
const getUserData= async(id) =>{
    try {
    const url = userUrl + id; 
    let response = await fetch(url);
    let userinfo = await response.json();
    if(!userinfo) return "error";
    else return userinfo;
    } 
    catch (error) {
    console.error(error);
    return "error";
    }
    
} 


/*From the user info's JSON, we need only specific key value pairs to be in our 
 final object. So, first, we defined the array of required keys. Now, we will iterate 
 through each individual key and dynamically create a user_obj object with the require 
 keys */

let user_final = (data)=>{
    let flag=false;
    let user_obj = {};
  const required_keys = ["id","name","email","phone"];
  required_keys.forEach((e)=>{ 
       if(flag==false){
         flag=true;
         user_obj={
         [e]:data[e],}
        }
        else user_obj = {...user_obj,[e]:data[e],}
    })
    return user_obj;
} 

/*In the below function, we are just fetching todos of a given userid. Also, in the 
final array of objects, we don't want userId. So we are deleting it */
let user_todos =  (id,todos)=>{
    todos_arr=[];
   for(var i=0;i<todos.length;i++){
        if(parseInt(todos[i]["userId"])===id){
             delete todos[i]["userId"];
             todos_arr.push(todos[i]);
        }
    }
    return todos_arr;
}
//Solution 1
app.get('/todos',(req,res)=>{
    
    Todos.getTodoData().then((data)=>{
       if(data==="error") return res.status(404).send("There was an error in fetching an api")
        else{
        let datacpy=data;                       //Keeping the original copy safe!
        var newobj=[];
        for(var i=0;i<datacpy.length;i++){        //This is done to get rid of userId
            delete datacpy[i].userId;
            newobj.push(datacpy[i]); 
        }
/*This is a final object which is free of userId. The below object is the answer
of first statement*/
        res.json(newobj);     
        
}})
});

//Solution 2
app.get('/user/:id',(req,res)=>{
const id = parseInt(req.params.id);
var todos = [];
getUserData(id).then((userdata)=>{
try {
    if(userdata==={ })
    return  res.status(404).send("Not found");
    let user_obj=user_final(userdata);
    Todos.getTodoData().then((data) =>{
    if(userdata=="error")
    return  res.status(404).send("Not found");
    todos= user_todos(id,data);
    if(todos.length==0) return res.status(404).send("Cannot be fetched...");
    user_obj = {...user_obj,"todos":todos};
    res.json(user_obj);
   } )  
    } 
    catch (error) {
        res.status(400).send("Badddd");
    }
   })  
})


  const port= process.env.PORT || 3000;
  app.listen(port,()=>{
      console.log(`Listening on port ${port}....`);
  });