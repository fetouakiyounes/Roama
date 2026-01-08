import mongoose from 'mongoose';

const ChatLogSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['user', 'bot'],
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

export default mongoose.models.ChatLog || mongoose.model('ChatLog', ChatLogSchema);
