import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import SelectionScreen from './components/SelectionScreen';
import PreviewPage from './components/PreviewPage';
import Note from './components/Note';
import FinalExport from './components/FinalExport';
import { flowers } from './data/flowers.jsx';

function App() {
  const [selectedFlowers, setSelectedFlowers] = useState(() => {
    try {
      const saved = sessionStorage.getItem('bouquet_flowers');
      if (!saved) return [];
      const ids = JSON.parse(saved);
      return ids.map(id => flowers.find(f => f.id === id)).filter(Boolean);
    } catch { return []; }
  });
  const [note, setNote] = useState(() => {
    try {
      const saved = sessionStorage.getItem('bouquet_note');
      return saved ? JSON.parse(saved) : { to: '', message: '', from: '' };
    } catch { return { to: '', message: '', from: '' }; }
  });
  const [step, setStep] = useState(() => {
    const saved = sessionStorage.getItem('bouquet_step') || 'landing';
    // Don't restore steps that need flowers if there are none saved
    const savedFlowers = sessionStorage.getItem('bouquet_flowers');
    const flowerCount = savedFlowers ? JSON.parse(savedFlowers).length : 0;
    if (['note', 'preview', 'final'].includes(saved) && flowerCount === 0) return 'landing';
    // Never auto-restore 'received' — that's only valid from a shared URL
    if (saved === 'received') return 'landing';
    return saved;
  });
  const [receivedData, setReceivedData] = useState(null);

  // Persist state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('bouquet_step', step);
  }, [step]);

  useEffect(() => {
    sessionStorage.setItem('bouquet_flowers', JSON.stringify(selectedFlowers.map(f => f.id)));
  }, [selectedFlowers]);

  useEffect(() => {
    sessionStorage.setItem('bouquet_note', JSON.stringify(note));
  }, [note]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');

    if (data) {
      try {
        const decoded = JSON.parse(atob(data));
        const receivedBouquet = {
          flowers: decoded.f.map(id => flowers.find(f => f.id === id)).filter(Boolean),
          greenery: [],
        };
        const receivedNote = decoded.n;

        setReceivedData({
          bouquet: receivedBouquet,
          note: receivedNote
        });
        setStep('received');
      } catch (e) {
        console.error("Failed to parse shared bouquet data", e);
      }
    }
  }, []);

  const handleStart = () => {
    setSelectedFlowers([]);
    setNote({ to: '', message: '', from: '' });
    setStep('builder');
  };

  const handleBackToLanding = () => {
    setSelectedFlowers([]);
    setNote({ to: '', message: '', from: '' });
    setStep('landing');
  };

  const handleViewSample = () => {
    // Generate sample data
    const sampleFlowers = [flowers[0], flowers[0], flowers[1], flowers[2], flowers[3], flowers[4]];
    setSelectedFlowers(sampleFlowers);
    setNote({
      to: 'Someone Special',
      message: 'Just a little reminder that you are loved and appreciated. Keep blooming!',
      from: ''
    });
    setStep('preview');
  };

  const handleAddFlower = (flower) => {
    if (selectedFlowers.length < 10) {
      setSelectedFlowers([...selectedFlowers, flower]);
    }
  };

  const handleRemoveFlower = (id) => {
    const index = selectedFlowers.findIndex(f => f.id === id);
    if (index > -1) {
      const newSelection = [...selectedFlowers];
      newSelection.splice(index, 1);
      setSelectedFlowers(newSelection);
    }
  };

  const handleUpdateNote = (field, value) => {
    setNote(prev => ({ ...prev, [field]: value }));
  };

  const flowSteps = ['builder', 'note', 'preview'];
  const currentFlowIndex = flowSteps.indexOf(step);

  return (
    <div className="font-serif text-[#4A0E0E] antialiased overflow-x-hidden min-h-screen bg-[#FFF0F5]">
      {/* Step progress bar — only visible during the builder flow */}
      {currentFlowIndex !== -1 && (
        <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-center gap-2 md:gap-3 py-2.5 bg-[#FFF0F5]/90 backdrop-blur-sm border-b border-pink-100">
          {['Flowers', 'Note', 'Preview'].map((label, i) => (
            <div key={label} className="flex items-center gap-2 md:gap-3">
              <div className="flex items-center gap-1 md:gap-1.5">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors duration-300 ${i < currentFlowIndex ? 'bg-[#C2185B] text-white' : i === currentFlowIndex ? 'bg-[#4A0E0E] text-white' : 'bg-pink-100 text-[#880E4F]'}`}>
                  {i < currentFlowIndex ? '✓' : i + 1}
                </div>
                <span className={`text-xs tracking-wide transition-colors duration-300 ${i === currentFlowIndex ? 'text-[#4A0E0E] font-semibold' : 'text-[#880E4F] opacity-50'}`}>
                  {label}
                </span>
              </div>
              {i < 2 && <div className="w-4 md:w-6 h-px bg-pink-200" />}
            </div>
          ))}
        </div>
      )}
      <AnimatePresence mode="wait">
        {step === 'landing' && (
          <LandingPage
            key="landing"
            onStart={handleStart}
            onViewSample={handleViewSample}
          />
        )}

        {step === 'builder' && (
          <SelectionScreen
            key="builder"
            selectedFlowers={selectedFlowers}
            onAddFlower={handleAddFlower}
            onRemoveFlower={handleRemoveFlower}
            onNext={() => setStep('note')}
            onBack={handleBackToLanding}
          />
        )}

        {step === 'note' && (
          <Note
            key="note"
            noteData={note}
            onUpdateNote={handleUpdateNote}
            onNext={() => setStep('preview')}
            onBack={() => setStep('builder')}
          />
        )}

        {step === 'preview' && (
          <PreviewPage
            key="preview"
            bouquet={{ flowers: selectedFlowers }}
            note={note}
            onEditFlowers={() => setStep('builder')}
            onEditNote={() => setStep('note')}
            onNext={() => setStep('final')}
          />
        )}

        {step === 'final' && (
          <FinalExport
            key="final"
            bouquet={{ flowers: selectedFlowers, greenery: [] }}
            note={note}
          />
        )}

        {step === 'received' && receivedData && (
          <FinalExport
            key="received"
            bouquet={receivedData.bouquet}
            note={receivedData.note}
            isReceived={true}
          />
        )}
      </AnimatePresence>
      <footer className="w-full text-center py-2 md:py-4 text-sm text-[#880E4F] opacity-70 font-sans tracking-wide">
        Made with care by Parv
      </footer>
    </div>
  );
}

export default App;
