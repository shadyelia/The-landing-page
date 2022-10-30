import data from '../data/data.json' assert { type: "json" };


const navBarList = document.getElementById('nav-bar-list');
const sections = document.getElementById('sections-list');

const virtualNavBar = document.createDocumentFragment();
const virtualSections = document.createDocumentFragment();

data.forEach(element => {
    const navBarItem = document.createElement('li');
    navBarItem.innerHTML = element['header'];
    navBarList.appendChild(navBarItem);

    const paragrahic = document.createElement('p');
    paragrahic.innerText = element['text'];
    sections.appendChild(paragrahic);
});

//navBarList = virtualNavBar;
//sections = virtualSections;