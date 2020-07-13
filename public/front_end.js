
document.getElementById('submit-button').addEventListener("click", () => {  
    console.log('button has been clicked!');  
    if('geolocation' in navigator){
        console.log('we can track you!');
        //get data user entered into the text field
        let term = document.getElementById('input-box').value;
        //
        let cost =document.querySelector('input[name="price"]:checked').value;

        let radius = document.querySelector('input[name="radius"]:checked').value;

        let a  = document.getElementById("sort-select");
        let sort = a.options[a.selectedIndex].value;
        
        console.log(radius);
        console.log(cost); 
        console.log(term);
        navigator.geolocation.getCurrentPosition(async position =>{
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            //data object we are passing to the backend
            const data = {
                lat,
                lon,
                term,
                cost,
                radius,
                sort
            };

            //(object) second parameter of fetch that allows you to change settings
            const options = {
                method: 'POST', //post, we are sending data to server
                headers: {
                    'Content-Type': 'application/json'
                },
                
                body: JSON.stringify(data) //data contains the info we are sending to server
            };
            //fetch can also send data
            //fetch sends data to server, also recieves data. Recived data is in response
            const response = await fetch('/api', options);
            
            const jsonData = await response.json();
            //console.log(jsonData);
            //console.log(jsonData.body);
            for(let i = 0; i < 5; i++){
                console.log(jsonData.jsonBody.businesses[i].name);
            }
            
            let addResult = document.getElementById('node');
            addResult.innerHTML = '<h1>Results</h1>';
            let listOfItems = document.getElementsByClassName('list-results');
           // console.log(listOfItems);
            for(let i = 0; i < 5; i++){
                let restrauant = {
                    name: jsonData.jsonBody.businesses[i].name,
                    phone: jsonData.jsonBody.businesses[i].phone,
                    address:jsonData.jsonBody.businesses[i].location.address1,
                    pic: jsonData.jsonBody.businesses[i].image_url,
                    rating: jsonData.jsonBody.businesses[i].rating
                }
                /*
                let name = jsonData.jsonBody.businesses[i].name;
                let phone = jsonData.jsonBody.businesses[i].phone;
                let address = jsonData.jsonBody.businesses[i].location.address1;
                let pic = jsonData.jsonBody.businesses[i].image_url;
                let rating = jsonData.jsonBody.businesses[i].rating;
                */
                //create HTML
                listOfItems[i].innerHTML = '<div class="eachBox"><h2>' + restrauant.name + '</h2><h3>' + restrauant.phone + '</h3><h3>' + restrauant.address + '</h3></div>';
            }
            console.dir(document);
        });
    }
    else{
        console.log('where are you at?');
    }
});

function createResult(){
    return(
        '<div></div>'
    );
}