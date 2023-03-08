const express = require('express');

//var exphbs  = require('express-handlebars');

const app = express();

//app.engine('handlebars', exphbs.engine());
//app.set('view engine', 'handlebars');

// app.get('/', function (req, res) {
//     //res.send('<html>    </html>')
//     res.render('home', {
//         content:'Teste template'
//     });
// });

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const PORT = process.env.PORT || 5000;


// app.get('api/projects', (req, res)=>{
//     console.get('Get all projects');
// });

// app.use('/api/projects', require('./routes/api/projects'));
// app.use('/api/tasks', require('./routes/api/tasks'));
//app.use('api/tasks', require('./routes/api/tasks'));
app.use('/api', require('./routes'));

app.listen(
    PORT, 
    ()=>console.log(`Server started on port ${PORT}`)
);