import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import SelectionScreen from './components/SelectionScreen';
import PreviewPage from './components/PreviewPage';
import Note from './components/Note';
import FinalExport from './components/FinalExport';
import { flowers } from './data/flowers.jsx';

function App() {
  const [step, setStep] = useState('landing');
  const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [note, setNote] = useState({ to: '', message: '', from: '' }); // 'from' is implicit in MVP but useful for data structure
  const [receivedData, setReceivedData] = useState(null);

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
    setStep('builder');
    setSelectedFlowers([]); // Reset
    setNote({ to: '', message: '', from: '' });
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

  return (
    <div className="font-serif text-[#4A0E0E] antialiased overflow-x-hidden min-h-screen bg-[#FFF0F5]">
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
      <footer className="w-full text-center py-4 text-sm text-[#880E4F] opacity-70 font-sans tracking-wide">
        Made with care by Parv
      </footer>
    </div>
  );
}

export default App;
