// most popular baby names of 2017 in order of popularity according to
// https://www.babycenter.com/top-baby-names-2017.htm
const GIRLNAMES = ['Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Mia', 'Amelia', 'Charlotte', 'Harper', 'Ella', 'Arria', 'Evelyn', 'Abigail', 'Emily', 'Avery', 'Scarlett', 'Madison', 'Sofia', 'Chloe', 'Lily']
const BOYNAMES = ['Liam', 'Noah', 'Logan', 'Lucas', 'Mason', 'Oliver', 'Ethan', 'Elijah', 'Aiden', 'James', 'Benjamin', 'Sebastian', 'Jackson', 'Alexander', 'Jacob', 'Carter', 'Jayden', 'Michael', 'Daniel', 'Luke']
const ALIENNAMES = ["Wruar'ysk", "Kmepryhr", "Juprop", "Syssag", "Cliedhy", "Kuakhog", "Wruagloms", "Prekralpy", "Prouprykx", "Decrahn", "Stryquhx", "Bobbuwth", "Giff", "Sleclyth", "Weamneth", "Iewrazue", "Kawrto", "Phouhohshea"]

let girlOutput = document.getElementById('girlOutput')
let boyOutput = document.getElementById('boyOutput')
let alienOutput = document.getElementById('alienOutput')
let commenceButton = document.getElementById('commenceButton')
let namesTable = document.getElementById('namesTable')
let progressBar = document.getElementById('progressBar')
let progress = document.getElementById('progress')
let progressMessage = document.getElementById('progress-message')

function getRandomItem(itemsArray) {
  let index = Math.floor(Math.random() * itemsArray.length)
  return itemsArray[index]
}

function printNames() {
  commenceButton.disabled = true
  girlOutput.innerHTML = '--'
  boyOutput.innerHTML = '--'
  alienOutput.innerHTML = '--'
  namesTable.style.opacity = "0.7"
  progress.style.display = "block"
  progressMessage.innerText = "determining girl name."
  var girlProgress = setInterval(function() {
    let start = 0
    let end = 30
    progressBar.value = Math.floor(Math.random() * end) + start
  }, 10);

  setTimeout(function() {
    girlOutput.innerHTML = getRandomItem(GIRLNAMES)
    progressMessage.innerText = "determining boy name."
    clearInterval(girlProgress)
    var boyProgress = setInterval(function() {
      let start = 30
      let end = 65
      progressBar.value = Math.floor(Math.random() * (end - start)) + start
    }, 10);
    setTimeout(function() {
      boyOutput.innerHTML = getRandomItem(BOYNAMES)
      progressMessage.innerText = "determining alien name."
      clearInterval(boyProgress)
      var alienProgress = setInterval(function() {
        let start = 65
        let end = 100
        progressBar.value = Math.floor(Math.random() * end) + start
      }, 10);
      setTimeout(function() {
        progressBar.value = 100
        alienOutput.innerHTML = getRandomItem(ALIENNAMES)
        clearInterval(alienProgress)
        commenceButton.disabled = false
        namesTable.style.opacity = "1"
        progressMessage.innerText = "Done!"
        setTimeout(function() {
          progress.style.display = "none"
        }, 4000)

      }, 1500)
    }, 1500)
  }, 2000)




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
  commenceButton.addEventListener('click', printNames, false);
});
