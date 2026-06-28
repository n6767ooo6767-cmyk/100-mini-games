const list = document.getElementById('game-list');
const searchInput = document.getElementById('search');

// Генерируем 50 игр
for (let i = 1; i <= 50; i++) {
    const gameName = `Игра ${i}`;
    let btn = document.createElement('button');
    btn.className = 'neon-btn';
    btn.innerHTML = `${gameName}<br><span onclick="toggleFav(event, ${i})">⭐</span>`;
    btn.onclick = () => alert("Запуск " + gameName);
    list.appendChild(btn);
}

// Поиск
searchInput.oninput = function() {
    let filter = this.value.toUpperCase();
    let buttons = list.getElementsByTagName('button');
    for (let btn of buttons) {
        btn.style.display = btn.innerText.toUpperCase().indexOf(filter) > -1 ? "" : "none";
    }
};

// Фавориты (сохранение в браузер)
function toggleFav(e, id) {
    e.stopPropagation();
    let favs = JSON.parse(localStorage.getItem('favs') || '[]');
    if (favs.includes(id)) favs = favs.filter(f => f !== id);
    else favs.push(id);
    localStorage.setItem('favs', JSON.stringify(favs));
    alert("Игра " + id + " добавлена в избранное!");
}
