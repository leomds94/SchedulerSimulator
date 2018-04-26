var processos = [];

//Chart

google.charts.load('current', { 'packages': ['timeline'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    $('#simularButton').click(function () {
        var container = document.getElementById('graficoProcessos');
        var chart = new google.visualization.Timeline(container);
        var dataTable = new google.visualization.DataTable();

        dataTable.addColumn({ type: 'string', id: 'Proccess' });
        dataTable.addColumn({ type: 'number', id: 'Start' });
        dataTable.addColumn({ type: 'number', id: 'End' });


        if (document.getElementById('selectTipo').value == "fifo") {
            fifo();
        }
        if (document.getElementById('selectTipo').value == "sjf") {
            sjf();
        }
        if (document.getElementById('selectTipo').value == "prio") {
            prio();
        }
        if (document.getElementById('selectTipo').value == "rr") {
            ts = prompt("Qual time slice você quer definir para seus processos?");
            roundrobin();
        }
        if (document.getElementById('selectTipo').value == "srtn") {
            srtn();
        }
        if (document.getElementById('selectTipo').value == "priopreem") {
            priopreem();
        }

        dataTable.addRows(processos);

        var options = {
            timeline: { colorByRowLabel: true }
        };

        chart.draw(dataTable);
    });
}