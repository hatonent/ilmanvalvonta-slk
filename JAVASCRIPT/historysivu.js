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
				titleTextStyle: {
					fontName: 'Barlow Condensed'
				},
				title: 'Lämpötila',
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
					ticks: [10, 15, 20, 25, 30],
					textStyle: {
						fontName: 'Barlow Condensed'
					}
				},
				hAxis: {
					textStyle: {
						fontName: 'Barlow Condensed'
					}
				},
				legend: {
					textStyle: {
						fontName: 'Barlow Condensed'
					},
					position: 'bottom'
				}
			};
			function resizeTemp () {
				var chart1 = new google.visualization.LineChart(document.getElementsByClassName('historychart')[0]);
				chart1.draw(data, options);
			}
			window.onload = resizeTemp;
			resizeTemp();
			window.onresize = resizeTemp;

		}

		google.charts.setOnLoadCallback(drawCO2Historychart);

		function drawCO2Historychart() {
			var data = google.visualization.arrayToDataTable(historyCO2data);

			var options = {
				titleTextStyle: {
					fontName: 'Barlow Condensed'
				},
				title: 'CO2',
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
					ticks: [0, 500, 1000, 1500, 2000],
					textStyle: {
						fontName: 'Barlow Condensed'
					}
				},
				hAxis: {
					textStyle: {
						fontName: 'Barlow Condensed'
					}
				},
				legend: {
					textStyle: {
						fontName: 'Barlow Condensed'
					},
					position: 'bottom'
				}
			};
			function resizeCo2 () {
				var chart2 = new google.visualization.LineChart(document.getElementsByClassName('historychart')[1]);
				chart2.draw(data, options);
			}
			window.onload = resizeCo2;
			resizeCo2();
			window.onresize = resizeCo2;
		}

		google.charts.setOnLoadCallback(drawHumidityHistorychart);

		function drawHumidityHistorychart() {
			var data = google.visualization.arrayToDataTable(historyHumidityData);

			var options = {
				titleTextStyle: {
					fontName: 'Barlow Condensed'
				},
				title: 'Ilmankosteus',
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
					ticks: [0, 20, 40, 60, 80, 100],
					textStyle: {
						fontName: 'Barlow Condensed'
					}
				},
				hAxis: {
					textStyle: {
						fontName: 'Barlow Condensed'
					}
				},
				legend: {
					textStyle: {
						fontName: 'Barlow Condensed'
					},
					position: 'bottom'
				}
			};
			function resizeHumidity () {
				var chart3 = new google.visualization.LineChart(document.getElementsByClassName('historychart')[2]);
				chart3.draw(data, options);
			}
			window.onload = resizeHumidity;
			resizeHumidity();
			window.onresize = resizeHumidity;

		}
	}
};
window.getHistorychartData = function(hoursback, luokka){
	historiaa.open("GET", "http://api.ruonavaara.fi/iot/area/" + luokka + "/history?attributes=temperature,humidity,CO2&start=" + moment().utc().subtract(hoursback, 'days').format() + "&end=" + moment().utc().format() + "&groupBy=day", true);
	historiaa.send();
	document.getElementById("demo").innerHTML = "Luokka " + luokka;
}

getHistorychartData(7,5);
