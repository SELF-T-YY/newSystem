const superNode_panal = 'superNode'
const superNode_width = document.getElementById(superNode_panal).offsetWidth;
const superNode_height = document.getElementById(superNode_panal).offsetHeight;
const superNode_circle_Color = 0x3A435E;
const superNode_line_Color = 0xc6c6c6;

var a = d3.rgb(133, 193, 233);
var b = d3.rgb(3, 56, 92 );

var compute_color = d3.interpolate(a,b);
var superNodeLink_line = 150
var superNode_force = -3
var superNode_r_plus = 2

var superNode_Data_File = '/data_forSystem/ieee_visC/superNodeData/IV_superNodeData.json'

function draw_community(fileName){
    d3.json(fileName, function (datas)
    {
        var nodes = [];
        var links = [];
        var nodesList = datas['nodes']
        var edgesList = datas['edges']

        for(var i=0;i<nodesList.length;i++)
        {
            var node = {};
            node['id'] = nodesList[i]['communitynum'];
            node['num'] = nodesList[i]['value'];
            nodes.push(node);
        }

        var node_existed = []
        for(var i=0;i<edgesList.length;i++)
        {
            var link = {};
            link["source"] = edgesList[i]['source'];
            link['target'] = edgesList[i]['target'];
            link['value'] = edgesList[i]['value'];
            links.push(link);

            node_existed.push(edgesList[i]['source']);
            node_existed.push(edgesList[i]['target']);
        }

        //获得最大值和最小值
        var node_Num_Min = 1000000000000;
        var node_Num_Max = 0;
        for(let item in nodes){
            node_Num_Max = Math.max(node_Num_Max, nodes[item].num);
        }

        for(let item in nodes){
            node_Num_Min = Math.min(node_Num_Min, nodes[item].num);
        }

        function minnest(num){
            return Math.max(2, num);
        }


        // var node_existed_list = [];
        // var node_Unexisted_list = [];
        // for(var i in nodes){
        //     if(node_existed.indexOf(nodes[i].id) != -1)node_existed_list.push(nodes[i])
        //     else node_Unexisted_list.push(nodes[i]);
        // }
        // console.log(nodes)
        // console.log(node_existed_list)
        // console.log(links)

        
        d3.select('#superNode_svg').remove();
        var svg = d3.select("#" + superNode_panal)
                    .append('svg')
                    .attr('id', 'superNode_svg')
                    .attr('width', superNode_width)
                    .attr('height', superNode_height)
                    // // 如果需要窗口缩放时，自动缩放，绘制SVG时候代码改为如下：
                    // .attr("preserveAspectRatio", "xMidYMid meet")
                    // .attr("viewBox", "0 0 "+ superNode_width + " " + superNode_height );//从左到右依次为：x坐标点起始位置，y坐标点起始位置，视图宽度，视图高度

        
        var simulation = d3.forceSimulation(nodes)
                            .force('link', d3.forceLink(links).distance(superNodeLink_line))
                            .force('charge', d3.forceManyBody()
                                .strength(function(d){
                                    return superNode_force
                                    // console.log(node_existed.indexOf(d.id))
                                    // if(node_existed.indexOf(d.id) != -1)
                                    //     return -2;
                                    // else return 0;
                                })
                            )
                            .force('center', d3.forceCenter(superNode_width/2, superNode_height/2 + 10))
                            // .force('collide', d3.forceCollide(-10).strength(0.2))

        simulation.nodes(nodes)
                .on('tick', ticked)
                
        // simulation.nodes(node_Unexisted_list)
        //             .force('forceRadial', d3.forceRadial(3[50,50]))
        
        simulation.force('link')
                .links(links);



        // 绘制
        var svg_links = svg.selectAll("line")
                            .data(links)
                            .enter()
                            .append("line")
                            .style("stroke","#ccc")
                            .style('opacity', 0.5)
                            .style("stroke-width", function(d){
                                // return 1;
                                var shortest_line = 1
                                var temp = Math.log2(d['value']);
                                if(temp<shortest_line)temp=shortest_line;
                                return temp;
                            })
                            .call(d3.zoom().on("zoom", function () {
                                svg.attr("transform", d3.event.transform)
                             }))
                            // .call(d3.zoom()//创建缩放行为
                            //     .scaleExtent([-5, 10])//设置缩放范围
                            // )
                            // .call(d3.zoom().on("zoom", 10));

        var svg_nodes = svg.selectAll("circle")
                                .data(nodes)
                                .enter()
                                .append("circle")
                                .attr("cx", d => (d.x))
                                .attr("cy", d => (d.y))
                                .attr("r", d =>(Math.log(d.num) * superNode_r_plus))
                                // .attr("r", d =>(minnest(normalization(d.num, node_Num_Max, node_Num_Min)*10)))
                                .attr("class", "community")
                                .attr('id', function(d,i){
                                    return 'community_' + i;
                                })
                                // .attr("fill", d =>(compute_color(normalization(d.num, node_Num_Max, node_Num_Min))))
                                .attr("fill", d =>(compute_color(Math.log(d.num)/8)))
                                // .on("click",community_click_do);
                                // .call(d3.zoom().on("zoom", 10))
                                .call(d3.drag()
                                .on('start', dragstarted)
                                .on('drag', dragged)
                                .on('end', dragended))
                                .call(d3.zoom().on("zoom", function () {
                                    svg.attr("transform", d3.event.transform)
                                 }))

        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();//设置目标α
                d.fx = d.x;
                d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
        }
        function ticked() {
            svg_links.attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

            // svg_nodes.attr("cx", function(d) { return d.x; })
            //         .attr("cy", function(d) { return d.y; });

            // var temp_x = 50
            // var temp_y = 10
            // for(var i in node_Unexisted_list){
            //     d3.select('#community_' + String(node_Unexisted_list[i].id))
            //         .attr('cx', temp_x)
            //         .attr('cy', temp_y)
            //         temp_y += 10
            //         if(temp_y > superNode_height)
            //         {
            //             temp_y = 10;
            //             temp_x += 10;
            //         }
            // }       

            var radius = 10
            svg_nodes
                .attr("cx", function(d) {
                    return (d.x = Math.max(radius, Math.min(superNode_width - radius , d.x)));
                })
                .attr("cy", function(d) {
                    return (d.y = Math.max(radius, Math.min(superNode_height - radius, d.y)));
                })

            // var temp_x = 50
            // var temp_y = 10
            // for(var i in node_Unexisted_list){
            //     d3.select('#community_' + String(node_Unexisted_list[i].id))
            //         .attr('cx', temp_x)
            //         .attr('cy', temp_y)
            //         temp_y += 10
            //         if(temp_y > superNode_height)
            //         {
            //             temp_y = 10;
            //             temp_x += 10;
            //         }
            // }
        }

            

            // var colorBar_Node = [node_Num_Min, 
            //     (node_Num_Max-node_Num_Min)/5*1+node_Num_Min, 
            //     (node_Num_Max-node_Num_Min)/5*2+node_Num_Min,
            //     (node_Num_Max-node_Num_Min)/5*3+node_Num_Min,
            //     (node_Num_Max-node_Num_Min)/5*4+node_Num_Min,
            //     node_Num_Max]
            // var colorBar_Data = []
            // for(let i in colorBar_Node){
            //     let temp = normalization(colorBar_Node[i], node_Num_Max, node_Num_Min);
            //     colorBar_Data.push(temp);
            // }

            // var plus = 10
            // var svg_colorBar = svg.selectAll(".colorBar")
            //                     .data(colorBar_Data)
            //                     .enter()
            //                     .append("circle")
            //                     // .attr("cx", d =>(minnest(d*plus)))
            //                     .attr('cx', 30)
            //                     .attr("cy", function(d, i){
            //                         var ans = 0;
            //                         for(let x=0;x<=i;x++){
            //                             ans += minnest(colorBar_Data[x]*plus)*2
            //                         }
            //                         return ans + 10;
            //                     })
            //                     .attr("r", d =>(minnest(d*plus)))
            //                     .attr("class", "colorBar")
            //                     .attr("fill", d =>(compute_color(d)))
            //                     .attr("transform", "translate(0, 10)")

            // var svg_text_1 = svg.append('text')
            //                     .attr('x', 0)
            //                     .attr('y', 2)
            //                     .text('min')
            //                     .style("font-size", "15px")
            //                     .style('font-weight', 'lighter')
            //                     // .attr("text-anchor", "middle")
            //                     .attr("dy", "1em")


            // var svg_text_2 = svg.append('text')
            //                     .attr('x', 0)
            //                     .attr('y', 130)
            //                     .text('max')
            //                     .style("font-size", "15px")
            //                     .style('font-weight', 'lighter') 
            //                     // .attr("text-anchor", "middle")
            //                     .attr("dy", "1em")  
            
            // var svg_text_3 = svg.append('text')
            //                     .attr('x', 0)
            //                     .attr('y', 0)
            //                     .text('NodeNum')
            //                     .style("font-size", "15px")
            //                     .style('font-weight', 'lighter') 
            //                     // .attr("text-anchor", "middle")
            //                     .attr("dy", "1em")

            // var svg_nodes = svg.selectAll("circle")
            // .data(nodes)
            // .enter()
            // .append("circle")
            // .attr("cx", d => (d.x))
            // .attr("cy", d => (d.y))
            // .attr("r", d =>(minnest(normalization(d.num, node_Num_Max, node_Num_Min)*20)))
            // .attr("class", "community")
            // .attr('id', function(d,i){
            //     return 'community_' + i;
            // })
            // .attr("fill", d =>(compute_color(normalization(d.num, node_Num_Max, node_Num_Min))))
            // // .on("click",community_click_do);


    })
}


draw_community(superNode_Data_File);


// var community_sortList_communityNum_No = {}
// var community_sortList_No_communityNum ={}

// function sort_community(){
//     community_sortList_communityNum_No = {}
//     community_sortList_No_communityNum ={}
//     var community_Num_sortList = []
//     d3.json(superNode_Data_File, function(data){
//         var communityData = data['nodes']
//         community_Num_sortList = communityData.sort(function(a, b){
//             return b['value'] - a['value'];
//         })

//         for(let i in community_Num_sortList){
//             community_sortList_communityNum_No[community_Num_sortList[i]['communitynum']] = parseInt(i)
//             community_sortList_No_communityNum[i] = community_Num_sortList[i]['communitynum']
//         }
//         console.log(community_sortList_communityNum_No)        
//     })

// }

// sort_community()