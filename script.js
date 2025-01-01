function createPlayer(name) {
  let score = 0;

  const changeName = (newName) => (name = newName);

  const increaseScore = () => score++;
  const resetScore = () => (score = 0);

  return { name, changeName, increaseScore, resetScore };
}
