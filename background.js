 var counter = 0;
function calc() {
    var plusArr = [],plusCalc = 0, minusArr = [], minusCalc = 0, minSum = 0, hourSum = 0;
	document.querySelectorAll("table .rowGrid-att-green").forEach(function ( value) {
        plusArr.push(value.innerHTML.split(":"))
    })
    plusArr.forEach(function (item)
    {
        plusCalc = plusCalc + (+item[0]*60 + +item[1])
    });
   document.querySelectorAll("table .rowGrid-att-red").forEach(function ( value) {
        minusArr.push(value.innerHTML.split(":"))
    });
			
    if(minusArr.length > 0 && minusArr[minusArr.length-1][0]==="-09") minusArr[minusArr.length-1][0] = "00";
    minusArr.forEach(function (item)
    {
        minusCalc = minusCalc+(+item[0]*60 + (+item[1]*-1))
    });

    minSum = plusCalc + minusCalc;
    hourSum  = (minSum < 0 ?  "-" : "+") + (Math.floor(Math.abs(minSum/60)) < 10 ? "0" : "") + Math.floor(Math.abs(minSum/60)) + ":" + (Math.abs((minSum%60)) < 10 ? "0" : "") + Math.abs((minSum%60))
    return {plusArr, minusArr,plusCalc,minusCalc,minSum,hourSum}
    //return hourSum;
}
function main (){
	var el = document.querySelector(".row");

	var timeSpan = document.createElement("SPAN");           
	var textSpan = document.createElement("SPAN");   
        
	var calcResult = calc();  
    
	var timeText = document.createTextNode(calcResult.hourSum);
	var textData = document.createTextNode("Your hours status: ");

	timeSpan.style.fontSize = "40px";  
	textSpan.style.fontSize = "40px";  
    timeSpan.style.color = calcResult.minSum > 0 ? "green" : "red";

	el.parentNode.insertBefore(textSpan,el)      
	el.parentNode.insertBefore(timeSpan,el)     
 
	timeSpan.appendChild(timeText);    
	textSpan.appendChild(textData);    
    
                     
	el.append(textSpan);   
	el.append(timeSpan);   
}

function loop(){
		if(document.querySelectorAll("table .rowGrid-att-green").length === 0)
		{
			counter++;
			console.log(counter);
			window.setTimeout(loop,1000);
		}
		 else{
			main()
		 }
	}

	
window.addEventListener('hashchange', function(e){
		if(window.location.hash === "#attendance")
			loop()
});

window.addEventListener('load', function(e){
		if(window.location.hash === "#attendance")
			loop()
});



