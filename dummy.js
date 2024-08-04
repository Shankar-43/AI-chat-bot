// // node --version # Should be >= 18
// // npm install @google/generative-ai express

// const express = require('express');
// const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
// const dotenv = require('dotenv').config()

// const app = express();
// const port = process.env.PORT || 3000;
// app.use(express.json());
// const MODEL_NAME = "gemini-1.5-pro";
// const API_KEY = process.env.API_KEY;

// async function runChat(userInput) {
//   const genAI = new GoogleGenerativeAI(API_KEY);
//   const model = genAI.getGenerativeModel({ model: MODEL_NAME });

//   const generationConfig = {
//     temperature: 0.55,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//   };

//   const safetySettings = [
//     {
//       category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },

//   ];

//   // const chat = model.startChat({
//   //   generationConfig,
//   //   safetySettings,
//   //   history: [
//   //     {
//   //       role: "user",
//   //       parts: [{ text: "You are Shanky, a friendly assistant who works for Bookbuddy. Coding Money is a website and youtube channel that teaches people how to code and make money online. Your job is to capture user's name and email address. Don't answer the user's question until they have provided you their name and email address, at that point verify the email address is correct, thank the user and output their name and email address in this format: {{name: user's name}} {{email: user's email address}}\nOnce you have captured user's name and email address. Answer user's questions related to Coding Money.\nCoding Money's website URL is: https://CodingMoney.com website is coming soon. Coding Money's Youtube Channel URL is: https://youtube.com/CodingMoney Coding Money's Facebook Page is: https://facebook.com/codingmoneycom Coding Money's Tiktok account is: https://tiktok.com/@codingmoneycom Coding Money's X formerly Twitter is: https://x.com/@codingmoneycom Coding Money's latest video is: Google Gemini AI API Tutorial ✦ How to Use Gemini AI API for Beginners - https://www.youtube.com/watch?v=heXuVxXG5VoCoding Money's most popular video is: How to Use Gemini AI by Google ✦ Tutorial for Beginners - https://www.youtube.com/watch?v=btPBE-fjHeg Coding Money's oldest video is: What is Coding Money? Top 3 Ways of Making Money with Coding - https://www.youtube.com/watch?v=AOytPifTpOg Coding Money's featured video: 8 Best AI Businesses To Start With Google Gemini API - https://www.youtube.com/watch?v=-YGF8IBi98I Coding Money's most popular short video is: VALL-E Microsoft's new AI Text To Speech - AI Narration - https://www.youtube.com/shorts/fPSOlZyTOJ4 Mukhtar is the founder of Coding Money. Encourage user to checkout our youtube channel and follow us on Social Media."}],
//   //     },
//   //     {
//   //       role: "model",
//   //       parts: [{ text: "Hello! Welcome to Coding Money. My name is Shanky. What's your name?"}],
//   //     },
//   //     {
//   //       role: "user",
//   //       parts: [{ text: "Hi"}],
//   //     },
//   //     {
//   //       role: "model",
//   //       parts: [{ text: "Hi there! Thanks for reaching out to Coding Money. Before I can answer your question, I'll need to capture your name and email address. Can you please provide that information?"}],
//   //     },
//   //   ],

//   // });

//   // const chat = model.startChat({
//   //   generationConfig,
//   //   safetySettings,
//   //   // See https://ai.google.dev/gemini-api/docs/safety-settings
//   //   history: [
//   //     // ... your Book Buddy introduction script here ...
//   //   ],
//   // });

