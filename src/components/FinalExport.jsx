import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ArrangementPreview from './ArrangementPreview';
import { flowers } from '../data/flowers.jsx';

const FinalExport = ({ bouquet, note, isReceived = false }) => {
    const [shareUrl, setShareUrl] = useState('');
    const [copyStatus, setCopyStatus] = useState('idle'); // 'idle' | 'success' | 'error'

    useEffect(() => {
        if (!isReceived) {
            const data = {
                f: bouquet.flowers.map(f => f.id),
                g: [],
                n: note
            };
            const encoded = btoa(JSON.stringify(data));
            const url = `${window.location.origin}${window.location.pathname}?data=${encoded}`;
            setShareUrl(url);
        }
    }, [bouquet, note, isReceived]);

    const copyToClipboard = async () => {
        // Modern clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(shareUrl);
                setCopyStatus('success');
                setTimeout(() => setCopyStatus('idle'), 2000);
                return;
            } catch (err) {
                // Fall through to legacy method
            }
        }
        // Legacy fallback for mobile browsers / private mode
        try {
            const input = document.createElement('input');
            input.value = shareUrl;
            input.style.position = 'fixed';
            input.style.opacity = '0';
            document.body.appendChild(input);
            input.focus();
            input.select();
            const ok = document.execCommand('copy');
            document.body.removeChild(input);
            if (ok) {
                setCopyStatus('success');
                setTimeout(() => setCopyStatus('idle'), 2000);
            } else {
                setCopyStatus('error');
                setTimeout(() => setCopyStatus('idle'), 3000);
            }
        } catch (err) {
            setCopyStatus('error');
            setTimeout(() => setCopyStatus('idle'), 3000);
        }
    };

    const copyLabel = copyStatus === 'success' ? 'Copied!' : copyStatus === 'error' ? 'Copy manually ↑' : 'Copy Link';
    const copyClass = copyStatus === 'error'
        ? 'bg-red-500 text-white'
        : 'bg-[#C2185B] text-white hover:bg-[#880E4F]';

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#FFF0F5]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center w-full max-w-4xl"
            >
                <h1 className="text-3xl md:text-5xl font-serif text-[#4A0E0E] mb-6 md:mb-8 tracking-tight px-2">
                    {isReceived ? "A Gift For You" : "Your bouquet is ready."}
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 mb-8 md:mb-12">
                    {/* Bouquet Visual */}
                    <div className="w-full flex justify-center">
                        <ArrangementPreview
                            selectedFlowers={bouquet.flowers}
                            selectedGreenery={bouquet.greenery || []}
                            isFinal={true}
                        />
                    </div>

                    {/* Note Card */}
                    <motion.div
                        className="bg-white p-6 md:p-8 shadow-md max-w-sm w-full relative border border-pink-100 overflow-hidden"
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
                                className="flex-1 px-3 py-3 md:py-2 text-[#4A0E0E] text-sm font-mono truncate outline-none"
                            />
                            <button
                                type="button"
                                onClick={copyToClipboard}
                                className={`flex-shrink-0 px-5 py-3 md:py-2 text-sm font-medium tracking-wide rounded-sm transition-colors ${copyClass}`}
                            >
                                {copyLabel}
                            </button>
                        </div>

                        {copyStatus === 'error' && (
                            <p className="text-sm text-red-500 mb-2 px-2 text-center">
                                Couldn't copy automatically — please select the link above and copy it manually.
                            </p>
                        )}

                        <p className="text-sm text-[#880E4F] italic font-serif">
                            Anyone with this link can open your bouquet.
                        </p>

                        <button
                            type="button"
                            onClick={() => { sessionStorage.clear(); window.location.href = window.location.pathname; }}
                            className="mt-10 px-6 py-3 text-sm text-[#880E4F] hover:text-[#4A0E0E] underline decoration-dotted transition-colors"
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
