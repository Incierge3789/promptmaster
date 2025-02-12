import axios from 'axios';
import { z } from 'zod';

// ✅ API のベースURL
const API_BASE_URL = "http://localhost:5001";

// ✅ Axios インスタンス
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ ユーザーのスキーマを定義
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

// `User` をエクスポートする
export type User = z.infer<typeof UserSchema>;

// ✅ 配列のスキーマ
const UsersArraySchema = z.array(UserSchema);


// ✅ ユーザー一覧を取得
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get("/users");
    return UsersArraySchema.parse(response.data); // バリデーション
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return []; // エラー時は空配列を返す
  }
};

// ✅ ユーザー取得 by ID
export const fetchUserById = async (userId: number): Promise<User | null> => {
  try {
    const response = await api.get(`/users/${userId}`);
    return UserSchema.parse(response.data);
  } catch (error) {
    console.error(`Failed to fetch user ${userId}:`, error);
    return null; // エラー時は `null` を返す
  }
};