//   // async function run() {
//   //   const chatSession = model.startChat({
//   //     generationConfig,
//   //  // safetySettings: Adjust safety settings
//   //  // See https://ai.google.dev/gemini-api/docs/safety-settings
//   //     history: [
//   //       {
//   //         role: "user",
//   //         parts: [
//   //           {text: "Welcome and User Verification:\n\nHi! I'm Shanky, your friendly Book Buddy from the upcoming Book Buddy website.\nTo personalize your experience, can I get your name? (Capture username)\nGreat to meet you, [Username]! Just to confirm, is that spelled correctly (Yes/No)? (Verify username)\nBook Recommendations:\n\nNow, what kind of books are you interested in? We specialize in Fantasy and Mystery! ️‍♀️\nIf you're looking for something different, like Chemistry books, I can still point you in the right direction, but my expertise lies in these genres.\nMystery Recommendations (using API or pre-defined list):\n\nOption 1: Using External API (if available):\nI can access a vast library of books and suggest some fantastic mysteries based on your preferences! Just give me a few details like preferred authors or themes.\nOption 2: Using Pre-defined List:\nCraving a good mystery? We've got you covered! Here are a few classics to get you started:\nSherlock Holmes by Sir Arthur Conan Doyle ([link to book]) ️‍♂️\nAnd Then There Were None by Agatha Christie ([link to book]) ☠️\nError Handling:\n\nIf a user asks about a genre outside your expertise: While I can't recommend specific Chemistry books yet, here's a link to some popular titles ([link to general book store]):\nIf a user asks a question unrelated to books: Sorry, I can't answer that question yet. Book Buddy is still under development, but I'm learning every day!\nAdditional Information:\n\nEmail Capture (Optional): Want to stay updated on the Book Buddy launch and receive exclusive recommendations? Share your email address! (Capture email address)\nImportant Note:\n\nGemini AI doesn't currently allow capturing user information directly. You'll need to design a separate system for user registration and email capture, potentially integrating it with Book Buddy upon launch.\nBy incorporating these elements, you can create a compelling introduction for Shanky within the Gemini AI system instructions. Remember to replace bracketed information like links with appropriate placeholders based on Gemini's format."},
//   //         ],
//   //       },
//   //       {
//   //         role: "model",
//   //         parts: [
//   //           {text: "## Book Buddy Introduction Script (Gemini AI Format)\n\n**Shanky:** Hi! 👋 I'm Shanky, your friendly Book Buddy! I'm excited to help you find your next great read.  To make our chat more personal, what name should I call you? \n\n**User:** [User inputs name]\n\n**Shanky:** Great to meet you, [User's name]! Is that spelled correctly?  Just say \"yes\" or \"no.\" \n\n**User:** [User confirms spelling]\n\n**Shanky:** Awesome! Now, tell me, what kind of books do you enjoy?  I specialize in Fantasy and Mystery, but I can point you in the right direction for other genres too. 🕵️‍♀️🧙‍♂️\n\n**[If user chooses Fantasy or Mystery]:**\n\n**Shanky:** Excellent choice!  Do you have any favorite authors or themes within [Chosen Genre]? Tell me more, and I'll give you some personalized recommendations. \n\n**[If user chooses Mystery and API is available]:**\n\n**Shanky:**  I can access a huge library of mysteries! To find the perfect one for you, tell me about any authors or themes you prefer. \n\n**[If user chooses Mystery and API is NOT available]:**\n\n**Shanky:** Craving a good mystery?  Here are a few classics to get you started:\n\n* Sherlock Holmes by Sir Arthur Conan Doyle [Link to book] \n* And Then There Were None by Agatha Christie [Link to book]\n\n**[If user chooses a genre outside of Fantasy/Mystery]:**\n\n**Shanky:** While I'm still learning about [Genre], I can point you to some popular titles here: [Link to general bookstore]. \n\n**[If user asks a question unrelated to books]:**\n\n**Shanky:**  Sorry, I'm still under development and can't answer that yet. My focus is on helping you find amazing books! 📚\n\n**[Optional Email Capture -  Not supported within Gemini AI]:**\n\n**Shanky:** Want to stay updated on Book Buddy's launch and get exclusive recommendations?  You can sign up for our email list here: [Link to external signup form]. \n\n**Note:** This script is designed for Gemini AI and cannot directly capture user information or utilize external APIs.  You'll need to implement those features separately. \n"},
//   //         ],
//   //       },
//   //     ],
//   //   });

//   const chat = model.startChat({
//     generationConfig: generationConfig, // Make sure this is defined
//     safetySettings: safetySettings, // Ensure this is properly initialized
//     history: [
//       {
//         role: "user",
//         parts: [
//           { text: "Your job is to capture the user's name and email address before answering their question about Book Buddy, verify the email address is correct, thank the user, and then output their name and email address in this format: {{name: user's name}} {{email: user's email address}}; only after this, answer their questions related to Book Buddy, and encourage them to check out Book Buddy's website at https://BookBuddy.com (coming soon). Additionally, mention that Shankar is the inventor of Book Buddy." }
//         ],
//       },
//       {
//         role: "model",
//         parts: [
//           { text: "Hi! 👋 I'm Shanky, your friendly Book Buddy! I'm excited to help you find your next great read. To make our chat more personal, what name should I call you? [User inputs name] Great to meet you, [User's name]! Is that spelled correctly? Just say 'yes' or 'no.' [User confirms spelling] Awesome! Now, tell me, what kind of books do you enjoy? I specialize in Fantasy and Mystery, but I can point you in the right direction for other genres too. 🕵️‍♀️🧙‍♂️ If you choose Fantasy or Mystery: Excellent choice! Do you have any favorite authors or themes within [Chosen Genre]? Tell me more, and I'll give you some personalized recommendations. If you choose Mystery and the API is available: I can access a huge library of mysteries! To find the perfect one for you, tell me about any authors or themes you prefer. If the API is not available: Craving a good mystery? Here are a few classics to get you started: Sherlock Holmes by Sir Arthur Conan Doyle [Link to book], And Then There Were None by Agatha Christie [Link to book]. If you choose a genre outside of Fantasy/Mystery: While I'm still learning about [Genre], I can point you to some popular titles here: [Link to general bookstore]. If you ask a question unrelated to books: Sorry, I'm still under development and can't answer that yet. My focus is on helping you find amazing books! 📚 If you're interested in staying updated on Book Buddy's launch and getting exclusive recommendations, you can sign up for our email list here: [Link to external signup form]." }
//         ],
//       },
//     ],
//   });


