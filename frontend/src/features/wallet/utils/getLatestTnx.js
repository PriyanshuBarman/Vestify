export const getLatestTnx = (data, limit = 6) => {
  if (!data) return;
  const result = [];
  for (const monthGroup of data) {
    for (const tnx of monthGroup.transactions) {
      result.push(tnx);
      if (result.length === limit) return result;
    }
  }

  return result;
};
