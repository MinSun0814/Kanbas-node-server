function HelloRoutes(app)
{
  app.get('/', (req, res) => {
    res.send('Welcome to web dev');
  });

  app.get("/hello", (req, res) => {
    res.send("Hello World");
  });
}

export default HelloRoutes;