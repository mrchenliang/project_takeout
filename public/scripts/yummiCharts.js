google.load("visualization", "1", {packages:["corechart"]});

const drawChart = function() {
  const allCookies = document.cookie;
  const splitCookie = allCookies.split('=');

  $.ajax({
    method : 'GET',
    url: '/users/' + splitCookie[1][0] + '/allOrders/stats',
  }).done(function(value) {
    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Categories');
    data.addColumn('number', 'Total Cost');
    console.log(value[0]);


    value[0].forEach(element => {
      data.addRow([element.name, Number(element.total / 100)]);
    });


    let options = {
      title: 'What is your favorite food?(In $ Spent On Category)',
      'width':500,
      'height':400,
      is3D: true,
    };

    let chart = new google.visualization.PieChart(document.getElementById('singleOrderDetails'));
    chart.draw(data, options);
  });
};

