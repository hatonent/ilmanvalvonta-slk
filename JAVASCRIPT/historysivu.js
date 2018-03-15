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
		google.charts.setOnLoadCallback(drawHistorychart);

		function drawHistorychart() {
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

			console.log(options);
      /*htmlcontent =
        document.getElementsByClassName("htmlcontent");
          for(i = 0; i < htmlcontent.length; i++){
            htmlcontent[i].style.display = "block";
          */

			var chart = new google.visualization.LineChart(document.getElementsByClassName('historychart')[0]);
      chart.draw(data, options);
      var chart = new google.visualization.LineChart(document.getElementsByClassName('historychart')[1]);
      chart.draw(data, options);
      var chart = new google.visualization.LineChart(document.getElementsByClassName('historychart')[2]);

			chart.draw(data, options);

			window.changeData = function (a) {
				if(a == 1){
					data = google.visualization.arrayToDataTable(historyTempData);
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
					data = google.visualization.arrayToDataTable(historyCO2data);
					options.colors[0] = 'black';
					options.vAxis.viewWindow.min = 0;
					options.vAxis.viewWindow.max = 2000;
					for (i = 0; i < 5; i++)  {
						options.vAxis.ticks[i] = i * 500;
					}
					chart.draw(data, options);
				}
				else if (a == 3){
					data = google.visualization.arrayToDataTable(historyHumidityData);
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
window.getHistorychartData = function(hoursback){
	historiaa.open("GET", "http://api.ruonavaara.fi/iot/area/5/history?attributes=temperature,humidity,CO2&start=" + moment().utc().subtract(hoursback, 'hours').format() + "&end=" + moment().utc().format() + "&groupBy=day", true);
	historiaa.send();
}

getHistorychartData(100);
