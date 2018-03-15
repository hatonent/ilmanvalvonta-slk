var historia = new XMLHttpRequest();
console.log(historia);
historia.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		console.log(historia.responseText);
		var historiaTiedot = JSON.parse(historia.responseText);
		historiaTiedot.reverse();

		var tempData = [
			["klo", "Lämpötila"]
		];

		var humidityData = [
			["klo", "Ilmankosteus"]
		];

		var CO2data = [
			["klo", "CO2"]
		];


		historiaTiedot.forEach(function(mittaus) {
			var tunti = mittaus.group.hour + 2;
			if (tunti == 24) {
				tunti = 0;
			}
			else if(tunti == 25) {
				tunti = 1;
			}
			tempData.push([tunti.toString() + ":00", mittaus.avg.temperature]);
			humidityData.push([tunti.toString() + ":00", mittaus.avg.humidity]);
			CO2data.push([tunti.toString() + ":00", mittaus.avg.CO2]);
		});

		console.log(CO2data);

		google.charts.load('current', {
			'packages': ['corechart']
		});
		google.charts.setOnLoadCallback(drawLinechart);

		function drawLinechart() {
			var data = google.visualization.arrayToDataTable(tempData);

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

			console.log(options);

			var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

			chart.draw(data, options);

			window.changeData = function (a) {
				if(a == 1){
					data = google.visualization.arrayToDataTable(tempData);
					options.colors[0] = 'orange';
					options.vAxis.viewWindow.min = 10;
					options.vAxis.viewWindow.max = 30;
					var luku = 5;
					for (i = 0; i < 5; i++){
						luku += 5;
						options.vAxis.ticks[i] = luku;
					}

					chart.draw(data, options);
				}
				else if (a == 2){
					data = google.visualization.arrayToDataTable(CO2data);
					options.colors[0] = 'black';
					options.vAxis.viewWindow.min = 0;
					options.vAxis.viewWindow.max = 2000;
					for (i = 0; i < 5; i++)  {
						options.vAxis.ticks[i] = i * 500;
					}
					chart.draw(data, options);
				}
				else if (a == 3){
					data = google.visualization.arrayToDataTable(humidityData);
					options.colors[0] = 'blue';
					options.vAxis.viewWindow.min = 0;
					options.vAxis.viewWindow.max = 100;
					for (i = 0; i < 6; i++){
						options.vAxis.ticks[i] = i * 20;
					}
					console.log(options.vAxis.ticks);
					chart.draw(data, options);
				}
			}
		}
	}
};
window.getLinechartData = function(hoursback){
	historia.open("GET", "http://api.ruonavaara.fi/iot/area/5/history?attributes=temperature,humidity,CO2&start=" + moment().utc().subtract(hoursback, 'hours').format() + "&end=" + moment().utc().format() + "&groupBy=hour", true);
	historia.send();
}

getLinechartData(12);
