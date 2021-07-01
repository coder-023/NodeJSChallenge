const express = require('express');
const app = express();
const fetch =require('node-fetch');
const axios = require('axios');
const todosUrl = "https://jsonplaceholder.typicode.com/todos";
const userUrl = "https://jsonplaceholder.typicode.com/users/";
// console.log(userUrl+'1');
// app.use(express.json());







const getTodoData= async() =>{
    try {
    let response = await fetch(todosUrl);
    let todos = await response.json();
    return todos;
    } catch (error) {
        console.error(error);
        return "error";
    }
    
} 

const getUserData= async(id) =>{
    try {
        const url = userUrl + id;
        // console.log(url);
    let response = await fetch(url);
   
    let todos = await response.json();

    return todos;
    } catch (error) {
        console.error(error);
        return "error";
    }
    
} 





let user_final = (data)=>{
    let flag=false;
    let user_obj = {};
     // console.log(data);
  const required_keys = ["id","name","email","phone"];
  //   const keys_present = Object.keys(data);
  //   console.log(keys_present);
    required_keys.forEach((e)=>{
        if (required_keys.includes(e))
        {
            if(flag==false){
                flag=true;
            user_obj={
                [e]:data[e],}
            }
            else{
                user_obj = {...user_obj,[e]:data[e],}
            }
        }
        
    })
    return user_obj;
} 


let user_todos =  (id,todos)=>{
    let flag=false;
    todos_arr=[];
    

    

    // console.log(todos);
    for(var i=0;i<todos.length;i++)
    {
        if(parseInt(todos[i]["userId"])===id)
        {
            // console.log(todos[i]);
            delete todos[i]["userId"];
            todos_arr.push(todos[i]);
        }
    }
    return todos_arr;
    
    
    



}









app.get('/todos',(req,res)=>{
    
    getTodoData().then((data)=>{
       
        if(data==="error")
            return res.status(404).send("There was an error in fetching an api")
        else{
        let datacpy=data;                       //Keeping the original copy safe!
        var newobj=[];
        for(var i=0;i<datacpy.length;i++){        //This is done to get rid of userId
            
                delete datacpy[i].userId;
                newobj.push(datacpy[i]); 
            
        }
        
        res.json(newobj);     //This is a final object which is free of userId
        
}}
    )

});


app.get('/user/:id',(req,res)=>{
const id = parseInt(req.params.id);
var todos = [];
getUserData(id).then((data)=>{
    try {
        let user_obj=user_final(data);
   getTodoData().then((data) =>{
    todos=  user_todos(id,data);
    user_obj = {...user_obj,"todos":todos};
    // console.log(user_obj);
    res.json(user_obj);
   } )  
    } 
    catch (error) {
        res.status(400).send("Badddd");
    }
   


   })
   //    console.log(user_obj); working
   
  
  
  
})
// getTodoData().then((data)=>{









// const getTodoData2 = async()=>
// {
//     let {data}= await axios.get(url);
//      console.log({data})
// }

// getTodoData2();









// var options = {
//     'method': 'GET',
//     'url': url,
    
//   };
//   const result1 = async ()=>{ 
//       result = await axios(options);
   
  
//   }
//   const data = async()=>{
//       try {
//           var {data} = await axios.get(url);
//           return {data};
//       } catch (error) {
//           console.error(error);
//       }
//   }
//   console.log(data());
  
 
  // You cclsan print/use 'result' here.














  const port= process.env.PORT || 3000;
  app.listen(port,()=>{
      console.log(`Listening on port ${port}....`);
  });