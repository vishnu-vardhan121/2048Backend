const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const check = await collection.findOne({ email: email });
    if (check) {
      if(check.password===password){
        res.json("success")
      }else{
        res.json("wrong password")
      }
    } else {
      res.json("notexist");
    }
  } catch (error) {
    res.json("notexist");
  }
});


app.post("/signin", async (req, res) => {
  const { name,email, password } = req.body;
    console.log(req.body);
    
  const data= {
    email:email,
    password:password,
    name:name,
    score:0
  }
  try {
    const check = await collection.findOne({email:email})

    if(check){
        res.json("exist")
    }else{
        
        await collection.insertMany([data])
        res.json("notexist")
    }
    
  } catch (error) {
    res.json("notexist");
  }
});


app.post("/data",(req,res)=>{
  collection.find({}).lean()
  .then((result) => {
    if(result){
      console.log(result);
      return res.json(result);
    }
  }).catch((err) => {
    res.json(err)
  });
  
}) 

app.post("/setscore", (req, res) => {
  const { score, email } = req.body;  

  collection.updateOne(
    { email: email },  
    { $set: { score: score } }, 
    { upsert: true } 
  )
  .then((result) => {
    if (result.matchedCount > 0) {
      res.json({ message: "Score updated successfully", result });
    } else if (result.upsertedCount > 0) {
      res.json({ message: "New user created and score set", result });
    } else {
      res.json({ message: "No matching user found", result });
    }
  })
  .catch((err) => {
    res.json({ message: "Error updating score", error: err });
  });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
