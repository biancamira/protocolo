// script.js
// Etapa 1: troca de abas. Etapas 2-5: aba CAI, protocolo com checkboxes e relatório.

// ---------------------------------------------------------------
// 1. TROCA DE ABAS
// ---------------------------------------------------------------
const botoes = document.querySelectorAll(".botao-aba");
const abas = document.querySelectorAll(".aba");

function mostrarAba(nomeDaAba) {
  abas.forEach(function (aba) {
    if (aba.id === nomeDaAba) {
      aba.classList.add("visivel");
    } else {
      aba.classList.remove("visivel");
    }
  });

  botoes.forEach(function (botao) {
    if (botao.dataset.aba === nomeDaAba) {
      botao.classList.add("ativa");
    } else {
      botao.classList.remove("ativa");
    }
  });
}

botoes.forEach(function (botao) {
  botao.addEventListener("click", function () {
    mostrarAba(botao.dataset.aba);
  });
});

// ---------------------------------------------------------------
// 2. ABA CAI: tabela de dimensões montada a partir dos dados
// ---------------------------------------------------------------
function montarTabelaDimensoes() {
  const corpo = document.getElementById("corpo-tabela-dimensoes");
  let total = 0;

  protocolo.forEach(function (dimensao) {
    const linha = document.createElement("tr");
    linha.innerHTML =
      "<td>" + dimensao.id + "</td>" +
      "<td>" + dimensao.nome.pt + "</td>" +
      "<td>" + dimensao.criterios.length + "</td>";
    corpo.appendChild(linha);
    total += dimensao.criterios.length;
  });

  const linhaTotal = document.createElement("tr");
  linhaTotal.className = "linha-total";
  linhaTotal.innerHTML = "<td colspan='2'>Total</td><td>" + total + "</td>";
  corpo.appendChild(linhaTotal);
}

// ---------------------------------------------------------------
// 3. ABA PROTOCOLO: cria os checkboxes a partir dos dados
// ---------------------------------------------------------------
function montarProtocolo() {
  const lista = document.getElementById("lista-protocolo");

  protocolo.forEach(function (dimensao) {
    const grupo = document.createElement("fieldset");
    grupo.className = "dimensao";

    const legenda = document.createElement("legend");
    legenda.textContent = dimensao.id + ". " + dimensao.nome.pt;
    grupo.appendChild(legenda);

    dimensao.criterios.forEach(function (criterio) {
      const rotulo = document.createElement("label");
      rotulo.className = "criterio";

      const caixa = document.createElement("input");
      caixa.type = "checkbox";
      caixa.name = "criterio";
      caixa.value = criterio.id;

      rotulo.appendChild(caixa);
      rotulo.appendChild(document.createTextNode(" " + criterio.id + " " + criterio.texto.pt));
      grupo.appendChild(rotulo);
    });

    lista.appendChild(grupo);
  });
}

// Lê quais checkboxes estão marcados e devolve a lista de ids.
function lerMarcados() {
  const caixas = document.querySelectorAll("input[name='criterio']:checked");
  const ids = [];
  caixas.forEach(function (caixa) {
    ids.push(caixa.value);
  });
  return ids;
}

