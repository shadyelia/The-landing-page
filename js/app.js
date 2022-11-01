import data from "../data/data.json" assert { type: "json" };

const bindData = () => {
  const navBarList = document.getElementById("nav-bar-list");
  const sections = document.getElementById("sections-list");

  const virtualNavBar = document.createDocumentFragment();
  const virtualSections = document.createDocumentFragment();

  data.forEach((element) => {
    addNavBarItem(navBarList, element);
    addSectionItem(sections, element);
  });

  //navBarList = virtualNavBar;
  //sections = virtualSections;
};

const addNavBarItem = (navBarList, element) => {
  const navBarItem = document.createElement("li");
  const navBarLink = document.createElement("a");

  navBarLink.innerHTML = element["header"];
  navBarItem.appendChild(navBarLink);
  navBarItem.id = "navBarItem" + element["Id"];
  navBarItem.addEventListener("click", scrollToSection);
  navBarList.appendChild(navBarItem);
};

const addSectionItem = (sections, element) => {
  const paragrahic = document.createElement("p");

  paragrahic.innerText = element["text"];
  paragrahic.className = "card";
  paragrahic.id = "section" + element["Id"];
  sections.appendChild(paragrahic);
};

const scrollToSection = (evt) => {
  let element = evt.target;
  if (element != null) {
    if (element.nodeName === "A") element = element.parentNode;
    const id = element.id;
    const sectionNumber = +id[id.length - 1];
    const section = document.getElementById("section" + sectionNumber);
    section.scrollIntoView();
  }
};

const addTopButtonFunctionality = () => {
  let topButton = document.getElementById("topButton");
  topButton.addEventListener("click", scrollToTop);
};

const scrollToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

const scrollFunction = () => {
  showTopButton();
  changeActiveNavItem();
};

const showTopButton = () => {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
};

const changeActiveNavItem = () => {
  const scrollY = window.pageYOffset;
  const sectionsList = document.getElementById("sections-list");
  if (sectionsList != null) {
    const sections = sectionsList.children;
    for (var i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const id = section.getAttribute("id");
      const sectionNumber = +id[id.length - 1];

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .getElementById("navBarItem" + sectionNumber)
          .children[0].classList.add("active");
      } else {
        document
          .getElementById("navBarItem" + sectionNumber)
          .children[0].classList.remove("active");
      }
    }
  }
};

bindData();
addTopButtonFunctionality();
window.onscroll = function () {
  scrollFunction();
};
