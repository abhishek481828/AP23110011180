export const Log = async (stack, level, pkg, message) => {
  try {
    await fetch("http://20.207.122.201/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
      }),
    });
  } catch (err) {
    console.warn("Log failed:", err);
  }
};