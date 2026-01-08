import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import ChatLog from '../../../models/ChatLog';

// Mock DB for fallback (in case DB isn't configured yet)
const mockDb = {
    logs: []
};

export async function POST(request) {
    const body = await request.json();
    const { message } = body;

    // Try to connect to DB and save user message
    try {
        await dbConnect();
        // Only attempt save if connection is successful (dbConnect returns connection)
        await ChatLog.create({ role: 'user', message });
        console.log("Saved user message to MongoDB");
    } catch (error) {
        console.warn("MongoDB not connected or Error (Using Mock DB):", error.message);
        // Fallback
        mockDb.logs.push({
            timestamp: new Date().toISOString(),
            userMessage: message,
        });
    }

    // Simple Logic
    let reply = "Je ne comprends pas bien. Pouvez-vous reformuler?";
    let nextActions = [];

    if (message.includes("visiteur")) {
        reply = "Comment pouvons-nous vous aider?";
        nextActions = [
            "🏠 Consulter les annonces.",
            "🧐 \"Pourquoi Roama?\"",
            "ℹ️ J'ai une question.",
            "↩️ Revenir."
        ];
    } else if (message.includes("acheteur")) {
        reply = "Super! Que recherchez-vous comme type de bien?";
        nextActions = ["Maison", "Appartement", "Terrain"];
    } else if (message.includes("vendeur")) {
        reply = "Excellent choix. Souhaitez-vous une estimation ou publier directement?";
        nextActions = ["Estimation", "Publier une annonce"];
    } else if (message.includes("Consulter")) {
        reply = "Voici nos dernières annonces...";
    } else if (message.includes("Question") || message.includes("question")) {
        reply = "Posez votre question, un agent vous répondra bientôt.";
    }

    // Save bot response to DB if possible
    try {
        await ChatLog.create({ role: 'bot', message: reply });
    } catch (e) {
        // Ignore
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
        reply,
        actions: nextActions
    });
}
