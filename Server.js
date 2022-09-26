

import http from 'http';
import dotenv from 'dotenv';
import { readFileSync,writeFileSync } from 'fs';
import { findLastId } from './utility/function.js';

//Envirnmont init
dotenv.config();
const PORT =process.env.SERVER_PORT;

// Data Management
const students_json = readFileSync('./data/Student.json');
const students_obj = JSON.parse(students_json)


// Server Create

http.createServer((req,res) => {
    
    // Routing
     if (req.url ==='/api/student' && req.method == 'GET') {
        res.writeHead(200,{'Content-Type' : "application/json" })
        res.end(students_json)
     }else if(req.url.match(/\/api\/student\/[0-9]{1,}/) && req.method == 'GET'){

        let id = req.url.split('/')[3];
        if (students_obj.some(data => data.id == id)) {
            res.writeHead(200,{'Content-Type' : "application/json" })
            res.end(JSON.stringify(students_obj.find(data => data.id == id)))  
        } else {
            res.writeHead(200,{'Content-Type' : "application/json" })
            res.end(JSON.stringify({
                massage : "Student not Found"
            }))
        }
  
     } else if(req.url ==='/api/student' && req.method == 'POST'){ 
        // Req data handle
        let data = '';
        req.on('data',(chunk) => {
            data += chunk.toString();
        });
        req.on('end',() => {
            let { name,age,skill,location } = JSON.parse(data)
            students_obj.push({
                id : findLastId(students_obj),
                name : name,
                skill : skill,
                age : age,
                location : location
            });
            writeFileSync('./data/Student.json',JSON.stringify(students_obj))
        });
        res.writeHead(200,{'Content-Type' : "application/json" })
        res.end(JSON.stringify({
            massage : "New Student Data Successful"
        }))
     } else if(req.url.match(/\/api\/student\/[0-9]{1,}/) && req.method == 'DELETE'){

        let id = req.url.split('/')[3];
        let deleteData = students_obj.filter(stu => stu.id != id);
        writeFileSync('./data/Student.json',JSON.stringify(deleteData));

        res.writeHead(200,{'Content-Type' : "application/json" })
        res.end(JSON.stringify({
            massage : "Student Data Deleted Successful"
        }));
     } else if ( req.url.match(/\/api\/student\/[0-9]{1,}/) && req.method == 'PUT' ||  req.url.match(/\/api\/student\/[0-9]{1,}/) && req.method == 'PATCH' ) {
        let id = req.url.split('/')[3];
       // Req Data Handle
       let data = ''
       if ( students_obj.some(stu => stu.id == id) ) {
          req.on('data',(chunk) => {
            data += chunk.toString();
          })
          req.on('end',() =>{
             let updatadata = JSON.parse(data);

             students_obj[students_obj.findIndex(stu => stu.id == id)] = {
                id :updatadata.id,
                name :updatadata.name,
                skill: updatadata.skill,
                age : updatadata.age,
                location : updatadata.location
             };

             writeFileSync('./data/Student.json',JSON.stringify(students_obj));
             res.writeHead(200,{'Content-Type' : "application/json" })
             res.end(JSON.stringify({
                 massage : "Student Data Update Successful"
             }));
          });
       }

     }
      else {
        res.writeHead(200,{'Content-Type' : "application/json" })
        res.end(JSON.stringify({
            error : "Invalid Route"
        }))
     }

 
}).listen(PORT,() => {
    console.log(`server is runing on port ${ PORT }`);
})