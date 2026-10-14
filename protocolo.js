// protocolo.js
// Dados do Protocolo de Transparência e Melhores Práticas (Mira, 2025, Figura 3).
// Cada dimensão tem um id, um nome e uma lista de critérios.
// Os textos ficam dentro de um objeto por idioma ({ pt: "..." }) para que,
// na etapa da tradução, basta acrescentar o campo "en" em cada item.

const protocolo = [
  {
    id: 1,
    nome: { pt: "Site" },
    criterios: [
      { id: "1.1", texto: { pt: "https" } },
      { id: "1.2", texto: { pt: "Objetivo" } },
      { id: "1.3", texto: { pt: "Escopo" } },
      { id: "1.4", texto: { pt: "Público-alvo" } },
      { id: "1.5", texto: { pt: "Tipos de manuscrito aceitos" } },
      { id: "1.6", texto: { pt: "Originalidade do manuscrito" } },
      { id: "1.7", texto: { pt: "Critérios de autoria" } },
      { id: "1.8", texto: { pt: "ISSN/e-ISSN" } },
      { id: "1.9", texto: { pt: "DOI" } },
      { id: "1.10", texto: { pt: "Cronograma" } },
      { id: "1.11", texto: { pt: "Política de preservação digital (backup)" } },
      { id: "1.12", texto: { pt: "Política de preservação digital (longo prazo)" } },
      { id: "1.13", texto: { pt: "Endereço do periódico" } },
      { id: "1.14", texto: { pt: "Equipe editorial" } },
      { id: "1.15", texto: { pt: "Todas as informações encontradas estão presentes no site do periódico" } }
    ]
  },
  {
    id: 2,
    nome: { pt: "Direitos autorais" },
    criterios: [
      { id: "2.1", texto: { pt: "Termo de direitos autorais de conteúdo" } },
      { id: "2.2", texto: { pt: "Detentor de direitos autorais no texto completo (html)" } },
      { id: "2.3", texto: { pt: "Detentor de direitos autorais no texto completo (pdf)" } },
      { id: "2.4", texto: { pt: "Facilidade em encontrar os termos de direitos autorais" } }
    ]
  },
  {
    id: 3,
    nome: { pt: "Licenciamento" },
    criterios: [
      { id: "3.1", texto: { pt: "Indicado no site" } },
      { id: "3.2", texto: { pt: "Indicado no texto completo (html)" } },
      { id: "3.3", texto: { pt: "Indicado no texto completo (pdf)" } },
      { id: "3.4", texto: { pt: "Se acesso aberto, indica licença aberta" } },
      { id: "3.5", texto: { pt: "Licenciamento sobre publicação dos manuscritos em repositórios de terceiros" } },
      { id: "3.6", texto: { pt: "Licenciamento consistente" } }
    ]
  },
  {
    id: 4,
    nome: { pt: "Ética de Publicação e políticas editoriais relacionadas" },
    criterios: [
      { id: "4.1", texto: { pt: "Autoria e contribuição" } },
      { id: "4.2", texto: { pt: "Reclamações e recursos" } },
      { id: "4.3", texto: { pt: "Má conduta em pesquisa" } },
      { id: "4.4", texto: { pt: "Conflitos de interesse" } },
      { id: "4.5", texto: { pt: "Compartilhamento e reprodutibilidade dos dados" } },
      { id: "4.6", texto: { pt: "Supervisão ética" } },
      { id: "4.7", texto: { pt: "Propriedade intelectual" } },
      { id: "4.8", texto: { pt: "Opções de discussões pós-publicação" } },
      { id: "4.9", texto: { pt: "Correções e retratações" } }
    ]
  },
  {
    id: 5,
    nome: { pt: "Revisão por Pares" },
    criterios: [
      { id: "5.1", texto: { pt: "Informa se o conteúdo é revisado ou não" } },
      { id: "5.2", texto: { pt: "Quem conduz a revisão por pares" } },
      { id: "5.3", texto: { pt: "Tipo de processo de revisão utilizado" } },
      { id: "5.4", texto: { pt: "Políticas relacionadas aos procedimentos de revisão" } },
      { id: "5.5", texto: { pt: "Informações sobre a tomada de decisão e quem está envolvido" } },
      { id: "5.6", texto: { pt: "Se houver exceções, são devidamente explicadas" } },
      { id: "5.7", texto: { pt: "Data de publicação" } },
      { id: "5.8", texto: { pt: "Datas de envio e aceitação" } }
    ]
  },
  {
    id: 6,
    nome: { pt: "Taxas do autor" },
    criterios: [
      { id: "6.1", texto: { pt: "Taxas claramente indicadas" } },
      { id: "6.2", texto: { pt: "Declara que as taxas ou isenções não influenciam a decisão editorial" } }
    ]
  }
];
