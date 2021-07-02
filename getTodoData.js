const todosUrl = "https://jsonplaceholder.typicode.com/todos";
const fetch =require('node-fetch');
/*Firstly ,we will define a function which will fetch the user data and todos data 
from the given URL*/
module.exports.getTodoData= async() =>{
    try {
    let response = await fetch(todosUrl);
    let todos = await response.json();
    return todos;
    } catch (error) {
        console.error(error);
        return "error";
    }
    
} 