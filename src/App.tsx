import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "1984", isDone: true},
        {id: v1(), title: "The Financier", isDone: true},
        {id: v1(), title: "The Stoic", isDone: true},
        {id: v1(), title: "The Titan", isDone: true},
        {id: v1(), title: "The Double", isDone: true},
        {id: v1(), title: "The Master and Margarita", isDone: false},

    ]);

    const addNewTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks([newTask, ...tasks])
    }

    function removeTask(id: string) {
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
                      changeFilter={changeFilter}
                      addNewTask={addNewTask}
            />
        </div>
    );
}

export default App;