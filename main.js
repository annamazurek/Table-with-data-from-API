const container = document.querySelector('.container');

fetch('http://rt.ex7.pl/get-data', {method: 'POST'})  
  .then(res => res.json())
  .then(res => {
    const data = Array.from(res.map(response => {
      // console.log(response.acronym)
      return (
        `<tr>
          <td>${response.id}</td>
          <td>${response.acronym}</td>
          <td>${response.name}</td>
        </tr>`
      )
    })).join('');

    container.innerHTML = `
      <table>
          <tr class="row">
            <th scope="col">Id</th>
            <th scope="col">Acronym</th>
            <th scope="col">Name</th>
          </tr>
          ${data}
      </table>
    `
  });

// console.log(container.textContent)