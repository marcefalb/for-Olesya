const hasReportField = document.querySelector('#hasReport');
const sendButton = document.querySelector('.send');

const checkIsRussianAlphabet = (value) => {
  return /^[а-яА-ЯЁё]+$/.test(value);
};
const checkIsPhoneValid = (value) => {
  return /^\+7\d{10}$/.test(value);
};
const checkIsEmailValid = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};
const checkIsReportNameFilled = (value) => {
  return hasReportField.checked && value;
};

const setValidationError = (fieldNode) => {
  const validationErrorNode = fieldNode.nextElementSibling;
  
  validationErrorNode.classList.add('error');
  validationErrorNode.innerHTML = 'Заполните это поле';
}
const clearValidationError = (fieldNode) => {
  const validationErrorNode = fieldNode.nextElementSibling;
  
  validationErrorNode.classList.remove('error');
  validationErrorNode.innerHTML = '';
}
const checkCustomValidationError = (fieldNode) => {
  switch (fieldNode.name) {
    case 'name':
    case 'surname':
    case 'patronymicName': {
      return checkIsRussianAlphabet(fieldNode.value);
    }
    case 'phone': {
      return checkIsPhoneValid(fieldNode.value);
    }
    case 'email': {
      return checkIsEmailValid(fieldNode.value);
    }
    case 'reportName': {
      return checkIsReportNameFilled(fieldNode.value);
    }
    default: {
      return true;
    }
  }
}
const setCustomValidationError = (fieldNode) => {
  const validationErrorNode = fieldNode.nextElementSibling;
  validationErrorNode.classList.add('error');
  
  switch (fieldNode.name) {
    case 'name':
    case 'surname':
    case 'patronymicName': {
      validationErrorNode.innerHTML = 'Допускаются только буквы русского алфавита';
      break;
    }
    case 'phone': {
      validationErrorNode.innerHTML = 'Введите телефон без дополнительных символов, начинающийся с +7';
      break;
    }
    case 'email': {
      validationErrorNode.innerHTML = 'Введите корректный email';
      break;
    }
    case 'reportName': {
      validationErrorNode.innerHTML = 'Заполните это поле';
      break;
    }
    default: {
      validationErrorNode.innerHTML = '';
    }
  }
}

const toggleReportNameVisibility = (isHide) => {
  const reportNameField = document.querySelector('#reportName');
  const parentClassList = reportNameField.parentElement.classList;

  if (isHide) {
    parentClassList.remove('hide');
  } else {
    parentClassList.add('hide');
  }
};
hasReportField.addEventListener('change', (e) => toggleReportNameVisibility(e.target.checked));

const registerParticipant = () => {
  const fields = document.querySelectorAll('.field input, .field select');
  let hasErrors = false;
  
  fields.forEach(field => {
    if (!field.value && field.hasAttribute('required')) {
      setValidationError(field);
      hasErrors = true;
    } else if (!checkCustomValidationError(field)) {
      setCustomValidationError(field)
      hasErrors = true;
    } else {
      clearValidationError(field);
    }

  });
  
  if (!hasErrors) {
    const [name, surname, patronymicName, phone, email, conferences, birthday, reportName] = document.querySelectorAll('.field input, .field select');
    const participant = {
      name: name.value,
      surname: surname.value,
      patronymicName: patronymicName.value,
      phone: phone.value,
      email: email.value,
      conferences: conferences.value,
      birthday: birthday.value,
      reportName: reportName.value,
    };
    
    fetch('../../success.html', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(participant),
    })
      .then(() => window.open('../../success.html', '_blank'));
  }
}
sendButton.addEventListener('click', registerParticipant);