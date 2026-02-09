var input_length_box;
var input_box;
var output_area;

window.onload = function () {
    input_length_box = document.querySelector("#input_length");
    input_box = document.querySelector("#input_box");
    output_area = document.querySelector("#output_area");
}

function input_changed_in_input_box() {
    input_length_box.innerHTML = input_box.value.length;
}

function add_table(data){

    var overall_score;

    if(data["Polarity Score"] < 0){
      overall_score = "Negative 🟥";
    }
    else if(data["Polarity Score"] == 0 ){
      overall_score = "Neutral 🟦";
    }
    else{
      overall_score = "Positive 🟩";
    }

    output_area.innerHTML = `
    <br> <br>
    <center>
    <br>
    <table class="tg">
      <thead>
        <tr style='border-top-left-radius: 12px;border-top-right-radius: 12px;' >
          <th class="tg-rsib" colspan="2">RESULT</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="tg-dgvj">Sentiment</td>
          <td id="overall_score" class="tg-4m8a">${overall_score}</td>
        </tr>
        <tr>
          <td class="tg-dgvj">Positive Score</td>
          <td id="positive_score" class="tg-4m8a">${data["Positive Score"] }</td>
        </tr>
        <tr>
          <td class="tg-dgvj">Negative Score</td>
          <td id="negative_score" class="tg-4m8a">${data["Negative Score"]}</td>
        </tr>
        <tr>
          <td class="tg-dgvj">Polarity Score</td>
          <td id="polarity_score" class="tg-4m8a">${data["Polarity Score"] }</td>
        </tr>
        <tr>
          <td class="tg-dgvj">Subjectivity Score</td>
          <td id="subjectivity_score" class="tg-4m8a">${data["Subjectivity Score"] }</td>
        </tr>
        <tr>
          <td class="tg-dgvj">Average sentence length</td>
          <td id="average_sentence_length" class="tg-4m8a">${data["Average sentence length"] }</td>
        </tr>
        <tr>
          <td class="tg-dgvj">Number of complex words</td>
          <td id="number_of_complex_words" class="tg-4m8a">${data["Number of Complex Words"] }</td>
        </tr>
        <tr>
          <td class="tg-dgvj">Percentage of complex words</td>
          <td id="percentage_of_complex_words" class="tg-4m8a">${data["Percentage of Complex Words"] }</td>
        </tr>
        <tr>
          <td class="tg-dgvj">Fog Index</td>
          <td id="fog_index" class="tg-4m8a">${data["Fog Index"] }</td>
        </tr>
        <tr>
          <td class="tg-dgvj">Average word length</td>
          <td id="average_word_length" class="tg-4m8a">${data["Average word length"] }</td>
        </tr>
        <tr>
          <td class="tg-dgvj">Total words analyzed</td>
          <td id="total_words_analyzed" class="tg-4m8a">${data["Total words Analyzed"] }</td>
        </tr>
        <tr style='border-bottom-left-radius: 12px;border-bottom-right-radius: 12px;' >
          <td class="tg-dgvj">Unidentified words</td>
          <td id="unidentified_words" class="tg-4m8a">${data["Unidentified words"] }</td>
        </tr>
      </tbody>
    </table>
    </center>
    `
}

function done_clicked() {
    output_area.innerHTML = "<br> <br> <center> <div style='font-family:ackno;font-size:x-large;'>Wait...</div> </center>";
    var input_string = input_box.value;
    if (input_string.length > 2000) {
        alert("Cannot analyse text with length more than 2000 characters.");
        return;
    }
    if (input_string.length < 3) {
        alert("Length of entered text is very small...");
        return;
    }
    try {
        fetch(`https://sentimentanalyzer.vercel.app/analyze?text=${input_string}`)
        .then(response => response.json())
        .then(data => add_table(data));
    }
    catch(error){
        alert("Something went wrong : "+error);
    }
}