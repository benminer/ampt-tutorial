import { data } from "@ampt/data";

const main = async () => {
  const { items: todos } = await data.get("todo:*");

  if (!todos.length) {
    console.info("No todos found");
    return;
  }

  for (const todo of todos) {
    console.log(todo.value);
  }
};

main();
