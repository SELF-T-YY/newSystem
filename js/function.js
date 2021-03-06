function button_move_click_on()
{
   if_button_move_click(true);
   if_button_circle_choose(false);
   if_button_point_click(false);
}

function button_circle_choose_click_on()
{
   if_button_move_click(false);
   if_button_circle_choose(true);
   if_button_point_click(false);
}

function button_choose_point_click_on()
{
   if_button_move_click(false);
   if_button_circle_choose(false);
   if_button_point_click(true);
}

function if_button_move_click(flag){
    if_move = flag;
}
function if_button_point_click(flag){
    if_choose_point = flag;
}
function if_button_circle_choose(flag){
    if_circle_choose = flag;
}



function tsne_choose_force_change_color(circle_list){
    d3.json(force_file_name, function(filename){
        let datas_re = filename['nodes']
        let datas = {}
        for(var i in datas_re){
            datas[datas_re[i]['id']] = datas_re[i]
        }
        var circles_change_color = 0xff00ff;
        choosed_point_data = circle_list;
        
        circles_choose.clear();
        circles_choose_change_color.clear();
        for(let node in choosed_point_data)
        {
            if(choosed_point_data[node] in datas){
                const now_x = (datas[choosed_point_data[node]].x);
                const now_y = (datas[choosed_point_data[node]].y);
                // d3.select("#tsne_node_"+choosed_point_data[node]).style("fill",circles_change_color);
                circles_choose_change_color.beginFill('0xff0000');
                circles_choose_change_color.drawCircle(now_x,now_y,force_circle_r);
                circles_choose_change_color.endFill();                
            }

        }
        app.stage.addChild(circles_choose_change_color);
    })
}


function community_Distribution_change_color(i)
{
    // console.log(i)
    d3.selectAll(".community_Distribution").attr("fill", 'steelblue');
    d3.select('#community_Distribution_' + i).attr("fill", "red");
}


function community_change_color(i){
    d3.selectAll('.community').attr('fill', 'steelblue');
    d3.select('#community_' + i).attr('fill', 'red');
}


function connected_change_color(i){
    d3.selectAll('.connected').attr('fill', 'steelblue');
    d3.select('#connected_' + i).attr('fill', 'red');
}

function tsne_chanege_color_by_list(circle_list){
    console.log(circle_list)
    // console.log(circle_list)
    d3.selectAll('.tsne_circle').attr('fill', tsne_circle_color);
    for(let key in circle_list){
        d3.select('#tsne_circle_' + circle_list[key]).attr('fill','red').attr('r', tsne_circle_r);
    }
}

function community_click_do(d,i){
    community_change_color(i);
    sankey_change_color(i);
    force_change_color(i);
    community_Distribution_change_color(i);
    connected_change_color(i);
}

function reflash(){
    // let canvas = document.getElementsByClassName('heatmap-canvas')[0];
    // if(canvas){
    //     canvas;
    // }
    //通过class获取元素
    paras = document.getElementsByClassName('heatmap-canvas');
    for(i=0;i<paras.length;i++){
        //删除元素 元素.parentNode.removeChild(元素);
        if (paras[i] != null)
            paras[i].parentNode.removeChild(paras[i]);
    }



    circles_choose.clear();
    circles_choose_change_color.clear();
    d3.selectAll('.tsne_circle').attr('fill', tsne_circle_color);
    d3.select('#force_colorBar_svg').remove();
    d3.select('#tsne_brush').remove();
    click_CC();
    show_CC();
}




function show_theBiggestBetweenness(){
    d3.json('/data_forSystem/ieee_visC/IV_id_x_y_kde_edges_betweenness.json', function(betweennessData){
        var arrList = []
        for(var node in betweennessData){
            arrList.push({'node': node,'betweenness':betweennessData[node]['betweenness']})
        }
        var sort_list = arrList.sort(function(a,b){
            return b['betweenness'] - a['betweenness'];
        })
        var choose_circle_list = []
        for(var i=0; i<5; i++){
            choose_circle_list.push(sort_list[i]['node'])
        }
        console.log(choose_circle_list)
        tsne_chanege_color_by_list(choose_circle_list);
        tsne_choose_force_change_color(choose_circle_list);
          
    })
}

function reset(){
    location.reload();
}


