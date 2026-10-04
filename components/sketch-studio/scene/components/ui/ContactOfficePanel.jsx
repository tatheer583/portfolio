import { useEffect, useState } from 'react';
import { SITE } from '@/lib/constants';
import { useScene } from '../../context/SceneContext';
import { useAchievements } from '../../context/AchievementsContext';

export default function ContactOfficePanel() {
    const { currentRoom, isTeleporting, exitRequested } = useScene();
    const { unlockAchievement } = useAchievements();
    const [expanded, setExpanded] = useState(true);
    const [emailDelivery, setEmailDelivery] = useState(false);
    const [busy, setBusy] = useState(false);
    const [notice, setNotice] = useState('');
    const [draft, setDraft] = useState({ name: '', email: '', message: '' });
    useEffect(() => {
        const controller = new AbortController();
        fetch('/api/contact', { signal: controller.signal }).then(r => r.json()).then(data => setEmailDelivery(data.emailDelivery === true)).catch(() => {});
        return () => controller.abort();
    }, []);
    const update = event => setDraft(previous => ({ ...previous, [event.target.name]: event.target.value }));
    const submit = async event => {
        event.preventDefault();
        const channel = event.nativeEvent.submitter?.value || 'whatsapp';
        const body = `Hi Tatheer, I’m ${draft.name}.\n${draft.email ? `Email: ${draft.email}\n` : ''}\n${draft.message}`;
        if (channel === 'whatsapp') {
            const url = new URL(SITE.whatsappUrl);
            url.searchParams.set('text', body);
            window.open(url.toString(), '_blank', 'noopener,noreferrer');
            setNotice('WhatsApp is open. Send your message there.');
            unlockAchievement('contact_choose');
            return;
        }
        if (!emailDelivery) {
            window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${draft.name}`)}&body=${encodeURIComponent(body)}`;
            setNotice('Your email app is open. Send your message there.');
            unlockAchievement('contact_choose');
            return;
        }
        if (!draft.email) {
            setNotice('Add your email address so I can reply.');
            return;
        }
        setBusy(true); setNotice('Sending your message…');
        try {
            const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...draft, subject: 'collab', company: '' }) });
            const result = await response.json();
            if (!response.ok || !result.success) throw new Error('delivery');
            setNotice('Your message has been sent. Thank you!');
            unlockAchievement('contact_choose');
            setDraft({ name: '', email: '', message: '' });
        } catch {
            setNotice('Email delivery failed. Your draft is saved here; send it with WhatsApp or use the email link below.');
        } finally { setBusy(false); }
    };
    if (currentRoom !== 'contact' || isTeleporting || exitRequested) return null;
    return <aside className={`office-contact ${expanded ? '' : 'office-contact--closed'}`} aria-label="Contact Tatheer">
        <button className="office-contact__toggle" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls="office-contact-form">{expanded ? 'Hide desk note ↘' : 'Write me a message ↗'}</button>
        {expanded && <div id="office-contact-form">
            <p className="office-contact__eyebrow">LET’S MAKE SOMETHING</p>
            <h2>Take a seat. Say hello.</h2>
            <p>Have a project, a role, or an idea? Leave me a note.</p>
            <form onSubmit={submit}>
                <label htmlFor="office-name">Your name</label>
                <input id="office-name" name="name" value={draft.name} onChange={update} required minLength={2} maxLength={100} autoComplete="name" placeholder="Your name" />
                <label htmlFor="office-email">Your email <span>(optional for WhatsApp)</span></label>
                <input id="office-email" name="email" type="email" value={draft.email} onChange={update} autoComplete="email" placeholder="you@example.com" />
                <label htmlFor="office-message">Your message</label>
                <textarea id="office-message" name="message" value={draft.message} onChange={update} required minLength={10} maxLength={5000} rows={3} placeholder="Tell me what you have in mind…" />
                <div className="office-contact__actions">
                    <button type="submit" value="whatsapp" disabled={busy}>Send on WhatsApp ↗</button>
                    <button type="submit" value="email" disabled={busy}>{busy ? 'Sending…' : emailDelivery ? 'Send email ↗' : 'Compose email ↗'}</button>
                </div>
                <p className="office-contact__status" role="status">{notice}</p>
            </form>
            <div className="office-contact__links">
                <a href={SITE.whatsappUrl} onClick={() => unlockAchievement('contact_choose')} target="_blank" rel="noopener noreferrer">WhatsApp · 0344 8901377</a>
                <a href={`mailto:${SITE.email}`} onClick={() => unlockAchievement('contact_choose')}>{SITE.email}</a>
                <div><a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={SITE.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div>
            </div>
        </div>}
    </aside>;
}
