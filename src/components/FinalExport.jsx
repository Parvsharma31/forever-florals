import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ArrangementPreview from './ArrangementPreview';
import { flowers } from '../data/flowers.jsx';

const FinalExport = ({ bouquet, note, isReceived = false }) => {
    const [shareUrl, setShareUrl] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        if (!isReceived) {
            // Generate share URL
            const data = {
                f: bouquet.flowers.map(f => f.id),
                // No greenery in MVP
                g: [],
                n: note
            };

            const encoded = btoa(JSON.stringify(data));
            // Using /b/abc123 format simulation if we were full stack, 
            // but for frontend-only we keep query param ?data=...
            const url = `${window.location.origin}${window.location.pathname}?data=${encoded}`;
            setShareUrl(url);
        }
    }, [bouquet, note, isReceived]);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#FFF0F5]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center w-full max-w-4xl"
            >
                <h1 className="text-4xl md:text-5xl font-serif text-[#4A0E0E] mb-8 tracking-tight">
                    {isReceived ? "A Gift For You" : "Your bouquet is ready."}
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
                    {/* Bouquet Visual */}
                    <div className="transform scale-90 md:scale-100">
                        <ArrangementPreview
                            selectedFlowers={bouquet.flowers}
                            selectedGreenery={bouquet.greenery || []}
                            isFinal={true}
                        />
                    </div>

                    {/* Note Card */}
                    <motion.div
                        className="bg-white p-8 shadow-md max-w-sm w-full relative transform rotate-1 border border-pink-100"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="font-serif text-[#4A0E0E] space-y-4 pt-2">
                            <div>
                                <span className="text-xs font-bold text-[#880E4F] uppercase tracking-widest">To</span>
                                <p className="text-xl mt-1">{note.to}</p>
                            </div>

                            <div className="h-px bg-pink-100 my-4" />

                            <p className="leading-relaxed whitespace-pre-wrap text-lg">{note.message}</p>
                        </div>
                    </motion.div>
                </div>

                {!isReceived && (
                    <motion.div
                        className="mt-8 flex flex-col items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <div className="bg-white p-2 rounded-sm border border-pink-200 flex items-center gap-2 w-full max-w-md shadow-sm mb-4">
                            <input
                                readOnly
                                value={shareUrl}
                                className="flex-1 px-3 py-2 text-[#4A0E0E] text-sm font-mono truncate outline-none"
                            />
                            <button
                                onClick={copyToClipboard}
                                className="px-6 py-2 bg-[#C2185B] text-white text-sm font-medium tracking-wide rounded-sm hover:bg-[#880E4F] transition-colors"
                            >
                                {copySuccess ? "Copied" : "Copy Link"}
                            </button>
                        </div>

                        <p className="text-sm text-[#880E4F] italic font-serif">
                            Anyone with this link can open your bouquet.
                        </p>

                        <button
                            onClick={() => window.location.href = window.location.pathname}
                            className="mt-12 text-sm text-[#880E4F] hover:text-[#4A0E0E] underline decoration-dotted transition-colors"
                        >
                            Start Over
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default FinalExport;
