const { parentPort } = require("worker_threads");

console.log("Worker started");

function generateHugeReportSynchronously() {
  console.log("Report generation started");

  const start = Date.now();

  while (Date.now() - start < 20000) {
    Math.sqrt(Math.random() * 1000000);
  }

  console.log("Report generation completed");

  return {
    message: "Report generated successfully",
    generatedAt: new Date().toISOString(),
  };
}
console.log("started");
const result = generateHugeReportSynchronously();

console.log("Sending result to main thread");

parentPort.postMessage(result);

console.log("Worker work completed");