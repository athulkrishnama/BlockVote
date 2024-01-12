const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;
const {main,get} = require('./connection')
main()

app.use(cors());
app.use(express.json());


app.post('/login', (req ,res )=>{
  
})

app.post('/signup', (req, res)=>{
  
})


app.listen(PORT, () => {
  console.log(`Server is running on port 8000.`);
});