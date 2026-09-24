const express = require("express");
const { Worker } = require("worker_threads");
const path = require("path");

const app = express();
const PORT = 4000;

function generateReportInWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      path.join(__dirname, "reportWorker.js")
    );

    worker.on("message", (result) => {
      resolve(result);
    });

    worker.on("error", (error) => {
      reject(error);
    });

    worker.on("exit", (code) => {
      console.log("Worker exited with code:", code);

      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

app.get("/", (req, res) => {
  console.log("Home request received");
  res.send("Server is running");
});

app.get("/report", async (req, res) => {
  try {
    console.log("Report request received");

    // CPU-intensive work happens in Worker Thread
    const result = await generateReportInWorker();

    console.log("Report finished");

    res.json(result);
  } catch (error) {
    console.error("Report generation failed:", error);

    res.status(500).json({
      message: "Failed to generate report",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// 

const express = require("express");
const { Worker } = require("worker_threads");
const path = require("path");

const app = express();
const PORT = 4000;

function generateReportInWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      path.join(__dirname, "reportWorker.js")
    );

    worker.on("message", (result) => {
      resolve(result);
    });

    worker.on("error", (error) => {
      reject(error);
    });

    worker.on("exit", (code) => {
      console.log("Worker exited with code:", code);

      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

app.get("/", (req, res) => {
  console.log("Home request received");
  res.send("Server is running");
});

app.get("/report", async (req, res) => {
  try {
    console.log("Report request received");

    // CPU-intensive work happens in Worker Thread
    const result = await generateReportInWorker();

    console.log("Report finished");

    res.json(result);
  } catch (error) {
    console.error("Report generation failed:", error);

    res.status(500).json({
      message: "Failed to generate report",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


