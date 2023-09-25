import React, { useEffect, useState } from 'react'
import './ChapterOne.scss'
import data from '../data/capitulo-um.json';

import Textbox from '../components/Textbox'

const ChapterOne = () => {

  const [flow, setFlow] = useState(0);

  const handleClick = () => {
    if (flow < data.length -1) {
      setFlow(flow + 1)
    }
    console.log(flow);
  }

  return (
    <div className='chapter-one'>
      <div className="wrapper">
        <Textbox data={data} flow={flow} />
        <button onClick={handleClick}>Avançar</button>
      </div>
    </div>
  )
}

export default ChapterOne