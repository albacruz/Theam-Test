import { app } from "./server";

app.set("port", process.env.PORT || 3000);
const port = app.get("port");
app.listen(port, () => console.log(`Listening on port ${port}!`));
