import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Home,
  Agents,
  Listings,
  Login,
  Signup,
  Forgot,
  Agentt,
  Listing,
  Dashboard,
  UserProfile,
  Messages,
  Password,
  AddLisiting,
  AdminListingList,
  AdminAgentsList,
  AgentListing,
} from "./pages";

import firebase, { auth, firestore } from "./firebaseConfig";
import withFirebaseAuth from "react-with-firebase-auth";

const App = ({
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  user,
  error,
  loading,
}) => {
  const authGuard = {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    user,
    error,
    loading,
  };
  return (
    <Router>
      <Switch>
        <Route exact path="/" children={<Home {...authGuard} />} />
        <Route exact path="/listing" children={<Listings {...authGuard} />} />
        <Route exact path="/agent/:id" children={<Agentt {...authGuard} />} />
        <Route
          exact
          path="/property/:id"
          children={<Listing {...authGuard} />}
        />
        <Route exact path="/login" children={<Login {...authGuard} />} />
        <Route exact path="/signup" children={<Signup {...authGuard} />} />
        <Route
          exact
          path="/forgot-password"
          children={<Forgot {...authGuard} />}
        />
        <Route
          exact
          path="/dashboard"
          children={<Dashboard {...authGuard} />}
        />
        <Route
          exact
          path="/profile"
          children={<UserProfile {...authGuard} />}
        />
        <Route exact path="/messages" children={<Messages {...authGuard} />} />
        <Route
          exact
          path="/change-password"
          children={<Password {...authGuard} />}
        />
        <Route
          path="/add-listing/:id?"
          children={<AddLisiting {...authGuard} />}
        />
        <Route
          exact
          path="/all-listing"
          children={<AdminListingList {...authGuard} />}
        />
        <Route
          exact
          path="/all-agents"
          children={<AdminAgentsList {...authGuard} />}
        />
        <Route
          exact
          path="/mylisting"
          children={<AgentListing {...authGuard} />}
        />
      </Switch>
    </Router>
  );
};

const firebaseAppAuth = firebase.auth();

export default withFirebaseAuth({ firebaseAppAuth })(App);
