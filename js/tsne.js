const tsne_width = document.getElementById('Node2vec').offsetWidth;
const tsne_height = document.getElementById('Node2vec').offsetHeight-40;

const tsne_circle_color = '#777';
// const tsne_circle_color = '#000000'
const tsne_circle_choose_color = '#ff00ff'
var tsne_circle_r = 2

// var tsne_filename = "/data_forSystem/cit-HepTh/CH_Tsne.csv";
// var tsne_filename = "/data_forSystem/block2000/B2_Tsne.csv";


let tsne_dataset = [];
let force_node = []

var tsne_filename = "/data_forSystem/ieee_visC/IV_Tsne.csv";

function draw_tsne(filename){
    d3.csv(filename, function(tsne_datas){

        d3.json(force_file_name, function(datas){
            tsne_dataset = [];
            force_node = []

            var t_nodes = datas['nodes'];

            for(let key in t_nodes){
                force_node.push(t_nodes[key]['id']);
            }
            for(let key = 0; key < tsne_datas.length; key++){
                let data = {};
                data.x = parseFloat(tsne_datas[key].x);
                data.y = parseFloat(tsne_datas[key].y);
                data.id = parseInt(tsne_datas[key].id);
                if(force_node.indexOf(tsne_datas[key]['id'])> -1)
                    tsne_dataset.push(data);
            }

            var svg = d3.select('#Node2vec')
                        .append('svg')
                        .attr('id', 'tsne_svg')
                        .attr('width', tsne_width)
                        .attr('height', tsne_height+ 20)
            

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


            var container = svg.append('g');

            // var zoom = d3.zoom()
            //             .on("zoom", zoomed);
    
            // function zoomed() {
            //     console.log(d3.event)
            //     // if(d3.event.sourceEvent == 'WheelEvent'){
                    
            //     // }
            //     x=d3.event.transform.x;
            //     y=d3.event.transform.y;
            //     s=d3.event.scale;
            //     // container.attr("transform", "translate(" + d3.event.transform.x + ", " + d3.event.transform.y + ")");
            //     container.attr("transform", "translate(" + d3.event.transform.x + ", " + d3.event.transform.y + ") scale(" + d3.event.scale + ")");
            // }


            container.append('g')
                .selectAll('.tsne_circle')
                .data(tsne_dataset)
                .enter()
                .append('circle')
                .attr('r', tsne_circle_r)
                .attr('fill', tsne_circle_color)
                .attr('cx', function(d){ return d['x']; })
                .attr('cy', function(d){ return d['y']; })
                .attr('class', 'tsne_circle')
                .attr('id', function(d){
                    return 'tsne_circle_' + d['id']; 
                })
                .on('click', brush_draw())
                // .call(zoom);
                .attr("stroke-width", 0.3)
                .attr("stroke", "#555")

            
            function brush_draw(){
                var brush = d3.brush()
                                .extent([
                                    [0,0],
                                    [tsne_width,tsne_height]
                                ])
                                .on('start brush', brushed)
                                .on('end', brushend)
                                
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

function brush_draw(){
    var svg = d3.select('#tsne_svg')
    var brush = d3.brush()
                    .extent([
                        [0,0],
                        [tsne_width,tsne_height]
                    ])
                    .on('start brush', brushed)
                    .on('end', brushend)
                    
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



var max_nodes_betweenness = 0;
var min_nodes_betweenness = 1000;

var betweenness_Data_sample_rate ='rate-100';
var betweenness_Data_file_name = '/data_forSystem/ieee_visC/333/IV333ORI1new_Eva.json'



function tsne_betweenness_color(){

    var rate = betweenness_Data_sample_rate
    var filename = betweenness_Data_file_name
    reflash();


    // var a = d3.rgb(255,255,255);
    // var b = d3.rgb(0,0,255);

    var a = d3.rgb(255,255,255);
    var b = d3.rgb(3, 56, 92);

    // var a = d3.rgb(133, 193, 233);
    // var b = d3.rgb(3, 56, 92 );
    var compute_color = d3.interpolate(a,b);
    
    var plus = 5

    
    d3.json(filename, function(error, data) {
        data = data[rate]['ANB'][0]
        var nodes = [];
        for(let i in data){
            let node = {};
            node.id = i;
            node.betweenness = data[i]*10;
            nodes.push(node)
        }
        // console.log(data)
        // console.log(nodes)


        if(rate == 'rate-100'){
            for(let i in nodes){
                min_nodes_betweenness = Math.min(min_nodes_betweenness, nodes[i].betweenness);
                max_nodes_betweenness = Math.max(max_nodes_betweenness, nodes[i].betweenness);
            }
        }

        max_nodes_betweenness = Math.min(0.3, max_nodes_betweenness)
        console.log(max_nodes_betweenness)
        function node_betweenness_normalization(distribution) {
            let normalizationRatio = (distribution - min_nodes_betweenness) / (max_nodes_betweenness - min_nodes_betweenness)
            return normalizationRatio
        }

        for(let i in nodes){
            d3.select('#tsne_circle_' + nodes[i].id)
                .attr('fill', compute_color(node_betweenness_normalization(nodes[i].betweenness)*plus))
                .attr("stroke-width", 0)                                
            // console.log(node_betweenness_normalization(nodes[i].betweenness))
        }

        function max_fix(num){
            return Math.min(0.9, num);
        }

        d3.json(force_file_name, function(force_datas){
            let temp_datas = force_datas['nodes'];
            let datas = {};
            for(let key in temp_datas){
                data_id = temp_datas[key]['id'];
                datas[data_id] = temp_datas[key];
            }
            circles_choose.clear();
            circles_choose_change_color.clear();
            // console.log(datas)
            for(let i in nodes){
                if(nodes[i].id in datas){
                    let node = datas[nodes[i].id];
                    // console.log(node)
                    const now_x = (node.x);
                    const now_y = (node.y);
                    let fill_color = colorHex(compute_color(max_fix(node_betweenness_normalization(nodes[i].betweenness)*plus)))
                    // console.log(fill_color)
                    circles_choose_change_color.beginFill(fill_color);
                    circles_choose_change_color.drawCircle(now_x,now_y, force_circle_r);
                    // circles_choose_change_color.lineStyle(0.1, 0x050505, 0.7);
                    circles_choose_change_color.endFill();                    
                } 
            }
            app.stage.addChild(circles_choose_change_color);
        })
    })

    //图例
    const colorBar_width = 600;
    const colorBar_height = 80;

    let rect_width = 20;
    let rect_height = 20;

    var force_colorBar_svg = d3.select('#Force_colorBar')
                                .append('svg')
                                .attr('id', 'force_colorBar_svg')
                                .attr('width', colorBar_width)
                                .attr('height', colorBar_height)
                                
    const defs = force_colorBar_svg.append("defs"); //插入defs
    const linearGradient = defs //defs中插入<linearGradient>
        .append("linearGradient")
        .attr("id", "gradient"); //设置对应id
    linearGradient //linearGradient中插入stop元素
        .append("stop")
        .attr("offset", "0%") //设置坡度，下同
        .attr("stop-color", compute_color(0));//设置对应颜色，下同
    linearGradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", compute_color(1));

    var force_colorBar_rect = force_colorBar_svg.append('rect')
                                                .attr('height', rect_height)
                                                .attr('width', (rect_width+1)*14)
                                                .style("fill", "url('#gradient')")
                                                .attr("transform", "translate(0, 20)");
    
    // var foce_colorbar_line = force_colorBar_svg.append('line')
    //                                             .attr('x1', 0)
    //                                             .attr('y1', 16)
    //                                             .attr('x2', (rect_width+1)*14)
    //                                             .attr('y2', 16)
    //                                             .attr("class", "line")
    //                                             .style("stroke", "black")
    //                                             .style("stroke-width", "1px")


    var force_colorBar_text_1 = force_colorBar_svg.append('text')
                                                    .attr('x', 0)
                                                    .attr('y', 0)
                                                    .text('min')
                                                    .style("font-size", "15px")
                                                    .style('font-weight', '400')
                                                    // .attr("text-anchor", "middle")
                                                    .attr("dy", "1em")  
    var force_colorBar_text_2 = force_colorBar_svg.append('text')
                                                    .attr('x', (rect_width+1)*14-30)
                                                    .attr('y', 0)
                                                    .text('max')
                                                    .style("font-size", "15px")
                                                    .style('font-weight', '400')
                                                    // .attr("text-anchor", "middle")
                                                    .attr("dy", "1em")
}