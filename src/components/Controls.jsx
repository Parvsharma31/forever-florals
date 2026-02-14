import React, { useState } from 'react';
import { FLOWERS, GREENERY, WRAPS } from '../data/flowers';
import { cn } from '../lib/utils';
import { Flower, Leaf, Package, PenTool } from 'lucide-react';

const TABS = [
    { id: 'blooms', label: 'Blooms', icon: <Flower size={18} /> },
    { id: 'greenery', label: 'Greenery', icon: <Leaf size={18} /> },
    { id: 'wrap', label: 'Wrap', icon: <Package size={18} /> },
    { id: 'note', label: 'Note', icon: <PenTool size={18} /> },
];

export function Controls({
    onAddFlower,
    onRemoveFlower,
    onSelectWrap,
    onUpdateNote,
    onSelectGreenery,
    state
}) {
    const [activeTab, setActiveTab] = useState('blooms');
    const [monthFilter, setMonthFilter] = useState('All');

    const filteredFlowers = monthFilter === 'All'
        ? FLOWERS
        : FLOWERS.filter(f => f.birthMonth === monthFilter);

    const months = ['All', 'February', 'March', 'May', 'June', 'September'];

    return (
        <div className="w-full max-w-xl mx-auto bg-white/50 backdrop-blur-md border-t border-stone-200">
            {/* Tabs */}
            <div className="flex border-b border-stone-200">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors uppercase tracking-wider",
                            activeTab === tab.id
                                ? "text-stone-900 border-b-2 border-stone-900 bg-stone-50/50"
                                : "text-stone-500 hover:text-stone-700 hover:bg-stone-50/30"
                        )}
                    >
                        {tab.icon}
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="p-6 h-[250px] overflow-y-auto custom-scrollbar">
                {activeTab === 'blooms' && (
                    <div className="space-y-4">
                        {/* Filter */}
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {months.map(m => (
                                <button
                                    key={m}
                                    onClick={() => setMonthFilter(m)}
                                    className={cn(
                                        "px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap border transition-all",
                                        monthFilter === m
                                            ? "bg-stone-800 text-white border-stone-800"
                                            : "bg-white text-stone-500 border-stone-200 hover:border-stone-400"
                                    )}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {filteredFlowers.map(flower => (
                                <button
                                    key={flower.id}
                                    onClick={() => onAddFlower(flower.id)}
                                    disabled={state.selectedFlowers.length >= 12}
                                    className="group flex flex-col items-center p-3 rounded-lg hover:bg-white transition-all border border-transparent hover:border-stone-200 hover:shadow-sm disabled:opacity-50"
                                >
                                    <div className="w-12 h-12 rounded-full mb-2 flex items-center justify-center text-white shadow-sm" style={{ backgroundColor: flower.color }}>
                                        <Flower size={24} />
                                    </div>
                                    <span className="text-stone-900 font-serif font-medium">{flower.name}</span>
                                    <span className="text-[10px] text-stone-500 uppercase tracking-wide">{flower.meaning}</span>
                                </button>
                            ))}
                            {filteredFlowers.length === 0 && (
                                <div className="col-span-full py-8 text-center text-stone-400 text-sm">
                                    No flowers found for {monthFilter}.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'greenery' && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {GREENERY.map(g => (
                            <button
                                key={g.id}
                                onClick={() => onSelectGreenery(g.id)}
                                className={cn(
                                    "group flex flex-col items-center p-3 rounded-lg transition-all border",
                                    state.selectedGreenery.includes(g.id)
                                        ? "border-stone-900 bg-stone-50 ring-1 ring-stone-900"
                                        : "border-stone-200 hover:border-stone-400 hover:bg-white"
                                )}
                            >
                                <div className="w-12 h-12 rounded-full mb-2 flex items-center justify-center text-white shadow-sm" style={{ backgroundColor: g.color }}>
                                    <Leaf size={24} />
                                </div>
                                <span className="text-stone-900 font-serif font-medium">{g.name}</span>
                            </button>
                        ))}
                    </div>
                )}

                {activeTab === 'wrap' && (
                    <div className="grid grid-cols-3 gap-4">
                        {WRAPS.map(wrap => (
                            <button
                                key={wrap.id}
                                onClick={() => onSelectWrap(wrap.id)}
                                className={cn(
                                    "flex flex-col items-center p-4 rounded-lg border transition-all",
                                    state.selectedWrap === wrap.id
                                        ? "border-stone-900 bg-stone-50 ring-1 ring-stone-900"
                                        : "border-stone-200 hover:border-stone-400 hover:bg-white"
                                )}
                            >
                                <div className="w-16 h-16 rounded-full shadow-inner mb-3" style={{ backgroundColor: wrap.color }}></div>
                                <span className="text-sm font-medium">{wrap.name}</span>
                            </button>
                        ))}
                    </div>
                )}

                {activeTab === 'note' && (
                    <div className="flex flex-col h-full">
                        <label className="text-sm font-medium text-stone-600 mb-2">Attached Note</label>
                        <textarea
                            value={state.note}
                            onChange={(e) => onUpdateNote(e.target.value)}
                            maxLength={250}
                            placeholder="Write a message..."
                            className="flex-1 w-full p-3 rounded-lg border border-stone-200 bg-white/80 resize-none focus:outline-none focus:ring-2 focus:ring-stone-400 font-serif text-stone-800 placeholder:text-stone-400"
                        />
                        <div className="text-right text-xs text-stone-400 mt-2 font-mono">
                            {state.note.length}/250
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
