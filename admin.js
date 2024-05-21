// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyClpiCP_JAv-POWoDr9yT70bp8PUcBg8uQ",
  authDomain: "fast-food-4209b.firebaseapp.com",
  projectId: "fast-food-4209b",
  storageBucket: "fast-food-4209b.appspot.com",
  messagingSenderId: "490750175837",
  appId: "1:490750175837:web:770d7a4f283f0a83ac3bb4",
  measurementId: "G-N9J3MFEZ8B"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

document.getElementById('form-produto').addEventListener('submit', adicionarProduto);

function adicionarProduto(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const preco = document.getElementById('preco').value;
    const produtoRef = db.ref('produtos').push();
    produtoRef.set({
        nome,
        descricao,
        preco
    }).then(() => {
        alert('Produto adicionado com sucesso!');
        document.getElementById('form-produto').reset();
    });
}

function carregarPedidos() {
    const pedidosRef = db.ref('pedidos');
    pedidosRef.on('value', (snapshot) => {
        const pedidos = snapshot.val();
        const listaPedidos = document.getElementById('lista-pedidos');
        listaPedidos.innerHTML = '';
        for (let id in pedidos) {
            const pedido = pedidos[id];
            const li = document.createElement('li');
            li.textContent = `Pedido de Produto ID: ${pedido.produtoId} - Observações: ${pedido.observacoes} - Status: ${pedido.status}`;
            listaPedidos.appendChild(li);
        }
    });
}

window.onload = carregarPedidos;