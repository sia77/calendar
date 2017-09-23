var create_account = document.getElementById("create_account");
var ancher = document.getElementById('demo');
var bk_drop = document.getElementById('bk_drop');
var form_container = document.getElementById('form_container');


create_account.addEventListener('click', function(){

	popup_box(bk_drop);
	f_container(form_container);
});



var popup_box = function(bk_drop){
	bk_drop.style.display="flex";
	//ancher.innerHTML= "<div class='popup_box'></div>";

}

var f_container = function(form_container){
	var form = "<form><input type='text' name='fname'><input type='text' name='lname'></form>";
	form_container.innerHTML = form;
}



