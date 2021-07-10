import React from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    const tasks = [
        { id: 1, title: "1984", isDone: true },
        { id: 2, title: "The Financier", isDone: true },
        { id: 4, title: "The Stoic", isDone: true },
        { id: 5, title: "The Titan", isDone: true },
        { id: 6, title: "The Double", isDone: true },
        { id: 7, title: "The Master and Margarita", isDone: false },
    ]

    return (
        <div className="App">
            <Todolist title="Reading list" tasks={tasks} />
        </div>
    );
}

export default App;
