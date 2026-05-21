export const createBouquet = async (body: unknown) => {
  const response = await fetch(
    "https://lotowb.com/api/bouquets",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    throw new Error("꽃다발 생성 실패");
  }

  return response.json();
};