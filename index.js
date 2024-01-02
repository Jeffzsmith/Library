const library = [];
var temp = "";
var count = 0;

function book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return this.name + "<br>" + " by " + this.author + "<br>" + this.pages + " pages" + "<br>" + this.read;
    };
}

function addToLibrary() {
    var radio1 = document.getElementById("read");
    var radio2 = document.getElementById("notread");
    if (radio1.checked == true) {
        var bool = "read";
    } else if (radio2.checked == true) {
        bool = "not read";
    } else {
        console.log("please select a value!")
    }
    const newBook = new book(
        document.querySelector("#book").value,
        document.querySelector("#author").value,
        document.querySelector("#pages").value,
        bool
    );
    library.push(newBook);
    const newdiv = document.createElement("div");
    newdiv.classList.add("sample");
    const but = document.createElement("button");
    let text = document.createTextNode("-");
    but.appendChild(text);
    newdiv.appendChild(but);
    but.classList.add("but");
    document.querySelector(".container").appendChild(newdiv);
    newdiv.innerHTML += "<br>" + library[library.length - 1].info() + "<br><br>";
}

function remove(index) {
    library.splice(index, 1);
    document.querySelectorAll(".sample")[index].remove();
    console.log(library);
    updateListeners(); 
}

function updateListeners() {
    const buttons = document.querySelectorAll(".but");
    buttons.forEach((button, index) => {
        button.onclick = function() {
            console.log(index);
            remove(index);
        };
    });
}

function getIndex() {
    for (let i = 0; i < library.length; i++) {
        document.querySelectorAll(".but")[i].onclick = function() {
            console.log(i);
            remove(i);
        };
    }
}
function start() {
    const bookInput = document.querySelector("#book").value;
    const authorInput = document.querySelector("#author").value;
    const pagesInput = document.querySelector("#pages").value;
    const readInput = document.querySelector("#read").checked || document.querySelector("#notread").checked;

    if (bookInput && authorInput && pagesInput && readInput){
        addToLibrary();
        getIndex();
        document.querySelector("#book").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#pages").value = "";
        document.querySelector("#read").checked = false;
        document.querySelector("#notread").checked = false;
    } else {
        alert("Please fill in all fields!");
    }
}
document.querySelector("#submit").addEventListener("click", start);

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        start();
    }
});
