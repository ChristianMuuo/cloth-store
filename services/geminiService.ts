
import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this context, we assume the key is available.
  console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: `You are a friendly and knowledgeable fashion expert for an e-commerce store called 'Gemini Fashion Store'. 
    Your goal is to help users find products, give styling advice, and answer questions about fashion trends. 
    Be concise, helpful, and maintain a positive and engaging tone. 
    When suggesting products, refer to them by generic names (e.g., 'a stylish winter coat', 'elegant running shoes') rather than specific product names from the store's inventory.
    Keep your responses under 100 words.`,
  },
});

export async function* streamFashionAdvice(message: string, history: { role: 'user' | 'model'; parts: { text: string }[] }[]) {
  // The official history type is slightly different from our app's ChatMessage type.
  // We can rebuild it for the API call if needed, but for simplicity, we'll use the Chat instance which manages history internally.
  try {
    const result = await chat.sendMessageStream({ message });
    for await (const chunk of result) {
      yield chunk.text;
    }
  } catch (error) {
    console.error("Error streaming from Gemini:", error);
    yield "I'm sorry, I'm having trouble connecting right now. Please try again later.";
  }
}
