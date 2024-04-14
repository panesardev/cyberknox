import { App } from "./src/app";

const PORT = Number(process.env.port) || 3000;

App.getInstance().run(PORT);