import { createApp } from "./server";

(async () => {
  const { app } = await createApp();
  app.set("port", process.env.PORT || 3000);
  const port = app.get("port");
  app.listen(port, () => console.log(`Listening on port ${port}!`));
})();
