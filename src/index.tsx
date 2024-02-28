import { Hono } from "hono";

import { page } from "./page";
import { api } from "./api";

const app = new Hono();

app.route("/", page);
app.route("/api", api);

export default app;
