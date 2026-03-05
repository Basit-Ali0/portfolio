// ══════════════════════════════════════
// CONTRIBUTION GRAPH (decorative)
// ══════════════════════════════════════
const lvls = [0, 0, 1, 1, 2, 0, 1, 2, 3, 2, 1, 0, 1, 3, 4, 3, 2, 1, 0, 1, 2, 3, 4, 3, 2, 1, 2, 3, 2, 1, 0, 1, 2, 3, 2, 3, 4, 3, 2, 1, 0, 1, 2, 1, 0, 1, 2, 3, 2, 1, 0, 1, 2, 3, 4, 2, 1, 0, 2, 3, 4, 2, 1, 3, 2, 0, 1, 2, 3];
const cg = document.getElementById('cgraph');
let li = 0;
for (let c = 0; c < 52; c++) {
    const col = document.createElement('div'); col.className = 'cg-col';
    for (let r = 0; r < 7; r++) {
        const cell = document.createElement('div');
        const lv = lvls[li % lvls.length];
        cell.className = 'cg-cell' + (lv > 0 ? ` l${lv}` : '');
        col.appendChild(cell); li++;
    }
    cg.appendChild(col);
}

// ══════════════════════════════════════
// GITHUB LIVE API — Basit-Ali0
// ══════════════════════════════════════
const GH_USER = 'Basit-Ali0';
const LANG_COLORS = {
    'TypeScript': '#3178C6', 'JavaScript': '#F7DF1E', 'Python': '#3776AB',
    'HTML': '#E34C26', 'CSS': '#563D7C', 'C': '#555555',
    'C++': '#00599C', 'Svelte': '#FF3E00', 'Shell': '#89E051',
    'Dockerfile': '#384D54', 'Vue': '#42B883', 'Go': '#00ADD8',
    'Rust': '#DEA584', 'Java': '#B07219', 'default': '#8b8b8b',
};

function langColor(name) {
    return LANG_COLORS[name] || LANG_COLORS.default;
}

// Skeleton shimmer while loading
function setGhSkeleton() {
    document.querySelectorAll('.gh-num').forEach(el => {
        el.innerHTML = '<span style="display:inline-block;width:48px;height:22px;background:var(--border);border-radius:6px;animation:shimmer 1.2s infinite"></span>';
    });
}

async function fetchGitHub() {
    setGhSkeleton();
    try {
        // 1. Fetch user profile
        const userRes = await fetch(`https://api.github.com/users/${GH_USER}`);
        const user = await userRes.json();

        // 2. Fetch ALL repos (paginated, up to 3 pages = 300 repos)
        let allRepos = [];
        for (let page = 1; page <= 3; page++) {
            const r = await fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&page=${page}`);
            const d = await r.json();
            if (!Array.isArray(d) || d.length === 0) break;
            allRepos = allRepos.concat(d);
            if (d.length < 100) break;
        }

        // 3. Compute stats
        const totalStars = allRepos.reduce((sum, r) => sum + r.stargazers_count, 0);
        const totalForks = allRepos.reduce((sum, r) => sum + r.forks_count, 0);
        const publicRepos = user.public_repos;

        // 4. Update stat cards
        const nums = document.querySelectorAll('.gh-num');
        function countUp(el, target) {
            let v = 0;
            const step = Math.max(1, Math.floor(target / 40));
            const t = setInterval(() => {
                v = Math.min(v + step, target);
                el.textContent = v.toLocaleString();
                if (v >= target) clearInterval(t);
            }, 30);
        }
        if (nums[0]) countUp(nums[0], publicRepos);
        if (nums[1]) countUp(nums[1], user.followers);
        if (nums[2]) countUp(nums[2], totalStars);
        if (nums[3]) countUp(nums[3], totalForks);

        // Update labels to match
        const lbls = document.querySelectorAll('.gh-lbl');
        if (lbls[1]) lbls[1].textContent = 'Followers';
        if (lbls[3]) lbls[3].textContent = 'Forks';

        // 5. Aggregate top languages across all repos
        const langMap = {};
        const langFetches = allRepos
            .filter(r => !r.fork)
            .slice(0, 30)
            .map(r => fetch(r.languages_url)
                .then(res => res.json())
                .then(data => {
                    Object.entries(data).forEach(([lang, bytes]) => {
                        langMap[lang] = (langMap[lang] || 0) + bytes;
                    });
                })
                .catch(() => { })
            );
        await Promise.all(langFetches);

        // Sort and take top 5
        const sorted = Object.entries(langMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        const totalBytes = sorted.reduce((s, [, b]) => s + b, 0);

        // Render language bars
        const lb = document.getElementById('lbars');
        lb.innerHTML = '<div class="sglabel" style="margin-bottom:12px">Top Languages</div>';
        sorted.forEach(([name, bytes]) => {
            const pct = Math.round(bytes / totalBytes * 100);
            lb.innerHTML += `<div class="lb-row">
        <span class="lb-name">${name}</span>
        <div class="lb-track"><div class="lb-fill" style="width:0%;background:${langColor(name)}" data-p="${pct}"></div></div>
        <span class="lb-pct">${pct}%</span>
      </div>`;
        });

        // Animate bars if section already visible
        setTimeout(() => {
            document.querySelectorAll('.lb-fill').forEach(el => { el.style.width = el.dataset.p + '%'; });
        }, 400);

    } catch (err) {
        console.warn('GitHub API error, using fallback:', err);
        document.querySelectorAll('.gh-num').forEach((el, i) => {
            el.textContent = ['—', '—', '—', '—'][i];
        });
        const lb = document.getElementById('lbars');
        lb.innerHTML = '<div class="sglabel" style="margin-bottom:12px;color:#e44">Could not load — check network</div>';
    }
}

fetchGitHub();
