import { useEffect, useState } from 'react';
import { DEVELOPER_QUOTES } from '../../data/developerQuotes';
import { useScene } from '../../context/SceneContext';

export default function DeveloperQuoteCard() {
    const { hasEntered, isInRoom, isTeleporting } = useScene();
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(true);
    useEffect(() => {
        if (!hasEntered || isInRoom || isTeleporting) return undefined;
        const timer = window.setInterval(() => setIndex(value => (value + 1) % DEVELOPER_QUOTES.length), 9000);
        return () => window.clearInterval(timer);
    }, [hasEntered, isInRoom, isTeleporting]);
    if (!hasEntered || isInRoom || isTeleporting) return null;
    const item = DEVELOPER_QUOTES[index];
    return <aside className={`corridor-quote ${open ? '' : 'corridor-quote--closed'}`} aria-label="Developer quote">
        <button className="corridor-quote__toggle" onClick={() => setOpen(value => !value)} aria-expanded={open}>
            {open ? 'Hide inspiration ↗' : 'Show inspiration ✦'}
        </button>
        {open && <div key={item.name} className="corridor-quote__body">
            <p className="corridor-quote__eyebrow">DEVELOPER SPOTLIGHT · {index + 1}/{DEVELOPER_QUOTES.length}</p>
            <blockquote>“{item.quote}”</blockquote>
            <p className="corridor-quote__name">{item.name}</p>
            <p className="corridor-quote__role">{item.role}</p>
            <p className="corridor-quote__note">{item.note}</p>
            <div className="corridor-quote__pager" aria-label="Choose a developer quote">
                {DEVELOPER_QUOTES.map((quote, quoteIndex) => <button key={quote.name} className={quoteIndex === index ? 'is-active' : ''} aria-label={`Show ${quote.name} quote`} onClick={() => setIndex(quoteIndex)} />)}
            </div>
        </div>}
    </aside>;
}
