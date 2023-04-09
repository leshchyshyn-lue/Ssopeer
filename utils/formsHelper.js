class FormsHelper {

    onInputError(message, height, formId) {
        let form = document.getElementById(formId);
        let element = document.querySelector('.errorMessage');
        if (element !== null) {
            form.removeChild(element);
        }
        let div = document.createElement('div');
        let errorMessage = document.createTextNode(message);
        div.className = 'errorMessage';
        div.appendChild(errorMessage);
        form.prepend(div);
        document.querySelector(".login__enter").style.height = height;
    }


    showPassword() {
        const input = document.getElementById('pass');
        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    }
}

const formsHelper = new FormsHelper();