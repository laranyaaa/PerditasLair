const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.z29aq.mongodb.net/myFirstDatabasetest?retryWrites=true&w=majority";
const DATABASE_NAME = "online_shop";

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
var database, collection;


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("buyers");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.post("/buyers", (req, res) => {
    collection.insertOne(req.body, (error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result.result);
        console.log(result)
    });

});

app.get("/buyers/:id", (request, response) => {
    collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
  });

  app.get("/buyers", (req, res) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
});


  app.delete("/buyers/:id", (request, response) => {
    collection.deleteOne({"_id": new ObjectId(request.params.id)}, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send("Delete successfully");
    });
  });


app.patch("/buyers/:id", (request, response) => {
    collection.updateOne({"_id": new ObjectId(request.params.id)}, {$set: request.body }, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send("Updated successfully");
    });
  });  

