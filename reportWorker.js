const { parentPort } = require("worker_threads");

function generateHugeReportSynchronously() {
  const start = Date.now();

  // Simulate 20 seconds of CPU-intensive work
  while (Date.now() - start < 20000) {
    Math.sqrt(Math.random() * 1000000);
  }

  return {
    message: "Report generated successfully",
    generatedAt: new Date().toISOString(),
  };
}

const result = generateHugeReportSynchronously();

// Send result back to main thread
parentPort.postMessage(result);