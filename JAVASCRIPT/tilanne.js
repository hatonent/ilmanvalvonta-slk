
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
		document.getElementById("demo").innerHTML = "Luokka " + tiedot.areaId;
	}
};
window.getData = function(luokka) {
	xhttp.open("GET", 'http://api.ruonavaara.fi/iot/area/' + luokka + '/latest' , true);
	xhttp.send();

}

getData(462);
setInterval(getData,60000);
