const sounds = document.querySelector(".sounds");
const sylStructure = document.querySelector(".syl-structure");
const sylNumber = document.querySelector(".syl-number");
const wordNumber = document.querySelector(".word-number");
const generateBtn = document.querySelector(".generate");
const output = document.querySelector(".generated-words");

window.onload = () => {
    sounds.value = localStorage.getItem("sounds") || "";
    sylStructure.value = localStorage.getItem("sylStructure") || "";
    sylNumber.value = localStorage.getItem("sylNumber") || "1";
    wordNumber.value = localStorage.getItem("wordNumber") || "1";
};

function generateSegments() {
  var segments = [];

  sounds.value.split("\n").forEach((line) => {
    var currLine = [];
    currLine.push(line[0]);
    line
      .slice(2)
      .split(",")
      .forEach((e) => {
        currLine.push(e);
      });
    segments.push(currLine);
  });

  return segments;
}

function generate() {
  output.innerHTML = "";

  var segments = generateSegments();

  var structure = [];
  var optionality = "";

  for (let i = 0; i < sylStructure.value.length; i++) {
    ch = sylStructure.value[i];
    if (ch !== "(" && ch !== ")") {
      structure.push(ch);
    }
  }

  for (let i = 0; i < sylStructure.value.length; i++) {
    ch = sylStructure.value[i];
    if (ch === "(") {
      optionality += "0";
      i++;
    } else if (ch === ")") {
    } else {
      optionality += "1";
    }
  }

  for (let i = 0; i < wordNumber.value; i++) {
    for (let j = 0; j < Math.random() * sylNumber.value; j++) {
      structure.forEach((ch, i) => {
        if (optionality[i] === "0" && 0.5 < Math.random()) return;

        const segment = segments.find((subArray) => subArray[0] === ch);
        const randLetter =
            segment[Math.floor(Math.random() * (segment.length - 1)) + 1];
        output.innerHTML += randLetter;
      });
    }
    output.innerHTML += "<br>";
  }
}

generateBtn.onclick = () => {
  generate();
};

sounds.addEventListener("input", () =>
  localStorage.setItem("sounds", sounds.value)
);
sylStructure.addEventListener("input", () =>
  localStorage.setItem("sylStructure", sylStructure.value)
);
sylNumber.addEventListener("input", () =>
  localStorage.setItem("sylNumber", sylNumber.value)
);
wordNumber.addEventListener("input", () =>
  localStorage.setItem("wordNumber", wordNumber.value)
);
