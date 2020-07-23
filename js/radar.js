var rader_div_id = 'Radar'

function drawleida(win_name, data_li, rate, suanfanameli) {
    mcolor = ['rgb(255,60,60)', 'rgb(255,83,255)', 'rgb(235,135,162)', 'rgb(255,178,101)',
        'rgb(63,151,134)', 'rgb(83,255,255)', 'rgb(0,122,244)',
        'rgb(168,168,255)',];
    mm = 6
    maxli = [-100, -100, -100, -100, -100, -100, -100, -100, -100]
    minli = [100, 100, 100, 100, 100, 100, 100, 100, 100]
    s_name_li = [
        "LCC", "GCC", "QCS", "SCS",
        "SP", "CC", "ACC", "ANB_G",
    ]
    s_name_linew = [
        "LCC", "GCC", "QCS", "SCC",
        "APL", "C C", "ACC", "ABD"
    ]
    dataname_li = ["OUR", "SRW", "ISRW", "RJ", "RNS", "RES", "TIES"]
    name_CHN = {
        "SP-small": "平均最短路径(大小)", "ACE": "特征向量中心性", "ANB": "中介中心性", "ACC": "紧密中心性", "CC": "网络连通性", "QCS": "社区数量相似性", "SCS": "社区结构稳定性",
        "LCC": "局部群聚系数", "GCC": "全局聚集系数", "DDC": "度分布相似性", "SP": "平均最短路径", "ANB_G": "中介中心性改"
    }
    dat = [[], [], [], [], [], [], []]
    for (i = 0; i < data_li.length; i++) {
        for (j in data_li[i]) {
            if (rate == j.substr(5)) {
                for (k = 0; k <= 8; k++) {
                    if (s_name_li[k] == 'SCS') {
                        datmp = data_li[i][j][s_name_li[k]]['sam_av']
                        // console.log(s_name_li[k], data_li[i][j][s_name_li[k]['sam_av']])
                        if (datmp > maxli[k]) {
                            maxli[k] = datmp;
                        }
                        if (datmp < minli[k]) {
                            minli[k] = datmp;
                        }
                        dat[i].push(datmp)
                    }
                    else {
                        datmp = data_li[i][j][s_name_li[k]]
                        if (datmp > maxli[k]) {
                            maxli[k] = datmp;
                        }
                        if (datmp < minli[k]) {
                            minli[k] = datmp;
                        }
                        dat[i].push(datmp)
                    }
                }
            }
        }
    }
    var marge = {
        top: -80,
        right: 50,
        bottom: 10,
        left: 0
    }
    var width = document.getElementById(win_name).clientWidth
    var height = document.getElementById(win_name).clientHeight

    d3.select('#radar_svg').remove()
    var svg = d3.select("#" + win_name).append('svg').attr('width', width).attr('height', height).attr('id', 'radar_svg')
    var g = svg.append("g").attr("transform", "translate(" + marge.left  + "," + marge.top + ")")

    var defs = svg.append("defs");

    var filter = defs.append("filter")
        .attr("id", "coolShadow")
        .attr("x", "-100%").attr("y", "-100%") //
        .attr("width", "300%").attr("height", "300%"); //

    filter.append("feMorphology")
        .attr("in", "SourceGraphic")
        .attr("result", "upperLayer")
        .attr("operator", "dilate")
        .attr("radius", "0.2 0.2");

    filter.append("feMorphology")
        .attr("in", "SourceAlpha")
        .attr("result", "enlargedAlpha")
        .attr("operator", "dilate")
        .attr("radius", "0.2 0.2");

    filter.append("feGaussianBlur")
        .attr("in", "enlargedAlpha")
        .attr("result", "bluredAlpha")
        .attr("stdDeviation", "3");

    filter.append("feOffset")
        .attr("in", "bluredAlpha")
        .attr("result", "lowerLayer")
        .attr("dy", "1"); //


    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
        .attr("in", "lowerLayer");
    feMerge.append("feMergeNode")
        .attr("in", "upperLayer");

    centerpoint = {
        x: (width / 3 * 2 - marge.left / 2),
        y: (height / 3 * 2 - marge.left / 2)
    }
    radim = 2 * Math.PI / s_name_li.length
    var R = (width + height - marge.left - marge.right - marge.top - marge.bottom) / 8
    k = 5
    for (var i = k; i >= 1; i--) {
        r = R / k * i
        // console.log(r)
        g.append("circle")
            .attr("cx", centerpoint.x)
            .attr("cy", centerpoint.y)
            .attr("r", r)
            .attr("class", "waixain")
            .style("filter", function () {
                if (i == k) {
                    return "url(#coolShadow)"
                }
            })
            .attr("fill", function () {
                //  if(i == 2||(i==4)){
                //      return '#bbb';
                //  }
                return 'white'
            })
            .attr("opacity", "0.6")
            .attr("stroke", "#333")
            .attr("stroke-dasharray", function () {
                if (i != k)
                    return "10 5"
            });
    }
    var scalex_li = []
    var scaley_li = []
    for (var i = 0; i < s_name_li.length; i++) {
        g.append("line")
            .attr("id", "L2")
            .attr("x1", centerpoint.x)
            .attr("y1", centerpoint.y)
            .attr("x2", R * Math.sin(radim * i) + centerpoint.x)
            .attr("y2", centerpoint.y - R * Math.cos(radim * i))
            .attr("stroke", "black")
            .attr("stroke-dasharray", "10 5")
            .attr("stroke-width", "0.5px");
        // g.append("rect")
        //     .attr("x", (R * 1.29) * Math.sin(radim * i) + centerpoint.x - 13)
        //     .attr("y", function () {
        //         ans = (R * 1.29) * Math.cos(radim * i)
        //         if (ans > 0) {
        //             return centerpoint.y - ans - 2
        //         }
        //         else {
        //             return centerpoint.y - ans - 10
        //         }
        //     })
        //     .attr("id", "rect-" + i)
        //     .attr("width", '25px')
        //     .attr("height", '10px')
        //     .style("fill", '#555')
        //     .style("stroke", '#555')
        //     .attr("class", "rects")
        //     .attr("rx", '20')
        //     .attr('opacity', '0.5')
        g.append("text").attr("class", "kdtext").attr("x", (R * 1.29) * Math.sin(radim * i) + centerpoint.x - 13)
            .attr("y", function () {
                ans = (R * 1.29) * Math.cos(radim * i)
                if (ans > 0) {
                    return centerpoint.y - ans + 8
                }
                else {
                    return centerpoint.y - ans
                }
            }).text(s_name_linew[i])
        if ((i == 2) || (i == 4) || (i == 5)) {
            var newscax = d3.scaleLinear().domain([maxli[i] * 1.1, minli[i]]).range([centerpoint.x, R * Math.sin(radim * i) + centerpoint.x]);
            var newscay = d3.scaleLinear().domain([maxli[i] * 1.1, minli[i]]).range([centerpoint.y, centerpoint.y - R * Math.cos(radim * i)]);
            scalex_li.push(newscax)
            scaley_li.push(newscay)
        }
        else {
            var newscax = d3.scaleLinear().domain([minli[i], maxli[i] * 1.1]).range([centerpoint.x, R * Math.sin(radim * i) + centerpoint.x]);
            var newscay = d3.scaleLinear().domain([minli[i], maxli[i] * 1.1]).range([centerpoint.y, centerpoint.y - R * Math.cos(radim * i)]);
            scalex_li.push(newscax)
            scaley_li.push(newscay)
        }
    }
    areas = []
    for (k in dat) {
        areas.push([])
        xx = -1, yy = -1, xxx = 0, yyy = 0
        for (var j = 0; j < s_name_li.length; j++) {

            if (xx != -1) {
                g.append("line")
                    .attr("id", "L2")
                    .attr("x1", xx)
                    .attr("y1", yy)
                    .attr("x2", scalex_li[j](dat[k][j]))
                    .attr("y2", scaley_li[j](dat[k][j]))
                    .attr("stroke", mcolor[mm])
                    .attr("opacity", function () {
                        // console.log(suanfanameli.indexOf(dataname_li[k]))
                        if (suanfanameli.indexOf(dataname_li[k]) == -1) {
                            return 0
                        }
                        else {
                            return 1
                        }
                    })
                    .attr("stroke-width", "1.5px");
            }
            else {
                xxx = scalex_li[j](dat[k][j])
                yyy = scaley_li[j](dat[k][j])
            }
            xx = scalex_li[j](dat[k][j])
            yy = scaley_li[j](dat[k][j])
            g.append("circle")
                .attr("cx", xx)
                .attr("cy", yy)
                .attr("r", 2)
                .attr("class", "top")
                .attr("fill", mcolor[mm])
                .attr("stroke", mcolor[mm])
                .attr("opacity", function () {
                    if (suanfanameli.indexOf(dataname_li[k]) == -1) {
                        return 0
                    }
                    else {
                        return 1
                    }
                })
            areas[k].push([xx, yy])
        }
        if (xx != -1) {
            g.append("line")
                .attr("id", "L2")
                .attr("x1", xx)
                .attr("y1", yy)
                .attr("x2", xxx)
                .attr("y2", yyy)
                .attr("opacity", function () {
                    if (suanfanameli.indexOf(dataname_li[k]) == -1) {
                        return 0
                    }
                    else {
                        return 1
                    }
                })
                .attr("stroke", mcolor[mm])
                .attr("stroke-width", "1.5px");

        }
    }

    for (var i = 0; i < areas.length; i++) {
        g.append('polygon').attr('points', areas[i])
            .attr("fill", mcolor[mm]).attr("opacity", function () {
                if (suanfanameli.indexOf(dataname_li[i]) == -1) {
                    return 0
                }
                else {
                    return 0.3
                }
            })
            .attr("stroke", mcolor[mm])
            .attr("stroke", "1.5px");
    }
    sh = (2 * R) / dataname_li.length
    w = sh / 2.5
    //     for(i in dataname_li){
    //         console.log(dataname_li[i])
    //         svg.append("rect")
    //         .attr("x",centerpoint.x+R*2)
    //         .attr("y",centerpoint.y-R+i*sh)
    //         .attr("id","rect-"+i)
    //         .attr("width", w)
    //         .attr("height", w)
    //         .style("fill",mcolor[i])
    //         .style("stroke",mcolor[i])
    //         .attr("class", "rects")
    //         .attr("rx",'1.2')
    //         .style("filter", "url(#coolShadow)")
    //         svg.append("text").attr("class", "lentext").attr("x",centerpoint.x+R*2+w*1.6).attr("y",centerpoint.y-R+i*sh+w).text(dataname_li[i])

    //     }
}

