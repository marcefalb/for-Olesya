let participantData;
const list = document.querySelector('.list');

const getItemHTML = (title, value) => `
  <li class="item">
    <span>${title}</span>
    <p>${value}</p>
  </li>
`;

const setItemHTML = (name, value) => {
  switch (name) {
    case 'name': {
      list.innerHTML += getItemHTML('Имя:', value);
      break;
    }
    case 'surname': {
      list.innerHTML += getItemHTML('Фамилия:', value);
      break;
    }
    case 'patronymicName': {
      list.innerHTML += getItemHTML('Отчество:', value);
      break;
    }
    case 'phone': {
      list.innerHTML += getItemHTML('Телефон:', value);
      break;
    }
    case 'email': {
      list.innerHTML += getItemHTML('Почта:', value);
      break;
    }
    case 'conferences': {
      list.innerHTML += getItemHTML('Секция конференции:', value);
      break;
    }
    case 'birthday': {
      list.innerHTML += getItemHTML('Дата рождения:', value);
      break;
    }
    case 'reportName': {
      list.innerHTML += getItemHTML('Название доклада:', value);
      break;
    }
  }
}

fetch('./index.html')
  .then(response => response.json())
  .then(data => {
    for (let key in data) {
      setItemHTML(key, data[key]);
    }
  });