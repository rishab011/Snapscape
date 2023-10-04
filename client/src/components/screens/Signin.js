import React,{useState,useContext} from "react";
import { Link,useNavigate} from "react-router-dom";
import { UserContext } from "../../App";
import M from 'materialize-css';

const Signin = () => {
    const {state,dispatch} = useContext(UserContext)
    const navigate = useNavigate()
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid email",classes:"#d50000 red accent-4"})
            return
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"#d50000 red accent-4"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Signed-in successfully",classes:"#43a047 green darken-1"})
                navigate('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2 className="brand-logo">Snapscape</h2>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #0288d1 light-blue darken-2" onClick={()=>PostData()} >Login
                </button>
                <h5 className="bottom">
                    <Link to="/signup">Don't have an Account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signin