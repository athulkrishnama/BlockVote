const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;
const {main,get} = require('./connection')
main()

app.use(cors());
app.use(express.json());


app.post('/login', (req ,res )=>{
  const {email, password} = req.body;
  get().collection('voters').findOne({email}).then((data)=>{
    if(data){
      if(data.password === password){
        res.status(200).json({status:200, login:true, user: data})
      }
      else{
        res.status(404).json({status:404, message:'Wrong password'})
      }
    }
    else{
      res.status(401).json({status:401, message:'user not found'})
    }
  })
})

app.post('/signup', (req, res)=>{
  const data = req.body
  get().collection('voters').insertOne(data).then(()=>{
    console.log('Registed Successfully')
    res.send({})
  }).catch((err)=>{
    console.log(err)
    res.status(404)
  })
})


app.listen(PORT, () => {
  console.log(`Server is running on port 8000.`);
});