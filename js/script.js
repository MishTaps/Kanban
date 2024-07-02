"use strict";
// Константы
const MAX_BOARD_NAME_LENGTH = 22;
// Переменные
let dragged = null;
let boardsNames = [];
let deskData = null;

// Запись списка названий досок в переменную boardsNames[]
function whiteBoardNames() {
    const listElemBoards = document.querySelectorAll('.list__board');
    for (let boardIndex = 0; boardIndex < listElemBoards.length; boardIndex++) {
        boardsNames[boardIndex] = listElemBoards[boardIndex].textContent;
    }
}
// Показать/скрыть боковую панель
const elemSideBar = document.querySelector('.sideBar')
function toggleSideBar() {
    elemSideBar.classList.toggle('display-flex');
    elemSideBar.classList.toggle('display-none');

    elemHidedSideBar.classList.toggle('display-none');
    elemHidedSideBar.classList.toggle('display-block');
    return;
}
// Добавить новый столбец
function addNewColumn() {
    const elemAddNewColumn = document.querySelector('.allColumns__addNewColumn_container');
    elemAddNewColumn.insertAdjacentHTML('beforebegin', '<div class="allColumns__column"> <div class="column__title"> <div class="column__circle column__circle--green"></div> <div class="column__titleText">Новая<span class="column__titleText_countCards"></span></div> </div> <div class="column__cards"></div> </div>');
    countAllCards();
    return;
}
// Добавить новую карточку
function addNewCard() {
    const elemColumnСards = document.querySelector('.column__cards');
    elemColumnСards.insertAdjacentHTML('afterbegin', '<div class="card" draggable="true"> <div class="card__title">Новая задача</div> <div class="card__substasks">0 из 0 подзадач</div> </div>');
    countAllCards()
}
// Добавить новые столбцы после загрузки доски
function addNewColumnsAfterFetch(boardData) {
    const boardColumns = boardData.columns;
    boardColumns.forEach(column => {
        const elemAddNewColumn = document.querySelector('.allColumns__addNewColumn_container');
        elemAddNewColumn.insertAdjacentHTML('beforebegin', `<div class="allColumns__column"> <div class="column__title"> <div class="column__circle column__circle--${column.color}"></div> <div class="column__titleText">${column.name}<span class="column__titleText_countCards"></span></div> </div> <div class="column__cards"></div> </div>`);
        addNewCardAfterFetch(column)
    });
    countAllCards();
}
// Добавить новые карточки после загрузки доски
function addNewCardAfterFetch(columnData) {
    const columnCards = columnData.cards;
    columnCards.forEach(card => {
        const subtasks = card.subtasks;
        let subtasksDoneCount = 0;
        let subtasksAllCount = 0;
        subtasks.forEach(subtask => {
            subtasksAllCount++;
            if (subtask.finished) {
                subtasksDoneCount++;
            }
        });
        const elemColumnСards = document.querySelectorAll('.column__cards')[columnData.id];
        elemColumnСards.insertAdjacentHTML('beforeend', `<div class="card" draggable="true"> <div class="card__title">${card.name}</div> <div class="card__substasks">${subtasksDoneCount} из ${subtasksAllCount} подзадач</div> </div>`);
    });
}
// Записать название доски после загрузки доски
function addBoardNameAfterFetch(boardName) {
    const elemSelectedBoard = document.querySelector('.list__board_selected');
    elemSelectedBoard.innerHTML = `${boardName}`;
}
// Показать доску на экране
function showBoard(boardData) {
    addBoardNameAfterFetch(boardData.name)
    addNewColumnsAfterFetch(boardData);
}
// Показать ошибку на экране
function showError(err) {
    console.error('Ошибка: ', err);
}
// Добавить новую доску
function addNewBoard() {
    const elemAddNewBoard = document.querySelector('.list__addNewBoard');
    elemAddNewBoard.insertAdjacentHTML('beforebegin', '<div class="list__board">Новая доска с очень длинным названием, которая не помещается</div>');
    countAllBoards();
    editBoardNames();
}
// Подсчёт карточек
function countAllCards() {
    const listElemColumnTitleText = document.querySelectorAll('.column__titleText');
    const listElemCountCards = document.querySelectorAll('.column__titleText_countCards');
    for (let columnIndex = 0; columnIndex < listElemColumnTitleText.length; columnIndex++) {
        let countCards = listElemColumnTitleText[columnIndex].parentElement.nextElementSibling.childElementCount;
        listElemCountCards[columnIndex].innerHTML = ` (${countCards})`;
    }
    return;
}
// Подсчёт досок
function countAllBoards() {
    const listElemBoards = document.querySelectorAll('.list__board');
    const elemCountBoards = document.querySelector('.sideBar__title_countBoards');
    elemCountBoards.innerHTML = ` (${listElemBoards.length})`;
    return;
}
// Проверка на длину названия доски
function editBoardNames() {
    const listElemBoard = document.querySelectorAll('.list__board');
    for (let boardIndex = 0; boardIndex < listElemBoard.length; boardIndex++) {
        let boardNameLength = listElemBoard[boardIndex].textContent.length;
        if (boardNameLength > MAX_BOARD_NAME_LENGTH) {
            const fullBoardName = listElemBoard[boardIndex].textContent;
            const shortBoardName = fullBoardName.substring(0, MAX_BOARD_NAME_LENGTH) + '...';
            listElemBoard[boardIndex].innerHTML = shortBoardName;
        }
    }
    return;
}
// Начало перетаскивания карточки
function dragCardStart(event) {
    dragged = event.target;
    return;
}
// Красить столбец при "dragover"
function dragOverColumn(event) {
    event.preventDefault();
    event.target.classList.add('column__cards_dragOver');
    return;
}
// Красить столбец при "dragleave"
function dragLeaveColumn(event) {
        event.preventDefault();
    event.target.classList.remove('column__cards_dragOver');
    return;
}
// Красить столбец и добавлять карточку в столбец при "drop"
function dragOnColumn(event) {
    event.preventDefault();
    event.target.classList.remove('column__cards_dragOver');
    if (event.target.classList.contains("column__cards")) {
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
        countAllCards();
    }
    return;
}
// Проверить, что событие "dragstart" срабатывает на карточку
function checkCardElement(event) {
	if (!event.target.classList.contains('card')) return;
	dragCardStart(event);
    return;
}
// Проверить, что событие "dragover" срабатывает на столбец
function checkColumnElementForDragOver(event) {
	if (!event.target.classList.contains('column__cards')) return;
	dragOverColumn(event);
    return;
}
// Проверить, что событие "dragleave" срабатывает на столбец
function checkColumnElementForDragLeave(event) {
	if (!event.target.classList.contains('column__cards')) return;
	dragLeaveColumn(event);
    return;
}
// Проверить, что событие "drop" срабатывает на столбец
function checkColumnElementForDrop(event) {
	if (!event.target.classList.contains('column__cards')) return;
	dragOnColumn(event);
    return;
}
// Проверить, что событие "mouseover" срабатывает на доску
function cleckElemBoard(event) {
	if (!event.target.classList.contains('list__board')) return;
    return;
}

