// Obtendo os elementos necessários da página
const runButton = document.getElementById("run-code") as HTMLButtonElement;
const codeEditor = document.getElementById("code-editor") as HTMLTextAreaElement;
const outputDiv = document.getElementById("tree-output") as HTMLElement;

// Evento para executar o código inserido no editor
runButton.addEventListener("click", () => {
  const userCode = codeEditor.value;

  try {
    // Limpa a saída anterior
    outputDiv.innerHTML = "";

    // Executa o código do usuário, gerando a árvore
    const result = new Function(userCode);
    const tree = result();

    // Se uma árvore for gerada, renderiza-a
    if (tree) {
      renderTree(tree, outputDiv);
    } else {
      outputDiv.innerHTML = "A árvore não foi gerada corretamente.";
    }
  } catch (error) {
    outputDiv.innerHTML = `<span style="color: red;">Erro: ${(error as Error).message}</span>`;
  }
});

// Função para renderizar a árvore na tela
function renderTree(tree: any, container: HTMLElement): void {
  const ul = document.createElement("ul");

  function buildTree(node: any, parentUl: HTMLElement): void {
    if (!node) return;

    const li = document.createElement("li");
    li.textContent = node.value || "Node";
    parentUl.appendChild(li);

    if (node.children && node.children.length > 0) {
      const childUl = document.createElement("ul");
      li.appendChild(childUl);
      node.children.forEach((child: any) => buildTree(child, childUl));
    }
  }

  buildTree(tree, ul);
  container.appendChild(ul);
}
