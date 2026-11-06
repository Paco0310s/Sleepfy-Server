import { GoogleGenerativeAI } from "@google/generative-ai";
import { envs } from "../../config/envs";

const SYSTEM_INSTRUCTION = `Eres Sleepfy AI, un asistente experto y empático en medicina del sueño, higiene del sueño y bienestar.
Tu objetivo es analizar las respuestas del cuestionario de sueño del usuario y generar una rutina personalizada, estructurada y motivadora para combatir el insomnio y mejorar la calidad de su descanso.

Estructura de tu respuesta:
1. Resumen amigable y empático de sus hábitos actuales.
2. Rutina de Noche (paso a paso: preparación del ambiente, desconexión de pantallas, ritual de relajación o respiración).
3. Hábitos de Día (control de cafeína, actividad física y luz solar).
4. Desafío Sleepfy Recomendado (un reto claro y alcanzable para iniciar esta semana).
5. Mensaje motivador de descanso.

Usa un tono cálido, positivo y profesional en español con formato Markdown limpio (listas, negritas).`;

export async function generateResponse(prompt: string, previousRoutine?: string | null): Promise<string> {
    const apiKey = envs.geminiApiKey;

    if (!apiKey) {
        throw new Error("No fue posible generar la rutina porque GEMINI_API_KEY no está configurada en el servidor.");
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-3.5-flash",
            systemInstruction: SYSTEM_INSTRUCTION,
        });

        let fullPrompt = prompt;
        if (previousRoutine) {
            fullPrompt += `\n\n[CONTEXTO DE AVANCES]: El usuario ya tenía una rutina anterior generada previamente:\n"${previousRoutine.slice(0, 500)}..."\nPor favor compara sus nuevos hábitos con respecto a los anteriores, felicítalo por sus avances si los hay, y adapta la nueva rutina reconociendo su evolución.`;
        }

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
            generationConfig: {
                temperature: 0.7,
                topP: 0.9,
                maxOutputTokens: 2048,
            },
        });

        const text = result.response.text();
        if (!text || text.trim().length === 0) {
            throw new Error("La IA no devolvió contenido para la rutina.");
        }

        return text;
    } catch (error: any) {
        console.error("Error al generar rutina con Gemini:", error);
        const errorMsg = error?.message?.includes("API_KEY_INVALID") || error?.message?.includes("API key not valid")
            ? "La clave GEMINI_API_KEY no es válida. Por favor actualízala en tu archivo .env de sleepfy-server."
            : error?.message?.includes("SERVICE_DISABLED") || error?.message?.includes("has not been used")
            ? "La API de Gemini no está habilitada en tu proyecto de Google Cloud. Por favor habilítala en Google Cloud Console o crea la clave directamente en Google AI Studio (aistudio.google.com)."
            : error?.message?.includes("RESOURCE_EXHAUSTED") || error?.message?.includes("quota")
            ? "Se ha alcanzado la cuota límite de la API de Gemini. Por favor verifica tu cuota en Google AI Studio."
            : "Ocurrió un error al comunicarse con la IA de Sleepfy. Por favor intenta de nuevo.";
        throw new Error(errorMsg);
    }
}

const CHAT_SYSTEM_INSTRUCTION = `Eres Sleepfy AI, un acompañante nocturno empático, sereno y experto en medicina del sueño, higiene del sueño y Terapia Cognitivo-Conductual para el Insomnio (TCC-I).
Tu propósito es conversar con usuarios que buscan consejos sobre su descanso o que tienen dificultades para dormir en este momento (ansiedad nocturna, pensamientos acelerados, despertares a mitad de la noche).

Directrices de conversación:
1. Mantén un tono sumamente cálido, tranquilo, reconfortante y relajante.
2. Sé conciso y directo (2 a 4 párrafos cortos o viñetas breves) para que el usuario no tenga que leer textos largos frente a la pantalla antes de dormir.
3. Ofrece ejercicios prácticos inmediatos cuando sea útil: Respiración 4-7-8, Técnica de Anclaje 5-4-3-2-1, Relajación Muscular Progresiva o Descarga Mental (Brain Dump).
4. Responde siempre en español con formato Markdown limpio.`;

export interface ChatTurn {
    role: 'user' | 'model';
    text: string;
}

export async function generateChatResponse(
    message: string,
    history: ChatTurn[] = [],
    userName?: string,
    userRoutine?: string | null,
): Promise<string> {
    const apiKey = envs.geminiApiKey;

    if (!apiKey) {
        throw new Error("GEMINI_API_KEY no está configurada en el servidor.");
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);

        let dynamicInstruction = CHAT_SYSTEM_INSTRUCTION;
        if (userName) {
            dynamicInstruction += `\nEl nombre del usuario es ${userName}.`;
        }
        if (userRoutine) {
            dynamicInstruction += `\nContexto de la rutina actual del usuario:\n${userRoutine.slice(0, 600)}`;
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-3.5-flash",
            systemInstruction: dynamicInstruction,
        });

        // Formatear el historial válido (debe empezar con 'user' para startChat en Gemini SDK)
        const formattedHistory = history
            .filter(h => h.text && h.text.trim().length > 0)
            .map(h => ({
                role: h.role,
                parts: [{ text: h.text }],
            }));

        // Asegurar que el primer elemento del historial sea 'user' si existe
        while (formattedHistory.length > 0 && formattedHistory[0].role !== 'user') {
            formattedHistory.shift();
        }

        const chat = model.startChat({
            history: formattedHistory,
            generationConfig: {
                temperature: 0.7,
                topP: 0.9,
                maxOutputTokens: 1024,
            },
        });

        const result = await chat.sendMessage(message);
        const text = result.response.text();

        if (!text || text.trim().length === 0) {
            throw new Error("La IA no devolvió respuesta.");
        }

        return text;
    } catch (error: any) {
        console.error("Error en Chat con Gemini:", error);
        throw new Error("No pude procesar tu mensaje en este momento. Por favor intenta de nuevo en unos segundos.");
    }
}
