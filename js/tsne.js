const tsne_width = document.getElementById('Node2vec').offsetWidth;
const tsne_height = document.getElementById('Node2vec').offsetHeight - 25;

const tsne_circle_color = '#3A435E';
const tsne_circle_choose_color = '#ff00ff'

// var tsne_filename = "/data_forSystem/cit-HepTh/CH_Tsne.csv";
// var tsne_filename = "/data_forSystem/block2000/B2_Tsne.csv";

var tsne_filename = "/data_forSystem/soc-sign-bitcoinotc.csv/old/SSB_Tsne.csv";

function draw_tsne(filename){
    d3.csv(filename, function(tsne_datas){
        let tsne_dataset = [];
        let force_node = []
        d3.json(force_file_name, function(datas){
            var t_nodes = datas['nodes'];
            console.log(t_nodes)
            for(let key in t_nodes){
                force_node.push(t_nodes[key]['id']);
            }
            for(let key = 0; key < tsne_datas.length; key++){
                let data = {};
                data.x = parseFloat(tsne_datas[key].x);
                data.y = parseFloat(tsne_datas[key].y);
                data.id = parseInt(tsne_datas[key].id);
                // if(force_node.indexOf(tsne_datas[key]['id'])> -1)
                    tsne_dataset.push(data);
            }

            var svg = d3.select('#Node2vec')
                        .append('svg')
                        .attr('id', 'tsne_svg')
                        .attr('width', tsne_width)
                        .attr('height', tsne_height)
            

            var x_max = d3.max(tsne_dataset,function(d){
                return d.x;
            })
            var x_min = d3.min(tsne_dataset,function(d){
                return d.x;
            })
            var y_max = d3.max(tsne_dataset,function(d){
                return d.y;
            })
            var y_min = d3.min(tsne_dataset,function(d){
                return d.y;
            })


            var xScale = d3.scaleLinear()
                            .domain([x_min,x_max])
                            .range([30,tsne_width-30]);
            var yScale = d3.scaleLinear()
                            .domain([y_min,y_max])
                            .range([10,tsne_height]);

            for(var i = 0 ; i < tsne_dataset.length; i++){
                tsne_dataset[i].x = parseInt(xScale(tsne_dataset[i].x));
                tsne_dataset[i].y = parseInt(yScale(tsne_dataset[i].y));
            }


            svg.append('g')
                .selectAll('.tsne_circle')
                .data(tsne_dataset)
                .enter()
                .append('circle')
                .attr('r', 1)
                .attr('fill', tsne_circle_color)
                .attr('cx', function(d){ return d['x']; })
                .attr('cy', function(d){ return d['y']; })
                .attr('class', 'tsne_circle')
                .attr('id', function(d){
                    return 'tsne_circle_' + d['id']; 
                })
                .on('click', brush_draw())

            
            function brush_draw(){
                var brush = d3.brush()
                                .extent([
                                    [0,0],
                                    [tsne_width,tsne_height]
                                ])
                                .on('start brush', brushed)
                                .on('end', brushend);
                svg.append('g')
                    .attr('id', 'tsne_brush')
                    .call(brush)


                function brushed(){
                        d3.select('#tsne_brush').style('opacity', 1)
                }
                function brushend(){
                    reflash();
                    d3.select('#tsne_brush').style('opacity', 1);

                    var event = d3.event.selection;
                    console.log(event)
                    var x1 = event[0][0];
                    var y1 = event[0][1];
                    var x2 = event[1][0];
                    var y2 = event[1][1];
                    var x_max = d3.max([x1,x2]);
                    var y_max = d3.max([y1,y2]);
                    var x_min = d3.min([x1,x2]);
                    var y_min = d3.min([y1,y2]);
                    var circle_choosed = [];
                    for(var key in tsne_dataset){
                        var x = tsne_dataset[key].x;
                        var y = tsne_dataset[key].y;
                        if(x >= x_min && x <= x_max && y >= y_min && y <= y_max){
                            circle_choosed.push(tsne_dataset[key]['id']);
                        }
                    }
                    tsne_chanege_color_by_list(circle_choosed);
                    tsne_choose_force_change_color(circle_choosed);
                }
            }
        })



    })
}

draw_tsne(tsne_filename);

