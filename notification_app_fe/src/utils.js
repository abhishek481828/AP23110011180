export const getTop10 = (data) => {
  const priority = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  return data
    .sort((a, b) => {
      // Priority first
      if (priority[b.Type] !== priority[a.Type]) {
        return priority[b.Type] - priority[a.Type];
      }
      // Then latest time
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, 10);
};