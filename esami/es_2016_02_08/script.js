
/*
    "name": "campo 1",
    "maxPlayers": 8,
    "open": true,
    "lights": true,
    "lockerRoom": false,
    "price": 40,
    "available": true
*/
function updateTable(fields) {

    var template = $('#campo').html();

    fields.forEach(function(field) {

        //imposto il nome del campo
        template.find('td:first-child').text(field.name);

        //imposto il numero massimo di giocatori
        template.find('td:nth-child(2)').text(field.maxPlayers);

        //imposto la descrizione
        var desc = setDescription(field);
        template.find('td:nth-child(3)').text(desc);

        //imposto il prezzo
        template.find('td:nth-child(4)').text(field.price);

        //imposto alt e src dell'immagine
        var img = {src : 'img/yes.png',alt: 'campo libro'};

        if(!field.aviabile){
            img.src = 'img/no.png';
            img.alt = 'campo occupato';
        }

        template.find('td:last-child img').attr('src', img.src);
        template.find('td:last-child img').attr('alt', img.alt);
    });
}

function setDescription(field){

    var desc = '';

    if(field.open)
        desc += "all'aperto";
    else
        desc += 'coperto, aria condizionata';

    if(field.lights)
        desc += ', illuminazione';

    if(field.lockerRoom)
        desc += ', spogliatoi';

    return desc;
}

function getAviability(){

    var month = $('select[name=mese]').val();
    var day = $('select[name=giorno]').val();
    var time = $('select[name=ora]').val();

    $.ajax({
        url: 'http://www.polisportivaquestoequello.it/searchAvailability.py?month='+month+'&day='+day+'&time='+time,
        type: 'get',
        success: function(res) {

            updateTable(res.fields);
        },
        error: function(err) {

            alert(err.statusText);
        }
    });
}

function showPrenotazioneTab(campo){

    var num = campo.split(' ')[1];

    //nascondo o seleziono gli input corretti
    $('.reservation input[name=campo]').each(function(){

        if($(this).val() == num){

            $(this).prop('checked',true);
            $(this).parent('li').show();
        }
        else {

            $(this).parent('li').hide();
        }

    });
}

$(document).ready(function () {

    $('.reservation').hide();

    $('select').on('change', function() {
        getAviability();
    });

    $('tbody tr').on('click',function(){

        $('.reservation').show();

        var campo = $(this).find('td:eq(0)').text();

        showPrenotazioneTab(campo);
    });

    $('input[value=prenota]').on('click',function() {

        var isPronotabile = true;

        var commenti = $('textarea[name=commenti]').text();
        var nome = $('input[name=nome]').val();
        var telefono = $('input[name=telefono]').val();

        if(commenti.length > 2000) isPronotabile = false;
        if(telefono.length != 10) isPronotabile = false;
        if(nome.split(' ').length < 2) isPronotabile = false;

        if(isPronotabile){

            $.ajax({
                url: 'http://www.polisportivaquestoequello.it/bookField.py',
                type: 'put',
                data: {
                    campo: $('input:checked').val(),
                    utente: {
                        nome: nome,
                        telefono: telefono
                    },
                    commenti: commenti
                },
                success: function(res){
                    alert('prenotazione avvenuta con successo');
                },
                error: function(err){
                    alert(err.statusText);
                }
            });
        }else {
            //non so se sia un errore sensato o no
            alert('i dati inseriti non sono corretti.');
        }

        alert(commenti);
    });
});
