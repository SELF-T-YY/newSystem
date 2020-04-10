var if_move = true;
var if_choose_point = false;
var if_circle_choose = false;
var force_community_num = 0;

// var force_file_name = "/data_forSystem/cit-HepTh/CH_force_gai.json"
var force_file_name = "/data_forSystem/soc-sign-bitcoinotc.csv/SSB_force_gai.json"

var force_file_origin_name = "/data_forSystem/cit-HepTh/CH_force_gai.json"
var force_re = ''

// var force_file_name = "/data/oregonf/ISRW/oregonf_sample_tsne_ISRW_15_nodes_edges.json"
// force_file_name = "/data/cit-HepTh/CH_force_gai.json"

var force_circle_r = 1;

const force_width = document.getElementById('Force').offsetWidth;
const force_height = document.getElementById('Force').offsetHeight-25;

var app = new PIXI.Application({
    width:force_width,
    height:force_height,
    antialias: true,
    resolution : 1,
});
var line_Color = 0xc6c6c6;
var force_community_circle_Color = 0x3A435E;
// var force_community_circle_Color = 0x5378E8;


document.querySelector('#Force').appendChild(app.view);
app.renderer.backgroundColor = 0xffffff;

let f_nodes = [];
let f_links = [];

function drawforce(if_draw_again){
    let scaleAll_xy = 1;//整体缩放
    let moveAll_x = 0;//整体x移动
    let moveAll_y = 0;//整体y移动
    const circles_change_color = 0xff00ff;
    // var force_community_circle_Color = 0x3A435E;
    var line_Color = 0xc6c6c6;
    var circle_Choose_Color = 0x3A435E;


    d3.json(force_file_name, function(datas){
        console.log(datas);
        f_nodes = datas['nodes'];
        f_links = datas['edges'];
        f_nodeID_key = {}
        for(let key in f_nodes){
            f_nodeID_key[f_nodes[key]['id']] = key;
        }

        force_PIXIJS_lines = new PIXI.Graphics();
        for(var i = 0 ; i < f_links.length ; i++){
            force_PIXIJS_lines.lineStyle(0.1,line_Color,1);
            force_PIXIJS_lines.moveTo(f_nodes[f_nodeID_key[f_links[i].source]].x,f_nodes[f_nodeID_key[f_links[i].source]].y);
            force_PIXIJS_lines.lineTo(f_nodes[f_nodeID_key[f_links[i].target]].x,f_nodes[f_nodeID_key[f_links[i].target]].y);
        }
        app.stage.addChild(force_PIXIJS_lines);
        force_PIXIJS_circles = new PIXI.Graphics();
        for(var key in f_nodes){
            force_PIXIJS_circles.beginFill(force_community_circle_Color);
            force_PIXIJS_circles.drawCircle(f_nodes[key].x,f_nodes[key].y,force_circle_r);
            force_PIXIJS_circles.endFill();
        }
        app.stage.addChild(force_PIXIJS_circles);
        mouse_down_position = {};
        document.getElementsByTagName("canvas")[0].id = "force_canvas";
        const canvas = document.getElementsByTagName("canvas");
        const canvas_force = canvas[0];


        canvas_force.addEventListener('mousedown', onDragStart, false);
        canvas_force.addEventListener('mouseup', onDragEnd, false);
        canvas_force.addEventListener('mousemove', onDragMove, false);
        canvas_force.addEventListener('mouseout', onDragEnd,false);        

        canvas_force.addEventListener('DOMMouseScroll', wheel, false); 


        canvas_force.onmousewheel = wheel; //W3C鼠标滚轮事件

        circles_choose = new PIXI.Graphics();
        circles_choose_change_color = new PIXI.Graphics();
        function onDragStart() 
        {
            if(if_move == true){
                this.dragging = true;
            }
            else {
                this.dragging = false;
            }
            if(if_circle_choose)this.drawingCircle = true;
            else this.drawingCircle = false;

            if(if_choose_point)this.drawingPoint = true;
            else this.drawingPoint = false;
            mouse_down_position = getMousePos(this);
        }

        function onDragEnd() 
        {
            if(this.dragging)this.dragging = false;
            
            else if(this.drawingCircle)
            {
                reflash();
                this.drawingCircle = false;
                const newPosition = getMousePos(this);
                const circle_x = mouse_down_position.x;
                const circle_y = mouse_down_position.y;
                const circle_r = Math.sqrt(Math.pow(newPosition.x - circle_x, 2) + Math.pow(newPosition.y - circle_y, 2));
                let choosed_point_data = [];
                for(let node in f_nodes)
                {
                    const now_x = f_nodes[node].x * scaleAll_xy + moveAll_x;
                    const now_y = f_nodes[node].y * scaleAll_xy + moveAll_y;
                    if(Math.sqrt(Math.pow(now_x - circle_x, 2) + Math.pow(now_y - circle_y, 2)) <= circle_r)
                    {
                        choosed_point_data.push(f_nodes[node]);
                    }
                }

                circles_choose.clear();
                circles_choose_change_color.clear();
                console.log(choosed_point_data)
                var circle_list = []
                for(let node in  choosed_point_data)
                {
                    const now_x = (choosed_point_data[node].x);
                    const now_y = (choosed_point_data[node].y);
                    circle_list.push(choosed_point_data[node].id);
                    circles_choose_change_color.beginFill(circles_change_color);
                    circles_choose_change_color.drawCircle(now_x,now_y,force_circle_r);
                    circles_choose_change_color.endFill();
                }
                console.log(circle_list)
                tsne_chanege_color_by_list(circle_list);
                app.stage.addChild(circles_choose_change_color);
            }

            else if(this.drawingPoint == true)
            {
                this.drawingPoint = false;
                const newPosition = getMousePos(this);
                const circle_x = newPosition.x;
                const circle_y = newPosition.y;
                const circle_r = force_circle_r;
                let choosed_point_data = [];
                for(let node in f_nodes)
                {
                    const now_x = f_nodes[node].x * scaleAll_xy + moveAll_x;
                    const now_y = f_nodes[node].y * scaleAll_xy + moveAll_y;
                    if(Math.sqrt(Math.pow(now_x - circle_x, 2) + Math.pow(now_y - circle_y, 2)) <= circle_r)
                    {
                        choosed_point_data.push(f_nodes[node]);
                    }
                }

                circles_choose.clear();
                circles_choose_change_color.clear();
                for(let node in  choosed_point_data)
                {
                    const now_x = (choosed_point_data[node].x);
                    const now_y = (choosed_point_data[node].y);
                    circles_choose_change_color.beginFill(circles_change_color);
                    circles_choose_change_color.drawCircle(now_x,now_y,force_circle_r);
                    circles_choose_change_color.endFill();
                }
                app.stage.addChild(circles_choose_change_color);
            }
            this.data = null;
        }
        function onDragMove()
        {
            if (this.dragging == true)
            {
                const newPosition = getMousePos(this);
                const move_x = mouse_down_position.x - newPosition.x;
                const move_y = mouse_down_position.y - newPosition.y;
                mouse_down_position = newPosition;
                moveAll_x -= move_x;
                moveAll_y -= move_y;

                force_PIXIJS_circles.x = moveAll_x;
                force_PIXIJS_circles.y = moveAll_y;
                force_PIXIJS_lines.x = moveAll_x;
                force_PIXIJS_lines.y = moveAll_y;
                circles_choose.x = moveAll_x;
                circles_choose.y = moveAll_y;

                circles_choose_change_color.x = moveAll_x;
                circles_choose_change_color.y = moveAll_y;
            }

            if(this.drawingCircle == true)
            {
                const newPosition = getMousePos(this);
                const circle_r = Math.sqrt(Math.pow(newPosition.x / scaleAll_xy - mouse_down_position.x / scaleAll_xy, 2) + Math.pow(newPosition.y / scaleAll_xy - mouse_down_position.y / scaleAll_xy, 2));

                circles_choose.clear();
                circles_choose.beginFill(circle_Choose_Color);
                circles_choose.drawCircle((mouse_down_position.x - moveAll_x) / scaleAll_xy, (mouse_down_position.y - moveAll_y) / scaleAll_xy, circle_r);

                circles_choose.endFill();
                circles_choose.alpha = 0.5;

                app.stage.addChild(circles_choose);
            }
        }

        function getMousePos(canvas) { //获取鼠标位置
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left * (canvas.width / rect.width);
            const y = event.clientY - rect.top * (canvas.height / rect.height);
            ans = {}
            ans.x = x;
            ans.y = y;
            return ans;
        }

        //统一处理滚轮滚动事件
        function wheel(event){
            let delta = 0;
            if (!event) event = window.event;
            if (event.wheelDelta) {//IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
                delta = event.wheelDelta/120; 
                if (window.opera) delta = -delta;//因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
            }
            if (delta)
                handle(delta);       
        }

        //上下滚动时的具体处理函数
        function handle(delta) {
            if(delta <0){//向下滚动
                scaleAll_xy *= 1.2;
            }else{//向上滚动
                scaleAll_xy /= 1.2;
            }
            force_PIXIJS_circles.scale.x = scaleAll_xy;
            force_PIXIJS_circles.scale.y = scaleAll_xy;
            force_PIXIJS_lines.scale.x = scaleAll_xy;
            force_PIXIJS_lines.scale.y = scaleAll_xy;
            circles_choose.scale.x = scaleAll_xy;
            circles_choose.scale.y = scaleAll_xy;
            circles_choose_change_color.scale.x = scaleAll_xy;
            circles_choose_change_color.scale.y = scaleAll_xy;
        }


        function change_color(nodes)
        {
            for(let node in  nodes)
            {
                const now_x = (nodes[node].x - moveAll_x) * scaleAll_xy;
                const now_y = (nodes[node].y - moveAll_y) * scaleAll_xy;
                circles_choose_change_color.beginFill(circles_change_color);
                circles_choose_change_color.drawCircle(now_x,now_y,force_circle_r*scaleAll_xy*scaleAll_xy);
                circles_choose_change_color.endFill();
            }
            app.stage.addChild(circles_choose_change_color);
        }
    })
}

