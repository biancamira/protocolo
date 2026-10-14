// calculo.js
// Cálculo do CAI. Este arquivo não mexe na página (não usa document):
// recebe os critérios marcados e devolve números. Assim dá para testá-lo isoladamente.

// "marcados" é uma lista com os ids dos critérios presentes, por exemplo ["1.1", "1.2", "3.4"].
function calcularResultado(marcados) {
  let totalPresentes = 0;   // acumulador de critérios presentes (todas as dimensões)
  let totalCriterios = 0;   // acumulador do total de critérios
  const porDimensao = [];   // resultado de cada dimensão
  const ausentes = [];      // ids dos critérios não marcados

  // Laço externo: percorre as dimensões.
  protocolo.forEach(function (dimensao) {
    let presentes = 0;

    // Laço interno: percorre os critérios da dimensão.
    dimensao.criterios.forEach(function (criterio) {
      if (marcados.includes(criterio.id)) {
        presentes++;
      } else {
        ausentes.push(criterio.id);
      }
    });

    const total = dimensao.criterios.length;
    porDimensao.push({
      id: dimensao.id,
      presentes: presentes,
      total: total,
      cai: presentes / total
    });

    totalPresentes += presentes;
    totalCriterios += total;
  });

  return {
    presentes: totalPresentes,
    total: totalCriterios,
    cai: totalPresentes / totalCriterios,
    porDimensao: porDimensao,
    ausentes: ausentes
  };
}
