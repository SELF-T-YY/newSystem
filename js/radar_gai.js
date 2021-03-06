var colorscale =d3.scaleOrdinal()
// .range(["#0000FF","#b3cde3","#ccebc5","#decbe4","#fed9a6","#e5d8bd", '#cccccc']);
// .range(['#546BFB','#BEBDFF','#8CBA68','#D2E600','#F66493', '#DA7C69','#AB5B80'])
.range(['#BEBDFF','#8CBA68','#D2E600','#F66493', '#DA7C69','#AB5B80','#0000FF'])


// ['#035F93', '#546BFB','#54A8FE',"#00B5F1",'#BEBDFF','#8CBA68','#D2E600',
// '#FED9EF','#F66493', '#DA7C69', '#DC2A07','#FF3F3F','#E942CC','#AB5B80']

var RadarChart = {
    draw: function(id, d, options, if_100){
    var cfg = {
       radius: 5,
       w: 650,
       h: 650,
       factor: 1,
       factorLegend: .85,
       levels: 3,
       maxValue: 1,
       radians: 2 * Math.PI,
       opacityArea: 0.5,
       ToRight: 5,
       TranslateX: 80,
       TranslateY: 30,
       ExtraWidthX: 100,
       ExtraWidthY: 100,
      //  color: d3.scaleOrdinal(d3.schemeCategory10)
    //   color:d3.scaleOrdinal()
    //   .range(["#0000FF","#b3cde3","#ccebc5","#decbe4","#fed9a6","#e5d8bd", '#cccccc'])
		color: colorscale
	};
	  if(if_100){
		var d = [
			[
				{axis:"LCC"},
				{axis:"GCC"},
				{axis:"S C"},
				{axis:"SSC"},
				{axis:"APL"},
				{axis:"C C"},
				{axis:"ACC"},
				{axis:"ABD"},
			]
		];
	  }
	  
      if('undefined' !== typeof options){
        for(var i in options){
          if('undefined' !== typeof options[i]){
            cfg[i] = options[i];
          }
        }
      }
	//   cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
		cfg.maxValue = 7
      var allAxis = (d[0].map(function(i, j){return i.axis}));
      var total = 8;
      var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
      var Format = d3.format('%');
      d3.select(id).select("svg").remove();
      
      var g = d3.select(id)
              .append("svg")
              .attr("width", cfg.w+cfg.ExtraWidthX)
              .attr("height", cfg.h+cfg.ExtraWidthY)
              .append("g")
              .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
              ;
  
      var tooltip;
      
      //Circular segments
      for(var j=0; j<cfg.levels; j++){
        var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
        g.selectAll(".levels")
         .data(allAxis)
         .enter()
         .append("svg:line")
         .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
         .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
         .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
         .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
         .attr("class", "line")
         .style("stroke", "#ccc")
        //  .style("stroke-opacity", "0.7")
         .style("stroke-opacity", "1")
         .style("stroke-width", "2px")
         .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");

        }


      series = 0;
      var levelFactor = cfg.factor*radius*1;
      var axis = g.selectAll(".axis")
              .data(allAxis)
              .enter()
              .append("g")
              .attr("class", "axis");
  
      axis.append("line")
          .attr("x1", levelFactor)
          .attr("y1", levelFactor)
          .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
          .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
          .attr("class", "line")
          .style("stroke", "#ccc")
          .style("stroke-width", "2px")
         .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");

		 axis.append("text")
			.attr("class", "legend")
			.text(function(d){return d})
			// .style("font-family", "sans-serif")
			.style("font-size", "14px")
			.style('font-weight', '400')
			// .attr("text-anchor", "middle")
			.attr("dy", "2em")
			.attr("transform", function(d, i){return "translate(-15, -22)"})
			.attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-44*Math.sin(i*cfg.radians/total);})
			.attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))+10*Math.cos(i*cfg.radians/total);});		
		
		
		if (if_100){
		}
		else{
			d.forEach(function(y, x){
				dataValues = [];
				g.selectAll(".nodes")
					.data(y, function(j, i){
					dataValues.push([
						levelFactor*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
						25 + levelFactor*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
					]);
					})
				dataValues.push(dataValues[0]);
				g.selectAll(".area")
					.data([dataValues])
					.enter()
					.append("polygon")
					.attr("class", "radar-chart-serie"+series)
					.style("stroke-width", "2px")
					.style("stroke", cfg.color(series))
					.style('opacity', 0.7)
					.attr("points",function(d) {
						var str="";
						for(var pti=0;pti<d.length;pti++){
							str=str+d[pti][0]+","+d[pti][1]+" ";
						}
						return str;
					})
					.style("fill", function(j, i){return cfg.color(series)})
					.style("fill-opacity", 0)

				//   .style("fill-opacity", .5)
					.on('mouseover', function (d){
									z = "polygon."+d3.select(this).attr("class");
									g.selectAll("polygon")
										.transition(200)
									//   .style("fill-opacity", 0.1); 
									.style('opacity', 0.1)
									g.selectAll(z)
										.transition(200)
									//   .style("fill-opacity", .7);
									.style('opacity', 1)
									})
					.on('mouseout', function(){
									g.selectAll("polygon")
										.transition(200)
										.style("fill-opacity", 0)
										.style('opacity', 0.7)
					});
				series++;
				});
				series=0;
				//node
				d.forEach(function(y, x){
					g.selectAll(".nodes")
						.data(y).enter()
						.append("svg:circle")
						.attr("class", "radar-chart-serie"+series)
						.attr('r', 2)
						.style("fill-opacity", .7)
						.attr("alt", function(j){return Math.max(j.value, 0)})
						.attr("cx", function(j, i){
							return levelFactor*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
						})
						.attr("cy", function(j, i){
						return  25 + levelFactor*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
						})
						.attr("data-id", function(j){return j.axis})
						.style("fill", '#e5e8ec')
						.attr("stroke-width", 0.5)
						.attr("stroke", "#555")
						.style("fill-opacity", 1)

	
					//   .style("fill", cfg.color	(series)).style("fill-opacity", 1)
						// .on('mouseover', function (d){
						// 			newX =  parseFloat(d3.select(this).attr('cx')) - 10;
						// 			newY =  parseFloat(d3.select(this).attr('cy')) - 5;
	
						// 		//   tooltip
						// 		//       .attr('x', newX)
						// 		//       .attr('y', newY)
						// 		//       .text(Format(d.value))
						// 		//       .transition(200)
						// 		//       .style('opacity', 1);
								
						// 			z = "polygon."+d3.select(this).attr("class");
						// 			g.selectAll("polygon")
						// 				.transition(200)
						// 				.style("fill-opacity", 0.1); 
						// 			g.selectAll(z)
						// 				.transition(200)
						// 				.style("fill-opacity", .7);
						// 		})
						// .on('mouseout', function(){
						// 		//   tooltip
						// 		//       .transition(200)
						// 		//       .style('opacity', 0);
						// 			g.selectAll("polygon")
						// 				.transition(200)
						// 				.style("fill-opacity", cfg.opacityArea);
						// 		})
						// .append("svg:title")
						// .text(function(j){return Math.max(j.value, 0)});
						series++;
					});
		}
		
	}
};


