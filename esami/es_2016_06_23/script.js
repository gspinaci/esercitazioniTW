max = -1;

$(document).ready(function(){

    var numImmagini = 4;
    var timeInterval = 2000;

    var start = 0;
    var end = numImmagini;

    getPics(start,end);

    $('#pictures img:last-child').on('click',function(){

        start = end;
        end = start+numImmagini;

        getPics(start,end);
    });

});

$(window).load(function(){

    setTimeout(function(){
        end--;
        start--;

        if(start > 0){

            getPics(start,end);
        }

    },timeInterval);
});

function getPics(s,e) {

    var path = 'http://www.cretetourism.gr/getPictures.py?start='+s+'&end='+e;

    var pics = $('#pictures');
    pics.empty();

    $.ajax({
        url: path,
        type: 'get',
        success: function(res){

            pics.append(setImage('images/left-arrow.gif', 'left'));

            res.pictures.forEach(function(p){

                pics.append(setImage(p.url, p.alt));
            });

            pics.append(setImage('images/right-arrow.gif', 'right'));

            max = res.max;
        },
        error: function(err){

            pics.append(setImage('images/placeholder.gif', 'placeholder'));
        }
    });
}

function setImage(src,alt) {
    var tmpl = '<img src="_s" alt="_a" />';

    return tmpl.replace('_s',src).replace('_a',alt);
}
