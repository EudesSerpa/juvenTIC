// const name = document.getElementById('name');
// const email = document.getElementById('email');
// const phone = document.getElementById('phone');
// const service = document.getElementById('service');
// const amountPeople = document.getElementById('amountPeople');
// const dateOfReserve = document.getElementById('dateOfReserve');


const form = document.getElementById('form');


function handleSubmit(event) {
    event.preventDefault();

    const validations = Object.values(fieldsToValidate);

    if(!validations.every(validation => validation)) {
        //Enviar formulario
        this.reset();
        console.log('se envio');
    }else {
        //No se envia
        console.log('khappa');
    }
}


form.addEventListener('submit', handleSubmit);


function validateForm(event) {
    let data = event.target.value.trim(); //Delete white space to the init and end

    switch(event.target.name) {
        case 'name':
            validateField(regex.regexName, data, 'name');
            break;
        case 'email':
            validateField(regex.regexEmail, data, 'email');
            break;
        case 'phone':
            validateField(regex.regexPhone, data, 'phone');
            break;
        case 'amountPeople':
            validateField(regex.regexAmountPeople, data, 'amountPeople');
            break;
        case 'dateOfReserve':
            validateField(regex.regexDateOfReserve, data, 'dateOfReserve');
            break;
    };
};


function validateField(regExp, data, field) {
    //Funciona para los inputs: name, email y phone. Por que su hermano (nex) es un label
    //No funciona para los de cantPersonas ni Fecha, porque sus labels estan antes de ellos.
    let nodeField =  document.querySelector(`.input--${field}`).nextElementSibling;
    console.log(nodeField);

    //------ MEJORAR PARA OBTENER LOS LABELS CORRESPONDIENTES PARA AGG LA CLASE 


    if(regExp.test(data)){
        nodeField.classList.remove('invalid');
        nodeField.classList.add('valid');

        fieldsToValidate[field] = true;
    }else {
        nodeField.classList.remove('valid');
        nodeField.classList.add('invalid');

        fieldsToValidate[field] = false;
    }
}


const inputs = document.querySelectorAll('.form-inputToValidate');
inputs.forEach(input => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});



const fieldsToValidate = {
    name: false,
    email: false,
    phone: false,
    amountPeople: false,
    dateOfReserve: false,
};

const regex = {
    regexName: /^([a-z]+)\s[a-z]+(\s[a-z]+|\s[a-z]+\s[a-z]+|\s[a-z]+\s[a-z]+\s[a-z]+)?$/,
    regexPhone: /^[3]\d{9}$/,
    regexAmountPeople: /^[1-9]\d*$/,
    // match: segun con el 99.99% de formato de correo electronico
    regexEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    // match: 11/24/0004 11:59 PM | 2.29.2008 | 02:50:10
    // no match: 12/33/1020 | 2/29/2005 | 13:00 AM
    regexDateOfReserve: /(?=\d)^(?:(?!(?:10\D(?:0?[5-9]|1[0-4])\D(?:1582))|(?:0?9\D(?:0?[3-9]|1[0-3])\D(?:1752)))((?:0?[13578]|1[02])|(?:0?[469]|11)(?!\/31)(?!-31)(?!\.31)|(?:0?2(?=.?(?:(?:29.(?!000[04]|(?:(?:1[^0-6]|[2468][^048]|[3579][^26])00))(?:(?:(?:\d\d)(?:[02468][048]|[13579][26])(?!\x20BC))|(?:00(?:42|3[0369]|2[147]|1[258]|09)\x20BC))))))|(?:0?2(?=.(?:(?:\d\D)|(?:[01]\d)|(?:2[0-8])))))([-.\/])(0?[1-9]|[12]\d|3[01])\2(?!0000)((?=(?:00(?:4[0-5]|[0-3]?\d)\x20BC)|(?:\d{4}(?!\x20BC)))\d{4}(?:\x20BC)?)(?:$|(?=\x20\d)\x20))?((?:(?:0?[1-9]|1[012])(?::[0-5]\d){0,2}(?:\x20[aApP][mM]))|(?:[01]\d|2[0-3])(?::[0-5]\d){1,2})?$/,
};
