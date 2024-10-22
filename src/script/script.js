const form = document.querySelector("#form")
const item = document.querySelector("#item")
const qnt = document.querySelector("#qnt")
const tipo = document.querySelector("#tipo")
const categoria = document.querySelector("#categoria")
const resultado = document.querySelector('.resultado')
const key = "@COMPRAS";
const listaCompras = JSON.parse(localStorage.getItem(key)) || []
const conclud = document.querySelector('.conclud')




form.addEventListener('submit', (e) => {
    e.preventDefault()
    const itemValue = item.value.trim()
    const qntValue = qnt.value.trim()
    const tipoValue = tipo.value.trim()
    const categoriaValue = categoria.value.trim()
    if (itemValue && qntValue && tipoValue && categoriaValue) {
        const item = {
            id: listaCompras.length,
            titulo: itemValue,
            qnt: qntValue,
            tipo: tipoValue,
            categoria: categoriaValue,
            concluido: false
        }
        salvarDados(item)
        mostrarResultado()
    } else {
        alert("Preencha todos os campos")
        return
    }

    form.reset()

})

const concluirItem = (id) => {
    const item = listaCompras.find(item => item.id == id)
    console.log(item)
    item.concluido = !item.concluido
    salvarDados()
    mostrarResultado()
}

const salvarDados = (dados) => {
    if (!dados) {
        localStorage.setItem(key, JSON.stringify(listaCompras))
        return
    }
    listaCompras.push(dados)
    localStorage.setItem(key, JSON.stringify(listaCompras))
}

const mostrarResultado = () => {
    resultado.innerHTML = ""
    if (!listaCompras.length) {
        resultado.innerHTML = "Nenhum item registrado";
        return
    }

    listaCompras.map(item => {
        resultado.innerHTML += `
            <div class="${item.concluido ? "card concluido" : "card"}">
            <div class="contentCard">
            <div class="conclud"
            onClick="concluirItem('${item.id}')"
            ></div>
            <div class="titleItem">
            <h2>${item.titulo}</h2>
            <span id="total">${item.qnt} ${item.tipo}</span>
            </div>
            </div>
            <div class="contentCard">
            <span>${item.categoria}</span>
            <button>:</button>
            </div>
            </div>
            `
    })

}
mostrarResultado()