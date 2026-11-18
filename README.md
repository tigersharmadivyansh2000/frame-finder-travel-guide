# PhotoSpot AI

Build an AI-native web app called “PhotoSpot AI”.

Purpose:

Help travelers and photographers discover the best photo locations in any city with personalized photography recommendations.

Target users:

Travel photographers, content creators, casual travelers, and smartphone photographers.

Core Features (MVP only):

1. Search any city or location

2. Show top photography spots in beautiful cards

3. Each spot should include:

   - Spot name

   - Why it’s photogenic

   - Best time to visit (sunrise, sunset, blue hour, night)

   - Crowd level (Low/Medium/High)

   - Photography tips

   - Recommended focal length/lens

   - Suggested camera settings

   - Shot ideas (wide, portrait, cinematic, street)

4. Add “hidden gems” section

5. Save favorite spots

6. Generate a 1-day photography itinerary

AI Personalization:

Before showing recommendations, ask:

- Camera type (Phone / Fujifilm / Sony / Canon / DJI / Other)

- Skill level (Beginner / Intermediate / Pro)

- Photography style (Street / Travel / Portrait / Landscape / Cinematic)

UI/UX:

- Premium cinematic design

- Dark mode default

- Travel photography aesthetic

- Mobile-first responsive design

- Apple-level clean UI

- Card-based layout

- Map view + list view

Pages:

1. Home page

2. Search results page

3. Saved spots page

4. Photography itinerary page

Include mock sample data for cities like Tokyo, Kyoto, Hanoi, Da Nang, Bengaluru, and Bali.

Tech:

Use Supabase for auth and saving favorites.

Prepare architecture for future API integration (Google Maps, weather, AI recommendations).

Important:

Keep version 1 simple and polished instead of feature-heavy.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0d33a118-67a2-4a94-8bbb-03f5a5c86994).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
