import React from 'react'
import './Home.scss'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const handleJogar = () => {
    return navigate('/play')
  }

  return (
    <div className='home'>
      <h1>SQLost</h1>
      <div className="button" onClick={() => handleJogar()}>
        JOGAR
      </div>
      <p>Aprenda SQL de forma divertida</p>
    </div>
  )
}

export default Home