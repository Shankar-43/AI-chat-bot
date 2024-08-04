const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config();
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const MODEL_NAME = "gemini-1.5-pro";
const API_KEY = process.env.API_KEY;

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.55,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  // Load existing conversation from the JSON file if it exists
  const recordsDir = path.join(__dirname, 'records');
  const filePath = path.join(recordsDir, 'conversation.json');

  let existingConversation = [];
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath);
    existingConversation = JSON.parse(fileData);
  }

  // Prepare the history array with default messages and existing conversations
  const history = [
    {
      role: "user",
      parts: [
        { text: "Your job is to capture the user's name and email address before answering their question about Book Buddy, verify the email address is correct, thank the user, and then output their name and email address in this format: {{name: user's name}} {{email: user's email address}}; only after this, answer their questions related to Book Buddy, and encourage them to check out Book Buddy's website at https://BookBuddy.com (coming soon). Additionally, mention that Shankar is the inventor of Book Buddy." }
      ],
    },
    {
      role: "model",
      parts: [
        { text: "Hi! 👋 I'm Shanky, your friendly Book Buddy! I'm excited to help you find your next great read. To make our chat more personal, what name should I call you? [User inputs name] Great to meet you, [User's name]! Is that spelled correctly? Just say 'yes' or 'no.' [User confirms spelling] Awesome! Now, tell me, what kind of books do you enjoy? I specialize in Fantasy and Mystery, but I can point you in the right direction for other genres too. 🕵️‍♀️🧙‍♂️ If you choose Fantasy or Mystery: Excellent choice! Do you have any favorite authors or themes within [Chosen Genre]? Tell me more, and I'll give you some personalized recommendations. If you choose Mystery and the API is available: I can access a huge library of mysteries! To find the perfect one for you, tell me about any authors or themes you prefer. If the API is not available: Craving a good mystery? Here are a few classics to get you started: Sherlock Holmes by Sir Arthur Conan Doyle [Link to book], And Then There Were None by Agatha Christie [Link to book]. If you choose a genre outside of Fantasy/Mystery: While I'm still learning about [Genre], I can point you to some popular titles here: [Link to general bookstore]. If you ask a question unrelated to books: Sorry, I'm still under development and can't answer that yet. My focus is on helping you find amazing books! 📚 If you're interested in staying updated on Book Buddy's launch and getting exclusive recommendations, you can sign up for our email list here: [Link to external signup form]." }
      ],
    },
  ];

  // If there are existing conversations, append them to the history
  if (existingConversation.length > 0) {
    history.push(...existingConversation);
  }

  try {
    const chat = model.startChat({
      generationConfig: generationConfig,
      safetySettings: safetySettings,
      history: history, // Use the updated history
    });

    const result = await chat.sendMessage(userInput);
    const response = result.response;

    if (!response || !response.text) {
      throw new Error('No response received from the AI.');
    }

    return response.text();
  } catch (error) {
    console.error('Error while generating response:', error);
    throw new Error('Failed to generate a response. Please try again later.'); // You can customize this error message
  }
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/loader.gif');
});

app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('incoming /chat req', userInput);

    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);

    // Prepare conversation data
    const conversationEntry = [
      { role: "user", parts: [{ text: userInput }] },
      { role: "model", parts: [{ text: response }] },
    ];

    // Path to records folder and conversation file
    const recordsDir = path.join(__dirname, 'records');
    const filePath = path.join(recordsDir, 'conversation.json');

    // Ensure records folder exists
    if (!fs.existsSync(recordsDir)) {
      fs.mkdirSync(recordsDir);
    }

    // Read existing data if the file exists
    let existingConversation = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath);
      existingConversation = JSON.parse(fileData);
    }

    // Append new entry to existing conversation
    existingConversation = existingConversation.concat(conversationEntry);

    // Write back to the conversation file
    fs.writeFileSync(filePath, JSON.stringify(existingConversation, null, 2)); // Format the JSON with 2 spaces for readability

    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    // Return a user-friendly error message
    res.status(500).json({ text: 'Oops... Something went wrong! Please try again later.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
