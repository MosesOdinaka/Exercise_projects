const express = require('express');
const app = express();
const PORT = 3000;

let tasks = []; // In-memory database for simplicity
app.use(express.json());

// Root URl for tasks
app.get('/', (req, res) => {
    res.json(tasks);
});

// Create a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    const newTask = { id: tasks.length + 1, title, description };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Read all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const task = tasks.find((t) => t.id === parseInt(id));

    if(!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    res.json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
   const { id } = req.params;
   tasks = tasks.filter((t) => t.id !== parseInt(id));
   res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
