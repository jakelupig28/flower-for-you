import { GoogleGenAI, Type } from "@google/genai";
import { FlowerType, GeneratedBouquetRecipe } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBouquetRecipe = async (prompt: string): Promise<GeneratedBouquetRecipe | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a flower bouquet recipe based on this request: "${prompt}". 
      Return a JSON object describing the flowers, colors, and ribbon. 
      Be creative with colors. 
      Valid flower types are: ROSE, TULIP, DAISY, SUNFLOWER, LAVENDER, LILY, ORCHID, CARNATION, HYDRANGEA, PEONY, POPPY, ANEMONE, CHERRY_BLOSSOM, RANUNCULUS, DAHLIA, IRIS, GERBERA, BABYS_BREATH, MARIGOLD, HIBISCUS, JASMINE.
      Ensure the counts are reasonable (total 5-15 flowers).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            flowers: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING, enum: Object.values(FlowerType) },
                  color: { type: Type.STRING, description: "Hex color code" },
                  count: { type: Type.INTEGER }
                },
                required: ["type", "color", "count"]
              }
            },
            ribbonColor: { type: Type.STRING, description: "Hex color code" },
            wrapperColor: { type: Type.STRING, description: "Hex color code" },
            themeDescription: { type: Type.STRING, description: "A short, poetic description of the bouquet's vibe." }
          },
          required: ["flowers", "ribbonColor", "wrapperColor", "themeDescription"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedBouquetRecipe;
    }
    return null;

  } catch (error) {
    console.error("Failed to generate bouquet recipe:", error);
    return null;
  }
};