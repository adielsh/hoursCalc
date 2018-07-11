 var counter = 0;
 var SHORT_URL = "goo.gl/2jPrqh";
 var extObjData = {YEAR_EXPIRE: "119", MSG: "Extension version expired, Please check for a new version at this URL:	"}

 function parseFromFirebase(msg){
	var jsonData = JSON.parse(msg);
	extObjData.YEAR_EXPIRE = jsonData.expired;
	extObjData.MSG = jsonData.msg;
 }
 
 function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
 
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
        var splittedValue = value.innerHTML.split(":");
        if(+splittedValue[0] >= - 3 || (+splittedValue[0] === -4 && +splittedValue[1] === 0)  )
        	minusArr.push(splittedValue)
    });
			
    minusArr.forEach(function (item)
    {
        minusCalc = minusCalc+(+item[0]*60 + (+item[1]*-1))
    });

    minSum = plusCalc + minusCalc;
    hourSum  = (minSum < 0 ?  "-" : "+") + (Math.floor(Math.abs(minSum/60)) < 10 ? "0" : "") + Math.floor(Math.abs(minSum/60)) + ":" + (Math.abs((minSum%60)) < 10 ? "0" : "") + Math.abs((minSum%60))
    return {plusArr, minusArr,plusCalc,minusCalc,minSum,hourSum}
}

function draw (){
	var el = document.querySelector(".row");

	var timeSpan = document.createElement("SPAN");           
	var textSpan = document.createElement("SPAN");   
 

	if(new Date().getYear() < extObjData.YEAR_EXPIRE)
	{
		var calcResult = calc();  
    
		var timeText = document.createTextNode(calcResult.hourSum);
		var textData = document.createTextNode("Your hours status: ");
		textSpan.style.fontSize = "40px"; 
		timeSpan.style.fontSize = "40px";  
		timeSpan.style.color = calcResult.minSum > 0 ? "green" : "red";

		el.parentNode.insertBefore(textSpan,el)      
		el.parentNode.insertBefore(timeSpan,el)  
		timeSpan.appendChild(timeText);  
		textSpan.appendChild(textData);                 
		el.append(textSpan);   
		el.append(timeSpan);  	
	}
	else
	{
		var textData = document.createTextNode(extObjData.MSG);
		textSpan.style.color  = "blue";
		textSpan.style.fontSize = "20px"; 
		textSpan.appendChild(textData);                 
		el.append(textSpan); 
	} 
	  

	 
}

function loop(){
		if(document.querySelectorAll("table .rowGrid-att-green").length === 0)
		{
			counter++;
			window.setTimeout(loop,1000);
		}
		 else{
			draw()
		 }
	}

	function checkStatus(){
	
		window.addEventListener('hashchange', function(e){
				if(window.location.hash === "#attendance")
					loop()
		});

		window.addEventListener('load', function(e){
				if(window.location.hash === "#attendance")
					loop()
		});
	}
	
	function main(){
		checkStatus();
	}
	
	httpGetAsync("https://us-central1-harmonycalchours.cloudfunctions.net/getUserMessage",parseFromFirebase);
	main();
	


