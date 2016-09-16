var express = require('express');
var bodyParser = require('body-parser');
var users = require('./users.json');

var app = express();

app.use(bodyParser.json());


app.get('/api/users',function(req,res,next){
  if (req.query.language){
    var userLanguages = [];
    users.map(function(user){
      if (user.language = req.query.language){
        userLanguages.push(user);
      }
    })
    res.status(200).json(userLanguages);
  }
  else if (req.query.age){
    var userAges = [];
    users.map(function(user){
      if (user.age = req.query.age){
        userAges.push(user);
      }
    })
    res.status(200).json(userAges);
  }
  else if (req.query.city){
    var userCity = [];
    users.map(function(user){
      if (user.city = req.query.city){
        userCity.push(user);
      }
    })
    res.status(200).json(userCity);
  }
  else if (req.query.state){
    var userState = [];
    users.map(function(user){
      if (user.state = req.query.state){
        userState.push(user);
      }
    })
    res.status(200).json(userState);
  }
  else if (req.query.gender){
    var userGender = [];
    users.map(function(user){
      if (user.gender = req.query.gender){
        userGender.push(user);
      }
    })
    res.status(200).json(userGender);
  }
  else {
    res.status(200).json(users);
  }
});

app.get('/api/users/:parameter',function(req,res,next){
    var userPrivileges = [];
    var validUser = false;
    var singleUser;
    users.map(function(user){
      if (user.type === req.params.parameter){
        userPrivileges.push(user);
      }
      else if (user.id === parseInt(req.params.parameter)) {
        validUser = true;
        singleUser = user;
      }
    })
    if (validUser) {
      res.status(200).json(singleUser)
    }
    else if(userPrivileges[0]){
      res.status(200).json(userPrivileges);
    }
    else {
      res.sendStatus(404);
    }
});

app.post('/api/users',function(req,res,next){
  var maxId = 1;
  users.map(function(user){
    user.id >= maxId ? maxId = user.id++ : maxId;
  })
  req.body.id = maxId;
  users.push(req.body);
  res.status(200).json(req.body);
});

app.post('/api/users/:parameter',function(req,res,next){
  var maxId = 1;
  users.map(function(user){
    user.id >= maxId ? maxId = user.id++ : maxId;
  })
  req.body.id = maxId;
  req.body.type = req.params.parameter;
  users.push(req.body);
  res.status(200).json(req.body);
});

app.post('/api/users/language/:parameter',function(req,res,next){
  var updatedUser;
  users.map(function(user){
    if(user.id === parseInt(req.params.parameter)){
      user.language = req.body.language
      updatedUser = user;
    }
  });
  res.status(200).json(updatedUser);
})

app.post('/api/users/forums/:parameter',function(req,res,next){
  var updatedUser;
  users.map(function(user){
    if(user.id === parseInt(req.params.parameter)){
      if (!user.favorites){
        user.favorites = [];
      }
      user.favorites.push(req.body.add)
      updatedUser = user;
    }
  });
  res.status(200).json(updatedUser);
})

app.delete('/api/users/forums/:parameter',function(req,res,next){
  var updatedUser;
  users.map(function(user){
    if(user.id === parseInt(req.params.parameter)){
      user.favorites.splice(user.favorites.indexOf(req.query.favorite),1);
      updatedUser = user;
    }
  });
  res.status(200).json(updatedUser);
});

app.delete('/api/users/:parameter',function(req,res,next){

  for (var i = 0; i < users.length; i++){
    if(users[i].id === parseInt(req.params.parameter)) {
      users.splice(i,1);
    }
  }
  res.status(200).json(users);
});

app.put('/api/users/:parameter',function(req,res,next){
  var updatedUser;
  users.map(function(user){
    if(user.id === parseInt(req.params.parameter)){
      for (key in req.body){
        user[key] = req.body[key];
      }
      updatedUser = user;
    }
    });
  res.status(200).json(updatedUser);
});

app.listen(3000,function(){
  console.log('listening on port 3000');
});

module.exports = app;
