import * as Mongo from "mongodb";

console.log("Database starting");

let databaseURL: string = "mongodb+srv://eia2:EI3YUugClITD2pNH@eiall.sdwaz.mongodb.net/EIAll?retryWrites=true&w=majority";
let databaseName: string = "EIAll";
let db: Mongo.Db;
let students: Mongo.Collection;

// running on heroku?
// if (process.env.NODE_ENV == "production") {
//     //    databaseURL = "mongodb://username:password@hostname:port/database";
//     databaseURL = "mongodb://eia2:EI3YUugClITD2pNH@eiall.sdwaz.mongodb.net/EIAll";
//     databaseName = "EIAll";
// }

// try to connect to database, then activate callback "handleConnect" 
Mongo.MongoClient.connect(databaseURL, handleConnect);

// connect-handler receives two standard parameters, an error object and a database object
function handleConnect(_e: Mongo.MongoError, _db: Mongo.Db): void {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db.db(databaseName);
        students = db.collection("students");
    }
}

export function insert(_doc: FireworkDefinition): void {
    // try insertion then activate callback "handleInsert"
    students.insertOne(_doc, handleInsert);
}

// insertion-handler receives an error object as standard parameter
function handleInsert(_e: Mongo.MongoError): void {
    console.log("Database insertion returned -> " + _e);
}

// try to fetch all documents from database, then activate callback
export function findAll(_callback: Function): void {
    // cursor points to the retreived set of documents in memory
    var cursor: Mongo.Cursor = students.find();
    // try to convert to array, then activate callback "prepareAnswer"
    cursor.toArray(prepareAnswer);

    // toArray-handler receives two standard parameters, an error object and the array
    // implemented as inner function, so _callback is in scope
    function prepareAnswer(_e: Mongo.MongoError, fireworkDefinitionArray: FireworkDefinition[]): void {
        if (_e)
            _callback("Error" + _e);
        else
            // stringify creates a json-string, passed it back to _callback
            _callback(JSON.stringify(fireworkDefinitionArray));
    }
}