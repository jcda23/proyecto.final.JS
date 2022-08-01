import { MenuHamburguer } from "./HamburguerMenu.js";
import { Logo } from "./Logo.js";
import { Menu } from "./Menu.js";

export function Header() {
  const $header = document.createElement("header");
  $header.classList.add("header");
  $header.appendChild(Logo());
  $header.appendChild(Menu());

  /*   const $stylos = document.createElement("style");
  $stylos.innerHTML = `

:root {
  --main-font: sans-serif;
    --header-height: 5rem;
  --main-color: #501464;
}



  .header__container {
  display: flex;
  height: var(--header-height);
  max-width: 100%;
  width: 100%;
  background-color: var(--main-color);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;

}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  max-width: 100%;
  margin: auto;
  min-width: 1200px;
}

.header>* {
  margin: auto 1rem;
} `;

  document.head.appendChild($stylos); */

  return $header;
}
