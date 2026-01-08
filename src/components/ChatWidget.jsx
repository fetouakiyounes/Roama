"use client";
import { useState, useRef, useEffect } from 'react';
import styles from './ChatWidget.module.css';

const INITIAL_MESSAGES = [
    {
        id: 1,
        sender: 'bot',
        text: "Bonjour 🤖\nJe suis RoamaAssist.\nComment puis-je vous aider? 👇"
    }
];

const QUICK_ACTIONS = [
    { id: 'buyer', label: "🔍 Je suis un acheteur.", next: 'buyer_flow' },
    { id: 'seller', label: "🏠 Je suis un vendeur.", next: 'seller_flow' },
    { id: 'visitor', label: "👀 Je suis un visiteur.", next: 'visitor_flow' }
];

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState('home'); // 'home' | 'chat'
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, view]);

    const handleStartChat = () => {
        setView('chat');
    };

    const handleQuickAction = async (actionLabel) => {
        // Add user message
        const userMsg = { id: Date.now(), sender: 'user', text: actionLabel };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: actionLabel })
            });
            const data = await response.json();

            const botMsg = { id: Date.now() + 1, sender: 'bot', text: data.reply };
            setMessages(prev => [...prev, botMsg]);

            // FUTURE: Update quick actions based on data.actions

        } catch (error) {
            console.error("Chat Error:", error);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            <div className={`${styles.chatToggle} ${isOpen ? styles.hidden : ''}`} onClick={() => setIsOpen(true)}>
                <span className={styles.icon}>💬</span>
            </div>

            {isOpen && (
                <div className={styles.chatWindow}>
                    <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>×</button>

                    {view === 'home' ? (
                        <div className={styles.homeView}>
                            <div className={styles.homeHeader}>
                                <div className={styles.homeLogo}>🏠</div>
                                <h2 className={styles.greeting}>Bonjour 👋</h2>
                                <p className={styles.subGreeting}>Chattez avec RoamaAssist 🤖</p>
                            </div>
                            <div className={styles.homeBody}>
                                <div className={styles.startChatCard} onClick={handleStartChat}>
                                    <div className={styles.startText}>
                                        <strong>Chattez avec nous</strong>
                                        <span>En ligne</span>
                                    </div>
                                    <div className={styles.sendIcon}>➤</div>
                                </div>
                            </div>
                            <div className={styles.bottomNav}>
                                <div className={`${styles.navItem} ${styles.active}`}>
                                    <span>🏠</span>
                                    <span>Accueil</span>
                                </div>
                                <div className={styles.navItem} onClick={handleStartChat}>
                                    <span>💬</span>
                                    <span>Discuter</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.chatView}>
                            <div className={styles.chatHeader}>
                                <button className={styles.backBtn} onClick={() => setView('home')}>‹</button>
                                <div className={styles.headerTitle}>Bonjour 👋</div>
                            </div>

                            <div className={styles.messagesArea}>
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`${styles.message} ${styles[msg.sender]}`}>
                                        {msg.sender === 'bot' && <span className={styles.botAvatar}>🤖</span>}
                                        <div className={styles.bubble}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className={`${styles.message} ${styles.bot}`}>
                                        <span className={styles.botAvatar}>🤖</span>
                                        <div className={styles.bubble}>...</div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className={styles.quickActions}>
                                {QUICK_ACTIONS.map(action => (
                                    <button key={action.id} className={styles.actionBtn} onClick={() => handleQuickAction(action.label)}>
                                        {action.label}
                                    </button>
                                ))}
                            </div>

                            <div className={styles.inputArea}>
                                <input type="text" placeholder="Répondre..." />
                                <button>➤</button>
                            </div>
                        </div>
                    )}
                    <div className={styles.poweredBy}>POWERED BY 🌀 ANTIGRAVITY</div>
                </div>
            )}
        </>
    );
}
