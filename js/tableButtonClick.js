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

    console.log(e)
    e.style.background = 'white';
    e.style.border = 'none';
}