import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   GREENERY THEMES  — each defines leaf shapes, stems, accents
   ═══════════════════════════════════════════════════════════════ */

// ── Theme 1: Classic Pointed Leaves ───────────────────────────
const PointedLeaf = ({ x, y, rotate, scale = 1, flip = false, color = '#1B5E20' }) => (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${flip ? -scale : scale}, ${scale})`}>
        <path d="M0,0 C6,-22 22,-38 5,-65 C-8,-42 -10,-18 0,0Z" fill={color} opacity="0.88" />
        <path d="M1,-5 C3,-22 8,-38 4,-58" stroke="#0D3B13" strokeWidth="1" fill="none" opacity="0.4" />
    </g>
);

// ── Theme 2: Broad Tropical Leaves ────────────────────────────
const TropicalLeaf = ({ x, y, rotate, scale = 1, flip = false, color = '#2E7D32' }) => (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${flip ? -scale : scale}, ${scale})`}>
        <path d="M0,0 C15,-10 28,-30 20,-60 C10,-55 -5,-45 -12,-25 C-8,-12 -3,-4 0,0Z" fill={color} opacity="0.82" />
        <path d="M2,-3 C10,-15 18,-32 18,-52" stroke="#1a4a1e" strokeWidth="1.2" fill="none" opacity="0.35" />
        {/* side veins */}
        <path d="M6,-12 L14,-18" stroke="#1a4a1e" strokeWidth="0.6" fill="none" opacity="0.25" />
        <path d="M4,-22 L12,-30" stroke="#1a4a1e" strokeWidth="0.6" fill="none" opacity="0.25" />
        <path d="M1,-8 L-6,-14" stroke="#1a4a1e" strokeWidth="0.6" fill="none" opacity="0.25" />
    </g>
);

// ── Theme 3: Eucalyptus / Round Leaves ────────────────────────
const EucalyptusSprig = ({ x, y, rotate, scale = 1, flip = false, color = '#5D8A66' }) => (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${flip ? -scale : scale}, ${scale})`}>
        <path d="M0,0 L0,-65" stroke="#4a7055" strokeWidth="1.2" opacity="0.6" />
        {[0, -14, -28, -42, -54].map((py, i) => (
            <ellipse key={i} cx={i % 2 === 0 ? 6 : -6} cy={py - 5} rx={7} ry={5}
                fill={color} opacity={0.75 - i * 0.05}
                transform={`rotate(${i % 2 === 0 ? 15 : -15} ${i % 2 === 0 ? 6 : -6} ${py - 5})`}
            />
        ))}
    </g>
);

// ── Theme 4: Long Grass Blades ────────────────────────────────
const GrassBlade = ({ x, y, rotate, scale = 1, flip = false, color = '#1B5E20' }) => (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${flip ? -scale : scale}, ${scale})`}>
        <path d="M0,0 C2,-25 -1,-50 3,-80 C4,-82 3,-80 2,-78 C-2,-52 1,-28 0,0Z" fill={color} opacity="0.8" />
    </g>
);

