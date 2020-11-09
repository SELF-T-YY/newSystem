// 创建一个heatmap实例对象
// “h337” 是heatmap.js全局对象的名称.可以使用它来创建热点图实例
// 这里直接指定热点图渲染的div了.heatmap支持自定义的样式方案,网页外包接活具体可看官网api

var heatmapFileName = '../data_forSystem/ieee_visC/IV_ambiguousBetweennessData.json';
var fileName = '../data_forSystem/ieee_visC/IVxy.json';


function do_heatmap(heatmapFileName) {
    if (sample_name && sample_rate) {

        var sampleName = sample_name;
        var sampleRate = 'rate-' + String(sample_rate);

        const div = document.getElementById("Force");
        const heatmapInstance = h337.create({
            radius: 10,
            container: document.querySelector('#Force'),
        });
        const width = div.offsetWidth;
        const height = div.offsetHeight - 25;
        const margin = 200;


        d3.json(heatmapFileName, function (jsonData) {
            d3.json(fileName, function (xyData) {
                const oriNodeData = jsonData[sampleName][sampleRate];
                let nodeXYDict = {};
                for (let i in xyData['nodes']) {
                    let d = xyData['nodes'][i]
                    nodeXYDict[d['id']] = {
                        x: d['x'],
                        y: d['y']
                    }
                }

                console.log(nodeXYDict)
                let points = [];
                let max = 0;

                let maxX = 0, maxY = 0;
                let minX = 100000000, minY = 10000000;

                for (let id in oriNodeData) {
                    let val = oriNodeData[id] * 100;
                    let x = nodeXYDict[id]['x'];
                    let y = nodeXYDict[id]['y'];
                    max = Math.max(max, val);
                    maxX = Math.max(maxX, x);
                    maxY = Math.max(maxY, y);
                    minX = Math.min(minX, x);
                    minY = Math.min(minY, y);

                    let point = {
                        x: (x),
                        y: (y),
                        value: (val)

                    }
                    points.push(point)
                }

                //处理xy使画面居中
                const scaleXY = Math.max((width - margin * 2) / (maxX - minX), (height - margin * 2) / (maxY - minY));
                maxX *= scaleXY;
                maxY *= scaleXY;
                minX *= scaleXY;
                minY *= scaleXY;
                const moveX = (width - (maxX - minX)) / 2 - minX;
                const moveY = (height - (maxY - minY)) / 2 - minY;

                let new_points = []
                for (let _ in points) {
                    let point = points[_];
                    let x = parseInt(point['x'] * scaleXY + moveX);
                    let y = parseInt(point['y'] * scaleXY + moveY);
                    let val = parseInt(point['value'])

                    let new_point = {
                        x: x,
                        y: y,
                        value: val
                    }
                    new_points.push(new_point);
                }

                let heatmapData = {
                    max: max,
                    data: new_points
                }


                console.log(heatmapData)

                heatmapInstance.setData(heatmapData); //数据绑定还可以使用
            })

        })
    }
}

// do_heatmap(heatmapFileName);

