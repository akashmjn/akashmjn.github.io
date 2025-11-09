const canvas = document.getElementById('waves');
const ctx = canvas.getContext('2d');

// ============================================================================
// CONSTANTS
// ============================================================================

// Wave Geometry
const NUM_LINES = 40;
const NUM_POINTS = 300;
const WAVE_WIDTH_FACTOR = 0.6; // Percentage of canvas width to use for waves
const WAVE_HEIGHT_FACTOR = 0.6; // Percentage of canvas height to use for waves

// Base Wave Shape
const BASE_AMPLITUDE = 60;
const BELL_CURVE_FACTOR = 8; // Controls the spread of the bell curve

// Line Variation
const LINE_MODULATION_RANGE = 0.3;
const LINE_MODULATION_BASE = 0.7;
const LINE_MODULATION_FREQ = 0.07;

// Wave Component Frequencies
// const WAVE_FREQUENCIES = {
//     wave1: 8,
//     wave2: 15,
//     wave3: 25,
//     noise1: 50,
//     noise2: 80,
//     noise3: 120,
//     noise4: 150
// };

// Wave Component Amplitudes (multipliers)
// const WAVE_AMPLITUDES = {
//     wave1: 0.4,
//     wave2: 0.3,
//     wave3: 0.3,
//     noise1: 0.15,
//     noise2: 0.12,
//     noise3: 0.1,
//     noise4: 0.08
// };

// Wave Component Frequencies (phase multipliers)
// const WAVE_PHASE_MULTIPLIERS = {
//     wave1: 0.5,
//     wave2: 0.3,
//     wave3: 0.2,
//     noise1: 0.8,
//     noise2: 1.2,
//     noise3: 1.5,
//     noise4: 2.0
// };

// Animation
const TIME_SPEED = 0.04; // Time increment per frame
const TIME_MULTIPLIERS = {
    // wave1: 0.3,
    // wave2: 0.5,
    // wave3: 0.7,
    // noise1: 0.4,
    // noise2: 0.3,
    // noise3: 0.25,
    // noise4: 0.2,
    lineModulation: 0.2
};

// Visual Styling
const LINE_WIDTH = 1.5;
const FALLBACK_BACKGROUND_COLOR = '#000';
const FALLBACK_STROKE_COLOR = '#fff';

let backgroundColor = FALLBACK_BACKGROUND_COLOR;
let strokeColor = FALLBACK_STROKE_COLOR;

function updateCanvasColors() {
    const style = window.getComputedStyle(canvas);
    const background = style.getPropertyValue('--wave-background').trim();
    const stroke = style.getPropertyValue('--wave-stroke').trim();

    backgroundColor = background || FALLBACK_BACKGROUND_COLOR;
    strokeColor = stroke || FALLBACK_STROKE_COLOR;
}

// ============================================================================
// INITIALIZATION
// ============================================================================

const lines = [];
const time = { value: 0 };

// Initialize wave lines
function initializeLines() {
    lines.length = 0; // Clear existing lines
    const waveHeight = canvas.height * WAVE_HEIGHT_FACTOR;
    const startY = (canvas.height - waveHeight) / 2;
    
    for (let i = 0; i < NUM_LINES; i++) {
        lines.push({
            y: startY + (waveHeight / (NUM_LINES + 1)) * (i + 1),
            points: [],
            phase: Math.random() * Math.PI * 2
        });
    }
}

// Set canvas size
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateCanvasColors();
    initializeLines(); // Recalculate line positions on resize
}
resize();
window.addEventListener('resize', resize);

function generateWavePoints(line, centerY) {
    const points = [];
    const width = canvas.width * WAVE_WIDTH_FACTOR;
    const startX = (canvas.width - width) / 2;
    
    for (let i = 0; i <= NUM_POINTS; i++) {
        const x = startX + (i / NUM_POINTS) * width;
        const normalizedX = (i / NUM_POINTS - 0.5) * 2;  // range [-1, 1]
        
        // Create the distinctive pulsar wave shape with bell curve
        const envelope = Math.exp(-normalizedX * normalizedX * BELL_CURVE_FACTOR) * BASE_AMPLITUDE;
        
        // // Add multiple frequency components for complexity
        // const wave1 = Math.sin((normalizedX * WAVE_FREQUENCIES.wave1 + time.value * TIME_MULTIPLIERS.wave1 + line.phase) * WAVE_PHASE_MULTIPLIERS.wave1) * WAVE_AMPLITUDES.wave1;
        // const wave2 = Math.sin((normalizedX * WAVE_FREQUENCIES.wave2 + time.value * TIME_MULTIPLIERS.wave2 + line.phase * 1.5) * WAVE_PHASE_MULTIPLIERS.wave2) * WAVE_AMPLITUDES.wave2;
        // const wave3 = Math.sin((normalizedX * WAVE_FREQUENCIES.wave3 + time.value * TIME_MULTIPLIERS.wave3 + line.phase * 2) * WAVE_PHASE_MULTIPLIERS.wave3) * WAVE_AMPLITUDES.wave3;
        
        // // High frequency noise components for texture
        // const noise1 = Math.sin((normalizedX * WAVE_FREQUENCIES.noise1 + time.value * TIME_MULTIPLIERS.noise1 + line.phase * 3) * WAVE_PHASE_MULTIPLIERS.noise1) * WAVE_AMPLITUDES.noise1;
        // const noise2 = Math.sin((normalizedX * WAVE_FREQUENCIES.noise2 + time.value * TIME_MULTIPLIERS.noise2 + line.phase * 4) * WAVE_PHASE_MULTIPLIERS.noise2) * WAVE_AMPLITUDES.noise2;
        // const noise3 = Math.sin((normalizedX * WAVE_FREQUENCIES.noise3 + time.value * TIME_MULTIPLIERS.noise3 + line.phase * 5) * WAVE_PHASE_MULTIPLIERS.noise3) * WAVE_AMPLITUDES.noise3;
        // const noise4 = Math.sin((normalizedX * WAVE_FREQUENCIES.noise4 + time.value * TIME_MULTIPLIERS.noise4 + line.phase * 6) * WAVE_PHASE_MULTIPLIERS.noise4) * WAVE_AMPLITUDES.noise4;
        
        // const amplitude = envelope * (1 + wave1 + wave2 + wave3 + noise1 + noise2 + noise3 + noise4);
        const amplitude = envelope;
        
        // Vary amplitude by line position for that classic look
        const lineModulation = Math.sin(line.phase + i * LINE_MODULATION_FREQ + time.value * TIME_MULTIPLIERS.lineModulation) * LINE_MODULATION_RANGE + LINE_MODULATION_BASE;
        
        const y = centerY - amplitude * lineModulation;
        points.push({ x, y });
    }
    
    return points;
}

function draw() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = LINE_WIDTH;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    lines.forEach(line => {
        const points = generateWavePoints(line, line.y);
        
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        
        ctx.stroke();
    });
    
    time.value += TIME_SPEED;
    requestAnimationFrame(draw);
}

draw();

