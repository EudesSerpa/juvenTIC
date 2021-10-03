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
	console.log(carrito)
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
	botonVaciar.addEventListener('click', ()=>{
		carrito = {}
		pintarCarrito()
	})

	const botonVaciar2 = document.getElementById('vaciarC')
	botonVaciar2.addEventListener('click', ()=>{
		carrito = {}
		pintarCarrito()
	})

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