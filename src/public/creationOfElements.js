function createQuest(quest) {
    const root = document.createElement('li');
    root.classList.add('quest_item');

    const questImageLink = document.createElement('a');
    questImageLink.setAttribute('href', `/scene/${quest.sceneId}`);

    const image = document.createElement('img');
    image.classList.add('quest_image');
    image.setAttribute('src', quest.img || `${staticBasePath}default-picture.png`);
    image.setAttribute('alt', quest.name);

    questImageLink.appendChild(image);

    root.appendChild(questImageLink);

    const questInformation = document.createElement('div');
    questInformation.classList.add('quest_information');

    const name = document.createElement('a');
    name.classList.add('quest_name');
    name.setAttribute('href', `/scene/${quest.sceneId}`);
    name.innerText = quest.name;

    const description = document.createElement('p');
    description.classList.add('quest_description');
    description.innerText = quest.description;

    questInformation.appendChild(name);
    questInformation.appendChild(description);

    const tags = document.createElement('ul');
    tags.classList.add('quest_tags');

    for (const tag of quest.tags) {
        tags.appendChild(createTag(tag));
    }

    questInformation.appendChild(tags);

    root.appendChild(questInformation);

    return root;
}

function createTag(tag) {
    const root = document.createElement('li');
    root.classList.add('quest_tag_item');

    const tagLink = document.createElement('a');
    tagLink.classList.add('quest_tag');
    tagLink.setAttribute('href', `/adventures/${tag.engName}`);
    tagLink.innerText = `#${tag.ruName}`;

    root.appendChild(tagLink);

    addOnclickEvent(tagLink, tag);

    return root;
}

function createMainTag(tag) {
    const root = document.createElement('p');
    root.classList.add('tag_text_name_russian');
    root.innerText = `#${tag.ruName}`;

    document.querySelector('main').prepend(root);
}
