require('dotenv').config();
import createServer from "./api";

const PORT = Number(process.env.port);

createServer().listen(PORT, () =>
  console.log(`Express running at PORT:${PORT}`),
);