function drawRadar(data, if_100){
  	var w = 300;
	var h = 350;

	// var colorscale = d3.scaleOrdinal(d3.schemeCategory10);
	// var colorscale =d3.scaleOrdinal()
	// .range(["#0000FF","#b3cde3","#ccebc5","#decbe4","#fed9a6","#e5d8bd", '#cccccc']);

	//Legend titles
	var LegendOptions = ['ISRW', 'TIES', 'SRW', 'RES', 'RJ', 'RNS'];
	var colorscale =d3.scaleOrdinal()
	.range(['#0000FF','#BEBDFF','#8CBA68','#D2E600','#F66493', '#DA7C69','#AB5B80'])
	//Data
	var d = [
		[
			{axis:"LCC"},
			{axis:"GCC"},
			{axis:"S C"},
			{axis:"SSC"},
			{axis:"APL"},
			{axis:"C C"},
			{axis:"ACC"},
			{axis:"ABD"},
		]
	];
	//Options for the Radar chart, other than default
	var mycfg = {
		w: w,
		h: h,
		maxValue: 1,
		levels: 7,
		ExtraWidthX: 300
	}

	//Call function to draw the Radar chart
	//Will expect that data is in %'s
	RadarChart.draw("#Radar", data, mycfg, if_100);

	////////////////////////////////////////////
	/////////// Initiate legend ////////////////
	////////////////////////////////////////////

	var svg = d3.select('#Radar')
		.selectAll('svg')
		.append('svg')
		.attr("width", w)
		.attr("height", h)
			
	//Initiate Legend	
	var legend = svg.append("g")
		.attr("class", "legend")
		.attr("height", 100)
		.attr("width", 200)
		.attr('transform', 'translate(-220,10)') 
		;
		//Create colour squares
		legend.selectAll('rect')
		.data(LegendOptions)
		.enter()
		.append("rect")
		.attr("x", w - 65)
		.attr("y", function(d, i){ return i * 12;})
		.attr("width", 10)
		.attr("height", 10)
		.style("fill", function(d, i){ return colorscale(i);});
		

		//Create text next to squares
		legend.selectAll('text')
		.data(LegendOptions)
		.enter()
		.append("text")
		.attr("x", w - 52)
		.attr("y", function(d, i){ return i * 12 + 9;})
		.attr("font-size", "11px")
		.attr("fill", "#737373")
		.text(function(d) { return d; });	
    
}