// ── Theme 5: Fern Fronds ──────────────────────────────────────
const FernFrond = ({ x, y, rotate, scale = 1, flip = false, color = '#33691E' }) => (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${flip ? -scale : scale}, ${scale})`}>
        <path d="M0,0 L2,-70" stroke="#2a5418" strokeWidth="1" opacity="0.5" />
        {[0, -8, -16, -24, -32, -40, -48, -56].map((py, i) => (
            <path key={i}
                d={`M2,${py - 4} C${8 - i * 0.3},${py - 10} ${10 - i * 0.4},${py - 14} ${6 - i * 0.3},${py - 16}`}
                fill={color} opacity={0.7 - i * 0.04} stroke="none"
            />
        ))}
        {[0, -8, -16, -24, -32, -40, -48, -56].map((py, i) => (
            <path key={`r-${i}`}
                d={`M2,${py - 4} C${-4 + i * 0.3},${py - 10} ${-6 + i * 0.4},${py - 14} ${-2 + i * 0.3},${py - 16}`}
                fill={color} opacity={0.7 - i * 0.04} stroke="none"
            />
        ))}
    </g>
);

/* ─── Berry / dot accents ───────────────────────────────────── */
const Berry = ({ x, y, r = 3, color = '#3a2010' }) => (
    <circle cx={x} cy={y} r={r} fill={color} opacity="0.7" />
);

/* ─── Lavender sprig accent ─────────────────────────────────── */
const LavenderSprig = ({ x, y, rotate, scale = 1, flip = false }) => (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${flip ? -scale : scale}, ${scale})`}>
        <path d="M0,0 L1,-55" stroke="#7a8a65" strokeWidth="1" opacity="0.5" />
        {[-10, -16, -22, -28, -34, -40, -46].map((py, i) => (
            <ellipse key={i} cx={i % 2 === 0 ? 2 : -1} cy={py} rx={3} ry={4}
                fill="#9C7DBE" opacity={0.75 - i * 0.04} />
        ))}
    </g>
);

