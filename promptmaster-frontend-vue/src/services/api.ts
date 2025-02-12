import axios, { AxiosError } from "axios";
import { z } from "zod";

// API のベースURL
const API_BASE_URL = "http://localhost:5001";

// Axios インスタンス
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ✅ ユーザーの型を定義
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});
type User = z.infer<typeof UserSchema>;

// ✅ 共通エラーハンドリング関数
const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    console.error("API Error:", error.message);
    throw new Error(error.response?.data?.message || "An unknown API error occurred");
  } else {
    console.error("Unexpected Error:", error);
    throw new Error("An unexpected error occurred");
  }
};

// ✅ ユーザーリスト取得関数（エラーハンドリング適用）
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get("/users");
    return z.array(UserSchema).parse(response.data);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return []; // ✅ エラー時に空の配列を返す
  }
};

// ✅ ユーザー取得 by ID（エラーハンドリング適用）
export const fetchUserById = async (userId: number): Promise<User | null> => {
  try {
    const response = await api.get(`/users/${userId}`);
    return UserSchema.parse(response.data);
  } catch (error) {
    console.error(`Failed to fetch user ${userId}:`, error);
    return null; // ✅ エラー時に null を返す
  }
};