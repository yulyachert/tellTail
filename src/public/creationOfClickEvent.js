function addOnclickEvent(tagsLink, tag) {
    tagsLink.addEventListener('click', async function(event) {
        event.preventDefault();

        questsList.textContent = '';

        const engName = tag.engName;
        const ruName = tag.ruName;

        const mainTag = document.querySelector('.tag_text_name_russian');
        if (mainTag) {
            mainTag.remove();
        }

        createMainTag(tag);
        await getNextAdventureByTag(tag);

        currentState.offset = 0;

        history.pushState(history.state,'', window.location.href);
        history.replaceState({engName, ruName}, '', tagsLink);
    });
}
