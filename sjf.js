function sjf() {

    tEspera = [];
    horaTermino = [];
    tChegadas = [];
    tDuracoes = [];
    nomeProcesso = [];
    fila = [];
    processos = [];
    var execucao;
    var overhead = 1000*parseInt($('#overhead').val());

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
        tChegadas.push(1000*parseInt($('#tChegada' + i).val()));
        tDuracoes.push(1000*parseInt($('#tDuracao' + i).val()));
        nomeProcesso.push(String.fromCharCode(65 + i - 1));
    }

        for (i = 0; i <= counter; i++) {
        for (j = i + 1; j < counter; j++)
            if (tChegadas[i] > tChegadas[j] || (tChegadas[i] == tChegadas[j] && tDuracoes[i] > tDuracoes[j])) {
                // Trocar Tempo de Chegada
                var tempAr = tChegadas[i];
                tChegadas[i] = tChegadas[j];
                tChegadas[j] = tempAr;

                //Trocar Tempo de Duracao
                var tempBr = tDuracoes[i];
                tDuracoes[i] = tDuracoes[j];
                tDuracoes[j] = tempBr;

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
    execucao = true;
    for (i = 0; i < horaTermino[counter-2] + counter * overhead; i++) {
        for (j = 1; j <= counter; j++) {
            if (tChegadas[j] == i) {
                fila.push([nomeProcesso[j], tChegadas[j], tDuracoes[j]]);
                fila.sort(sortTduracoes);
                if (execucao == false && fila.length == 1) {
                    fila[0][1] = processos[processos.length - 1][2] + overhead;
                    fila[0][2] = fila[0][1] + fila[0][2];
                    processos.push(fila.shift());
                    execucao = true;
                }
            }
            if (i == processos[processos.length - 1][2]) {
                execucao = false;
            }
            if (execucao == false && fila.length > 0) {
                fila[0][1] = processos[processos.length - 1][2] + overhead;
                fila[0][2] = fila[0][1] + fila[0][2];
                execucao = true;
                processos.push(fila.shift());
            }
        }
    }

    // processos = [];
    // for (i = 0; i < counter - 1; i++) {
    //     processos.push([nomeProcesso[i], (tChegadas[i] + tEspera[i]) * 1000, horaTermino[i] * 1000]);
    // }
    processos.sort(sortNome);
}