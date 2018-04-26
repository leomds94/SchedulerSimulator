function fifo() {

    tEspera = [];
    horaTermino = [];
    tChegadas = [];
    tDuracoes = [];
    nomeProcesso = [];

    for (i = 1; i < counter; i++) {
        tChegadas.push(parseInt($('#tChegada' + i).val()));
        tDuracoes.push(parseInt($('#tDuracao' + i).val()));
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
        horaTermino[k] = horaTermino[k - 1] + tDuracoes[k] + parseInt($('#overhead').val());
    }

    tEspera.push(0);
    for (i = 1; i < counter; i++) {
        tEspera[i] = horaTermino[i] - tChegadas[i] - tDuracoes[i];
    }

    //Manter ordem A-Z no grafico
    function Comparador(a, b) {
        if (a[0] < b[0]) return -1;
        if (a[0] > b[0]) return 1;
        return 0;
    }
    processos = [];
    for (i = 0; i < counter - 1; i++) {
        processos.push([nomeProcesso[i], (tChegadas[i] + tEspera[i]) * 1000, horaTermino[i] * 1000]);
    }
    processos.sort(Comparador)
}