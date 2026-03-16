
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMaterialStory = async (materialName: string, origin: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a compelling "Story of the Material" for a recycled product: ${materialName} sourced from ${origin}. Focus on the environmental journey, the recycling process, and the aesthetic value for designers. Keep it under 150 words.`,
  });
  return response.text;
};

export const getDesignInspiration = async (material: string) => {
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
};