function set_Ori_communityNum(cNUm){
    document.getElementById('th_community_num').innerText = cNUm;
}

function set_sample_communityNum(cNum){
    document.getElementById('sample_community_num').innerText = cNum;
}

function set_Ori_nodeNum(cNUm){
    document.getElementById('th_nodes_num').innerText = cNUm;
}

function set_sample_nodeNum(cNum){
    document.getElementById('sample_nodes_num').innerText = cNum;
}

function set_Ori_edgeNum(cNUm){
    document.getElementById('th_edges_num').innerText = cNUm;
}

function set_sample_edgeNum(cNum){
    document.getElementById('sample_edges_num').innerText = cNum;
}


function colorHex(color){
// RGB颜色值的正则
var reg = /^(rgb|RGB)/;
if (reg.test(color)) {
    var strHex = "0x";
    // 把RGB的3个数值变成数组
    var colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    // 转成16进制
    for (var i = 0; i < colorArr.length; i++) {
    var hex = Number(colorArr[i]).toString(16);
    if (hex === "0") {
        hex += hex;
    }
    strHex += hex;
    }
    return strHex;
} else {
    return String(color);
}
}


//归一化处理
function normalization(distribution, max, min) {
    let normalizationRatio = (distribution - min) / (max - min)
    return normalizationRatio
}


//颜色转换
//使用方法
//"rgb(255,255,255)".colorHex();  // 0xffffff
// String.prototype.colorHex = function () {
//     // RGB颜色值的正则
//     var reg = /^(rgb|RGB)/;
//     var color = this;
//     if (reg.test(color)) {
//       var strHex = "0x";
//       // 把RGB的3个数值变成数组
//       var colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
//       // 转成16进制
//       for (var i = 0; i < colorArr.length; i++) {
//         var hex = Number(colorArr[i]).toString(16);
//         if (hex === "0") {
//           hex += hex;
//         }
//         strHex += hex;
//       }
//       return strHex;
//     } else {
//       return String(color);
//     }
//   };


// function button_table_click_ABD(){
//     d3.json('/data_forSystem/cit-HepTh/10ANB_10ACC/TIES.json', function(data){
//         console.log(data)
//         ANB_data_List = data['ANB']
//         ACC_data_List = data['ACC']
//         d3.selectAll('.tsne_circle').attr('fill', 'gray').style('opacity', 0.1);
//         for(let key in ANB_data_List){
//             d3.select('#tsne_circle_' + ANB_data_List[key]).attr('fill','blue').style('opacity', 1);
//         }
//     })
// }


// function force_change_color_shortestPath(){
//     d3.json("/data_forSystem/cit-HepTh/shortest_path/ORI_force.json", function(shortest_path_data)
//     {
//         console.log(shortest_path_data.length)
//         d3.json(force_file_name, function(force_datas){
//                 let temp_datas = force_datas['nodes'];
//                 let datas = {};
//                 for(let key in temp_datas){
//                     data_id = temp_datas[key]['id'];
//                     datas[data_id] = temp_datas[key];
//                 }
//                 var circles_change_color = 0xFF4242
//                 choosed_point_data = shortest_path_data;
//                 // console.log(choosed_point_data)
//                 circles_choose.clear();
//                 circles_choose_change_color.clear();
//                 for(let node in  choosed_point_data)
//                 {
//                     if(choosed_point_data[node] in datas){
//                         const now_x = (datas[choosed_point_data[node]].x);
//                         const now_y = (datas[choosed_point_data[node]].y);
//                         d3.select("#tsne_node_"+choosed_point_data[node]).style("fill",circles_change_color);
//                         circles_choose_change_color.beginFill(circles_change_color);
//                         circles_choose_change_color.drawCircle(now_x,now_y,force_circle_r);
//                         circles_choose_change_color.endFill();                        
//                     }
//                 }

//                 force_links_shortestPath = new PIXI.Graphics();
//                 for(var node in choosed_point_data)
//                 {
//                     const now_x = (datas[choosed_point_data[node]].x);
//                     const now_y = (datas[choosed_point_data[node]].y);
//                     force_PIXIJS_lines.lineStyle(0.2, circles_change_color, 0.5);
//                     force_PIXIJS_lines.moveTo(datas['8191'].x, datas['8191'].y);
//                     force_PIXIJS_lines.lineTo(now_x,now_y);
//                 }

