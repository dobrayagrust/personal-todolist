import React, {useState} from 'react';
import {FilterValuesType} from "../../App";
import classes from "./Button.module.css";

type ButtonType = {
    buttonTitle: string
    callback: () => void
    filter?: FilterValuesType
    onChange?: () => void
}

export const Button = (props: ButtonType) => {


    const callbackHandler = () => {
        props.callback()
    }
    const classActive = props.filter === props.buttonTitle.toLowerCase() ? classes.activeFilter : ''

    return (

    <button className={classActive}
                onClick={callbackHandler}>
            {props.buttonTitle}
        </button>
    )
}

