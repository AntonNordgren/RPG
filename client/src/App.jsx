import { useEffect, useState } from 'react'
import './App.css'

import heroInport from '../objects/hero'
import enemyInport from '../objects/enemy'

function App() {
  const [hero, setHero] = useState(heroInport)
  const [enemy, setEnemy] = useState(enemyInport)
  const [optionActive, setOptionActive] = useState(true)

  const [heroState, setHeroState] = useState('hero')
  const [enemyState, setEnemyState] = useState('evil-knight')

  const [log, setLog] = useState('No actions yet.')

  useEffect(() => {
    initialize()
  }, [])

  const initialize = () => {
    setHero(heroInport)
    setEnemy(enemyInport)
  }

  const handleAttack = () => {

    if(optionActive) {
      setOptionActive(false)
      if(hero.hp > 0) {
        console.log('Handle Attack')
        setHeroState('hero hero-attack')
        const attackDMG = 30
        const newValue = {...enemy, hp: enemy.hp -= attackDMG}
        setEnemy(newValue)
        setLog(`You deal ${attackDMG} hp to the enemy.`)
        setTimeout( () => setHeroState('hero'), 500)
        if(enemy.hp <= 0) {
          setEnemy({...enemy, currentCssClass: 1})
          setEnemyState("evil-knight-dead")
          setLog(`You won!`)
        }
        enemyAction()
      }
    }


  }

  const enemyAction = () => {
    setTimeout(() => {
      if (enemy.hp > 0) {
        console.log('Enemy Action')
        setEnemyState('evil-knight evil-knight-attack')
        const attackDMG = 25
        const newValue = { ...hero, hp: hero.hp -= attackDMG }
        setHero(newValue)
         setLog(`The enemy deal ${attackDMG} hp to you.`)
        setTimeout( () => setEnemyState('evil-knight'), 500)
        setOptionActive(true)
        if (hero.hp <= 0) {
          setHero({ ...hero, currentCssClass: 1 })
          setHeroState("hero-dead")
          setLog(`You're dead.`)
        }
      }
    }, 1000)

  }

  const useHealthPotion = () => {

    if (optionActive) {
      setOptionActive(false)
      if(hero.healthPotions == 0) {
        setLog(`You have no healthpotions left!`)
        setOptionActive(true)
      }
      else {
        if (hero.hp > 0) {
          console.log('use hp potion', hero)
          if (hero.hp != 100) {
            const heal = 50
            let newHp = undefined;
            if (hero.hp + heal >= 100) newHp = 100
            else newHp = hero.hp += heal
            const newValue = { ...hero, hp: newHp, healthPotions: hero.healthPotions -= 1 }
            console.log(newValue)
            setHero(newValue)
            setLog(`You got healed for ${heal} hp.`)
            enemyAction()
          }
        }
      }

    }

  }

  const renderHealthPotions = () => {
    return (
      <div className="health-potion-container">
        {Array.from({ length: hero.healthPotions }).map(healthpotion =>
          <img className="healthpotion" src="./assests/healthpotion.png" />
        )}
      </div>
    )
  }

  return (
    <>
      <div className="gameContainer">
        <img className="background-image" src="./assests/dungeon.jpg" />
        <img className={heroState} src="./assests/hero.png" />
        <img className={enemyState} src="./assests/evil-knight.png" />
        <div className="hero-panel">
          <div className="health-panel">
            <div className="health-symbol-container">
              <img className="health-symbol" src="./assests/health-symbol.png" />
            </div>
            <div className="health-value-container">
              {hero.hp} / {hero.maxHp}
            </div>
          </div>
          {renderHealthPotions()}
        </div>

        <div className="log-container">
          <div className="log-texts">
            {log}
          </div>
        </div>

        <div className="enemy-panel">
          <div className="health-panel">
            <div className="health-symbol-container">
              <img className="health-symbol" src="./assests/health-symbol.png" />
            </div>
              <div className="health-value-container">
                {enemy.hp} / {enemy.maxHp}
              </div>
          </div>
        </div>
        <div className="options-panel">
          <h1 className="options-panel-header">Options</h1>
          {
            optionActive && hero.hp > 0 ? <>
              <button className="custom-button" onClick={() => handleAttack()}>1. Attack</button><br />
              <button className="custom-button" onClick={() => useHealthPotion()}>2. Use Health Potion</button>
            </> : null
          }
          {hero.hp <= 0 ? <h1>You're dead. Restart to try again.</h1> : null}
          {enemy.hp <= 0 ? <h1>You won!</h1> : null}
          {optionActive && enemy.hp > 0 ? null : <h1>Waiting for enemy aciton.</h1>}
        </div>
      </div>
    </>
  )
}

export default App
