# Seminário III - Especificação de Requisitos

Neste documento estão mapeados os requisitos funcionais e não funcionais do projeto TutorFox, organizados por prioridade, com suas respectivas User Stories, estimativas em Story Points e critérios de aceitação.

---

## Requisitos Funcionais

### ID 01: Cadastro e Perfil
* **Prioridade:** Alta Prioridade
* **Estimativa:** 5 Story Points

> **User Story:** Como estudante, quero criar uma conta e perfil para salvar e acessar meus conteúdos de estudo de qualquer lugar.

---

### ID 02: Flashcards de Memorização
* **Prioridade:** Alta Prioridade
* **Estimativa:** 8 Story Points

> **User Story:** Como estudante, quero criar e praticar com decks de flashcards para facilitar a memorização ativa.

#### Critérios de Aceitação:
* **Critério 1:** O usuário deve conseguir criar um deck dando um título a ele.
* **Critério 2:** Cada card deve conter obrigatoriamente uma pergunta e uma resposta.
* **Critério 3:** Durante a prática, a resposta do card só deve ser revelada após o clique do usuário.

---

### ID 03: Gerador de Resumo Aristotélico
* **Prioridade:** Alta Prioridade
* **Estimativa:** 8 Story Points

> **User Story:** Como estudante, quero utilizar uma ferramenta guiada baseada no Método de Aristóteles (causas material, formal, eficiente e final) para aprofundar meu entendimento sobre os temas.

#### Critérios de Aceitação:
* **Critério 1:** A tela deve apresentar 4 campos de textos identificados: Causa Material, causa Formal, causa Eficiente e causa Final.
* **Critério 2:** O sistema deve disponibilizar um botão de ajuda/dica explicando o significado de cada causa.
* **Critério 3:** O usuário deve conseguir salvar o resumo gerado vinculando-o a uma matéria existente.

---

### ID 04: Central de Anexos
* **Prioridade:** Alta Prioridade
* **Estimativa:** 5 Story Points

> **User Story:** Como estudante, quero anexar conteúdos de aula (PDFs, fotos e links) diretamente em cada matéria para centralizar minhas referências.

---

### ID 06: Sistema de Revisão Espaçada
* **Prioridade:** Média Prioridade
* **Estimativa:** 13 Story Points

> **User Story:** Como estudante, quero que o sistema organize ciclos de revisão automática dos meus cards para que eu não esqueça o conteúdo a longo prazo.

---

### ID 07: Organização por Matérias
* **Prioridade:** Média Prioridade
* **Estimativa:** 3 Story Points

> **User Story:** Como estudante, quero organizar meus resumos e anexos em pastas por disciplina para manter o ambiente de estudo limpo.

---

### ID 08: Painel de Progresso
* **Prioridade:** Média Prioridade
* **Estimativa:** 5 Story Points

> **User Story:** Como estudante, quero ver estatísticas sobre meu desempenho (quantos cards estudei e quantos resumos fiz) para me manter motivado.

#### Critérios de Aceitação:
* **Critério 1:** O sistema deve apresentar uma tela de "Progresso" contendo contadores numéricos separados para o total de flashcards revisados e o total de resumos criados.
* **Critério 2:** Os dados de desempenho devem ser atualizados automaticamente na tela assim que o usuário concluir uma sessão de estudos ou salvar um novo resumo.
* **Critério 3:** Se o usuário ainda não tiver nenhum dado registrado, o painel deve exibir uma mensagem motivacional padrão em vez de uma tela em branco.

---

### ID 09: Cronômetro de Foco
* **Prioridade:** Baixa Prioridade
* **Estimativa:** 3 Story Points

> **User Story:** Como estudante, quero um timer integrado para gerenciar meus ciclos de estudo e descanso sem precisar sair do site.

---

### ID 10: Compartilhamento de Conteúdo
* **Prioridade:** Baixa Prioridade
* **Estimativa:** 5 Story Points

> **User Story:** Como estudante, quero poder enviar meus decks de flashcards para amigos para facilitar o estudo em grupo.

---

## Requisitos Não Funcionais

### ID 05: Interface Ágil e Responsiva
* **Prioridade:** Alta Prioridade
* **Estimativa:** 5 Story Points

> **User Story:** Como estudante, quero que o site seja rápido e funcione perfeitamente no celular para que eu consiga agilizar meus estudos em qualquer lugar.

---

### ID 11: Segurança e Privacidade (LGPD)
* **Prioridade:** Alta Prioridade
* **Estimativa:** 5 Story Points

> **User Story:** Quero que meus dados de cadastro e anotações sejam criptografados para garantir a privacidade dos meus estudos.

---

### ID 12: Disponibilidade e Escalabilidade
* **Prioridade:** Alta Prioridade
* **Estimativa:** 8 Story Points

> **User Story:** Quero que o site aguente muitos estudantes acessando ao mesmo tempo (especialmente em semana de provas) sem ficar lento ou cair.
