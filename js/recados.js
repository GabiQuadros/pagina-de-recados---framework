const myModal = new bootstrap.Modal("#modalRecados");
let logado = sessionStorage.getItem("logado");
const sessao = localStorage.getItem("sessao");
let form = document.getElementById("tbody");
let data = {
  recados: [],
};

document.getElementById("btnsair").addEventListener("click", sair);

window.addEventListener("load", mostrarRecado);

//ADICIONAR RECADO
document
  .getElementById("input-recados")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const data = JSON.parse(localStorage.getItem(logado));
    const description = document.getElementById("description-input").value;
    const detailing = document.getElementById("detailing-input").value;

    if (!description || description.length < 3) {
      alert("Descrição inválida, mínimo de 3 caracteres!");
      return;
    }
    if (!detailing || detailing.length < 3) {
      alert("Descrição inválida");
      return;
    }

    data.recados.push({
      id: Math.floor(Date.now() / 1000),
      description: description,
      detailing: detailing,
    });

    salvarRecados(data);
    e.target.reset();
    myModal.hide();

    alert("Recado adicionado com sucesso!!");
    mostrarRecado();
  });

permanecerLogado();

function permanecerLogado() {
  if (sessao) {
    sessionStorage.setItem("logado", sessao);
    logado = sessao;
  }
  if (!logado) {
    window.location.href = "index.html";
    return;
  }

  const dadosUsuario = localStorage.getItem(logado);
  if (dadosUsuario) {
    data = JSON.parse(dadosUsuario);
  }
  mostrarRecado();
}

function sair() {
  sessionStorage.removeItem("logado");
  localStorage.removeItem("sessao");

  window.location.href = "index.html";
}

function salvarRecados(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
  sessionStorage.setItem(logado, JSON.stringify(data));
}

function mostrarRecado() {
  const data = JSON.parse(localStorage.getItem(logado));
  //console.log(data);

  form.innerHTML = ``;
  let numero = 1;

  for (const recad of data.recados) {
    form.innerHTML += `
  <tr>
   <th scope="row">${numero}</th>
   <td class="text-break">${recad.description}</td>
    <td class="text-break">${recad.detailing}</td>
   <td>
      <input onclick="apagarRecado(${recad.id})" type="submit" value="apagar" class="submit" id="btnapagar" />
      <input onclick="editarModal(${recad.id})" type="submit" value="editar" class="submit" id="btneditar" />
   </td>
  </tr>`;
    numero++;
  }
}

function editarModal(id) {
  const btnEditar = document.getElementById("btnEdit");
  btnEditar.addEventListener("click", () => {
    editarRecado(id);
  });
  myModalEdit.show();
}

//apagar recado
function apagarRecado(id) {
  const data = JSON.parse(localStorage.getItem(logado));

  const recadoDelet = data.recados.findIndex((recados) => recados.id === id);
  if (recadoDelet < 0) {
    return;
  }
  confirm(`Deseja excluir o recado?`);
  data.recados.splice(recadoDelet, 1);
  localStorage.setItem(logado, JSON.stringify(data));
  sessionStorage.setItem(logado, JSON.stringify(data));
  mostrarRecado();
}

//editar recado
const myModalEdit = new bootstrap.Modal("#modalRecadosEdit");

function editarRecado(id) {
  const data = JSON.parse(localStorage.getItem(logado));

  const descriptionEdit = document.getElementById(
    "description-input-Edit"
  ).value;
  const detailingEdit = document.getElementById("detailing-input-Edit").value;
  console.log(descriptionEdit);
  console.log(detailingEdit);
  const recadoEditado = data.recados.findIndex((recados) => recados.id === id);

  data.recados[recadoEditado].description = descriptionEdit;
  data.recados[recadoEditado].detailing = detailingEdit;

  localStorage.setItem(logado, JSON.stringify(data));
  sessionStorage.setItem(logado, JSON.stringify(data));

  myModalEdit.hide();
  mostrarRecado();
}
