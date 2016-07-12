$(document).ready(function(){
    var extra = [];

    var primo = $("input[name=primo]:checked").val();
    var secondo = $("input[name=secondo]:checked").val();
    var contorno = $("input[name=contorno]:checked").val();

    $('input[name=altro]:checked').each(function(){

        extra.push($(this).val());
    });

    $("input[type=submit]").on('click', function(){

        $.ajax({
            url: 'http://path/to/script/prenotazione.php',
            type: 'put',
            data: { primo : primo, secondo : secondo, contorno : contorno, extra : extra},
            success: function(res) {

            },
            error: function(err) {
                console.log(err.status);

            }
    });




    });

    /*$.ajax({
        url:'menu.json',
        success: function(res){
            res.primo.forEach(result);

            res.secondo.forEach(result);

            res.contorno.forEach(result);

            res.extra.forEach(result);


        }
    });

    var result = function findCheck(elem) {

        if(elem.selected)
            console.log(elem);
    };*/
});
/*
$(document).ready(function () {

    var prenotato = false;

    //get prenotazione
    $('a').on('click',function(e) {

        e.preventDefault();

        var codiceGiorno = $(this).attr('href');

        $.ajax({

            url: 'path/to/script'+codiceGiorno,
            type: 'get',
            success: function (res) {

                //update del valore prenotato o meno
                prenotato = res.prenotato;

                //se è prenotato
                if(res.prenotato) {

                    //aggiungo il box laterale
                    $('#main').append("<div class='box' style='position:absolute;right:0;top:200px'>Già prenotato!</div>");

                    //imposta la pagina e checked gli elementi scelti dalla prenotazione di prima
                    refreshPage(res.menu);

                }else {

                    //rimuovo il box laterale
                    $('#main').find('.box').remove();

                    refreshHomePage();
                }
            },
            error: function (err) {

                handleError(err.status,err.statusText);
            }
        });
    });

    $('input[type=submit]').on('click', function() {

        //se non ho prenotato, farò una richiesta put, in caso contrario post
        var type = !prenotato ? 'put' : 'post';

        var payload = getMenuBySelection();

        $.ajax({
            url: 'path/to/script',
            type: type,
            data: payload,
            success: function(res) {

                alert(res);
            },
            error: function(err) {

                handleError(err.status, err.statusText);
            }
        });
    });
});
*/
