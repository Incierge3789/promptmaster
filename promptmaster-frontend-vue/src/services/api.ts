import axios from 'axios';
import { z } from 'zod';

// API のベースURL
const API_BASE_URL = "http://localhost:5001";

// Axios インスタンス
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ ユーザーデータのスキーマを定義（型バリデーション）
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

// ✅ 型定義
type User = z.infer<typeof UserSchema>;

// ✅ API レスポンスのバリデーション & 型チェック
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get("/users");
    return z.array(UserSchema).parse(response.data);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
};

// ✅ 特定のユーザー情報を取得
export const fetchUserById = async (userId: number): Promise<User | null> => {
  try {
    const response = await api.get(`/users/${userId}`);
    return UserSchema.parse(response.data);
  } catch (error) {
    console.error(`Failed to fetch user ${userId}:`, error);
    return null;
  }
};
