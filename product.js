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

function getProdutoId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function carregarDetalhesProduto() {
    const produtoId = getProdutoId();
    const produtoRef = db.ref(`produtos/${produtoId}`);
    produtoRef.on('value', (snapshot) => {
        const produto = snapshot.val();
        document.getElementById('produto-nome').textContent = produto.nome;
        document.getElementById('produto-descricao').textContent = produto.descricao;
        document.getElementById('produto-preco').textContent = `Preço: R$ ${produto.preco}`;
    });
}

function fazerPedido() {
    const produtoId = getProdutoId();
    const observacoes = document.getElementById('observacoes').value;
    const pedidoRef = db.ref('pedidos').push();
    pedidoRef.set({
        produtoId,
        observacoes,
        status: 'Pendente'
    }).then(() => {
        alert('Pedido realizado com sucesso!');
    });
}

window.onload = carregarDetalhesProduto;