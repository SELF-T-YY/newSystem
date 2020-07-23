var has=false;

var compSvgWidth = document.getElementById('Radar').clientWidth;
var compSvgHeight = document.getElementById('Radar').clientHeight;

var compSvg = d3.select('#container1')
                .append('svg')
                .attr('width', compSvgWidth)
                .attr('height', compSvgHeight)



function drawRadar(rate){
    
    compSvg.selectAll(".indexline").remove();
    compSvg.selectAll("circle").remove();
    var wordarr=["OUR","SRW","RPS","ISRW","FF","TIES"];
    var wordarr2=["OUR","SRW","RNS","ISRW","FF","TIES"];

    var margin = {top: 10, right: 35, bottom: 10, left: 35},
    width = compSvgWidth-margin.right-margin.left,
    height = compSvgHeight-margin.top-margin.bottom;
    var center_x=compSvgWidth/2;
    var center_y=compSvgHeight/2;

    d3.json("../data/"+fileName+"/"+fileName+"_oclc.json",function(dtwData){
    d3.json("/data/oregonf/rader/oregonf_oclc.json",function(dtwData){
    d3.json("/data/oregonf/rader/oregonf_ec.json",function(Atdata){
    d3.json("/data/oregonf/rader/oregonf_csc.json",function(CiData){
    d3.json("/data/oregonf/rader/oregonf_noamc.json",function(Abet){
    d3.json("/data/oregonf/rader/oregonf_link.json",function(LData){
    d3.json("/data/oregonf/rader/oregonf_aien.json",function(TData){

        var indexArr=["Average proximity to centrality","Erage eigenvector centrality",
        "Quantitative stability of communities","Average Information Entropy","Average Medium Degree","Connected component"]
        var dataArr=[dtwData,Atdata,CiData,TData,Abet,LData];
        var dtwData,Atdata,CiData,TData,Abet,LData = null;
        var dataArr = [];

        var array0=[];
        var array1=[];
        var array2=[];
        var array3=[];
        var array4=[];
        var array5=[];
        var array=[array0,array1,array2,array3,array4,array5];

        var data=[];

        var axis_min=0.2;
        var axis_max=0.9;

        var array_0=[];
        var array_1=[];
        var array_2=[];
        var array_3=[];
        var array_4=[];
        var array_5=[];
        var array_=[array_0,array_1,array_2,array_3,array_4,array_5];

        var scaleArr=[];

        if(rate!=100){
            for(var i=0;i<indexArr.length;i++){
                for(var j=0;j<wordarr.length;j++){
                    var temp=0;
                    
                    if(dataArr[i]==LData){
                        
                        // temp=parseFloat(dataArr[i][wordarr[j]]["rate-"+rate].sum);
                        temp=parseFloat(dataArr[i][wordarr[j]]["rate-"+rate]);
                    }
                    else if(dataArr[i]==CiData){
                        temp=parseFloat(dataArr[i][wordarr[j]]["rate-"+rate]);
                    }
                    else{
                        
                        temp=parseFloat(dataArr[i][wordarr[j]]["rate-"+rate]);
                    }
                    temp=Math.pow(temp,2)
                    array_[i].push(temp);
                }
            }
        }
        console.log(array_)
        for(var i =0;i<array_.length;i++){
            var tempmax=d3.max(array_[i]);
            var tempmin=d3.min(array_[i]);
            var scale;
            if(dataArr[i]==LData||dataArr[i]==TData){
                scale=d3.scaleLinear().domain([tempmax,tempmin]).range([axis_min,0.8]);
            }
            else{
                scale=d3.scaleLinear().domain([tempmin,tempmax]).range([axis_min,axis_max]);
            }
            scaleArr.push(scale)
        }
        

        if(rate!=100){
            for(var j=0;j<wordarr.length;j++){
                for(var i=0;i<indexArr.length;i++){ 
                    var d={};
                    if(dataArr[i]==LData){
                        if(dataArr[i][wordarr[j]]["rate-"+rate].sum==1){
                            d={
                                axis:indexArr[i],
                                value:axis_max,
                            }
                            
                        }
                        else{
                            d={
                                axis:indexArr[i],
                                value:axis_min,
                            }
                        }
                        
                    }
                    else{
                        d={
                            axis:indexArr[i],
                            value:scaleArr[i](Math.pow(parseFloat(dataArr[i][wordarr[j]]["rate-"+rate]),2)),
                        }
                    }
                    // console.log(d)
                    array[j].push(d);
                }
                data.push(array[j]);
            }
        }
        console.log(array)
        console.log(data)
        var color = d3.scaleOrdinal()
                .range(["#0000FF","#b3cde3","#ccebc5","#decbe4","#fed9a6","#e5d8bd"]);
                
        
        var pathLen=width/2;
        var centerPoint=[center_x,center_y];
        //========================六个顶点========================
        var pointArr=[[margin.left,margin.top+height/2],
                [margin.left+pathLen/2,margin.top+height/2-Math.sqrt(3)/2*pathLen],
                [margin.left+pathLen+pathLen/2,margin.top+height/2-Math.sqrt(3)/2*pathLen],
                [margin.left+pathLen*2,margin.top+height/2],
                [margin.left+pathLen/2+pathLen,margin.top+height/2+Math.sqrt(3)/2*pathLen],
                [margin.left+pathLen/2,margin.top+height/2+Math.sqrt(3)/2*pathLen]
                ];
        
       
        var linePoint=[];
        for(var i=0;i<pointArr.length;i++){
            linePoint.push([centerPoint,pointArr[i]]);
        }
        //==========================六条轴=======================
        var line=d3.line();
        compSvg.append("g").selectAll("path").data(linePoint).enter()
            .append("path")
            .attr("d",(d)=>{
                return line(d);
            })
            .attr("stroke","#ccc")
            .attr("stroke-width",1);
        //虚线圈
        var p=[];
        for(var i=0;i<5;i++){
            var p1=[];
            for(var j=0;j<6;j++){
                p1.push([center_x-Math.cos(Math.PI/3*j)*pathLen/5*(i+1),
                    center_y-Math.sin(Math.PI/3*j)*pathLen/5*(i+1)]);
                    if(j==5){
                        p1.push([center_x-Math.cos(Math.PI/3*0)*pathLen/5*(i+1),
                        center_y-Math.sin(Math.PI/3*0)*pathLen/5*(i+1)]);
                    }
            }
            p.push(p1)
        }
        compSvg.append("g").selectAll("path").data(p).enter()
        .append("path")
            .attr("d",(d)=>{
                return line(d);
            })
            .attr("stroke-width",1)
            .attr("stroke","#ccc")
            .attr("fill","none")

        //=====================轴文字=======================
        if(has==false){
        for(var i=0;i<indexArr.length;i++){
            var text=compSvg.append("text")
                .attr("x",()=>{
                    
                    if(i==0){
                        return pointArr[i][0]-35;
                    }
                    else if(i==4||i==5){
                        return pointArr[i][0]-20;
                    }
                    else if(i==1||i==2){
                        return pointArr[i][0]-25;
                    }
                    else{
                        return pointArr[i][0]-20;
                    }
                })
                .attr("y",()=>{
                    if(i==1||i==2){
                        return pointArr[i][1]-2-30;
                    }
                    else if(i==4||i==5){
                        return pointArr[i][1]+10-10;
                    }
                    else{
                        return pointArr[i][1]+3-20;
                    }
                })
                .attr("font-size",10)

            text.selectAll("tspan")
                .data(indexArr[i].split(" "))
                .enter()
                .append("tspan") 
                // .attr("x",text.attr("x")) 
                .attr("dy","1em") 
                .text(function(d){ 
                    return d; 
                });
            }
        }
        
        //=========================画指标=======================
        // var p=[];
        // for(var i=0;i<data.length;i++){
        //     var p1=[];
        //     for(var j=0;j<data[i].length;j++){
        //         p1.push([center_x-Math.cos(Math.PI/3*j)*pathLen*data[i][j].value,
        //         center_y-Math.sin(Math.PI/3*j)*pathLen*data[i][j].value]);
        //         if(j==data[i].length-1){
        //             p1.push([center_x-Math.cos(Math.PI/3*0)*pathLen*data[i][0].value,
        //             center_y-Math.sin(Math.PI/3*0)*pathLen*data[i][0].value]);
        //         }
        //     }
        //     p.push(p1);
        // }
        // compSvg.append("g").selectAll("path").data(p).enter()
        //     .append("path")
        //     .attr("d",(d)=>{
        //         return line(d);
        //     })
        //     .attr("stroke-width",3)
        //     .attr("stroke",(d,i)=>{
        //         return color(i);
        //     })
        //     .attr("fill","none")
        //     .attr("class","indexline")
        //     .attr("id",(d,i)=>{
        //         return wordarr[i]+"line";
        //     })
        //     .attr("stroke-opacity",0.8)
        //     // .attr("fill",(d,i)=>{
        //     //     return color(i);
        //     // })
        //     // .attr("opacity",.2)
        // for(var j=0;j<p.length;j++){
        //     compSvg.append("g").selectAll("circle").data(p[j]).enter()
        //     .append("circle")
        //     .attr("cx",(d)=>{
        //         return d[0];
        //     })
        //     .attr("cy",(d)=>{
        //         return d[1];
        //     })
        //     .attr("r",2)
        //     .attr("fill","white")
        //     .attr("stroke","black")
        //     .attr("stroke-wdidth",1)
        //     .attr("class",wordarr[j]+"circle")
        // }
        
        //==================图例===============
        var smallrectwidth=10;
        var smallmargintop=3;
        var smallmarginleft=1;
        var legendStatus=[true,true,true,true,true,true];
        
        compSvg.append("g").selectAll("rect").data(wordarr).enter()
            .append("rect")
            .attr("x",smallmarginleft)
            .attr("y",(d,i)=>{
                return smallmargintop+smallrectwidth*i;
            })
            .attr("width",smallrectwidth-1)
            .attr("height",smallrectwidth-1)
            .attr("fill",(d,i)=>{
                return color(i);
            })
            .attr("id",(d,i)=>{
                return d+"rect";
            })
            .on("click",(d,i)=>{
                if(legendStatus[i]==true){
                    d3.select("#"+d+"rect").style("fill","#000000");
                    d3.select("#"+d+"line").style("stroke-opacity",0);
                    d3.selectAll("."+d+"circle").style("opacity",0);
                    legendStatus[i]=false;
                }
                else{
                    d3.select("#"+d+"rect").style("fill",color(i));
                    d3.select("#"+d+"line").style("stroke-opacity",1);
                    d3.selectAll("."+d+"circle").style("opacity",1);
                    legendStatus[i]=true;
                }
                
            })
            // .attr("id",(d,i)=>{
            //     return wordarr[i]+"_Legend";
            // })
            if(has==false){
                compSvg.append("g").selectAll("text").data(wordarr2).enter()
                .append("text")
                .attr("x",smallmarginleft*2+smallrectwidth)
                .attr("y",(d,i)=>{
                    return smallmargintop+smallrectwidth*i+smallrectwidth/3*2;
                })
                .attr("font-size",8)
                .text((d)=>{
                    return d;
                })
            }
            has=true;
    }
    // )
// })
//     })
// })
//     })
// })

// } 
drawRadar(100)