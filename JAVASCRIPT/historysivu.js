var historiaa = new XMLHttpRequest();
console.log(historiaa);
historiaa.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		console.log(historiaa.responseText);
		var historiaaTiedot = JSON.parse(historiaa.responseText);
		historiaaTiedot.reverse();

		var historyTempData = [
			["klo", "Lämpötila"]
		];

		var historyHumidityData = [
			["klo", "Ilmankosteus"]
		];

		var historyCO2data = [
			["klo", "CO2"]
		];


		historiaaTiedot.forEach(function(mittaus) {
			historyTempData.push([mittaus.group.day.toString() + "." + mittaus.group.month.toString() , mittaus.avg.temperature]);
			historyHumidityData.push([mittaus.group.day.toString() + "." + mittaus.group.month.toString() , mittaus.avg.humidity]);
			historyCO2data.push([mittaus.group.day.toString() + "." + mittaus.group.month.toString() , mittaus.avg.CO2]);
		});

		google.charts.load('current', {
			'packages': ['corechart']
		});
		google.charts.setOnLoadCallback(drawTempHistorychart);

		function drawTempHistorychart() {
			var data = google.visualization.arrayToDataTable(historyTempData);

			var options = {
				title: 'Tilastot',
				curveType: 'function',
				legend: {
					position: 'bottom'
				},
				colors: ['orange'],
				vAxis: {
					viewWindow: {
						min: 10,
						max: 35
					},
					ticks: [10, 15, 20, 25, 30]
				}
			};

			var chart = new google.visualization.LineChart(document.getElementsByClassName('historychart')[0]);
			chart.draw(data, options);
		}

		google.charts.setOnLoadCallback(drawCO2Historychart);

		function drawCO2Historychart() {
			var data = google.visualization.arrayToDataTable(historyCO2data);

			var options = {
				title: 'Tilastot',
				curveType: 'function',
				legend: {
					position: 'bottom'
				},
				colors: ['black'],
				vAxis: {
					viewWindow: {
						min: 0,
						max: 2000
					},
					ticks: [0, 500, 1000, 1500, 2000]
				}
			};

			var chart = new google.visualization.LineChart(document.getElementsByClassName('historychart')[1]);
			chart.draw(data, options);
		}

		google.charts.setOnLoadCallback(drawHumidityHistorychart);

		function drawHumidityHistorychart() {
			var data = google.visualization.arrayToDataTable(historyHumidityData);

			var options = {
				title: 'Tilastot',
				curveType: 'function',
				legend: {
					position: 'bottom'
				},
				colors: ['blue'],
				vAxis: {
					viewWindow: {
						min: 0,
						max: 100
					},
					ticks: [0, 20, 40, 60, 80, 100]
				}
			};

			var chart = new google.visualization.LineChart(document.getElementsByClassName('historychart')[2]);
			chart.draw(data, options);
		}
	}
};
window.getHistorychartData = function(hoursback, luokka){
	historiaa.open("GET", "http://api.ruonavaara.fi/iot/area/" + luokka + "/history?attributes=temperature,humidity,CO2&start=" + moment().utc().subtract(hoursback, 'hours').format() + "&end=" + moment().utc().format() + "&groupBy=day", true);
	historiaa.send();
	document.getElementById("demo").innerHTML = "Luokka " + luokka;
}

getHistorychartData(100,5);
