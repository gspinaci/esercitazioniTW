$(window).load(function(){

    $.ajax({
        url:'osdata.json',//'http://www.osdata.com/oslist.php',
        type:'get',
        success: function(res) { handleSuccess(res); },
        error: function(err){console.log(err.status);}
    });
});

function handleSuccess(res){

    cache_list = res;
    current_id =

    $('aside').append('<ol></ol>');

    var list = $('aside ol');

    res.osdata.forEach(function(elem){

        list.append('<li><a href="'+elem.id+'">'+elem.name+'</a></li>');
    });


    $('a').on('click',function(e){

        e.preventDefault();

        current_id = $(this).attr('href');
        var tpl = '<div><span>_head</span><span>_data</span></div>';
        var section = $('section');

        section.html('');

        cache_list.osdata.forEach(function(elem){

            if(elem.id == current_id){

                section.append(tpl.replace('_head','Nome:').replace('_data',elem.name));
                section.append(tpl.replace('_head','Software house:').replace('_data',elem.swhouse));
                section.append(tpl.replace('_head','Logo:').replace('_data','<img src="img/'+elem.logo+'"/>'));
                section.append(tpl.replace('_head','Comments:').replace('_data',$('#form').html()));
            }

        });
    });

    $('input[type=submit]').on('click',function(e){

        e.preventDefault();

        console.log(new Date());



        /*
{
id: 'mac2013-0345',
from: 'John Smith',
mail: 'smith@yahoo.com',
inReplyTo: '',
date: '20130904',
time: '1205',
useofOS: false,
usefor: 'business',
comment: 'Too expensive?'
}
        */
    });
}
