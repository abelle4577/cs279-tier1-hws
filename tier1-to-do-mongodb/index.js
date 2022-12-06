
// import and require the dependencies we added imported to the package.json
const express = require("express");
const app = express();


// connect to the database
// the code to actually do this is in the .env file so we need to require it and use it
const dotenv = require("dotenv");
dotenv.config();

// import the model for how we want to structure tasks
const TodoTask = require("./models/TodoTask");

// import the style sheet
app.use("/static", express.static("public"));

// create and embed JS
app.set("view engine", "ejs");

// set up a get method - browser requests what to display from server
// when localhost::3000/ is accessed, todo.ejs will be displayed. 
// don't use get for secure info, it can be cached and shows up in the URL
// just like how the '/' path is visible
// now on the get request display info from the database
app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
    res.render("todo.ejs", { todoTasks: tasks });
    });
    });

// create the post method to handle form submission
// this extracts the text from the form and adds it to the post request
app.use(express.urlencoded({ extended: true }));

// handle the form submission
// when the form is submitted, add the info to the database
// format like the model
app.post('/',async (req, res) => {
    const todoTask = new TodoTask({
    content: req.body.content
    });
    try {
    await todoTask.save();
    res.redirect("/");
    } catch (err) {
    res.redirect("/");
    }
    });

// setting up connection to database
// mongoose is needed to tdo this so require it and use it
const mongoose = require("mongoose");
//connection to db
// mongoose.set("useFindAndModify", false); THIS IS DEPRECIATED
mongoose.connect(process.env.DB_CONNECT, () => {
    // connected to the db, so display this in the console
    console.log("Connected to db!");
    // if there is activity on the port from our server, log that the server is running
    // if files are edited and saved the server will restart
    app.listen(3000, () => console.log("Server Up and running"));
    });


// edit
app
// changes the URL bar
.route("/edit/:id")

// find and then display the listed task
.get((req, res) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
        res.render("todoEdit.ejs", {
            todoTasks: tasks,
            idTask: id
        });
    });
})

// on submission find the item that was selected, then update it
.post((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, {
        content: req.body.content
    }, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});


// delete
// show this in the url bar
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    // if the item exists remove it
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});
