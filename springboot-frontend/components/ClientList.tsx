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
  SegmentInline,
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
    clickUpdate,
    getClientById,
    clickAdd,
    deleteClient,
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

  const { adminLogin, userData } = rootStore.adminStore;

  useEffect(() => {
    listele(pageNo, sort);
  }, [userRegistry]);

  const [open, setOpen] = useState(false);
  const show = () => {
    setOpen(true);
  };
  const handleConfirm = () => setOpen(false);
  const handleCancel = () => setOpen(false);

  return (
    <div className="container" >
      <br></br>
      <br></br>
      <br></br>
     <div>
      <Statistic size="mini" color="blue">
        <Statistic.Value>{userCount}</Statistic.Value>
        <Statistic.Label>Users</Statistic.Label>
      </Statistic>
      {<SearchBarComponent />}
      </div>
     <div style={{"overflowX":"auto",textAlign: "left"}} >
      <table className="table table-striped table-bordered table-condensed table-sm">
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
            <th style={{ width: "20vw" }}> Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.map((i, k) => (
              <tr key={k}>
                <td> {i.firstName} </td>
                <td> {i.lastName}</td>
                <td> {i.email}</td>
                <td>
                  <Button color="teal" onClick={() => clickUpdate(i.id)}>
                    Update{" "}
                  </Button>
                  <Button onClick={() => getClientById(i.id)} color="olive">
                    View{" "}
                  </Button>
                  <Button
                    onClick={
                      show
                      // () =>  deleteClient(i.id)
                    }
                    color="red"
                  >
                    Delete{" "}
                  </Button>
                  <div className="height:10px">
                    <Confirm
                      open={open}
                      onCancel={handleCancel}
                      onConfirm={handleConfirm}
                      size="tiny"
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      </div>
      <div style={{ "display": "flex","justifyContent":"space-between"}}>
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
        <Button
          onClick={() => clickAdd()}
          color="blue"
          // style={{ marginLeft: "60vw" }}
        >
          Add Client{" "}
        </Button>
      </div>
    </div>
  );
};
export default observer(ClientList);
