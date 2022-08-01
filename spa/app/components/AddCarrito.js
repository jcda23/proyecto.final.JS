const items = document.getElementById("items");
const footer = document.getElementById("footer");
const templateFooter = document.getElementById("template__footer").content;
const templateCar = document.getElementById("template__car").content;
const fragment = document.createDocumentFragment();

export let shopCar = {};
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    shopCar = JSON.parse(localStorage.getItem("carrito"));
    PaintCarrito();
  }
});

export const addCarrito = (e) => {
  //console.log(e.target);
  //console.log(e.target.classList.contains("btn-dark"));
  if (e.target.classList.contains("more")) {
    btnSelect(e);
  }
  if (e.target.classList.contains("less")) {
    btnSelect(e);
  }

  if (e.target.classList.contains("empty__car")) {
    shopCar = {};
    PaintCarrito();
  }
  if (e.target.classList.contains("btn-buy")) {
    getCarrito(e.target.parentElement);

    document.getElementById("alerta").classList.add("active");
    setTimeout(() => {
      document.getElementById("alerta").classList.remove("active");
    }, 2000);
  }
  e.stopPropagation();
};

const getCarrito = (data) => {
  //console.log(data);
  let product = {
    id: data.querySelector(".btn-buy").dataset.id,
    title: data.querySelector(".title__card").textContent,
    precio: data.querySelector(".price__card").textContent,
    thumbnailUrl: data.querySelector("img").getAttribute("src"),
    cantidad: 1,
  };
  if (shopCar.hasOwnProperty(product.id)) {
    product.cantidad = shopCar[product.id].cantidad + 1;
    alert("El producto ya está en el carrito");
  }

  shopCar[product.id] = { ...product };
  PaintCarrito();
  console.log(product);
};

export function PaintCarrito() {
  items.innerHTML = "";
  Object.values(shopCar).forEach((product) => {
    templateCar.querySelector("th").textContent = product.id;
    templateCar.querySelector("img").setAttribute("src", product.thumbnailUrl);
    templateCar.querySelectorAll("td")[1].textContent = product.title;
    templateCar.querySelectorAll("td")[2].textContent = product.cantidad;
    templateCar.querySelector("span").textContent =
      product.cantidad * product.precio;
    //botones
    templateCar.querySelector(".btn-info").dataset.id = product.id;
    templateCar.querySelector(".btn-danger").dataset.id = product.id;

    const clone = templateCar.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);

  PaintFooter();
  localStorage.setItem("carrito", JSON.stringify(shopCar));
}

function PaintFooter() {
  footer.innerHTML = "";
  if (Object.keys(shopCar).length === 0) {
    footer.innerHTML = `<th scope="row" colspan="6">Carrito vacío</th>`;
    return;
  }
  const nCantidad = Object.values(shopCar).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );

  const nprecio = Object.values(shopCar).reduce(
    (acc, { cantidad, precio }) => acc + cantidad * precio,
    0
  );

  /*  templateFooter.querySelectorAll("td")[0].textContent = nCantidad; */
  templateFooter.querySelector("span").textContent = nprecio;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

  //console.log(nCantidad);
  setTimeout(() => {
    document.getElementById(
      "panel__carBuy"
    ).innerHTML = `<a id="cart" class="cart" href="./carrito.html"><i class="fas fa-shopping-cart"><i><span id="cart_menu_num"
          data-action="cart-can" class="badge rounded-circle">${nCantidad}</span></a>`;
  }, 100);
}

const btnSelect = (e) => {
  // console.log(e.target.classList.contains('btn-info'))
  if (e.target.classList.contains("btn-info")) {
    const producto = shopCar[e.target.dataset.id];
    producto.cantidad++;
    shopCar[e.target.dataset.id] = { ...producto };
    PaintCarrito();
  }

  if (e.target.classList.contains("btn-danger")) {
    const producto = shopCar[e.target.dataset.id];
    producto.cantidad--;
    if (producto.cantidad === 0) {
      delete shopCar[e.target.dataset.id];
    } else {
      shopCar[e.target.dataset.id] = { ...producto };
    }
    PaintCarrito();
  }
  e.stopPropagation();
};
