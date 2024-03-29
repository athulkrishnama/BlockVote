const express = require("express");
const cors = require("cors");
const app = express();
const multer = require('multer')
const PORT = 8000;
const { main, get } = require('./connection')
main()

app.use(cors());
app.use('/uploads', express.static('uploads'))
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, req.body.metaid);
  },
});

const upload = multer({storage:storage})

const uploadImage = upload.single('image')

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  get().collection('voters').findOne({ email }).then((data) => {
    if (data) {
      if (data.password === password) {
        res.status(200).json({ status: 200, login: true, user: data })
      }
      else {
        res.status(404).json({ status: 404, message: 'Wrong password' })
      }
    }
    else {
      res.status(401).json({ status: 401, message: 'user not found' })
    }
  })
})

app.post('/signup', (req, res) => {
  const data = req.body
  //check email or metamaskid already exists
  get().collection('voters').find({ $or: [{ email: data.email }, { metaid: data.metaid }] }).toArray().then((arr) => {
    if (arr.length) {
      res.status(400).json({ status: 400, message: 'email or metamask id already registerd' })
    }
    //if not already exxists insert user into table
    else {
      get().collection('voters').insertOne(data).then(() => {
        console.log('Registed Successfully')
        res.send({})
      }).catch((err) => {
        console.log(err)
        res.status(400)
      })
    }
  })
})


app.get('/admin', (req, res) => {
  get().collection('admin').findOne().then((data) => {
    if (!data)
      res.status(200).send({ registerd: false })
    else
      res.status(200).send({ registerd: true })
  })


})


app.post('/adminregister', (req, res) => {
  get().collection('admin').findOne().then((data) => {
    if (!data) {
      get().collection('admin').insertOne(req.body).then(() => {
        res.status(200).send()
      })

      get().collection('election').insertOne({ election: req.body.election }).then()
    }
    else {
      res.status(400).send({ registerd: true })
    }
  })
})


app.post('/adminlogin', (req, res) => {
  get().collection('admin').findOne(req.body).then((data) => {
    if (data) {
      res.status(200).send(data)
    }
    else {
      res.status(404)
    }
  })
})


app.get('/voters', (req, res) => {
  get().collection('voters').find({ $and: [{ approve: { $exists: false } }, { rejected: { $exists: false } }] }).toArray().then((data) => {
    res.status(200).send({ voters: data })
  })
})

app.post('/approve', (req, res) => {
  const { metaid } = req.body
  get().collection('voters').updateOne({ metaid: metaid }, { $set: { approve: true } }).then((data) => {
    console.log(data)
    res.status(200).send()
  })
})

app.post('/reject', (req, res) => {
  const { metaid } = req.body
  get().collection('voters').updateOne({ metaid: metaid }, { $set: { rejected: true } }).then((data) => {
    console.log(data)
    res.status(200).send()
  })
})


app.get('/getElectionDetails', (req, res) => {
  get().collection('election').findOne().then((data) => {
    res.send(data)

  })
})

app.post('/getVoterDetails', (req, res) => {
  try {
    get().collection('voters').findOne(req.body).then((data) => {
      try {
        let obj={status:'pending'}
        if (data.approve) obj.status = 'approved'
        if (data.rejected) obj.status = 'rejected'
        if(data.voted) obj.voted = true
        res.send(obj)
      }
      catch{
        console.log('error')
        res.status(401).send()
      }
    })
  }
  catch {
    console.log('err')
  }
})

app.get('/getVoterStatistics', (req, res) => {
  // get().collection('voters').aggregate([
  //   {
  //     '$match': {
  //       'approve': {
  //         '$exists': true
  //       }
  //     }
  //   }, {
  //     '$count': 'count'
  //   }]).toArray().then((data) => {
  //     statistics.approved = data.count
  //   })
  try {
    Promise.all([
      get().collection('voters').countDocuments(),
      get().collection('voters').countDocuments({ approve: true }),
      get().collection('voters').countDocuments({ rejected: true })
    ]).then((result) => {
      console.log(result)
      const statistics = { registered: result[0], approved: result[1], rejected: result[2] }

      res.send(statistics)
    })
  }
  catch (err) {
    console.log(err)
  }
}
)


app.get('/electionDeclared',(req, res)=>{
  get().collection('election').updateOne({},{$set:{declared:true}}).then(()=>{
    res.send()
  })
})

app.post('/setUserVoted' , (req, res)=>{
  get().collection('voters').updateOne({metaid:req.body.metaid},{$set:{voted:true}}).then((data)=>{
    console.log(data)
    res.send()
  })
})

app.post('/registerCandidate', (req, res)=>{
  uploadImage(req, res, (err)=>{
    if(err) console.log(err)
  })
  res.send();
})
app.listen(PORT, () => {
  console.log(`Server is running on port 8000.`);
});