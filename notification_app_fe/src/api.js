export const fetchNotifications = async () => {
  const res = await fetch(
    "http://20.207.122.201/evaluation-service/notifications",
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
    }
  );

  return res.json();
};