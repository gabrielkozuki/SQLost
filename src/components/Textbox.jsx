import React, { useEffect, useState } from 'react'
import './Textbox.scss'
import { Typewriter } from "./Typewriter";

const Textbox = (props) => {
    const data = props.data
    const flow = props.flow
    const dialogue = Typewriter(data[flow].text, data[flow].speed)

    useEffect(() => {
        
    }, [flow])

    return (
        <div className='textbox'>
            <p>{dialogue}</p>
        </div>
    )
}

export default Textbox