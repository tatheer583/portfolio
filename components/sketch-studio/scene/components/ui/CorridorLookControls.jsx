import { useScene } from '../../context/SceneContext';
import { useEffect, useState } from 'react';
import DeveloperQuoteCard from './DeveloperQuoteCard';

export default function CorridorLookControls() {
    const { hasEntered, isInRoom, isTeleporting } = useScene();
    const [mode, setMode] = useState('manual');
    const [tourState, setTourState] = useState('idle');
    const [tourStep, setTourStep] = useState(null);
    const [speed, setSpeed] = useState(1);
    useEffect(() => {
        const update = event => {
            setTourState(event.detail.state);
            setTourStep(event.detail.step || null);
            if (event.detail.state === 'complete' || event.detail.state === 'stopped') setMode('manual');
        };
        window.addEventListener('portfolio:tour-progress', update);
        return () => window.removeEventListener('portfolio:tour-progress', update);
    }, []);
    if (!hasEntered || isInRoom || isTeleporting) return null;
    const turn = direction => window.dispatchEvent(new CustomEvent('portfolio:look', { detail: { direction } }));
    const startAuto = () => {
        setMode('auto');
        window.dispatchEvent(new CustomEvent('portfolio:tour', { detail: { action: 'start', speed } }));
    };
    const chooseManual = () => {
        setMode('manual');
        setTourState('idle');
        window.dispatchEvent(new CustomEvent('portfolio:tour', { detail: { action: 'stop' } }));
    };
    const togglePause = () => window.dispatchEvent(new CustomEvent('portfolio:tour', { detail: { action: 'pause' } }));
    const changeSpeed = nextSpeed => {
        setSpeed(nextSpeed);
        window.dispatchEvent(new CustomEvent('portfolio:tour', { detail: { action: 'speed', speed: nextSpeed } }));
    };
    return <>
        <nav className="corridor-look" aria-label="Corridor tour and view controls">
            <div className="corridor-tour-switcher" role="group" aria-label="Choose corridor tour mode">
                <button className={mode === 'manual' ? 'is-active' : ''} onClick={chooseManual} aria-pressed={mode === 'manual'}>MANUAL TOUR</button>
                <button className={mode === 'auto' ? 'is-active' : ''} onClick={startAuto} aria-pressed={mode === 'auto'}>AUTO TOUR ↗</button>
            </div>
            {mode === 'auto' ? <div className="corridor-tour-status">
                <strong>{tourStep?.label || 'Starting the tour…'}</strong>
                <span>{tourState === 'paused' ? 'Paused' : tourState === 'complete' ? 'Complete' : 'Camera is moving smoothly'}</span>
                <div className="corridor-tour-actions">
                    <button onClick={togglePause}>{tourState === 'paused' ? 'Resume' : 'Pause'}</button>
                    <button onClick={startAuto}>Replay</button>
                    <button onClick={chooseManual}>Explore manually</button>
                </div>
                <label>Speed <select value={speed} onChange={event => changeSpeed(Number(event.target.value))}><option value="0.7">0.7×</option><option value="1">1×</option><option value="1.35">1.35×</option></select></label>
            </div> : <div className="corridor-manual-help">
                <div>
                    <button onClick={() => turn('left')} aria-label="Look left in the corridor">← Look left</button>
                    <button onClick={() => turn('reset')} aria-label="Face forward in the corridor">Face forward</button>
                    <button onClick={() => turn('right')} aria-label="Look right in the corridor">Look right →</button>
                </div>
                <p>Move the cursor to look · Drag to turn<br />Scroll / W S to walk · ← → to turn · R to center</p>
            </div>}
        </nav>
        <DeveloperQuoteCard />
    </>;
}
