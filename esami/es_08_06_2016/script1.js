$(document).ready(function(){

    // prenotazione
    $('input[type=submit]').on('click',function(){

        var codice_studente = $('.search input').val();

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

        //prenota pasto+indentificazione
        $.ajax({
            url: 'path/to/script',
            type:'post',
            data:{
                utente: codice_studente,
                pasto: menu
            },
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

    // visualizzazione menu'
    $('a').on('click',function(e) {

        e.preventDefault();

        alert($(this).attr('href'));

        //qui devo aggiungere il popolamento dell'intera pagina
    });

    //modifica del prezzo
    $('input[name=primo]').on('change',function(){ setPrezzo(); });
    $('input[name=secondo]').on('change',function(){ setPrezzo(); });
    $('input[name=contorno]').on('change',function(){ setPrezzo(); });

    $('input[name=altro]').on('change',function(){ setPrezzo(); });

    function setPrezzo() {

        var prezzo = 0;

        $('input[type=radio]:checked').each(function(){

            if($(this).val() != 'niente'){ prezzo += getPrezzoName($(this).next().children('.prezzo').text()); }
        });

        $('input[name=altro]:checked').each(function(){

            prezzo += getPrezzoName($(this).next().children('.prezzo').text());
        });



        $('.prezzoLabel+.prezzo').html(prezzo + ' € <span class="prezzoCommento">(sconto 20% su pasti prenotati)</span>');
    }

    function getPrezzoName(elem){

        var prezzo_singolo = elem.split(' ')[0];

        return parseFloat(elem);
    }
});
