document.querySelector('.search').addEventListener('submit', async (e)=> {
    e.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== '') {
        showWarning('Loading...')

        let url = encodeURI(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=ae315984531efb032909a6b80a32b31d&units=metric&lang=en`);

        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon:json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        }else{
            clearInfo();
            showWarning('City not found...')
        }
    }else{
        clearInfo();
    }
});

const showWarning = (msg)=>{
    document.querySelector('.aviso').innerHTML = msg;
}

const showInfo = (json) => {
    showWarning('');

    document.querySelector('.title').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp.toFixed(0)} <sup>ºC</sup>`;
    document.querySelector('.windInfo').innerHTML = `${json.windSpeed.toFixed(2)} <span>km/h</span>`;
    
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.windDirection').style.transform = `rotate(${json.windAngle - 90}deg)`
    
    document.querySelector('.result').style.display = 'block';
}

const clearInfo = ()=>{
    showWarning('');
    document.querySelector('.result').style.display = 'none';
} ;