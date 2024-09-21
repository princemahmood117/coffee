const express = require('express');

const app = express();

const cors = require('cors');

const port = process.env.PORT || 5000;

// middlewares
// app.use(cors())
app.use(cors());

app.use(express.json());



require('dotenv').config();

// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASS);

// 2vaKeu29zlcrsFmC
// coffeeMaster

// const uri = "mongodb+srv://coffeeMaster:2vaKeu29zlcrsFmC@cluster0.ddujh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ddujh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server

    // await client.connect();

    const coffeeCollection = client.db('coffeeDB').collection('coffee')  // created a database called 'coffeeDB' and inside that database there is a collection called 'coffee'. All the data will be stored inside that collection as object


    // for (A) from AddCoffee.jsx [post/create operation]

    app.post('/coffee', async(req,res)=>{
        const newCoffee = req.body; // from (A) : '/coffee' থেকে যেই ডাটা গুলা আসবে সেগুলা req এর মধ্যে body তে করে আসবে| যেহেতু ডাটা গুলা এসে সার্ভারে এড হবে,তাই এখানে মেথদ হবে app.post()। সেখান থেকে ডাটাবেইজে পাঠানো হবে
        console.log(newCoffee);

        const result = await coffeeCollection.insertOne(newCoffee)
        // database এর cpllection [coffee] এর ভেতর একটা একটা করে পাঠানো হয়েছে, পাঠানো হলে সেটা একটা রেস্পন্স দিবে

        res.send(result);
    })

     // for (A) from AddCoffee,jsx [read operation]

    app.get('/coffee', async(req , res) => {
    const cursor = coffeeCollection.find() // 'cursor' একটা পয়েন্টার যেটা পয়েন্ট করবে ডাটাবেজের কালেকশন (coffee) কে আর সেখানে find() মেথড দিয়ে সব ডাটা find করে তা toArray() তে convert করবে ও শেষে একটি রেসপন্স দিবে

    const result = await cursor.toArray();
    res.send(result)
    
// এখন http://localhost:5000/coffee তে সব গুলো ডাটা শো করবে array  হিসাবে
    })


    // for (D) from CoffeeCard.jsx [delete operation]

    app.delete('/coffee/:id', async (req,res)=>{
      const id = req.params.id
      const query = {_id:new ObjectId(id)} // ডাটাবেজে _id দেওয়া আছে বোলে এখানে _id দিয়েই কুয়েরি চালাতে হবে

      const result = await coffeeCollection.deleteOne(query);

      res.send(result)
    })




    // for UPDATE

    // আপডেটের জন্য স্পেসিফিক জিনিস কে আলাদা পেইজে নিয়ে ডাটা আপডেট করতে হবে, তার জন্য আগে ওই স্পেসিফিক জিনিস কে তার আইডি দিয়ে খুজে নিয়ে আসতে হবে তাই এখানে get method ইউজ হয়েছে

    app.get('/coffee/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};

      const result = await coffeeCollection.findOne(query)
      res.send(result)
    })


    // [update operation]
    app.put('/coffee/:id', async(req,res)=>{
      const id = req.params.id;
      const filter = {_id : new ObjectId(id)};

      
      const updateCoffee = req.body; // রিকোয়েস্টের বডি থেকে ডাটা গুলো নিতে হবে

      const options = {upsert:true}; // থাকলে আপডেট করবা,না থাকলে নতুন ভাবে ক্রিয়েট করবা


      const coffee = {
        $set : {

          name : updateCoffee.name,
          quantity : updateCoffee.quantity,
          supplier : updateCoffee.supplier,
          taste : updateCoffee.taste,
          category : updateCoffee.category,
          details : updateCoffee.details,
          photo : updateCoffee.photo,

        }
      }

      const result = await coffeeCollection.updateOne(filter,coffee,options)

      res.send(result);

    })





  
    // এখানে ইউজার এর জন্য নতুন একটি কালেকশন ক্রিয়েট করবো সেই ডাটাবেজে ইউজার কে স্টোর করার জন্য

    const userCollection = client.db('coffeeDB').collection('user')



    app.get('/user', async(req , res) => {
      const cursor = userCollection.find() 
      // 'cursor' একটা পয়েন্টার যেটা পয়েন্ট করবে ডাটাবেজের কালেকশন (user) কে আর সেখানে find() মেথড দিয়ে সব ডাটা find করে তা toArray() তে convert করবে ও শেষে একটি রেসপন্স দিবে
  
      const result = await cursor.toArray();
      res.send(result)
      
  // এখন http://localhost:5000/coffee তে সব গুলো ডাটা শো করবে array  হিসাবে
      })


    // adding (inserting) user into database
    app.post('/user', async(req,res)=>{
      const user = req.body;
      console.log(user);

      const result = await userCollection.insertOne(user)
      res.send(result)

    })

    // deleting from '/user' 

    app.delete('/user/:id',async(req,res)=>{
      const id = req.params.id;

      const query = {_id: new ObjectId(id)}

      const result = await userCollection.deleteOne(query)

      res.send(result)
    })



    // update uers info using Patch method

    app.patch('/user',async(req,res)=>{
      const user = req.body;

      const filter = {email : user.email}

      const updatedDoc = {
        $set : {
          lastLoggedAt : user.lastLoggedAt
        }
      }

      const result = await userCollection.updateOne(filter,updatedDoc)
      res.send(result)
    })

   
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } 
  
  
  
  finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('coffee server is running')
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})