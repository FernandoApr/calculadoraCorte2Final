var total = '';
var punto = false;
var operacion = [];
var op = '';
var aux = '';
var resultadoM = false;

const capturar = ((valor) => {

    if (resultadoM && valor == '=') {
        return;
    }

    if (total.slice(-1) == '.') {
        punto = false
    } else {
        punto = contieneOperador(total);
    }

    if (((valor != ".") || punto) && (valor != "off" && valor != "ac")) {
        total += valor
        operation(valor)
    } else {
        if (valor == "off") {
            limpiarTodo();
            console.log("Boton off");
        }
        if (valor == "ac") {
            limpiar();
            console.log("Boton clear");
        }
    }
});

function operation(valor) {
    if (valor == '/' || valor == '*' || valor == '+' || valor == '-' || valor == '=') {
        if (valor == '=') {
            total = total.substring(0, total.length - 1)
            let a = eval(total)
            total = total + '= ' + a.toString();
            if (total != undefined && a != undefined) {
                operacion.push(total)
                op = "="
                total = a.toString();
                llenarTabla();
                console.log('Total ' + total)
                resultadoM = true;
            }
        }
        switch (valor) {
            case '/':
                aux = total
                op = '/'
                break;
            case '*':
                aux = total
                op = '*'
                break;
            case '+':
                aux = total
                op = '+'
                break;
            case '-':
                aux = total
                op = '-'
                break;
            case '=':

                break;
        }
    }
    setValorInput(total);
}

const llenarTabla = () => {

    limpiarTabla();
    const tabla = document.getElementById("tabla-resultados");
    let contenido = '';

    operacion.forEach(element => {
        contenido += `
          <tr>
            <td>${element}</td>
          </tr>
        `;
    });

    tabla.innerHTML += contenido;
}

const limpiarTabla = () => {

    const tabla = document.getElementById("tabla-resultados");
    const filas = tabla.getElementsByTagName("tr");
    while (filas.length > 1) {
        tabla.deleteRow(1);
    }

};

function setValorInput(value) {
    var input = document.getElementById("resultado");
    input.value = value;
}

function limpiarTodo() {
    resultadoM = false;
    total = ''
    aux = ''
    operacion = []
    limpiarTabla();
    setValorInput("");
}

function limpiar() {
    resultadoM = false;
    total = ''
    aux = ''
    setValorInput("");
}

function contieneOperador(cadena) {

    if (cadena.includes("+") || cadena.includes("-") || cadena.includes("*") || cadena.includes("/")) {
        if (cadena.includes(".")) {
            return true;
        } else {
            return false;
        }
    } else if (!cadena.includes(".")) {
        return true;
    } else {
        return false;
    }
}