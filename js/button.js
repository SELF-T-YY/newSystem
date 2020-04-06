var buttom = document.querySelector('input[id="button-sample"]');
var data_name = "cit-HepTh"

function buttom_sample_click(){
    var select_name = document.getElementById('Left-s');
    var index = select_name.selectedIndex;
    var select_n = select_name.options[index].value;

    var sample_name = NaN;
    var sample_rate = NaN;
    if(select_n == 'BFS' || select_n == 'DFS' || select_n == 'OUR' || select_n == 'ISRW' || select_n == 'RES' || select_n == 'RJ' || select_n == 'RNS' || select_n == 'SRW' || select_n == 'TIES'){
        sample_name = select_n;
    }

    var elem1 = document.querySelector('input[id="range1"]');
    var elem2 = document.querySelector('input[id="range2"]');
    var elem3 = document.querySelector('input[id="range3"]');
    var nodes_num = 11174*elem3.value*0.01;
    var edges_num = 23410*elem3.value*0.01;


    document.getElementById("sample_nodes_num").innerText= parseInt(nodes_num);
    document.getElementById("sample_edges_num").innerText= parseInt(edges_num);

    // 列表社区数量呈现
    // document.getElementById('sample_community_num').innerText = parseInt(xx);

    if(elem3.value == '5' || elem3.value == '10' || elem3.value == '15' || elem3.value == '20' || elem3.value == '25' || elem3.value == '30' || elem3.value == '35' || elem3.value == '40') {
        sample_rate = parseInt(elem3.value);
    }

    var file_path = NaN;

    if(!(sample_name == NaN || sample_rate == NaN)){
    
        reflash();
        // file_path = '/data/oregonf/all_oregonf_rate/oregonf_sample_tsne_' + sample_name + '_' + sample_rate + '_nodes_edges.json';
        // force_re = '/data/oregonf/all_oregonf_rate_force_data/oregonf_force_data' + sample_name + '_' + sample_rate + '_nodes_edges.json'
        
        file_path = '/data_forSystem/' + data_name + '/force_data/tsne_' + sample_name + '_' + sample_rate + '_nodes_edges.json'
        force_re = '/data_forSystem/' + data_name + '/force_data/' + sx(data_name) + '_' + sample_name +'_rate-'+sample_rate+'_forcedata.json'

        force_file_name = file_path;
        force_circle_r = 1;
        drawforce_again(file_path);
        document.getElementById('s2').value = 'force_sample';

        if(document.getElementById('tsne_svg'))document.getElementById('tsne_svg').remove()
        draw_tsne(tsne_filename);

    }
}

function select2_change(){
    reflash();

    var select_name = document.getElementById('s2');
    var selected = select_name.options[select_name.selectedIndex].value;

    if(selected == 'force_origin'){
        force_circle_r = 1;
        drawforce_again(force_file_origin_name);
    }
    else if(selected == 'force_sample'){
        force_circle_r = 1;
        drawforce_again(force_file_name);
    }
    else if(selected == 'force_re'){
        force_circle_r = 2;
        drawforce_again(force_re);
    }
}

//返回数据集名字缩写
function sx(name){
    if(name == 'cit-HepTh')return 'CH';
    if(name == 'soc-sign-bitcoinotc')return 'SSB';
}