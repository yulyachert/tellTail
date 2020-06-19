async function getNextAdventureByTag(tag) {
    fetch(`/api/adventuresByTag?limit=${currentState.limit}&offset=${currentState.offset}&tag=${tag.engName}`)
        .then((response) => {
            const questsByTagsJson = response.json();
            return questsByTagsJson;
        })
        .then((questsByTagsJson) => {
            if (questsByTagsJson.length < currentState.limit) {
                currentState.hasMore = false;
            } else {
                currentState.offset += 5;
            }

            for (const quest of questsByTagsJson) {
                questsList.appendChild(createQuest(quest));
            }

            lastTitle = getLastTitle();
            scrollObserver.observe(lastTitle);
        })
        .catch(() => {
            alert('Не удалось загрузить приключения');
        });
}
