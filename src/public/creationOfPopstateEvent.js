window.addEventListener('popstate', async function() {
    const mainTag = document.querySelector('.tag_text_name_russian');
    if (mainTag) {
        mainTag.remove();
    }

    currentState.hasMore = true;

    if (!history.state) {
        return await reloadQuests();
    }

    questsList.textContent = '';
    currentState.offset = 0;

    const { engName, ruName } = history.state;
    createMainTag({ruName});

    await getNextAdventureByTag({engName});

});
