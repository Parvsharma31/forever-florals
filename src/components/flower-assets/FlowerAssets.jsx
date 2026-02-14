import React from 'react';

// Common style for the hand-drawn stroke
const strokeStyle = {
    stroke: '#1a1a1a',
    strokeWidth: '1.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
    vectorEffect: 'non-scaling-stroke'
};

// Common style for the watercolor fill (blob behind)
const fillStyle = (color) => ({
    fill: color,
    stroke: 'none',
    opacity: 0.8,
    filter: 'url(#watercolor)'
});

// Reusable filter definition
export const WatercolorFilter = () => (
    <svg width="0" height="0" className="absolute">
        <filter id="watercolor">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
            <feGaussianBlur stdDeviation="0.5" />
        </filter>
    </svg>
);

export const RoseRed = () => (
    <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
        {/* Watercolor Fill: Blobby shape */}
        <path d="M20,30 Q10,50 30,70 Q50,90 70,70 Q90,50 70,30 Q50,10 20,30 Z" style={fillStyle('#D32F2F')} />
        {/* Outline: Sketchy Rose */}
        <path d="M48,22 C40,20 35,25 35,32 C35,40 42,45 50,45 C58,45 65,40 65,32 C65,25 60,20 52,22 M50,45 C40,50 30,40 30,60 C30,75 45,80 50,80 C55,80 70,75 70,60 C70,40 60,50 50,45 M30,60 Q20,50 25,40 M70,60 Q80,50 75,40" style={strokeStyle} />
        {/* Stem */}
        <path d="M50,80 Q52,90 50,120" style={{ ...strokeStyle, strokeWidth: 2 }} />
        <path d="M50,90 Q60,85 65,95 M50,105 Q40,100 35,110" style={strokeStyle} />
    </svg>
);

export const Sunflower = () => (
    <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
        {/* Fill */}
        <path d="M10,20 Q-5,50 20,80 Q50,100 80,80 Q105,50 80,20 Q50,0 10,20 Z" style={fillStyle('#FBC02D')} />
        <circle cx="50" cy="50" r="12" style={fillStyle('#5D4037')} />

        {/* Center Sketch */}
        <circle cx="50" cy="50" r="10" style={strokeStyle} />
        <path d="M45,45 L55,55 M55,45 L45,55 M42,50 L58,50 M50,42 L50,58" stroke="#3E2723" strokeWidth="0.5" />

        {/* Petals Sketch */}
        <path d="M50,40 Q45,20 50,10 Q55,20 50,40 M60,42 Q80,30 85,35 Q75,50 60,48 M60,58 Q80,70 85,65 Q75,50 60,52 M50,60 Q55,80 50,90 Q45,80 50,60 M40,58 Q20,70 15,65 Q25,50 40,52 M40,42 Q20,30 15,35 Q25,50 40,48" style={strokeStyle} />

        {/* Stem */}
        <path d="M50,90 Q48,100 50,120" style={{ ...strokeStyle, strokeWidth: 2 }} />
    </svg>
);

export const TulipPink = () => (
    <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
        {/* Fill */}
        <path d="M25,25 Q15,50 35,75 Q50,90 65,75 Q85,50 75,25 Q50,35 25,25 Z" style={fillStyle('#F48FB1')} />

        {/* Sketch */}
        <path d="M30,30 Q30,70 50,80 Q70,70 70,30 M50,80 L50,30 M30,30 Q40,40 50,30 Q60,40 70,30" style={strokeStyle} />

        {/* Stem */}
        <path d="M50,80 Q50,100 50,120" style={{ ...strokeStyle, strokeWidth: 2 }} />
        <path d="M50,100 Q65,85 65,110" style={strokeStyle} />
    </svg>
);

export const LilyWhite = () => (
    <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
        {/* Fill */}
        <path d="M20,30 Q30,80 50,90 Q70,80 80,30 Q50,40 20,30 Z" style={fillStyle('#F5F5F5')} />

        {/* Sketch */}
        <path d="M50,90 Q30,60 20,20 M50,90 Q70,60 80,20 M50,90 L50,20 M35,40 L65,40" style={strokeStyle} />
        <path d="M45,30 L45,50 M55,30 L55,50" style={strokeStyle} />

        {/* Stem */}
        <path d="M50,90 Q52,100 50,120" style={{ ...strokeStyle, strokeWidth: 2 }} />
    </svg>
);

