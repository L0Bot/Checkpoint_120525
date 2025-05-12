import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PageLayout } from "./components/Layout";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import CountriesPage from "./pages/countries";
import HomePage from "./pages/home";
import CountryDetailPage from "./pages/country/CountryDetail";

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
  credentials: "same-origin",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route Component={PageLayout}>
            <Route path="/" Component={HomePage} />
            <Route path="countries" Component={CountriesPage} />
            <Route path="countries/:code" Component={CountryDetailPage} />
            <Route path="*" Component={() => <Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
