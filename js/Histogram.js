let dataset = [];
const filter_color = 0x123123;
const rest_color = 0x354985;
const choose_color = 0xff00ff;
const padding = {left:40, right: 20, top:70, bottom:30};

const c_width = document.getElementById('Histogram').offsetWidth;
const c_height = document.getElementById('Histogram').offsetHeight;

var community_num_file_name = NaN
var community_num_data_= '/data_forSystem/cit-HepTh/'


function draw_bar_chart()
{
    d3.json('/data_forSystem/cit-HepTh/shortest_path/CH_shortestPath.json', function(datas)
    // d3.json('/data_forSystem/cit-HepTh/shortest_path/ORI.json', function(datas)‘
    {
        // var cnum = 1
        for(let key in datas)
        {
            // cnum++
            // if(cnum>=10)break;
            var data = {};
            data['id'] = key;
            // data['num'] = Math.log10(datas[key]);
            data['num'] = (datas[key]);
            dataset.push(data);
        }

        let rect_data = []
        for(var key in dataset){
            rect_data.push(dataset[key].num);
        }
        const rectWidth = 4;

        var svg = d3.select('#Histogram')
                    .append('svg')
                    .attr('width',c_width)
                    .attr('height', c_height);
        var xScale = d3.scaleBand()
                .domain(d3.range(0, rect_data.length))
                .range([0, c_width - padding.left - padding.right]);
        yScale = d3.scaleLinear()//V4版本
                .domain([0,d3.max(rect_data)])
                .range([c_height-padding.bottom-padding.top,0]);
        
        var rects_re = svg.selectAll('MyRect_re')
                        .data(rect_data)
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
                        
        svg.append('g')
                .attr('class','axis')
                .attr("transform","translate(" + padding.left + "," + (c_height - padding.bottom) + ")")
                .call(d3.axisBottom(xScale));//d3.axisBottom(xScale)  --V4版本
        svg.append('g')
                .attr('class','axis')
                .attr("transform","translate(" + padding.left + "," + padding.top + ")")
                .call(d3.axisLeft(yScale));//d3.axisLeft(yScale) --V4版本
        
        // svg.append('text')
        //         .text("lgx")
        //         .attr('x', padding.left-20)
        //         .attr('y', padding.top-10)


        // svg.append('rect')
        //         .attr('width', 10)
        //         .attr('height', 10)
        //         .style('opacity', 0.5)
        //         .style('fill', 'steelblue')
        //         .attr('x', c_width - padding.right - 40)
        //         .attr('y', 10)

        // svg.append('text')
        //         .text('origin')
        //         .attr('x', c_width - padding.right - 25)
        //         .attr('y', 18)
                
        // svg.append('rect')
        //         .attr('width', 10)
        //         .attr('height', 10)
        //         .style('fill', 'steelblue')
        //         .attr('x', c_width - padding.right - 40)
        //         .attr('y', 25)

        // svg.append('text')
        //         .text('sample')
        //         .attr('x', c_width - padding.right - 25)
        //         .attr('y', 33)


                                
    })


    
}
draw_bar_chart();

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