const express = require("express");
const app = express();
const PORT = '9001';
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require("./routes/user-routing");
const albumRouter = require("./routes/album-routing");
const photoRouter = require("./routes/photo-routing");
app.use(cors())
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/album", albumRouter);
app.use("/photo", photoRouter);
app.listen(PORT, () => {
    console.log("Server Started and Listening on port :: ", PORT);
  });