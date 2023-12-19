
def parse_weather_data(data):
    temp = data['main']['temp']
    max_temp = data['main']['temp_max']
    min_temp = data['main']['temp_min']
            
    parsed_data = {
        "city": data['name'],
        "weather": data['weather'][0]['main'],
        "weather_icon": data['weather'][0]['icon'],
        "weather_description": data['weather'][0]['description'],
        "temperature": temp,
        "temperature_min": min_temp,
        "temperature_max": max_temp,
        "temperature_fahr": celsius_to_fahr(temp),
        "temperature_min_fahr": celsius_to_fahr(min_temp),
        "temperature_max_fahr": celsius_to_fahr(max_temp),
        "humidity": data['main']['humidity'],
        "feels_like": data['main']['feels_like'],
        "wind_deg": data['wind']['deg'],
        "wind_speed": data['wind']['speed'],
    }

    return parsed_data

def celsius_to_fahr(temperature):
    return temperature * 9 / 5 + 32
