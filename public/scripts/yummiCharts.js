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


//  google.charts.load('current', {'packages':['corechart']});

//  // Set a callback to run when the Google Visualization API is loaded.
//  google.charts.setOnLoadCallback(drawChart);

//  // Callback that creates and populates a data table,
//  // instantiates the pie chart, passes in the data and
//  // draws it.
// const drawChart = function(stats) {

//   // Create the data table.
//   let data = new google.visualization.DataTable();

//   //  const categories = [];
//   //   passedInfo.forEach((element) => {
//   //     if (element.)
//   //   })


//   data.addRows(categoryArray);
//   //  data.addRows([
//   //    ['Mushrooms', 3],
//   //    ['Onions', 1],
//   //    ['Olives', 1],
//   //    ['Zucchini', 1],
//   //    ['Pepperoni', 2]
//   //  ]);

//   //  // Set chart options
//   let options = {'title':'What are your favourite categories of food?',
//     'width':400,
//     'height':300};

//   //  // Instantiate and draw our chart, passing in some options.
//   let chart = new google.visualization.PieChart(document.getElementById('singleOrderDetails'));
//   chart.draw(data, options);
// };
