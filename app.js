//#############################firebase initialization=>

let firebaseConfig = {
  apiKey: "AIzaSyBfiowrn5oDR-BbY5bHsVuY9LK0OROtH48",
  authDomain: "learn-8eb1a.firebaseapp.com",
  databaseURL: "https://learn-8eb1a-default-rtdb.firebaseio.com",
  projectId: "learn-8eb1a",
  storageBucket: "learn-8eb1a.appspot.com",
  messagingSenderId: "22937471332",
  appId: "1:22937471332:web:4bc6b39ae3e854098e9271",
  measurementId: "G-FCHDHGKH5Y",
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();
let db = firebase.firestore();

//###########using firebase--->>>

//fetching data from firestore to add in -->challenges section-->

let upcoming = document.querySelector(".upcoming");
db.collection("fit1")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      challengesdata(doc);

      // console.log(doc.id);
      // console.log(doc.data().img);
    });
  });

//
function challengesdata(doc) {
  let challenges = document.createElement("div");
  challenges.classList.add("upcoming-challenges");

  let challenges_img = document.createElement("img");
  challenges_img.id = "upcoming-challenges-img";

  challenges_img.src = doc.data().img;

  let head = document.createElement("h6");
  head.classList.add("upcoming-challenges-head");
  head.textContent = doc.data().name;

  let para = document.createElement("p");
  para.id = "date";
  para.textContent = doc.data().date;

  let para2 = document.createElement("p");
  para2.id = "upcoming-challenges-para";
  para2.textContent = doc.data().desc;

  let btn = document.createElement("button");
  btn.classList.add("btn");
  btn.classList.add("btn-primary");
  btn.id = "upcoming-challenges-btn";

  let atag = document.createElement("a");
  atag.setAttribute("href", "#register");
  atag.classList.add("link-btn");
  atag.textContent = "Register Here";

  btn.appendChild(atag);

  challenges.appendChild(challenges_img);

  challenges.appendChild(head);

  challenges.appendChild(para);

  challenges.appendChild(para2);

  challenges.appendChild(btn);

  // console.log(challenges);

  upcoming.appendChild(challenges);
}

// on clicking register to change headings--> not worked//-->

let ele = document.querySelectorAll("link-btn");

// ele.addEventListener("click", (itm)=>{

//   console.log(itm.currentTarget);

// })

// ele.forEach((itm)=>{

//     itm.addEventListener("click", (it)=>{

//         console.log(it.currentTarget);

//       })

// });

// submitting user form adding data to server-->

let submit = document.querySelector("#submit");

submit.addEventListener("click", (itm) => {
  fetchingdata(itm);

  // itm.preventDefault();

  // console.log(itm);
});

let name = document.querySelector(".my_name");
let email = document.querySelector(".my_email");
let phone = document.querySelector(".my_phone");
let school = document.querySelector(".my_school");
let eventname = document.querySelector(".my_eventname");
let date = document.querySelector(".my_date");

function fetchingdata(itm) {
  itm.preventDefault();

  // console.log(itm.parentElement.currentTarget);
  // console.log(date.value);
  // console.log(name.value);
  // console.log(name.value);
  // console.log(name.value);
  // console.log(name.value);
  // console.log(name.value);

  if (
    name.value &&
    email.value &&
    phone.value &&
    school.value &&
    eventname.value &&
    date.value
  ) {
    console.log("all there");
    db.collection("fit-user-data").add({
      name: name.value,
      email: email.value,
      phone: phone.value,
      school: school.value,
      eventname: eventname.value,
      organizing_university: date.value,
    });

    setTimeout(showing(), 2000);
    setdeafult();
    //
  } else {
    setTimeout(remove(), 2000);
    alert(
      "!during registering somedetails were not added kindly add it for complete particepation!"
    );
  }

  //   setdeafult();
}

function setdeafult() {
  name.value = "";
  email.value = "";
  phone.value = "";
  school.value = "";
  eventname.value = "";
  date.value = "";
  //   confirm;
}

// displaying registration confirmation after form submission---->>>>
const tick = document.querySelector(".buttonsx ");

function showing() {
  tick.classList.remove("block-display");
}

function remove() {
  tick.classList.add("block-display");
}

// creating the event section from users----->

//#######################################################################>

const fname = document.querySelector("#fname");
const institute_name = document.querySelector("#country");
const Email = document.querySelector("#Email");
const phone_no = document.querySelector("#Number");
const Eventname = document.querySelector("#Eventname");
const Eventdate = document.querySelector("#date");
const institute_image = document.querySelector("#image");
const submit_2 = document.querySelector("#submit-2");

submit_2.addEventListener("click", function (object) {
  object.preventDefault();

  // console.log(object);

  check_creating_contest_credentials();
  check_email();


  adduserdetails();
  creating_contest();


  setbacktodefault();
});

// function for adding user details only ---------->>>>>>>>

function adduserdetails() {
  if (fname.value && phone_no.value && Eventdate.value) {
    console.log("present all");
    if (phone_no.value.length < 9) {
      throwerror2();
    } else {
      db.collection("fit1-create-users").add({
        name: fname.value,
        phone: phone_no.value,
        date: Eventdate.value,
      });
    }
  } else {
    throwerror();
  }

  // setbacktodefault();
}

//displaying error

function throwerror() {
  alert(
    " Important <#>! To create an Contest you must need to enter all the necessary details <#>!"
  );
}

function throwerror2() {
  alert(" Invalid phone no (must be >9 digits)");
}

function throwerror3() {
  alert(" Invalid gmail");
}

function setbacktodefault() {
  fname.value = "";
  institute_name.value = "";
  Email.value = "";
  phone_no.value = "";
  Eventname.value = "";
  Eventdate.value = "";
  institute_image.value = "";
}

//adding elements in fit section of the firebase------>>>>>

function creating_contest() {
  db.collection("fit1").add({
    name: institute_name.value,
    date: Eventdate.value,
    desc: Eventname.value,
    img: institute_image.value,
  });
}

// working on validate email address---->>>>

function check_email() {
  emailID = Email.value;

  atpos = emailID.indexOf("@");
  dotpos = emailID.lastIndexOf(".");

  if (atpos && dotpos) {
    if (atpos < 1 || dotpos - atpos <= 4) {
      throwerror3();
      setbacktodefault();
      // console.log("false");
      // return false;
    } else {
      // console.log("true");
    }
  } else {
    throwerror3();
    setbacktodefault();
    // console.log("false");
  }

  //  return( true );
}

function check_creating_contest_credentials() {
  if (
    institute_name.value &&
    Eventdate.value &&
    Eventname.value &&
    institute_image.value
  ) {
    console.log("all set");
  } else {
    throwerror();
    setbacktodefault();
  }
}
