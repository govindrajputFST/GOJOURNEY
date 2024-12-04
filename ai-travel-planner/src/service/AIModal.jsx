import {GoogleGenerativeAI} from "@google/generative-ai";
  
  const apiKey =import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
   export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget ,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I cannot access real-time information, including live hotel pricing, availability, images, and real-time ratings.  Therefore, I cannot provide URLs or images.  Furthermore, ticket pricing fluctuates constantly.  This JSON provides a *template* and example data you'll need to fill in using online travel agencies (like Booking.com, Expedia, Kayak) and Google Maps/Places.  Remember to check prices and availability before booking.\n\n```json\n{\n  \"trip\": {\n    \"location\": \"Las Vegas, Nevada\",\n    \"duration\": \"3 Days\",\n    \"travelers\": \"Couple\",\n    \"budget\": \"Cheap\"\n  },\n  \"hotels\": [\n    {\n      \"hotelName\": \"Hotel Name 1 (Example: Circus Circus)\",\n      \"hotelAddress\": \"Address 1 (Example: 2880 Las Vegas Blvd S, Las Vegas, NV 89109)\",\n      \"price\": \"$$$ (Replace with actual price range)\",\n      \"hotelImageUrl\": \"URL_TO_HOTEL_IMAGE_1\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1215,\n        \"longitude\": -115.1739\n      },\n      \"rating\": 3.5, \n      \"description\": \"Description of Hotel 1 (Example: Family-friendly hotel with a circus theme and affordable rooms.)\"\n    },\n    {\n      \"hotelName\": \"Hotel Name 2 (Example: Motel 8)\",\n      \"hotelAddress\": \"Address 2\",\n      \"price\": \"$$ (Replace with actual price range)\",\n      \"hotelImageUrl\": \"URL_TO_HOTEL_IMAGE_2\",\n      \"geoCoordinates\": {\n        \"latitude\": 0,\n        \"longitude\": 0\n      },\n      \"rating\": 3,\n      \"description\": \"Description of Hotel 2\"\n    },\n    {\n      \"hotelName\": \"Hotel Name 3 (Example: Budget-friendly option near the Strip)\",\n      \"hotelAddress\": \"Address 3\",\n      \"price\": \"$$ (Replace with actual price range)\",\n      \"hotelImageUrl\": \"URL_TO_HOTEL_IMAGE_3\",\n      \"geoCoordinates\": {\n        \"latitude\": 0,\n        \"longitude\": 0\n      },\n      \"rating\": 3.8,\n      \"description\": \"Description of Hotel 3\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"plan\": [\n        {\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"Free outdoor pedestrian mall with light shows and street performers.\",\n          \"placeImageUrl\": \"URL_TO_FREMONT_STREET_IMAGE\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1699,\n            \"longitude\": -115.1404\n          },\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.0,\n          \"timeTravel\": \"Evening (7:00 PM - 10:00 PM)\"\n        },\n          {\n          \"placeName\": \"Dinner at a cheap eatery on Fremont street\",\n          \"placeDetails\": \"Find affordable food options\",\n          \"placeImageUrl\": \"\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1699,\n            \"longitude\": -115.1404\n          },\n          \"ticketPricing\": \"10-20$\",\n          \"rating\": 4.0,\n          \"timeTravel\": \"8:00 PM\"\n        }\n      ]\n    },\n    \"day2\": {\n      \"plan\": [\n        {\n          \"placeName\": \"The Strip (walking)\",\n          \"placeDetails\": \"Walk the length of the Strip, admiring the hotels and atmosphere.\",\n          \"placeImageUrl\": \"URL_TO_STRIP_IMAGE\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1146,\n            \"longitude\": -115.1729\n          },\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5,\n          \"timeTravel\": \"Morning to Afternoon (9:00 AM - 4:00 PM)\"\n        },\n        {\n          \"placeName\": \"Bellagio Fountains\",\n          \"placeDetails\": \"Free water show outside the Bellagio hotel.\",\n          \"placeImageUrl\": \"URL_TO_BELLAGIO_FOUNTAINS_IMAGE\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1116,\n            \"longitude\": -115.1711\n          },\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.8,\n          \"timeTravel\": \"Afternoon (4:00 PM - 5:00 PM)\"\n        }\n      ]\n    },\n    \"day3\": {\n      \"plan\": [\n         {\n          \"placeName\": \"Seven Magic Mountains\",\n          \"placeDetails\": \"Colorful public art installation.  Requires transportation (Uber/Lyft recommended).\",\n          \"placeImageUrl\": \"URL_TO_SEVEN_MAGIC_MOUNTAINS_IMAGE\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.0398,\n            \"longitude\": -114.9345\n          },\n          \"ticketPricing\": \"Free to view from the road, parking fees may apply\",\n          \"rating\": 4.2,\n          \"timeTravel\": \"Morning (9:00 AM - 12:00 PM)\"\n        },\n        {\n          \"placeName\": \"Red Rock Canyon National Conservation Area (Optional, if time and transport allow)\",\n          \"placeDetails\": \"Hiking and scenic drives; entry fee applies.\",\n          \"placeImageUrl\": \"URL_TO_RED_ROCK_CANYON_IMAGE\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.2007,\n            \"longitude\": -115.7808\n          },\n          \"ticketPricing\": \"Entry fee applies (check the official website for current rates)\",\n          \"rating\": 4.5,\n          \"timeTravel\": \"Afternoon (1:00 PM - 5:00 PM)\"\n        }\n      ]\n    }\n  }\n}\n```\n\n\nRemember to replace the placeholder information with actual details found through your research.  Consider using public transportation (buses) to reduce transport costs. Pack snacks and water to save on food expenses. Look for free activities and shows to stay within your budget.  Have a fantastic trip!\n"},
          ],
        },
      ],
    });
  