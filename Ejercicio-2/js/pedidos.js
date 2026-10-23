const pedidos = [];
let precioMaximoActivo = null;

const form = document.getElementById("form-pedido");
const inputProducto = document.getElementById("producto");
const inputPrecio = document.getElementById("precio");
const inputCantidad = document.getElementById("cantidad");
const inputPrecioMaximo = document.getElementById("precio-maximo");
const btnFiltrar = document.getElementById("btn-filtrar");
const btnMostrarTodos = document.getElementById("btn-mostrar-todos");
const btnLimpiar = document.getElementById("btn-limpiar");
const tbody = document.getElementById("tabla-pedidos");
const spanUnidades = document.getElementById("total-unidades");
const spanMonto = document.getElementById("monto-total");

const crearPedido = (producto, precio, cantidad) => ({ producto, precio, cantidad });

const calcularSubtotal = (pedido) => pedido.precio * pedido.cantidad;

const filtrarPorPrecioMaximo = (lista, maximo) =>
  lista.filter((pedido) => pedido.precio <= maximo);

const obtenerPedidosVisibles = () =>
  precioMaximoActivo === null
    ? pedidos
    : filtrarPorPrecioMaximo(pedidos, precioMaximoActivo);

const calcularTotalUnidades = (lista) =>
  lista.reduce((acumulado, pedido) => acumulado + pedido.cantidad, 0);

const calcularMontoTotal = (lista) =>
  lista.reduce((acumulado, pedido) => acumulado + calcularSubtotal(pedido), 0);

const formatearDinero = (valor) => `$${valor.toFixed(2)}`;

const escaparHTML = (texto) =>
  texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const validarPedido = (productoTexto, precioTexto, cantidadTexto) => {
  const precio = Number(precioTexto);
  const cantidad = Number(cantidadTexto);

  return {
    producto:
      productoTexto.trim() === "" ? "El nombre del producto es obligatorio." : null,
    precio:
      precioTexto.trim() === "" || Number.isNaN(precio) || precio <= 0
        ? "El precio debe ser un número mayor que cero."
        : null,
    cantidad:
      cantidadTexto.trim() === "" || !Number.isInteger(cantidad) || cantidad <= 0
        ? "La cantidad debe ser un número entero positivo."
        : null,
  };
};

const hayErrores = (errores) => Object.values(errores).some((e) => e !== null);

const validarPrecioMaximo = (texto) => {
  const valor = Number(texto);
  return texto.trim() === "" || Number.isNaN(valor) || valor < 0
    ? "Ingresa un precio máximo válido (0 o mayor)."
    : null;
};

const mostrarError = (input, idError, mensaje) => {
  const contenedor = document.getElementById(idError);
  contenedor.textContent = mensaje ?? "";
  input.classList.toggle("is-invalid", mensaje !== null);
};

const mostrarErroresFormulario = (errores) => {
  mostrarError(inputProducto, "error-producto", errores.producto);
  mostrarError(inputPrecio, "error-precio", errores.precio);
  mostrarError(inputCantidad, "error-cantidad", errores.cantidad);
};

const crearFilaHTML = (pedido) => `
  <tr>
    <td>${escaparHTML(pedido.producto)}</td>
    <td class="text-end">${formatearDinero(pedido.precio)}</td>
    <td class="text-end">${pedido.cantidad}</td>
    <td class="text-end">${formatearDinero(calcularSubtotal(pedido))}</td>
  </tr>`;

const FILA_VACIA_HTML = `
  <tr class="fila-vacia">
    <td colspan="4" class="text-center text-muted py-4">No hay pedidos para mostrar</td>
  </tr>`;

const renderizarTabla = (lista) => {
  tbody.innerHTML =
    lista.length === 0 ? FILA_VACIA_HTML : lista.map(crearFilaHTML).join("");
};

const renderizarTotales = (lista) => {
  spanUnidades.textContent = calcularTotalUnidades(lista);
  spanMonto.textContent = formatearDinero(calcularMontoTotal(lista));
};

const actualizarVista = () => {
  const visibles = obtenerPedidosVisibles();
  renderizarTabla(visibles);
  renderizarTotales(visibles);
};

const manejarAgregarPedido = (evento) => {
  evento.preventDefault();

  const errores = validarPedido(
    inputProducto.value,
    inputPrecio.value,
    inputCantidad.value
  );
  mostrarErroresFormulario(errores);
  if (hayErrores(errores)) return;

  pedidos.push(
    crearPedido(
      inputProducto.value.trim(),
      Number(inputPrecio.value),
      Number(inputCantidad.value)
    )
  );

  form.reset();
  inputProducto.focus();
  actualizarVista();
};

const manejarFiltrar = () => {
  const mensaje = validarPrecioMaximo(inputPrecioMaximo.value);
  mostrarError(inputPrecioMaximo, "error-filtro", mensaje);
  if (mensaje !== null) return;

  precioMaximoActivo = Number(inputPrecioMaximo.value);
  actualizarVista();
};

const manejarMostrarTodos = () => {
  precioMaximoActivo = null;
  inputPrecioMaximo.value = "";
  mostrarError(inputPrecioMaximo, "error-filtro", null);
  actualizarVista();
};

const manejarLimpiar = () => {
  pedidos.length = 0;
  manejarMostrarTodos();
};

const quitarErrorAlEscribir = (input) =>
  input.addEventListener("input", () => input.classList.remove("is-invalid"));

form.addEventListener("submit", manejarAgregarPedido);
btnFiltrar.addEventListener("click", manejarFiltrar);
btnMostrarTodos.addEventListener("click", manejarMostrarTodos);
btnLimpiar.addEventListener("click", manejarLimpiar);

[inputProducto, inputPrecio, inputCantidad, inputPrecioMaximo].forEach(
  quitarErrorAlEscribir
);

actualizarVista();