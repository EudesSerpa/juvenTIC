const cards = document.getElementById('cards')

const templateCard = document.getElementById('template-card').content

const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener('DOMContentLoaded', ()=>{
	fetchApi()
	if(localStorage.getItem('carrito')){
		carrito = JSON.parse(localStorage.getItem('carrito'))
		pintarCarrito()
	}
})

cards.addEventListener('click', (e)=>{
	agregarCarrito(e)
})

const fetchApi = async ()=>{
	try{
		const res = await fetch('api.json');
		const data = await res.json();
		console.log(data);
		pintarCard(data)
	}catch(error){
		console.log(error);
	}
}

const pintarCard = (data)=>{
	data.forEach(producto => {
		templateCard.querySelector('h4').textContent = producto.title
		templateCard.querySelector('h5').textContent = producto.precio
		templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl)
		templateCard.querySelector('button').dataset.id = producto.id

		const clone = templateCard.cloneNode(true)
		fragment.appendChild(clone)
	});

	cards.appendChild(fragment)
}

const agregarCarrito = (e)=>{
	//console.log(e.target)
	//console.log(e.target.classList.contains('btn-primary'))
	if(e.target.classList.contains('btn-primary')){
		//console.log(e.target.parentElement)
		setCarrito(e.target.parentElement)
	}
	e.stopPropagation()
}

const setCarrito = (obj)=>{
	const producto = {
		id: obj.querySelector('.btn-primary').dataset.id,
		title: obj.querySelector('h4').textContent,
		precio: obj.querySelector('h5').textContent,
		cantidad: 1
	}
	if(carrito.hasOwnProperty(producto.id)){
		producto.cantidad = carrito[producto.id].cantidad + 1	
	}

	carrito[producto.id] = {...producto}
	localStorage.setItem('carrito', JSON.stringify(carrito))
	Swal.fire({
	  icon: 'success',
	  title: 'Agregado al carrito',
	  showConfirmButton: false,
	  timer: 1500
	})
	//console.log(carrito)
}

