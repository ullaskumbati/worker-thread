const express = require("express");

const app = express();
const PORT = 4000;

function generateHugeReportSynchronously() {
  const start = Date.now();

  while (Date.now() - start < 20000) {
    Math.sqrt(Math.random() * 1000000);
  }

  return {
    message: "Report generated successfully",
  };
}

app.get("/", (req, res) => {
  console.log("Home request received");
  res.send("Server is running");
});

app.get("/report", (req, res) => {
  console.log("Report started");

  const result = generateHugeReportSynchronously();

  console.log("Report finished");

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});