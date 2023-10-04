import React,{useState,useEffect} from "react";
import M from 'materialize-css';
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const navigate = useNavigate()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    useEffect(()=>{
        if(url){
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#e53935 red darken-1"})
            }
            else{
                M.toast({html:"Post Created",classes:"#43a047 green darken-1"})
                navigate('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    },[url])

    const postDetails = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","Snapscape")
        data.append("cloud_name","dufc2jyr2")
        fetch("https://api.cloudinary.com/v1_1/dufc2jyr2/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
        
    }

    return (
        <div className="card input-field auth-card" style={{margin:"30px auto"}}>
            <input 
            type="text" 
            placeholder="Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <input 
            type="text" 
            placeholder="Body" 
            value={body}
            onChange={(e)=>setBody(e.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn #e53935 grey darken-1">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button className="btn waves-effect waves-light #0288d1 light-blue darken-2"
            onClick={()=>postDetails()} >Submit Post
                </button>
        </div>
    )
}

export default CreatePost