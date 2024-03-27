const mongoose = require('mongoose');

const express = require('express')
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

const modelSchema = new mongoose.Schema({
  name: String,
  studentID: String,
})

const Model = mongoose.model('w24students',modelSchema);

function inserInfo(name, studentID) {
  const newUser = new Model({
    name: name,
    studentID: studentID,
  });
  return newUser.save();
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  
  const uri = req.body.myuri;
  console.log(uri);
  

  async function connectDB(mongoUri){
    try {
       const connectionInstance = await mongoose.connect(mongoUri);
         console.log("Connected to the database");
         console.log("Connected on: ",connectionInstance.connection.host);
    } catch (error) {
        console.log("Error connecting to the database");
        console.log(error);
    }
  }
  await connectDB(uri);
  
  insertData();
  
  res.send(`<h1>Document  Added</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

function insertData() {
  console.log("Inserting Data");
  try {
    const name = "Deepkamal Singh";
    const sid = "300377851";
    const result = inserInfo(name, sid);
    console.log("Data inserted", result);
    return result;
  } catch (error) {
    console.log("Error inserting data");

  }
}






