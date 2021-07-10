import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "1984", isDone: true},
        {id: 2, title: "The Financier", isDone: true},
        {id: 4, title: "The Stoic", isDone: true},
        {id: 5, title: "The Titan", isDone: true},
        {id: 6, title: "The Double", isDone: true},
        {id: 7, title: "The Master and Margarita", isDone: false},

    ]);

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(task => task.id !== id);
        setTasks(filteredTasks);
    }

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let priorityTasks = tasks;

    if (filter === "active") {
        priorityTasks = tasks.filter(task => !task.isDone);
    }
    if (filter === "completed") {
        priorityTasks = tasks.filter(task => task.isDone);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    return (
        <div className="App">
            <Todolist title="Reading list"
                      tasks={priorityTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
