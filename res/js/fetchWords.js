var words

fetch('words.json')
    .then(res => res.text())
    .then(json_text => JSON.parse(json_text))
    .then(json_data => {
        words = json_data;
    })