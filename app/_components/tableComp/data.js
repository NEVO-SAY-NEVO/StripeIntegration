import React from "react";
const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "FULLNAME", uid: "fullName", sortable: true},
  {name: "EMAIL", uid: "email", sortable: true},
  {name: "HOMEWORK", uid: "homework", sortable: true},
  {name: "DESCRIPTION", uid: "description", sortable: true},
  {name: "DUEDATE", uid: "duedate"},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "IDLE", uid: "idle"},
  {name: "FIN", uid: "fin"},
  {name: "NA", uid: "na"},
];

const users = [
  {
    id: "64f83862ba1586516e176252",
    fullname: "William Badgett",
    email: "WilliamRBadgett@hotmail.com",
    homework: "Essay",
    description: "500-800 Words",
    duedate: "2023-09-09T00:00:00.000Z",
    status: 'IDLE',
    paid: true,
    createdAt: "2023-09-06T08:29:22.414Z",
    updateAt: "2023-09-06T08:29:22.414Z",
    priority: true
  },
  {
    id: "64f83862ba1586516e176253",
    fullname: "Jhon Doe",
    email: "JhonDoe@hotmail.com",
    homework: "Math",
    description: "800-1000 Words",
    duedate: "2023-09-09T00:00:00.000Z",
    status: 'FIN',
    paid: "TRUE",
    createdAt: "2023-09-06T08:29:22.414Z",
    updateAt: "2023-09-06T08:29:22.414Z",
    priority: true
  },
];

export {columns, users, statusOptions};
