const tsne_width = 400;
const tsne_height = 400;

const tsne_circle_color = '#3A435E';
const tsne_circle_choose_color = '#ff00ff'

var tsne_filename = "/data_forSystem/ieee_visC/IV_Tsne.csv";
// var tsne_filename = "/data_forSystem/web-webbase-2001/WW_Tsne.csv";

var force_file_name = '/data_forSystem/ieee_visC/clh/ieee_ClassicalSample1.json'
// var force_file_name = '/data_forSystem/ieee_visC/our_sample_adv/our_sample_times_0_a_0.5_b_0.5_rata_10.json'
function draw_tsne(filename){
    d3.csv(filename, function(tsne_datas){
        let tsne_dataset = [];
        let force_node = []
        d3.json(force_file_name, function(f_datas){
            var datas;
            for(var i in f_datas){
                if(f_datas[i]['name'] == 'ISRW'){
                    datas = f_datas[i]['rate-10'][0]
                    break
                }
            }
            var force_node = datas['nodes'];


            console.log(force_node)
            for(var key=0;key<tsne_datas.length; key++){
                // console.log(tsne_datas[key]['id'])
                // console.log(force_node.indexOf(tsne_datas[key]['id']))
                if(force_node.indexOf(parseInt(tsne_datas[key]['id']))> -1){
                //=================== 
                // if(force_node.indexOf(tsne_datas[key]['id'])> -1){
                    tsne_dataset.push(tsne_datas[key]);                            
                }
                // =============
            }
            tsne_dataset = tsne_datas
            console.log(tsne_dataset)
            var svg = d3.select('#Node2vec')
                        .append('svg')
                        .attr('id', 'tsne_svg')
                        .attr('width', tsne_width)
                        .attr('height', tsne_height)
            

            var x_max = d3.max(tsne_dataset,function(d){
                return parseInt(d['x']);
            })
            var x_min = d3.min(tsne_dataset,function(d){
                return parseInt(d['x']);
            })
            var y_max = d3.max(tsne_dataset,function(d){
                return parseInt(d['y']);
            })
            var y_min = d3.min(tsne_dataset,function(d){
                return parseInt(d['y']);
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

            console.log(tsne_dataset)
            svg.append('g')
                .selectAll('.tsne_circle')
                .data(tsne_dataset)
                .enter()
                .append('circle')
                .attr('r', 1)
                .attr('fill', tsne_circle_color)
                .attr('cx', function(d){ return parseInt(d['x']); })
                .attr('cy', function(d){ return parseInt(d['y']); })
                .attr('class', 'tsne_circle')
                .attr('id', function(d){
                    return 'tsne_circle_' + d['id']; 
                })


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
                tsne_chanege_color_by_list(choose_circle_list);
                
                
            })
        })



    })
}

draw_tsne(tsne_filename);


function tsne_chanege_color_by_list(circle_list){
    console.log(circle_list.length)
    console.log(circle_list)
    for(let key in circle_list){
        d3.select('#tsne_circle_' + circle_list[key]).attr('fill','red').attr('r', 3);
    }
}