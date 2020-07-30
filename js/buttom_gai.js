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

    // 列表社区数量呈现
    // document.getElementById('sample_community_num').innerText = parseInt(xx);

    if(elem3.value == '5' || elem3.value == '10' || elem3.value == '15' || elem3.value == '20' || elem3.value == '25' || elem3.value == '30' || elem3.value == '35' || elem3.value == '40') {
        sample_rate = parseInt(elem3.value);
    }

    var file_path = NaN;

    if(sample_name != 'NULL' && sample_rate != "NULL"){
    
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

        connection_file_name = '/data_forSystem/' + data_name + '/connection/' + sx(data_name) + sample_name + '1connected_components.json'
        read_pgData(pg_sample_rate)

        // betweenness_Data_sample_rate = pg_sample_rate
        // betweenness_Data_file_name = '/data_forSystem/' + data_name + '/333/' + sx(data_name) + '333' + sample_name + '1new_Eva.json'
        
        //采样后社区数量
        d3.json(superNode_Data_File, function(error, data) {
            var nodeList = data['nodes'];
            console.log(nodeList)
            document.getElementById("sample_community_num").innerText= parseInt(nodeList.length);
        })
        // force_circle_r = 1;
        drawforce_again(force_file_name);

        d3.select('#tsne_svg').remove()
        tsne_dataset = [];
        force_node = []
        draw_tsne(tsne_filename);

        click_CC();
        show_CC();

        click_ABD();
        show_ABD();         
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
    draw_other(pg_sample_rate, 'ANB', pg_file_name, pg_file_name_ori)
}

function click_ACC(){
    d3.select('#pg_svg').remove()
    draw_other(pg_sample_rate, 'ACC', pg_file_name, pg_file_name_ori)
}

function click_LCC(){
    d3.select('#pg_svg').remove()
    draw_other(pg_sample_rate, 'LCC', pg_file_name, pg_file_name_ori)
}

function click_APL(){
    d3.select('#pg_svg').remove()
    draw_APL(APL_filePath, APL_filePath_ori);
}

function click_CC(){
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


// var if_first_change_data = true

// function changeData(){
//     var objS = document.getElementById("Left_d");
//     var new_data_name = objS.options[objS.selectedIndex].value;
//     if(new_data_name == 'soc-sign' && if_first_change_data)
//     {
//         // document.getElementById("th_nodes_num").innerText= parseInt(5875);
//         // document.getElementById("th_edges_num").innerText= parseInt(35587);
//         // document.getElementById("th_community_num").innerText= parseInt(16);
        

//         var all_options = document.getElementById("Left_S").options;
//         for (i=0; i<all_options.length; i++){
//            if (all_options[i].value == 'Sampling')  // 根据option标签的ID来进行判断  测试的代码这里是两个等号
//            {
//               all_options[i].selected = true;
//            }
//         }

//         document.getElementById("b3").innerHTML = 100
//         document.getElementById("range3").value = 100

//         force_circle_r = 1;

//         if_first_change_data = false

//         data_name = new_data_name;

//         reflash();

//         force_file_name = '/data_forSystem/soc-sign/SSBxy.json'
//         // force_re = '/data_forSystem/' + data_name + '/force_data/' + sx(data_name) + '_' + sample_name +'_rate-'+sample_rate+'_forcedata.json'

//         pg_sample_rate = 'rate-5'
//         pg_file_name = '/data_forSystem/soc-sign/pdData/SSBxxxori_Eva.json'
//         pg_file_name_ori = '/data_forSystem/soc-sign/pdData/SSBxxxori_Eva.json'

//         superNode_Data_File = '/data_forSystem/soc-sign/superNodeData/SSB_superNodeData.json'

//         APL_filePath_ori = '/data_forSystem/soc-sign/shortestPath/SSB_shortestPath.json'
//         APL_filePath = '/data_forSystem/soc-sign/shortestPath/SSB_shortestPath.json'

//         tsne_filename = '/data_forSystem/soc-sign/SSB_Tsne.csv'
//         drawforce_again(force_file_name);
//         // document.getElementById('s2').value = 'force_sample';

//         if(document.getElementById('tsne_svg'))document.getElementById('tsne_svg').remove()
//         draw_tsne(tsne_filename);

//         // drawRadar(parseInt(sample_rate));

//         d3.select('#radar_svg').remove()
//         // doRadar('ori', data_name, '5')

//         click_CC();
//         show_CC();

//         temp_draw_community();
//     }
// }


d3.json('/data_forSystem/ieee_visC/IVori_community.json', function(error, data) {
    var maxcommuntiy = 0;
    for(let i in data){
        maxcommuntiy = Math.max(data[i], maxcommuntiy);
    }
    set_Ori_communityNum(maxcommuntiy+1);
  
})


function changeData(){

    let objS = document.getElementById("Left_d");
    let temp_data_name = objS.options[objS.selectedIndex].value;
    if(data_name == temp_data_name){}
    else{
        data_name = temp_data_name;
        reflash();

        if(sx(data_name) == 'SSB'){
            force_circle_r = 1;
            tsne_circle_r = 2;
            superNodeLink_line = 150;
            superNode_r_plus = 2;
        }
        else if(sx(data_name) == 'WW'){
            force_circle_r = 2;
            tsne_circle_r = 1;
            superNodeLink_line = 30;
            superNode_r_plus = 1;
        }
        else if(sx(data_name) == 'IV'){
            force_circle_r = 2;
            tsne_circle_r = 2;
            superNodeLink_line = 150;
            superNode_r_plus = 2;
        }


        force_file_origin_name = '/data_forSystem/' + data_name + '/' + sx(data_name) + 'xy.json'
        force_file_name = force_file_origin_name
        pg_sample_rate = 'rate-5'
        pg_file_name = '/data_forSystem/' + data_name + '/pdData/' + sx(data_name) + 'xxxori_Eva.json'
        pg_name = 'ANB'
        pg_file_name_ori = pg_file_name
        APL_filePath_ori = '/data_forSystem/' + data_name + '/shortestPath/' + sx(data_name) + '_shortestPath.json'
        APL_filePath = APL_filePath_ori
        superNode_Data_File = '/data_forSystem/' + data_name + '/superNodeData/' + sx(data_name) + '_superNodeData.json'
        tsne_filename = '/data_forSystem/' + data_name + '/' + sx(data_name) + '_Tsne.csv';
        
        betweenness_Data_sample_rate = 'rate-100'
        betweenness_Data_file_name = '/data_forSystem/' + data_name + '/333/'+ sx(data_name) +'333ORI1new_Eva.json'

        community_file_name = '/data_forSystem/' + data_name + '/' + sx(data_name) + 'ori_community.json'

1

        //采样前社区数量
        d3.json(superNode_Data_File, function(error, data) {
            var nodeList = data['nodes'];
            console.log(nodeList)
            document.getElementById("th_community_num").innerText= parseInt(nodeList.length);
        })

        force_PIXIJS_circles.clear();
        force_PIXIJS_lines.clear();
        drawforce()
        // drawforce_again(force_file_name);
        drawRadar([], true)

        if(document.getElementById('tsne_svg'))document.getElementById('tsne_svg').remove()
        draw_tsne(tsne_filename);

        set_sample_communityNum(' ');
        set_sample_edgeNum(' ');
        set_sample_nodeNum(' ');
        document.querySelector('input[id="range3"]').value = '100'
        document.getElementById('b3').innerHTML = '100'
        document.getElementById('Left_S').value = document.getElementById('Left_S').options[0].value


        click_CC();
        show_CC();

        click_ABD();
        show_ABD();        
    }

}