//                 // app.stage.addChild(force_links_shortestPath);
//                 app.stage.addChild(circles_choose_change_color);
//                 //tsne该颜色
//                 tsne_chanege_color_by_list(choosed_point_data);
//                 // d3.select('#tsne_brush').remove()
//                 d3.select('#tsne_brush').style('opacity', 0)
//         })

//     })
// }

// function xx(){
//     d3.json(force_file_name, function(force_datas){
//             let temp_datas = force_datas['nodes'];
//             let datas = {};
//             for(let key in temp_datas){
//                 data_id = temp_datas[key]['id'];
//                 datas[data_id] = temp_datas[key];
//             }
//             console.log(datas)
//             var circles_change_color = 0xFF4242
//             // console.log(choosed_point_data)
//             circles_choose.clear();
//             circles_choose_change_color.clear();
//             const now_x = parseInt(datas['8191'].x);
//             const now_y = parseInt(datas['8191'].y);
//             circles_choose_change_color.beginFill(circles_change_color);
//             circles_choose_change_color.drawCircle(now_x,now_y,force_circle_r);
//             circles_choose_change_color.endFill();                        

//             // app.stage.addChild(force_links_shortestPath);
//             app.stage.addChild(circles_choose_change_color);
//             //tsne该颜色
//             // d3.select('#tsne_brush').remove()
//             d3.select('#tsne_brush').style('opacity', 0)
//     })

// }


// function ssb_change_force(){
//     force_change_color(1, 0xffce66)
//     force_change_color(2, 0xff40dd)
//     force_change_color(3, 0xc0bfff);
//     force_change_color(4, 0x54a5fa);
//     force_change_color(5, 0x89c459);
//     force_change_color(6, 0xe62701);
//     force_change_color(10, 0xfe836b);
//     // force_change_color(17, 0xff0000);
//     // force_change_color(3, 0xff0000);
//     // force_change_color(5, 0x00ff00);
// }


// function force_change_color(i, color){
//     var community_circle_color = color;
//     if(color == null){
//         community_circle_color = 0xff0000;
//     }
//     // 9
//     // d3.selectAll('.tsne_node').attr('fill', tsne_unselected_color);
//     // var community_id_fileName = "/data_forSystem/cit-HepTh/community_num/community_id.json"
//     var community_id_fileName = "/data_forSystem/soc-sign/community_id.json"

//     d3.json(community_id_fileName, function(data_community)
//     {
//         d3.json(force_file_name, function(force_datas){
//                 let temp_datas = force_datas['nodes'];
//                 let datas = {};
//                 for(let key in temp_datas){
//                     data_id = temp_datas[key]['id'];
//                     datas[data_id] = temp_datas[key];
//                 }
//                 var circles_change_color = 0xff00ff;
//                 choosed_point_data = data_community[i];
//                 // console.log(choosed_point_data)
//                 // circles_choose.clear();
//                 // circles_choose_change_color.clear();
//                 for(let node in  choosed_point_data)
//                 {
//                     if(choosed_point_data[node] in datas){
//                         const now_x = (datas[choosed_point_data[node]].x);
//                         const now_y = (datas[choosed_point_data[node]].y);
//                         d3.select("#tsne_node_"+choosed_point_data[node]).style("fill",circles_change_color);
//                         circles_choose_change_color.beginFill(community_circle_color);
//                         circles_choose_change_color.drawCircle(now_x,now_y,force_circle_r);
//                         circles_choose_change_color.endFill();                        
//                     }
//                 }
//                 app.stage.addChild(circles_choose_change_color);
//                 //tsne该颜色
//                 tsne_chanege_color_by_list(choosed_point_data);
//                 // d3.select('#tsne_brush').remove()
//                 d3.select('#tsne_brush').style('opacity', 0)
//         })

//     })
// }

// function sankey_change_color(i){
//     d3.selectAll('.sankey_top_node').style('opacity', 0.3)
//     d3.select('#sankey_community_top_' + i).style('opacity', 1)
//     d3.selectAll('.sankey_bottom_node').style('opacity', 0.3)
//     d3.select('#sankey_community_bottom_' + i).style('opacity', 1)
//     d3.selectAll('.sankey_community_path').style('opacity', 0)
//     d3.select('#sankey_community_path_' + i).style('opacity', 0.5)