from requests import get

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .util import celsius_to_fahr, parse_weather_data

class GetWeather(APIView):
    def get(self, request, format=None):
        latitude = request.GET.get("latitude")
        longitude = request.GET.get("longitude")
        print(f"Latitude: {latitude}") 
        print(f"Longitude: {longitude}") 
        url = "https://weather-proxy.freecodecamp.rocks/api/current?lat={lat}&lon={lon}"
        try:
            response = get(url.format(lat=latitude, lon=longitude))
            weather_data = response.json()
            parsed_response = parse_weather_data(weather_data)

            return Response(parsed_response, status=status.HTTP_200_OK)
        except Exception as ex:
            print("Exception ocurred while trying to retireve weather info. Exception: ", ex)
            return Response({"Failed to retireve": "Failed to retrieve weather information."},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