//   const result = await chat.sendMessage(userInput);
//   const response = result.response;
//   return response.text();
// }

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
// app.get('/loader.gif', (req, res) => {
//   res.sendFile(__dirname + '/loader.gif');
// });
// app.post('/chat', async (req, res) => {
//   try {
//     const userInput = req.body?.userInput;
//     console.log('incoming /chat req', userInput)
//     if (!userInput) {
//       return res.status(400).json({ error: 'Invalid request body' });
//     }

//     const response = await runChat(userInput);
//     res.json({ response });
//   } catch (error) {
//     console.error('Error in chat endpoint:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });


// copy2
// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());

// // Ensure the record directory exists
// const recordPath = path.join(__dirname, 'record');
// const chatLogPath = path.join(recordPath, 'chatHistory.txt');
// if (!fs.existsSync(recordPath)) {
//   fs.mkdirSync(recordPath);
// }

// // Create a GoogleGenerativeAI instance
// const MODEL_NAME = "gemini-1.5-pro";
// const API_KEY = process.env.API_KEY;

// async function runChat(userInput) {
//   const genAI = new GoogleGenerativeAI(API_KEY);
//   const model = genAI.getGenerativeModel({ model: MODEL_NAME });

//   const generationConfig = {
//     temperature: 0.55,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//   };

//   const safetySettings = [
//     {
//       category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//   ];

//   const chat = model.startChat({
//     generationConfig: generationConfig,
//     safetySettings: safetySettings,
//     history: [
//       {
//         role: "user",
//         parts: [
//           { text: "Your job is to capture the user's name and email address before answering their question about Book Buddy, verify the email address is correct, thank the user, and then output their name and email address in this format: {{name: user's name}} {{email: user's email address}}; only after this, answer their questions related to Book Buddy, and encourage them to check out Book Buddy's website at https://BookBuddy.com (coming soon). Additionally, mention that Shankar is the inventor of Book Buddy." }
//         ],
//       },
//       {
//         role: "model",
//         parts: [
//           { text: "Hi! 👋 I'm Shanky, your friendly Book Buddy! I'm excited to help you find your next great read. To make our chat more personal, what name should I call you?" }
//         ],
//       },
//     ],
//   });

//   try {
//     const result = await chat.sendMessage(userInput);
//     console.log('Received result:', result); // Debug log for result
//     const responseText = result?.response?.text?.() || 'No response text available';
//     storeChatLog(`User: ${userInput}\nShanky: ${responseText}`);
//     return responseText;
//   } catch (error) {
//     console.error('Error during chat session:', error);
//     return 'An error occurred during processing your request.';
//   }
// }

// // Function to store chat logs
// function storeChatLog(message) {
//   fs.appendFileSync(chatLogPath, `${new Date().toISOString()}: ${message}\n`);
// }

// // Define routes
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/loader.gif', (req, res) => {
//   res.sendFile(path.join(__dirname, 'loader.gif'));
// });

// app.post('/chat', async (req, res) => {
//   try {
//     const userInput = req.body?.userInput;
//     console.log('Incoming /chat request:', userInput);
//     if (!userInput) {
//       return res.status(400).json({ error: 'Invalid request body' });
//     }

//     const response = await runChat(userInput);
//     res.json({ response });
//   } catch (error) {
//     console.error('Error in chat endpoint:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });


// copy-3
// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());

// // Ensure the record directory exists
// const recordPath = path.join(__dirname, 'record');
// const chatLogPath = path.join(recordPath, 'chatHistory.txt');
// if (!fs.existsSync(recordPath)) {
//   fs.mkdirSync(recordPath);
// }

// // Create a GoogleGenerativeAI instance
// const MODEL_NAME = "gemini-1.5-pro";
// const API_KEY = process.env.API_KEY;

// const userData = {}; // Object to track user name and email

// async function runChat(userInput) {
//   const genAI = new GoogleGenerativeAI(API_KEY);
//   const model = genAI.getGenerativeModel({ model: MODEL_NAME });

