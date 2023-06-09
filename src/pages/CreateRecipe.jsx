import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/CreateRecipe.css'
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import config from "../config";

function CreateRecipe() {
    const baseURL = process.env.NODE_ENV === 'production' ? config.production : config.local;


    const [uploadImg, setUploadImg] = useState(null);
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const { user } = useContext(AuthContext)

    useEffect(() => {
        //setTimout can be used here as the user is picked from local storage if it exists. So internet speed won't affect the results
        const timer = setTimeout(() => {
            if (!user) {
                navigate('/login');
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [user])

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true);

        if (!user) {
            console.log("User doesnt exist")
            return
        }

        let formdata = new FormData();
        formdata.append('title', title)
        formdata.append('body', content)
        formdata.append('testImage', uploadImg)

        axios({
            url: `${baseURL}/api/recipes/`,
            method: 'POST',
            headers: {
                'authorization': `Bearer ${user.token}`
            },
            data: formdata
        }).then((res) => {
            setIsSubmitting(false);
            console.log("Image uploaded from frontend");
            navigate('/');
        })
    }

    const override = {
        display: "block",
        margin: "0 auto",
        marginTop: "25vh"
    };
    return (
        <div className='createrecipe-main-container' >

            {
                isSubmitting ? <div className='dud'>
                    <ClipLoader aria-label="Loading Spinner" cssOverride={override} color={'#ca3434'} size={150} />
                </div> : (
                    <div className='createrecipe-text-container' >
                        <form onSubmit={handleSubmit}>
                            <label>Title </label> <br />
                            <input className="title-input" type="text" required onChange={(e) => setTitle(e.target.value)} value={title} /> <br />

<br />

                            <label>Enter Recipe</label>
                            <textarea className="title-textarea" value={content} onChange={(e) => setContent(e.target.value)} />


                            <input type="file" required onChange={(e) => setUploadImg(e.target.files[0])} accept="image/*" />
                            <button type="submit" >submit</button>
                        </form>
                        <br />
                    </div>)
            }



        </div>
    )
}

export default CreateRecipe;
