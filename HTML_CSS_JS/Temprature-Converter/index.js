function Fahrenheit_to_Celsius(val){
    return (val-32)/1.8;
}
function Fahrenheit_to_Kelvin(val){
    return ((val-32)/1.8)+273.15;
}
function Celsius_to_Fahrenheit(val){
    return (val*1.8)+32;
}
function Celsius_to_Kelvin(val){
    return val+273.15;
}
function Kelvin_to_Celsius(val){
    return val-273.15;
}
function Kelvin_to_Fahrenheit(val){
    return ((val-273.15)*1.8)+32;
}

function calculate(){
    var val = parseFloat( document.querySelector("#num").value );

    if(isNaN(val)){
        document.querySelector("#ans").innerHTML = "0.0" ;
        return;
    }

    var temp1 = document.querySelector("#temp1").value;
    var temp2 = document.querySelector("#temp2").value;

    if( temp1 == temp2 ){
        document.querySelector("#ans").innerHTML = val.toFixed(3);
        return;
    }

    var ans=0.0;
    if(temp1 == "Fahrenheit" && temp2 == "Celsius"){
        ans = Fahrenheit_to_Celsius(val);
    }
    else if(temp1 == "Fahrenheit" && temp2 == "Kelvin"){
        ans = Fahrenheit_to_Kelvin(val);
    }
    else if(temp1 == "Celsius" && temp2 == "Fahrenheit"){
        ans = Celsius_to_Fahrenheit(val);
    }
    else if(temp1 == "Celsius" && temp2 == "Kelvin"){
        ans = Celsius_to_Kelvin(val);
    }
    else if(temp1 == "Kelvin" && temp2 == "Celsius"){
        ans = Kelvin_to_Celsius(val);
    }
    else if(temp1 == "Kelvin" && temp2 == "Fahrenheit"){
        ans = Kelvin_to_Fahrenheit(val);
    }
    document.querySelector("#ans").innerHTML = ans.toFixed(3) ;
}

