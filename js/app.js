import data from "../data/data.json" assert { type: "json" };

const bindData = () => {
  const navBarList = document.getElementById("nav-bar-list");
  const sections = document.getElementById("sections-list");

  const virtualNavBar = document.createDocumentFragment();
  const virtualSections = document.createDocumentFragment();

  data.forEach((element) => {
    addNavBarItem(navBarList, element);
    addSectionItem(sections, element)
  });

  navBarList.children[0].className = 'active';
  //navBarList = virtualNavBar;
  //sections = virtualSections;
};

const addNavBarItem = (navBarList, element) => {
  const navBarItem = document.createElement("li");
  const navBarLink = document.createElement("a");
  
  navBarLink.innerHTML = element["header"];
  navBarItem.appendChild(navBarLink);
  navBarList.appendChild(navBarItem);
};

const addSectionItem = (sections, element) => {
    const paragrahic = document.createElement("p");

    paragrahic.innerText = element["text"];
    paragrahic.className = 'card';
    sections.appendChild(paragrahic);
};

bindData();
