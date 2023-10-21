async function handleFormSubmission(e) {
    e.preventDefault(); // Prevent the form from submitting normally.

    // Capture the form input values.
    const gameTitle = document.getElementById("gameTitle").value;
    const userName = document.getElementById("userName").value;
    const userURL = document.getElementById("link").value;

    let shortenedURL;

    // Use a null value for the link if the user didn't provide one.
    const urlToSend = userURL || null;

    console.log(gameTitle);
    console.log(userName);
    console.log(urlToSend);

    try {
        if (urlToSend !== null) {
            const url = 'https://url-shortener-service.p.rapidapi.com/shorten';
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-RapidAPI-Key': '4099ab78f2msh0eb22cfce6cef26p1cbbd7jsn21da45057ae1',
                    'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
                },
                body: new URLSearchParams({
                    url: urlToSend
                })
            };

            const response = await fetch(url, options);
            const result = await response.json();
            shortenedURL = result.result_url;
            console.log(shortenedURL);

            if (shortenedURL === undefined) {
                const errDiv = document.getElementById("error");
                const errLabel = document.createElement("label");
                errLabel.className = "errLabel"
                errLabel.innerHTML = "Write a full link, e.g., https://Youtube.com";
                errDiv.appendChild(errLabel);
            }
        }
        // Send the data to the PHP script
        const data = {
            gameTitle: gameTitle,
            userName: userName,
            link: shortenedURL || null
        };

        const phpResponse = await fetch('../php/Suggest.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (phpResponse.ok) {
            const result = await phpResponse.text();
            console.log(result);

            if(result == "Data inserted successfully.") {
                const errDiv = document.getElementById("error");
                const sucLabel = document.createElement("label");
                sucLabel.className = "sucLabel"
                sucLabel.innerHTML = "Suggestion submitted!";
                errDiv.appendChild(sucLabel);
            }

        } else {
            console.error('Failed to insert data into the database.');
        }

    } catch (error) {
        console.error(error);
    }

    return false;
}

// Add an event listener to the form to call the handleFormSubmission function when the form is submitted.
document.getElementById("suggestionForm").addEventListener("submit", handleFormSubmission);