var dataName = "ieee_visC";
var FILE_name = 'IV';
var namelist = ['ori', 'our', 'SRW', 'ISRW', 'RJ', 'RNS', 'RES', 'TIES'];
var rate = 5;
var sf_nali = [];

d3.json("/data_forSystem/" + dataName + "/radarData/" + FILE_name + "f3" + namelist[0] + "new_Eva.json", function (ori) {
        d3.json("/data_forSystem//" + dataName + "/radarData/" + FILE_name + "f3" + namelist[1] + "new_Eva.json", function (OUR) {
            d3.json("/data_forSystem/" + dataName + "/radarData/" + FILE_name + "f3" + namelist[2] + "new_Eva.json", function (SRW) {
                d3.json("/data_forSystem/" + dataName + "/radarData/" + FILE_name + "f3" + namelist[3] + "new_Eva.json", function (ISRW) {
                    d3.json("/data_forSystem/" + dataName + "/radarData/" + FILE_name + "f3" + namelist[4] + "new_Eva.json", function (RJ) {
                        d3.json("/data_forSystem/" + dataName + "/radarData/" + FILE_name + "f3" + namelist[5] + "new_Eva.json", function (RNS) {
                            d3.json("/data_forSystem/" + dataName + "/radarData/" + FILE_name + "f3" + namelist[6] + "new_Eva.json", function (RES) {
                                d3.json("/data_forSystem/" + dataName + "/radarData/" + FILE_name + "f3" + namelist[7] + "new_Eva.json", function (TIES) {
                                        data_li = [OUR, SRW, ISRW, RJ, RNS, RES, TIES]
                                        drawleida(rader_div_id,data_li,rate,sf_nali)
                                })
                            })
                        })
                    })
                })
            })
        })
})

