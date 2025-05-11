let enemy = {
  name: "Enemy",
  hp: 200,
  maxHp: 200,
  cssClasses: ["evil-knight", "evil-knight-dead"],
  currentCssClass: 0
}

enemy.attack = function() {
  console.log('Enemy Attack')
}

export default enemy