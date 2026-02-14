import React from 'react';
import { motion } from 'framer-motion';
import ArrangementPreview from './ArrangementPreview';

const PreviewPage = ({ bouquet, note, onEditFlowers, onEditNote, onNext }) => {
    return (
        <div className="flex flex-col min-h-screen bg-[#FFF0F5] items-center py-6 md:py-12 px-4 md:px-6">
            <motion.div
                className="w-full max-w-2xl text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="mb-4 md:mb-8">
                    <ArrangementPreview
                        selectedFlowers={bouquet.flowers}
                        selectedGreenery={[]} // No greenery for simplified MVP
                        isFinal={true}
                    />
                </div>

                {/* Card */}
                <div className="bg-white p-6 md:p-10 shadow-lg max-w-md mx-auto relative mb-6">
                    <div className="mb-6">
                        <span className="text-xs font-bold text-[#880E4F] uppercase tracking-widest">To</span>
                        <h3 className="text-xl font-serif text-[#4A0E0E] mt-1">{note.to}</h3>
                    </div>

                    <div className="mb-6">
                        <p className="font-serif text-[#4A0E0E] text-lg leading-relaxed whitespace-pre-wrap">{note.message}</p>
                    </div>
                </div>

                <p className="text-sm text-[#880E4F] mb-12 font-serif italic">
                    This is how they will see it.
                </p>

                {/* Actions */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <button
                        onClick={onEditFlowers}
                        className="px-6 py-3 border border-[#C2185B] text-[#C2185B] rounded-sm hover:border-[#880E4F] hover:text-[#880E4F] transition-colors w-full md:w-auto text-sm tracking-wide"
                    >
                        Change flowers
                    </button>

                    <button
                        onClick={onEditNote}
                        className="px-6 py-3 border border-[#C2185B] text-[#C2185B] rounded-sm hover:border-[#880E4F] hover:text-[#880E4F] transition-colors w-full md:w-auto text-sm tracking-wide"
                    >
                        Edit note
                    </button>

                    <button
                        onClick={onNext}
                        className="px-10 py-3 bg-[#C2185B] text-white rounded-sm hover:bg-[#880E4F] transition-colors w-full md:w-auto text-sm font-medium tracking-widest shadow-md"
                    >
                        CONTINUE
                    </button>
                </div>

            </motion.div>
        </div>
    );
};

export default PreviewPage;
