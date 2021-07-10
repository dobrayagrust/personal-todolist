import React from 'react';

type propsType = {
    value: string
    callbackClick: () => void
}

export const Button = (props: propsType) => {

    const callbackHandler = () => {
        props.callbackClick()
    }

    return (
        <button onClick={callbackHandler}>{props.value}</button>
    )
}

