// ══════════════════════════════════════
// PROJECT MODALS LOGIC
// ══════════════════════════════════════

const projectsData = {
    tesla: {
        title: "Tesla Landing Page",
        meta: "UI Design & Framer Development · 2025",
        desc: "A conceptual redesign and development of Tesla's landing page, focusing on high-performance motion design, interactive 3D vehicle models, and a darker, more premium aesthetic. Built to push the boundaries of Framer's animation capabilities while maintaining perfect responsiveness across all devices.",
        tags: ["Framer", "UI/UX", "Motion Design", "3D Web"],
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        link: "#"
    },
    grok: {
        title: "Grok Dashboard",
        meta: "Product Design · 2024",
        desc: "An exploration into conceptualizing a dedicated dashboard for xAI's Grok. The focus was on creating a brutally utilitarian yet slick interface that handles high-density data, real-time streaming text, and complex user prompt histories without feeling cluttered.",
        tags: ["Product Design", "Figma", "Design Systems"],
        image: "https://images.unsplash.com/photo-1620825937374-87fc1a620f8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        link: "#"
    },
    notion: {
        title: "Notion Redesign",
        meta: "UX Research & Motion Design · 2024",
        desc: "A comprehensive case study on improving Notion's mobile navigation and workspace hierarchy. This project involved extensive user research, prototyping new fluid swipe gestures, and tightening up the dark mode color palette for better contrast and legibility.",
        tags: ["UX Research", "Prototyping", "Mobile First"],
        image: "https://images.unsplash.com/photo-1555547602-0c9f1acb32f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        link: "#"
    },
    sprrrint: {
        title: "Sprrrint Branding",
        meta: "Brand Identity · 2023",
        desc: "The complete brand identity system for Sprrrint, a fast-paced development agency. This included logo design, establishing a vibrant core color palette, typography selection, and building out a scalable component library for the agency's internal tools.",
        tags: ["Branding", "Illustrator", "Art Direction"],
        image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        link: "#"
    }
};

const projectCards = document.querySelectorAll('.pc');
const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');

const mHeader = document.getElementById('modal-header');
const mTitle = document.getElementById('modal-title');
const mMeta = document.getElementById('modal-meta');
const mDesc = document.getElementById('modal-desc');
const mTags = document.getElementById('modal-tags');
const mLink = document.getElementById('modal-link');

function tagColor(tagName) {
    const map = {
        'Framer': '#a855f7', 'UI/UX': '#3b82f6', 'Product Design': '#3b82f6',
        'UX Research': '#22c55e', 'Branding': '#ec4899', 'Motion Design': '#f59e0b'
    };
    return map[tagName] || '#6366f1';
}

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const id = card.getAttribute('data-project');
        const data = projectsData[id];
        if (!data) return;

        mTitle.textContent = data.title;
        mMeta.textContent = data.meta;
        mDesc.textContent = data.desc;
        mHeader.style.backgroundImage = `url('${data.image}')`;
        mLink.href = data.link;

        mTags.innerHTML = '';
        data.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.style.background = `${tagColor(tag)}20`;
            span.style.color = tagColor(tag);
            span.textContent = tag;
            mTags.appendChild(span);
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});
