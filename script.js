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

function carregarProdutos() {
    const produtosRef = db.ref('produtos');
    produtosRef.on('value', (snapshot) => {
        const produtos = snapshot.val();
        const listaProdutos = document.getElementById('lista-produtos');
        listaProdutos.innerHTML = '';
        for (let id in produtos) {
            const produto = produtos[id];
            const li = document.createElement('li');
            li.textContent = produto.nome;
            li.onclick = () => window.location.href = `product.html?id=${id}`;
            listaProdutos.appendChild(li);
        }
    });
}

window.onload = carregarProdutos;