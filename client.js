// Name data from https://catalog.data.gov/dataset/baby-names-from-social-security-card-applications-national-level-data
// it's public domain

const csv = require('csvtojson')
const rwc = require('random-weighted-choice');

// default settings
let year = 2016 // four digit year from 1880-2016
let weighting = 10 // 0-100, favoring popular to favoring unpopular
let percentage = 20 // use most popular x percentage of names

let nameF = ''
let nameM = ''
let boyNames = []
let girlNames = []

// const GIRLNAMES = ['Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Mia', 'Amelia', 'Charlotte', 'Harper', 'Ella', 'Arria', 'Evelyn', 'Abigail', 'Emily', 'Avery', 'Scarlett', 'Madison', 'Sofia', 'Chloe', 'Lily']
// const BOYNAMES = ['Liam', 'Noah', 'Logan', 'Lucas', 'Mason', 'Oliver', 'Ethan', 'Elijah', 'Aiden', 'James', 'Benjamin', 'Sebastian', 'Jackson', 'Alexander', 'Jacob', 'Carter', 'Jayden', 'Michael', 'Daniel', 'Luke']
const ALIENNAMES = ["Wruar'ysk", "Kmepryhr", "Juprop", "Syssag", "Cliedhy", "Kuakhog", "Wruagloms", "Prekralpy", "Prouprykx", "Decrahn", "Stryquhx", "Bobbuwth", "Giff", "Sleclyth", "Weamneth", "Iewrazue", "Kawrto", "Phouhohshea"]

let girlOutput = document.getElementById('girlOutput')
let boyOutput = document.getElementById('boyOutput')
let alienOutput = document.getElementById('alienOutput')
let commenceButton = document.getElementById('commenceButton')
let namesTable = document.getElementById('namesTable')
let progressBar = document.getElementById('progressBar')
let progress = document.getElementById('progress')
let progressMessage = document.getElementById('progress-message')
let buttons = document.getElementById('buttons')
let aboutButton = document.getElementById('aboutButton')
let about = document.getElementById('about')
let backButton = document.getElementById('backButton')
let closeSettingsButton = document.getElementById('closeSettingsButton')
let settingsButton = document.getElementById('settingsButton')
let yearSlider = document.getElementById("yearSlider")
let yearOutput = document.getElementById("yearOutput")
let weightingSlider = document.getElementById("weightingSlider")
let weightingOutput = document.getElementById("weightingOutput")
let percentageSlider = document.getElementById("percentageSlider")
let percentageOutput = document.getElementById("percentageOutput")


// year : four digit year from 1880-2016
function getNamesLists(year = 2016) {
  console.log("getting names from year", year)
  buttons.style.display = 'none'
  progress.style.display = "block"
  progressMessage.innerText = "fetching all names."
  var getProgress = setInterval(function() {
    let start = 0
    let end = 50
    progressBar.value = Math.floor(Math.random() * end) + start
  }, 50);
  const FILENAME = 'names/yob' + year + ".txt"
  var request = new Request(FILENAME, {
    headers: new Headers({
      'Content-Type': 'text/plain'
    })
  });

  fetch(request).then(res => res.text())
    .then(res => {
      clearInterval(getProgress)
      progressMessage.innerText = "parsing names."
      var parseProgress = setInterval(function() {
        let start = 50
        let end = 100
        progressBar.value = Math.floor(Math.random() * end) + start
      }, 50);
      let csvfile = res
      csv({
          noheader: true,
          headers: ['id', 'gender', 'weight'],
          colParser: {
            "id": "string",
            "weight": "number"
          }
        })
        .fromString(csvfile)
        .on('json', (jsonObj) => {
          let newRow = {}
          newRow.id = jsonObj.id
          newRow.weight = jsonObj.weight
          if (jsonObj.gender === "M") {
            boyNames.push(newRow)
          } else {
            girlNames.push(newRow)
          }
        })
        .on('done', (error) => {
          console.log("done parsing names")
          clearInterval(parseProgress)
          progressBar.value = 100
          progressMessage.innerText = 'Ready!'
          buttons.style.display = 'block'
          setTimeout(function() {
            progress.style.display = 'none'
          }, 1000)
        })
    })
}


function getRandomItem(itemsArray) {
  let index = Math.floor(Math.random() * itemsArray.length)
  return itemsArray[index]
}

// reduce names list to most popular x percent
function cropList(nameslist, percentage) {
  let newLength = Math.ceil(nameslist.length * (percentage / 100))
  console.log("nameslist length was", nameslist.length)
  console.log("trimming to", percentage + "%")
  console.log("newLength is", newLength)
  return nameslist.slice(0, newLength)
}

function printNames() {
  console.log("chosing names using weighting factor of", weighting)
  buttons.style.display = 'none'
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
  }, 50);

  setTimeout(function() {
    let someGirlNames = cropList(girlNames, percentage)
    girlOutput.innerHTML = rwc(someGirlNames, weighting)
    progressMessage.innerText = "determining boy name."
    clearInterval(girlProgress)
    var boyProgress = setInterval(function() {
      let start = 30
      let end = 65
      progressBar.value = Math.floor(Math.random() * (end - start)) + start
    }, 50);
    setTimeout(function() {
      let someBoyNames = cropList(boyNames, percentage)
      boyOutput.innerHTML = rwc(someBoyNames, weighting)
      progressMessage.innerText = "determining alien name."
      clearInterval(boyProgress)
      var alienProgress = setInterval(function() {
        let start = 65
        let end = 100
        progressBar.value = Math.floor(Math.random() * end) + start
      }, 50);
      setTimeout(function() {
        progressBar.value = 100
        alienOutput.innerHTML = getRandomItem(ALIENNAMES)
        clearInterval(alienProgress)
        namesTable.style.opacity = '1'
        progressMessage.innerText = 'Done!'
        buttons.style.display = 'block'
        setTimeout(function() {
          progress.style.display = 'none'
        }, 1000)

      }, 1000)
    }, 1000)
  }, 1000)
}

function showAbout() {
  namesTable.style.display = "none"
  about.style.display = "block"
  buttons.style.display = "none"
}

function closeAbout() {
  namesTable.style.display = "block"
  about.style.display = "none"
  buttons.style.display = "block"
}

function showSettings() {
  namesTable.style.display = "none"
  settings.style.display = "block"
  buttons.style.display = "none"
}

function closeSettings() {
  namesTable.style.display = "block"
  settings.style.display = "none"
  buttons.style.display = "block"
  if (newYearSetting !== year) {
    year = newYearSetting
    getNamesLists(year)
  }
}

function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

yearSlider.value = year
yearOutput.innerHTML = yearSlider.value
let newYearSetting = year
yearSlider.oninput = function() {
  newYearSetting = this.value
  yearOutput.innerHTML = newYearSetting
}

weightingSlider.value = weighting
weightingOutput.innerHTML = weightingSlider.value
weightingSlider.oninput = function() {
  weighting = this.value
  weightingOutput.innerHTML = this.value
}

percentageSlider.value = percentage
percentageOutput.innerHTML = percentageSlider.value
percentageSlider.oninput = function() {
  percentage = this.value
  percentageOutput.innerHTML = this.value
}

ready(function() {
  getNamesLists(2016)
  commenceButton.addEventListener('click', printNames, false)
  aboutButton.addEventListener('click', showAbout, false)
  backButton.addEventListener('click', closeAbout, false)
  settingsButton.addEventListener('click', showSettings, false)
  closeSettingsButton.addEventListener('click', closeSettings, false)
})
