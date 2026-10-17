console.log('IT\u2019S ALIVE!');

function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

const pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'contact/', title: 'Contact' },
    { url: 'resume/', title: 'Resume' },
    { url: 'https://github.com/miatrn20', title: 'GitHub' },
];

const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const BASE_PATH = isLocal ? '/' : '/dsc_106_portfolio/';

const nav = document.createElement('nav');
nav.setAttribute('aria-label', 'Primary navigation');
document.body.prepend(nav);

for (const page of pages) {
    const url = page.url.startsWith('http') ? page.url : BASE_PATH + page.url;
    const link = document.createElement('a');

    link.href = url;
    link.textContent = page.title;

    const isCurrent = link.host === location.host && link.pathname === location.pathname;
    link.classList.toggle('current', isCurrent);
    if (isCurrent) {
        link.setAttribute('aria-current', 'page');
    }

    if (link.host !== location.host) {
        link.target = '_blank';
        link.rel = 'noopener';
    }

    nav.append(link);
}

document.body.insertAdjacentHTML(
    'afterbegin',
    `<label class="color-scheme">
        Theme:
        <select aria-label="Choose color scheme">
            <option value="light dark">Automatic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
        </select>
    </label>`,
);

const select = document.querySelector('.color-scheme select');

function setColorScheme(colorScheme) {
    document.documentElement.style.setProperty('color-scheme', colorScheme);
    select.value = colorScheme;
}

if ('colorScheme' in localStorage) {
    setColorScheme(localStorage.colorScheme);
}

select.addEventListener('input', (event) => {
    const colorScheme = event.target.value;
    setColorScheme(colorScheme);
    localStorage.colorScheme = colorScheme;
});

const form = document.querySelector('form');

form?.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const parameters = [];

    for (const [name, value] of data) {
        parameters.push(`${name}=${encodeURIComponent(value)}`);
    }

    location.href = `${form.action}?${parameters.join('&')}`;
});
