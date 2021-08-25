import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import {Button} from "./components/Button/Button";
import {ItemForm} from "./components/Input/InputForm";
import {EditableSpan} from "./components/EditableSpan";


type TodoListType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todolistID: string) => void
    changeFilter: (filterValue: FilterValuesType, todolistID: string) => void
    addNewTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    updateTodolistTitle: (title: string, todolistID: string) => void
    updateTaskTitle: (taskID: string, title: string, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    addTodolist: (newTodolistID: string, title: string) => void
    filter: FilterValuesType
    todolistID: string

}

export const Todolist = React.memo((props: TodoListType) => {
    /*    const callbackHandlerAll = () => {
            props.changeFilter("all", props.todolistID)
        }
        const callbackHandlerActive = () => {
            props.changeFilter("active", props.todolistID)
        }
        const callbackHandlerCompleted = () => {
            props.changeFilter("completed", props.todolistID)
        }*/
    const universalHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue, props.todolistID)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title}
                              callback={(title) =>
                                  props.updateTodolistTitle(title, props.todolistID)}
                />
                <Button buttonTitle={"X"}
                        callback={() =>
                            props.removeTodolist(props.todolistID)}
                />

            </h3>
            <ItemForm addItem={(title) =>
                props.addNewTask(title, props.todolistID)}
            />
            <ul>
                {props.tasks.map((task) => {
                    const removeTaskHandler = () => {
                        props.removeTask(task.id, props.todolistID)
                    }
                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(task.id, event.currentTarget.checked, props.todolistID)
                    }

                    // const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
                    //     if (event.key === "Enter") {
                    //         props.addNewTask(props.title, props.todolistID)
                    //     }
                    // }
                    return (
                        <li key={task.id}>
                            <Button buttonTitle={'X'}
                                    callback={removeTaskHandler}
                            />
                            <input type="checkbox"
                                   onChange={onChangeHandler}
                                   checked={task.isDone}
                            />
                            <EditableSpan title={task.title}
                                          callback={(title) =>
                                              props.updateTaskTitle(title,
                                                  props.todolistID, task.id)
                                          }
                            />
                        </li>)
                })}
            </ul>
            <div>
                <Button buttonTitle={'All'}
                        callback={() => universalHandler('all')}
                        filter={props.filter}
                />
                <Button buttonTitle={'Active'}
                        callback={() => universalHandler('active')}
                        filter={props.filter}
                />
                <Button buttonTitle={'Completed'}
                        callback={() => universalHandler('completed')}
                        filter={props.filter}
                />
            </div>
        </div>
    )
})