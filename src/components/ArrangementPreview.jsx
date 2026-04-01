import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   GREENERY THEMES  — each defines leaf shapes, stems, accents
   ═══════════════════════════════════════════════════════════════ */

// ── Theme 1: Classic Pointed Leaves ───────────────────────────
const PointedLeaf = ({ x, y, rotate, scale = 1, flip = false, color = '#1B5E20' }) => (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${flip ? -scale : scale}, ${scale})`}>
        <path d="M0,0 C6,-22 22,-38 5,-65 C-8,-42 -10,-18 0,0Z" fill={color} opacity="0.9" />
        {/* highlight edge */}
        <path d="M0,0 C6,-22 22,-38 5,-65" stroke="#4a9e50" strokeWidth="0.7" fill="none" opacity="0.22" />
        {/* midrib */}
        <path d="M1,-4 C3,-22 8,-40 4,-60" stroke="#0D3B13" strokeWidth="0.9" fill="none" opacity="0.45" />
        {/* side veins */}
        <path d="M3,-14 C9,-18 13,-20 15,-23" stroke="#0D3B13" strokeWidth="0.5" fill="none" opacity="0.28" />
        <path d="M4,-26 C10,-31 13,-34 14,-37" stroke="#0D3B13" strokeWidth="0.5" fill="none" opacity="0.24" />
        <path d="M3,-40 C8,-45 10,-48 10,-51" stroke="#0D3B13" strokeWidth="0.4" fill="none" opacity="0.2" />
        <path d="M2,-14 C-2,-17 -5,-19 -6,-21" stroke="#0D3B13" strokeWidth="0.4" fill="none" opacity="0.2" />
        <path d="M2,-27 C-2,-31 -4,-34 -5,-37" stroke="#0D3B13" strokeWidth="0.4" fill="none" opacity="0.18" />
    </g>
);

// ── Theme 2: Broad Tropical Leaves ────────────────────────────
const TropicalLeaf = ({ x, y, rotate, scale = 1, flip = false, color = '#2E7D32' }) => (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${flip ? -scale : scale}, ${scale})`}>
        <path d="M0,0 C15,-10 28,-30 20,-60 C10,-55 -5,-45 -12,-25 C-8,-12 -3,-4 0,0Z" fill={color} opacity="0.85" />
        {/* highlight on upper edge */}
        <path d="M0,0 C15,-10 28,-30 20,-60" stroke="#5aad5e" strokeWidth="0.8" fill="none" opacity="0.2" />
        {/* midrib */}
        <path d="M2,-3 C10,-15 18,-32 18,-54" stroke="#1a4a1e" strokeWidth="1.1" fill="none" opacity="0.38" />
        {/* side veins — right */}
        <path d="M7,-12 C13,-16 17,-18 18,-20" stroke="#1a4a1e" strokeWidth="0.55" fill="none" opacity="0.28" />
        <path d="M10,-22 C16,-27 19,-29 20,-32" stroke="#1a4a1e" strokeWidth="0.55" fill="none" opacity="0.25" />
        <path d="M13,-34 C17,-39 19,-42 19,-45" stroke="#1a4a1e" strokeWidth="0.5" fill="none" opacity="0.22" />
        {/* side veins — left */}
        <path d="M4,-10 C-1,-14 -5,-16 -8,-17" stroke="#1a4a1e" strokeWidth="0.55" fill="none" opacity="0.25" />
        <path d="M6,-20 C1,-25 -2,-27 -4,-29" stroke="#1a4a1e" strokeWidth="0.5" fill="none" opacity="0.22" />
        <path d="M9,-32 C5,-37 2,-40 0,-43" stroke="#1a4a1e" strokeWidth="0.45" fill="none" opacity="0.18" />
    </g>
);

