import React from 'react';
import {FilterValuesType, TaskType} from './App';
import {Button} from "./components/Button/Button";
import {Input} from "./components/Input/Input";

/*type TaskType = {
    id: string
    title: string
    isDone: boolean
}*/

type TodoListType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todolistsID: string) => void
    changeFilter: (filterValue: FilterValuesType, todolistsID: string) => void
    addNewTask: (title: string, todolistsID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistsID: string) => void
    filter: FilterValuesType
    todolistsID: string
}

export const Todolist = React.memo((props: TodoListType) => {

    const callbackHandlerAll = () => {
        props.changeFilter("all", props.todolistsID)
    }
    const callbackHandlerActive = () => {
        props.changeFilter("active", props.todolistsID)
    }
    const callbackHandlerCompleted = () => {
        props.changeFilter("completed", props.todolistsID)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <Input callbackClick={(title: string) => props.addNewTask(title, props.todolistsID)}/>
            <ul>
                {props.tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <Button buttonTitle={'x'}
                                    callback={() => {
                                        props.removeTask(task.id, props.todolistsID)
                                    }}
                            />
                            <input type="checkbox"
                                   checked={task.isDone}
                            />
                            <span>{task.title}</span>
                        </li>)
                })}
            </ul>
            <div>
                <Button buttonTitle={'All'}
                        callback={callbackHandlerAll}
                        todolistID={props.todolistsID}
                        value={'all'}
                        filter={props.filter}
                />
                <Button buttonTitle={'Active'}
                        callback={callbackHandlerActive}
                        todolistID={props.todolistsID}
                        value={'active'}
                        filter={props.filter}
                />
                <Button buttonTitle={'Completed'}
                        callback={callbackHandlerCompleted}
                        todolistID={props.todolistsID}
                        value={'completed'}
                        filter={props.filter}
                />
            </div>
        </div>
    )
})