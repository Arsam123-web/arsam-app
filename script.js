let apps = JSON.parse(localStorage.getItem('apps')) || [];

function renderApps() {
    const grid = document.getElementById('apps-grid');
    grid.innerHTML = '';

    if (apps.length === 0) {
        grid.innerHTML = `<p style="text-align:center; grid-column:1/-1; padding:50px; color:#888;">هنوز اپلیکیشن آپلود نشده است.</p>`;
        return;
    }

    apps.forEach((app, index) => {
        const card = document.createElement('div');
        card.className = 'app-card';
        card.innerHTML = `
            <div style="position: relative;">
                <button onclick="deleteApp(${index}); event.stopImmediatePropagation();" 
                        style="position: absolute; top: 12px; left: 12px; background: #ff4444; color: white; border: none; border-radius: 50%; width: 35px; height: 35px; cursor: pointer; font-size: 18px; z-index: 10;">
                    🗑️
                </button>
                <h3>${app.name}</h3>
                <p>${app.desc}</p>
                <small>نسخه: ${app.version || '1.0'}</small>
            </div>
        `;
        card.onclick = (e) => {
            if (!e.target.closest('button')) showModal(index);
        };
        grid.appendChild(card);
    });
}

function uploadApp() {
    const name = document.getElementById('app-name').value.trim();
    const desc = document.getElementById('app-desc').value.trim();
    const link = document.getElementById('app-link').value.trim();
    const version = document.getElementById('app-version').value.trim() || '1.0';

    if (!name || !desc || !link) {
        alert('لطفاً نام، توضیح و لینک دانلود را وارد کنید!');
        return;
    }

    apps.unshift({ name, desc, link, version }); // جدیدترین در بالا
    localStorage.setItem('apps', JSON.stringify(apps));

    // پاک کردن ورودی‌ها
    document.getElementById('app-name').value = '';
    document.getElementById('app-desc').value = '';
    document.getElementById('app-link').value = '';
    document.getElementById('app-version').value = '';

    renderApps();
    alert('✅ اپلیکیشن با موفقیت اضافه شد!');
}

function deleteApp(index) {
    if (confirm(`آیا مطمئن هستید که می‌خواهید اپلیکیشن "${apps[index].name}" را کاملاً حذف کنید؟`)) {
        apps.splice(index, 1);
        localStorage.setItem('apps', JSON.stringify(apps));
        renderApps();
        alert('🗑️ اپلیکیشن با موفقیت حذف شد.');
    }
}

function showModal(index) {
    const app = apps[index];
    document.getElementById('modal-title').textContent = app.name;
    document.getElementById('modal-desc').textContent = app.desc;
    document.getElementById('modal-version').textContent = 'نسخه: ' + (app.version || '1.0');
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

// لود اولیه
renderApps();