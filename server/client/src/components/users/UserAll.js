import React from 'react';

import UserCreate from './UserCreate';
import UserTable from './UserTable';

const UserAll = () => (
  <div className="container default-table-font-size">
    <UserCreate />
    <div className="m-4"/>
    <UserTable />
  </div>
);

export default UserAll;
