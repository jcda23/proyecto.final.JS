export async function fetchData(props) {
  let { url, cbSucces } = props;

  await fetch(url)
    .then((response) =>
      response.ok ? response.json() : Promise.reject(response)
    )
    .then((json) => cbSucces(json))
    .catch((error) => {
      let message = error.statusText || "Ocurrió un error al acceder a la API";

      document.getElementById("root").innerHTML = `
      <div class="error">
      <p>Error ${error.status} : ${message}</p>
      </div>`;

      console.log(error);
    });
}
/* const cartas = document.getElementById("root");
const fragment = document.createDocumentFragment();
export async function fetchData() {
  try {
    let response = await fetch("./app/api.json"),
      json = await response.json();

    if (!response.ok)
      throw { status: response.status, statusText: response.statusText };

    json.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `${item.precio} -- ${item.id} -- ${item.title}`;
      fragment.appendChild(li);
    });
    cartas.appendChild(fragment);
  } catch (error) {
    let message = error.statusText || "Ocurrió un error al acceder a la API";
    cartas.innerHTML = `<h1>Error ${error.status} : ${message}</h1>`;
    console.log(error);
  }
}
 */
/* export const fetchData = async () => {
  const res = await fetch("./app/api.json");
  const data = await res.json();
  console.log(data);
 // pintarCards(data); 
};
 */
