import React, {ChangeEvent, useState} from "react";

type SpanType = {
    title: string
    callback: (title: string) => void
}

export const EditableSpan = (props: SpanType) => {

    let [title, setTitle] = useState(props.title)
    let [edit, setEdit] = useState(false)

    const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const activateEdit = () => {
        setEdit(true)
    }
    const deactivateEdit = () => {
        setEdit(false)
        props.callback(title)
    }


    return (
        edit
            ? <input value={title}
                     autoFocus={true}
                     onChange={onChangeEditHandler}
                     onBlur={deactivateEdit}
            />
            : <span onDoubleClick={activateEdit}>{props.title}</span>
    )
}