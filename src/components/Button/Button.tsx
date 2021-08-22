import React from 'react';
import {FilterValuesType} from "../../App";
import classes from "./Button.module.css";

type ButtonType = {
    buttonTitle: string
    callback: () => void
    todolistID?: string
    value?: FilterValuesType
    filter?: FilterValuesType
}

export const Button = (props: ButtonType) => {

    const callbackHandler = () => {
        props.callback()
    }
    const classActive = props.filter === props.value ? classes.activeFilter : ''

    return (
        <button className={classActive}
                onClick={callbackHandler}>
            {props.buttonTitle}
        </button>
    )
}

