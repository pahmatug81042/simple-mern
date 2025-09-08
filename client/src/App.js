import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import TaskList from './components/TaskList';  // Use singular TaskList here

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const getTasks = useCallback(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched tasks from API:', data); // Debug log
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          console.error('API did not return an array:', data);
          setTasks([]);
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setTasks([]);
      });
  }, []);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const clickAddTask = event => {
    event.preventDefault();

    if (!newTaskTitle.trim()) return; // prevent adding empty tasks

    fetch('/api/tasks/add', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTaskTitle }),
    }).then(() => {
      setNewTaskTitle('');
      getTasks();
    });
  };

  return (
    <div className="App">
      <h1>My Tasks</h1>

      <TaskList tasks={tasks} updateTasks={getTasks} />

      <form onSubmit={clickAddTask}>
        <input
          type="text"
          size="30"
          placeholder="New Task"
          value={newTaskTitle}
          onChange={event => setNewTaskTitle(event.target.value)}
        />
        <input
          className="btn-primary"
          type="submit"
          value="Add"
          disabled={!newTaskTitle.trim()}
        />
      </form>
    </div>
  );
};

export default App;
