import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { flowers } from '../data/flowers.jsx';
import { Canvas } from './Canvas';
import { useBouquetState, generateShareLink } from '../hooks/useBouquetState';
import { cn } from '../lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as FlowerAssets from './flower-assets/FlowerAssets';

const STEPS = ['SELECT', 'NOTE', 'REVEAL'];

export function Wizard() {
    const { state, addFlower, updateState } = useBouquetState();
    const [currentStep, setCurrentStep] = useState('SELECT'); // SELECT, NOTE, REVEAL

    // Selection Logic
    const handleNext = () => {
        if (currentStep === 'SELECT') setCurrentStep('NOTE');
        else if (currentStep === 'NOTE') setCurrentStep('REVEAL');
    };

    const handleBack = () => {
        if (currentStep === 'NOTE') setCurrentStep('SELECT');
        else if (currentStep === 'REVEAL') setCurrentStep('NOTE');
    };

    const shareLink = generateShareLink(state);

    return (
        <div className="min-h-screen bg-[#FFF0F5] flex flex-col items-center">

            {/* Header / Nav */}
            <header className="w-full p-6 flex justify-between items-center z-50">
                <h2 className="text-xl font-serif text-[#4A0E0E]">Forever Florals</h2>
                <div className="text-xs font-mono text-[#880E4F]">
                    STEP: {currentStep}
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center relative">

                {/* Left Panel: Canvas Preview */}
                <div className={cn(
                    "w-full md:w-1/2 h-[50vh] md:h-[80vh] relative transition-all duration-500",
                    currentStep === 'REVEAL' ? "w-full md:w-full" : ""
                )}>
                    <Canvas
                        selectedFlowers={state.selectedFlowers}
                        selectedGreenery={state.selectedGreenery}
                        isInteractive={currentStep === 'SELECT'}
                    />
                </div>

                {/* Right Panel: Controls */}
                {currentStep !== 'REVEAL' && (
                    <div className="w-full md:w-1/2 p-8 md:pl-0 z-40 bg-[#FFF0F5] md:bg-transparent">
                        <AnimatePresence mode="wait">

                            {currentStep === 'SELECT' && (
                                <motion.div
                                    key="select"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="text-center md:text-left mb-8">
                                        <h3 className="text-2xl font-serif mb-2 text-[#4A0E0E]">Pick your blooms</h3>
                                        <p className="font-mono text-sm text-[#880E4F]">Select up to 12 flowers for your arrangement.</p>
                                    </div>

                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 max-h-[50vh] overflow-y-auto custom-scrollbar p-2">
                                        {flowers.map(flower => {
                                            const Component = flower.component;
                                            return (
                                                <button
                                                    key={flower.id}
                                                    onClick={() => addFlower(flower.id)}
                                                    disabled={state.selectedFlowers.length >= 12}
                                                    className="flex flex-col items-center gap-2 group p-2 hover:bg-pink-100 rounded-lg transition-all"
                                                >
                                                    <div
                                                        className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-transparent group-hover:border-pink-200 transition-all overflow-hidden relative"
                                                        style={{ backgroundColor: '#fff' }}
                                                    >
                                                        <div className="w-12 h-12 flex items-center justify-center">
                                                            {flower.image ? (
                                                                <img
                                                                    src={flower.image}
                                                                    alt={flower.name}
                                                                    className="w-full h-full object-contain mix-blend-multiply brightness-110 contrast-125"
                                                                />
                                                            ) : (
                                                                Component && <Component />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <span className="text-xs font-mono uppercase tracking-wider text-center text-[#4A0E0E]">{flower.name}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 'NOTE' && (
                                <motion.div
                                    key="note"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex flex-col items-center"
                                >
                                    <h3 className="text-2xl font-serif mb-6 text-[#4A0E0E]">Write the card</h3>

                                    <div className="w-full max-w-sm bg-white p-8 shadow-sm border border-pink-100 min-h-[300px] flex flex-col">
                                        <textarea
                                            value={state.note}
                                            onChange={(e) => updateState({ note: e.target.value })}
                                            maxLength={250}
                                            placeholder="Dear Beloved..."
                                            className="flex-1 w-full resize-none outline-none font-mono text-sm leading-relaxed text-[#4A0E0E] placeholder:text-pink-300 bg-transparent"
                                        />
                                        <div className="text-right mt-4 text-[10px] text-pink-300 font-mono">
                                            {state.note.length}/250
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8 pt-8 border-t border-pink-200">
                            <button
                                onClick={handleBack}
                                disabled={currentStep === 'SELECT'}
                                className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#880E4F] hover:text-[#4A0E0E] disabled:opacity-0 transition-colors"
                            >
                                <ChevronLeft size={14} /> Back
                            </button>

                            <button
                                onClick={handleNext}
                                className="bg-[#C2185B] text-white px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-[#880E4F] transition-colors flex items-center gap-2"
                            >
                                {currentStep === 'NOTE' ? 'Finish' : 'Next'} <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Reveal/Share Overlay */}
            {currentStep === 'REVEAL' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 z-[60] bg-[#FFF0F5] flex flex-col items-center justify-center p-8"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-serif mb-2 text-[#4A0E0E]">Your Arrangement</h2>
                        <p className="font-mono text-xs text-[#880E4F] uppercase">Ready to be delivered</p>
                    </div>

                    <div className="flex gap-4 mb-12">
                        <a
                            href={shareLink}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#C2185B] text-white px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-[#880E4F] transition-colors flex items-center gap-2"
                        >
                            View Recipient Mode
                        </a>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(shareLink);
                                alert('Link copied!');
                            }}
                            className="border border-[#C2185B] text-[#C2185B] px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-pink-100 transition-colors"
                        >
                            Copy Link
                        </button>
                    </div>

                    <button onClick={() => setCurrentStep('SELECT')} className="text-xs font-mono underline text-[#880E4F]">
                        Edit Bouquet
                    </button>
                </motion.div>
            )}

        </div>
    );
}
