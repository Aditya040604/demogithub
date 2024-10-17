const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Brand = require('./models/Brand');
const app = express();
const port = 3000;


//Mongodb connection
mongoose.connect('mongodb+srv://adityagurram04:aditya6248@cluster0.xtwzy.mongodb.net/', {useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log('Connected to MongoDB')).catch(err => console.error('Error connecting to MongoDB',err));


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');

// Home page - Show all brands and the form for adding a new brand

app.get('/',async(req,res)=> {
    try{
        const brands = await Brand.find()
        res.render('index',{brands});

    }catch(err){
        console.log(err);
        res.status(500).send('Server error');
    }
});

// Add new brand
app.post('/add',async(req,res)=>{
    try{
        const newBrand = new Brand({
            name: req.body.name,
            description:req.body.description

        });
        await newBrand.save();
        res.redirect('/');

    }catch(err){
        console.log(err);
        res.status(500).send('Error adding brand');
    }
});

// Start the server
app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})