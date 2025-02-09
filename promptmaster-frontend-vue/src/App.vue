<template>
  <div id="app">
    <header class="App-header">
      <h1>PromptMaster</h1>
    </header>
    <main>
      <form @submit.prevent="handleSubmit" class="form-container">
        <input 
          v-model="prompt" 
          type="text" 
          placeholder="Enter your prompt" 
          class="input-text" 
        />
        <select v-model="model" class="select-model">
          <option value="gpt-4o">GPT-4o</option>
          <option value="gpt-4-turbo">GPT-4 Turbo</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="dall-e-3">DALL·E 3</option>
          <option value="whisper-1">Whisper</option>
        </select>
        <input 
          v-if="model === 'whisper-1'"
          type="file" 
          @change="handleFileChange" 
          class="file-input" 
        />
        <button type="submit" class="submit-button">Submit</button>
      </form>
      <div v-if="model === 'whisper-1'" class="recording-controls">
        <button @click="startRecording" :disabled="isRecording" class="record-button">Start Recording</button>
        <button @click="stopRecording" :disabled="!isRecording" class="record-button">Stop Recording</button>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="responseUrl || response" class="response-container">
        <img v-if="responseUrl" :src="responseUrl" alt="Generated Image" />
        <pre v-else class="response-text">{{ response }}</pre>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      prompt: '',
      response: '',
      responseUrl: '',
      model: 'gpt-3.5-turbo',
      error: null,
      file: null,
      isRecording: false,
      mediaRecorder: null,
      audioChunks: [],
      stream: null  // Add stream to data
    };
  },
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0];
    },
    async handleSubmit() {
      try {
        let res;
        if (this.model === 'whisper-1') {
          const formData = new FormData();
          if (this.file) {
            formData.append('file', this.file);
          } else {
            const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
            formData.append('file', audioBlob, 'recording.webm');
          }
          formData.append('model', this.model);
          res = await axios.post('http://localhost:3000/api/prompt', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          this.response = res.data.response.text;
          this.responseUrl = '';
        } else {
          res = await axios.post('http://localhost:3000/api/prompt', {
            prompt: this.prompt,
            model: this.model
          });
          if (this.model === 'dall-e-3') {
            if (res.data && res.data.response && res.data.response.data && res.data.response.data[0]) {
              this.responseUrl = res.data.response.data[0].url;
              this.response = '';
            } else {
              this.error = "Invalid response format";
            }
          } else {
            if (res.data && res.data.response && res.data.response.choices && res.data.response.choices[0] && res.data.response.choices[0].message) {
              this.response = res.data.response.choices[0].message.content;
              this.responseUrl = '';
            } else {
              this.error = "Invalid response format";
            }
          }
        }
        this.error = null;
      } catch (error) {
        console.error('Error fetching data:', error);
        this.error = error.message;
      }
    },
    async startRecording() {
      this.isRecording = true;
      this.audioChunks = [];
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream, { mimeType: 'audio/webm' });
      this.mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };
      this.mediaRecorder.start();
    },
    async stopRecording() {
      return new Promise((resolve) => {
        this.mediaRecorder.onstop = () => {
          this.isRecording = false;
          this.stream.getTracks().forEach(track => track.stop());  // Stop all tracks
          resolve();
        };
        this.mediaRecorder.stop();
      });
    }
  }
}
</script>

<style scoped>
@import './common.css';

.App-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #282c34;
  color: white;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

.input-text {
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 300px;
}

.select-model {
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 300px;
}

.file-input {
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 300px;
}

.submit-button {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-top: 1rem;
}

.submit-button:hover {
  background-color: #0056b3;
}

.recording-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.record-button {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.record-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.record-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 1rem;
}

.response-container {
  margin-top: 2rem;
}

.response-text {
  white-space: pre-wrap;
  text-align: left;
}

img {
  max-width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
</style>
