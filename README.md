# IP Address Tracker

Try it here: [IP Address Tracker](https://ip-address-tracker-redsync.netlify.app)

This project was created as a challenge from [FrontendMentor](https://www.frontendmentor.io/home) - [IP Address Tracker](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0).

## How to use?

In the input field at the top of a screen you can enter a valid IP address or a domain and the map will show you current location and some more info about that IP address or a domain (which is also an IP address converted to a easy readable string using DNS protocol)

## How it works?

I've used [IP-API](https://ip-api.com/) to fetch information about certain IP address and then display it on a map provided by [Leaflet](https://leafletjs.com/)

## Used technologies:

For this project I used [React](https://reactjs.org/) w/ [TailwindCSS](https://tailwindcss.com/). It was an overkill to use React but I wanted to practice. There is a state folder for managing global state but it's empty (That's just my standard template for React Apps)

### React

Creating Single Page Application (SPA) with React is pretty simple now that React team made a toolchain "create-react-app". You can just run (assuming you have Node >= 14.0.0. and npm >= 5.6)

```bash
npx create-react-app
```

in your folder path and in a couple of seconds you have a running React App.

### Tailwind

According to official [Tailwind Documentation](https://tailwindcss.com/docs) - Tailwind is "a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup."
Tailwind works perfectly with React because you can style your components in the same file you write their JSX markup.

Setting up Tailwind for React projects can be found at [https://tailwindcss.com/docs/guides/create-react-app](https://tailwindcss.com/docs/guides/create-react-app)

### TypeScript

As we can read on [official Typescript page](https://www.typescriptlang.org/), TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. React has a great TypeScript support an once you get used to it, it provides a much better development experience.

## What Have I Learned?

In this section you can read in more details about packages I've used and what have I learned from this project. This project wasn't very complicated and I sure didn't need to use a React or any other framework to make myself easier. Hardest part was working with react-leaflet and styling the app for bot mobile and desktop.

### 3.1. Working with Leaflet (React Leaflet)

To make React work with leaflet firstly you have to add:

```jsx
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
  integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
  crossorigin=""
/>
```

inside of a <head></head> elemenet in your index.html file.
After we made those changes we can start working on a Map.tsx component. This component receives ipAddress trough props and positions the map marker to latitude and longitude position available inside ipAddress object.

### Fetching IP data

Fetching IP data from an API endpoint in this example wasn't complex. First we want to register the value of an input field. In this example we don't have some complex form that needs validation, and the app is small so there is no need for useEffect() hook with a cleanup function to watching for a state change inside input field.
If we split the application components and render them in App.tsx like:

```jsx
<Header onSearch={onSearchHandler} />
<Informations ipAddress={ipAddress} isLoading={isLoading} />
<Map ipAddress={ipAddress} />
```

then we can get the ipAddress object directly in a App.tsx . First we need to construct the onSearchHandler function which will look something like:

```jsx
const [ipAddress, setIpAddress] =
  (useState < IPAddressInterface) | (undefined > undefined);
const [isLoading, setIsLoading] = useState < boolean > false;

const onSearchHandler = async (input: string) => {
  setIsLoading(true);
  try {
    // if there is no IP address in input field
    if (input === "") {
      throw new Error("No Entry Data");
    }
    // API Request for IP address
    const response = await axios.get(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${ipKey}&domain=${input}&ipAddress=${input}`
    );
    // Setting up IP Address if API responded with "success"
    setIpAddress(response.data);
    // passing ipAddress to parent
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};
```

We can expect to get an input from a state inside of a Header.tsx component, and on a form submit we can call onSearch(input)
