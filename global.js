
console.log("IT'S ALIVE!");

// Step 1: Helper function
function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

// Step 3: Navigation menu

// Change this if your GitHub Pages repository has a different name
const BASE_PATH =
    (location.hostname === "localhost" ||
     location.hostname === "127.0.0.1")
        ? "/"
        : "/dsc_106_portfolio/";

// Pages on your website
let pages = [
    { url: "", title: "Home" },
    { url: "projects/", title: "Projects" },
    { url: "contact/", title: "Contact" },
    { url: "resume/", title: "Resume" },
    {
        url: "https://github.com/miatrn20",
        title: "GitHub"
    }
];

// Create the navigation element
let nav = document.createElement("nav");
document.body.prepend(nav);

// Create a link for every page
for (let p of pages) {
    let url = p.url;
    let title = p.title;

    // Adjust links for local server or GitHub Pages
    if (!url.startsWith("http")) {
        url = BASE_PATH + url;
    }

    // Create the link
    let a = document.createElement("a");
    a.href = url;
    a.textContent = title;

    // Highlight the current page
    if (
        a.host === location.host &&
        a.pathname === location.pathname
    ) {
        a.classList.add("current");
        a.setAttribute("aria-current", "page");
    }

    // Open external links in a new tab
    if (a.host !== location.host) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
    }

    // Add the link to the navigation menu
    nav.append(a);
}

// Step 4: Dark mode switcher

// Create the theme dropdown
document.body.insertAdjacentHTML(
    "afterbegin",
    `<label class="color-scheme">
        Theme:
        <select>
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


export async function fetchJSON(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
  }
}


export function renderProjects(projects, containerElement, headingLevel = 'h2') {  containerElement.innerHTML = '';
  for (const project of projects) {
    const article = document.createElement('article');

    article.innerHTML = `
      <${headingLevel}>${project.title}</${headingLevel}>
      <img src="${new URL(project.image.replace(/^\.\.\//, ''), new URL('./', import.meta.url)).href}" alt="${project.title}">
      <p>${project.description}</p>
    `;

    containerElement.append(article);
  }
  
}

export async function fetchGitHubData(username) {
    const url = `https://api.github.com/users/${username}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`GitHub API request failed: ${response.status}`);
    }

    const data = await response.json();

    return data;
}
