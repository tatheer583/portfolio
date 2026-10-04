import { PROJECTS } from '@/data/projects';

export const PLATFORM_CONFIG = {
    youtube: { color: '#caa250', accentColor: '#947530', icon: '◈', label: 'Web products', shape: 'tv' },
    blog: { color: '#84a7a3', accentColor: '#587f79', icon: '⚙', label: 'AI & systems', shape: 'monitor' },
    tiktok: { color: '#af99bd', accentColor: '#806d8d', icon: '↗', label: 'Experiments', shape: 'phone' },
};

export const CONTENT_DATA = PROJECTS.map((project, index) => {
    const platform = ['youtube', 'blog', 'tiktok'][index % 3];
    const device = { youtube: 'tv', blog: 'monitor', tiktok: 'phone' }[platform];
    return {
        id: project.id,
        platform,
        title: project.title,
        description: project.longDescription,
        thumbnail: project.image,
        url: `/projects/${project.slug}`,
        date: project.categoryLabel,
        duration: project.tech.slice(0, 2).join(' · '),
        readTime: project.tech.slice(0, 2).join(' · '),
        frontTexture: `/reference/textures/studio/${device}_front.webp`,
        paintedFrontTexture: `/reference/textures/studio/${device}_front_painted.webp`,
    };
});

export const getContentByPlatform = platform => platform === 'all' ? CONTENT_DATA : CONTENT_DATA.filter(item => item.platform === platform);
export const getLatestContent = () => CONTENT_DATA[0];