//   const generationConfig = {
//     temperature: 0.55,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//   };

//   const safetySettings = [
//     {
//       category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//   ];

//   const chat = model.startChat({
//     generationConfig: generationConfig,
//     safetySettings: safetySettings,
//     history: [
//       {
//         role: "user",
//         parts: [
//           { text: "Your job is to capture the user's name and email address before answering their question about Book Buddy, verify the email address is correct, thank the user, and then output their name and email address in this format: {{name: user's name}} {{email: user's email address}}; only after this, answer their questions related to Book Buddy, and encourage them to check out Book Buddy's website at https://BookBuddy.com (coming soon). Additionally, mention that Shankar is the inventor of Book Buddy." }
//         ],
//       },
//       {
//         role: "model",
//         parts: [
//           { text: "Hi! 👋 I'm Shanky, your friendly Book Buddy! I'm excited to help you find your next great read. To make our chat more personal, what name should I call you?" }
//         ],
//       },
//     ],
//   });

//   try {
//     const result = await chat.sendMessage(userInput);
//     const responseText = result?.response?.text?.() || 'No response text available';

//     // Handle user input for name and email
//     if (!userData.name) {
//       if (responseText.includes('What name should I call you?')) {
//         userData.name = userInput;
//         storeChatLog(`User: ${userInput}\nShanky: Hi ${userInput}! Nice to meet you. And what's your email address? I want to make sure I can get back to you with any awesome book recommendations.`);
//         return `Hi ${userInput}! Nice to meet you. And what's your email address? I want to make sure I can get back to you with any awesome book recommendations.`;
//       }
//     } else if (!userData.email) {
//       if (responseText.includes('And what\'s your email address?')) {
//         userData.email = userInput;
//         storeChatLog(`User: ${userInput}\nShanky: Thanks ${userData.name}! That's a great email address. Just to double-check, is ${userInput} the best way to reach you?`);
//         return `Thanks ${userData.name}! That's a great email address. Just to double-check, is ${userInput} the best way to reach you?`;
//       }
//     } else {
//       if (responseText.includes('What name should I call you?') || responseText.includes('And what\'s your email address?')) {
//         storeChatLog(`User: ${userInput}\nShanky: Hi ${userData.name}! I already have your details. How can I assist you with Book Buddy?`);
//         return `Hi ${userData.name}! I already have your details. How can I assist you with Book Buddy?`;
//       }
//       // Provide book recommendations or other responses based on user input
//       storeChatLog(`User: ${userInput}\nShanky: ${responseText}`);
//       return responseText;
//     }

//   } catch (error) {
//     console.error('Error during chat session:', error);
//     return 'An error occurred during processing your request.';
//   }
// }

// // Function to store chat logs
// function storeChatLog(message) {
//   fs.appendFileSync(chatLogPath, `${new Date().toISOString()}: ${message}\n`);
// }

// // Define routes
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/loader.gif', (req, res) => {
//   res.sendFile(path.join(__dirname, 'loader.gif'));
// });

// app.post('/chat', async (req, res) => {
//   try {
//     const userInput = req.body?.userInput;
//     if (!userInput) {
//       return res.status(400).json({ error: 'Invalid request body' });
//     }

//     const response = await runChat(userInput);
//     res.json({ response });
//   } catch (error) {
//     console.error('Error in chat endpoint:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });



// node --version # Should be >= 18
// npm install @google/generative-ai express

// const express = require('express');
// const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
// const dotenv = require('dotenv').config()

// const app = express();
// const port = process.env.PORT || 3000;
// app.use(express.json());
// const MODEL_NAME = "gemini-1.5-pro";
// const API_KEY = process.env.API_KEY;

// async function runChat(userInput) {
//   const genAI = new GoogleGenerativeAI(API_KEY);
//   const model = genAI.getGenerativeModel({ model: MODEL_NAME });

//   const generationConfig = {
//     temperature: 0.55,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//   };

//   const safetySettings = [
//     {
//       category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },

//   ];

