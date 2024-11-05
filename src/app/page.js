// "use client"; 

// // server-side-rendered component: app tells server client wants 
// // to render some data --> sends HTML response (static information)
// // can send HTML and data back all at once really fast (text-data; super small super efficient)
// // nextjs uses server-side which is why you need to tell it we're making client-side-server component

// // client-side-rendered component: app is deciding what changes are and 
// // rendering info (doesn't need page from server, might need data)

// import { useState } from "react"; 

// // TODO
// // - add button
// // - function to fetch data
// // - function to add data to state
// // - display data 
// // - function to clear data 
// // - component for empty state [DONE]
// // - component for data state [DONE]
// // - error handling if the data doesn't come back (bonus)
// // - add responsiveness 

// export default function Home() {
//   // if useState !null, probably fetching or loading data, or have data
//   // if useState ==== data, we can display our data 
//   const [astronomyData, setAstronomyData] = useState(null);
//   const [loading, setLoading] = useState(null); 

//   async function fetchAstronomyData() {
//     // build the function that grabs data
//   }

//   const DisplayAstronomyData = () => {
//     // display if we have data 
//     // loading state (maybe data?)
//     // fulfilled state (data exists)
//     // empty state (!data)
//     return (<div>Empty, no data fetched!</div>)
//   }

//   const Header = () => {
//     // build the UI that grabs data
//     // need to add return statement if more than one line for an arrow function
//     return (
//       <header>
//         Welcome to my Midterm Prep
//         <br />
//         <button className="border-white border-solid border-2 p-2">Fetch stuff!</button>
//       </header>
//       ); 
//   }; 

//   return (
//     <div className="m-8">
//       <Header /> 
//       <DisplayAstronomyData />
//     </div>
//   ); 
// }

"use client"; 

// server-side-rendered component: app tells server client wants 
// to render some data --> sends HTML response (static information)
// can send HTML and data back all at once really fast (text-data; super small super efficient)
// nextjs uses server-side which is why you need to tell it we're making client-side-server component

// client-side-rendered component: app is deciding what changes are and 
// rendering info (doesn't need page from server, might need data)

import { useState } from "react"; 

// TODO
// - add button
// - function to fetch data
// - function to add data to state
// - display data 
// - function to clear data 
// - component for empty state
// - component for data state 
// - error handling if the data doesn't come back (bonus)
// - add responsiveness 

export default function Home() {
  // if useState !null, probably fetching or loading data, or have data
  // if useState ==== data, we can display our data 
  const [astronomyData, setAstronomyData] = useState(null);
  const [loading, setLoading] = useState(null); 

  async function fetchAstronomyData() {
    // build the function that grabs data
    // await is used because it's not instant; getting from server so pause to get result first
    setLoading(true); 
    const response = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5"); 

    // await because response.json takes a second to parse info
    const data = await response.json(); 

    setAstronomyData(data); 
    setLoading(false); 
  }

  const DisplayAstronomyData = () => {
    // display if we have data 
    // loading state (maybe data?)
    // fulfilled state (data exists)
    // empty state (!data)
    if (loading) return <div>Loading!</div>; 
    
    if (astronomyData) {
      const formattedData = JSON.stringify(astronomyData); 
      const dataThatIsFormattedForDisplay = []; 
      astronomyData.forEach((entry, i) => {
        dataThatIsFormattedForDisplay.push(
        <article key={i}>
          <img src={entry.url}></img>
          <h3>{entry.title}</h3>
          <p>{entry.explanation}</p>
        </article>
        ); 
      }); 

      return <section>{dataThatIsFormattedForDisplay}</section>
    }

    return <div>No data fetched yet!</div>

  }; 

  const Header = () => {
    // build the UI that grabs data
    // need to add return statement if more than one line for an arrow function
    return (
      <header>
        Welcome to my Midterm Prep
        <br />
        <button 
          disabled={loading}
          onClick={fetchAstronomyData}
          className="border-rose-700 border-solid border-2 p-2"
        >
          🚀 {loading? 'Fetching...' : 'Fetch Stuff!'} 
        </button>
      </header>
      ); 
  }; 

  return (
    <div className="m-8">
      <Header /> 
      <DisplayAstronomyData />
    </div>
  ); 
}
