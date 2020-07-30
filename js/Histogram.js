let dataset = [];
const filter_color = 0x123123;
const rest_color = 0x354985;
const choose_color = 0xff00ff;
const padding = {left:22, right: 15, top:24, bottom:20};

const c_width = document.getElementById('Histogram').offsetWidth;
const c_height = document.getElementById('Histogram').offsetHeight;

var APL_filePath_ori = '/data_forSystem/ieee_visC/shortestPath/IV_shortestPath.json'
var APL_filePath = '/data_forSystem/ieee_visC/shortestPath/IV_shortestPath.json'

var pg_sample_rate = 'rate-5'
var pg_file_name = '/data_forSystem/ieee_visC/pdData/IVxxxori_Eva.json'
var pg_name = 'ANB'

var pg_file_name_ori = '/data_forSystem/ieee_visC/pdData/IVxxxori_Eva.json'

// var community_num_file_name = NaN
// var community_num_data_= '/data_forSystem/cit-HepTh/'


// function draw_bar_chart()
// {
//     // d3.json('/data_forSystem/cit-HepTh/shortest_path/CH_shortestPath.json', function(datas)
//     d3.json('/data_forSystem/web-webbase-2001/shortest_path/WW_ISRW_rate-10_shortestPath.json', function(datas)
//     {
//         // var cnum = 1
//         for(let key in datas)
//         {
//             // cnum++
//             // if(cnum>=10)break;
//             var data = {};
//             data['id'] = key;
//             data['num'] = Math.log10(datas[key]);
//             // data['num'] = (datas[key]);
//             dataset.push(data);
//         }

//         let rect_data = []
//         for(var key in dataset){
//             rect_data.push(dataset[key].num);
//         }
//         const rectWidth = 4;

//         var svg = d3.select('#Histogram')
//                     .append('svg')
//                     .attr('id', 'pg_svg')
//                     .attr('width',c_width)
//                     .attr('height', c_height);
//         var xScale = d3.scaleBand()
//                 // .domain(d3.range(0, rect_data.length))
//                 .domain(d3.range(0, 25))
//                 .range([0, c_width - padding.left - padding.right]);
//         yScale = d3.scaleLinear()//V4版本
//                 // .domain([0, 7])
//                 .domain([0, 7])
//                 .range([c_height-padding.bottom-padding.top,0]);
        
//         var rects_re = svg.selectAll('MyRect_re')
//                         .data(rect_data)
//                         .enter()
//                         .append('rect')
//                         .attr('class','MyRect_re')
//                         .attr("transform","translate(" + padding.left + "," + padding.top + ")")
//                         .attr('x',function(d,i){
//                             return xScale(i) + rectWidth/2;
//                         }).attr('y',function(d,i){
//                             return yScale(d);
//                         }).attr('width',xScale.bandwidth() - rectWidth)
//                         .attr('height',function(d,i){
//                             return c_height-padding.bottom-padding.top-yScale(d);
//                         }).attr('fill','steelblue')
//                         .style('opacity', 0.5)
//                         .attr("class", "community_Distribution")


//         var rects = svg.selectAll('MyRect')
//                         .data(rect_data)
//                         .enter()
//                         .append('rect')
//                         .attr('class','MyRect')
//                         .attr("transform","translate(" + padding.left + "," + padding.top + ")")
//                         .attr('x',function(d,i){
//                             return xScale(i) + rectWidth/2;
//                         })
//                         .attr('y',function(d,i){
//                             return yScale(d);
//                         })
//                         .attr('width',xScale.bandwidth() - rectWidth)
//                         .attr('height',function(d,i){
//                             return c_height-padding.bottom-padding.top-yScale(d);
//                         })
//                         .attr('fill','steelblue')
//                         .attr("id",function(d, i){
//                             return "community_Distribution_" + dataset[i].id;
//                         })
//                         .attr("class", "community_Distribution")
//                         .on("click",function(d,i){community_click_do(d, dataset[i].id)});
                        
//         svg.append('g')
//                 .attr('class','axis')
//                 .attr("transform","translate(" + padding.left + "," + (c_height - padding.bottom) + ")")
//                 .call(d3.axisBottom(xScale));//d3.axisBottom(xScale)  --V4版本
//         svg.append('g')
//                 .attr('class','axis')
//                 .attr("transform","translate(" + padding.left + "," + padding.top + ")")
//                 .call(d3.axisLeft(yScale).ticks(7))//d3.axisLeft(yScale) --V4版本
        
//         svg.append('text')
//                 .text("lgx")
//                 .attr('x', padding.left-20)
//                 .attr('y', padding.top-10)


//         // svg.append('rect')
//         //         .attr('width', 10)
//         //         .attr('height', 10)
//         //         .style('opacity', 0.5)
//         //         .style('fill', 'steelblue')
//         //         .attr('x', c_width - padding.right - 40)
//         //         .attr('y', 10)