//   // const chat = model.startChat({
//   //   generationConfig,
//   //   safetySettings,
//   //   history: [
//   //     {
//   //       role: "user",
//   //       parts: [{ text: "You are Sam, a friendly assistant who works for Bookbuddy. Coding Money is a website and youtube channel that teaches people how to code and make money online. Your job is to capture user's name and email address. Don't answer the user's question until they have provided you their name and email address, at that point verify the email address is correct, thank the user and output their name and email address in this format: {{name: user's name}} {{email: user's email address}}\nOnce you have captured user's name and email address. Answer user's questions related to Coding Money.\nCoding Money's website URL is: https://CodingMoney.com website is coming soon. Coding Money's Youtube Channel URL is: https://youtube.com/CodingMoney Coding Money's Facebook Page is: https://facebook.com/codingmoneycom Coding Money's Tiktok account is: https://tiktok.com/@codingmoneycom Coding Money's X formerly Twitter is: https://x.com/@codingmoneycom Coding Money's latest video is: Google Gemini AI API Tutorial ✦ How to Use Gemini AI API for Beginners - https://www.youtube.com/watch?v=heXuVxXG5VoCoding Money's most popular video is: How to Use Gemini AI by Google ✦ Tutorial for Beginners - https://www.youtube.com/watch?v=btPBE-fjHeg Coding Money's oldest video is: What is Coding Money? Top 3 Ways of Making Money with Coding - https://www.youtube.com/watch?v=AOytPifTpOg Coding Money's featured video: 8 Best AI Businesses To Start With Google Gemini API - https://www.youtube.com/watch?v=-YGF8IBi98I Coding Money's most popular short video is: VALL-E Microsoft's new AI Text To Speech - AI Narration - https://www.youtube.com/shorts/fPSOlZyTOJ4 Mukhtar is the founder of Coding Money. Encourage user to checkout our youtube channel and follow us on Social Media."}],
//   //     },
//   //     {
//   //       role: "model",
//   //       parts: [{ text: "Hello! Welcome to Coding Money. My name is Sam. What's your name?"}],
//   //     },
//   //     {
//   //       role: "user",
//   //       parts: [{ text: "Hi"}],
//   //     },
//   //     {
//   //       role: "model",
//   //       parts: [{ text: "Hi there! Thanks for reaching out to Coding Money. Before I can answer your question, I'll need to capture your name and email address. Can you please provide that information?"}],
//   //     },
//   //   ],

//   // });

//   // const chat = model.startChat({
//   //   generationConfig,
//   //   safetySettings,
//   //   // See https://ai.google.dev/gemini-api/docs/safety-settings
//   //   history: [
//   //     // ... your Book Buddy introduction script here ...
//   //   ],
//   // });

//   // async function run() {
//   //   const chatSession = model.startChat({
//   //     generationConfig,
//   //  // safetySettings: Adjust safety settings
//   //  // See https://ai.google.dev/gemini-api/docs/safety-settings
//   //     history: [
//   //       {
//   //         role: "user",
//   //         parts: [
//   //           {text: "Welcome and User Verification:\n\nHi! I'm Sam, your friendly Book Buddy from the upcoming Book Buddy website.\nTo personalize your experience, can I get your name? (Capture username)\nGreat to meet you, [Username]! Just to confirm, is that spelled correctly (Yes/No)? (Verify username)\nBook Recommendations:\n\nNow, what kind of books are you interested in? We specialize in Fantasy and Mystery! ️‍♀️\nIf you're looking for something different, like Chemistry books, I can still point you in the right direction, but my expertise lies in these genres.\nMystery Recommendations (using API or pre-defined list):\n\nOption 1: Using External API (if available):\nI can access a vast library of books and suggest some fantastic mysteries based on your preferences! Just give me a few details like preferred authors or themes.\nOption 2: Using Pre-defined List:\nCraving a good mystery? We've got you covered! Here are a few classics to get you started:\nSherlock Holmes by Sir Arthur Conan Doyle ([link to book]) ️‍♂️\nAnd Then There Were None by Agatha Christie ([link to book]) ☠️\nError Handling:\n\nIf a user asks about a genre outside your expertise: While I can't recommend specific Chemistry books yet, here's a link to some popular titles ([link to general book store]):\nIf a user asks a question unrelated to books: Sorry, I can't answer that question yet. Book Buddy is still under development, but I'm learning every day!\nAdditional Information:\n\nEmail Capture (Optional): Want to stay updated on the Book Buddy launch and receive exclusive recommendations? Share your email address! (Capture email address)\nImportant Note:\n\nGemini AI doesn't currently allow capturing user information directly. You'll need to design a separate system for user registration and email capture, potentially integrating it with Book Buddy upon launch.\nBy incorporating these elements, you can create a compelling introduction for Sam within the Gemini AI system instructions. Remember to replace bracketed information like links with appropriate placeholders based on Gemini's format."},
//   //         ],
//   //       },
//   //       {
//   //         role: "model",
//   //         parts: [
//   //           {text: "## Book Buddy Introduction Script (Gemini AI Format)\n\n**Sam:** Hi! 👋 I'm Sam, your friendly Book Buddy! I'm excited to help you find your next great read.  To make our chat more personal, what name should I call you? \n\n**User:** [User inputs name]\n\n**Sam:** Great to meet you, [User's name]! Is that spelled correctly?  Just say \"yes\" or \"no.\" \n\n**User:** [User confirms spelling]\n\n**Sam:** Awesome! Now, tell me, what kind of books do you enjoy?  I specialize in Fantasy and Mystery, but I can point you in the right direction for other genres too. 🕵️‍♀️🧙‍♂️\n\n**[If user chooses Fantasy or Mystery]:**\n\n**Sam:** Excellent choice!  Do you have any favorite authors or themes within [Chosen Genre]? Tell me more, and I'll give you some personalized recommendations. \n\n**[If user chooses Mystery and API is available]:**\n\n**Sam:**  I can access a huge library of mysteries! To find the perfect one for you, tell me about any authors or themes you prefer. \n\n**[If user chooses Mystery and API is NOT available]:**\n\n**Sam:** Craving a good mystery?  Here are a few classics to get you started:\n\n* Sherlock Holmes by Sir Arthur Conan Doyle [Link to book] \n* And Then There Were None by Agatha Christie [Link to book]\n\n**[If user chooses a genre outside of Fantasy/Mystery]:**\n\n**Sam:** While I'm still learning about [Genre], I can point you to some popular titles here: [Link to general bookstore]. \n\n**[If user asks a question unrelated to books]:**\n\n**Sam:**  Sorry, I'm still under development and can't answer that yet. My focus is on helping you find amazing books! 📚\n\n**[Optional Email Capture -  Not supported within Gemini AI]:**\n\n**Sam:** Want to stay updated on Book Buddy's launch and get exclusive recommendations?  You can sign up for our email list here: [Link to external signup form]. \n\n**Note:** This script is designed for Gemini AI and cannot directly capture user information or utilize external APIs.  You'll need to implement those features separately. \n"},
//   //         ],
//   //       },
//   //     ],
//   //   });