// Событие "Скрыть боковую панель"
const elemSideBarFooter = document.querySelector('.sideBar__footer');
elemSideBarFooter.addEventListener('click', toggleSideBar);

// Событие "Показать боковую панель"
const elemHidedSideBar = document.querySelector('.hidedSideBar');
elemHidedSideBar.addEventListener('click', toggleSideBar);

// Событие "Добавить новую колонку"
const elemAddNewColumn = document.querySelector('.allColumns__addNewColumn');
elemAddNewColumn.addEventListener('click', addNewColumn)

// Событие "Добавить новую задачу"
const elemAddNewTask = document.querySelector('.addTaskButton');
elemAddNewTask.addEventListener('click', addNewCard)

// Событие "Добавить новую доску"
const elemAddNewBoard = document.querySelector('.list__addNewBoard');
elemAddNewBoard.addEventListener('click', addNewBoard)

// События "Drag'n'drop"
const elemAllColumns = document.querySelector('.workWindow__allColumns');
elemAllColumns.addEventListener('dragstart', checkCardElement);
elemAllColumns.addEventListener('dragover', checkColumnElementForDragOver);
elemAllColumns.addEventListener('dragleave', checkColumnElementForDragLeave);
elemAllColumns.addEventListener('drop', checkColumnElementForDrop);

// События наведения/уведения мыши на/с названия доски
const elemBoards = document.querySelector('.sideBar__list');
elemBoards.addEventListener('mouseover', cleckElemBoard);

// <--- Начало обработки страницы --->
countAllBoards(); // Посчитать доски
whiteBoardNames(); // Записать полные имена досок в массив boardsNames[]
editBoardNames(); // Укоротить слишком длинные названия досок

fetch('../db/board0.json')
    .then(response => response.json())
    .then(data => showBoard(data))
    .catch(err => showError(err));

window.showOpenFilePicker();