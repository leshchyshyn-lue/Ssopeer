class FormsHelper {

    createErrorMessage(message, height, formId, selector) {
        const addEmailErrorMessage = 'addEmailErrorMessage';
        let form = document.getElementById(formId);
        let div = document.createElement('div');
        let element = '';

        if (formId === addEmailErrorMessage) {
            element = document.querySelector('.' + addEmailErrorMessage);
            div.className = addEmailErrorMessage;
        } else {
            element = document.querySelector('.errorMessage');
            div.className = 'errorMessage';
        }

        if (element !== null) {
            form.removeChild(element);
        }

        let errorMessage = document.createTextNode(message);
        div.appendChild(errorMessage);
        form.prepend(div);
        document.querySelector(selector).style.height = height;
    }

    showPassword(id) {
        const input = document.getElementById(id);
        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    }

    validateEmail(email) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return pattern.test(String(email).toLowerCase());
    }
    validatePassword(password) {
        const pattern = /(?=.*[0-9])(?=.*[A-ZА-ЯЁ])[0-9а-яёА-ЯЁa-zA-Z!@#$%^&*]{8,}/;
        return pattern.test(password);
    }
}

const formsHelper = new FormsHelper();