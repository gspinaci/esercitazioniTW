function getHotelData(hotelName) {
    $.ajax({
        url: "getHotelData.php?name="+hotelName,
        success: function(data,status,request) {
            update(data) ;
        },
        error: function(err) {
            handleError(err.status,err.statusText) ;
        }
    });
 }

 //punto 1 change event
 $(document).ready(function(){

     $('input[name=albergo]').on('change',function(){

         var hotelName = $(this).val();
         getHotelData(hotelName);
     });
 });

//punto 2 metodo update
function update(data){

    //update descrizione
    updateDescrizione(data.descrizione);

    updateTable(data.tariffe);
}

//punto 2 updateDescrizione
function updateDescrizione(descrizione){

    var p = 'body>div>p';

    $(p).html('');

    descrizione.forEach(function (span) {

        var elem = '';

        if(span.img)
            elem = "<img src='"+span.img+"' alt='"+span.alt+"' />";
        else
            elem = '<span>'+span+'</span';

        $(p).append(elem);
    });
}

//punto 2 updateTable
function updateTable(tariffe) {

    $('table').find('tr:gt(0)').remove();

    tariffe.forEach(function (elem){

        var row = '<tr><td>'+elem.mese+'</td><td>'+elem.notte+'</td><td>'+elem.risparmio+'</td></tr>';

        $(table).append(row);
    });
}

//punto 2 json
var json = {
    desc: [
        'paragrafo',
        {
            img:'https://...',
            alt:'questa img è superfiga'
        },
        'paragrafo',
        '...'
    ],
    tariffe: [
        {
            mese: 'gennaio-febbraio',
            notte: '$50',
            risparmio: '$20'
        },
        {
            mese: 'gennaio-febbraio',
            notte: '$50',
            risparmio: '$20'
        }
    ]
};

//punto 3
function handleError(status,statusText) {

    //errore 404 e 406 li gestisco nello stesso modo
    //cancello la parte dinamica e mostro l'errore
    if(status === 404 || status === 503){

        $('table').html('');

        var p = 'body>div>p';

        $(p).text(statusText);
        $(p).css({color:'red'});
    }

    //sarebbe buono far vedere in ogni caso la descrizione
    //infatti se potessi gestire anche il server, invierei nella risposta
    //anche la descrizione com visto nel json del punto 2
    else if(status === 406){

        $('table').find('tr:gt(0)').remove();
        $('table').append('<tr colspan=3 style="color:red">'+statusText.message+'</tr>');

        updateDescrizione(statusText.descrizione);
    }
}
