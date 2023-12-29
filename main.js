const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

let editElement; 
let editFlag = false; 
let editId = ""; 


form.addEventListener("submit", addItem);

clearBtn.addEventListener("click", clearItems);


window.addEventListener("DOMContentLoaded", setupItems);

//! functions

function addItem(e) {
  e.preventDefault();

  const value = grocery.value; 
  const id = new Date().getTime().toString();

  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id"); 
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    element.innerHTML = `

      <p class="title">${value}</p>
        <div class="btn-container">
          <button class="edit-btn" type="button"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="delete-btn" type="button"><i class="fa-solid fa-trash"></i></button>
        </div>`;

    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);

    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    list.appendChild(element);
    displayAlert("Added Successfully", "success");
    // show container
    container.classList.add("show-container");



    addLocalStorage(id, value);
    setBacktoDefault();
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value;
    displayAlert("Edited", "success");
    editLocalStorage(editId, value);
    setBacktoDefault();
  } else {
    displayAlert("Please fill in the field", "danger");
  }
}

//alert 
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  //   console.log(alert);

  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

//clear
function setBacktoDefault() {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "submit";
}

//delete

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  console.log(list.children);
  if (list.children.length == 0) {
    container.classList.remove("show-container");
    displayAlert("Items Removed", "danger");
  }
  removeFromLocalStorage(id);
}

// Edit

function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editId = element.dataset.id; //edited item id
  submitBtn.textContent = "edit";

  console.log(editElement);
}

//clear the list

function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);

      container.classList.remove("show-container");
      displayAlert("List is deleted", "danger");
      setBacktoDefault();
    });
  }
}

//add to local storage
function addLocalStorage(id, value) {
  const grocery = (id, value);
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
}
function editLocalStorage(id, value) {
  {
  }
}
function setupItems() {
  let items = getLocalStorage();
}