// ── Theme 3: Eucalyptus / Round Leaves ────────────────────────
const EucalyptusSprig = ({ x, y, rotate, scale = 1, flip = false, color = '#5D8A66' }) => (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${flip ? -scale : scale}, ${scale})`}>
        {/* main stem */}
        <path d="M0,0 C1,-22 -1,-44 1,-65" stroke="#4a7055" strokeWidth="1.3" fill="none" opacity="0.65" />
        {[0, -13, -26, -39, -52].map((py, i) => {
            const side = i % 2 === 0 ? 1 : -1;
            const cx = side * (7 - i * 0.3);
            const rx = 7.5 - i * 0.3;
            const ry = 5 - i * 0.2;
            return (
                <g key={i}>
                    {/* short petiole */}
                    <path d={`M0,${py - 3} L${side * 3},${py - 6}`} stroke="#4a7055" strokeWidth="0.7" opacity="0.5" />
                    <ellipse cx={cx} cy={py - 7} rx={rx} ry={ry}
                        fill={color} opacity={0.82 - i * 0.05}
                        transform={`rotate(${side * 20} ${cx} ${py - 7})`}
                    />
                    {/* leaf midrib */}
                    <path d={`M${side * 2},${py - 5} L${side * (rx - 1)},${py - 9}`}
                        stroke="#3a6045" strokeWidth="0.5" opacity="0.3" fill="none" />
                </g>
            );
        })}
    </g>
);

// ── Theme 4: Long Grass / Lily Blades ─────────────────────────
const GrassBlade = ({ x, y, rotate, scale = 1, flip = false, color = '#1B5E20' }) => (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${flip ? -scale : scale}, ${scale})`}>
        {/* main blade */}
        <path d="M0,0 C2,-25 -1,-50 3,-80 C4,-82 3,-80 2,-78 C-2,-52 1,-28 0,0Z" fill={color} opacity="0.82" />
        {/* center highlight stripe */}
        <path d="M1.5,0 C2.5,-25 0.5,-50 3.5,-79" stroke="#4a9e45" strokeWidth="0.5" fill="none" opacity="0.2" />
        {/* secondary blade offset slightly */}
        <path d="M-2,0 C0,-20 -3,-42 0,-68 C1,-70 0,-68 -1,-66 C-3,-44 -2,-22 -2,0Z" fill={color} opacity="0.45" />
    </g>
);

// ── Theme 5: Fern Fronds ──────────────────────────────────────
const FernFrond = ({ x, y, rotate, scale = 1, flip = false, color = '#33691E' }) => (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${flip ? -scale : scale}, ${scale})`}>
        {/* rachis (main stem) */}
        <path d="M0,0 C1,-22 -1,-46 1,-70" stroke="#2a5418" strokeWidth="1.1" fill="none" opacity="0.55" />
        {[0, -8, -16, -24, -32, -40, -48, -56].map((py, i) => {
            const w = 9 - i * 0.6;
            const h = 8 - i * 0.5;
            return (
                <g key={i}>
                    {/* right leaflet */}
                    <path
                        d={`M2,${py - 3} C${w},${py - 7} ${w + 1},${py - 12} ${w - 2},${py - h - 6}`}
                        fill={color} opacity={0.75 - i * 0.04} stroke="none"
                    />
                    {/* left leaflet */}
                    <path
                        d={`M2,${py - 3} C${-w + 4},${py - 7} ${-w + 3},${py - 12} ${-w + 6},${py - h - 6}`}
                        fill={color} opacity={0.72 - i * 0.04} stroke="none"
                    />
                </g>
            );
        })}
    </g>
);

// ── Theme 6: Olive Branch ─────────────────────────────────────
const OliveLeaf = ({ x, y, rotate, scale = 1, flip = false, color = '#8aaa6e' }) => (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${flip ? -scale : scale}, ${scale})`}>
        {/* narrow elongated olive leaf */}
        <path d="M0,0 C3,-10 5,-28 2,-48 C1,-52 -1,-52 -2,-48 C-5,-28 -3,-10 0,0Z" fill={color} opacity="0.88" />
        {/* silvery highlight (olive leaves have silver sheen) */}
        <path d="M0,0 C2,-10 4,-28 1,-48" stroke="#c8d8b0" strokeWidth="0.6" fill="none" opacity="0.35" />
        {/* midrib */}
        <path d="M0,0 C0,-15 0,-32 0,-47" stroke="#6a8850" strokeWidth="0.6" fill="none" opacity="0.4" />
    </g>
);