var pg_data_List = []
function read_pgData(rate){
	var dataName = data_name
	var  FILE_name = sx(data_name);
	var namelist = ["ori", "OUR", "SRW", "ISRW", "RJ", "RNS", "RES", "TIES", "BFS", "DFS"]
    d3.json("/data_forSystem/" + dataName + "/sort/" + FILE_name + "ave" + namelist[1] + "sort.json", function (OUR) {
        d3.json("/data_forSystem/" + dataName + "/sort/" + FILE_name + "ave" + namelist[2] + "sort.json", function (SRW) {
            d3.json("/data_forSystem/" + dataName + "/sort/" + FILE_name + "ave" + namelist[3] + "sort.json", function (ISRW) {
                d3.json("/data_forSystem/" + dataName + "/sort/" + FILE_name + "ave" + namelist[4] + "sort.json", function (RJ) {
                    d3.json("/data_forSystem/" + dataName + "/sort/" + FILE_name + "ave" + namelist[5] + "sort.json", function (RNS) {
                        d3.json("/data_forSystem/" + dataName + "/sort/" + FILE_name + "ave" + namelist[6] + "sort.json", function (RES) {
                            d3.json("/data_forSystem/" + dataName + "/sort/" + FILE_name + "ave" + namelist[7] + "sort.json", function (TIES) {
								pg_data_List = [ISRW,TIES,SRW,RES,RJ,RNS, OUR]
								// if(sample_name == 'OUR'){
								// 	pg_data_List = [OUR]
								// 	colorscale =d3.scaleOrdinal()
								// 	.range(['#0000FF'])
								// }
								// else if(sample_name == 'ISRW'){
								// 	pg_data_List = [ISRW]
								// 	colorscale =d3.scaleOrdinal()
								// 	.range(['#BEBDFF','#8CBA68','#D2E600','#F66493', '#DA7C69','#AB5B80','#0000FF'])
								// }
								// else if(sample_name == 'TIES'){
								// 	pg_data_List = [TIES]
								// 	colorscale =d3.scaleOrdinal()
								// 	.range(['#8CBA68','#D2E600','#F66493', '#DA7C69','#AB5B80','#0000FF'])
								// }
								// else if(sample_name == 'SRW'){
								// 	pg_data_List = [SRW]
								// 	colorscale =d3.scaleOrdinal()
								// 	.range(['#D2E600','#F66493', '#DA7C69','#AB5B80','#0000FF'])
								// }
								// else if(sample_name == 'RES'){
								// 	pg_data_List = [RES]
								// 	colorscale =d3.scaleOrdinal()
								// 	.range(['#F66493', '#DA7C69','#AB5B80','#0000FF'])
								// }
								// else if(sample_name == 'RJ'){
								// 	pg_data_List = [RJ]
								// 	colorscale =d3.scaleOrdinal()
								// 	.range([ '#DA7C69','#AB5B80','#0000FF'])
								// }
								// else if(sample_name == 'RNS'){
								// 	pg_data_List = [RNS]
								// 	colorscale =d3.scaleOrdinal()
								// 	.range(['#AB5B80','#0000FF'])
								// }
								
								radar_data(rate)
                            })
                        })
                    })
                })
            })
        })
    })

}

