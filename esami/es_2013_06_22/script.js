$(document).ready(function() {

    $('nav a').on('click', function(e){

        e.preventDefault();

        //cambio i colori
        $('nav a').css({'border':'none','background-color':'red'});
        $(this).css({'border':'2px solid black','background-color':'grey'});

        //salvo l'id
        var id = $(this).attr('href');

        //effettuo richiesta get
        $.ajax({
            url: 'punto2.json',//'http://viaggi.example.com/api/viaggi?id='+id,
            type: 'get',
            success: function(res) { updateList(res); },
            error: function(err) { showErr(err); }
        });
    });

    $('input[name=citta]').on('change', function(){

        //
        var citta = $('input[name=citta]:checked').val();

        $.ajax({
            url: 'punto3.json',//'http://viaggi.example.com/api/destinazione?id='+citta,
            type: 'get',
            success: function(res) { updateDesc(res); },
            error: function(err) { showErr(err); }
        });

    });
});

function updateList(res) {

    $('#citta h3').text(res.heading);

    $('#citta ul').html('');

    res.items.forEach(function(elem) {

        var li = '<li><input type="radio" name="citta" value="'+elem.id+'"> '+elem.label+'<span class="desc">'+elem.desc+'</span></li>';

        $('#citta ul').append(li);
    });
}

function updateDesc(res) {

    $('#desc h3').text(res.heading);

    $('#desc > div').html('');

    res.desc.forEach(function(elem) {

        $('#desc > div').append('<p>'+elem+'</p>');
    });

    $('table').find('tr:gt(0)').remove();

    res.prices.forEach(function(price) {

        if(price.emphasis)
            $('table').append('<tr class="emphasis"><td>'+price.label+'<td>'+price.price+' €');
        else
            $('table').append('<tr><td>'+price.label+'<td>'+price.price+' €');
    });



}
