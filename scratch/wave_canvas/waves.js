const canvas = document.getElementById('waves');
const ctx = canvas.getContext('2d');

// ============================================================================
// CONSTANTS
// ============================================================================

// Wave Geometry
const NUM_LINES = 40;
const NUM_POINTS = 200;
const DRAW_AREA_WIDTH_RATIO = 0.6;      // Percentage of canvas width to use for waves
const DRAW_AREA_HEIGHT_RATIO = 0.6;     // Percentage of canvas height to use for waves

// Envelope Shape
const ENVELOPE_AMPLITUDE = 0.08;    // In yRelative units [0, 1]
const ENVELOPE_BELL_INV_VARIANCE = 8;        // Controls the spread of the bell curve

// Line Variation
const WAVE_MODULATION_RANGE = 0.3;
const WAVE_MODULATION_FLOOR = 0.9;
const WAVE_MODULATION_FREQ = 14.0;

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
const TIME_SPEED_PER_SECOND = 1.2;    // Time increment per second
const TIME_MULTIPLIERS = {
    // wave1: 0.3,
    // wave2: 0.5,
    // wave3: 0.7,
    // noise1: 0.4,
    // noise2: 0.3,
    // noise3: 0.25,
    // noise4: 0.2,
    waveModulation: 1.0
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

const waveStates = [];
const time = { value: 0 };
// Defines the pixel bounds used to map normalized wave coordinates:
// xRelative [-1, 1] -> xStart + width / 2 + xRelative * width / 2
// yRelative [0, 1]  -> yStart + yRelative * height
const drawArea = { xStart: 0, yStart: 0, width: 0, height: 0 };
let lastFrameTimestamp = null;
let fps = 0;
const FPS_SMOOTHING = 0.9;

// Initialize waveState (y position, phase)
function initializeWaveStates() {
    waveStates.length = 0; // Clear existing waveStates

    for (let i = 0; i < NUM_LINES; i++) {
        waveStates.push({
            yRelative: (i + 1) / (NUM_LINES + 1),
            phase: Math.random() * Math.PI * 2
        });
    }
}

// Set canvas size
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateCanvasColors();
    updateDrawArea();
}
resize();
initializeWaveStates();
window.addEventListener('resize', resize);

function updateDrawArea() {
    drawArea.width = canvas.width * DRAW_AREA_WIDTH_RATIO;
    drawArea.height = canvas.height * DRAW_AREA_HEIGHT_RATIO;
    drawArea.xStart = (canvas.width - drawArea.width) / 2;
    drawArea.yStart = (canvas.height - drawArea.height) / 2;
}

function generateWavePoints(waveState, centerY) {
    const points = [];
    const width = drawArea.width;
    const startX = drawArea.xStart;

    for (let i = 0; i <= NUM_POINTS; i++) {
        const x = startX + width / 2 + ( (i / NUM_POINTS - 0.5) * 2 ) * width / 2;
        const xRelative = (i / NUM_POINTS - 0.5) * 2;  // range [-1, 1]
        
        // Create the distinctive pulsar wave shape with bell curve
        const envelope = Math.exp(-xRelative * xRelative * ENVELOPE_BELL_INV_VARIANCE) * ENVELOPE_AMPLITUDE;
        
        // // Add multiple frequency components for complexity
        // const wave1 = Math.sin((xRelative * WAVE_FREQUENCIES.wave1 + time.value * TIME_MULTIPLIERS.wave1 + waveState.phase) * WAVE_PHASE_MULTIPLIERS.wave1) * WAVE_AMPLITUDES.wave1;
        // const wave2 = Math.sin((xRelative * WAVE_FREQUENCIES.wave2 + time.value * TIME_MULTIPLIERS.wave2 + waveState.phase * 1.5) * WAVE_PHASE_MULTIPLIERS.wave2) * WAVE_AMPLITUDES.wave2;
        // const wave3 = Math.sin((xRelative * WAVE_FREQUENCIES.wave3 + time.value * TIME_MULTIPLIERS.wave3 + waveState.phase * 2) * WAVE_PHASE_MULTIPLIERS.wave3) * WAVE_AMPLITUDES.wave3;
        
        // // High frequency noise components for texture
        // const noise1 = Math.sin((xRelative * WAVE_FREQUENCIES.noise1 + time.value * TIME_MULTIPLIERS.noise1 + waveState.phase * 3) * WAVE_PHASE_MULTIPLIERS.noise1) * WAVE_AMPLITUDES.noise1;
        // const noise2 = Math.sin((xRelative * WAVE_FREQUENCIES.noise2 + time.value * TIME_MULTIPLIERS.noise2 + waveState.phase * 4) * WAVE_PHASE_MULTIPLIERS.noise2) * WAVE_AMPLITUDES.noise2;
        // const noise3 = Math.sin((xRelative * WAVE_FREQUENCIES.noise3 + time.value * TIME_MULTIPLIERS.noise3 + waveState.phase * 5) * WAVE_PHASE_MULTIPLIERS.noise3) * WAVE_AMPLITUDES.noise3;
        // const noise4 = Math.sin((xRelative * WAVE_FREQUENCIES.noise4 + time.value * TIME_MULTIPLIERS.noise4 + waveState.phase * 6) * WAVE_PHASE_MULTIPLIERS.noise4) * WAVE_AMPLITUDES.noise4;
        
        // const amplitude = envelope * (1 + wave1 + wave2 + wave3 + noise1 + noise2 + noise3 + noise4);
        
        // offset modulation by waveState for that classic look
        const waveModulation = Math.sin(waveState.phase + xRelative * WAVE_MODULATION_FREQ + time.value * TIME_MULTIPLIERS.waveModulation) * WAVE_MODULATION_RANGE + WAVE_MODULATION_FLOOR;
        
        const y = drawArea.yStart + waveState.yRelative * drawArea.height - envelope * waveModulation * drawArea.height;
        points.push({ x, y: y });
    }
    
    return points;
}

function draw(timestamp) {
    if (lastFrameTimestamp !== null) {
        const deltaSeconds = (timestamp - lastFrameTimestamp) / 1000;
        const currentFps = deltaSeconds > 0 ? 1 / deltaSeconds : 0;
        fps = fps * FPS_SMOOTHING + currentFps * (1 - FPS_SMOOTHING);
        time.value += TIME_SPEED_PER_SECOND * deltaSeconds;
    } else {
        time.value += TIME_SPEED_PER_SECOND * (1 / 60);
    }
    lastFrameTimestamp = timestamp;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = LINE_WIDTH;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    waveStates.forEach(waveState => {
        const centerY = drawArea.yStart + waveState.yRelative * drawArea.height;
        const points = generateWavePoints(waveState, centerY);
        
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        
        ctx.stroke();
    });
    
    ctx.fillStyle = strokeColor;
    ctx.font = '16px monospace';
    ctx.fillText(`${fps.toFixed(1)} fps`, 12, 24);

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

