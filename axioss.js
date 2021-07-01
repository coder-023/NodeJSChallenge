const axios = require('axios');
const url = "https://jsonplaceholder.typicode.com/todos";

//This is to get all the information other than required data
var options = {
    'method': 'GET',
    'url': url,
    
  };
  const result1 = async ()=>{ 
      result = await axios(options);
      console.log(result);
  
 }

 result1();













// const getData2 = async()=>
// {
//     let {data}= await axios.get(url);
//      return {data};
// }

// getData2().then(
    
// (data)=> {
// // console.log(data);
// console.log(typeof(data));
// })     