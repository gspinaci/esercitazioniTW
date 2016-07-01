function getPercorso(partenza,arrivo) {

    $.ajax({
        url: "http://www.dolomitisuperski.it/services/percorso.php",
        type: "get",
        data: {
            partenza: partenza,
            arrivo: arrivo
        },
        success: function(res){ mostraPercorso(res); },
        error: function(err){ mostraErrore(err); }
    });
}

$(document).ready(function(){

    $('select').on('change',function(){

        var partenza = $('#partenza').val();
        var arrivo = $('#arrivo').val();

        getPercorso(partenza, arrivo);
    });

    var table = $('#table');

    table.children('tbody').html('yo');

    alert(table.html());
});
