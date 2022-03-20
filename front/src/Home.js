import React, { useState, useEffect } from "react"
import axios from 'axios'
import './App.css';

const Home = () => {
    const [data, setData] = useState([]);
    const [etat, setEtat] = useState(0)
    const [updateJeton, setUpdatejeton] = useState(false)
    const [addJeton, setAddJeton] = useState(false);
    const [selectedItem, setSelectedItem] = useState();


    useEffect(() => {
        axios.get("http://localhost:3001/contact").then((res) => {
            setData(res.data)
        })
    }, [etat]);

    const [contactName, setContactName] = useState("");
    const [contactNumber, setContactNumber] = useState();
    const [contactDescription, setContactDescription] = useState({});
    const [contactImage, setContactImage] = useState("");
    const [search, setSearch] = useState();




    const createContact = () => {
        const formData = new FormData()
        formData.append('contactImage', contactImage)
        axios.post("http://localhost:3001/contact/insert",
            { contactName, contactNumber, contactDescription, contactImage })
            .then((res) => {
                setEtat(res)
                console.log(contactName + contactNumber + contactDescription + contactImage)
                reset()
                setEtat(res)
            })

    }

    const updateContact = (item) => {
        setUpdatejeton(true)
        setSelectedItem(item)
        setContactName(item.contactName)
        setContactNumber(item.contactNumber)
        setContactDescription(item.contactDescription)
    }

    const update = () => {
        let el = { contactName, contactNumber, contactDescription, contactImage, _id: selectedItem._id }
        axios.put(`http://localhost:3001/contact/update/${el._id}`, {
            el
        }).then((res) => {
            setEtat(res)
            reset()
        })
    }

    const deleteContact = (id) => {
        // window.confirm('Are you sure you wish to delete this item?') ? this.onConfirm() : this.onCancel("cancel")
        console.log(id)
        axios.delete(`http://localhost:3001/contact/delete/${id}`)
            .then((res) => {
                setEtat(res)
                console.log(id + " was deleted")
            })
    }

    const reset = () => {
        setUpdatejeton(false)
        setAddJeton(false)
        setContactName('')
        setContactNumber('')
        setContactImage('')
        setContactDescription('')
        setSelectedItem({})
    }



    // const onFileChange = (e) => {
    //     setContactImage(e.target.files[0])
    //     console.log(contactImage)
    // }




    return (
        <div className="home">
            {updateJeton
                &&
                <div className="popUp">

                    <h4 className = "title">Update Contact</h4>
                    <label>Name:</label>
                    <input type="text" name="name" defaultValue={selectedItem.contactName} onChange={(event) => setContactName(event.target.value)} />
                    <label>Number:  </label>
                    <input type="number" defaultValue={selectedItem.contactNumber} onChange={(event) => setContactNumber(event.target.value)} />
                    <label>Image Link:  </label>
                    <input type="text" defaultValue={selectedItem.contactImage} onChange={(event) => setContactImage(event.target.value)} />
                    <label>Description:  </label>
                    <input className="textarea" type="textarea" defaultValue={selectedItem.contactDescription} onChange={(event) => setContactDescription(event.target.value)} />
                    <div className="Btn">
                    <button className ="save" onClick={() => update()}>Save</button>
                    <button className = "cancl" onClick={() => reset()}>Cancel</button>
                    </div>
                </div>}
            {addJeton
                &&
                <div className="popUp">

                    <h2 className="popUpTitle">Create Contact</h2>
                    <label>Name:</label>
                
                    <input type="text" defaultValue="" onChange={(event) => setContactName(event.target.value)} />
                    <label>Number:  </label>
                    <input type="number" defaultValue="" onChange={(event) => setContactNumber(event.target.value)} />
                    <label>Image Link:  </label>
                    <input type="text" defaultValue="" onChange={(event) => setContactImage(event.target.value)} />
                    <label>Description:  </label>
                    <input className="textarea" type="textarea" defaultValue="" onChange={(event) => setContactDescription(event.target.value)} />
                    {/* <input type="file" onChange={onFileChange} /> */}
                    <div className = "boutton">
                    <button className = "add" onClick={() => createContact()}>Add Contact</button>
                    <button className = "cancel" onClick={() => reset()}>Cancel</button>
                      </div>
                </div>}


            <h1 className="cont">Contact List </h1>
            <label className="search"> Search </label>
            <input onChange={(event)=>setSearch(event.value)}/>
            <div className="container">
                {/* <FontAwesomeIcon onClick={() => setAddJeton(true)} className="card addBtn" icon="fa-solid fa-circle-plus" />  */}
                <div className="card borderNone">
                    <button className=" addBtn" onClick={() => setAddJeton(true)}>+</button>
                </div>
                {data.map((el, i) =>
                    <div className="card" key={i}>
                        <div className="cardInfo">
                            <img alt="Picture not Found" src={el.contactImage ? el.contactImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs_Z8NkJTKQmhsyBuGnRsAgd7TiOPuaf7Raw&usqp=CAU"} />
                            <div>
                                <h3>{el.contactName}</h3>
                                <h4>{el.contactNumber}</h4>
                                <p>{el.contactDescription}</p>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => updateContact(el)}>update</button>
                            <button className="red"
                                // onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')){deleteContact()} } }
                                onClick={() => deleteContact(el._id)}
                            >delete</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


export default Home