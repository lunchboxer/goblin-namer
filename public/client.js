
// most popular baby names of 2017 in order of popularity according to
// https://www.babycenter.com/top-baby-names-2017.htm
const GIRLNAMES = ['Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Mia', 'Amelia', 'Charlotte', 'Harper', 'Ella', 'Arria', 'Evelyn', 'Abigail', 'Emily', 'Avery', 'Scarlett', 'Madison', 'Sofia', 'Chloe', 'Lily']
const BOYNAMES = ['Liam', 'Noah', 'Logan', 'Lucas', 'Mason', 'Oliver', 'Ethan', 'Elijah', 'Aiden', 'James', 'Benjamin', 'Sebastian', 'Jackson', 'Alexander', 'Jacob', 'Carter', 'Jayden', 'Michael', 'Daniel', 'Luke']

let girlButton = document.getElementById('girlButton')
let boyButton = document.getElementById('boyButton')
let output = document.getElementById('name')

function outputName(namesArray) {
  let index = Math.floor(Math.random() * namesArray.length)
  output.innerHTML = namesArray[index]
}

function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function() {

  console.log("document Ready");
  girlButton.addEventListener('click', function() {
    outputName(GIRLNAMES)
  }, false);
  boyButton.addEventListener('click', function() {
    outputName(BOYNAMES)
  }, false);
});