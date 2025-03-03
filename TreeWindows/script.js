document.getElementById("run-code").addEventListener("click", () => {
  const userCode = document.getElementById("code-editor").value;
  const outputDiv = document.getElementById("tree-output");

  try {
    // Limpa a saída anterior
    outputDiv.innerHTML = "";

    // Cria uma função anônima e executa o código do usuário
    const result = new Function(userCode);
    const tree = result();

    // Renderiza a árvore no elemento de saída
    if (tree) {
      renderTree(tree, outputDiv);
    }
  } catch (error) {
    outputDiv.innerHTML = `<span style="color: red;">Erro: ${error.message}</span>`;
  }
});

function renderTree(tree, container) {
  const ul = document.createElement("ul");

  function buildTree(node, parentUl) {
    if (!node) return;

    const li = document.createElement("li");
    li.textContent = node.value || "Node";
    parentUl.appendChild(li);

    if (node.children && node.children.length > 0) {
      const childUl = document.createElement("ul");
      li.appendChild(childUl);
      node.children.forEach((child) => buildTree(child, childUl));
    }
  }

  buildTree(tree, ul);
  container.appendChild(ul);
}

document.getElementById("run-code").addEventListener("click", () => {
  const outputDiv = document.getElementById("tree-output");
  renderTree(root, outputDiv);
});
