const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/todo')
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));

// Task schema and model
const taskSchema = new mongoose.Schema({ title: String });
const Task = mongoose.model('Task', taskSchema);

// Routes
app.get('/tasks', async (req, res) => {
const tasks = await Task.find();
res.json(tasks);
});

app.post('/tasks', async (req, res) => {
const newTask = new Task({ title: req.body.title });
await newTask.save();
res.json(newTask);
});

app.delete('/tasks/:id', async (req, res) => {
await Task.findByIdAndDelete(req.params.id);
res.json({ message: 'Task deleted' });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));