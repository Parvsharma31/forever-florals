import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Note = ({ noteData, onUpdateNote, onNext, onBack }) => {
    // Emotional prompts
    const prompts = [
        "Thank you for always being there for me.",
        "I'm proud of you because...",
        "I still remember when..."
    ];

    const handlePromptClick = (text) => {
        onUpdateNote('message', text + " ");
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#FFF0F5] items-center py-12 px-6">
            <motion.div
                className="w-full max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h2 className="text-3xl font-serif text-[#4A0E0E] mb-8 text-center">Write your note</h2>

                <div className="bg-white p-8 shadow-sm rounded-sm mb-8 space-y-6">
                    {/* To Field */}
                    <div>
                        <label className="block text-xs font-bold text-[#880E4F] uppercase tracking-widest mb-2">To (Name)</label>
                        <input
                            type="text"
                            value={noteData.to}
                            onChange={(e) => onUpdateNote('to', e.target.value)}
                            className="w-full bg-pink-50 border border-pink-200 p-3 text-lg font-serif text-[#4A0E0E] focus:outline-none focus:border-[#C2185B] transition-colors rounded-sm"
                            placeholder="Recipient's Name"
                        />
                    </div>

                    {/* Message Field */}
                    <div>
                        <label className="block text-xs font-bold text-[#880E4F] uppercase tracking-widest mb-2">
                            Short Message <span className="text-pink-300 font-normal normal-case ml-2">({200 - noteData.message.length} chars left)</span>
                        </label>
                        <textarea
                            value={noteData.message}
                            onChange={(e) => {
                                if (e.target.value.length <= 200) onUpdateNote('message', e.target.value);
                            }}
                            rows={5}
                            className="w-full bg-pink-50 border border-pink-200 p-3 text-lg font-serif text-[#4A0E0E] focus:outline-none focus:border-[#C2185B] transition-colors rounded-sm resize-none"
                            placeholder="Write something from the heart..."
                        />
                    </div>
                </div>

                {/* Prompts Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px bg-pink-200 flex-1 opacity-50"></div>
                        <span className="text-sm text-[#880E4F] font-medium">Not sure what to write?</span>
                        <div className="h-px bg-pink-200 flex-1 opacity-50"></div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {prompts.map((prompt, i) => (
                            <button
                                key={i}
                                onClick={() => handlePromptClick(prompt)}
                                className="text-left px-4 py-3 bg-white/60 border border-transparent hover:border-pink-300 hover:bg-white text-[#4A0E0E] text-sm transition-all rounded-sm"
                            >
                                "{prompt}"
                            </button>
                        ))}
                    </div>

                    <p className="text-center text-xs text-[#880E4F] mt-6 italic font-serif">
                        People remember how you made them feel.
                    </p>
                    <p className="text-center text-xs text-pink-400 mt-2">
                        Why are you sending this?
                    </p>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={onBack}
                        className="text-[#880E4F] hover:text-[#4A0E0E] px-6 py-2 transition-colors font-medium text-sm tracking-wide"
                    >
                        BACK
                    </button>

                    <button
                        onClick={onNext}
                        disabled={!noteData.to || !noteData.message}
                        className={`px-8 py-3 rounded-sm text-sm font-medium tracking-widest transition-all duration-300 ${(!noteData.to || !noteData.message) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#C2185B] text-white hover:bg-[#880E4F]'}`}
                    >
                        NEXT
                    </button>
                </div>

            </motion.div>
        </div>
    );
};

export default Note;
