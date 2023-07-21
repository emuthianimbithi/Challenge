const express = require("express");
const getRoutes = require("./routes/getRoutes");

const app = express();

app.use(express.json());
app.listen(3001, () => {
  console.log(`listening on port ${3001}`);
});

app.use("/joke", getRoutes);
