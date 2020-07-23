const superNode_panal = 'superNode'
const superNode_width = document.getElementById(superNode_panal).offsetWidth;
const superNode_height = document.getElementById(superNode_panal).offsetHeight-10;
const superNode_circle_Color = 0x3A435E;
const superNode_line_Color = 0xc6c6c6;

var a = d3.rgb(133, 193, 233);
var b = d3.rgb(3, 56, 92 );

var compute_color = d3.interpolate(a,b);

const superNode_Data_reFile = '/data_forSystem/ieee_visC/superNodeData/IV_superNodeData.json'
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

        var node_existed_list = [];
        var node_Unexisted_list = [];
        for(var i in nodes){
            if(node_existed.indexOf(nodes[i].id) != -1)node_existed_list.push(nodes[i])
            else node_Unexisted_list.push(nodes[i]);
        }
        // console.log(nodes)
        // console.log(node_existed_list)
        // console.log(links)
        var svg = d3.select("#" + superNode_panal)
                    .append('svg')
                    .attr('id', 'superNode_svg')
                    .attr('width', superNode_width)
                    .attr('height', superNode_height);
        
        var simulation = d3.forceSimulation(nodes)
                            .force('link', d3.forceLink(links).distance(100))
                            .force('charge', d3.forceManyBody()
                                .strength(function(d){
                                    // console.log(node_existed.indexOf(d.id))
                                    if(node_existed.indexOf(d.id) != -1)
                                        return -10;
                                    else return 0;
                                })
                            )
                            .force('center', d3.forceCenter(superNode_width/2, superNode_height/2))
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
                            .call(d3.zoom()//创建缩放行为
                                .scaleExtent([-5, 10])//设置缩放范围
                            );

        var svg_nodes = svg.selectAll("circle")
                                .data(nodes)
                                .enter()
                                .append("circle")
                                .attr("cx", d => (d.x))
                                .attr("cy", d => (d.y))
                                // .attr('fill', d =>(d['color']))
                                .attr("r", d =>(Math.log(d.num) * 2))
                                .attr("class", "community")
                                .attr('id', function(d,i){
                                    return 'community_' + i;
                                })
                                .attr("fill", d =>(compute_color(Math.log(d.num)/10)))
                                // .on("click",community_click_do);

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
                    return (d.x = Math.max(radius, Math.min(superNode_width - radius, d.x)));
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


    })
}


draw_community(superNode_Data_reFile);