//         // svg.append('text')
//         //         .text('origin')
//         //         .attr('x', c_width - padding.right - 25)
//         //         .attr('y', 18)
                
//         // svg.append('rect')
//         //         .attr('width', 10)
//         //         .attr('height', 10)
//         //         .style('fill', 'steelblue')
//         //         .attr('x', c_width - padding.right - 40)
//         //         .attr('y', 25)

//         // svg.append('text')
//         //         .text('sample')
//         //         .attr('x', c_width - padding.right - 25)
//         //         .attr('y', 33)


                                
//     })


    
// }



function draw_APL(file_name, orifileName){
    var range_num = 21
    d3.json(file_name, function(datas)
    {
        var dataset = []
        var cnum = 1
        var temp_sum = 0
        for(let key in datas)
        {
            cnum++
            if(cnum<range_num){
                var data = {};
                data['id'] = key;
                if(datas[key] == 0) data['num'] = 0;
                else data['num'] = Math.log10(datas[key]);
                // data['num'] = (datas[key]);
                dataset.push(data);                
            }
            else if(cnum>=range_num){
                temp_sum += datas[key];
            }
            else if(cnum == datas.length()){
                var data = {};
                data['id'] = range_num;
                if(datas[key] == 0) data['num'] = 0;
                else data['num'] = Math.log10(temp_sum);
                // data['num'] = (datas[key]);
                dataset.push(data);       
            }


        }
        let rect_data = []
        for(var key in dataset){
            rect_data.push(dataset[key].num);
        }

        d3.json(orifileName, function(oridata) {
            var ori_dataset = []
            var cnum = 1
            var temp_sum = 0
            for(let key in oridata)
            {
                cnum++
                if(cnum<range_num){
                    var data = {};
                    data['id'] = key;
                    if(oridata[key] == 0) data['num'] = 0;
                    else data['num'] = Math.log10(oridata[key]);
                    // data['num'] = (datas[key]);
                    ori_dataset.push(data);                
                }
                else if(cnum>=range_num){
                    temp_sum += oridata[key];
                }
                else if(cnum == oridata.length()){
                    var data = {};
                    data['id'] = range_num;
                    if(oridata[key] == 0) data['num'] = 0;
                    else data['num'] = Math.log10(temp_sum);
                    // data['num'] = (datas[key]);
                    ori_dataset.push(data);       
                }
    
    
            }
            let ori_rect_data = []
            for(var key in ori_dataset){
                ori_rect_data.push(ori_dataset[key].num);
            }         
            const rectWidth = 4;
    
            d3.select('#pg_svg').remove();
            var svg = d3.select('#Histogram')
                        .append('svg')
                        .attr('id', 'pg_svg')
                        .attr('width',c_width)
                        .attr('height', c_height);
            var xScale = d3.scaleBand()
                    // .domain(d3.range(0, rect_data.length))
                    .domain(d3.range(0, range_num + 2))
                    .range([0, c_width - padding.left - padding.right]);
            yScale = d3.scaleLinear()//V4版本
                    // .domain([0, 7])
                    .domain([0, 7])
                    .range([c_height-padding.bottom-padding.top,0]);
            
            var rects_re = svg.selectAll('MyRect_re')
                            .data(ori_rect_data)
                            .enter()
                            .append('rect')
                            .attr('class','MyRect_re')
                            .attr("transform","translate(" + padding.left + "," + padding.top + ")")
                            .attr('x',function(d,i){
                                return xScale(i) + rectWidth/2;
                            }).attr('y',function(d,i){
                                return yScale(d);
                            }).attr('width',xScale.bandwidth() - rectWidth)
                            .attr('height',function(d,i){
                                return c_height-padding.bottom-padding.top-yScale(d);
                            }).attr('fill','steelblue')
                            .style('opacity', 0.5)
                            .attr("class", "community_Distribution")
    
    
            var rects = svg.selectAll('MyRect')
                            .data(rect_data)
                            .enter()
                            .append('rect')
                            .attr('class','MyRect')
                            .attr("transform","translate(" + padding.left + "," + padding.top + ")")
                            .attr('x',function(d,i){
                                return xScale(i) + rectWidth/2;
                            })
                            .attr('y',function(d,i){
                                return yScale(d);
                            })
                            .attr('width',xScale.bandwidth() - rectWidth)
                            .attr('height',function(d,i){
                                return c_height-padding.bottom-padding.top-yScale(d);
                            })
                            .attr('fill','steelblue')
                            .attr("id",function(d, i){
                                return "community_Distribution_" + dataset[i].id;
                            })
                            .attr("class", "community_Distribution")
                            .on("click",function(d,i){community_click_do(d, dataset[i].id)});

            
            for(let i in rect_data){
                if(rect_data[i] > ori_rect_data[i]){
                    svg.append('rect')
                        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
                        .attr('x',xScale(i) + rectWidth/2)
                        .attr('y',yScale(ori_rect_data[i]))
                        .attr('width',xScale.bandwidth() - rectWidth)
                        .attr('height',c_height-padding.bottom-padding.top-yScale(ori_rect_data[i]))
                        .attr('fill','#a3c1da')
                        .attr("id", "community_Distribution_re_" + dataset[i].id)
                        .attr("class", "community_Distribution")
                }
            }
                            
            svg.append('g')
                    .attr('class','axis')
                    .attr("transform","translate(" + padding.left + "," + (c_height - padding.bottom) + ")")
                    .call(d3.axisBottom(xScale));//d3.axisBottom(xScale)  --V4版本
            
            svg.append('g')
                    .attr('class','axis')
                    .attr("transform","translate(" + padding.left + "," + padding.top + ")")
                    .call(d3.axisLeft(yScale).ticks(7))//d3.axisLeft(yScale) --V4版本
            
            svg.append('text')
                    .text("lgx")
                    .attr('x', padding.left-20)
                    .attr('y', padding.top-10)
    
    
            svg.append('rect')
                .attr('width', 10)
                .attr('height', 10)
                .style('opacity', 0.5)
                .style('fill', 'steelblue')
                .attr('x', c_width - padding.right - 45)
                .attr('y', 10)

            svg.append('text')
                    .text('origin')
                    .attr('x', c_width - padding.right - 30)
                    .attr('y', 18)
                    
            svg.append('rect')
                    .attr('width', 10)
                    .attr('height', 10)
                    .style('fill', 'steelblue')
                    .attr('x', c_width - padding.right - 45)
                    .attr('y', 25)

            svg.append('text')
                    .text('sample')
                    .attr('x', c_width - padding.right - 30)
                    .attr('y', 33)

        });
    })

}


