const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};


const todos = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
];


function Lab5 (app) {
  app.get("/a5/todos", (req, res) => {
    const { completed } = req.query;
    if (completed === "true") {
      const completedTodos = todos.filter((todo) => todo.completed);
      res.json(completedTodos);
    } else if (completed === "false") {
      const incompleteTodos = todos.filter((todo) => !todo.completed);
      res.json(incompleteTodos);
    } else {
      res.json(todos);
    }
  });

  app.post("/a5/todos", (req, res) => {
    const newTodo = {
      ...req.body,
      id: new Date().getTime(),
    };
    todos.push(newTodo);
    res.json(newTodo);
  });


  app.get("/a5/todos/create", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Todo",
      completed: false,
    };
    todos.push(newTodo);
    res.json(newTodo);
  });


  app.get("/a5/assignment/score/:newScore", (req, res) => {
    const { newScore } = req.params;
    assignment.score = parseInt(newScore);
    res.json(assignment);
  });
  app.get("/a5/assignment/completed/:newCompleted", (req, res) => {
    const { newCompleted } = req.params;
    assignment.completed = newCompleted === 'true';
    res.json(assignment);
  });

  app.get("/a5/todos/:id/delete", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.res
      .status(404)
      .json({ message:
            `Unable to delete Todo with ID ${id}` });
      return;
    }

    app.delete("/a5/todos/:id", (req, res) => {
      const { id } = req.params;
      const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
      if (todoIndex === -1) {
        return res.status(404).json({ message: `Todo with ID ${id} not found` });
      }
      todos.splice(todoIndex, 1);
      res.json({ message: `Todo with ID ${id} deleted successfully` });
    });


    todos.splice(todos.indexOf(todo), 1);
    res.json(todos);
  });
  app.get("/a5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.title = title;
    res.json(todos);
  });

  app.get("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((todo) => todo.id === parseInt(id));
    res.json(todo);
  });
  app.get("/a5/assignment", (req, res) => {
    res.json(assignment);
  });

  app.get("/a5/assignment/title", (req, res) => {
    res.send(assignment.title);
  });

  app.get("/a5/assignment/title/:newTitle", (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.send(assignment);
  });



  app.get("/a5", (req, res) => {
    res.send("Welcome to lab 5");
  });

  //http://localhost:4000/a5/calculator?a=3&b=4&operation=add
  app.get("/a5/calculator/", (req, res) => {
    const {a,b,operation}=req.query;
    let result=0;
    if(operation==="add"){
      result=parseInt(a)+parseInt(b);
    }
    else if(operation==="subtract"){
      result=parseInt(a)-parseInt(b);
    }
    else {
      result="Invalid operation";
    }
    res.send(result.toString())
  });

  app.get("/a5/hello/:name", (req, res) => {
    const name = req.params.name;
    res.send(`Hello ${name}`);
  });

  app.get("/a5/add/:a/:b", (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.send(`The sum of ${a} and ${b} is ${a+b}`);
  });

  app.get("/a5/subtract/:a/:b", (req, res) => {
    const {a,b}=req.params;
    res.send(`The difference of ${a} and ${b} is ${a-b}`);
  });
  app.get("/a5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find(t => t.id === parseInt(id));
    if (todo) {
      todo.completed = completed === 'true';
      res.json(todos);
    } else {
      res.status(404).send('Todo not found');
    }
  });
  app.get("/a5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find(t => t.id === parseInt(id));
    if (todo) {
      todo.title = description;
      res.json(todos);
    } else {
      res.status(404).send('Todo not found');
    }
  });

}
export default Lab5;