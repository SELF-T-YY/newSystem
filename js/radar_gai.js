var RadarChart = {
    draw: function(id, d, options){
    var cfg = {
       radius: 5,
       w: 600,
       h: 600,
       factor: 1,
       factorLegend: .85,
       levels: 3,
       maxValue: 0,
       radians: 2 * Math.PI,
       opacityArea: 0.5,
       ToRight: 5,
       TranslateX: 80,
       TranslateY: 30,
       ExtraWidthX: 100,
       ExtraWidthY: 100,
      //  color: d3.scaleOrdinal(d3.schemeCategory10)
      color:d3.scaleOrdinal()
      .range(["#0000FF","#b3cde3","#ccebc5","#decbe4","#fed9a6","#e5d8bd"])
      };
      
      if('undefined' !== typeof options){
        for(var i in options){
          if('undefined' !== typeof options[i]){
            cfg[i] = options[i];
          }
        }
      }
      cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
      var allAxis = (d[0].map(function(i, j){return i.axis}));
      var total = allAxis.length;
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
        //  .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
         .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
         .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
         .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
         .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
         .attr("class", "line")
         .style("stroke", "#ccc")
         .style("stroke-opacity", "0.7")
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
          .style("stroke", "grey")
          .style("stroke-width", "1px")
         .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");

  
		if (d == 'null'){
			var d = [
			[
			{axis:"LCC"},
			{axis:"GCC"},
			{axis:"QCS"},
			{axis:"SCC"},
			{axis:"APL"},
			{axis:"C C"},
			{axis:"ACC"},
			{axis:"ABD"},
			]
			];
			axis.append("text")
				.attr("class", "legend")
				.text(function(d){return d})
				// .style("font-family", "sans-serif")
				.style("font-size", "10px")
				.style('font-weight', '400')
				// .attr("text-anchor", "middle")
				.attr("dy", "2em")
				.attr("transform", function(d, i){return "translate(-10, -15)"})
				.attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-50*Math.sin(i*cfg.radians/total);})
				.attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-1*Math.cos(i*cfg.radians/total);});			
		}
		else{
			axis.append("text")
			.attr("class", "legend")
			.text(function(d){return d})
			// .style("font-family", "sans-serif")
			.style("font-size", "10px")
			.style('font-weight', '400')
			// .attr("text-anchor", "middle")
			.attr("dy", "2em")
			.attr("transform", function(d, i){return "translate(-10, -15)"})
			.attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-50*Math.sin(i*cfg.radians/total);})
			.attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-1*Math.cos(i*cfg.radians/total);});	
			d.forEach(function(y, x){
				dataValues = [];
				g.selectAll(".nodes")
				  .data(y, function(j, i){
					dataValues.push([
					  levelFactor*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
					  20 + levelFactor*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
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
				  .attr("points",function(d) {
					  var str="";
					  for(var pti=0;pti<d.length;pti++){
						  str=str+d[pti][0]+","+d[pti][1]+" ";
					  }
					  return str;
				  })
				  // .style("fill", function(j, i){return cfg.color(series)})
				  // .style("fill", function(j, i){return cfg.color(series)})
				  .style("fill-opacity", 0)
				  // .on('mouseover', function (d){
				  //                   z = "polygon."+d3.select(this).attr("class");
				  //                   g.selectAll("polygon")
				  //                     .transition(200)
				  //                     .style("fill-opacity", 0.1); 
				  //                   g.selectAll(z)
				  //                     .transition(200)
				  //                     .style("fill-opacity", .7);
				  //                 })
				  // .on('mouseout', function(){
				  //                   g.selectAll("polygon")
				  //                     .transition(200)
				  //                     .style("fill-opacity", cfg.opacityArea);
				  // });
				series++;
			  });
			  series=0;
		  
		  
			  d.forEach(function(y, x){
				g.selectAll(".nodes")
				  .data(y).enter()
				  .append("svg:circle")
				  .attr("class", "radar-chart-serie"+series)
				  .attr('r', 4)
				  .attr("alt", function(j){return Math.max(j.value, 0)})
				  .attr("cx", function(j, i){
					dataValues.push([
					  levelFactor*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
					  20 + levelFactor*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
				  ]);
				  return levelFactor*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
				  })
				  .attr("cy", function(j, i){
					return  20 + levelFactor*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
				  })
				  .attr("data-id", function(j){return j.axis})
				  .style("fill", cfg.color(series)).style("fill-opacity", .9)
				  // .on('mouseover', function (d){
				  //             newX =  parseFloat(d3.select(this).attr('cx')) - 10;
				  //             newY =  parseFloat(d3.select(this).attr('cy')) - 5;

				  //             tooltip
				  //                 .attr('x', newX)
				  //                 .attr('y', newY)
				  //                 .text(Format(d.value))
				  //                 .transition(200)
				  //                 .style('opacity', 1);
								  
				  //             z = "polygon."+d3.select(this).attr("class");
				  //             g.selectAll("polygon")
				  //                 .transition(200)
				  //                 .style("fill-opacity", 0.1); 
				  //             g.selectAll(z)
				  //                 .transition(200)
				  //                 .style("fill-opacity", .7);
				  //           })
				  // .on('mouseout', function(){
				  //             tooltip
				  //                 .transition(200)
				  //                 .style('opacity', 0);
				  //             g.selectAll("polygon")
				  //                 .transition(200)
				  //                 .style("fill-opacity", cfg.opacityArea);
				  //           })
				  // .append("svg:title")
				  // .text(function(j){return Math.max(j.value, 0)});
					series++;
				});
		}
		
	}
};


function drawRadar(data, rate){
  var w = 260;
	var h = 300;

// var colorscale = d3.scaleOrdinal(d3.schemeCategory10);
var colorscale =d3.scaleOrdinal()
.range(["#0000FF","#b3cde3","#ccebc5","#decbe4","#fed9a6","#e5d8bd", '#cccccc']);

//Legend titles
var LegendOptions = ['OUR','ISRW', 'TIES', 'SRW', 'RES', 'RJ', 'RNS'];

//Data
// var d = [
// 		  [
// 			{axis:"LCC",value:0.59},
// 			{axis:"GCC",value:0.56},
// 			{axis:"QCS",value:0.42},
// 			{axis:"SCC",value:0.34},
// 			{axis:"APL",value:0.48},
// 			{axis:"C C",value:0.14},
// 			{axis:"ACC",value:0.11},
// 			{axis:"ABD",value:0.05},
//       ],[{axis:"LCC",value:0.48},
// 			{axis:"GCC",value:0.41},
// 			{axis:"QCS",value:0.27},
// 			{axis:"SCC",value:0.28},
// 			{axis:"APL",value:0.46},
// 			{axis:"C C",value:0.29},
// 			{axis:"ACC",value:0.11},
// 			{axis:"ABD",value:0.14},
// 		  ]
// 		];

    //Data
var d = [
  [
  {axis:"LCC"},
  {axis:"GCC"},
  {axis:"QCS"},
  {axis:"SCC"},
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
  levels: 5,
  ExtraWidthX: 300
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw("#Radar", d, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#Radar')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)
		
//Initiate Legend	
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(-180,10)') 
	;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
    .style("fill", function(d, i){ return colorscale(i);});
    

	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; });	
    
}

drawRadar('null');
