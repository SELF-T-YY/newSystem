var buttom = document.querySelector('input[id="button-sample"]');
var data_name = "ieee_visC"

function buttom_sample_click(){
    var select_name = document.getElementById('Left_S');
    var index = select_name.selectedIndex;
    var select_n = select_name.options[index].value;

    var sample_name = 'NULL';
    var sample_rate = 'NULL';
    if(select_n == 'BFS' || select_n == 'DFS' || select_n == 'OUR' || select_n == 'ISRW' || select_n == 'RES' || select_n == 'RJ' || select_n == 'RNS' || select_n == 'SRW' || select_n == 'TIES' || select_n == 'OUR'){
        sample_name = select_n;
    }

    var elem1 = document.querySelector('input[id="range1"]');
    var elem2 = document.querySelector('input[id="range2"]');
    var elem3 = document.querySelector('input[id="range3"]');
    var nodes_num = 11174*elem3.value*0.01;
    var edges_num = 23410*elem3.value*0.01;



    // 列表社区数量呈现
    // document.getElementById('sample_community_num').innerText = parseInt(xx);

    if(elem3.value == '5' || elem3.value == '10' || elem3.value == '15' || elem3.value == '20' || elem3.value == '25' || elem3.value == '30' || elem3.value == '35' || elem3.value == '40') {
        sample_rate = parseInt(elem3.value);
    }

    var file_path = NaN;

    if(sample_name != 'NULL' && sample_rate != "NULL"){
    
        document.getElementById("sample_nodes_num").innerText= parseInt(nodes_num);
        document.getElementById("sample_edges_num").innerText= parseInt(edges_num);

        reflash();

        force_file_name = '/data_forSystem/' + data_name + '/forceData/' + sx(data_name) +  '_forceData_' + sample_name + '_rate_' + sample_rate + '.json'
        console.log(force_file_name)
        // force_re = '/data_forSystem/' + data_name + '/force_data/' + sx(data_name) + '_' + sample_name +'_rate-'+sample_rate+'_forcedata.json'

        pg_sample_rate = 'rate-' + sample_rate
        pg_file_name = '/data_forSystem/' + data_name + '/pdData/' + sx(data_name) + 'xxx' + sample_name + '1_Eva.json'
        pg_file_name_ori = '/data_forSystem/' + data_name + '/pdData/' + sx(data_name) + 'xxxori_Eva.json'

        APL_filePath_ori = '/data_forSystem/' + data_name + '/shortestPath/' + sx(data_name) + '_shortestPath.json'
        APL_filePath = '/data_forSystem/' + data_name + '/shortestPath/' + sx(data_name) + '_' + sample_name + '_rate_' + sample_rate + '_shortestPath.json'

        superNode_Data_File = '/data_forSystem/' + data_name + '/superNodeData/' + sx(data_name) + '_' + sample_name + '_rate_' + sample_rate + '_superNodeData.json'

        d3.json(superNode_Data_File, function(error, data) {
            var nodeList = data['nodes'];
            console.log(nodeList)
            document.getElementById("sample_community_num").innerText= parseInt(nodeList.length);
          
        })
        // force_circle_r = 1;
        drawforce_again(force_file_name);
        document.getElementById('s2').value = 'force_sample';

        if(document.getElementById('tsne_svg'))document.getElementById('tsne_svg').remove()
        draw_tsne(tsne_filename);

        // drawRadar(parseInt(sample_rate));
        var radar_list = []
        radar_list.push(sample_name)
        console.log(radar_list)
        // doRadar(radar_list, data_name, sample_rate);

        click_CC();
        show_CC();
    }
}

function select2_change(){
    reflash();

    var select_name = document.getElementById('s2');
    var selected = select_name.options[select_name.selectedIndex].value;

    if(selected == 'force_origin'){
        // force_circle_r = 1;
        drawforce_again(force_file_origin_name);
    }
    else if(selected == 'force_sample'){
        // force_circle_r = 1;
        drawforce_again(force_file_name);
    }
    else if(selected == 'force_re'){
        // force_circle_r = 2;
        drawforce_again(force_re);
    }
}



function click_ABD(){
    d3.select('#pg_svg').remove()
    d3.select('#superNode_svg').remove()
    draw_other(pg_sample_rate, 'ANB', pg_file_name, pg_file_name_ori)
}

function click_ACC(){
    d3.select('#pg_svg').remove()
    d3.select('#superNode_svg').remove()
    draw_other(pg_sample_rate, 'ACC', pg_file_name, pg_file_name_ori)
}

function click_LCC(){
    d3.select('#pg_svg').remove()
    d3.select('#superNode_svg').remove()
    draw_other(pg_sample_rate, 'LCC', pg_file_name, pg_file_name_ori)
}

function click_APL(){
    d3.select('#pg_svg').remove()
    d3.select('#superNode_svg').remove()
    draw_APL(APL_filePath, APL_filePath_ori);
}

function click_CC(){
    d3.select('#pg_svg').remove()
    d3.select('#superNode_svg').remove()
    draw_community(superNode_Data_File);
}


