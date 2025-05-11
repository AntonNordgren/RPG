let hero = {
  name: "Hero",
  hp: 100,
  maxHp: 100,
  healthPotions: 5,
  cssClasses: ["hero", "hero-dead"],
  currentCssClass: 0
}

hero.attack = function() {
  console.log('Hero Attack')
}

hero.useHelthPotion = function() {
  console.log('Use Healthpotion')
}

export default hero