import { fieldsToValidate, labelsStyled } from "./validations.js";


const form = document.getElementById('form');
const textFormInvalid = document.querySelector('.form-invalid--text');

const myModal = new bootstrap.Modal(document.getElementById('modal-container'));
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

            if(response.ok) {
                this.reset();
                renderModal(modalBody, templateModalOk);
            }else {
                renderModal(modalBody, templateModalError);
            }
        } catch (error) {
            console.log('Error: No se pudo enviar el email', error);
            renderModal(modalBody, templateModalError);
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

function renderModal(contentModal, modal) {
    contentModal.innerHTML = modal;
    myModal.show();
}


form.addEventListener('submit', handleSubmit);