export const Carnation = () => (
    <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
        {/* Fill */}
        <circle cx="50" cy="40" r="25" style={fillStyle('#FF8A65')} />

        {/* Sketch - Ruffled edges */}
        <path d="M30,40 Q25,35 30,30 Q35,25 40,30 Q45,25 50,30 Q55,25 60,30 Q65,25 70,30 Q75,35 70,40 Q75,45 70,50 Q65,55 60,50 Q55,55 50,50 Q45,55 40,50 Q35,55 30,50 Q25,45 30,40" style={strokeStyle} />
        <path d="M50,50 L50,60 M50,60 Q40,70 50,80" style={strokeStyle} />

        {/* Stem */}
        <path d="M50,80 Q50,100 50,120" style={{ ...strokeStyle, strokeWidth: 2 }} />
    </svg>
);

export const Poppy = () => (
    <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
        {/* Fill */}
        <path d="M20,20 Q10,50 30,70 Q50,80 70,70 Q90,50 80,20 Q50,30 20,20 Z" style={fillStyle('#C62828')} />

        {/* Sketch */}
        <path d="M30,30 Q25,50 35,60 Q50,65 65,60 Q75,50 70,30 Q60,40 50,35 Q40,40 30,30" style={strokeStyle} />
        <circle cx="50" cy="45" r="5" fill="#1a1a1a" />

        {/* Stem */}
        <path d="M50,65 Q45,80 50,120" style={{ ...strokeStyle, strokeWidth: 2 }} />
    </svg>
);

export const Violet = () => (
    <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
        {/* Fill */}
        <path d="M30,30 Q20,50 40,60 Q50,70 60,60 Q80,50 70,30 Q50,40 30,30 Z" style={fillStyle('#7C3AED')} />

        {/* Sketch */}
        <path d="M35,35 Q30,50 45,55 M65,35 Q70,50 55,55 M50,55 L50,65" style={strokeStyle} />
        <path d="M50,65 Q50,90 50,120" style={{ ...strokeStyle, strokeWidth: 2 }} />
    </svg>
);

export const Daffodil = () => (
    <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
        {/* Fill */}
        <path d="M20,20 L40,40 L60,20 L80,40 L60,60 L80,80 L60,100 L40,80 L20,100 L40,60 L20,40 Z" style={fillStyle('#FACC15')} />

        {/* Sketch */}
        <path d="M50,60 L30,40 M50,60 L70,40 M50,60 L30,80 M50,60 L70,80 M50,60 L50,30 M50,60 L50,90" style={strokeStyle} />
        <circle cx="50" cy="60" r="10" style={strokeStyle} />

        {/* Stem */}
        <path d="M50,90 Q50,100 50,120" style={{ ...strokeStyle, strokeWidth: 2 }} />
    </svg>
);

// Greenery Assets
export const Eucalyptus = () => (
    <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
        <path d="M50,20 Q40,30 50,40 Q60,30 50,20 M50,50 Q35,60 50,70 Q65,60 50,50 M50,80 Q30,90 50,100 Q70,90 50,80" style={fillStyle('#4D7C5D')} />
        <path d="M50,120 L50,20" style={strokeStyle} />
        <circle cx="50" cy="30" r="8" style={strokeStyle} />
        <circle cx="50" cy="60" r="10" style={strokeStyle} />
        <circle cx="50" cy="90" r="12" style={strokeStyle} />
    </svg>
);

export const Fern = () => (
    <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
        <path d="M50,120 Q30,80 50,20 Q70,80 50,120" style={fillStyle('#2E5936')} />
        <path d="M50,120 Q40,70 50,20" style={strokeStyle} />
        {[30, 40, 50, 60, 70, 80, 90, 100].map(y => (
            <React.Fragment key={y}>
                <line x1="50" y1={y} x2="35" y2={y - 5} style={strokeStyle} />
                <line x1="50" y1={y} x2="65" y2={y - 5} style={strokeStyle} />
            </React.Fragment>
        ))}
    </svg>
);

export const BabyBreath = () => (
    <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
        <path d="M50,120 L50,80 M50,80 L30,50 M50,80 L70,50 M30,50 L20,30 M30,50 L40,30" style={strokeStyle} />
        {[20, 25, 30, 35, 40].map((cx, i) => <circle key={i} cx={cx} cy={30 + (i % 2) * 5} r="2" fill="white" stroke="#1a1a1a" strokeWidth="1" />)}
        {[60, 65, 70, 75, 80].map((cx, i) => <circle key={i + 10} cx={cx} cy={30 + (i % 2) * 5} r="2" fill="white" stroke="#1a1a1a" strokeWidth="1" />)}
    </svg>
);
