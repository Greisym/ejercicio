// Cambia esta URL por tu endpoint de MockAPI para "productos"
const API_URL = "https://69d850170576c93882594f82.mockapi.io/productos";

// ==========================
// 🔹 GET - CONSULTAR PRODUCTOS
// ==========================
function obtenerProductos() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            let filas = data.map(p => `
        <tr>
          <td>${p.referencia}</td>
          <td>${p.nombre}</td>
          <td>$${p.precio}</td>
          <td>${p.stock}</td>
          <td>${p.estado ? 'Activo' : 'Inactivo'}</td>
          <td>
            <button onclick="editarProducto('${p.id}', '${p.referencia}', '${p.nombre}', ${p.precio}, ${p.stock}, ${p.estado})">Editar</button>
            <button onclick="eliminarProducto('${p.id}')">Eliminar</button>
          </td>
        </tr>
      `).join("");

            document.getElementById("tablaProductos").innerHTML = filas;
        });
}

// ==========================
// 🔹 POST - CREAR PRODUCTO
// ==========================
function crearProducto() {
    const producto = {
        referencia: document.getElementById("referencia").value,
        nombre: document.getElementById("nombre").value,
        precio: parseFloat(document.getElementById("precio").value),
        stock: parseInt(document.getElementById("stock").value),
        estado: document.getElementById("estado").value === "true"// true o false
    };

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
    })
    .then(() => {
        limpiar();
        obtenerProductos();
    });
}

// ==========================
// 🔹 PUT - EDITAR PRODUCTO
// ==========================
function editarProducto(id, refAct, nomAct, preAct, stoAct, estAct) {
    const nuevoNombre = prompt("Nuevo nombre:", nomAct);
    const nuevoPrecio = prompt("Nuevo precio:", preAct);
    const nuevoStock = prompt("Nuevo stock:", stoAct);

    if (nuevoNombre && nuevoPrecio) {
        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre: nuevoNombre,
                precio: parseFloat(nuevoPrecio),
                stock: parseInt(nuevoStock)
            })
        })
        .then(() => obtenerProductos());
    }
}

// ==========================
// 🔹 DELETE - ELIMINAR PRODUCTO
// ==========================
function eliminarProducto(id) {
    if(confirm("¿Estás seguro de eliminar este producto?")) {
        fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        })
        .then(() => obtenerProductos());
    }
}

function limpiar() {
    document.getElementById("referencia").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("estado").checked = false;
}

// Cargar al inicio
obtenerProductos();