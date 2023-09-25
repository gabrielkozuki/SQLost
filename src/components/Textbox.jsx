import React, { useEffect, useState } from 'react'
import './Textbox.scss'
import Typewriter from './Typewriter'

const Textbox = (props) => {
    const data = props.data
    const flow = props.flow

    useEffect(() => {
        
    }, [flow])

    return (
        <div className='textbox'>
            <Typewriter text={data[flow].text}/>
        </div>
    )
}

export default Textbox