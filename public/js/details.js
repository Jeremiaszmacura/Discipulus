const trashcan = document.querySelector('a.delete');
trashcan.addEventListener('click', () => {
    const endpoint = `/exams/${trashcan.dataset.doc}`;
    fetch(endpoint, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => window.location.href = data.redirect)
        .catch(err => console.log(err));
});


const trashcan_question = document.querySelector('a.delete-question');
trashcan_question.addEventListener('click', () => {
    console.log('hi')
    const endpoint = `/exams/question/${trashcan_question.dataset.doc}`;
    fetch(endpoint, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => window.location.href = data.redirect)
        .catch(err => console.log(err));
});
