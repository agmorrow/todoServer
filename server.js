const express = require('express');

const { todos, uuid } = require('./dp/todos');
// Environmental variables
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.static('public'));
// Body parser
// IT takes information that the client is sending from a "form" or "post" request
// and attach the data into req.body

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// create a middlewware to make 'req.austin exist in every route
// 1st parameter to app.use is that routes do i use this middleware to be active for
// a middleware is a function that intercepts the incoming request
// from there, we can validate data, check if a user is logged in, validate data being sent
// modify the request, respond early if case user does something stupid
app.use(function(req, res, next) {
    req.austin = 'Austin';
    console.log('Im happening');
   next();
});

const checkBodyForText = (req, res, next) => {
    if (req.body.text.length === 0) {
        return res.status(401).json({ error: 'You must pass text to create a todo'});
    } else {
        next();
    }
};



app.get('/api/todos', (req, res) => {
    console.log(req.method, 'Austin is cool');
// req is an object
// that contains information about the incoming request
    res.json(todos);
});

// When someone makes a "POST" request to /api/todos, ca'' the cb function
app.post('/api/todos', checkBodyForText, (req, res) => {
    console.log(req.body);
    const newTodo = {
        text: req.body.text,
        id: uuid(),
    };
    todos.push(newTodo);
    res.json(newTodo);
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));