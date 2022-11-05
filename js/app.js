import data from "../data/data.json" assert { type: "json" };

const bindData = () => {
  const navBarList = document.getElementById("navbar__list");
  const sections = document.getElementById("sections-list");
  data.forEach((element) => {
    addNavBarItem(navBarList, element);
    addSectionItem(sections, element);
  });

  addNavMenuItem(navBarList);
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
  const sectionIem = document.createElement("section");
  const divItem = document.createElement("div");
  const headerItem = document.createElement("h2");
  const paragrahic = document.createElement("p");

  headerItem.innerText = element["header"];
  paragrahic.innerText = element["text"];

  sectionIem.id = "section" + element["Id"];
  divItem.className = "landing__container";

  sectionIem.appendChild(divItem);
  divItem.appendChild(headerItem);
  divItem.appendChild(paragrahic);
  sections.appendChild(sectionIem);
};

const addNavMenuItem = (navBarList) => {
  const navBarItem = document.createElement("li");
  const navBarLink = document.createElement("a");

  navBarLink.className = "icon";
  navBarLink.innerHTML = "&#9776;";
  navBarItem.appendChild(navBarLink);
  navBarItem.addEventListener("click", openMenu);
  navBarList.appendChild(navBarItem);
};

const openMenu = () => {
  let navList = document.getElementById("navbar__list");
  if (navList.className === "") {
    navList.className += "responsive";
  } else {
    navList.className = "";
  }
};

const scrollToSection = (evt) => {
  let element = evt.target;
  if (element != null) {
    if (element.nodeName === "A") element = element.parentNode;
    const id = element.id;
    const sectionNumber = +id[id.length - 1];
    const section = document.getElementById("section" + sectionNumber);
    section.scrollIntoView();
    
    let navList = document.getElementById("navbar__list");
    if (navList.className === "") {
      navList.className += "responsive";
    } else {
      navList.className = "";
    }
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
  let body = document.body;
  let html = document.documentElement;

  let maxHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  if (
    document.body.scrollTop > maxHeight * 0.5 ||
    document.documentElement.scrollTop > maxHeight * 0.5
  ) {
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
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const id = section.getAttribute("id");
      const sectionNumber = +id[id.length - 1];

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .getElementById("navBarItem" + sectionNumber)
          .classList.add("active");
        document
          .getElementById("section" + sectionNumber)
          .classList.add("your-active-class");
      } else {
        document
          .getElementById("navBarItem" + sectionNumber)
          .classList.remove("active");
        document
          .getElementById("section" + sectionNumber)
          .classList.remove("your-active-class");
      }
    }
  }
};

bindData();
addTopButtonFunctionality();
window.onscroll = function () {
  scrollFunction();
};
