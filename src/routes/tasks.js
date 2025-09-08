const express = require('express');
const Task = require('../models/task');
const router = express.Router();

router.get('/', (req, res) => {
  Task.find({})
    .then(tasks => res.json(tasks))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.post('/add', (req, res) => {
  console.log('POST /add body:', req.body);
  const { title } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTask = new Task({ title });

 newTask.save()
  .then(task => {
    console.log('Saved task:', task);
    res.json(task);
  })
  .catch(err => {
    console.error('Error saving task:', err);
    res.status(500).json({ error: err.message });
  });
});

router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  Task.findByIdAndDelete(id)
    .then(task => {
      if (!task) return res.status(404).json({ error: 'Task not found' });
      res.json({ message: 'Task deleted', task });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

router.post('/update/:id', (req, res) => {
  const { done } = req.body;
  Task.findByIdAndUpdate(req.params.id, { done }, { new: true })
    .then(task => {
      if (!task) return res.status(404).json({ error: 'Task not found' });
      res.json(task);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;