// ----- DEGRADADO DINÁMICO EN HEADER -----
const header = document.querySelector("header");

header.addEventListener("mousemove", (e) => {
    const rect = header.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    header.style.setProperty("--x", `${x}%`);
    header.style.setProperty("--y", `${y}%`);
});

// ----- CARRITO -----
const botonesAgregar = document.querySelectorAll(".btnAgregarCarrito");
const carrito = document.getElementById("carrito");
const btnVaciar = document.getElementById("btnVaciar");
const contador = document.getElementById("contador");
const totalElement = document.getElementById("total");
const btnCarrito = document.getElementById("btnCarrito");
const carritoDropdown = document.getElementById("carritoDropdown");

let total = 0;
let cantidad = 0;

// Mostrar/ocultar carrito
btnCarrito.addEventListener("click", () => {
    carritoDropdown.classList.toggle("d-none");
});

// Agregar producto al carrito
botonesAgregar.forEach((btn) => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".card");
        const nombre = card.querySelector(".card-title").textContent;
        const precio = parseInt(card.querySelector(".card-text").dataset.precio);

        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "nuevo-item");
        li.textContent = `${nombre} - $${precio} MXN`;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.classList.add("btn", "btn-sm", "btn-outline-danger");

        // Eliminar este producto
        btnEliminar.addEventListener("click", () => {
            li.remove();
            total -= precio;
            cantidad--;
            actualizarCarrito();
        });

        li.appendChild(btnEliminar);
        carrito.appendChild(li);

        total += precio;
        cantidad++;
        actualizarCarrito();
    });
});

// Vaciar carrito
btnVaciar.addEventListener("click", () => {
    carrito.innerHTML = "";
    total = 0;
    cantidad = 0;
    actualizarCarrito();
});

// Actualizar contador y total
function actualizarCarrito() {
    contador.textContent = cantidad;
    totalElement.textContent = `Total: $${total} MXN`;
}