function draw_other(sample_rate, pg_name, file_name, ori_file_name){
    var range_num = 22
    var y_zhouNum = 2;
    var x_zhouNum = 18;
    d3.json(file_name, function(sample_data)
    {
        console.log(sample_data[sample_rate])
        var dataset = []
        var datas_all = sample_data[sample_rate][pg_name][0];
        var datas = datas_all.value;
        // console.log(datas)
        var cnum = 1
        var temp_sum = 0
        for(let key in datas)
        {
            cnum++
            if(cnum<range_num){
                var data = {};
                data['id'] = key;
                if(datas[key] == 0) data['num'] = 0;
                else data['num'] = Math.log10(datas[key]);
                // data['num'] = (datas[key]);
                dataset.push(data);                
            }
            else if(cnum>=range_num){
                temp_sum += datas[key];
            }
            else if(cnum == datas.length()){
                var data = {};
                data['id'] = range_num;
                if(datas[key] == 0) data['num'] = 0;
                else data['num'] = Math.log10(temp_sum);
                // data['num'] = (datas[key]);
                dataset.push(data);       
            }
        }
        
        let rect_data = [];
        for(var key in dataset){
            rect_data.push(dataset[key].num);
        }

        d3.json(ori_file_name, function(ori_data){
            var ori_dataset = []
            var ori_datas_all = ori_data['rate-5'][pg_name][0];
            var ori_datas = ori_datas_all.value;
            // console.log(ori_datas)
            var cnum = 1
            var temp_sum = 0
            for(let key in ori_datas)
            {
                cnum++
                if(cnum<range_num){
                    var data = {};
                    data['id'] = key;
                    if(ori_datas[key] == 0) data['num'] = 0;
                    else data['num'] = Math.log10(ori_datas[key]);
                    // data['num'] = (datas[key]);
                    y_zhouNum = parseInt(Math.max(y_zhouNum, data['num']));
                    x_zhouNum = cnum;
                    ori_dataset.push(data);                
                }
                else if(cnum>=range_num){
                    temp_sum += ori_datas[key];
                }
                else if(cnum == ori_datas.length()){
                    var data = {};
                    data['id'] = range_num;
                    if(ori_datas[key] == 0) data['num'] = 0;
                    else data['num'] = Math.log10(temp_sum);
                    // data['num'] = (datas[key]);
                    
                    y_zhouNum = parseInt(Math.max(y_zhouNum, data['num']));
                    x_zhouNum = range_num;
                    console.log(data['num']);


                    ori_dataset.push(data);       
                }
            }

            y_zhouNum++;
            
            let ori_rect_data = [];
            for(var key in ori_dataset){
                ori_rect_data.push(ori_dataset[key].num);
            }

            const rectWidth = 4;


            d3.select('#pg_svg').remove();
            var svg = d3.select('#Histogram')
                        .append('svg')
                        .attr('id', 'pg_svg')
                        .attr('width',c_width)
                        .attr('height', c_height);
            var xScale = d3.scaleBand()
                    // .domain(d3.range(0, rect_data.length))
                    .domain(d3.range(0, x_zhouNum))
                    .range([0, c_width - padding.left - padding.right]);
            yScale = d3.scaleLinear()//V4版本
                    // .domain([0, 7])
                    .domain([0, y_zhouNum])
                    .range([c_height-padding.bottom-padding.top,0]);
            
            var rects_re = svg.selectAll('MyRect_re')
                            .data(ori_rect_data)
                            .enter()
                            .append('rect')
                            .attr('class','MyRect_re')
                            .attr("transform","translate(" + padding.left + "," + padding.top + ")")
                            .attr('x',function(d,i){
                                return xScale(i) + rectWidth/2;
                            }).attr('y',function(d,i){
                                return yScale(d);
                            }).attr('width',xScale.bandwidth() - rectWidth)
                            .attr('height',function(d,i){
                                return c_height-padding.bottom-padding.top-yScale(d);
                            }).attr('fill','steelblue')
                            .style('opacity', 0.5)
                            .attr("class", "community_Distribution")


            var rects = svg.selectAll('MyRect')
                            .data(rect_data)
                            .enter()
                            .append('rect')
                            .attr('class','MyRect')
                            .attr("transform","translate(" + padding.left + "," + padding.top + ")")
                            .attr('x',function(d,i){
                                return xScale(i) + rectWidth/2;
                            })
                            .attr('y',function(d,i){
                                return yScale(d);
                            })
                            .attr('width',xScale.bandwidth() - rectWidth)
                            .attr('height',function(d,i){
                                return c_height-padding.bottom-padding.top-yScale(d);
                            })
                            .attr('fill','steelblue')
                            .attr("id",function(d, i){
                                return "community_Distribution_" + dataset[i].id;
                            })
                            .attr("class", "community_Distribution")
                            .on("click",function(d,i){community_click_do(d, dataset[i].id)});



            for(let i in rect_data){
                if(rect_data[i] > ori_rect_data[i]){
                    svg.append('rect')
                        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
                        .attr('x',xScale(i) + rectWidth/2)
                        .attr('y',yScale(ori_rect_data[i]))
                        .attr('width',xScale.bandwidth() - rectWidth)
                        .attr('height',c_height-padding.bottom-padding.top-yScale(ori_rect_data[i]))
                        .attr('fill','#a3c1da')
                        .attr("id", "community_Distribution_re_" + dataset[i].id)
                        .attr("class", "community_Distribution")
                }
            }
                            
            svg.append('g')
                    .attr('class','axis')
                    .attr("transform","translate(" + padding.left + "," + (c_height - padding.bottom) + ")")
                    .call(d3.axisBottom(xScale));//d3.axisBottom(xScale)  --V4版本
            svg.append('g')
                    .attr('class','axis')
                    .attr("transform","translate(" + padding.left + "," + padding.top + ")")
                    .call(d3.axisLeft(yScale).ticks(y_zhouNum))//d3.axisLeft(yScale) --V4版本
            
            svg.append('text')
                    .text("lgx")
                    .attr('x', padding.left-20)
                    .attr('y', padding.top-10)


            svg.append('rect')
                    .attr('width', 10)
                    .attr('height', 10)
                    .style('opacity', 0.5)
                    .style('fill', 'steelblue')
                    .attr('x', c_width - padding.right - 45)
                    .attr('y', 10)

            svg.append('text')
                    .text('origin')
                    .attr('x', c_width - padding.right - 30)
                    .attr('y', 18)
                    
            svg.append('rect')
                    .attr('width', 10)
                    .attr('height', 10)
                    .style('fill', 'steelblue')
                    .attr('x', c_width - padding.right - 45)
                    .attr('y', 25)

            svg.append('text')
                    .text('sample')
                    .attr('x', c_width - padding.right - 30)
                    .attr('y', 33)                
        })

        })


}

function draw_community_disribution_again(){

    d3.json(community_num_file_name, function(community_num){
        var dataset = []
        for(var i =0;i<=33;i++){
            var rect = d3.select('#community_Distribution_' + i)
                            .transition()
                            .duration(2000)
                            .attr('height',0);
        }
        for(var key in community_num){
            var data = {};
            data['id'] = key;
            data['num'] = Math.log10(community_num[key]);
            var rect = d3.select('#community_Distribution_' + key)
                            .transition()
                            .duration(2000)
                            .attr('y', yScale(data['num'] * 0.4))
                            .attr('height',c_height-padding.bottom-padding.top-yScale(data['num'] * 0.4) );
        }
    })
}





// draw_APL('../data_forSystem/ieee_visC/shortestPath/IV_BFS_rate_10_shortestPath.json')
draw_other(pg_sample_rate, pg_name, pg_file_name, pg_file_name_ori);