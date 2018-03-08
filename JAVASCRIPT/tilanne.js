
/*
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
// Typical action to be performed when the document is ready:
console.log(xhttp.responseText);
var tiedot = JSON.parse(xhttp.responseText);
/*	document.getElementById("demo").innerHTML = "Lämpötila: " + tiedot.temperature + " &deg;C" + "<br />" + "Ilmankosteus: " + tiedot.humidity + " &#37;" + "<br />" + "Hiilidioksidi: " + tiedot.CO2 + "<br />" + "Luokkatila: " + tiedot.areaId + "<br />" + "Sensori-ID: " + tiedot.sensorId + "<br />" + "Mittausaika: " + tiedot.timestamp;

google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

var data = google.visualization.arrayToDataTable([
['Label', 'Value'],
['Ilmankosteus', tiedot.humidity],
['Lämpötila', tiedot.temperature],
['CO2', tiedot.CO2]
]);

var options = {

min:0, max: 70,
redFrom: 60, redTo: 70,
yellowFrom:50, yellowTo: 60,
minorTicks: 5
};

var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

chart.draw(data, options);

}
}
};
function getData(url) {
xhttp.open("GET", url, true);
xhttp.send();
}

getData("http://api.ruonavaara.fi/iot/area/5/latest");
setInterval(getData,60000);
*/
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		console.log(xhttp.responseText);
		var tiedot = JSON.parse(xhttp.responseText);

		google.charts.load('current', {'packages':['gauge']});
		google.charts.setOnLoadCallback(humidity);

		function humidity() {

			var data = google.visualization.arrayToDataTable([
				['Label', 'Value'],
				['Humidity', tiedot.humidity],

			]);

			var options = {
				min:0, max:100,
				redFrom: 30, redTo: 60, redColor:'#00FF00',
				greenFrom: 0, greenTo: 100, greenColor:'#FF0000',
				yellowFrom:25, yellowTo: 70, yellowColor: "#ffbb00",
				minorTicks: 5,
			};

			var chart = new google.visualization.Gauge(document.getElementById('chart_humidity'));
			chart.draw(data, options);

		}
		google.charts.load('current', {'packages':['gauge']});
		google.charts.setOnLoadCallback(temperature);

		function temperature() {

			var data = google.visualization.arrayToDataTable([
				['Label', 'Value'],
				['°C', tiedot.temperature],

			]);

			var options = {

				min:15, max:30,
				redFrom: 20, redTo: 22, redColor:'#00FF00',
				greenFrom: 15, greenTo: 30, greenColor:'#FF0000',
				yellowFrom:18, yellowTo: 23, yellowColor: "#ffbb00",
				minorTicks: 5,


			};


			var chart = new google.visualization.Gauge(document.getElementById('chart_temperature'));

			chart.draw(data, options);


		}
		google.charts.load('current', {'packages':['gauge']});
		google.charts.setOnLoadCallback(co2);

		function co2() {

			var data = google.visualization.arrayToDataTable([
				['Label', 'Value'],
				['CO2', tiedot.CO2],

			]);

			var options = {

				min:0, max: 5000,
				greenFrom: 0, greenTo: 1000, greenColor:"#00FF00",
				redFrom: 2000, redTo: 5000, redColor: '#FF0000',
				yellowFrom:1000, yellowTo: 2000, yellowColor: "#ffbb00",
				minorTicks:5,





			};


			var chart = new google.visualization.Gauge(document.getElementById('chart_co2'));

			chart.draw(data, options);

		}

	}
};
function getData() {
	xhttp.open("GET", 'http://api.ruonavaara.fi/iot/area/5/latest' , true);
	xhttp.send();
}

getData();
setInterval(getData,60000);
