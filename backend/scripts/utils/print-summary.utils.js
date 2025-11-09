export const printSummary = (
  total,
  successCount,
  failureCount,
  skippedCount
) => {
  console.log("-------Summary------");
  console.log("TOTAL: ", total);

  if (successCount) {
    console.log("✅ Successfull: ", successCount);
  }
  if (failureCount) {
    console.log("❌ Failed : ", failureCount);
  }
  if (skippedCount) {
    console.log("⏭ Skipped: ", skippedCount);
  }
};
