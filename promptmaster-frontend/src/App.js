<template>
  <div class="App">
    <header class="App-header">
      <h1>PromptMaster</h1>
    </header>
    <main>
      <form @submit.prevent="handleSubmit" class="form-container">
        <input 
          type="text" 
          v-model="prompt" 
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
        <button type="submit" class="submit-button">Submit</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
      <div class="response-container">
        <pre v-if="response" class="response-text">{{ response }}</pre>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      prompt: '',
      response: '',
      model: 'gpt-3.5-turbo',
      error: null
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const res = await axios.post('http://localhost:3000/api/prompt', {
          prompt: this.prompt,
          model: this.model
        });
        this.response = res.data.response.choices[0].message.content;
        this.error = null;
      } catch (error) {
        console.error('Error fetching data:', error);
        this.error = error.message;
      }
    }
  }
};
</script>

<style src="./common.css"></style>