// ---------------------------------------------------------------
// 4. RELATÓRIO
// ---------------------------------------------------------------
function formatarCAI(valor) {
  return valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatarPercentual(valor) {
  return (valor * 100).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "%";
}

// Cria um elemento com texto e classe (evita repetir código).
// Usa textContent, que trata o texto como texto puro (seguro para o nome digitado).
function criar(tag, texto, classe) {
  const elemento = document.createElement(tag);
  if (texto) {
    elemento.textContent = texto;
  }
  if (classe) {
    elemento.className = classe;
  }
  return elemento;
}

function criarBarra(proporcao) {
  const barra = criar("div", "", "barra");
  const preenchimento = criar("div", "", "barra-preenchida");
  preenchimento.style.width = (proporcao * 100) + "%";
  barra.appendChild(preenchimento);
  return barra;
}

function nomeDaDimensao(id) {
  let nome = "";
  protocolo.forEach(function (dimensao) {
    if (dimensao.id === id) {
      nome = dimensao.nome.pt;
    }
  });
  return nome;
}

function textoDoCriterio(id) {
  let texto = "";
  protocolo.forEach(function (dimensao) {
    dimensao.criterios.forEach(function (criterio) {
      if (criterio.id === id) {
        texto = criterio.texto.pt;
      }
    });
  });
  return texto;
}

function mostrarRelatorio(nomeRevista, resultado) {
  const relatorio = document.getElementById("relatorio");
  relatorio.innerHTML = "";

  relatorio.appendChild(criar("h3", "Relatório de transparência"));
  relatorio.appendChild(criar("p", "Periódico: " + nomeRevista, "destaque"));
  relatorio.appendChild(criar("p", "Data da análise: " + new Date().toLocaleDateString("pt-BR")));

  // CAI total
  const caixaTotal = criar("div", "", "resultado-total");
  caixaTotal.appendChild(criar("p", "CAI total: " + formatarCAI(resultado.cai) + " (" + formatarPercentual(resultado.cai) + ")", "numero-grande"));
  caixaTotal.appendChild(criar("p", resultado.presentes + " de " + resultado.total + " critérios presentes"));
  caixaTotal.appendChild(criarBarra(resultado.cai));
  relatorio.appendChild(caixaTotal);

  // CAI por dimensão
  relatorio.appendChild(criar("h4", "CAI por dimensão"));
  const tabela = criar("table", "", "tabela");
  const cabecalho = document.createElement("thead");
  cabecalho.innerHTML = "<tr><th>Dimensão</th><th>Presentes</th><th>CAI</th><th>%</th><th></th></tr>";
  tabela.appendChild(cabecalho);

  const corpo = document.createElement("tbody");
  resultado.porDimensao.forEach(function (d) {
    const linha = document.createElement("tr");
    linha.appendChild(criar("td", d.id + ". " + nomeDaDimensao(d.id)));
    linha.appendChild(criar("td", d.presentes + " de " + d.total));
    linha.appendChild(criar("td", formatarCAI(d.cai)));
    linha.appendChild(criar("td", formatarPercentual(d.cai)));
    const celulaBarra = document.createElement("td");
    celulaBarra.appendChild(criarBarra(d.cai));
    linha.appendChild(celulaBarra);
    corpo.appendChild(linha);
  });
  tabela.appendChild(corpo);
  relatorio.appendChild(tabela);

  // Critérios ausentes
  relatorio.appendChild(criar("h4", "Critérios ausentes"));
  if (resultado.ausentes.length === 0) {
    relatorio.appendChild(criar("p", "Todos os critérios estão presentes."));
  } else {
    const ul = document.createElement("ul");
    resultado.ausentes.forEach(function (id) {
      ul.appendChild(criar("li", id + " " + textoDoCriterio(id)));
    });
    relatorio.appendChild(ul);
  }

  // Botão de imprimir / salvar como PDF
  const acoes = criar("div", "", "acoes acoes-relatorio");
  const botaoImprimir = criar("button", "Imprimir ou salvar em PDF", "botao-secundario");
  botaoImprimir.type = "button";
  botaoImprimir.addEventListener("click", function () {
    window.print();
  });
  acoes.appendChild(botaoImprimir);
  relatorio.appendChild(acoes);

  relatorio.hidden = false;
  relatorio.scrollIntoView({ behavior: "smooth" });
}

// ---------------------------------------------------------------
// 5. FORMULÁRIO: enviar e limpar
// ---------------------------------------------------------------
const formulario = document.getElementById("form-protocolo");
const campoNome = document.getElementById("nome-revista");
const erroNome = document.getElementById("erro-nome");
const relatorioEl = document.getElementById("relatorio");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // impede a página de recarregar

  const nome = campoNome.value.trim();
  if (nome === "") {
    erroNome.hidden = false;
    campoNome.focus();
    return;
  }
  erroNome.hidden = true;

  const resultado = calcularResultado(lerMarcados());
  mostrarRelatorio(nome, resultado);
});

formulario.addEventListener("reset", function () {
  erroNome.hidden = true;
  relatorioEl.hidden = true;
  relatorioEl.innerHTML = "";
});

// ---------------------------------------------------------------
// 6. INÍCIO: monta o que depende dos dados
// ---------------------------------------------------------------
montarTabelaDimensoes();
montarProtocolo();
