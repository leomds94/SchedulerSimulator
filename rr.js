function roundrobin() {
    tEspera = [];
    horaTermino = [];
    tChegadas = [];
    tDuracoes = [];
    nomeProcesso = [];
    processos = [];
    var fila = [];
    var timeslice = 1000 * parseInt(ts);
    var overhead = 1000 * parseInt($('#overhead').val());

    function sortNome(a, b) {
        if (a[0] < b[0]) return -1;
        if (a[0] > b[0]) return 1;
        return 0;
    }
    function sortTchegadas(a, b) {
        if (a[1] < b[1]) return -1;
        if (a[1] > b[1]) return 1;
        return 0;
    }

    for (i = 1; i < counter; i++) {
        tChegadas.push(1000 * parseInt($('#tChegada' + i).val()));
        tDuracoes.push(1000 * parseInt($('#tDuracao' + i).val()));
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

                //Trocar Nome Processo
                var tempN = nomeProcesso[i];
                nomeProcesso[i] = nomeProcesso[j];
                nomeProcesso[j] = tempN;
            }
    }

    horaTermino[0] = tChegadas[0] + tDuracoes[0];
    for (k = 1; k < counter; k++) {
        horaTermino[k] = horaTermino[k - 1] + tDuracoes[k];
    }

    if (tDuracoes[0] > timeslice) {
        processos.push([nomeProcesso[0], tChegadas[0], tChegadas[0] + timeslice]);
        fila.push([nomeProcesso[0], tChegadas[0] + timeslice, tDuracoes[0] - timeslice]);
    }
    else {
        processos.push([nomeProcesso[0], tChegadas[0], tChegadas[0] + tDuracoes[0]]);
    }

    for (i = 0; i <= horaTermino[counter - 2] * timeslice; i = i + 1000) {
        for (j = 1; j <= counter; j++) {

            if (tChegadas[j] == i) {
                fila.push([nomeProcesso[j], tChegadas[j], tDuracoes[j]]);
                fila.sort(sortTchegadas);
            }

            if (i == processos[processos.length - 1][2]) {
                if (fila.length > 0) {
                    if (processos[processos.length - 1][0] == fila[0][0]) {
                        if (fila[0][2] > timeslice) {
                            processos.push([fila[0][0], processos[processos.length - 1][2], processos[processos.length - 1][2] + timeslice]);
                            fila[0][2] = fila[0][2] - timeslice;
                        }
                        else {
                            processos.push([fila[0][0], processos[processos.length - 1][2], processos[processos.length - 1][2] + fila[0][2]]);
                            fila.shift();
                        }
                    }
                    else {
                        if (fila[0][2] > timeslice) {
                            processos.push([fila[0][0], processos[processos.length - 1][2] + overhead, timeslice + processos[processos.length - 1][2] + overhead]);
                            fila[0][2] = fila[0][2] - timeslice;
                            fila[0][1] = timeslice + processos[processos.length - 1][2] + overhead;
                            fila.push(fila.shift());
                            fila.sort(sortTchegadas);
                        }
                        else {
                            processos.push([fila[0][0], processos[processos.length - 1][2] + overhead, fila[0][2] + processos[processos.length - 1][2] + overhead]);
                            fila.shift();
                        }
                    }
                }
            }
        }
    }

    //Manter ordem A-Z no grafico
    processos.sort(sortNome);
}