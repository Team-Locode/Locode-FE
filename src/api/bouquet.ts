import { api } from './axios'; // 2번에서 만든 파일을 불러옴

export const createBouquet = async (body: unknown) => {
  // baseURL이 세팅되어 있으니 뒷부분 주소('/bouquets')만 씁니다.
  const response = await api.post('/bouquets', body);
  return response.data;
};