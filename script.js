// NAVBAR RESPONSIVE

const menuBtn = document.querySelector(".menu-icon span");
const searchBtn = document.querySelector(".search-icon");
const cancelBtn = document.querySelector(".cancel-icon");
const items = document.querySelector(".nav-items");
const form = document.querySelector("form");
menuBtn.onclick = () => {
  items.classList.add("active");
  menuBtn.classList.add("hide");
  searchBtn.classList.add("hide");
  cancelBtn.classList.add("show");
}
cancelBtn.onclick = () => {
  items.classList.remove("active");
  menuBtn.classList.remove("hide");
  searchBtn.classList.remove("hide");
  cancelBtn.classList.remove("show");
  form.classList.remove("active");
  cancelBtn.style.color = "#ff3d00";
}
searchBtn.onclick = () => {
  form.classList.add("active");
  searchBtn.classList.add("hide");
  cancelBtn.classList.add("show");
}


//Local Storage

const NewNote = document.querySelector("#NewNote")
const mainsection = document.querySelector("#mainsection")



//  ADDING NEW NOTE

const New = (text = "") => {

  const note = document.createElement("div");                         //DOM for adding new note
  note.classList.add("note")
  note.innerHTML = `
<div class="tool" >
<p class="notehead">Note</p>
<i class="saveit fas fa-save"></i>
<i class="trash fa-solid fa-xmark"></i>
</div>
<textarea id="note_text">${text}</textarea>`;


  note.querySelector(".trash").addEventListener(
    "click",
    function() {
      note.remove()                                                      //DELETING A NOTE
      saving()                                                           // Saving Note
    }
  )
  note.querySelector(".saveit").addEventListener(
    "click",
    function() {
      saving()   
      alert("Note is Saved");                                                            //Saving note
    }
  )
  note.querySelector("textarea").addEventListener(
    "focusout",                                                           //When you go out of text area
    function() {
      saving()  
      alert("Note is Saved");                                                           //Save note
    }
  )
  mainsection.appendChild(note);
  saving()                                                               //Saving Note
}
//  SAVING A NOTE

const saving = () => {
  const notes = document.querySelectorAll(".note textarea");             //Making Notes key for stooring in Local storage
//console.log(notes);
  const data = [];                                                      //Object Array
  notes.forEach(
    (note) => {
      data.push(note.value)                                              //Pushing note value to data array
    }
  )
  //console.log(data)

  if (data.length === 0) {
    localStorage.removeItem("notes")

  } else {
    localStorage.setItem("notes", JSON.stringify(data))   
                //Setting value of data to NOTES in form of string
  }
 // console.log(notes)

}

(
  function() {                                                            //Function which automatically run when Page Reload
    const lsNotes = JSON.parse(localStorage.getItem("notes"));
    // console.log(lsNotes)
    if (lsNotes === null) {                                                //Adding atleast One note when page is reloaded
      New()
    } else {                                                             //if there are items in LS then fetch it and store it in note
      lsNotes.forEach(
        (lsNote) => {
          New(lsNote)
        }
      )
    }
    //console.log(lsNotes)


  }
)()                                                                     //Self called function

NewNote.addEventListener(
  "click",

  function() {

    const alerting = JSON.parse(localStorage.getItem("notes"));
    //  console.log(alerting.length)
    for (var i = 0; i < alerting.length; i++)                            //alert when there are no item in Text area
      if (alerting[i] == "") {
        return alert("Note is Empty! In order to get a New Note, Fill the Empty note first.");
      }
    New()
  }

)




//SEARCH BAR



const searchbar = () => {
  const filter = document.getElementById("myinput").value.toUpperCase();            //Search bar input
  const search = JSON.parse(localStorage.getItem("notes"));                         //Fetch item from Local storage
  const string = JSON.stringify(search);                                            //Convert object into string
  //consol.log(search)

  for (var i = 0; i < string.length; i++) {
    if (string.toUpperCase().indexOf(filter) > -1) {
     // string.innerHTML = (string.Textcontent).replace(filter, "<mark>filter</mark>")
    } else {
      // string[i].style.display = "none";
    }
  }

}
