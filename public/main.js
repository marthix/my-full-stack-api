document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    fetchRequest()

    document.getElementById('tableHeaders').addEventListener('click', function(e){
      if (e.target.nodeName === 'TH') {
        var headerCol = e.target
        var dataSort = headerCol.getAttribute('data-sort')
        var dataDirection = headerCol.getAttribute('data-direction')

        fetchRequest(dataSort, dataDirection)

        headerCol.setAttribute('data-direction', dataDirection === 'asc' ? 'desc' : 'asc')
      }
    })
  }
}

var fetchRequest = function (sortColumn, sortDirection) {
  var tableBody = document.querySelector('#data tbody')
  tableBody.innerHTML = ''

  //Fetch the API data
  fetch('http://localhost:8000/api/v1?sort=' + encodeURIComponent(sortColumn ? sortColumn : '') + '&direction=' + encodeURIComponent(sortDirection ? sortDirection : ''))

    //Parse the returned JSON response
    .then(function(response) {
      return response.json()
    })

    //Take the JSON object, and begin creating HTML elements
    .then(function(json) {

      //For each of the results, create a new table row
      json.forEach(function(result){
        var tr = document.createElement('tr')
        var td1 = document.createElement('td')
        var td2 = document.createElement('td')
        var td3 = document.createElement('td')
        var td4 = document.createElement('td')
        var td5 = document.createElement('td')

        var text1 = document.createTextNode(result.id)
        var text2 = document.createTextNode(result.film)
        var text3 = document.createTextNode(result.stars)
        var text4 = document.createTextNode(result.rating)
        var text5 = document.createTextNode(result.votes)

        td1.classList.add('id')
        td1.appendChild(text1)

        td2.classList.add('film')
        td2.appendChild(text2)

        td3.classList.add('stars')
        td3.appendChild(text3)

        td4.classList.add('rating')
        td4.appendChild(text4)

        td5.classList.add('votes')
        td5.appendChild(text5)

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)

        tableBody.appendChild(tr)
      })
    })
}
