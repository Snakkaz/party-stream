import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VideoPlayer from './components/VideoPlayer';
import Chat from './components/Chat';
import RoomList from './components/RoomList';
import UserList from './components/UserList';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Synchronized Streaming Application</h1>
        <RoomList />
        <UserList />
        <Switch>
          <Route path="/video" component={VideoPlayer} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;