//返回数据集名字缩写
function sx(name){
    if(name == 'cit-HepTh')return 'CH';
    if(name == 'soc-sign')return 'SSB';
    if(name == 'ieee_visC') return 'IV';
    if(name == 'web-webbase-2001') return 'WW';
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


var if_first_change_data = true

function changeData(){
    var objS = document.getElementById("Left_d");
    var new_data_name = objS.options[objS.selectedIndex].value;
    if(new_data_name == 'soc-sign' && if_first_change_data)
    {
        document.getElementById("th_nodes_num").innerText= parseInt(5875);
        document.getElementById("th_edges_num").innerText= parseInt(35587);
        document.getElementById("th_community_num").innerText= parseInt(16);
        

        var all_options = document.getElementById("Left_S").options;
        for (i=0; i<all_options.length; i++){
           if (all_options[i].value == 'Sampling')  // 根据option标签的ID来进行判断  测试的代码这里是两个等号
           {
              all_options[i].selected = true;
           }
        }

        document.getElementById("b3").innerHTML = 100
        document.getElementById("range3").value = 100

        force_circle_r = 1;

        if_first_change_data = false

        data_name = new_data_name;

        reflash();

        force_file_name = '/data_forSystem/soc-sign/SSBxy.json'
        // force_re = '/data_forSystem/' + data_name + '/force_data/' + sx(data_name) + '_' + sample_name +'_rate-'+sample_rate+'_forcedata.json'

        pg_sample_rate = 'rate-5'
        pg_file_name = '/data_forSystem/soc-sign/pdData/SSBxxxori_Eva.json'
        pg_file_name_ori = '/data_forSystem/soc-sign/pdData/SSBxxxori_Eva.json'

        superNode_Data_File = '/data_forSystem/soc-sign/superNodeData/SSB_superNodeData.json'

        APL_filePath_ori = '/data_forSystem/soc-sign/shortestPath/SSB_shortestPath.json'
        APL_filePath = '/data_forSystem/soc-sign/shortestPath/SSB_shortestPath.json'

        tsne_filename = '/data_forSystem/soc-sign/SSB_Tsne.csv'
        drawforce_again(force_file_name);
        // document.getElementById('s2').value = 'force_sample';

        if(document.getElementById('tsne_svg'))document.getElementById('tsne_svg').remove()
        draw_tsne(tsne_filename);

        // drawRadar(parseInt(sample_rate));

        d3.select('#radar_svg').remove()
        // doRadar('ori', data_name, '5')

        click_CC();
        show_CC();

        temp_draw_community();
    } 


}



// function changeData(){
//     var objS = document.getElementById("Left_d");
//     var new_data_name = objS.options[objS.selectedIndex].value;
//     if(new_data_name == 'WW' && if_first_change_data)
//     {
//         document.getElementById("th_nodes_num").innerText= parseInt(16062);
//         document.getElementById("th_edges_num").innerText= parseInt(25593);
//         document.getElementById("th_community_num").innerText= parseInt(16);
        

//         var all_options = document.getElementById("Left-s").options;
//         for (i=0; i<all_options.length; i++){
//            if (all_options[i].value == 'Sampling')  // 根据option标签的ID来进行判断  测试的代码这里是两个等号
//            {
//               all_options[i].selected = true;
//            }
//         }

//         document.getElementById("b3").innerHTML = 100
//         document.getElementById("range3").value = 100
        


//         if_first_change_data = false

//         data_name = 'web-webbase-2001'

//         reflash();

//         force_file_name = '/data_forSystem/web-webbase-2001/WWxy.json'
//         // force_re = '/data_forSystem/' + data_name + '/force_data/' + sx(data_name) + '_' + sample_name +'_rate-'+sample_rate+'_forcedata.json'

//         pg_sample_rate = 'rate-5'
//         pg_file_name = '/data_forSystem/soc-sign/pdData/SSBxxxori_Eva.json'
//         pg_file_name_ori = '/data_forSystem/soc-sign/pdData/SSBxxxori_Eva.json'

//         superNode_Data_File = '/data_forSystem/web-webbase-2001/superNodeData/WW_shotestPath.json'

//         APL_filePath_ori = '/data_forSystem/web-webbase-2001/shortestPath/WW_shortestPath.json'
//         APL_filePath = '/data_forSystem/web-webbase-2001/shortestPath/WW_shortestPath.json'

//         tsne_filename = '/data_forSystem/web-webbase-2001/WW_Tsne.csv'
//         force_circle_r = 1;
//         drawforce_again(force_file_name);
//         document.getElementById('s2').value = 'force_sample';

//         if(document.getElementById('tsne_svg'))document.getElementById('tsne_svg').remove()
//         draw_tsne(tsne_filename);

//         // drawRadar(parseInt(sample_rate));

//         d3.select('#radar_svg').remove()
//         // doRadar('ori', data_name, '5')

//         click_CC();
//         show_CC();        

//     } 


// }