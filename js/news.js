(async function () {
    const list = document.getElementById('news-list');
    if (!list) return;

    try {
        const response = await fetch('data/news.json');
        if (!response.ok) throw new Error('news.json could not be loaded');
        const news = await response.json();
        if (!news.length) {
            list.innerHTML = '<li class="news-empty">現在、お知らせはありません。</li>';
            return;
        }

        news.forEach((item) => {
            const li = document.createElement('li');
            li.className = 'news-item';
            const date = document.createElement('time');
            date.className = 'news-date';
            date.dateTime = item.date || '';
            date.textContent = formatDate(item.date);

            const main = document.createElement(item.link ? 'a' : 'div');
            main.className = 'news-item-main';
            if (item.link) main.href = item.link;

            const title = document.createElement('strong');
            title.className = 'news-title';
            title.textContent = item.title || 'お知らせ';
            if (item.important) {
                const badge = document.createElement('span');
                badge.className = 'news-badge';
                badge.textContent = 'IMPORTANT';
                title.appendChild(badge);
            }

            const description = document.createElement('p');
            description.className = 'news-description';
            description.textContent = item.description || '';
            main.append(title, description);

            const arrow = document.createElement('span');
            arrow.className = 'news-arrow';
            arrow.setAttribute('aria-hidden', 'true');
            arrow.textContent = '↗';
            li.append(date, main, arrow);
            list.appendChild(li);
        });
    } catch (error) {
        list.innerHTML = '<li class="news-error">お知らせを表示できませんでした。ページをサーバー経由で開いてください。</li>';
        console.warn(error);
    }

    function formatDate(value) {
        if (!value) return 'DATE / —';
        const date = new Date(value + 'T00:00:00');
        if (Number.isNaN(date.getTime())) return value;
        return new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date).replaceAll('/', '.');
    }
})();
