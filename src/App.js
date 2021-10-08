import React from 'react'
import ApiData from "./Component/Data/ApiData";
import "./style.css";
import { useState } from "react";
import Serbia from "./Component/Serbia/Serbia";
import Alaska from "./Component/Alaska/Alaska"
import Alabama from "./Component/Alabama/Alabama";

function App() {

    const [dropDown, setDropDown] = useState(false);
    const [deleteOptions, setDeleteOptions] = useState(false);
    const [Data, setData] = useState(ApiData);
    const [search, setSearch] = useState("");


    const searchData = (e) => {
        setSearch(e.target.value);
        if (e.target.value.length > 0) {
            setDropDown(true);
            setDeleteOptions(true);
        } else {
            setData(ApiData);
            setDeleteOptions(false);
        }
        const newData = Data.filter(el => el.name.toLowerCase().includes(search.toLowerCase()));

        if (e.target.value === '') {
            setData(ApiData);
        } else {
            setData(newData);
        }
    }

    const [allOptions, setAllOptions] = useState([]);
    const [allSearch, setAllSearch] = useState([]);

    const selectValue = (e) => {
        let value = e.target.id;
        let exist = allOptions.find(x => x == value);
        let exist2 = allSearch.find(x => x == value);
        if (!exist) {
            setAllOptions([...allOptions, value]);
        }
        if (!exist2) {
            setAllSearch([...allSearch, value]);
        }
    }

    console.log(allSearch);

    const delteSearchInput = () => {
        document.querySelector("#search").value = "";
        setData(ApiData);
        setDeleteOptions(false);
    }

    const removeSelectValue = (e) => {
        let filter = allOptions.filter(x => x !== e.target.id);
        setAllOptions(filter);
    }



    return (
        <>
            <div className="app">
                <div className="search"><div id="search_div"></div>
                    <div className={dropDown === false ? "down" : "up"} onClick={() => { setDropDown(!dropDown) }}><span>></span></div>
                    <div className={deleteOptions === true ? "delete" : "non_delete"} onClick={delteSearchInput}>X</div>
                    <div className="allOption">
                        {allOptions.map(x => <div key={x} className="selectOption">{x} <div id={x} className="closeSelectOption" onClick={removeSelectValue}>X</div></div>)}
                        <input id="search" type="text" placeholder="Search..." onChange={searchData}></input>
                    </div>
                </div>
                <div className={dropDown === true ? "openDrop" : "closeDrop"}>
                    <div className="allSearch">{allSearch.map(x => <span key={x} id={x} className="searchOption" onClick={selectValue}>{x}</span>)}</div>
                    {Data.map(x => <span key={x.name} id={x.name} className="option" onClick={selectValue}>{x.name}</span>)}
                </div>
            </div>
            {allOptions.find(x => x == "Serbia") ? <Serbia /> : null}
            {allOptions.find(x => x == "Alaska") ? <Alaska /> : null}
            {allOptions.find(x => x == "Alabama") ? <Alabama /> : null}
        </>
    )
}

export default App
