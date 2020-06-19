let questsList = document.querySelector('.quests');

const tags = document.querySelectorAll('.quest_tag');
for (let tag of tags) {
    let engName = tag.getAttribute('href');
    engName = engName.slice(engName.lastIndexOf('/') + 1);
    addOnclickEvent(tag, {engName,ruName: tag.textContent.slice(1)});
}

async function getNewQuests() {
    fetch(`/api/adventures?limit=${currentState.limit}&offset=${currentState.offset}`)
        .then((response) => {
            const questsJson = response.json();
            return questsJson;
        })
        .then((questsJson) => {
            if (questsJson.length < currentState.limit) {
                currentState.hasMore = false;
            } else {
                currentState.offset += 5;
            }

            for (const quest of questsJson) {
                questsList.appendChild(createQuest(quest));
            }

            lastTitle = getLastTitle();
            scrollObserver.observe(lastTitle);
        })
        .catch(() => {
            alert('Не удалось загрузить приключения');
        });
}

function getLastTitle () {
    return document.querySelector('.quests .quest_item:last-child .quest_name');
}

let lastTitle;

try {
    lastTitle = getLastTitle();
} catch (e) {
    alert('Не удалось загрузить приключения');
}

const scrollObserver = new IntersectionObserver(async entries => {
    if (currentState.hasMore && entries[0].isIntersecting) {
        await handleScroll();
    }
}, {
    threshold: 1
});

scrollObserver.observe(lastTitle);

async function handleScroll() {
    scrollObserver.unobserve(lastTitle);

    await getNewQuests();
}

let currentState = {
    limit: 5,
    offset: 5,
    hasMore: true
};

let staticBasePath;

fetch('/api/staticBasePath')
    .then((response) =>
    {
        return response.json();
    })
    .then((response) => {
       staticBasePath = response.staticBasePath;
    });

async function reloadQuests() {
    currentState.offset = 0;
    questsList.textContent = '';

    await getNewQuests();
}
