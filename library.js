import { Book, bookToCard } from "./book.js";
import { clearForm } from "./index.js";

const form = document.getElementById("book-form");
const modal = document.getElementById("modal");
const saveBtn = document.getElementById("save-book-btn");
const addBtn = document.getElementById("add-book-btn");

export let editModeOn = false;

export const retrieveLocalStorage = () => {
  const serialized = localStorage.getItem("library");
  if (serialized === null) return [];
  return JSON.parse(serialized);
};

export const library = retrieveLocalStorage();
const refreshCards = () => {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";
  for (let i = 0; i < library.length; i++) {
    cardsContainer.appendChild(bookToCard(library[i], i));
  }
};
refreshCards();

export const addBook = () => {
  const book = buildBookFromForm();
  library.push(book);
  updateLocalStorage();
  refreshCards();
};

export const removeBook = (index) => {
  library.splice(index, 1);
  updateLocalStorage();
  refreshCards();
};

export const openEditModal = (index) => {
  editModeOn = true;
  changeBtn();
  const currentBook = library[index];
  updateForm(currentBook);
  modal.showModal();
};

export const updateBook = (index) => {
  library[index] = buildBookFromForm();
  updateLocalStorage();
  refreshCards();
};

const updateForm = (currentBook) => {
  form.title.value = currentBook.title;
  form.author.value = currentBook.author;
  form.pages.value = currentBook.pages;
  form.year.value = currentBook.year;
  form.read.checked = currentBook.read;
};

saveBtn.addEventListener("click", (e) => {
  const target = e.currentTarget;
  let index = Number(target.getAttribute("data-index"));
  updateBook(index);
  modal.close();
  clearForm();
});

export const changeBtn = () => {
  if (editModeOn) {
    saveBtn.classList.remove("disabled");
    saveBtn.classList.add("show");
    addBtn.classList.add("disabled");
    addBtn.classList.remove("show");
    editModeOn = false;
  } else {
    addBtn.classList.remove("disabled");
    addBtn.classList.add("show");
    saveBtn.classList.add("disabled");
    saveBtn.classList.remove("show");
  }
};

const updateLocalStorage = () => {
  let library_serialized = JSON.stringify(library);
  localStorage.setItem("library", library_serialized);
};

const buildBookFromForm = () => {
  return new Book(
    form.title.value,
    form.author.value,
    form.pages.value,
    form.year.value,
    form.read.checked
  );
};
