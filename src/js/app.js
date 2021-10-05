const cards = document.getElementById('cards')
let objec
let data
const templateCard = document.getElementById('template-card').content
let cerrar = document.querySelectorAll(".close")[0];
let modal = document.querySelectorAll(".modal")[0];
let modalC = document.querySelectorAll(".containerModal")[0];
let addC = document.querySelectorAll(".addCarrito")[0]

const fragment = document.createDocumentFragment()
let carrito = {}

class CassProductos{
	constructor(obj){
		this.id = obj.id;
		this.precio = obj.precio;
		this.titulo = obj.title;
		this.descripcion = obj.descrip;
		this.imgSrc =  obj.thumbnailUrl;
	}
}

var listProductos = [];

document.addEventListener('DOMContentLoaded', ()=>{
	fetchApi()
	if(localStorage.getItem('carrito')){
		carrito = JSON.parse(localStorage.getItem('carrito'))
		pintarCarrito()
	}
})

cards.addEventListener('click', (e)=>{
	e.preventDefault();
	abrirModal(e)
})

const fetchApi = async ()=>{
	try{
		const res = await fetch('api.json'); // https://my-json-server.typicode.com/JohanDavidPortocarrero/filejson/productos
		data = await res.json();
		pintarCard(data)
	}catch(error){
		console.log(error);
	}
}

const pintarCard = (data)=>{
	data.forEach(producto => {
		listProductos.push(new CassProductos(producto))
		templateCard.querySelector('h4').textContent = producto.title
		templateCard.querySelector('h5').textContent = producto.precio
		templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl)
		templateCard.querySelector('a').dataset.id = producto.id

		const clone = templateCard.cloneNode(true)
		fragment.appendChild(clone)
	});

	cards.appendChild(fragment)
}

const abrirModal = (e) =>{
	if(e.target.classList.contains('botonM')){
		//console.log(e.target.parentElement)
		e.preventDefault();
		objec = e
		modalC.style.opacity = "1";
		modalC.style.visibility = "visible";
		modal.classList.toggle("modal-close");
		modalVentana(e.target.parentElement)
	}
	e.stopPropagation()
}

cerrar.addEventListener("click", function(e){
	modal.classList.toggle("modal-close");
	setTimeout(function(){
		modalC.style.opacity = "0";
		modalC.style.visibility = "hidden";
	}, 600)
})

window.addEventListener("click", function(e){
	if(e.target == modalC){
		modal.classList.toggle("modal-close");
		setTimeout(function(){
			modalC.style.opacity = "0";
			modalC.style.visibility = "hidden";
		}, 800)
	}
})

addC.addEventListener("click", function(e){
	e.preventDefault();
	agregarCarrito(objec)
	modal.classList.toggle("modal-close");
	setTimeout(function(){
		modalC.style.opacity = "0";
		modalC.style.visibility = "hidden";
	}, 600)
})

function modalVentana(obj){
	
	var obTomado;

	for(var i = 0; i < listProductos.length; i++){
		if(listProductos[i].id == obj.querySelector('.botonM').dataset.id){
			obTomado = listProductos[i]
			break
		}
	}

	var info = '<h2 class="tituloP">'+obTomado.titulo+'</h2>'
	info += '<h4 class="precioP">'+obTomado.precio+'</h4>'
	info += '<div class="contImgP"><img class="imgP" src="'+obTomado.imgSrc+'" alt="..." ></img></div>'
	info += '<p class="descP">'+obTomado.descripcion+'</p>'

	var datosModal = document.getElementById("info")
	datosModal.innerHTML = info


}

const agregarCarrito = (e)=>{
	//console.log(e.target)
	//console.log(e.target.classList.contains('btn-primary'))
	/*if(e.target.classList.contains('addCarrito')){
		//console.log(e.target.parentElement)
		setCarrito(e.target.parentElement)
	}*/
	setCarrito(e.target.parentElement)
	e.stopPropagation()
}

const setCarrito = (obj)=>{
	const producto = {
		id: obj.querySelector('.botonM').dataset.id,
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



