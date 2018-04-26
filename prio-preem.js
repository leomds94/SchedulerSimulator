function priopreem() {

    tEspera = [];
    horaTermino = [];
    tChegadas = [];
    tDuracoes = [];
    nomeProcesso = [];
    fila = [];
    processos = [];
    prioridades = [];
    var execucao;
    var overhead = 1000 * parseInt($('#overhead').val());
    var prioex;

    //Sort Prioridades
    function sortPrio(a, b) {
        if (a[3] > b[3]) return -1;
        if (a[3] < b[3]) return 1;
        return 0;
    }
    //Sort por Tempo de Duracao
    function sortTduracoes(a, b) {
        if (a[2] < b[2]) return -1;
        if (a[2] > b[2]) return 1;
        return 0;
    }
    //Sort por Tempo de Chegada
    function sortTchegadas(a, b) {
        if (a[1] < b[1]) return -1;
        if (a[1] > b[1]) return 1;
        return 0;
    }
    //Sort por Nome de processo
    function sortNome(a, b) {
        if (a[0] < b[0]) return -1;
        if (a[0] > b[0]) return 1;
        return 0;
    }

    for (i = 1; i < counter; i++) {
        tChegadas.push(1000 * parseInt($('#tChegada' + i).val()));
        tDuracoes.push(1000 * parseInt($('#tDuracao' + i).val()));
        prioridades.push(parseInt($('#priori' + i).val()));
        nomeProcesso.push(String.fromCharCode(65 + i - 1));
    }

    for (i = 0; i <= counter; i++) {
        for (j = i + 1; j < counter; j++)
            if (tChegadas[i] > tChegadas[j]) {
                // Trocar Tempo de Chegada
                var tempAr = tChegadas[i];
                tChegadas[i] = tChegadas[j];
                tChegadas[j] = tempAr;

                //Trocar Tempo de Duracao
                var tempBr = tDuracoes[i];
                tDuracoes[i] = tDuracoes[j];
                tDuracoes[j] = tempBr;

                //Trocar Prioridade
                var tempPr = prioridades[i];
                prioridades[i] = prioridades[j];
                prioridades[j] = tempPr;

                //Trocar Nome Processo
                var tempN = nomeProcesso[i];
                nomeProcesso[i] = nomeProcesso[j];
                nomeProcesso[j] = tempN;
            }
    }

    horaTermino[0] = tChegadas[0] + tDuracoes[0];
    for (k = 1; k < counter; k++) {
        horaTermino[k] = horaTermino[k - 1] + tDuracoes[k] + overhead;
    }

    processos.push([nomeProcesso[0], tChegadas[0], horaTermino[0]]);
    prioex = prioridades[0];
    execucao = true;
    for (i = 0; i < horaTermino[counter - 2] * counter; i++) {
        for (j = 1; j <= counter; j++) {

            if (tChegadas[j] == i) {
                if (prioridades[j] > prioex) {
                    fila.push([processos[processos.length - 1][0], processos[processos.length - 1][2], processos[processos.length - 1][1] + processos[processos.length - 1][2] - i, prioex]);
                    processos[processos.length - 1][2] = i;
                    processos.push([nomeProcesso[j], tChegadas[j] + overhead, tChegadas[j] + tDuracoes[j] + overhead]);
                    prioex = prioridades[j];
                    fila.sort(sortPrio);
                }
                else {
                    fila.push([nomeProcesso[j], tChegadas[j], tDuracoes[j], prioridades[j]]);
                    fila.sort(sortPrio);
                }
            }
            if (i == processos[processos.length - 1][2] && fila.length > 0) {
                fila[0][1] = processos[processos.length - 1][2] + overhead;
                fila[0][2] = fila[0][1] + fila[0][2];
                processos.push([fila[0][0], fila[0][1], fila[0][2]]);
                prioex = fila[0][3];
                fila.shift();
            }
        }
    }

    //Manter ordem A-Z no grafico
    processos.sort(sortNome);
}