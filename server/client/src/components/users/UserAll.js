import React, { Component } from 'react';

import UserCreate from './UserCreate';
import UserTable from './UserTable';

const UserAll = () => (
  <div className="container">
    <UserCreate />
    <UserTable />
  </div>
);

export default UserAll;
