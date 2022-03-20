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
            // console.log(data)
        })
    }, [etat]);

    const [contactName, setContactName] = useState("");
    const [contactNumber, setContactNumber] = useState();
    const [contactDescription, setContactDescription] = useState({});
    const [contactImage, setContactImage] = useState("");




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

                    <h4>Update Contact</h4>
                    <label>Name:</label>
                    <input type="text" name="name" defaultValue={selectedItem.contactName} onChange={(event) => setContactName(event.target.value)} />
                    <label>Number:  </label>
                    <input type="number" defaultValue={selectedItem.contactNumber} onChange={(event) => setContactNumber(event.target.value)} />
                    <label>Number:  </label>
                    <input type="text" defaultValue={selectedItem.contactImage} onChange={(event) => setContactImage(event.target.value)} />
                    <label>Description:  </label>
                    <input className="textarea" type="textarea" defaultValue={selectedItem.contactDescription} onChange={(event) => setContactDescription(event.target.value)} />
                    <button onClick={() => update()}>Save</button>
                    <button onClick={() => reset()}>Cancel</button>

                </div>}
            {addJeton
                &&
                <div className="popUp">

                    <h4>Create Contact</h4>
                    <label>Name:</label>
                    <input type="text" defaultValue="" onChange={(event) => setContactName(event.target.value)} />
                    <label>Number:  </label>
                    <input type="number" defaultValue="" onChange={(event) => setContactNumber(event.target.value)} />
                    <label>Description:  </label>
                    <label>Number:  </label>
                    <input type="text" defaultValue="" onChange={(event) => setContactImage(event.target.value)} />
                    <input className="textarea" type="textarea" defaultValue="" onChange={(event) => setContactDescription(event.target.value)} />
                    {/* <input type="file" onChange={onFileChange} /> */}
                    <button onClick={() => createContact()}>Add Contact</button>
                    <button onClick={() => reset()}>Cancel</button>

                </div>}


            <h1>Contact List </h1>
            <div className="container">
                {/* {console.log(data)} */}
                <button  className="card" onClick={() => setAddJeton(true)}>+</button>

                {data.map((el, i) =>
                    <div className="card" key={i}>
                        <img alt="Picture not Found" src={el.contactImage ? el.contactImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs_Z8NkJTKQmhsyBuGnRsAgd7TiOPuaf7Raw&usqp=CAU"} />
                        <h3>{el.contactName}</h3>
                        <h4>{el.contactNumber}</h4>
                        <p>{el.contactDescription}</p>
                        <button onClick={() => updateContact(el)}>update</button>
                        <button
                            // onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')){deleteContact()} } }
                            onClick={() => deleteContact(el._id)}
                        >delete</button>
                    </div>
                )}
            </div>
        </div>
    );
}


export default Home