const OliveBranch = ({ x, y, rotate, scale = 1, flip = false, color = '#8aaa6e' }) => (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${flip ? -scale : scale}, ${scale})`}>
        {/* main branch */}
        <path d="M0,0 C2,-18 0,-38 3,-60" stroke="#7a9060" strokeWidth="1.2" fill="none" opacity="0.6" />
        {[[-8, -10, -25], [6, -8, -20], [-6, -6, -38], [8, -5, -34], [-5, -4, -50], [5, -3, -46]].map(([cx, rotOff, py], i) => (
            <OliveLeaf key={i} x={cx} y={py} rotate={rotOff} scale={0.7 + i * 0.03} color={color} />
        ))}
    </g>
);

// ── Theme 7: Round Garden Leaves ──────────────────────────────
const RoundLeaf = ({ x, y, rotate, scale = 1, flip = false, color = '#388E3C' }) => (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${flip ? -scale : scale}, ${scale})`}>
        {/* rounded heart-shaped leaf */}
        <path d="M0,0 C-8,-5 -14,-18 -10,-35 C-6,-48 6,-52 10,-42 C14,-32 10,-15 0,0Z" fill={color} opacity="0.86" />
        {/* highlight */}
        <path d="M0,0 C-8,-5 -14,-18 -10,-35" stroke="#5cb85c" strokeWidth="0.6" fill="none" opacity="0.2" />
        {/* midrib */}
        <path d="M0,0 C-2,-12 -4,-28 -2,-42" stroke="#1a5c1e" strokeWidth="0.8" fill="none" opacity="0.38" />
        {/* veins */}
        <path d="M-1,-10 C-5,-14 -8,-16 -10,-17" stroke="#1a5c1e" strokeWidth="0.5" fill="none" opacity="0.25" />
        <path d="M-2,-22 C-6,-26 -8,-28 -9,-30" stroke="#1a5c1e" strokeWidth="0.45" fill="none" opacity="0.22" />
        <path d="M-1,-10 C2,-13 4,-15 5,-16" stroke="#1a5c1e" strokeWidth="0.45" fill="none" opacity="0.2" />
        <path d="M-2,-22 C1,-26 3,-28 4,-30" stroke="#1a5c1e" strokeWidth="0.4" fill="none" opacity="0.18" />
    </g>
);

/* ─── Berry cluster — with 3D highlight ─────────────────────── */
const Berry = ({ x, y, r = 3, color = '#3a2010' }) => (
    <g>
        {/* tiny stem */}
        <line x1={x} y1={y + r} x2={x} y2={y + r + 3} stroke="#5a3820" strokeWidth="0.6" opacity="0.5" />
        <circle cx={x} cy={y} r={r} fill={color} opacity="0.8" />
        {/* shine highlight */}
        <circle cx={x - r * 0.28} cy={y - r * 0.28} r={r * 0.32} fill="white" opacity="0.38" />
    </g>
);

