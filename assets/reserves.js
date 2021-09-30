const form = document.getElementById('form');
const buttonSubmitForm = document.getElementById('submit');

let templateModal = ''

async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(this);

    // const response = await fetch(this.action, {
    //     method: this.method,
    //     body: formData,
    //     headers: {
    //         'Accept': 'application/json'
    //     },
    // });

    // if(response.ok) {
    //     this.reset();
    //     templateModal = `
    //         <div class="modal fade" id="modalAlert" tabindex="-1" aria-labelledby="modalAlertLabel" aria-hidden="true">
    //             <div class="modal-dialog">
    //                 <div class="modal-content">
    //                     <div class="modal-header">
    //                         <p class="modal-title" id="modalAlertLabel">Reservación</p>
    //                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //                     </div>
    //                     <div class="modal-body">
    //                         <p>Tu reserva se ha realizado éxitosamente. 📅</p>
    //                         <p>Gracias por preferirnos. 💖</p>
    //                         <br>
    //                         <p>Sal&Salsa Restaurant © JuvenTIC.</p>
    //                     </div>
    //                     <div class="modal-footer">
    //                         <button type="button" class="btn" data-bs-dismiss="modal">Ok!</button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     `;
    //     renderModal(document.getElementById('containerModal'));
    // }else {
    //     templateModal = `
    //         <div class="modal fade" id="modalAlert" tabindex="-1" aria-labelledby="modalAlertLabel" aria-hidden="true">
    //             <div class="modal-dialog">
    //                 <div class="modal-content">
    //                     <div class="modal-header">
    //                         <p class="modal-title" id="modalAlertLabel">Reservación</p>
    //                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //                     </div>
    //                     <div class="modal-body">
    //                         <p>Lo sentimos, hubo un problema al enviar la reserva de tu servicio. ❌</p>
    //                         <p>Estamos trabajando en ello. 🛠</p>
    //                         <br>
    //                         <p>Sal&Salsa Restaurant © JuvenTIC.</p>
    //                     </div>
    //                     <div class="modal-footer">
    //                         <button type="button" class="btn" data-bs-dismiss="modal">Ok!</button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     `;
    //     renderModal(document.getElementById('containerModal'));
    // }

    if(false) {
        this.reset();
        templateModal = `
            <div class="modal fade" id="modalAlert" tabindex="-1" aria-labelledby="modalAlertLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <p class="modal-title" id="modalAlertLabel">Reservación</p>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Tu reserva se ha realizado éxitosamente. 📅</p>
                            <p>Gracias por preferirnos. 💖</p>
                            <br>
                            <p>Sal&Salsa Restaurant © JuvenTIC.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn" data-bs-dismiss="modal">Ok!</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        renderModal(document.getElementById('containerModal'));
    }else {
        templateModal = `
            <div class="modal fade" id="modalAlert" tabindex="-1" aria-labelledby="modalAlertLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <p class="modal-title" id="modalAlertLabel">Reservación</p>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Lo sentimos, hubo un problema al enviar la reserva de tu servicio. ❌</p>
                            <p>Estamos trabajando en ello. 🛠</p>
                            <br>
                            <p>Sal&Salsa Restaurant © JuvenTIC.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn" data-bs-dismiss="modal">Ok!</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        renderModal(document.getElementById('containerModal'));
    }
}

function renderModal(node) {
    // Atibutos de Bootstrap para el modal
    buttonSubmitForm.setAttribute('data-bs-target', '#modalAlert');
    buttonSubmitForm.setAttribute('data-bs-toggle', 'modal');

    node.innerHTML = templateModal;

    //Click para activar el modal despupes de agg los atributos necesarios
    buttonSubmitForm.click();
}


form.addEventListener('submit', handleSubmit);