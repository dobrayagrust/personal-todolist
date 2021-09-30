import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import classes from "./InputForm.module.css";

export type ItemFormType = {
    addItem: (title: string) => void
}

export const ItemForm = React.memo((props: ItemFormType) => {
    console.log("InputForm")

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addTask = () => {
        let newTitle = title.trim()
        if (newTitle !== "") {
            props.addItem(newTitle)
            setTitle("")
        } else {
            setError("Title is required!")
        }
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (event.key === "Enter") {
            addTask()
        }
    }

    return (
        <div>
            <input placeholder={"Add task..."}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                className={error ? classes.error : ''}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={classes.errorMessage}>{error}</div>}
        </div>
    )
})