/* ─── Lavender sprig accent ─────────────────────────────────── */
const LavenderSprig = ({ x, y, rotate, scale = 1, flip = false }) => (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${flip ? -scale : scale}, ${scale})`}>
        {/* stem */}
        <path d="M0,0 C0,-18 1,-36 0,-55" stroke="#8a9a72" strokeWidth="1" fill="none" opacity="0.55" />
        {/* florets — pairs of small petals */}
        {[-12, -18, -24, -30, -36, -42, -48].map((py, i) => {
            const side = i % 2 === 0 ? 1 : -1;
            const fade = 0.8 - i * 0.06;
            return (
                <g key={i}>
                    <ellipse cx={side * 3.5} cy={py} rx={3.5} ry={4.5}
                        fill="#9C7DBE" opacity={fade}
                        transform={`rotate(${side * 15} ${side * 3.5} ${py})`} />
                    <ellipse cx={-side * 2} cy={py - 1} rx={2.5} ry={3.5}
                        fill="#b090d0" opacity={fade * 0.7}
                        transform={`rotate(${-side * 10} ${-side * 2} ${py - 1})`} />
                </g>
            );
        })}
        {/* tip bud */}
        <ellipse cx={0} cy={-52} rx={2} ry={3} fill="#7B5EA7" opacity="0.6" />
    </g>
);

/* ─── Baby's breath cluster ─────────────────────────────────── */
const BabysBreath = ({ x, y, rotate, scale = 1, flip = false }) => (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${flip ? -scale : scale}, ${scale})`}>
        {/* main stem */}
        <path d="M0,0 C0,-12 -2,-22 -1,-34" stroke="#8a9a72" strokeWidth="0.9" fill="none" opacity="0.45" />
        {/* branch 1 */}
        <path d="M-1,-22 C5,-28 7,-33 9,-36" stroke="#8a9a72" strokeWidth="0.65" fill="none" opacity="0.38" />
        <path d="M9,-36 C10,-39 11,-41 12,-43" stroke="#8a9a72" strokeWidth="0.5" fill="none" opacity="0.3" />
        <path d="M9,-36 C8,-40 7,-42 6,-45" stroke="#8a9a72" strokeWidth="0.5" fill="none" opacity="0.3" />
        {/* branch 2 */}
        <path d="M-1,-20 C-7,-26 -9,-31 -11,-34" stroke="#8a9a72" strokeWidth="0.65" fill="none" opacity="0.35" />
        <path d="M-11,-34 C-12,-37 -13,-40 -13,-42" stroke="#8a9a72" strokeWidth="0.5" fill="none" opacity="0.28" />
        <path d="M-11,-34 C-9,-38 -8,-41 -7,-44" stroke="#8a9a72" strokeWidth="0.5" fill="none" opacity="0.28" />
        {/* branch 3 — top */}
        <path d="M-1,-30 C1,-35 2,-38 2,-42" stroke="#8a9a72" strokeWidth="0.55" fill="none" opacity="0.32" />
        {/* flower clusters */}
        {[
            { cx: -1, cy: -34 }, { cx: 12, cy: -43 }, { cx: 6, cy: -45 },
            { cx: -13, cy: -42 }, { cx: -7, cy: -44 }, { cx: 2, cy: -42 },
            { cx: 4, cy: -48 }, { cx: -4, cy: -47 }, { cx: 9, cy: -39 },
            { cx: -10, cy: -38 }, { cx: 0, cy: -50 },
        ].map((p, i) => (
            <circle key={i} cx={p.cx} cy={p.cy} r={2.2} fill="#fffefa" opacity={0.88 - i * 0.02} />
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
    {
        name: 'Olive Branch',
        LeafComponent: OliveBranch,
        stemColor: '#7a9060',
        leafColors: ['#8aaa6e', '#9aba7e', '#7a9a5e'],
        berryColor: '#8aaa6e',
        accents: ['berry'],
        getLeaves: (spread, height) => [
            { x: -spread - 18, y: -height * 0.1, rot: -28, s: 1.3 },
            { x: -spread - 6, y: -height * 0.6, rot: -42, s: 1.15 },
            { x: -spread + 10, y: -height * 1.1, rot: -58, s: 1.0 },
            { x: spread + 18, y: -height * 0.1, rot: 28, s: 1.3, flip: true },
            { x: spread + 6, y: -height * 0.6, rot: 42, s: 1.15, flip: true },
            { x: spread - 10, y: -height * 1.1, rot: 58, s: 1.0, flip: true },
            { x: -spread * 0.35, y: -height * 1.45, rot: -16, s: 0.9 },
            { x: spread * 0.35, y: -height * 1.45, rot: 16, s: 0.9, flip: true },
            { x: 0, y: -height * 1.6, rot: 2, s: 0.75 },
            { x: -spread * 0.65, y: 12, rot: -14, s: 0.85 },
            { x: spread * 0.65, y: 12, rot: 14, s: 0.85, flip: true },
        ],
    },
    {
        name: 'Romantic',
        LeafComponent: RoundLeaf,
        stemColor: '#5a8a5e',
        leafColors: ['#388E3C', '#43A047', '#2E7D32'],
        berryColor: '#C2185B',
        accents: ['babysbreath', 'berry'],
        getLeaves: (spread, height) => [
            { x: -spread - 16, y: -height * 0.12, rot: -26, s: 1.4 },
            { x: -spread - 4, y: -height * 0.58, rot: -40, s: 1.2 },
            { x: -spread + 10, y: -height * 1.05, rot: -56, s: 1.05 },
            { x: spread + 16, y: -height * 0.12, rot: 26, s: 1.4, flip: true },
            { x: spread + 4, y: -height * 0.58, rot: 40, s: 1.2, flip: true },
            { x: spread - 10, y: -height * 1.05, rot: 56, s: 1.05, flip: true },
            { x: -spread * 0.42, y: -height * 1.42, rot: -14, s: 0.95 },
            { x: spread * 0.42, y: -height * 1.42, rot: 14, s: 0.95, flip: true },
            { x: -4, y: -height * 1.58, rot: -5, s: 0.8 },
            { x: 4, y: -height * 1.62, rot: 5, s: 0.78, flip: true },
            { x: -spread * 0.7, y: 14, rot: -16, s: 0.9 },
            { x: spread * 0.7, y: 14, rot: 16, s: 0.9, flip: true },
        ],
    },
];


/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const ArrangementPreview = ({ selectedFlowers, selectedGreenery, onNext, onBack, isFinal = false, showControls = false }) => {
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

    // Container dimensions — smaller on mobile to avoid excessive scrolling
    const baseContainerW = 440;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const baseContainerH = isFinal
        ? (isMobile ? 360 : 480)
        : (isMobile ? 400 : 540);

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
                                        willChange: 'transform',
                                    }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: 1, scale: item.scale || 1,
                                        x: item.x, y: item.y,
                                        rotate: item.rotation || 0,
                                    }}
                                    transition={{
                                        duration: 0.5, delay: index * 0.04,
                                        type: 'spring', stiffness: 80, damping: 20,
                                    }}
                                >
                                    <div style={{
                                        width: '100%', height: '100%',
                                        borderRadius: '50%', overflow: 'hidden',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                title={item.name}
                                                draggable={false}
                                                style={{
                                                    width: `${imgScale * 100}%`,
                                                    height: `${imgScale * 100}%`,
                                                    objectFit: 'cover',
                                                    // filter: 'saturate(1.3) contrast(1.1) brightness(1.02)',
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

            {/* ── Shuffle / Greenery controls ── */}
            {(!isFinal || showControls) && (
                <div className="flex flex-col gap-3 items-center mt-5">
                    <p className="text-xs text-[#880E4F] opacity-60 tracking-wider uppercase">
                        Greenery: {theme.name}
                    </p>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={shuffleArrangement}
                            className="px-5 py-2.5 text-sm rounded-full border border-[#880E4F] text-[#880E4F] hover:bg-pink-100 active:bg-pink-100 transition-colors tracking-wide"
                        >
                            SHUFFLE
                        </button>
                        <button
                            type="button"
                            onClick={cycleGreenery}
                            className="px-5 py-2.5 text-sm rounded-full border border-[#2E7D32] text-[#2E7D32] hover:bg-green-50 active:bg-green-50 transition-colors tracking-wide"
                        >
                            CHANGE GREENERY
                        </button>
                    </div>
                </div>
            )}

            {/* ── Navigation (only on arrangement step) ── */}
            {!isFinal && (
                <div className="flex gap-4 mt-5">
                    <button
                        type="button"
                        onClick={onBack}
                        className="px-6 py-2 rounded-full border border-[#880E4F] text-[#880E4F] hover:bg-pink-100 transition-colors"
                    >
                        BACK
                    </button>
                    <button
                        type="button"
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
