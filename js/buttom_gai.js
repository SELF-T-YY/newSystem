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


    // document.getElementById("sample_nodes_num").innerText= parseInt(nodes_num);
    // document.getElementById("sample_edges_num").innerText= parseInt(edges_num);

    // 列表社区数量呈现
    // document.getElementById('sample_community_num').innerText = parseInt(xx);

    if(elem3.value == '5' || elem3.value == '10' || elem3.value == '15' || elem3.value == '20' || elem3.value == '25' || elem3.value == '30' || elem3.value == '35' || elem3.value == '40') {
        sample_rate = parseInt(elem3.value);
    }

    // oregonf_sample_tsne_FF_5_nodes_edges.json

    var file_path = NaN;
    // if(sample_name == "OUR"){
    //     // if(elem1.value == '10' || elem1.value == '20' || elem1.value == '40'){
    //         // const a = parseInt(elem1.value)/10;
    //         // const b = 10 - a;
    //         reflash();
    //         // file_path = '/data/' + data_name + '/our_sample_nodes_edges2/our_sample_a_'+ a +'_b_'+ b +'_rate_' + sample_rate + '_nodes_egdes.json'
    //         force_re = '/data_forSystem/' + data_name + '/' + sx(data_name) + '_' + sample_name +'_rate-'+sample_rate+'forcedata.json'
    //         // sankey_file_name = '/data/' + data_name + '/our_sample_community_num_for_sankey2/oregonf_OUR_a_'+a+'_b_'+b+'_Rate_'+sample_rate+'for_sankey.json'
    //         // sankey_color_file_name = '/data/' + data_name + '/our_sample_community_HX2/oregonf_OUR_a_'+a+'_b_'+b+'_Rate_'+sample_rate+'_for_sankey_HX.json'


    //         force_file_name = file_path;
    //         force_circle_r = 5;
    //         drawforce_again(file_path);
    //         document.getElementById('s2').value = 'force_sample';
    
    //         if(document.getElementById('tsne_svg'))document.getElementById('tsne_svg').remove()
    //         draw_tsne();
    
    //         drawRadar(parseInt(sample_rate));
    
    //         community_num_file_name = '../data/oregonf/our_sample_community_num2/our_sample_a_'+a+'_b_'+b+'_rate_'+sample_rate+'_community_num.json'
    //         draw_community_disribution_again();
    
    //         draw_sankey_again();
    //     // }       
    // }
    // else if(!(sample_name == NaN || sample_rate == NaN)){
    if(!(sample_name == NaN || sample_rate == NaN)){
    
        reflash();
        // file_path = '/data/oregonf/all_oregonf_rate/oregonf_sample_tsne_' + sample_name + '_' + sample_rate + '_nodes_edges.json';
        // force_re = '/data/oregonf/all_oregonf_rate_force_data/oregonf_force_data' + sample_name + '_' + sample_rate + '_nodes_edges.json'
        
        file_path = '/data_forSystem/' + data_name + '/force_data/tsne_' + sample_name + '_' + sample_rate + '_nodes_edges.json'
        force_re = '/data_forSystem/' + data_name + '/force_data/' + sx(data_name) + '_' + sample_name +'_rate-'+sample_rate+'_forcedata.json'

        sankey_file_name = '/data/oregonf/all_oregonf_rate_community_num_for_sankey_gai/oregonf_sample_tsne_' + sample_name + '_' + sample_rate + '_community_num_for_sankey.json'
        sankey_color_file_name = '/data/oregonf/all_oregonf_rate_community_HX/oregonf_sample_tsne_' + sample_name +  '_' + sample_rate + '_HX.json'

        force_file_name = file_path;
        force_circle_r = 1;
        drawforce_again(file_path);
        document.getElementById('s2').value = 'force_sample';

        if(document.getElementById('tsne_svg'))document.getElementById('tsne_svg').remove()
        draw_tsne(tsne_filename);

        drawRadar(parseInt(sample_rate));

        // community_num_file_name = '/data/oregonf/all_oregonf_rate_community_num/oregonf_sample_tsne_' + sample_name + '_' + sample_rate + '_community_num.json';
        community_num_file_name = '/data_forSystem/cit-HepTh/community_num/' + sx(data_name) + sample_name + '_rate_' + sample_rate+'_community_num.json'

        draw_community_disribution_again();
        draw_sankey_again();
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

// function select_community_change(){
//     reflash();

//     var select_name = document.getElementById('s1');
//     var selected = select_name.options[select_name.selectedIndex].value;

//     if(selected == 'Community'){
//         draw_community();
//     }
//     else if(selected == 'Connected'){
        
//     }
//     else if(selected == 'Disribution'){

//     }
//     else if(selected == 'Degree'){

//     }
//     else if(selected == 'Betweeness'){
        
//     }
// }


// function range1(){
//     var elem1 = document.querySelector('input[id="range1"]');
//     var elem2 = document.querySelector('input[id="range2"]');

//     elem2.value = String(100 - elem1.value);
//     // document.querySelector('b[id="b1"]') = elem2.value;
//     // document.querySelector('b[id="b2"]') = elem1.value;
//     document.getElementById('b1').innerHTML = elem1.value;
//     document.getElementById('b2').innerHTML = elem2.value;
// }

// function range2(){
//     var elem1 = document.querySelector('input[id="range1"]');
//     var elem2 = document.querySelector('input[id="range2"]');

//     elem1.value = String(100 - elem2.value);
//     // document.querySelector('b[id="b1"]') = elem2.value;
//     // document.querySelector('b[id="b2"]') = elem1.value;
//     document.getElementById('b1').innerHTML  = elem1.value;
//     document.getElementById('b2').innerHTML  = elem2.value;

// }

//返回数据集名字缩写
function sx(name){
    if(name == 'cit-HepTh')return 'CH';
    if(name == 'soc-sign-bitcoinotc')return 'SSB';
}