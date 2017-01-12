
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
//

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT);
app.use('/admin',express.static('admin'));

var nodeadmin=require('nodeadmin');
app.use(nodeadmin(app));

var Sequelize = require("sequelize");
var sequelize = new Sequelize('db', 'florentinazerfas', '', {
   dialect: 'mysql',
    host: '127.0.0.1',
   port: 3306
});

app.use('/admin', express.static('admin'));
app.get('/', function(req, res) {
    res.redirect("/admin");
});


var Article = sequelize.define('articoles', {
  denumire: {
    type: Sequelize.STRING,
    field: 'denumire'
  },
  tip_material: {
    type: Sequelize.STRING,
    field: 'tip_material'
  },
  culoare: {
    type: Sequelize.STRING,
    field: 'culoare'
  },
}, {
  timestamps: false
});
sequelize.authenticate()
    .then(function () {
        console.log("Baza de date este conectata! ");
    })
    .catch(function (err) {
        console.log("Baza de date nu este conectata!");
    })
    .done();
    
var data = [{id:1},{id:2},{id:3}];

//CREATE new resource
app.post('/[resource_name]', function(request, response) {
response.status(201).send(request.body);
});

//READ all 
app.get('/[resource_name]', function(request, response) {
response.status(200).send(data);
});

//READ one by id
app.get('/[resource_name]/:id', function(request, response) {
response.status(200).send(data[0]);
});

//UPDATE one by id
app.put('/[resource_name]/:id', function(request, response) {
response.status(201).send(request.body);
});

//DELETE one by id
app.delete('/[resource_name]/:id', function(request, response) {
response.status(201).send('Deleted' + request.params.id);
});

// create an article
app.post('/articoles', function(request,response) {
  Article.create(request.body).then(function(articole) {
      Article.findById(articole.id).then(function(articole) {
          response.status(201).send(articole);
      });
  });
});
app.get('/articoles', function(request,response){
     /*global Article*/
    Article.findAll().then(function(articoles){
        response.status(200).send(articoles);
    });
});
app.get('/articoles/:id', function(request,response){
    Article.findById(request.params.id).then(function(articole){
        if(articole) {
            response.status(200).send(articole);
        } else {
            response.status(404).send();
        }
    });
});
app.put('/articoles/:id', function(request,response){
    Article
        .findById(request.params.id)
        .then(function(articole){
            if(articole) {
                articole
                    .updateAttributes(request.body)
                    .then(function(){
                        response.status(200).send('updated');
                    })
                    .catch(function(error){
                        console.warn(error);
                        response.status(500).send('server error');
                    });
            } else {
                response.status(404).send();
            }
        });
});
// delete an article by id
app.delete('/articoles/:id', function(req,res){
    Article
        .findById(req.params.id)
        .then(function(articole){
            if(articole) {
                articole
                    .destroy()
                    .then(function(){
                        res.status(204).send();
                    })
                    .catch(function(error){
                        console.warn(error);
                        res.status(500).send('server error');
                    });
            } else {
                res.status(404).send();
            }
        });
});