drawforce();


function drawforce_again(file_name){
    force_PIXIJS_lines.clear();
    force_PIXIJS_circles.clear();
    d3.json(file_name, function(datas){
        console.log(datas);
        f_nodes = datas['nodes'];
        for(var node in datas['nodes']){
            datas['nodes'][node].x = parseInt(datas['nodes'][node].x)
            datas['nodes'][node].y = parseInt(datas['nodes'][node].y)
        }
        f_links = datas['edges'];
        f_nodeID_key = {}
        for(let key in f_nodes){
            f_nodeID_key[f_nodes[key]['id']] = key;
        }

        for(var i = 0 ; i < f_links.length ; i++){
            force_PIXIJS_lines.lineStyle(0.4,line_Color,1);
            try{
                force_PIXIJS_lines.moveTo(parseInt(f_nodes[f_nodeID_key[f_links[i].source]].x),parseInt(f_nodes[f_nodeID_key[f_links[i].source]].y));
                force_PIXIJS_lines.lineTo(parseInt(f_nodes[f_nodeID_key[f_links[i].target]].x),parseInt(f_nodes[f_nodeID_key[f_links[i].target]].y));
            }catch(e){
                // console.log('---------------------'+ i + '-----------------')
                // console.log(f_links[i])
                // console.log(e)
            }
        }
        for(var key in f_nodes){
            force_PIXIJS_circles.beginFill(force_community_circle_Color);
            force_PIXIJS_circles.drawCircle(parseInt(f_nodes[key].x),parseInt(f_nodes[key].y),force_circle_r);
            // console.log(parseInt(f_nodes[key].x))
            force_PIXIJS_circles.endFill();
        }
        app.stage.addChild(force_PIXIJS_lines);
        app.stage.addChild(force_PIXIJS_circles);

    })
}


