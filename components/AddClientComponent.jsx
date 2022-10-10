import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../app/stores/rootStore";
import { useContext, useState} from "react";
import { Form, Button } from "semantic-ui-react";

const AddClientComponent = () => {
  const rootStore = useContext(RootStoreContext);
  const { cancel, createUser } = rootStore.userStore;

  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setFormData(initialFormData);

      console.log(formData);
      createUser(formData);
    } catch {
      console.log("not working");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <h2 className="text-center">Add Client</h2>
      <br></br>
      <br></br>
      <div className="container" style={{ width: "45vw" }}>
        <Form onSubmit={handleSubmit} onReset={cancel} className="form">
          <div>
            <label> First Name</label>
            <input
            required
              placeholder="First Name"
              type="text"
              name="firstName"
              className="input"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
            required
              placeholder="Last Name" 
              type="text"
              name="lastName"
              className="input"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>E-mail</label>
            <input
             required
              placeholder="E Mail"
              type="email"
              name="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <br></br>
          <Button  type="submit" color="green">
            Submit
          </Button>
          <Button   type="reset" color="red">
            Cancel
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default observer(AddClientComponent);
