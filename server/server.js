const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mysql = require('mysql')


const connectionString = {host : "localhost", port : 3306,
    database : "enzigma", user : "root", password : "manager"};


const app = express()


app.use(cors())
app.use(morgan('combined'))
app.use(express.json({limit : '100mb'}))
app.use(express.urlencoded({extended : true, limit : '100mb'}))


app.get("/api/tasks", (request, response)=>
{
    let queryText = `select * from assignment`;
    let connection = mysql.createConnection(connectionString);
    connection.connect();
    connection.query(queryText, (err, result)=> {
        if(err == null)
        {
            var resultInString = JSON.stringify(result);
            response.setHeader("content-type", "application/json");
            response.write(resultInString);
            connection.end();
            response.end();
        }
        else
        {
            var errInString = JSON.stringify(err);
            response.setHeaders("content-type", "application/json");
            response.write(errInString);
            connection.end();
            response.end();
        }
    });
});


app.post("/api/task", (request, response)=>{
    let queryText = `insert into assignment(assigned_to, status, due_date, priority, comments) values('${request.body.assigned_to}','${request.body.status}','${request.body.due_date}','${request.body.priority}','${request.body.comments}')`;
    let connection = mysql.createConnection(connectionString);
    connection.connect();
    connection.query(queryText, (err, result)=> {
        if(err == null)
        {
            var resultInString = JSON.stringify(result);
            response.setHeader("content-type", "application/json");
            response.write(resultInString);
            connection.end();
            response.end();
        }
        else
        {
            var errInString = JSON.stringify(err);
            response.setHeader("content-type", "application/json");
            response.write(errInString);
            connection.end();
            response.end();
        }
    });
});


app.put("/api/task/:id", (request, response)=>{
    let queryText = `update assignment set assigned_to = '${request.body.assigned_to}', status = '${request.body.status}', due_date = '${request.body.due_date}', priority = '${request.body.priority}' comments = '${request.body.comments}', where id = '${request.params.id}';`;
    let connection = mysql.createConnection(connectionString);
    connection.connect();
    connection.query(queryText, (err, result)=> {
        if(err == null)
        {
            var resultInString = JSON.stringify(result);
            response.setHeader("content-type", "application/json");
            response.write(resultInString);
            connection.end();
            response.end();
        }
        else
        {
            var errInString = JSON.stringify(err);
            response.setHeader("content-type", "application/json");
            response.write(errInString);
            connection.end();
            response.end();
        }
    });
});


app.delete("/api/task/:id", (request, response)=>{
    let queryText = `delete from assignment where id = '${request.params.id}'`;
    let connection = mysql.createConnection(connectionString);
    connection.connect();
    connection.query(queryText, (err, result)=> {
        if(err == null)
        {
            var resultInString = JSON.stringify(result);
            response.setHeader("content-type", "application/json");
            response.write(resultInString);
            connection.end();
            response.end();
        }
        else
        {
            var errInString = JSON.stringify(err);
            response.setHeader("content-type", "application/json");
            response.write(errInString);
            connection.end();
            response.end();
        }
    });
});


app.listen(7582, '0.0.0.0', () => {
    console.log(`Server started on port 7582....`)
})
