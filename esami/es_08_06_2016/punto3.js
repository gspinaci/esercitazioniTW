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
