if (document.querySelector('#upload')) {
  document.querySelector('#upload').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = document.getElementById('upload');
    const doc = new FormData(form);

    axios.post('/docs/upload', doc)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(`error: ${err}`);
        }, 3000);
  });
}
