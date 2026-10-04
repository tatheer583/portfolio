import { useScene } from '../../context/SceneContext';
import { SITE } from '@/lib/constants';
import { CERTIFICATES } from '@/data/certificates';

/**
 * ScreenReaderOverlay — A7 Accessibility
 * 
 * Invisible HTML layer providing screen reader access to 3D canvas content.
 * Contains buttons/links matching interactive 3D elements (doors, rooms).
 * Visually hidden via .sr-only but fully accessible to assistive tech.
 */
const ScreenReaderOverlay = () => {
    const { hasEntered, isInRoom, currentRoom, teleportTo, requestExit } = useScene();

    return (
        <div className="sr-overlay" role="complementary" aria-label="Accessible navigation for 3D portfolio">
            {/* Skip to content link */}
            <a href="#sr-main-nav" className="sr-only sr-focusable">
                Skip to accessible navigation
            </a>

            {/* Main accessible navigation */}
            <nav id="sr-main-nav" className="sr-only" aria-label="Portfolio rooms">
                <h1>Muhammad Tatheer — Full Stack Developer Portfolio</h1>
                <h2>Portfolio Navigation</h2>

                {!hasEntered && (
                    <p>Welcome to Tatheer’s interactive 3D portfolio. Click or press Enter on the doors to enter.</p>
                )}

                {hasEntered && !isInRoom && (
                    <>
                        <p>You are in the corridor. Choose a room to explore:</p>
                        {CERTIFICATES.length > 0 && <div aria-label="Certificates on the corridor wall">
                            <h3>My certificates</h3>
                            <ul>{CERTIFICATES.map(certificate => <li key={certificate.id}><a href={certificate.url} target="_blank" rel="noopener noreferrer">{certificate.title} — {certificate.issuer}</a></li>)}</ul>
                        </div>}
                        <ul>
                            <li>
                                <button onClick={() => teleportTo('about')} type="button">
                                    About — My story, skills, and journey
                                </button>
                            </li>
                            <li>
                                <button onClick={() => teleportTo('gallery')} type="button">
                                    The Gallery — My projects and work
                                </button>
                            </li>
                            <li>
                                <button onClick={() => teleportTo('contact')} type="button">
                                    Contact — Get in touch with me
                                </button>
                            </li>
                            <li>
                                <button onClick={() => teleportTo('studio')} type="button">
                                    The Studio — Technologies and experience
                                </button>
                            </li>
                            <li>
                                <button onClick={() => window.location.assign('/resume')} type="button">
                                    Resume — My experience, at a glance
                                </button>
                            </li>
                            <li>
                                <button onClick={() => window.location.assign('/projects')} type="button">
                                    All projects — Detailed case studies
                                </button>
                            </li>
                        </ul>
                    </>
                )}

                {hasEntered && isInRoom && (
                    <>
                        <p>
                            You are in the {currentRoom === 'about' ? 'About' :
                                currentRoom === 'gallery' ? 'Gallery' :
                                    currentRoom === 'contact' ? 'Contact' :
                                        currentRoom === 'studio' ? 'Studio' :
                                            currentRoom === 'resume' ? 'Resume' :
                                                currentRoom === 'blog' ? 'Blog' : currentRoom} room.
                        </p>
                        <button onClick={requestExit} type="button">
                            Go back to corridor
                        </button>

                        {/* Room-specific content descriptions */}
                        {currentRoom === 'about' && (
                            <div aria-label="About room content">
                                <h3>About Me</h3>
                                <p>This room contains my personal story, project highlights, journey milestones, and technology skills displayed as interactive balloons.</p>
                            </div>
                        )}
                        {currentRoom === 'gallery' && (
                            <div aria-label="Gallery room content">
                                <h3>My Projects</h3>
                                <a href="/projects">Browse all project case studies</a>
                                <p>Browse through my portfolio projects displayed on paper cards. Click on a project card to see details and visit the live site.</p>
                            </div>
                        )}
                        {currentRoom === 'contact' && (
                            <div aria-label="Contact room content">
                                <h3>Contact Me</h3>
                                <a href={'mailto:' + SITE.email}>{SITE.email}</a>
                                <a href={SITE.githubUrl}>GitHub</a>
                                <a href={SITE.linkedinUrl}>LinkedIn</a>
                                <p>Find my social media links displayed as floating barrels. Click to visit my profiles on LinkedIn, GitHub, and other platforms.</p>
                            </div>
                        )}
                        {currentRoom === 'studio' && (
                            <div aria-label="Studio room content">
                                <h3>The Studio</h3>
                                <p>Explore my experience and skills on rotating monitors. Click a monitor to read detailed information about my work.</p>
                            </div>
                        )}
                        {currentRoom === 'resume' && (
                            <div aria-label="Resume room content">
                                <h3>Resume</h3>
                                <p>View my resume and download it as a PDF. Surrounded by logos of companies I’d love to work for one day.</p>
                            </div>
                        )}
                        {currentRoom === 'blog' && (
                            <div aria-label="Blog room content">
                                <h3>Blog</h3>
                                <p>Read short posts about my AI/ML projects and what I’ve learned building them.</p>
                            </div>
                        )}

                        {/* Quick navigation to other rooms */}
                        <h3>Quick Navigation</h3>
                        <ul>
                            {currentRoom !== 'about' && (
                                <li><button onClick={() => teleportTo('about')} type="button">Go to About</button></li>
                            )}
                            {currentRoom !== 'gallery' && (
                                <li><button onClick={() => teleportTo('gallery')} type="button">Go to Gallery</button></li>
                            )}
                            {currentRoom !== 'contact' && (
                                <li><button onClick={() => teleportTo('contact')} type="button">Go to Contact</button></li>
                            )}
                            {currentRoom !== 'studio' && (
                                <li><button onClick={() => teleportTo('studio')} type="button">Go to Studio</button></li>
                            )}
                            {currentRoom !== 'resume' && (
                                <li><button onClick={() => teleportTo('resume')} type="button">Go to Resume</button></li>
                            )}
                            {currentRoom !== 'blog' && (
                                <li><button onClick={() => teleportTo('blog')} type="button">Go to Blog</button></li>
                            )}
                        </ul>
                    </>
                )}
            </nav>

            {/* Live region for state changes */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
                {isInRoom && `Entered ${currentRoom} room`}
            </div>
        </div>
    );
};

export default ScreenReaderOverlay;
