var pg_sample_rate = 'rate-5'
var pg_name = 'ANB'    
var pg_file_name = '/data_forSystem/ieee_visC/pdData/IVxxxori_Eva.json'
var APL_filePath = '../data_forSystem/ieee_visC/shortestPath/IV_BFS_rate_10_shortestPath.json'


function tableButton_click(e){
    var tableButton = document.getElementsByClassName('button_control_up')
    	
    document.getElementById('button_ABD').style.border = '1px solid rgb(228, 228, 228)';
    document.getElementById('button_ACC').style.border = '1px solid rgb(228, 228, 228)';
    document.getElementById('button_APL').style.border = '1px solid rgb(228, 228, 228)';
    document.getElementById('button_LCC').style.border = '1px solid rgb(228, 228, 228)';
    document.getElementById('button_CC').style.border = '1px solid rgb(228, 228, 228)';
    document.getElementById('button_SCC').style.border = '1px solid rgb(228, 228, 228)';

    for(var i = 0; i<tableButton.length; i++){
        tableButton[i].style.background = '#f2f2f2';
    }

    e.style.background = 'white';
    e.style.border = 'none';
}

function show_CC(){
    var tableButton = document.getElementsByClassName('button_control_up')
    	
    document.getElementById('button_ABD').style.border = '1px solid rgb(228, 228, 228)';
    document.getElementById('button_ACC').style.border = '1px solid rgb(228, 228, 228)';
    document.getElementById('button_APL').style.border = '1px solid rgb(228, 228, 228)';
    document.getElementById('button_LCC').style.border = '1px solid rgb(228, 228, 228)';
    document.getElementById('button_CC').style.border = '1px solid rgb(228, 228, 228)';
    document.getElementById('button_SCC').style.border = '1px solid rgb(228, 228, 228)';

    for(var i = 0; i<tableButton.length; i++){
        tableButton[i].style.background = '#f2f2f2';
    }

    document.getElementById('button_CC').style.background = 'white';
    document.getElementById('button_CC').style.border = 'none';
}
