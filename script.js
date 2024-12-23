let editingEvent = null; // Переменная для хранения редактируемого события

document.getElementById('event-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const description = document.getElementById('event-description').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value; // Получаем время
    const type = document.getElementById('event-type').value;

    const eventDateTime = `${date}T${time}`; // Формируем полную дату и время

    if (editingEvent) {
        updateEventInList(description, eventDateTime, type);
    } else {
        addEventToList(description, eventDateTime, type);
    }
    this.reset();
    editingEvent = null; // Сбрасываем редактирование
});

function addEventToList(description, dateTime, type) {
    const eventList = document.getElementById('event-list');
    const eventCard = document.createElement('div');
    eventCard.classList.add('event-card');
    
    eventCard.innerHTML = `
        <div class="event-header">
            <div class="event-icon">${getEventTypeLabel(type)}</div>
            <div class="event-info">
                <h3>${description}</h3>
                <p>${new Date(dateTime).toLocaleString()}</p>
            </div>
        </div>
        <button class="edit-button" onclick="editEvent(this)">Редактировать</button>
        <button class="delete-button" onclick="deleteEvent(this)">Удалить</button>
    `;
    
    eventCard.dataset.description = description; // Сохраняем описание
    eventCard.dataset.dateTime = dateTime; // Сохраняем дату и время
    eventCard.dataset.type = type; // Сохраняем тип события

    eventList.appendChild(eventCard);
}

function updateEventInList(description, dateTime, type) {
    editingEvent.dataset.description = description;
    editingEvent.dataset.dateTime = dateTime;
    editingEvent.dataset.type = type;

    const eventInfo = editingEvent.querySelector('.event-info');
    eventInfo.querySelector('h3').textContent = description;
    eventInfo.querySelector('p').textContent = new Date(dateTime).toLocaleString();

    const eventIcon = editingEvent.querySelector('.event-icon');
    eventIcon.innerHTML = getEventTypeLabel(type);
}

function getEventTypeLabel(type) {
    switch (type) {
        case 'meeting':
            return '<i class="fas fa-briefcase"></i>';
        case 'holiday':
            return '<i class="fas fa-gift"></i>';
        case 'birthday':
            return '<i class="fas fa-birthday-cake"></i>';
        case 'other':
            return '<i class="fas fa-ellipsis-h"></i>';
        default:
            return '';
    }
}

function editEvent(button) {
    editingEvent = button.parentElement; // Сохраняем ссылку на редактируемое событие
    const description = editingEvent.dataset.description;
    const dateTime = editingEvent.dataset.dateTime; // Получаем дату и время
    const type = editingEvent.dataset.type;

    // Заполняем форму данными события
    document.getElementById('event-description').value = description;
    const [date, time] = dateTime.split('T'); // Разделяем дату и время
    document.getElementById('event-date').value = date;
    document.getElementById('event-time').value = time;
    document.getElementById('event-type').value = type;
}

function deleteEvent(button) {
    const eventCard = button.parentElement; // Получаем карточку события
    eventCard.remove(); // Удаляем карточку из DOM
}