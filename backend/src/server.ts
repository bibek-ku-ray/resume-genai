import app from "./app.js";
import connectToDb from "./config/database.js";

const PORT = process.env.PORT || 5001;

connectToDb()

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:5000");
});
