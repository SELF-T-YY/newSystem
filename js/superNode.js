const superNode_width = document.getElementById('Histogram').offsetWidth;
const superNode_height = document.getElementById('Histogram').offsetHeight;
const superNode_circle_Color = 0x3A435E;
const superNode_line_Color = 0xc6c6c6;

const superNode_Data_reFile = '/data_forSystem/cit-HepTh/superNodeData/CH_superNodeData.json'

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
            node['id'] = nodesList[i]['community'];
            node['num'] = nodesList[i]['value'];
            nodes.push(node);
        }

        for(var i=0;i<edgesList.length;i++)
        {
            var link = {};
            link["source"] = edgesList[i]['source'];
            link['target'] = edgesList[i]['target'];
            link['value'] = edgesList[i]['value'];
            links.push(link);
        }

        var svg = d3.select("#Histogram")
                    .append('svg')
                    .attr('width', superNode_width)
                    .attr('height', superNode_height);
        
        var simulation = d3.forceSimulation(nodes)
                            .force('link', d3.forceLink(links).distance(100))
                            .force('charge', d3.forceManyBody())
                            .force('center', d3.forceCenter(superNode_width/2, superNode_height/2));

        simulation
                .nodes(nodes)
                .on('tick', ticked);
        
        simulation.force('link')
                .links(links);



        // 绘制
        var svg_links = svg.selectAll("line")
                            .data(links)
                            .enter()
                            .append("line")
                            .style("stroke","#ccc")
                            .style("stroke-width", function(d){
                                // d['value'] / 1;
                                return d['value']/100;
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
                                .attr("r", d =>(Math.log(d.num)))
                                .attr("class", "community")
                                .attr('id', function(d,i){
                                    return 'community_' + i;
                                })
                                .attr("fill", 'steelblue')
                                .on("click",community_click_do);

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

            svg_nodes.attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; });
        }
    })
}


// draw_community(superNode_Data_reFile);