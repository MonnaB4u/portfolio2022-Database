const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_Password}@cluster0.doolq.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

const app = express()
app.use(bodyParser.json());
app.use(cors())
const port = process.env.PORT || 5000


app.get('/', (req, res) => {
    res.send('Hello World!')
})

console.log(process.env.DB_user + process.env.DB_Password + process.env.DB_Name)


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("PortFolio");
        const projectCollection = database.collection("projects");
        const testimonialCollection = database.collection("testimonial");
        const blogCollection = database.collection("blog");
        const skillCollection = database.collection("skill");
        const achivementCollection = database.collection("Achivement");
        const resumeCollection = database.collection("Resume");

        // create a document to insert


        /// Add New Project

        app.post('/addProjects', async (req, res) => {
            const newData = req.body
            const result = await projectCollection.insertOne(newData
            );
            console.log('New user found', req.body)
            console.log('New user added', result)
            res.json(result)
        })


        //////// Get All Project and Display

        app.get('/projectCollection', async (req, res) => {
           const cursor = projectCollection.find({});
            const user = await cursor.toArray();
            res.send(user.reverse());
        })


        ///// Delete One Project
        app.delete('/projectCollection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await projectCollection.deleteOne(query);
            console.log('delete user', result)
            res.json(result)
        })

        //////get Spacific Project by ID

        app.get('/projectCollection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            users = await projectCollection.findOne(query);
            res.send(users)
        })

        ///Update Project collection by id
        app.put('/projectCollection/:id', async (req, res) => {
            const id = req.params.id;
            const UpdateUser = req.body
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: UpdateUser.name,
                    link: UpdateUser.link,
                     gitLink: UpdateUser.gitLink,
                    details: UpdateUser.details,
                    technology: UpdateUser.technology,
                    img: UpdateUser.img
                }
            };
            const result = await projectCollection.updateOne(filter, updateDoc, options);
            res.json(result)
        })

        // /// Add New Testimonial

        app.post('/addTestimonial', async (req, res) => {
            const newData = req.body
            const result = await testimonialCollection.insertOne(newData
            );
            console.log('New user found', req.body)
            console.log('New user added', result)
            res.json(result)
        })

        //////// Get All Testimonial and Display

        // app.get('/testimonialCollection', async (req, res) => {
        //     const cursor = testimonialCollection.find({});
        //     const user = await cursor.toArray();
        //     res.send(user);
        // })

        app.get('/testimonialCollection', async (req, res) => {
            const cursor = testimonialCollection.find({});
            const user = await cursor.toArray();
            res.send(user);
        })

        /// Add New Skill

        app.post('/addSkill', async (req, res) => {
            const newData = req.body
            const result = await skillCollection.insertOne(newData);
            console.log('New user found', req.body)
            console.log('New user added', result)
            res.json(result)
        })


        //////// Get All Skill and Display

        app.get('/Skills', async (req, res) => {
            const cursor = skillCollection.find({});
            const user = await cursor.toArray();
            res.send(user);
        })

        ///// Delete One Skill
        app.delete('/Skills/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await skillCollection.deleteOne(query);
            console.log('delete user', result)
            res.json(result)
        })

        ///////////////////////// Blog ////////////////////////////////////

        /// Add New Blog

        app.post('/addBlog', async (req, res) => {
            const newData = req.body
            const result = await blogCollection.insertOne(newData);
            console.log('New user found', req.body)
            console.log('New user added', result)
            res.json(result)
        })


        //////// Get All Blog and Display

        app.get('/allBlog', async (req, res) => {
            const cursor = blogCollection.find({});
            const user = await cursor.toArray();
            res.send(user.reverse());
        })

        ///// Delete One Blog


        app.delete('/allBlog/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await blogCollection.deleteOne(query);
            console.log('delete user', result)
            res.json(result)
        })

        ///////// get specific blog by id

        app.get('/allBlog/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            users = await blogCollection.findOne(query);
            res.send(users)
        })

        ///Update Blog collection by id
        app.put('/allBlog/:id', async (req, res) => {
            const id = req.params.id;
            const UpdateUser = req.body
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    title: UpdateUser.title,
                    view: UpdateUser.view,
                    img: UpdateUser.img
                }
            };
            const result = await blogCollection.updateOne(filter, updateDoc, options);
            res.json(result)
        })


        ///////////////////////// Achivement ////////////////////////////////////
        /// Add New Achivement

        app.post('/addAchivement', async (req, res) => {
            const newData = req.body
            const result = await achivementCollection.insertOne(newData);
            console.log('New user found', req.body)
            console.log('New user added', result)
            res.json(result)
        })


        //////// Get All Achivement and Display

        app.get('/allAchivement', async (req, res) => {
            const cursor = achivementCollection.find({});
            const user = await cursor.toArray();
            res.send(user);
        })

        ///// Delete One Achivement


        app.delete('/allAchivement/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await achivementCollection.deleteOne(query);
            console.log('delete user', result)
            res.json(result)
        })

        ///////// get specific Achivement by id

        app.get('/allAchivement/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            users = await achivementCollection.findOne(query);
            res.send(users)
        })

        ///Update Achivement collection by id

        app.put('/allAchivement/:id', async (req, res) => {
            const id = req.params.id;
            const UpdateUser = req.body
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: UpdateUser.name,
                    details: UpdateUser.details,
                    img: UpdateUser.img
                }
            };
            const result = await achivementCollection.updateOne(filter, updateDoc, options);
            res.json(result)
        })


        ///////////////////////// Resume ////////////////////////////////////
        /// Add New Resume

        app.post('/addResume', async (req, res) => {
            const newData = req.body
            const result = await resumeCollection.insertOne(newData);
            console.log('New user found', req.body)
            console.log('New user added', result)
            res.json(result)
        })


        //////// Get All Resume and Display

        app.get('/allResume', async (req, res) => {
            const cursor = resumeCollection.find({});
            const user = await cursor.toArray();
            res.send(user);
        })

        ///// Delete One Resume


        app.delete('/allResume/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await resumeCollection.deleteOne(query);
            console.log('delete user', result)
            res.json(result)
        })


    } finally {
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log("Local Host", port)
})

