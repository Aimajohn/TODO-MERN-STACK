export const localStorage = async (creados: number[]) => {
  const newawee = await JSON.stringify({ done: creados });
  console.log(newawee);
  window.localStorage.setItem("todosCreated", newawee);
};
