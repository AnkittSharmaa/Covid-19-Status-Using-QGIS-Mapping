fetch("https://pomber.github.io/covid19/timeseries.json").then(res=>res.json()).then(res=>{
    const { date, confirmed, deaths, recovered } = res.India[res.India.length - 1];
    const differenceC = res.India[res.India.length - 1].confirmed - res.India[res.India.length - 2].confirmed;
    const differenceR = res.India[res.India.length - 1].recovered - res.India[res.India.length - 2].recovered;
    const differenceD = res.India[res.India.length - 1].deaths - res.India[res.India.length - 2].deaths;
    
    let span=document.querySelector(".latest")
    span.innerHTML+=` <div class="dateDiv"> As Of : <span class="date">${date}</span> </div>
      <div class="todayBox todayConfirmedBox">
          Infected
          <div class="todayInfo todayConfirmedInfo">
            ${confirmed} (+${differenceC})
          </div>
      </div>
      <div class="todayBox todayRecoveredBox">
          Recoveries
          <div class="todayInfo todayRecoveredInfo">
            ${confirmed - deaths} (+${differenceR})
          </div>
      </div>
      <div class="todayBox todayDeadBox">
          Deaths
          <div class="todayInfo todayDeadInfo">
            ${deaths} (+${differenceD})
          </div>
      </div>
      `;

      let table=document.querySelector("table")

      const temp = res["India"].reverse();
      temp.forEach((e, i) => {
      let difference = {
        confirmed: temp[i].confirmed - temp[i + 1].confirmed,
        recovered: (temp[i].confirmed - temp[i].deaths) - (temp[i + 1].confirmed - temp[i + 1].deaths),
        deaths: temp[i].deaths - temp[i + 1].deaths
      }
      let confirmedDiff = temp[i].confirmed - temp[i + 1].confirmed;
      let table = document.querySelector("table");
      table.innerHTML += `<tr>
    <td> ${e.date} </td>
    <td> ${e.confirmed} (+${difference.confirmed})</td>
    <td> ${e.recovered} (+${difference.confirmed - difference.deaths})</td>
    <td> ${e.deaths} (+${difference.deaths})</td>
    </tr>`;
    });
    
  }
)

fetch("https://pomber.github.io/covid19/timeseries.json").then(res=>res.json()).then(res=>{

  const data = {
       date: [],
       confirmed: [],
       recovered: [],
       deaths: []
     }

    res["India"].forEach(({ date, confirmed, recovered, deaths }) =>{
    data.date.push(date)
    data.confirmed.push(confirmed)
    data.recovered.push(recovered)
    data.deaths.push(deaths)
    });


     let ctx = document.getElementById('myChart').getContext('2d'); 
      
     let chart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: [...data.date],
              datasets: [{
                  label: 'Infected',
                  borderColor: '#00B2FF',
                  data: [...data.confirmed],
                  borderWidth:'3',
                  pointRadius:'false',
              },
              {
                  label: 'Recoveries',
                  borderColor: '#00FF85',
                  data: [...data.recovered],
                  borderWidth:'3',
                  pointRadius:'false',
              },
              {
                  label: 'Deaths',
                  borderColor: '#FF003D',
                  data: [...data.deaths],
                  borderWidth:'3',
                  pointRadius:'false',
              }]
          },
          // Configuration options go here https://www.chartjs.org/docs/latest/general/interactions/events.html
          options: {

            legend: {
            display: false,
            },
          
            maintainAspectRatio:false,
          }
      });
})