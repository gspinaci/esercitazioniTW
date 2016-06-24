$(document).ready(function(){

    //seleziona il menu in base al giorno
    $('a').on('click',function(e) {

        e.preventDefault();

        var codiceGiorno = $(this).attr('href');

        /*
            risposta :

            {
                primo: [
                    {
                        value: 'tagliatellaragu',
                        desc: 'Tagliatelle al ragù -',
                        prezzo: '3.12 €'
                    },
                    {
                        ...
                    }
                ],
                secondo: [
                    {
                        ...
                    }
                ],
                ...
            }
        */
        $.ajax({

            url: 'path/to/script?codice='+codiceGiorno,
            type: 'get',
            success: function (res) {

                updateMenu(res);
            },
            error: function (err) {

                handleError(err.status,err.statusText);
            }
        });
    });

    // effettua prenotazione
    $('input[type=submit]').on('click',function(){

        var altro = [];

        $('input[name=altro]:checked').each(function() {
            altro.push($(this).val());
        });

        var menu = {
            primo: $('input[name=primo]:checked').val(),
            secondo: $('input[name=secondo]:checked').val(),
            contorno: $('input[name=contorno]:checked').val(),
            extra: altro
        };

        $.ajax({
            url: 'path/to/script',
            type:'post',
            data: menu,
            success: function(res) {
                //la logica di questo metodo dipende da come è impostato il server
                alert('Prenotato il pasto selezionato!');
            },
            error: function(err) {

                //se l'utente non può fare un altra richiesta
                if(err.status == 405)
                {
                    alert("Non è possibile effettuare un'altra prenotazione");
                }
            }
        });
    });

    $('.codice+input').on('change',function(){

        //se è un numero di matricola, è una mia scelta
        if($(this).text().length()>=6) {

            var codiceStudente = $(this).val();

            $.ajax({
                url: 'path/to/script?codiceStudente='+codiceStudente,
                type: 'get',
                success: function(res) {

                    welcome(res.utente);
                },
                error: function(err) {

                    handleError(err.status,err.statusText);
                }
            });
        }
    });

    //modifica del prezzo
    $('input[name=primo]').on('change',function(){ setPrezzo(); });
    $('input[name=secondo]').on('change',function(){ setPrezzo(); });
    $('input[name=contorno]').on('change',function(){ setPrezzo(); });
    $('input[name=altro]').on('change',function(){ setPrezzo(); });

    function setPrezzo() {

        var prezzoCommento = ' € <span class="prezzoCommento">(sconto 20% su pasti prenotati)</span>';

        var prezzo = 0;

        $('input:checked').each(function(){

            if($(this).val() != 'niente'){

                prezzo += getPrezzoName($(this).next().children('.prezzo').text());
            }
        });

        $('.prezzoLabel+.prezzo').html(prezzo + prezzoCommento);
    }

    function getPrezzoName(elem){

        var prezzo_singolo = elem.split(' ')[0];

        return parseFloat(elem);
    }
});
