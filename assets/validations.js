const inputs = document.querySelectorAll('.form-inputToValidate');
const selectService = document.getElementById('service');

const fieldsToValidate = {};
const labelsStyled = [];

const regex = {
    regexName: /^([a-z]+)\s[a-z]+(\s[a-z]+|\s[a-z]+\s[a-z]+|\s[a-z]+\s[a-z]+\s[a-z]+)?$/,
    regexPhone: /^[3]\d{9}$/,
    regexAmountPeople: /^[1-9]\d*$/,
    regexEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    //Hay que formatear la fecha para que cumpla con estos estilos ya que el
        //datetime-local el formato es: AAAA-MM-DDTHH:MM
    // match: 11/24/0004 11:59 PM | 2.29.2008 | 02:50:10
    // no match: 12/33/1020 | 2/29/2005 | 13:00 AM
    // regexDateOfReserve: /(?=\d)^(?:(?!(?:10\D(?:0?[5-9]|1[0-4])\D(?:1582))|(?:0?9\D(?:0?[3-9]|1[0-3])\D(?:1752)))((?:0?[13578]|1[02])|(?:0?[469]|11)(?!\/31)(?!-31)(?!\.31)|(?:0?2(?=.?(?:(?:29.(?!000[04]|(?:(?:1[^0-6]|[2468][^048]|[3579][^26])00))(?:(?:(?:\d\d)(?:[02468][048]|[13579][26])(?!\x20BC))|(?:00(?:42|3[0369]|2[147]|1[258]|09)\x20BC))))))|(?:0?2(?=.(?:(?:\d\D)|(?:[01]\d)|(?:2[0-8])))))([-.\/])(0?[1-9]|[12]\d|3[01])\2(?!0000)((?=(?:00(?:4[0-5]|[0-3]?\d)\x20BC)|(?:\d{4}(?!\x20BC)))\d{4}(?:\x20BC)?)(?:$|(?=\x20\d)\x20))?((?:(?:0?[1-9]|1[012])(?::[0-5]\d){0,2}(?:\x20[aApP][mM]))|(?:[01]\d|2[0-3])(?::[0-5]\d){1,2})?$/,
};


function handleFields(event) {
    let data = event.target.value.trim(); //Delete white space to the init and end

    switch(event.target.name) {
        case 'name':
            validateInput(regex.regexName, data.toLowerCase(), 'name');
            break;
        case 'email':
            validateInput(regex.regexEmail, data, 'email');
            break;
        case 'phone':
            validateInput(regex.regexPhone, data, 'phone');
            break;
        case 'amountPeople':
            validateInput(regex.regexAmountPeople, data, 'amountPeople');
            break;
    };
};


function validateInput(regExp, data, field) {
    let labelToStyle =  document.querySelector(`.input--${field}`).nextElementSibling
    let textError = document.querySelector(`.text-error--${field}`);

    labelsStyled.push(labelToStyle);

    if(field === 'amountPeople') {
        //Tiene un maquetado diferente (label esta antes del input)
        labelToStyle =  document.querySelector(`.input--${field}`).previousElementSibling;
    }

    if(regExp.test(data)){
        labelToStyle.classList.remove('invalid');
        labelToStyle.classList.add('valid');

        textError.classList.remove('show');
        textError.classList.add('no-show');

        fieldsToValidate[field] = true;
    }else {
        labelToStyle.classList.remove('valid');
        labelToStyle.classList.add('invalid');

        textError.classList.remove('no-show');
        textError.classList.add('show');

        fieldsToValidate[field] = false;
    }
}


function validateSelect(event) {
    fieldsToValidate.service = event.target.value ? true : false;
}


inputs.forEach(input => {
    input.addEventListener('keyup', handleFields);
    input.addEventListener('blur', handleFields);
});
selectService.addEventListener('blur', validateSelect);



export { fieldsToValidate, labelsStyled };