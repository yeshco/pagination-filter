let newDiv = "";
let newUl = "";
let aNumber = 0;
let aNumber2 = 0;
let newArray = [];
let secondArray = [];
let thirdI = 0;
let allLis;
let secondUl = [];
let numberOfPages;
let numberOfStudents;
let returnToList;

let ul = document.querySelectorAll('.student-item');
const header = document.querySelector('.page-header');
const studentList = document.querySelector('.student-list');
let page = document.querySelector('.page');

let numberOfStudentsSpecific = (ul.length);

//Creates Buttons and gives them classes that change their appearance based on their situation
function createButtons(ul) {
  numberOfPages = (Math.ceil(ul.length/10));
  numberOfStudents = (ul.length);
  newDiv = document.createElement('div');
  newUl = document.createElement('ul');
  newDiv.className = 'pagination';
  page.appendChild(newDiv);
  newDiv.appendChild(newUl);
  allLis  = newUl.childNodes;
  for (i=0; i<numberOfPages; i++) {
    newUl.innerHTML += '<li> <a href="#" id="'+i+'">'+[i+1]+'</a> </li>'
  }
  newDiv.addEventListener('click', () => {
    for (i=0; i<numberOfPages; i++) {
      allLis[i].firstElementChild.className = 'notActive'
    }
  })
}

//Functions that add one number to a variable and also that return it used later on to get a number that increases each time

//first set:
function addToANumber() {
  aNumber += 1;
}

function loopAll(aNumber) {
  return aNumber;
}

//second set:
function addToANumber2() {
  aNumber2 += 1;
}

function loopAll(aNumber2) {
  return aNumber2;
}

//Creates one array divided by the number of pages that has the html of 10 <li>
function createTemplates(ul) {
  for (firstI=0; firstI<numberOfPages; firstI++) {
    for (secondI=0; secondI<10; secondI++){
      if (aNumber == numberOfStudents) {break;}
      newArray += ul[loopAll(aNumber,addToANumber())].outerHTML;
    }
    secondArray[firstI] = newArray;
    newArray = [];
  }
}

//Evnet listener for each page button that fills the page with the html from the array according to which button was clicked
function fillTemplates() {
  let paginationDiv = document.querySelector('.pagination');
  paginationDiv.addEventListener('click', () => {
    if (event.target.nodeName === "A") {
      studentList.innerHTML = secondArray[event.target.id];
      event.target.className = 'active';
    }
  })
}

//Fills the page with the first 10 <li> for when the page is loaded
function onLoad() {
  studentList.innerHTML = secondArray[0];
  allLis[0].firstElementChild.className = 'active';
}

//Creates a search bar an button
function createSearchInput() {
  searchDiv = document.createElement('div');
  searchInput = document.createElement('input');
  searchButton = document.createElement('button');
  searchDiv.className = 'student-search';
  searchInput.placeholder = 'Search for students...';
  searchButton.textContent = 'Search';
  header.appendChild(searchDiv);
  searchDiv.appendChild(searchInput);
  searchDiv.appendChild(searchButton);
}

//event listener with function to search any characters that exist in a <li> and puts that <li> into an array and calls the functions that were used before to create the pagination buttons and the webpages resetting some variables that need to be reseted
function searchEngine()   {
  searchButton.addEventListener('click', () => {
    for(i=0; i<numberOfStudentsSpecific; i++){
      if(ul[i].innerText.indexOf(searchInput.value) > -1) {
        secondUl[loopAll(aNumber2,addToANumber2())] = ul[i];
      }
    }
    if (secondUl.length != 0) {
    page.removeChild(newDiv);
    createButtons(secondUl);
    aNumber = 0;
    secondArray = [];
    createTemplates(secondUl);
    aNumber2 = 0;
    fillTemplates();
    onLoad();
    secondUl = [];
    } else {
      newDiv.removeChild(newUl);
      studentList.innerHTML = "<h3>There is nothing here<h3>";
    }
  });
}

//calls all functions

createButtons(ul);
createTemplates(ul);
fillTemplates();
createSearchInput();
onLoad();
searchEngine();