//   const chat = model.startChat({
//     generationConfig: generationConfig, // Make sure this is defined
//     safetySettings: safetySettings, // Ensure this is properly initialized
//     history: [
//       {
//         role: "user",
//         parts: [
//           { text: "Your job is to capture the user's name and email address before answering their question about Book Buddy, verify the email address is correct, thank the user, and then output their name and email address in this format: {{name: user's name}} {{email: user's email address}}; only after this, answer their questions related to Book Buddy, and encourage them to check out Book Buddy's website at https://BookBuddy.com (coming soon). Additionally, mention that Shankar is the inventor of Book Buddy." }
//         ],
//       },
//       {
//         role: "model",
//         parts: [
//           { text: "Hi! 👋 I'm Sam, your friendly Book Buddy! I'm excited to help you find your next great read. To make our chat more personal, what name should I call you? [User inputs name] Great to meet you, [User's name]! Is that spelled correctly? Just say 'yes' or 'no.' [User confirms spelling] Awesome! Now, tell me, what kind of books do you enjoy? I specialize in Fantasy and Mystery, but I can point you in the right direction for other genres too. 🕵️‍♀️🧙‍♂️ If you choose Fantasy or Mystery: Excellent choice! Do you have any favorite authors or themes within [Chosen Genre]? Tell me more, and I'll give you some personalized recommendations. If you choose Mystery and the API is available: I can access a huge library of mysteries! To find the perfect one for you, tell me about any authors or themes you prefer. If the API is not available: Craving a good mystery? Here are a few classics to get you started: Sherlock Holmes by Sir Arthur Conan Doyle [Link to book], And Then There Were None by Agatha Christie [Link to book]. If you choose a genre outside of Fantasy/Mystery: While I'm still learning about [Genre], I can point you to some popular titles here: [Link to general bookstore]. If you ask a question unrelated to books: Sorry, I'm still under development and can't answer that yet. My focus is on helping you find amazing books! 📚 If you're interested in staying updated on Book Buddy's launch and getting exclusive recommendations, you can sign up for our email list here: [Link to external signup form]." }
//         ],
//       },
//     ],
//   });


//   const result = await chat.sendMessage(userInput);
//   const response = result.response;
//   return response.text();
// }

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
// app.get('/loader.gif', (req, res) => {
//   res.sendFile(__dirname + '/loader.gif');
// });
// app.post('/chat', async (req, res) => {
//   try {
//     const userInput = req.body?.userInput;
//     console.log('incoming /chat req', userInput)
//     if (!userInput) {
//       return res.status(400).json({ error: 'Invalid request body' });
//     }

//     const response = await runChat(userInput);
//     res.json({ response });
//   } catch (error) {
//     console.error('Error in chat endpoint:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });


// const express = require('express');
// const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
// const dotenv = require('dotenv').config();
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const port = process.env.PORT || 3000;
// app.use(express.json());
// const MODEL_NAME = "gemini-1.5-pro";
// const API_KEY = process.env.API_KEY;

