$(document).ready(function() {

    $('#desc span').on('click',function(){

        //coloro la selezione
        $('#desc span').removeClass('active');
        $(this).addClass('active');

        getMenu();
    });

    $('input:radio').on('change', function() {

        getMenu();
    });
});

function getMenu() {

    var cuoco = $('span.active').attr('data-val');
    var menu = $('input:checked').val();

    //se sono selezionati cuoco e menu
    if(menu && cuoco){

        $.ajax({
            url: 'http://menu.example.com/'+cuoco+'/'+menu,
            type: 'get',
            success: function(res) { showRes(res); },
            error: function(err) { showErr(err); }
        });
    }
}

function showRes(res) {

    var tmpl = '<div><span>_nome</span><span>_desc</span></div>';

    //antipasto
    var antipasto = tmpl.replace('_nome',res.antipasto.nome).replace('_desc',res.antipasto.descrizione);
    $('#riquadro').append(antipasto);

    //primo
    var primo = tmpl.replace('_nome',res.primo.nome).replace('_desc',res.primo.descrizione);
    $('#riquadro').append(primo);

    //secondo
    var secondo = tmpl.replace('_nome',res.secondo.nome).replace('_desc',res.secondo.descrizione);
    $('#riquadro').append(secondo);

    //dolce
    var dolce = tmpl.replace('_nome',res.dolce.nome).replace('_desc',res.dolce.descrizione);
    $('#riquadro').append(dolce);
}

function showErr(err){


}
