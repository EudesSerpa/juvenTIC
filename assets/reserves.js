import { fieldsToValidate, labelsStyled } from "./validations.js";

const form = document.getElementById('form');
const textFormInvalid = document.querySelector('.form-invalid--text');
const buttonSubmitForm = document.getElementById('submit');
const modalBody = document.querySelector('.modal-body');

const templateModalOk = `
<p>Tu reserva se ha realizado éxitosamente. 📅</p>
<p>Gracias por preferirnos. 💖</p>
<br>
<p>Sal&Salsa Restaurant © JuvenTIC.</p>
`;

const templateModalError = `
<p>Lo sentimos, hubo un problema al enviar la reserva de tu servicio. ❌</p>
<p>Estamos trabajando en ello. 🛠</p>
<p>Si el problema persiste, te invitamos a comunicarte por otro medio.</p>
<p>Agradecemos tu comprensión.</p>
<br>
<p>Sal&Salsa Restaurant © JuvenTIC.</p>
`;

async function handleSubmit(event) {
    event.preventDefault();

    const validations = Object.values(fieldsToValidate);

    if(validations.every(validation => validation)) {
        //Enviar
        const formData = new FormData(this);

        try {
            const response = await fetch(this.action, {
                method: this.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                },
            });
        } catch (error) {
            console.log('Error: No se pudo enviar el email', error);

            alert('Lo sentimos pero su reserva no se pudo enviar. Por favor, revise su conexión a internet o comuniquese con nosotros por otro medio. Agradecemos su comprensión.');
        }

        /*Problemas: 
        1. Despues de renderizado el modal, el campo de nombre se vuelve false, por el evento blur: pierde el focus. Por lo que se activan los estilos para campos invalidos.
        2. Si el if para la respuesta es false, si no se resetea el formulario, se renderiza y se envia, una y otra vez, el modal y el formulario. Creo que es por el method click que simula el click y se propaga siempre. Esto mismo sucede si se renderiza el modal en la clausula catch, por eso mientras tanto, se puso el alert.
        */
        if(response.ok) {
            this.reset();
            renderModal(modalBody, templateModalOk);
        }else {
            console.log('Error');
            // renderModal(modalBody, templateModalError);
        }

        labelsStyled.forEach(field => {
            field.classList.remove('valid');
        });
    }else {
        //No enviar
        textFormInvalid.classList.remove('no-show');
        textFormInvalid.classList.add('show');

        setTimeout(() => {
            textFormInvalid.classList.remove('show');
            textFormInvalid.classList.add('no-show');
        }, 3000);
    }
}


function renderModal(node, modal) {
    // Atibutos de Bootstrap para el modal
    buttonSubmitForm.setAttribute('data-bs-target', '#modal-container');
    buttonSubmitForm.setAttribute('data-bs-toggle', 'modal');

    node.innerHTML = modal;

    //Click para activar el modal despupes de agg los atributos de Bootstrap
    buttonSubmitForm.click();
}


form.addEventListener('submit', handleSubmit);