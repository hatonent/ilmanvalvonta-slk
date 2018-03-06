// JavaScript Document
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		// Typical action to be performed when the document is ready:
		console.log(xhttp.responseText);
		var tiedot = JSON.parse(xhttp.responseText);
/*	document.getElementById("demo").innerHTML = "Lämpötila: " + tiedot.temperature + " &deg;C" + "<br />" + "Ilmankosteus: " + tiedot.humidity + " &#37;" + "<br />" + "Hiilidioksidi: " + tiedot.CO2 + "<br />" + "Luokkatila: " + tiedot.areaId + "<br />" + "Sensori-ID: " + tiedot.sensorId + "<br />" + "Mittausaika: " + tiedot.timestamp;*/
		
		
	
		google.charts.load('current', {'packages':['gauge']});
      	google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['Ilmankosteus', 0],
          ['Lämpötila', 0],
          ['CO2', 0]
        ]);

        var options = {
         /* width: 400, height: 120*/
		  min:0, max: 70,
          redFrom: 60, redTo: 70,
          yellowFrom:50, yellowTo: 60,
          minorTicks: 5
		
			
        };
		  

		  

        var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

        chart.draw(data, options);

        setInterval(function() {
          data.setValue(0, 1, tiedot.humidity);
          chart.draw(data, options);
        }, 100);
        setInterval(function() {
          data.setValue(1, 1, tiedot.temperature);
          chart.draw(data, options);
        }, 100);
        setInterval(function() {
          data.setValue(2, 1, tiedot.CO2);
          chart.draw(data, options);
        }, 100);
		setInterval(function() {
          data.setValue(2, 1, tiedot.CO2);
          chart.draw(data, options);
        }, 1000);
      }
		
		
      
			}
		};
xhttp.open("GET", "http://api.ruonavaara.fi/iot/area/5/latest", true);
xhttp.send();

