function getAll() {
    $.get("http://localhost:3000/api/score")
        .done(function (data) {
            const scoreList = document.getElementById('score-list');
            scoreList.innerHTML = ''
            data.response.map(item => {
                const scoreItem = `
                <tr>
                    <th scope="row">${item.room}</th>
                    <td>${item.player}</td>
                    <td>${item.score}</td>
                </tr>
                `;
                scoreList.innerHTML += scoreItem;
            })
        })
        .fail(function (xhr, status, error) {
            alert(xhr.responseJSON.message);
        });
}