/* ─── Baby's breath cluster ─────────────────────────────────── */
const BabysBreath = ({ x, y, rotate, scale = 1, flip = false }) => (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${flip ? -scale : scale}, ${scale})`}>
        <path d="M0,0 C0,-15 -3,-25 -2,-40" stroke="#7a8a65" strokeWidth="0.8" opacity="0.4" />
        <path d="M0,-20 C8,-28 5,-35 10,-38" stroke="#7a8a65" strokeWidth="0.6" opacity="0.35" />
        <path d="M0,-15 C-6,-22 -8,-30 -10,-34" stroke="#7a8a65" strokeWidth="0.6" opacity="0.35" />
        {[{ cx: -2, cy: -40 }, { cx: 10, cy: -38 }, { cx: -10, cy: -34 }, { cx: -5, cy: -44 }, { cx: 5, cy: -42 }, { cx: 0, cy: -48 }].map((p, i) => (
            <circle key={i} cx={p.cx} cy={p.cy} r={2.5} fill="#fff" opacity="0.85" />
        ))}
    </g>
);

/* ═══════════════════════════════════════════════════════════════
   GREENERY THEME DEFINITIONS
   Each has: name, LeafComponent, stem style, accent generator,
   leaf positions generator, colors, berry style
   ═══════════════════════════════════════════════════════════════ */
const GREENERY_THEMES = [
    {
        name: 'Classic',
        LeafComponent: PointedLeaf,
        stemColor: '#4a7c42',
        leafColors: ['#1B5E20', '#2E7D32', '#1B5E20'],
        berryColor: '#3a2010',
        accents: ['berry'],
        getLeaves: (spread, height) => [
            { x: -spread - 20, y: -height * 0.1, rot: -30, s: 1.4 },
            { x: -spread - 8, y: -height * 0.55, rot: -45, s: 1.2 },
            { x: -spread + 8, y: -height * 1.0, rot: -60, s: 1.0 },
            { x: -spread + 20, y: -height * 1.35, rot: -75, s: 0.85 },
            { x: spread + 20, y: -height * 0.1, rot: 30, s: 1.4, flip: true },
            { x: spread + 8, y: -height * 0.55, rot: 45, s: 1.2, flip: true },
            { x: spread - 8, y: -height * 1.0, rot: 60, s: 1.0, flip: true },
            { x: spread - 20, y: -height * 1.35, rot: 75, s: 0.85, flip: true },
            { x: -spread * 0.4, y: -height * 1.5, rot: -15, s: 0.8 },
            { x: spread * 0.4, y: -height * 1.5, rot: 15, s: 0.8, flip: true },
            { x: 0, y: -height * 1.65, rot: 0, s: 0.7 },
            { x: -spread * 0.7, y: 15, rot: -18, s: 0.9 },
            { x: spread * 0.7, y: 15, rot: 18, s: 0.9, flip: true },
        ],
    },
    {
        name: 'Tropical',
        LeafComponent: TropicalLeaf,
        stemColor: '#3E7A44',
        leafColors: ['#2E7D32', '#388E3C', '#1B5E20'],
        berryColor: '#5D4037',
        accents: ['berry'],
        getLeaves: (spread, height) => [
            { x: -spread - 25, y: -height * 0.05, rot: -25, s: 1.5 },
            { x: -spread - 12, y: -height * 0.6, rot: -40, s: 1.3 },
            { x: -spread + 5, y: -height * 1.1, rot: -55, s: 1.1 },
            { x: spread + 25, y: -height * 0.05, rot: 25, s: 1.5, flip: true },
            { x: spread + 12, y: -height * 0.6, rot: 40, s: 1.3, flip: true },
            { x: spread - 5, y: -height * 1.1, rot: 55, s: 1.1, flip: true },
            { x: -spread * 0.5, y: -height * 1.4, rot: -20, s: 0.9 },
            { x: spread * 0.5, y: -height * 1.4, rot: 20, s: 0.9, flip: true },
            { x: 3, y: -height * 1.6, rot: 5, s: 0.8 },
            { x: -spread * 0.8, y: 12, rot: -15, s: 1.0 },
            { x: spread * 0.8, y: 12, rot: 15, s: 1.0, flip: true },
        ],
    },
    {
        name: 'Eucalyptus',
        LeafComponent: EucalyptusSprig,
        stemColor: '#5a8a5e',
        leafColors: ['#5D8A66', '#6B9E76', '#4A7A55'],
        berryColor: '#8da888',
        accents: ['babysbreath'],
        getLeaves: (spread, height) => [
            { x: -spread - 18, y: -height * 0.15, rot: -22, s: 1.3 },
            { x: -spread - 5, y: -height * 0.7, rot: -38, s: 1.1 },
            { x: -spread + 12, y: -height * 1.2, rot: -55, s: 0.9 },
            { x: spread + 18, y: -height * 0.15, rot: 22, s: 1.3, flip: true },
            { x: spread + 5, y: -height * 0.7, rot: 38, s: 1.1, flip: true },
            { x: spread - 12, y: -height * 1.2, rot: 55, s: 0.9, flip: true },
            { x: -spread * 0.3, y: -height * 1.5, rot: -12, s: 0.8 },
            { x: spread * 0.3, y: -height * 1.5, rot: 12, s: 0.8, flip: true },
            { x: 0, y: -height * 1.6, rot: 0, s: 0.7 },
        ],
    },
    {
        name: 'Meadow',
        LeafComponent: GrassBlade,
        stemColor: '#3d7a3a',
        leafColors: ['#1B5E20', '#33691E', '#2E7D32'],
        berryColor: '#6D4C41',
        accents: ['lavender', 'berry'],
        getLeaves: (spread, height) => [
            { x: -spread - 22, y: 5, rot: -18, s: 1.5 },
            { x: -spread - 15, y: -height * 0.3, rot: -28, s: 1.4 },
            { x: -spread - 5, y: -height * 0.7, rot: -38, s: 1.3 },
            { x: -spread + 5, y: -height * 1.0, rot: -50, s: 1.1 },
            { x: -spread + 15, y: -height * 1.3, rot: -65, s: 0.9 },
            { x: spread + 22, y: 5, rot: 18, s: 1.5, flip: true },
            { x: spread + 15, y: -height * 0.3, rot: 28, s: 1.4, flip: true },
            { x: spread + 5, y: -height * 0.7, rot: 38, s: 1.3, flip: true },
            { x: spread - 5, y: -height * 1.0, rot: 50, s: 1.1, flip: true },
            { x: spread - 15, y: -height * 1.3, rot: 65, s: 0.9, flip: true },
            { x: -spread * 0.2, y: -height * 1.55, rot: -8, s: 0.85 },
            { x: spread * 0.2, y: -height * 1.55, rot: 8, s: 0.85, flip: true },
            { x: 0, y: -height * 1.7, rot: 0, s: 0.7 },
        ],
    },
    {
        name: 'Fern Garden',
        LeafComponent: FernFrond,
        stemColor: '#3a6e2e',
        leafColors: ['#33691E', '#2E7D32', '#1B5E20'],
        berryColor: '#4E342E',
        accents: ['babysbreath', 'berry'],
        getLeaves: (spread, height) => [
            { x: -spread - 20, y: -height * 0.1, rot: -22, s: 1.3 },
            { x: -spread - 8, y: -height * 0.6, rot: -38, s: 1.15 },
            { x: -spread + 8, y: -height * 1.1, rot: -55, s: 1.0 },
            { x: spread + 20, y: -height * 0.1, rot: 22, s: 1.3, flip: true },
            { x: spread + 8, y: -height * 0.6, rot: 38, s: 1.15, flip: true },
            { x: spread - 8, y: -height * 1.1, rot: 55, s: 1.0, flip: true },
            { x: -spread * 0.4, y: -height * 1.45, rot: -15, s: 0.9 },
            { x: spread * 0.4, y: -height * 1.45, rot: 15, s: 0.9, flip: true },
            { x: 0, y: -height * 1.6, rot: 3, s: 0.75 },
            { x: -spread * 0.6, y: 10, rot: -12, s: 0.8 },
            { x: spread * 0.6, y: 10, rot: 12, s: 0.8, flip: true },
        ],
    },
];


/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const ArrangementPreview = ({ selectedFlowers, selectedGreenery, onNext, onBack, isFinal = false }) => {
    const [seed, setSeed] = useState(0);
    const [greeneryIdx, setGreeneryIdx] = useState(0);

    const theme = GREENERY_THEMES[greeneryIdx % GREENERY_THEMES.length];

    const seededRandom = (s) => {
        const x = Math.sin(s + 1) * 10000;
        return x - Math.floor(x);
    };

    // Shuffle flowers
    const shuffled = useMemo(() => {
        const arr = [...selectedFlowers];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(seededRandom(seed * 100 + i * 31) * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }, [selectedFlowers, seed]);

    // ─── Dense dome arrangement ────────────────────────────────
    const arrangement = useMemo(() => {
        const items = [];
        const total = shuffled.length;
        if (total === 0) return items;

        const CX = 0, CY = 0;
        const sz = total <= 2 ? 130 : total <= 4 ? 115 : total <= 6 ? 100 : total <= 9 ? 88 : 78;
        const gap = sz * 0.58;

        const rows = [];
        if (total === 1) rows.push(1);
        else if (total === 2) rows.push(2);
        else if (total === 3) rows.push(2, 1);
        else if (total === 4) rows.push(2, 2);
        else if (total === 5) rows.push(3, 2);
        else if (total === 6) rows.push(3, 2, 1);
        else if (total === 7) rows.push(3, 3, 1);
        else if (total === 8) rows.push(3, 3, 2);
        else if (total === 9) rows.push(4, 3, 2);
        else if (total === 10) rows.push(4, 3, 2, 1);
        else if (total === 11) rows.push(4, 4, 2, 1);
        else {
            rows.push(4, 4, 3, 1);
            let leftover = total - 12, r = 0;
            while (leftover > 0) { rows[r % rows.length]++; leftover--; r++; }
        }

        const totalRows = rows.length;
        let flowerIdx = 0;

        rows.forEach((count, rIdx) => {
            const rowY = CY - rIdx * (gap * 0.88);
            const rowWidth = count > 1 ? (count - 1) * gap : 0;
            const offsetX = rIdx % 2 === 1 ? gap * 0.3 : 0;

            for (let i = 0; i < count && flowerIdx < total; i++) {
                const flower = shuffled[flowerIdx];
                if (!flower) { flowerIdx++; continue; }

                const x = count === 1 ? CX + offsetX : CX - rowWidth / 2 + i * gap + offsetX;
                const normalPos = count === 1 ? 0 : (i / (count - 1)) * 2 - 1;
                const archLift = (1 - normalPos * normalPos) * (gap * 0.2);
                const y = rowY - archLift;
                const tilt = normalPos * 12 + (seededRandom(seed + flowerIdx * 7 + 3) - 0.5) * 8;
                const distFromCenter = Math.sqrt(x * x + (y + gap) * (y + gap));
                const maxDist = totalRows * gap;
                const scale = Math.max(0.85, 1.05 - (distFromCenter / maxDist) * 0.15);
                const zIndex = (totalRows - rIdx) * 10 + (5 - Math.abs(normalPos * 5));

                items.push({
                    ...flower, x, y, rotation: tilt, scale, size: sz,
                    zIndex: Math.round(zIndex), row: rIdx,
                });
                flowerIdx++;
            }
        });
        return items;
    }, [shuffled, seed]);

    // ─── Greenery: leaves for current theme ────────────────────
    const { leaves, spread, height: domeHeight } = useMemo(() => {
        const total = shuffled.length;
        if (total === 0) return { leaves: [], spread: 0, height: 0 };
        const sz = total <= 2 ? 130 : total <= 4 ? 115 : total <= 6 ? 100 : total <= 9 ? 88 : 78;
        const gap = sz * 0.58;
        const sp = Math.max(2, Math.ceil(total / 3)) * gap * 0.6;
        const h = Math.max(1, Math.ceil(total / 4)) * gap;

        const allLeaves = theme.getLeaves(sp, h);
        const count = Math.min(allLeaves.length, Math.max(5, total + 3));
        return {
            leaves: allLeaves.slice(0, count).map((l, i) => ({
                ...l,
                color: theme.leafColors[i % theme.leafColors.length],
            })),
            spread: sp,
            height: h,
        };
    }, [shuffled, seed, theme]);

    // ─── Berries / dots ────────────────────────────────────────
    const berries = useMemo(() => {
        const total = shuffled.length;
        if (total < 3 || !theme.accents.includes('berry')) return [];
        const sz = total <= 4 ? 115 : total <= 6 ? 100 : total <= 9 ? 88 : 78;
        const gap = sz * 0.58;
        const sp = Math.max(2, Math.ceil(total / 3)) * gap * 0.5;
        const h = Math.max(1, Math.ceil(total / 4)) * gap;
        const dots = [];
        const count = Math.min(10, total + 2);
        for (let i = 0; i < count; i++) {
            const angle = (seededRandom(seed + i * 17) * 360) * Math.PI / 180;
            const dist = sp * 0.5 + seededRandom(seed + i * 23) * sp * 0.8;
            dots.push({
                x: Math.cos(angle) * dist,
                y: -h * 0.5 + Math.sin(angle) * dist * 0.6,
                r: 2 + seededRandom(seed + i * 11) * 2,
            });
        }
        return dots;
    }, [shuffled, seed, theme]);

    // ─── Lavender sprigs ───────────────────────────────────────
    const lavenders = useMemo(() => {
        if (!theme.accents.includes('lavender')) return [];
        return [
            { x: -spread - 10, y: -domeHeight * 0.4, rot: -30, s: 1.0 },
            { x: spread + 10, y: -domeHeight * 0.4, rot: 30, s: 1.0, flip: true },
            { x: -spread * 0.2, y: -domeHeight * 1.4, rot: -10, s: 0.8 },
            { x: spread * 0.2, y: -domeHeight * 1.4, rot: 10, s: 0.8, flip: true },
        ];
    }, [spread, domeHeight, theme]);

    // ─── Baby's breath ─────────────────────────────────────────
    const babysBreaths = useMemo(() => {
        if (!theme.accents.includes('babysbreath')) return [];
        return [
            { x: -spread - 5, y: -domeHeight * 0.5, rot: -25, s: 1.0 },
            { x: spread + 5, y: -domeHeight * 0.5, rot: 25, s: 1.0, flip: true },
            { x: -spread * 0.5, y: -domeHeight * 1.35, rot: -12, s: 0.85 },
            { x: spread * 0.5, y: -domeHeight * 1.35, rot: 12, s: 0.85, flip: true },
            { x: 0, y: -domeHeight * 1.55, rot: 0, s: 0.7 },
        ];
    }, [spread, domeHeight, theme]);

    const shuffleArrangement = () => setSeed((s) => s + 1);
    const cycleGreenery = () => setGreeneryIdx((i) => (i + 1) % GREENERY_THEMES.length);

    // Container dimensions
    const baseContainerW = 440;
    const baseContainerH = isFinal ? 480 : 540;

    // Responsive scaling
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const padding = 32; // 16px padding on each side
            const availableWidth = width - padding;

            if (availableWidth < baseContainerW) {
                setScale(availableWidth / baseContainerW);
            } else {
                setScale(1);
            }
        };

        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [baseContainerW]);

    const domeCX = baseContainerW / 2;
    const domeCY = baseContainerH * 0.62;

    const LeafComp = theme.LeafComponent;

    // Calculate dynamic height for the wrapper based on scale
    const scaledHeight = baseContainerH * scale;

    return (
        <div className={`flex flex-col items-center justify-center ${isFinal ? '' : 'min-h-screen py-6 md:py-12'}`}>
            {!isFinal && (
                <>
                    <motion.h2
                        className="text-3xl md:text-4xl font-serif text-[#4A0E0E] mb-2 text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Your Bouquet
                    </motion.h2>
                    <motion.p
                        className="text-[#880E4F] mb-8 italic text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        A sneak peek at your creation
                    </motion.p>
                </>
            )}

            {/* ═══ BOUQUET WRAPPER ═══ */}
            <div
                style={{
                    width: baseContainerW * scale,
                    height: scaledHeight,
                    position: 'relative'
                }}
            >
                {/* Scaled Content */}
                <div
                    style={{
                        width: baseContainerW,
                        height: baseContainerH,
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                >
                    {/* ── Stems ── */}
                    <svg
                        className="absolute inset-0 pointer-events-none"
                        width={baseContainerW} height={baseContainerH}
                        viewBox={`0 0 ${baseContainerW} ${baseContainerH}`}
                        fill="none" style={{ zIndex: 1 }}
                    >
                        {[-28, -14, 0, 14, 28].map((offset, i) => (
                            <path
                                key={`stem-${i}`}
                                d={`M${domeCX + offset * 2.2},${domeCY + 5} Q${domeCX + offset * 0.8},${domeCY + 55} ${domeCX + offset * 0.3},${baseContainerH - 10}`}
                                stroke={theme.stemColor}
                                strokeWidth={2.5 - Math.abs(offset) * 0.03}
                                opacity={0.65}
                                strokeLinecap="round"
                            />
                        ))}
                        <ellipse cx={domeCX} cy={domeCY + 40} rx={18} ry={6} fill={theme.stemColor} opacity="0.45" />
                    </svg>

                    {/* ── Leaves + Accents layer ── */}
                    <motion.svg
                        key={`greenery-${greeneryIdx}`}
                        className="absolute inset-0 pointer-events-none"
                        width={baseContainerW} height={baseContainerH}
                        viewBox={`0 0 ${baseContainerW} ${baseContainerH}`}
                        fill="none" style={{ zIndex: 2 }}
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <g transform={`translate(${domeCX}, ${domeCY})`}>
                            {/* Leaves */}
                            {leaves.map((l, i) => (
                                <LeafComp
                                    key={`leaf-${i}`}
                                    x={l.x} y={l.y}
                                    rotate={l.rot}
                                    scale={l.s}
                                    flip={l.flip}
                                    color={l.color}
                                />
                            ))}
                            {/* Lavender sprigs */}
                            {lavenders.map((l, i) => (
                                <LavenderSprig key={`lav-${i}`} x={l.x} y={l.y} rotate={l.rot} scale={l.s} flip={l.flip} />
                            ))}
                            {/* Baby's breath */}
                            {babysBreaths.map((b, i) => (
                                <BabysBreath key={`bb-${i}`} x={b.x} y={b.y} rotate={b.rot} scale={b.s} flip={b.flip} />
                            ))}
                            {/* Berries */}
                            {berries.map((b, i) => (
                                <Berry key={`berry-${i}`} x={b.x} y={b.y} r={b.r} color={theme.berryColor} />
                            ))}
                        </g>
                    </motion.svg>

                    {/* ── Flowers ── */}
                    <AnimatePresence>
                        {arrangement.map((item, index) => {
                            const sz = item.size || 88;
                            const imgScale = 1.2;
                            return (
                                <motion.div
                                    key={`${item.id}-${index}-${seed}`}
                                    className="absolute"
                                    style={{
                                        left: domeCX, top: domeCY,
                                        width: sz, height: sz,
                                        marginLeft: -sz / 2, marginTop: -sz / 2,
                                        zIndex: 10 + (item.zIndex || 0),
                                    }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: 1, scale: item.scale || 1,
                                        x: item.x, y: item.y,
                                        rotate: item.rotation || 0,
                                    }}
                                    transition={{
                                        duration: 0.6, delay: index * 0.05,
                                        type: 'spring', stiffness: 140, damping: 16,
                                    }}
                                >
                                    <div style={{
                                        width: '100%', height: '100%',
                                        borderRadius: '50%', overflow: 'hidden',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        {item.image ? (
                                            <img
                                                src={item.image} alt={item.name} draggable={false}
                                                style={{
                                                    width: `${imgScale * 100}%`,
                                                    height: `${imgScale * 100}%`,
                                                    objectFit: 'cover',
                                                    filter: 'saturate(1.3) contrast(1.1) brightness(1.02)',
                                                }}
                                            />
                                        ) : (
                                            item.component && (
                                                <div style={{ width: '85%', height: '85%' }}>
                                                    <item.component />
                                                </div>
                                            )
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {/* Brand */}
                    <div
                        className="absolute left-1/2 -translate-x-1/2 opacity-30 font-serif text-[10px] text-[#880E4F] tracking-widest"
                        style={{ bottom: -4, zIndex: 40 }}
                    >
                        Forever Florals
                    </div>
                </div>
            </div>

            {/* ── Shuffle / Greenery controls (always visible) ── */}
            <div className="flex flex-col gap-3 items-center mt-5">
                <p className="text-xs text-[#880E4F] opacity-60 tracking-wider uppercase">
                    Greenery: {theme.name}
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={shuffleArrangement}
                        className="px-5 py-2 text-sm rounded-full border border-[#880E4F] text-[#880E4F] hover:bg-pink-100 transition-colors tracking-wide"
                    >
                        SHUFFLE
                    </button>
                    <button
                        onClick={cycleGreenery}
                        className="px-5 py-2 text-sm rounded-full border border-[#2E7D32] text-[#2E7D32] hover:bg-green-50 transition-colors tracking-wide"
                    >
                        CHANGE GREENERY
                    </button>
                </div>
            </div>

            {/* ── Navigation (only on arrangement step) ── */}
            {!isFinal && (
                <div className="flex gap-4 mt-5">
                    <button
                        onClick={onBack}
                        className="px-6 py-2 rounded-full border border-[#880E4F] text-[#880E4F] hover:bg-pink-100 transition-colors"
                    >
                        BACK
                    </button>
                    <button
                        onClick={onNext}
                        className="px-8 py-3 bg-[#C2185B] text-white rounded-full text-lg tracking-widest hover:bg-[#880E4F] transition-all shadow-lg"
                    >
                        WRITE NOTE
                    </button>
                </div>
            )}
        </div>
    );
};

export default ArrangementPreview;
