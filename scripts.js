// GET: Lista atual no servidor
const getList = async () => {
  let url = 'http://127.0.0.1:5000/listareportes';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.reportes.forEach(item => insertList(item.item, item.local, item.autor))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Caregamento inicial dos dados
getList()

// POST: Adicionar item na lista
const postItem = async (inputReporte, inputLocal, inputAutor) => {
  const formData = new FormData();
  formData.append('item', inputReporte);
  formData.append('local', inputLocal);
  formData.append('autor', inputAutor);

  let url = 'http://127.0.0.1:5000/reporte';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Botão de exclusão de itens
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

// Remover item apartir do botão de exclusão
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Deseja excluir esse item?")) {
        div.remove()
        deleteItem(nomeItem)
        
      }
    }
  }
}

// DELETE: Deleta item da lista
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/reporte?item=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}
// Função para adicionar item com os campos reporte, local e autor
const newItem = () => {
  let inputReporte = document.getElementById("newInput").value;
  let inputLocal = document.getElementById("newLocal").value;
  let inputAutor = document.getElementById("newAutor").value;

  if (inputReporte === '') {
    alert("Preencha todos os campos!");
  
  } else {
    insertList(inputReporte, inputLocal, inputAutor)
    postItem(inputReporte, inputLocal, inputAutor)
    alert("Reporte adicionado, agradecemos sua contribuição!")
  }
}

// Função para inserir itens na lista
const insertList = (itemReporte, local, autor) => {
  var item = [itemReporte, local, autor]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newInput").value = "";
  document.getElementById("newLocal").value = "";
  document.getElementById("newAutor").value = "";

  removeElement()
}