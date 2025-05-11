import { useEffect, useState } from 'react'
import './App.css'

import heroInport from '../objects/hero'
import enemyInport from '../objects/enemy'

function App() {

  const [hero, setHero] = useState(heroInport)
  const [enemy, setEnemy] = useState(enemyInport)

  useEffect(() => {
    initialize()
  }, [])

  const initialize = () => {
    setHero(heroInport)
    setEnemy(enemyInport)
  }

  const handleAttack = () => {
    if(hero.hp > 0) {
      console.log('Handle Attack')
      const attackDMG = 30
      const newValue = {...enemy, hp: enemy.hp -= attackDMG}
      setEnemy(newValue)
      if(enemy.hp <= 0) {
        alert('You won!')
        setEnemy({...enemy, currentCssClass: 1})
      }
      enemyAction()
    }
  }

  const enemyAction = () => {
    if(enemy.hp > 0) {
      console.log('Enemy Action')
      const attackDMG = 25
      const newValue = {...hero, hp: hero.hp -= attackDMG}
      setHero(newValue)
      if(hero.hp <= 0) {
        setHero({...hero, currentCssClass: 1})
        alert('You are dead')
      }
    }
  }

  const useHealthPotion = () => {
    if(hero.healthPotions > 0 && hero.hp > 0) {
      console.log('use hp potion', hero)
      if(hero.hp != 100) {
        const heal = 50
        let newHp = undefined;
        if(hero.hp + heal >= 100) newHp = 100
        else newHp = hero.hp += heal
        const newValue = {...hero, hp: newHp, healthPotions: hero.healthPotions -= 1}
        console.log( newValue)
        setHero(newValue)
        enemyAction()
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
        <img className={hero.cssClasses[hero.currentCssClass]} src="./assests/hero.png" />
        <img className={enemy.cssClasses[enemy.currentCssClass]} src="./assests/evil-knight.png" />
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
          <button className="custom-button" onClick={() => handleAttack()}>1. Attack</button><br />
          <button className="custom-button" onClick={() => useHealthPotion()}>2. Use Health Potion</button>
        </div>
      </div>
    </>
  )
}

export default App
