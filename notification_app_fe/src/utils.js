const PRIORITY = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export const getTop10 = (notifications) => {
  const sorted = [...notifications].sort((a, b) => {
    const pa = PRIORITY[a.Type] ?? 1;
    const pb = PRIORITY[b.Type] ?? 1;

    if (pb !== pa) return pb - pa;

    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });

  return sorted.slice(0, 10);
};