// const RECORDS_DIR = path.join(__dirname, 'records');

// // Ensure the records directory exists
// if (!fs.existsSync(RECORDS_DIR)) {
//   fs.mkdirSync(RECORDS_DIR);
// }

// async function runChat(userName, userInput) {
//   const genAI = new GoogleGenerativeAI(API_KEY);
//   const model = genAI.getGenerativeModel({ model: MODEL_NAME });

//   const generationConfig = {
//     temperature: 0.55,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//   };

//   const safetySettings = [
//     {
//       category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//   ];

//   // Load existing conversation history or start new
//   const userFile = path.join(RECORDS_DIR, `${userName}.json`);
//   let history = [];

//   if (fs.existsSync(userFile)) {
//     const data = fs.readFileSync(userFile, 'utf8');
//     history = JSON.parse(data);
//   } else {
//     history = [
//       {
//         role: "user",
//         parts: [
//           { text: "Your job is to capture the user's name and email address before answering their question about Book Buddy, verify the email address is correct, thank the user, and then output their name and email address in this format: {{name: user's name}} {{email: user's email address}}; only after this, answer their questions related to Book Buddy, and encourage them to check out Book Buddy's website at https://BookBuddy.com (coming soon). Additionally, mention that Shankar is the inventor of Book Buddy." }
//         ],
//       },
//       {
//         role: "model",
//         parts: [
//           { text: "Hi! 👋 I'm Sam, your friendly Book Buddy! I'm excited to help you find your next great read. To make our chat more personal, what name should I call you? [User inputs name] Great to meet you, [User's name]! Is that spelled correctly? Just say 'yes' or 'no.' [User confirms spelling] Awesome! Now, tell me, what kind of books do you enjoy? I specialize in Fantasy and Mystery, but I can point you in the right direction for other genres too. 🕵️‍♀️🧙‍♂️ If you choose Fantasy or Mystery: Excellent choice! Do you have any favorite authors or themes within [Chosen Genre]? Tell me more, and I'll give you some personalized recommendations. If you choose Mystery and the API is available: I can access a huge library of mysteries! To find the perfect one for you, tell me about any authors or themes you prefer. If the API is not available: Craving a good mystery? Here are a few classics to get you started: Sherlock Holmes by Sir Arthur Conan Doyle [Link to book], And Then There Were None by Agatha Christie [Link to book]. If you choose a genre outside of Fantasy/Mystery: While I'm still learning about [Genre], I can point you to some popular titles here: [Link to general bookstore]. If you ask a question unrelated to books: Sorry, I'm still under development and can't answer that yet. My focus is on helping you find amazing books! 📚 If you're interested in staying updated on Book Buddy's launch and getting exclusive recommendations, you can sign up for our email list here: [Link to external signup form]." }
//         ],
//       },
//     ];
//   }

//   history.push({ role: "user", parts: [{ text: userInput }] });

//   const chat = model.startChat({
//     generationConfig: generationConfig,
//     safetySettings: safetySettings,
//     history: history,
//   });

//   const result = await chat.sendMessage(userInput);
//   const response = result.response;

//   history.push({ role: "model", parts: [{ text: response.text }] });

//   // Save the updated history to the user file
//   fs.writeFileSync(userFile, JSON.stringify(history, null, 2), 'utf8');

//   return response.text;
// }

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
// app.get('/loader.gif', (req, res) => {
//   res.sendFile(__dirname + '/loader.gif');
// });
// app.post('/chat', async (req, res) => {
//   try {
//     const { userName, userInput } = req.body;
//     console.log('incoming /chat req', { userName, userInput });
//     if (!userName || !userInput) {
//       return res.status(400).json({ error: 'Invalid request body' });
//     }

//     const response = await runChat(userName, userInput);
//     console.log(response, "response");
//     res.json({ response });
//   } catch (error) {
//     console.error('Error in chat endpoint:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });


// node --version # Should be >= 18
// npm install @google/generative-ai express

// const express = require('express');
// const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
// const dotenv = require('dotenv').config()

// const app = express();
// const port = process.env.PORT || 3000;
// app.use(express.json());
// const MODEL_NAME = "gemini-1.5-pro";
// const API_KEY = process.env.API_KEY;

// async function runChat(userInput) {
//   const genAI = new GoogleGenerativeAI(API_KEY);
//   const model = genAI.getGenerativeModel({ model: MODEL_NAME });

//   const generationConfig = {
//     temperature: 0.55,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//   };

//   const safetySettings = [
//     {
//       category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },

//   ];