// read_pgData();
// drawRadar('null');

var rate = 'rate-5'
function radar_data(rate){
	//Legend titles
	var pg_Alldata = []
	var temp_datas = []
	var LegendOptions = ['OUR','ISRW', 'TIES', 'SRW', 'RES', 'RJ', 'RNS'];
	// console.log(pg_data_List)
	for(let sampleName in pg_data_List){
		// console.log(pg_data_List[sampleName])
		temp_data = pg_data_List[sampleName][rate]
		
		let data = []
		// data['LCC'] = temp_data['LCC']
		// data['GCC'] = temp_data['GCC'] 
		// data['QCS'] = temp_data['QCS'] 
		// data['SCC'] = temp_data['SCS']['sam_av'] 
		// data['APL'] = temp_data['SP'] 
		// data['C C'] = temp_data['CC'] 
		// data['ACC'] = temp_data['ACC'] 
		// data['ABD'] = temp_data['ANB_G'] 

		data.push({axis:"LCC", value: 8 - temp_data['LCC']})
		data.push({axis:"GCC", value: 8 - temp_data['GCC']})
		data.push({axis:"S C", value: 8 - temp_data['QCS']})
		data.push({axis:"SSC", value: 8 - temp_data['SCS']})
		data.push({axis:"APL", value: 8 - temp_data['SP']})
		data.push({axis:"C C", value: 8 - temp_data['CC']})
		data.push({axis:"ACC", value: 8 - temp_data['ACC']})
		data.push({axis:"ABD", value: 8 - temp_data['ANB_G']})
		temp_datas.push(data);
		
	}

	// var pg_list = ['LCC', 'GCC', 'QCS', 'SCC', 'APL', 'C C', 'ACC', 'ABD']
	// var pg_min_max = {}
	// for(let j in pg_list){
	// 	var max = 0;
	// 	var min = 100000;
	// 	for(let i in temp_datas){
	// 		xx = temp_datas[i][pg_list[j]]
	// 		max = Math.max(max, xx)
	// 		min = Math.min(min, xx)
	// 	}
	// 	pg_min_max[pg_list[j]] = {'max': max, 'min': min};
	// }
	// // console.log(pg_min_max)
	// // console.log(temp_datas)

	// for(let i in temp_datas){
	// 	let data = []
	// 	for(let j in pg_list){
	// 		let yy_name = pg_list[j]
	// 		let temp_value = normalization(temp_datas[i][yy_name], pg_min_max[yy_name].max, pg_min_max[yy_name].min)
	// 		if(yy_name == 'C C' || yy_name == 'SCC') temp_value = 1 - temp_value
	// 		data.push({axis: yy_name, value: temp_value})
	// 	}
	// 	pg_Alldata.push(data)
	// }

	drawRadar(temp_datas, false)
}

drawRadar([], true)