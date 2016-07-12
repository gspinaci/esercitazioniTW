function updateProgetto(utente){

    if(utente.punti){

        $('input[name=team]').prop('disabled',true);
        $('input[name=punti]').prop('disabled',true);
    }
    else {

        $('input[name=team]').prop('disabled',false);
        $('input[name=punti]').prop('disabled',false);
    }
}

function getTotale(compiti){

    var totali = [];

    compiti.forEach(function(c) {

        var totale = 0;

        c.risultati.forEach(function(voto){
            totale += voto;
        });

        totali.push({'data':c.data,'voto':totale});
    });
}
