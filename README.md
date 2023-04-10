# Weather.io-V1
Created with CodeSandbox


This is an online weather app that allows you to input your desired location, day of the week, and time of day and it will show you weather forecast data from WeatherAPI.

NOTES:

- Defaults on initial load to London, Fridays, Afternoons

- WeatherAPI only allows 10 days of forecast data (my free trial key will expire soon as well)

FURTHER IMPLEMENTATIONS:

- set up a database (DBeaver?)

- mutations and query instead of useStates to store and fetch from database

- auth -> validate against user and pass stored in database which reroutes to weather information based on stored settings of city, day, and time of day

- use react-location-picker instead of text input to validate city (it had like a thousand dependencies that I could not force codesandbox free to accept for some reason)

- pagination or infinite scroll for case of a getting a lot of data

- help page route.push(/help) and copywriting 

- could get some enums going to clean up the code comparisons and filters

- Could make the UI more responsive to different large screen sizes (text overflow, better thumbnail design, etc)

- Implement more custom line graph UI 
