import React, { useEffect, useMemo, useState } from "react";
import { RootStoreContext } from "../app/stores/rootStore";
import SearchBarComponent from "./SearchBarComponent";
import { observer } from "mobx-react-lite";
import {
  Button,
  Confirm,
  Container,
  Pagination,
  PaginationProps,
  Statistic,
} from "semantic-ui-react";
import { useContext } from "react";
import { number } from "yup";
import { allowStateChanges } from "mobx/dist/internal";
import { useReducer } from "react";

const ClientList = () => {
  const rootStore = useContext(RootStoreContext);

  const {
    listUser,
    user,

    listele,
    totalPages,
    userRegistry,
    pageNo,
    handlePage,
    userCount,
    sort,
    handleLastNameClick,
    handleFirstNameClick,
  } = rootStore.userStore;

  useEffect(() => {
    listele(pageNo, sort);
  }, [userRegistry]);

  return (
    <div className="container">
      <br></br>
      <br></br>
      <br></br>
        <h1 className="text-center">Client List</h1>
        
        <div className="row">
          <div style={{ textAlign: "left" }}>
            <Statistic size="mini" color="blue">
              <Statistic.Value>{userCount}</Statistic.Value>
              <Statistic.Label>Users</Statistic.Label>
            </Statistic>
          </div>
          {<SearchBarComponent />}
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>
                  <Button
                    icon="sort alphabet up"
                    size="mini"
                    onClick={handleFirstNameClick}
                  />
                  {"  "} Client First Name
                </th>
                <th>
                  <Button
                    icon="sort alphabet up"
                    size="mini"
                    onClick={handleLastNameClick}
                  />
                  {"  "} Client Last Name
                </th>
                <th> Client Email </th>
              </tr>
            </thead>
            <tbody>
              {listUser &&
                listUser.map((i, k) => (
                  <tr key={k}>
                    <td> {i.firstName} </td>
                    <td> {i.lastName}</td>
                    <td> {i.email}</td>

                  </tr>
                ))}
            </tbody>
          </table>
          <div>
            <Pagination
              boundaryRange={0}
              defaultActivePage={1}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              siblingRange={1}
              totalPages={totalPages}
              onPageChange={handlePage}
            />
          </div>
        </div>

    </div>
  );
};
export default observer(ClientList);
