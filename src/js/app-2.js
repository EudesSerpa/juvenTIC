const items = document.getElementById('items')
const footer = document.getElementById('footer')

const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content

const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener('DOMContentLoaded', ()=>{
	
	if(localStorage.getItem('carrito')){
		carrito = JSON.parse(localStorage.getItem('carrito'))
		pintarCarrito()
	}
})

items.addEventListener('click', (e)=>{
	btnAccion(e)
})

const pintarCarrito = ()=>{
	console.log('carrito', carrito)
	items.innerHTML = ''
	Object.values(carrito).forEach(producto=>{
		templateCarrito.querySelector('th').textContent = producto.id
		templateCarrito.querySelectorAll('td')[0].textContent = producto.title
		templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
		templateCarrito.querySelector('.btn-success').dataset.id = producto.id
		templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
		templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

		const clone = templateCarrito.cloneNode(true)
		fragment.appendChild(clone)
	})
	items.appendChild(fragment)

	pintarFooter()	
	localStorage.setItem('carrito', JSON.stringify(carrito))
}

function cleanCarrito() {
	carrito = {}
	pintarCarrito()
}

const pintarFooter = ()=>{
	footer.innerHTML = ''
	if(Object.keys(carrito).length === 0){
		footer.innerHTML = `<th scope="row" colspan="5">Aún no se agregan articulos</th>`
		return
	}

	const nCantidad = Object.values(carrito).reduce((acun, {cantidad})=>acun + cantidad,0)
	const nPrecio = Object.values(carrito).reduce((acun, {cantidad, precio})=>acun + cantidad * precio, 0)

	templateFooter.querySelectorAll('td')[0].textContent = nCantidad
	templateFooter.querySelector('span').textContent = nPrecio

	const clone = templateFooter.cloneNode(true)
	fragment.appendChild(clone)
	footer.appendChild(fragment)

	const botonVaciar = document.getElementById('vaciar-carrito')
	botonVaciar.addEventListener('click', cleanCarrito);
}

const btnAccion = (e)=>{
	if(e.target.classList.contains('btn-success')){
		console.log(carrito[e.target.dataset.id])
		const producto = carrito[e.target.dataset.id]
		producto.cantidad = carrito[e.target.dataset.id].cantidad + 1
		carrito[e.target.dataset.id] = {...producto}
		pintarCarrito()
	}

	if(e.target.classList.contains('btn-danger')){
		const producto = carrito[e.target.dataset.id]
		producto.cantidad--
		if(producto.cantidad === 0){
			delete carrito[e.target.dataset.id]
		}
		pintarCarrito()
	}

	e.stopPropagation()
}


// Validacion de campos del form
const form = document.getElementById('form');
const textFormInvalid = document.querySelector('.form-invalid--text');
const inputs = document.querySelectorAll('.form_input');


async function handleSubmit(event) {
    event.preventDefault();

    const validations = Object.values(fieldsToValidate);

    if(validations.every(validation => validation)) {
        //Enviar
        const formData = new FormData(this);
		formData.set('Informacion', 'Productos comprados');

		const cart = Object.values(carrito);
		cart.forEach(product => {
			formData.append('Productos', `Producto: ${product.title} - Precio: ${product.precio} - Cantidad: ${product.cantidad}`);
		});

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
				Swal.fire({
					icon: 'success',
					title: 'Compra realizada con éxito',
					showConfirmButton: false,
					timer: 1800
				});

				cleanCarrito();
            }else {
				Swal.fire({
					icon: 'error',
					title: 'Error al realizar la compra',
					text: `
					No se pudo realizar la confirmacion de compras. Por favor, intente nuevamente en unos minutos o comuniquese con nosotros por otro medio.

					Estamos trabajando en solucionar el problema.
					`,
					showConfirmButton: false,
					timer: 3000
				})
            }
        } catch (error) {
			console.log('Error: No se pudo enviar el form', error.message);
			Swal.fire({
				icon: 'error',
				title: 'Error al realizar compra',
				text: `
				No se pudo realizar la confirmacion de compras. Por favor, intente nuevamente en unos minutos o comuniquese con nosotros por otro medio.

				Estamos trabajando en solucionar el problema.
				`,
				showConfirmButton: false,
				timer: 3000
			})
        }

		//Cerrar modal del formulario.

    }else {
        //No enviar
        textFormInvalid.classList.remove('no-show');
        textFormInvalid.classList.add('show');

        setTimeout(() => {
            textFormInvalid.classList.remove('show');
            textFormInvalid.classList.add('no-show');
        }, 4000);
    }
}


function handleInput(e) {
	let data = e.target.value.trim();

	switch (e.target.name) {
		case 'name':
			validateInput(regex.regexName, data.toLowerCase(), 'name');
			break;
		case 'email':
			validateInput(regex.regexEmail, data, 'email');
			break;
	}
}

function validateInput(regExp, data, field) {
	let textError = document.querySelector(`.text-error--${field}`);

	if(regExp.test(data)) {
		textError.classList.remove('show');
        textError.classList.add('no-show');

		fieldsToValidate[field] = true;
	}else {
		textError.classList.remove('no-show');
        textError.classList.add('show');

		fieldsToValidate[field] = false;
	}
}


form.addEventListener('submit', handleSubmit);

inputs.forEach(input => {
	input.addEventListener('blur', handleInput);
});


const fieldsToValidate = {
	'name': false,
	'email': false,
};

const regex = {
    regexName: /^([a-z]+)\s[a-z]+(\s[a-z]+|\s[a-z]+\s[a-z]+|\s[a-z]+\s[a-z]+\s[a-z]+)?$/,
    regexEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};