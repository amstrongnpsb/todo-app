const dateTime = document.getElementsByClassName('date-time')[0];
const addBtn = document.getElementsByClassName('add-content')[0];
console.log(addBtn);
var date = new Date();
	var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
	var current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
	var date_time = current_date+" "+current_time;	
	dateTime.innerHTML = date_time;

addBtn.addEventListener("click",function(){
    
})

