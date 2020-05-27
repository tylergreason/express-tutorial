const express = require('express'); 
const app = express(); 
const PORT = process.env.PORT || 5000; 
const path = require('path'); 

// record the date 
let ts = Date.now(); //time in seconds 
let dateObject = new Date(ts); // all the necessary time information 


// declare middleware 
const logger = (req, res, next) => {
    // log the url 
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`); 
    console.log(dateObject)
    // middleware should call next so the next function on the stack fires 
    next(); 
}

// init middleware 
app.use(logger); 
// body parser middleware 
app.use(express.json()); 
app.use(express.urlencoded({extended: false})); 

app.listen(PORT, () => console.log(`server started on ${PORT}`))

// use static folder 
app.use(express.static(path.join(__dirname, 'public')));

// include members routes 
// their route is declaired using the first argument
// that allows the file, members.js (where the routes are defined), to just use '/' for their routes 
// (or '/:id', etc.)
app.use('/api/members', require('./routes/api/members'))



// app.get('/', (req, res) => {
//     // respond with json 
//     // res.json({"aasfdsa":'fadjlkj',
//     //             "second": {
//     //                 first: 1, 
//     //                 second: 'tw0'
//     //             }})
//     // respond with text
//     // res.send('Hello, requesafdfasft!')

//     // respond with file 
//     res.sendFile(path.join(__dirname, 'public', 'index.html')); 

// })