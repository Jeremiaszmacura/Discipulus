console.log("delete");
const trashcan = document.querySelector('a.delete');
trashcan.addEventListener('click', (e) => {
    console.log("hi");
    const endpoint = `/exams/${trashcan.dataset.doc}`;
    fetch(endpoint, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => window.location.href = data.redirect)
        .catch(err => console.log(err));
});