function doRadar(sf_nali, dataName, rate){
    var  FILE_name = sx(data_name);
    var namelist = ["ori", "OUR", "SRW", "ISRW", "RJ", "RNS", "RES", "TIES", "BFS", "DFS"]
    d3.json("/data_forSystem/" + dataName + "/radarData/" + FILE_name + "f3" + namelist[0] + "new_Eva.json", function (ori) {
        d3.json("/data_forSystem//" + dataName + "/radarData/" + FILE_name + "f3" + namelist[1] + "new_Eva.json", function (OUR) {
            d3.json("/data_forSystem/" + dataName + "/radarData/" + FILE_name + "f3" + namelist[2] + "new_Eva.json", function (SRW) {
                d3.json("/data_forSystem/" + dataName + "/radarData/" + FILE_name + "f3" + namelist[3] + "new_Eva.json", function (ISRW) {
                    d3.json("/data_forSystem/" + dataName + "/radarData/" + FILE_name + "f3" + namelist[4] + "new_Eva.json", function (RJ) {
                        d3.json("/data_forSystem/" + dataName + "/radarData/" + FILE_name + "f3" + namelist[5] + "new_Eva.json", function (RNS) {
                            d3.json("/data_forSystem/" + dataName + "/radarData/" + FILE_name + "f3" + namelist[6] + "new_Eva.json", function (RES) {
                                d3.json("/data_forSystem/" + dataName + "/radarData/" + FILE_name + "f3" + namelist[7] + "new_Eva.json", function (TIES) {
                                        data_li = [OUR, SRW, ISRW, RJ, RNS, RES, TIES]
                                        drawleida(rader_div_id,data_li,rate,sf_nali)
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
// doRadar(['OUR'], data_name, '10');

