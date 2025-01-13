import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

// 투두 수정
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

// 항목 수정
export const updateItemDetails = async (
  tenantId: string,
  itemId: number,
  updatedData: Partial<Item>,
): Promise<Item> => {
  try {
    const response = await axios.patch<Item>(
      `${BASE_URL}/${tenantId}/items/${itemId}`,
      updatedData,
    );
    return response.data;
  } catch (error) {
    console.error('항목 수정 실패:', error);
    throw error;
  }
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

export const uploadImage = async (tenantId: string, file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post(
      `${BASE_URL}/${tenantId}/images/upload`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );

    return response.data.url;
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw error;
  }
};
