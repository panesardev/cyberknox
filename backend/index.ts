require('dotenv').config();

import App from "./src/app";

const PORT = Number(process.env.port);

App.getInstance().run(PORT);

