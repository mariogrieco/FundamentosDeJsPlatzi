/*let keys = document.getElementsByClassName("key");
  // mas en class 
// metodo referenciando.

[].forEach.call(keys,function(a){

	 
		como addEve.. 
		 agrega this respecto al elemento. 
		 ( no todos lo ponen ).
		no pongo arrow o bind.

	
	a.addEventListener("click",function(){
		 
	});
});*/

//  Opcion 2
/*
		creo un atributo. ( compatible? ).
*/

/* 
		querySelector 
		retorna el primero que encuentre.
		param
		atributo [attr="var"]
		id?..
		selector css clases=> .algo
*/


/* 
	Como forEach no retorna 
	entonces debo crear la variable .
	fill, por que forEach no recorre undefined values
	al igual que los demas!
	otra es con map
*/
// function getRound(round,max,min){
// 	let temp = new Array(round);

// 	temp.fill(0).forEach(function(a,b,c){
// 		c[b] = Math.round((Math.random() * ((max) - min) + min) % (max+1)); 
// 	});

// 	console.log(temp,r);
// }




const GamePlay = (function(){

	 const max        = 90;
	 const min        = 65;
	 const timeDelay  = 1000;
	 let   keys       = [];
	 let   inputCount = 0;
	 let   simonAwait = 0;
	 let   round      = 0;

	 let _getRoundKeys = function _getRoundKeys(round,max,min){
		return new Array(round).fill(0).map(function(){
			return Math.round((Math.random() * (max - min))) + min % (max+1);
			 // el modulo esta de mas pero porcinas..
		});	
	 }

	 let _getKeyDOM = function _getKeyDOM(keyCode){
	 	return document.querySelector(`[data-key="${keyCode}"]`);
	 }

	 let _focusKey = function _focusKey(keyCode){
	 	const key = _getKeyDOM(keyCode);
	 	key.classList.add("active");
	 	setTimeout( () => { 
	 			key.classList.remove("active"); 
	 			simonAwait = simonAwait+1;
	 	}, (timeDelay/2) );
	 }

	 let _simonDice = function _simonDice(){
	 	keys = _getRoundKeys(round,max,min);
	 	 keys.forEach((a,b)=>{
	 		setTimeout(_focusKey.bind(null,a),(timeDelay*b)+1000);
	 	});
	 }

	 let _activate = function _activate(keyCode,state){
	 	const key = _getKeyDOM(keyCode);
	 	key.classList.add("active");
	 	key.classList.add(state);
	 	setTimeout(()=> {key.className = "key"} ,1000);
	 }

	 let _playerInput = function _playerInput(event){ 
	 	if ( simonAwait == keys.length && keys.length != 0 ) {	
			if ( event.keyCode < 65 || event.keyCode > 90 ){

			} else if ( event.keyCode == keys[inputCount] ) {
				// console.log(`tecla ${keys[inputCount]} success ${event.keyCode}`);	
	 			_activate(keys[inputCount],"success");
	 			inputCount++;
		 	   	if ( inputCount == keys.length ) {
		 	   		// console.log("lvl done!")
		 	   		document.removeEventListener("keydown",_playerInput);
					setTimeout(GamePlay,1500);
				}
	 		}
	 		else{
	 			// console.log(`tecla ${keys[inputCount]} fail ${event.keyCode}`);	
	 			_activate(event.keyCode,"fail");
	 			document.removeEventListener("keydown",_playerInput);
	 			round = 0;
	 		 	swal({
	 					title: "Perdiste",
	 					text: "Nueva partirda?",
	 					showCancelButton: true,
	 					confirmButtonText: "SI",
	 					cancelButtonText: "NO",
	 					closeOnConfirm: false,
	 					closeOnCancel: true
		 			},function(resp){
		 				if (resp) {
		 					GamePlay();
		 				}
		 			});

	 		}

		}
	 }

	 let GamePlay = function GamePlay(){
	    simonAwait = 0;
	 	inputCount = 0;
	 	keys = [];
	 	round = round + 1;
	 	document.addEventListener("keydown", _playerInput);
	 	swal({ title: `Nivel ${round}`, closeOnConfirm: false,closeOnCancel: false }, null );
	 	setTimeout(_simonDice,1000);
	 }

	 return {
	 	start : GamePlay,
	 }

}());


GamePlay.start();






		// Duda forech al estilo map
		// array.forEach(function(a,b,c){ c[b] = rand() } )

// en el timeOut, bind al parm

// http://keycode.info/

// DIEFERENCIA ENTRE QUERY Y BYC || BYI

//classList.metodos.
// className = "todo"
