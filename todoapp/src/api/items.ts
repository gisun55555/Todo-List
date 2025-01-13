import axios from 'axios';

const BASE_URL = 'https://assignment-todolist-api.vercel.app/api';

export interface Item {
  id: number;
  tenantId: string;
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted: boolean;
}

// 항목 생성
export const createItem = async (
  tenantId: string,
  name: string,
): Promise<Item> => {
  const response = await axios.post<Item>(`${BASE_URL}/${tenantId}/items`, {
    name,
  });
  return response.data;
};

// 항목 목록 조회
export const getItems = async (
  tenantId: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<Item[]> => {
  const response = await axios.get<Item[]>(`${BASE_URL}/${tenantId}/items`, {
    params: { page, pageSize },
  });
  return response.data;
};

// 항목 상세 조회
export const getItemDetails = async (
  tenantId: string,
  itemId: number,
): Promise<Item> => {
  const response = await axios.get<Item>(
    `${BASE_URL}/${tenantId}/items/${itemId}`,
  );
  return response.data;
};

// 항목 수정
export const updateItem = async (
  tenantId: string,
  itemId: number,
  data: Partial<Item>,
): Promise<Item> => {
  const response = await axios.patch<Item>(
    `${BASE_URL}/${tenantId}/items/${itemId}`,
    data,
  );
  return response.data;
};

// 항목 삭제
export const deleteItem = async (
  tenantId: string,
  itemId: number,
): Promise<{ message: string }> => {
  const response = await axios.delete<{ message: string }>(
    `${BASE_URL}/${tenantId}/items/${itemId}`,
  );
  return response.data;
};
