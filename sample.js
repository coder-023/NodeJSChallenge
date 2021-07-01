// var obj = {a: 1, b: 2, c:3, d:4 ,e:5};
// for (var key in obj) {
//   if (obj.hasOwnProperty(key)) {
//       if (['b','e'].includes(key)){

//           var val = obj[key];
//           console.log(val);
//       }
//       else{
//           continue;
//       }
//   }
// }

//This will be useful for filtering out only the required elements from user object!
var obj = [{
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
    },
    {
    "id": 3,
    "title": "fugiat veniam minus",
    "completed": false
    }];                    //This is the obj from which we want only specific elements only
    
    
//Now we will go through every object present in an array. keyy is an array of all keys in that object["id","title","completed"].Now we will iterate through every key from the keyy array and we will check whether the individual key is present in array of given keys(['id','title']).If not present, then we will delete that key value pair   
    
let keyy= Object.keys(obj[1]);
console.log(keyy);
    obj.forEach((e)=>{
        
    for(var key in keyy)
    {   
        // console.log(key);
    
     if(['completed','title'].includes(keyy[key]))
     {
         var index = keyy[key];
          //var val = e[index];
        //  console.log(val);
     
    }
    else
    {
        var index= keyy[key];
        delete e[index];
    }
    }  })
    console.log(obj);//outputs the object containing only the specified keys