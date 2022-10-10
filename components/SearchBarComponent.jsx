 
import { useState,useContext} from "react";
import { RootStoreContext } from '../app/stores/rootStore';
import {GrAlert, GrSearch } from "react-icons/gr";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";

const SearchBarComponent = () => {
const[params,setParams]=useState([""]); 
const rootStore = useContext(RootStoreContext);
const { searchClients} = rootStore.userStore; 

const handleClick=()=>{
    
    if(params.length>0 ){
        if(!/[^a-zA-Z]/.test(params))
        searchClients(params)
        else
        alert("Parameter should contains only alphabetical characters")
    }else
    alert("Parameter can not be empty")
}
return(
    <div style={{
       "display": "flex", 
    "justify-content": "flex-end"}}>
        <input required
        
        placeholder="Search for clients"
        value={params}
        onChange={(e)=>setParams(e.target.value)}/>
        <Button    color="teal"  size="mini" circular 
          onClick={handleClick}>
        <GrSearch  size={"15px"} />
        </Button>
    </div>
);
}
export default observer(SearchBarComponent);