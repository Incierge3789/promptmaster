import axios from 'axios';

// APIのベースURLを定義（環境に応じて変更）
const API_BASE_URL = "http://localhost:5000";

// axios のインスタンスを作成
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ユーザー情報の型定義
interface User {
  id: number;
  name: string;
  email: string;
}

// ユーザー一覧を取得するAPI関数
export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/users");
  return response.data;
};

// 特定のユーザー情報を取得
export const fetchUserById = async (userId: number): Promise<User> => {
  const response = await api.get<User>(`/users/${userId}`);
  return response.data;
};
