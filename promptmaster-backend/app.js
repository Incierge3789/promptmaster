const { OpenAI } = require("openai");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require('node-fetch');
const multer = require('multer');
const fs = require('fs');
const FormData = require('form-data');

dotenv.config();  // .envファイルの読み込み
console.log("API Key: ", process.env.OPENAI_API_KEY);  // この行を追加してAPIキーをログ出力

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const upload = multer({ dest: 'uploads/' });  // 音声ファイルのアップロード先を指定

app.post('/api/prompt', upload.single('file'), async (req, res) => {
  const { prompt, model } = req.body;
  let url = '';
  let body = {};

  switch (model) {
    case 'gpt-4o':
    case 'gpt-4-turbo':
    case 'gpt-3.5-turbo':
      url = 'https://api.openai.com/v1/chat/completions';
      body = {
        model: model,
        messages: [{ role: 'user', content: prompt }]
      };
      break;
    case 'dall-e-3':
      url = 'https://api.openai.com/v1/images/generations';
      body = {
        model: model,
        prompt: prompt
      };
      break;
    case 'whisper-1':
      url = 'https://api.openai.com/v1/audio/transcriptions';
      const form = new FormData();
      form.append('model', model);
      form.append('file', fs.createReadStream(req.file.path), {
        filename: req.file.originalname,
        contentType: req.file.mimetype
      });

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
          },
          body: form
        });

        if (!response.ok) {
          const errorText = await response.text();  // エラーメッセージの詳細を取得
          throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        res.json({ response: data });

        // アップロードされたファイルを削除
        fs.unlinkSync(req.file.path);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
      }
      return;

    default:
      return res.status(400).json({ error: 'Invalid model type' });
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();  // エラーメッセージの詳細を取得
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    res.json({ response: data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
