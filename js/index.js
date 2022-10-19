const myModal = new bootstrap.Modal("#register-modal");
let logado = sessionStorage.getItem("logado");
const sessao = localStorage.getItem("sessao");

permanecerLogado();
//FAZER LOGIN
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  const checkedd = document.getElementById("checkedd").checked;

  const conta = buscarConta(email);

  //VALIDAÇÕES DE EMAIL,SENHA
  if (!conta) {
    alert("Verifique o e-mail ou a senha");
    return;
  }
  if (conta) {
    if (conta.password !== password) {
      alert("Verifique o e-mail ou a senha");
      return;
    }

    salvarSessao(email, checkedd);
    window.location.href = "recados.html";
  }
});

//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("user").value;
  const password = document.getElementById("password").value;
  const passwordconfirm = document.getElementById("passwordrepeat").value;
  console.log(email, password);

  //VALIDAÇÕES DE EMAIL,SENHA E CONFIRMAÇÃO
  if (email.length < 5) {
    alert("Insira um e-mail vállido");
    return;
  }
  if (password.length < 4) {
    alert("A senha precisa ter 4 dígitos");
    return;
  }

  if (passwordconfirm !== password) {
    alert("As senhas não coincidem! Tente novamente!");
    return;
  }

  //SALVA A CONTA E OS DADOS DO USUARIO NO LOCAL STORAGE
  salvarConta({
    login: email,
    password: password,
    recados: [],
  });
  myModal.hide();
  alert("Conta criada com sucesso");
});

function permanecerLogado() {
  if (sessao) {
    sessionStorage.setItem("logado", sessao);
    logado = sessao;
  }
  if (logado) {
    salvarSessao(logado, sessao);
    window.location.href = "recados.html";
  }
}

function salvarConta(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}

function salvarSessao(data, salvarSessao) {
  if (salvarSessao) {
    localStorage.setItem("sessao", data);
  }
  sessionStorage.setItem("logado", data);
}

//VERIFICA SE TEM CONTA CRIADA
function buscarConta(key) {
  const conta = localStorage.getItem(key);

  if (conta) {
    return JSON.parse(conta);
  }
  return "";
}

function saveData(email) {
  localStorage.setItem("data", email);
}
