var express = require('express');
var app = express();

app.use(express.static('public'));
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false})
//Create application//

app.get('/', (req,res) =>{
    res.sendFile(process.cwd() + '/' + '/index.html');
})
app.get('/about', (req,res) =>{
    res.sendFile(process.cwd() + '/about.html');
})
app.get('/blog', (req,res) =>{
    res.sendFile(process.cwd()  + '/blog.html');
})
app.get('/contact', (req,res)=>{
    res.sendFile(process.cwd()  + '/contact.html');
})

app.post('/process_post',urlencodedParser, function(req,res){
    response = {
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        stud_num:req.body.stud_num,
        cell_num:req.body.cell_num
        
    };
console.log(response);
res.end(JSON.stringify(response));



});
const path = require('path');
const mime = require('mime-types');
const multer = require('multer');

//use multer to support file upload feature
const fileStorage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/'); //specify the destination
    },
    filename: function (req, file, cb){
        cb(null, file.originalname);
    },
});
const upload = multer({storage: fileStorage});

//file upload route
app.post('/uploads', upload.single('myFile'), (req,res)=>{
    console.log(req.file);
    req.file.mimetype = mime.lookup(req.file.originalname);
    res.sendFile(path.join(__dirname, 'file-uploaded.html'))
})

app.get('/file-upload', (req,res)=>{
    res.sendFile(__dirname + '/' + 'file-upload.html')
})
app.listen(4000,() =>{
    console.log('Server is running on http://localhost:4000');
});