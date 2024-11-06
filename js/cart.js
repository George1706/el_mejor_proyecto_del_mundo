const contenedorTarjetas = document.getElementById("productos-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");
const reiniciarElement = document.getElementById("reiniciar");

function crearTarjetasProductosInicio() {
  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("ropas"));
  console.log(productos);
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      const nuevaRopa = document.createElement("div");
      nuevaRopa.classList = "tarjeta-producto";
      nuevaRopa.innerHTML = `
            <img src="./src/public/img/${producto.id}.png">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <div>
                <button>-</button>
                <span class"cantidad">${producto.cantidad}</span>
                <button>+</button>
            </div>
       `;
      contenedorTarjetas.appendChild(nuevaRopa);
      nuevaRopa
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          const cuentaElement =
            e.target.parentElement.getElementsByTagName("span")[0];
          cuentaElement.innerText = agregarAlCarrito(producto);
          actualizarTotales();
        });
      nuevaRopa
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          restarAlCarrito(producto);
          crearTarjetasProductosInicio();
          actualizarTotales();
        });
    });
  }
}

crearTarjetasProductosInicio(ropa);
actualizarTotales();

function actualizarTotales(){
    const productos = JSON.parse(localStorage.getItem("ropas"));
    let unidades = 0;
    let precio = 0;
    if(productos && productos.length>0){
        productos.forEach(producto =>{
            unidades +=producto.cantidad;
            precio += producto.precio * producto.cantidad;
        })
        unidadesElement.innerText = unidades;
        precioElement.innerText = precio;

    }
}


function revisarMensajeVacio(){
    const productos = JSON.parse(localStorage.getItem("ropas"));
    carritoVacioElement.classList.toggle("escondido", productos && productos.length>0);
    totalesElement.classList.toggle("escondido",!(productos && productos.length>0));
}

revisarMensajeVacio();


reiniciarElement.addEventListener("click", reiniciarCarrito);
function reiniciarCarrito(){
    localStorage.removeItem("ropas");
    actualizarTotales();
    crearTarjetasProductosInicio();
}