//   const chat = model.startChat({
//     generationConfig: generationConfig, // Make sure this is defined
//     safetySettings: safetySettings, // Ensure this is properly initialized
//     history: [
//       {
//         role: "user",
//         parts: [
//           { text: "Your job is to capture the user's name and email address before answering their question about Book Buddy, verify the email address is correct, thank the user, and then output their name and email address in this format: {{name: user's name}} {{email: user's email address}}; only after this, answer their questions related to Book Buddy, and encourage them to check out Book Buddy's website at https://BookBuddy.com (coming soon). Additionally, mention that Shankar is the inventor of Book Buddy." }
//         ],
//       },
//       {
//         role: "model",
//         parts: [
//           { text: "Hi! 👋 I'm Sam, your friendly Book Buddy! I'm excited to help you find your next great read. To make our chat more personal, what name should I call you? [User inputs name] Great to meet you, [User's name]! Is that spelled correctly? Just say 'yes' or 'no.' [User confirms spelling] Awesome! Now, tell me, what kind of books do you enjoy? I specialize in Fantasy and Mystery, but I can point you in the right direction for other genres too. 🕵️‍♀️🧙‍♂️ If you choose Fantasy or Mystery: Excellent choice! Do you have any favorite authors or themes within [Chosen Genre]? Tell me more, and I'll give you some personalized recommendations. If you choose Mystery and the API is available: I can access a huge library of mysteries! To find the perfect one for you, tell me about any authors or themes you prefer. If the API is not available: Craving a good mystery? Here are a few classics to get you started: Sherlock Holmes by Sir Arthur Conan Doyle [Link to book], And Then There Were None by Agatha Christie [Link to book]. If you choose a genre outside of Fantasy/Mystery: While I'm still learning about [Genre], I can point you to some popular titles here: [Link to general bookstore]. If you ask a question unrelated to books: Sorry, I'm still under development and can't answer that yet. My focus is on helping you find amazing books! 📚 If you're interested in staying updated on Book Buddy's launch and getting exclusive recommendations, you can sign up for our email list here: [Link to external signup form]." }
//         ],
//       },
//     ],
//   });


//   const result = await chat.sendMessage(userInput);
//   const response = result.response;
//   return response.text();
// }

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
// app.get('/loader.gif', (req, res) => {
//   res.sendFile(__dirname + '/loader.gif');
// });
// app.post('/chat', async (req, res) => {
//   try {
//     const userInput = req.body?.userInput;
//     console.log('incoming /chat req', userInput)
//     if (!userInput) {
//       return res.status(400).json({ error: 'Invalid request body' });
//     }

//     const response = await runChat(userInput);
//     console.log(response, "response")
//     res.json({ response });
//   } catch (error) {
//     console.error('Error in chat endpoint:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });


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
                { text: "Hi! 👋 I'm Sam, your friendly Book Buddy! I'm excited to help you find your next great read. To make our chat more personal, what name should I call you? [User inputs name] Great to meet you, [User's name]! Is that spelled correctly? Just say 'yes' or 'no.' [User confirms spelling] Awesome! Now, tell me, what kind of books do you enjoy? I specialize in Fantasy and Mystery, but I can point you in the right direction for other genres too. 🕵️‍♀️🧙‍♂️ If you choose Fantasy or Mystery: Excellent choice! Do you have any favorite authors or themes within [Chosen Genre]? Tell me more, and I'll give you some personalized recommendations. If you choose Mystery and the API is available: I can access a huge library of mysteries! To find the perfect one for you, tell me about any authors or themes you prefer. If the API is not available: Craving a good mystery? Here are a few classics to get you started: Sherlock Holmes by Sir Arthur Conan Doyle [Link to book], And Then There Were None by Agatha Christie [Link to book]. If you choose a genre outside of Fantasy/Mystery: While I'm still learning about [Genre], I can point you to some popular titles here: [Link to general bookstore]. If you ask a question unrelated to books: Sorry, I'm still under development and can't answer that yet. My focus is on helping you find amazing books! 📚 If you're interested in staying updated on Book Buddy's launch and getting exclusive recommendations, you can sign up for our email list here: [Link to external signup form]." }
            ],
        },
    ];

    // If there are existing conversations, append them to the history
    if (existingConversation.length > 0) {
        history.push(...existingConversation);
    }

    const chat = model.startChat({
        generationConfig: generationConfig,
        safetySettings: safetySettings,
        history: history, // Use the updated history
    });

    const result = await chat.sendMessage(userInput);
    const response = result.response;
    return response.text();
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

        // Write back to the same file
        fs.writeFileSync(filePath, JSON.stringify(existingConversation, null, 2)); // Format the JSON with 2 spaces for readability

        res.json({ response });
    } catch (error) {
        console.error('Error in chat endpoint:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
