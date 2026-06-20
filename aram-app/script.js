let apps = JSON.parse(localStorage.getItem('apps')) || [];

function renderApps() {
    const grid = document.getElementById('apps-grid');
    grid.innerHTML = '';

    apps.forEach((app, index) => {
        const card = document.createElement('div');
        card.className = 'app-card';
        card.innerHTML = `<h3>${app.name}</h3><p>${app.desc}</p>`;
        card.onclick = () => showModal(index);
        grid.appendChild(card);
    });
}

function uploadApp() {
    const name = document.getElementById('app-name').value.trim();
    const desc = document.getElementById('app-desc').value.trim();
    const link = document.getElementById('app-link').value.trim();

    if (!name || !desc || !link) {
        alert('لطفاً همه فیلدها را پر کنید!');
        return;
    }

    apps.push({ name, desc, link });
    localStorage.setItem('apps', JSON.stringify(apps));

    document.getElementById('app-name').value = '';
    document.getElementById('app-desc').value = '';
    document.getElementById('app-link').value = '';

    renderApps();
    alert('اپلیکیشن با موفقیت آپلود شد!');
}

function showModal(index) {
    const app = apps[index];
    document.getElementById('modal-title').textContent = app.name;
    document.getElementById('modal-desc').textContent = app.desc;
    document.getElementById('modal-link').href = app.link;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function searchApps() {
    const term = document.getElementById('search').value.toLowerCase();
    const cards = document.querySelectorAll('.app-card');
    cards.forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(term) ? 'block' : 'none';
    });
}

renderApps();