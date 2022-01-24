var dados = []

function ApagaRegistro(id) {
    let _confirm = confirm("Deseja realmente excluir esse registro?")

    if (_confirm) {
        for (let i = 0; i < dados.length; i++) {
            if (dados[i].ID == id) {
                dados.splice(i, 1)
            }
        }

        PopulaTabela()
    }
}

function EditaRegistro(id) {
    $("#modalRegistro").modal("show")

    dados.forEach(function (item) {
        if (item.ID == id) {
            $("#hdID").val(item.ID)
            $("#txtNome").val(item.Nome)
            $("#txtTelefone").val(item.Contato)
            $("#txtDtNascimento").val(item.DtNascimento.substr(6, 4) + "-" + item.DtNascimento.substr(3, 2) + "-" + item.DtNascimento.substr(0, 2))
            $("#txtEmail").val(item.Email)
        }
    })
}

function PopulaTabela() {
    if (Array.isArray(dados)) {

        localStorage.setItem("__dados__", JSON.stringify(dados))

        $("#tblDados tbody").html("")

        dados.forEach(function (item) {
            //TEMPLATE STRING
            $("#tblDados tbody").append(`<tr>
                <td>${item.ID}</td>
                <td>${item.Nome}</td>
                <td>${item.Contato}</td>
                <td>${item.DtNascimento}</td>
                <td>${item.Email}</td>
                <td><button type="Button" Class="btn btn-primary"onclick="javascript:EditaRegistro(${item.ID});"><i class="fas fa-edit"></i></button></td>
                <td><button type="Button" Class="btn btn-danger" onclick="javascript:ApagaRegistro(${item.ID});"><i class="fas fa-trash-alt"></i></button></td>
            </tr>`)
        })
    }
}

$(function () {
    //EXECUTA AO CARREGAR DA TELA
    dados = JSON.parse(localStorage.getItem("__dados__")) ?? []//REVER ESSA ULTIMA EXPRESSÃO.

    if (dados) {
        PopulaTabela()
    }

    //var mydata = JSON.parse(dataBase);

    $("#btnSalvar").click(function () {
        //EVENTO CLICK DO BOTÃO SALVAR

        let _id = $("#hdID").val()
        let Nome = $("#txtNome").val()
        let Contato = $("#txtTelefone").val()
        let DtNascimento = new Date($("#txtDtNascimento").val()).toLocaleDateString("pt-Br", { timeZone: "UTC" })
        let Email = $("#txtEmail").val()


        if (!_id || _id == "0") {

            let registro = {}
            registro.Nome = Nome
            registro.Contato = Contato
            registro.DtNascimento = DtNascimento
            registro.Email = Email

            registro.ID = dados.length + 1

            dados.push(registro)
        }
        else {
            dados.forEach(function (item) {
                if (item.ID == _id) {
                    item.Nome = Nome
                    item.Contato = Contato
                    item.DtNascimento = DtNascimento
                    item.Email = Email
                }
            })
        }

        alert("Registro salvo com Sucesso")
        $("#modalRegistro").modal("hide")


        //Evento para limpar dados em modal
        $("#hdID").val("0")
        $("#txtNome").val("")
        $("#txtTelefone").val("")
        $("#txtDtNascimento").val("")
        $("#txtEmail").val("")

        PopulaTabela()
    })

})