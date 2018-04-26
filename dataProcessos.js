//Input

var counter = 2;
var tEspera = [];
var horaTermino = [];
var tChegadas = [];
var tDuracoes = [];
var nomeProcesso = [];
var prioridades = [];
var timeslice;

$(document).ready(function () {

    $("#addButton").click(function () {

        if (counter > 5) {
            alert("Apenas até 6 Processos são aceitos");
            return false;
        }

        var novoProcessoDiv = $(document.createElement('div'))
            .attr("id", 'ProcessoDiv' + counter);

        novoProcessoDiv.after().html(
            '<label>Processo ' + String.fromCharCode(65 + counter - 1) + ' : </label>' +
            '<div class="input-group">' +
            '<div class="col-xs-2">' +
            '<label>Tempo de Chegada</label>' +
            '<input id="tChegada' + counter + '" class="form-control" name="tChegada' + counter + '" type="number">' +
            '</div>' +
            '<div class="col-xs-2">' +
            '<label>Tempo de Duração</label>' +
            '<input id="tDuracao' + counter + '" class="form-control" name="tDuracao' + counter + '" type="number">' +
            '</div>' +
            '<div class="col-xs-2">' +
            '<label>Prioridade</label>' +
            '<input id="priori' + counter + '" class="form-control" name="priori' + counter + '" type="number">' +
            '</div>' +
            '</div></br>');
        novoProcessoDiv.appendTo("#TextBoxesGroup");
        counter++;
    });

    $("#removeButton").click(function () {
        if (counter == 2) {
            alert("Não há mais processos a serem excluídos. O mínimo de processos a serem executados é 1.");
            return false;
        }

        counter--;

        $("#ProcessoDiv" + counter).remove();

    });
});