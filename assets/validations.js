const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const service = document.getElementById('servicio');
const amountPeople = document.getElementById('amountPeople');
const dateOfReserve = document.getElementById('dateOfReserve');


const form = document.getElementById('form');


function handleSubmit() {
    //
}


form.addEventListener('submit', handleSubmit);


const regexDeleteSpaceInitAndEnd = /^\s+|\s+$/g;

const regexName = /^([a-z]{3,})\s\1(\s\1?)\2?$/g;
const regexPhone = /^[3]\d{9}$/g;
const regexAmountPeople = /^[1-9]\d*$/g;

// match: segun con el 99.99% de formato de correo electronico
const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// match: 11/24/0004 11:59 PM | 2.29.2008 | 02:50:10
// no match: 12/33/1020 | 2/29/2005 | 13:00 AM
const regexDateOfReserve = /(?=\d)^(?:(?!(?:10\D(?:0?[5-9]|1[0-4])\D(?:1582))|(?:0?9\D(?:0?[3-9]|1[0-3])\D(?:1752)))((?:0?[13578]|1[02])|(?:0?[469]|11)(?!\/31)(?!-31)(?!\.31)|(?:0?2(?=.?(?:(?:29.(?!000[04]|(?:(?:1[^0-6]|[2468][^048]|[3579][^26])00))(?:(?:(?:\d\d)(?:[02468][048]|[13579][26])(?!\x20BC))|(?:00(?:42|3[0369]|2[147]|1[258]|09)\x20BC))))))|(?:0?2(?=.(?:(?:\d\D)|(?:[01]\d)|(?:2[0-8])))))([-.\/])(0?[1-9]|[12]\d|3[01])\2(?!0000)((?=(?:00(?:4[0-5]|[0-3]?\d)\x20BC)|(?:\d{4}(?!\x20BC)))\d{4}(?:\x20BC)?)(?:$|(?=\x20\d)\x20))?((?:(?:0?[1-9]|1[012])(?::[0-5]\d){0,2}(?:\x20[aApP][mM]))|(?:[01]\d|2[0-3])(?::[0-5]\d){1,2})?$/;