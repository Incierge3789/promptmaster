README for PromptMaster (English & 日本語)

PromptMaster

Project Overview | プロジェクト概要

English

PromptMaster is a web-based platform designed to manage and optimize AI-generated prompts efficiently. It consists of a backend (Node.js + Express) and two frontend applications (Vue.js and React/Vanilla JS). The platform provides user authentication, prompt storage, and AI integration.

日本語

PromptMasterは、AI生成のプロンプトを効率的に管理・最適化するためのWebプラットフォームです。バックエンド（Node.js + Express） と 2つのフロントエンド（Vue.js & React/Vanilla JS） で構成されています。
ユーザー認証、プロンプトの保存、AI連携などの機能を提供します。

Tech Stack | 使用技術
	•	Backend: Node.js, Express, MongoDB, JWT Authentication, Multer (File Upload)
	•	Frontend (Vue.js): Vue 3, Vue Router, Pinia, Axios, Vite
	•	Frontend (React/Vanilla JS): React (or Vanilla JS), TailwindCSS/Bootstrap, Axios
	•	Other: .env configuration for API keys, authentication, and deployment settings.

Installation | インストール方法

Clone the repository | リポジトリをクローン

git clone https://github.com/Incierge3789/promptmaster.git
cd promptmaster

Backend Setup | バックエンドのセットアップ

cd promptmaster-backend
npm install
cp .env.example .env  # Set environment variables in .env
npm start  # Start the backend server

Frontend Setup (Vue.js) | フロントエンドセットアップ（Vue.js）

cd ../promptmaster-frontend-vue
npm install
npm run dev  # Start the Vue frontend

Frontend Setup (React or Vanilla JS) | フロントエンドセットアップ（React / Vanilla JS）

cd ../promptmaster-frontend
npm install
npm run dev  # Start the React frontend

Features | 主要な機能

Frontend | フロントエンド
	•	User-friendly UI for managing AI prompts.
	•	API connection to the backend.
	•	User authentication & profile management.

Backend | バックエンド
	•	JWT Authentication for user security.
	•	Database Management for prompt storage.
	•	File Upload & Processing via Multer.

Contributing | 貢献

If you would like to contribute, please fork the repository and submit a pull request.

貢献をご希望の方は、リポジトリをフォークし、プルリクエストを送信してください。

Next Steps | 次のステップ

✅ Add environment variable documentation.
✅ Improve API security settings.
✅ Optimize frontend UI.

環境変数のドキュメント追加、APIセキュリティ強化、フロントエンドUIの最適化を予定しています。

