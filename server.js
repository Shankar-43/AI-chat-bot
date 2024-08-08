const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config();
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(__dirname));

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

  const recordsDir = path.join(__dirname, 'records');
  const filePath = path.join(recordsDir, 'conversation.json');

  let existingConversation = [];
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath);
    existingConversation = JSON.parse(fileData);
  }

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

  if (existingConversation.length > 0) {
    history.push(...existingConversation);
  }

  try {
    const chat = model.startChat({
      generationConfig: generationConfig,
      safetySettings: safetySettings,
      history: history,
    });

    const result = await chat.sendMessage(userInput);
    const response = result.response;

    if (!response || !response.text) {
      throw new Error('No response received from the AI.');
    }

    return response.text();
  } catch (error) {
    console.error('Error while generating response:', error);
    throw new Error('Failed to generate a response. Please try again later.');
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
    console.log('Incoming /chat request:', userInput);

    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);

    const conversationEntry = [
      { role: "user", parts: [{ text: userInput }] },
      { role: "model", parts: [{ text: response }] },
    ];

    const recordsDir = path.join(__dirname, 'records');
    const filePath = path.join(recordsDir, 'conversation.json');

    if (!fs.existsSync(recordsDir)) {
      fs.mkdirSync(recordsDir, { recursive: true });
    }

    let existingConversation = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath);
      existingConversation = JSON.parse(fileData);
    }

    existingConversation = existingConversation.concat(conversationEntry);

    fs.writeFileSync(filePath, JSON.stringify(existingConversation, null, 2));

    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ text: 'Oops... Something went wrong! Please try again later.' });
  }
});

app.post('/reset', (req, res) => {
  const recordsDir = path.join(__dirname, 'records');
  const filePath = path.join(recordsDir, 'conversation.json');

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ message: 'Conversation deleted successfully.' });
  } else {
    res.json({ message: 'No conversation file to reset.' });
  }
});

app.post('/new-conversation', (req, res) => {
  const recordsDir = path.join(__dirname, 'records');

  try {
    if (!fs.existsSync(recordsDir)) {
      fs.mkdirSync(recordsDir, { recursive: true });
    }

    // Determine the next available file number
    const files = fs.readdirSync(recordsDir).filter(file => file.startsWith('conversation-') && file.endsWith('.json'));
    const numbers = files.map(file => parseInt(file.match(/conversation-(\d+)\.json/)[1], 10));
    const nextNumber = (numbers.length > 0 ? Math.max(...numbers) + 1 : 1);
    const newFilePath = path.join(recordsDir, `conversation-${nextNumber}.json`);

    // Define initial history
    const initialHistory = [
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

    // Create a new conversation file with initial history
    fs.writeFileSync(newFilePath, JSON.stringify(initialHistory, null, 2));
    res.json({ message: `Started a new conversation. ` });
  } catch (error) {
    console.error('Error while creating a new conversation:', error);
    res.status(500).json({ message: 'Failed to start a new conversation.' });
  }
});

app.get('/has-history', (req, res) => {
  const recordsDir = path.join(__dirname, 'records');
  let hasFiles = false;

  if (fs.existsSync(recordsDir)) {
    const files = fs.readdirSync(recordsDir);
    hasFiles = files.some(file => file.endsWith('.json'));
  }

  res.json({ hasFiles });
});

app.get('/conversation', (req, res) => {
  const recordsDir = path.join(__dirname, 'records');
  const filePath = path.join(recordsDir, 'conversation.json');

  if (fs.existsSync(filePath)) {
    try {
      const fileData = fs.readFileSync(filePath);
      const conversation = JSON.parse(fileData);

      // Format conversation for the chat-history page
      const formattedConversation = conversation.map(entry => ({
        user: entry[0].parts[0].text,
        bot: entry[1].parts[0].text
      }));

      res.json(formattedConversation);
    } catch (error) {
      console.error('Error reading conversation file:', error);
      res.status(500).json({ message: 'Failed to read conversation history.' });
    }
  } else {
    res.json([]);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
