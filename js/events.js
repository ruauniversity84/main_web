(async function () {
    const container = document.getElementById('event-list');
    if (!container) return;

    try {
        const response = await fetch('data/events.json');
        if (!response.ok) throw new Error('events.json could not be loaded');
        const events = await response.json();
        if (!events.length) {
            container.innerHTML = '<p class="event-empty">現在、予定されているイベントはありません。</p>';
            return;
        }

        events.forEach((event) => {
            const card = document.createElement(event.page ? 'a' : 'article');
            card.className = 'event-card';
            if (event.page) card.href = event.page;

            const date = document.createElement('time');
            date.className = 'event-date';
            date.dateTime = event.date || '';
            date.textContent = formatDate(event.date);

            const title = document.createElement('h3');
            title.className = 'event-title';
            title.textContent = event.title || 'イベント';

            const place = document.createElement('p');
            place.className = 'event-place';
            place.textContent = event.place || '未定';

            const arrow = document.createElement('span');
            arrow.className = 'event-arrow';
            arrow.setAttribute('aria-hidden', 'true');
            arrow.textContent = '↗';
            card.append(date, title, place, arrow);
            container.appendChild(card);
        });
    } catch (error) {
        container.innerHTML = '<p class="event-empty">イベントを表示できませんでした。ページをサーバー経由で開いてください。</p>';
        console.warn(error);
    }

    function formatDate(value) {
        if (!value) return 'DATE / —';
        const date = new Date(value + 'T00:00:00');
        if (Number.isNaN(date.getTime())) return value;
        return new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date).replaceAll('/', '.');
    }
})();
