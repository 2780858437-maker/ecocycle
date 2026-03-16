
import { GoogleGenAI, Type } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

const getAI = () => {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not configured. AI features will be disabled.");
      return null;
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export const generateMaterialStory = async (materialName: string, origin: string) => {
  const ai = getAI();
  if (!ai) return "AI story generation is currently unavailable. Please check your API key configuration.";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a compelling "Story of the Material" for a recycled product: ${materialName} sourced from ${origin}. Focus on the environmental journey, the recycling process, and the aesthetic value for designers. Keep it under 150 words.`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating story:", error);
    return "Unable to generate story at this time.";
  }
};

export const getDesignInspiration = async (material: string) => {
  const ai = getAI();
  if (!ai) return [];

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Suggest 3 creative design applications for recycled ${material}. For each, provide a name and a brief description.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ["title", "description"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Error getting design inspiration:", error);
    return [];
  }
};