// function temp_draw_community(community_num){
//     d3.json('/data_forSystem/cit-HepTh/community_num/CHori_community.json', function(data){
//         var choosed_point_data = []
//         for(var i in data){
//             if(data[i] == community_num){
//                 choosed_point_data.push(i);
//             }
//         }
//         d3.json(force_file_name, function(force_datas){
//                 let temp_datas = force_datas['nodes'];
//                 let temp_edges = force_datas['edges'];
//                 let datas = {};
//                 for(let key in temp_datas){
//                     data_id = temp_datas[key]['id'];
//                     datas[data_id] = temp_datas[key];
//                 }
//                 var circles_change_color = 0xff00ff;
//                 // console.log(choosed_point_data)
//                 circles_choose.clear();
//                 circles_choose_change_color.clear();
//                 for(let node in  choosed_point_data)
//                 {
//                     if(choosed_point_data[node] in datas){
//                         const now_x = (datas[choosed_point_data[node]].x);
//                         const now_y = (datas[choosed_point_data[node]].y);
//                         d3.select("#tsne_node_"+choosed_point_data[node]).style("fill",circles_change_color);
//                         circles_choose_change_color.beginFill(circles_change_color);
//                         circles_choose_change_color.drawCircle(now_x,now_y,1);
//                         circles_choose_change_color.endFill();                        
//                     }
//                 }
//                 app.stage.addChild(circles_choose_change_color);
//                 //tsne该颜色
//                 tsne_chanege_color_by_list(choosed_point_data);
//                 // d3.select('#tsne_brush').remove()
//                 d3.select('#tsne_brush').style('opacity', 0)
//         })


//     })
// }


// temp_draw_community(0)


